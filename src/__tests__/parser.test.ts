import { huruikeya, sumomo } from './ipadic';
import { ipadic2Node } from '../utils/node';
import { parser } from '../utils/parser';

test('parser with huruikeya', () => {
  const nodes = ipadic2Node(huruikeya);
  const parsedNodes = parser(nodes);

  expect(parsedNodes).not.toBe(undefined);
  expect(parsedNodes).not.toHaveLength(0);
});

test('parser with sumomo', () => {
  const nodes = ipadic2Node(sumomo);
  const parsedNodes = parser(nodes);
  expect(parsedNodes).toBe(undefined);
});
