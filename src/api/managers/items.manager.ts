import { Manager, type Meta } from '@/api/manager';

export class ItemsManager extends Manager {
  constructor(meta: Meta) {
    super({ meta, endpoint: 'items' });
  }

  async create(options: { key: string; value: string }) {
    return await this.request({
      fragments: [
        { name: 'key', value: options.key },
        { name: 'value', value: options.value },
      ],
      method: 'POST',
    });
  }

  async findAll(): Promise<
    Array<{
      identifier: number;
      userIdentifier: number;
      key: string;
      value: string;
    }>
  > {
    return await this.request({ method: 'GET' });
  }

  async delete(identifier: number) {
    return await this.request({ method: 'DELETE', url: `/${identifier}` });
  }
}
