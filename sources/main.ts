import chalk from 'chalk';
import package_ from 'package.json';
import { sys } from 'typescript';
import { Api } from './api';
import type { Command, CommandCallbackContext } from './command';
import {
  createCommand,
  deleteCommand,
  signInCommand,
  signOutCommand,
  signUpCommand,
  viewCommand,
} from './commands';
import { TokenManager } from './token-manager';

const commands = [
  signInCommand,
  signOutCommand,
  signUpCommand,
  createCommand,
  deleteCommand,
  viewCommand,
];
const namedCommands: Record<string, Command> = {};

for (const command of commands) {
  namedCommands[command.name] = command;
}

const arguments_ = Bun.argv;
const commandName = arguments_[arguments_.length - 1];
const command = namedCommands[commandName];

const decorate = chalk.greenBright.bold;

if (!command) {
  const mainInformation = `${decorate(package_.name)} (${package_.version})`;
  const usageInformation = `${chalk.bold('Usage: kankyo-client <command>')}`;

  let maximumCommandNameLength = 0;

  for (const command of commands) {
    const nameLength = command.name.length;

    if (nameLength > maximumCommandNameLength) {
      maximumCommandNameLength = nameLength;
    }
  }

  const commandsList = commands
    .map((command) => {
      const name = command.name;

      return `  ${decorate(name)}${' '.repeat(maximumCommandNameLength - name.length + 2)}${command.description}`;
    })
    .join('\n');

  console.info(
    `${mainInformation}\n\n${usageInformation}\n\n${chalk.bold('Commands:')}\n${commandsList}`,
  );

  sys.exit(0);
}

const tokens = new TokenManager();
const token = await tokens.read();

const context: CommandCallbackContext = {
  decorate,
  tokens,
  api: new Api(token),
};

try {
  if (command.authorize === undefined) {
    if (!token) {
      throw new Error('First you need to log in');
    }
  } else if (token) {
    throw new Error('You have already logged in');
  }

  const suppress = await command.callback(context);

  if (!suppress) {
    console.info(`✅ ${chalk.greenBright.bold('Successfully!')}`);
  }
} catch (error) {
  console.error(`❌ ${chalk.redBright.bold((error as Error).message)}`);
}
