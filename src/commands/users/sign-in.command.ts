import type { Command } from '@/command';
import input from '@inquirer/input';

export const signInCommand: Command = {
  name: 'users:sign:in',
  description: 'No description yet',
  authorize: false,
  async callback({ api, tokens }) {
    const email = await input({ message: 'Email:', required: true });
    const password = await input({ message: 'Password:', required: true });

    const { token } = await api.users.signIn({
      email,
      password,
    });

    await tokens.create(token);
  },
};
