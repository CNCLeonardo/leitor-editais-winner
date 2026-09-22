import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'O Leitor deve ter um script próprio');

function makeElement() {
  return {
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {},
    style: {},
    textContent: '',
    value: '',
    disabled: false,
  };
}

function runCase(sample) {
  const elements = new Map();
  const document = {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, makeElement());
      return elements.get(selector);
    },
    addEventListener() {},
  };
  const context = vm.createContext({
    document,
    pdfjsLib: { GlobalWorkerOptions: {} },
    localStorage: { getItem: () => null },
    Intl,
    Date,
    console,
  });
  vm.runInContext(scripts[0][1], context, { filename: 'index.html' });
  context.catalog = sample.catalog;
  context.rows = sample.rows || [];
  context.arrivalDate = sample.arrivalDate || '08/09/2026';
  vm.runInContext('CATALOG=catalog; state.tenderRows=rows; state.arrivalDate=arrivalDate', context);
  context.pages = sample.pages;
  const fields = vm.runInContext('extract(pages)', context);
  return Object.fromEntries(fields.map(field => [field.key, field]));
}

const samples = JSON.parse(readFileSync(path.join(root, 'tests', 'cases.json'), 'utf8'));
let errors = 0;
for (const sample of samples) {
  const fields = runCase(sample);
  for (const [key, expected] of Object.entries(sample.expected)) {
    const field = fields[key];
    try {
      assert.ok(field, `Campo ${key} ausente`);
      if (expected.value !== undefined) assert.equal(field.value, expected.value);
      if (expected.confidence !== undefined) assert.equal(field.confidence, expected.confidence);
      if (expected.items !== undefined) {
        const items = field.items.map(item => ({
          item: item.item,
          restricted: item.restricted,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }));
        assert.deepEqual(JSON.parse(JSON.stringify(items)), expected.items);
      }
      console.log(`OK   ${sample.name} / ${key}`);
    } catch (error) {
      errors++;
      console.error(`FALHA ${sample.name} / ${key}: ${error.message}`);
    }
  }
}
console.log(`\n${samples.length} cenários, ${errors} divergência(s).`);
if (errors) process.exitCode = 1;
