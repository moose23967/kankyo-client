import type { Command } from '@/command';
import confirm from '@inquirer/confirm';

export const signOutCommand: Command = {
  name: 'users:sign:out',
  description: 'No description yet',
  async callback({ tokens }) {
    const proceed = await confirm({
      message: 'Are you sure want to sign out?',
      default: false,
    });

    if (!proceed) {
      console.info('Stopped');

      return 'SUPPRESS';
    }

    await tokens.delete();
  },
};
