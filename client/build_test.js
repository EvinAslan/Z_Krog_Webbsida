import { execSync } from 'child_process';
import fs from 'fs';

try {
  const result = execSync('npm run build', { encoding: 'utf-8', stdio: 'pipe' });
  fs.writeFileSync('result.txt', result);
} catch (error) {
  fs.writeFileSync('result.txt', error.stdout + '\nERROR:\n' + error.stderr);
}
