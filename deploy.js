const NodeCmd = require('node-cmd');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');

// 开始下载
const spinner = ora('正在发布...');
spinner.start();

NodeCmd.get(
  `
    rm -rf _book
    gitbook build
    git add .
    git ci -m 'feat:publish'
    git push
    git subtree push --prefix=_book origin gh-pages
  `,
  function(err) {
    if (!err) {
      // 下载成功调用
      spinner.succeed();

      console.log(symbols.success, chalk.green('发布成功,前往查看:https://178518.github.io/weapp-assets'));
    } else {
      console.log(symbols.error, chalk.red(err));
    }
  },
);
