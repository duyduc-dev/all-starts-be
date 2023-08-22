const path = require('path');

const buildEslintCommand = (filenames) =>
  `lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

module.exports = {
  '*.{js,ts}': ['yarn lint:fix', 'yarn lint', 'yarn prettier:fix', 'yarn prettier', 'git add .'],
};
