import type chalk from 'chalk';
import type { Api } from './api';
import type { TokenManager } from './token-manager';

export type CommandCallbackContext = {
  tokens: TokenManager;
  api: Api;
  decorate: typeof chalk.greenBright.bold;
};
export type CommandCallback = (
  context: CommandCallbackContext,
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
) => Promise<'SUPPRESS' | void>;

export interface Command {
  name: string;
  description: string;
  authorize?: boolean;
  callback: CommandCallback;
}
