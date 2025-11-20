import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const coveragePath = join(__dirname, '../coverage/coverage-summary.json');

// Check if coverage file exists
if (!existsSync(coveragePath)) {
  console.log('No coverage report found. Skipping coverage check.');
  process.exit(0);
}

const coverage = JSON.parse(readFileSync(coveragePath, 'utf-8'));

const thresholds = {
  statements: 0,
  branches: 0,
  functions: 0,
  lines: 0,
};

const totals = coverage.total;

let failed = false;

Object.entries(thresholds).forEach(([key, threshold]) => {
  const percentage = totals[key].pct;
  if (percentage < threshold) {
    console.error(
      `❌ ${key} coverage is ${percentage}%, but threshold is ${threshold}%`
    );
    failed = true;
  } else {
    console.log(`✅ ${key} coverage: ${percentage}%`);
  }
});

if (failed) {
  console.error('\n❌ Coverage thresholds not met. Commit blocked.');
  process.exit(1);
} else {
  console.log('\n✅ All coverage thresholds met.');
}

