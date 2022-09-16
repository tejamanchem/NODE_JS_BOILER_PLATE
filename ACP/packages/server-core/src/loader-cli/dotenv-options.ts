import * as path from 'path';

const p = path.join(process.cwd(), `./.env`);

console.log(`Loading environment from ${p}`);
const dotEnvOptions = {
  path: p,
};
export { dotEnvOptions };
