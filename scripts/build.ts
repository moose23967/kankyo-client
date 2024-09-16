import { Glob } from 'bun';
import { sys } from 'typescript';

console.info('#1 phase of the build');

const entrypoints: string[] = [];

for await (const file of new Glob('**/*.ts').scan('sources')) {
  entrypoints.push(`sources/${file}`);
}

const firstPhaseBuildOutput = await Bun.build({
  entrypoints,
  external: ['*'],
  minify: true,
  outdir: 'dist/phase/1',
  root: 'src',
  target: 'node',
});

if (!firstPhaseBuildOutput.success) {
  console.error(firstPhaseBuildOutput);

  sys.exit(1);
}

console.info('#2 phase of the build');

const secondPhaseBuildOutput = await Bun.build({
  entrypoints: ['dist/phase/1/main.js'],
  external: [
    'typescript',
    '@inquirer/checkbox',
    '@inquirer/confirm',
    '@inquirer/input',
    'chalk',
  ],
  minify: true,
  outdir: 'dist/phase/2',
  packages: 'external',
});

if (!secondPhaseBuildOutput.success) {
  console.error(secondPhaseBuildOutput);

  sys.exit(1);
}

console.info('Final phase of the build');

for (const target of [
  'darwin-arm64',
  'darwin-x64',
  'linux-arm64',
  'linux-x64',
  'windows-x64',
]) {
  await Bun.$`bun build --compile --minify --sourcemap --target=bun-${target} dist/phase/2/main.js --outfile dist/${target}`.quiet();
}

console.info('Successfully');
