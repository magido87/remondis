import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const tokenMap = {
  // spacing
  'p-0': 'p-[var(--spacing-0)]',
  'p-1': 'p-[var(--spacing-1)]',
  'p-2': 'p-[var(--spacing-2)]',
  'p-3': 'p-[var(--spacing-3)]',
  'p-4': 'p-[var(--spacing-4)]',
  'p-5': 'p-[var(--spacing-5)]',
  'p-6': 'p-[var(--spacing-6)]',
  'p-7': 'p-[var(--spacing-7)]',
  'p-8': 'p-[var(--spacing-8)]',
  'p-9': 'p-[var(--spacing-9)]',
  // radius
  'rounded-sm': 'rounded-[var(--radius-sm)]',
  'rounded-md': 'rounded-[var(--radius-md)]',
  'rounded-lg': 'rounded-[var(--radius-lg)]',
  'rounded-full': 'rounded-[var(--radius-full)]',
  // colors
  'bg-primary-50': 'bg-[var(--color-primary-50)]',
  'bg-primary-100': 'bg-[var(--color-primary-100)]',
  'bg-primary-200': 'bg-[var(--color-primary-200)]',
  'bg-primary-300': 'bg-[var(--color-primary-300)]',
  'bg-primary-400': 'bg-[var(--color-primary-400)]',
  'bg-primary-500': 'bg-[var(--color-primary-500)]',
  'bg-primary-600': 'bg-[var(--color-primary-600)]',
  'bg-primary-700': 'bg-[var(--color-primary-700)]',
  'bg-primary-800': 'bg-[var(--color-primary-800)]',
  'bg-primary-900': 'bg-[var(--color-primary-900)]',
  // neutral colors
  'bg-neutral-50': 'bg-[var(--color-neutral-50)]',
  'bg-neutral-100': 'bg-[var(--color-neutral-100)]',
  'bg-neutral-200': 'bg-[var(--color-neutral-200)]',
  'bg-neutral-300': 'bg-[var(--color-neutral-300)]',
  'bg-neutral-400': 'bg-[var(--color-neutral-400)]',
  'bg-neutral-500': 'bg-[var(--color-neutral-500)]',
  'bg-neutral-600': 'bg-[var(--color-neutral-600)]',
  'bg-neutral-700': 'bg-[var(--color-neutral-700)]',
  'bg-neutral-800': 'bg-[var(--color-neutral-800)]',
  'bg-neutral-900': 'bg-[var(--color-neutral-900)]',
  // text colors
  'text-primary-50': 'text-[var(--color-primary-50)]',
  'text-primary-100': 'text-[var(--color-primary-100)]',
  'text-primary-200': 'text-[var(--color-primary-200)]',
  'text-primary-300': 'text-[var(--color-primary-300)]',
  'text-primary-400': 'text-[var(--color-primary-400)]',
  'text-primary-500': 'text-[var(--color-primary-500)]',
  'text-primary-600': 'text-[var(--color-primary-600)]',
  'text-primary-700': 'text-[var(--color-primary-700)]',
  'text-primary-800': 'text-[var(--color-primary-800)]',
  'text-primary-900': 'text-[var(--color-primary-900)]',
  // neutral text colors
  'text-neutral-50': 'text-[var(--color-neutral-50)]',
  'text-neutral-100': 'text-[var(--color-neutral-100)]',
  'text-neutral-200': 'text-[var(--color-neutral-200)]',
  'text-neutral-300': 'text-[var(--color-neutral-300)]',
  'text-neutral-400': 'text-[var(--color-neutral-400)]',
  'text-neutral-500': 'text-[var(--color-neutral-500)]',
  'text-neutral-600': 'text-[var(--color-neutral-600)]',
  'text-neutral-700': 'text-[var(--color-neutral-700)]',
  'text-neutral-800': 'text-[var(--color-neutral-800)]',
  'text-neutral-900': 'text-[var(--color-neutral-900)]',
};

function rewriteTokens(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  let newContent = content;

  Object.entries(tokenMap).forEach(([oldToken, newToken]) => {
    const regex = new RegExp(`\\b${oldToken}\\b`, 'g');
    newContent = newContent.replace(regex, newToken);
  });

  if (newContent !== content) {
    writeFileSync(filePath, newContent);
    console.log(`Updated tokens in ${filePath}`);
  }
}

function findTsxFiles(dir: string): string[] {
  const output = execSync(`find ${dir} -name "*.tsx"`).toString();
  return output.split('\n').filter(Boolean);
}

const srcDir = join(process.cwd(), 'src');
const tsxFiles = findTsxFiles(srcDir);

tsxFiles.forEach(rewriteTokens); 