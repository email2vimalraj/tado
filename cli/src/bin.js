import minimist from 'minimist';
import packageList from './';

const args = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    add: 'a',
    list: 'l',
    complete: 'c',
  },
});

if (args.help) {
  const log = args.help ? console.log : console.error;

  log('Usage: test-inkjs');
  log('Options:');
  log('');
  log(' -h, --help  Display this usage info');
  process.exit(args.help ? 0 : 1);
} else {
  go(args);
}

function go(args) {
  packageList(args);
}
