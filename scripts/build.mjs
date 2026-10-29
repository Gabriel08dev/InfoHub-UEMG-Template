/** Exportação estática sem dependências. O site também abre diretamente por index.html. */
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== 'dist') {
  throw new Error('Diretório de saída inválido.');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const item of ['index.html', 'css', 'js', 'images']) {
  await cp(path.join(root, item), path.join(output, item), { recursive: true });
}
console.log('Exportação concluída em dist/. Sem instalação de dependências.');
