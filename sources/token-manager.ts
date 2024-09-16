// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { unlink } from 'node:fs/promises';

export class TokenManager {
  path: string;

  constructor() {
    let basePath: string | undefined;

    // biome-ignore lint/style/useDefaultSwitchClause: <explanation>
    switch (process.platform) {
      case 'darwin':
      case 'linux': {
        basePath = Bun.env.HOME;
        break;
      }
      case 'win32': {
        basePath = Bun.env.APPDATA;
        break;
      }
    }

    if (!basePath) {
      throw new Error('Your OS is not yet supported');
    }

    this.path = `${basePath}/.kankyo/token.txt`;
  }

  async create(token: string) {
    await Bun.write(this.path, token);
  }

  async read() {
    const file = Bun.file(this.path);

    if (await file.exists()) {
      return await file.text();
    }
  }

  async delete() {
    await unlink(this.path);
  }
}
