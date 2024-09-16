import type { Command } from '@/command';
import input from '@inquirer/input';

export const signUpCommand: Command = {
  name: 'users:sign:up',
  description: 'No description yet',
  authorize: false,
  async callback({ api, tokens }) {
    const email = await input({ message: 'Email:', required: true });
    const password = await input({ message: 'Password:', required: true });

    const { token } = await api.users.signUp({
      email,
      password,
    });

    await tokens.create(token);
  },
};
