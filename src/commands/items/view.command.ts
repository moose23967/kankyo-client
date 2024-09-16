import type { Command } from '@/command';
import chalk from 'chalk';

export const viewCommand: Command = {
  name: 'items:view',
  description: 'No description yet',
  async callback({ api, decorate }) {
    const items = await api.items.findAll();

    let maxItemKeyLength = 0;

    for (const item of items) {
      const keyLength = item.key.length;

      if (keyLength > maxItemKeyLength) {
        maxItemKeyLength = keyLength;
      }
    }

    const list = items
      .map((item) => {
        return `  ${decorate(item.key)}${' '.repeat(maxItemKeyLength - item.key.length + 2)}${item.value}`;
      })
      .join('\n');

    console.info(`${chalk.bold('Items:')}\n${list}`);

    return 'SUPPRESS';
  },
};
