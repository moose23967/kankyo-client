import type { Command } from '@/command';
import checkbox from '@inquirer/checkbox';
import confirm from '@inquirer/confirm';

export const deleteCommand: Command = {
  name: 'items:delete',
  description: 'No description yet',
  async callback({ api }) {
    const items = await api.items.findAll();

    const choices = await checkbox({
      choices: items.map((item) => {
        return {
          name: item.key,
          value: item,
        };
      }),
      message: 'Choose item(s) to delete',
    });

    const proceed = await confirm({
      message: 'Are you sure want to delete this item (these items)',
      default: false,
    });

    if (!proceed) {
      console.info('Stopped');

      return 'SUPPRESS';
    }

    for (const choice of choices) {
      await api.items.delete(choice.identifier);
    }
  },
};
