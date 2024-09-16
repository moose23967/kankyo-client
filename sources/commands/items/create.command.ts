import type { Command } from '@/command';
import confirm from '@inquirer/confirm';
import input from '@inquirer/input';

export const createCommand: Command = {
  name: 'items:create',
  description: 'No description yet',
  async callback({ api }) {
    const key = await input({ message: 'Key:', required: true });
    const value = await input({ message: 'Value:', required: true });

    const proceed = await confirm({
      message: 'Are you sure want to create this item?',
      default: true,
    });

    if (!proceed) {
      console.info('Stopped');

      return 'SUPPRESS';
    }

    await api.items.create({
      key,
      value,
    });
  },
};
