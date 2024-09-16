import { Manager, type Meta } from '@/api/manager';

type InputCredentials = { email: string; password: string };
type OutputCredentials = { token: string };

export class UsersManager extends Manager {
  constructor(meta: Meta) {
    super({ meta, endpoint: 'users' });
  }

  async signIn(inputCredentials: InputCredentials): Promise<OutputCredentials> {
    return await this.request({
      fragments: [
        { name: 'email', value: inputCredentials.email },
        { name: 'password', value: inputCredentials.password },
      ],
      method: 'POST',
      url: '/sign-in',
    });
  }

  async signUp(inputCredentials: InputCredentials): Promise<OutputCredentials> {
    return await this.request({
      fragments: [
        { name: 'email', value: inputCredentials.email },
        { name: 'password', value: inputCredentials.password },
      ],
      method: 'POST',
      url: '/sign-up',
    });
  }
}
