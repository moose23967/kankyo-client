import type { Meta } from './manager';
import { ItemsManager, UsersManager } from './managers';

export class Api {
  meta: Meta;

  items: ItemsManager;
  users: UsersManager;

  constructor(token?: string) {
    this.meta = {
      token,
      information: { url: 'https://kankyo-api.onrender.com' },
    } satisfies Meta;

    this.items = new ItemsManager(this.meta);
    this.users = new UsersManager(this.meta);
  }
}
