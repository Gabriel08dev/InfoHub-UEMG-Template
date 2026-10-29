/** Verifica contratos de conteúdo e privacidade sem acessar serviços institucionais. */
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const context = { window: {} };
vm.runInNewContext(await readFile(path.join(root, 'js/config.js'), 'utf8'), context);
const config = context.window.InfoHubConfig;
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs duplicados no HTML');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'A página precisa de um único h1');
assert.ok(html.includes('lang="pt-BR"'), 'Idioma pt-BR ausente');
assert.ok(!/<(?:input|textarea|select|form)\b/i.test(html), 'O guia não deve coletar dados pessoais');
assert.ok(!/\[Nome|\[Categoria|Descreva aqui|Fluxos Homologados|Calendário Atualizado/.test(html), 'Conteúdo demonstrativo remanescente');

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
}

for (const [tag] of html.matchAll(/<(?:a|use)\b[^>]*>/g)) {
  const attr = attributes(tag);
  if (attr.href?.startsWith('#')) assert.ok(ids.includes(attr.href.slice(1)), `Âncora inválida: ${attr.href}`);
  if (/^https?:/.test(attr.href || '')) {
    assert.equal(attr.target, '_blank', `Destino externo sem nova aba: ${attr.href}`);
    assert.ok(attr.rel?.includes('noopener') && attr.rel?.includes('noreferrer'), `Link externo desprotegido: ${attr.href}`);
  }
  if (attr['data-official']) assert.equal(attr.href, config.links[attr['data-official']], `Link HTML divergente da configuração: ${attr['data-official']}`);
  if (attr['data-contact']) assert.equal(attr.href, config.contacts[attr['data-contact']].href, 'Contato HTML divergente da configuração');
  if (attr['data-project-link']) assert.equal(attr.href, config.projectLinks[attr['data-project-link']], 'Link do projeto divergente da configuração');
}
for (const [, labels] of html.matchAll(/aria-labelledby="([^"]+)"/g)) {
  for (const id of labels.split(/\s+/)) assert.ok(ids.includes(id), `Rótulo inexistente: ${id}`);
}
for (const url of Object.values(config.links)) {
  const parsed = new URL(url);
  assert.equal(parsed.protocol, 'https:');
  assert.ok(['www.uemg.br', 'uemg.lyceum.com.br', 'outlook.cloud.microsoft'].includes(parsed.hostname), `Domínio não revisado: ${url}`);
}
for (const key of Object.keys(config.systems)) {
  assert.ok(ids.includes(`tutorial-${key}`), 'Tutorial do sistema ausente');
  assert.ok(html.includes(`data-tutorial-steps="${key}"`), 'Passos do sistema ausentes');
  assert.ok(html.includes(`data-tutorial-note="${key}"`), 'Aviso do sistema ausente');
}
for (const [, file] of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) await access(path.join(root, file));
for (const file of await readdir(path.join(root, 'js'))) {
  const source = await readFile(path.join(root, 'js', file), 'utf8');
  assert.ok(!/\b(?:localStorage|sessionStorage|XMLHttpRequest|sendBeacon)\b|\bfetch\s*\(/.test(source), 'Persistência ou transmissão inesperada no cliente');
  const check = spawnSync(process.execPath, ['--check', path.join(root, 'js', file)], { encoding: 'utf8' });
  assert.equal(check.status, 0, check.stderr);
}
console.log('OK: sintaxe, idioma, âncoras, rótulos, arquivos, fontes, contatos e ausência de coleta/persistência.');
