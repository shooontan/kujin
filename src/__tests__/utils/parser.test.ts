import { huruikeya, sumomo, anonatsu } from '../ipadic';
import { parser, joinNodes } from '../../utils/parser';
import { ipadic2Node } from '../../utils/node';

test('parser with huruikeya should return Nodes', () => {
  const nodes = ipadic2Node(huruikeya);
  const parsedNodes = parser(nodes);
  expect(parsedNodes).toBeDefined();
  expect(parsedNodes).not.toHaveLength(0);
});

test('parser with sumomo should return undefined', () => {
  const nodes = ipadic2Node(sumomo);
  const parsedNodes = parser(nodes);
  expect(parsedNodes).not.toBeDefined();
});

test('anonatsu parser remove sutekana', () => {
  const nodes = ipadic2Node(anonatsu);
  const parsedNodes = parser(nodes);
  expect(parsedNodes).toBeDefined();
  expect(parsedNodes).not.toHaveLength(0);
});

test('Nodes whose head is false should return undefined', () => {
  const nodes = ipadic2Node(anonatsu);
  nodes[0].head = false;
  const parsedNodes = parser(nodes);
  expect(parsedNodes).not.toBeDefined;
});

test('Nodes whose tail is false should return undefined', () => {
  const nodes = ipadic2Node(anonatsu);
  nodes[nodes.length - 1].tail = false;
  const parsedNodes = parser(nodes);
  expect(parsedNodes).not.toBeDefined();
});

test('Nodes with exact should return Nodes', () => {
  const nodes = ipadic2Node(anonatsu);
  const parsedNodes = parser(nodes, { exact: true });
  expect(parsedNodes).toBeDefined();
  expect(parsedNodes).not.toHaveLength(0);
});

test('Nodes with exact option', () => {
  let nodes = ipadic2Node(anonatsu);
  nodes.push(nodes[0]);

  let parsedNodes = parser(nodes, { exact: true });
  expect(parsedNodes).not.toBeDefined();

  parsedNodes = parser(nodes, { exact: false });
  expect(parsedNodes).toBeDefined();
  expect(parsedNodes).not.toHaveLength(0);
});

test('joinNodes', () => {
  const nodes = ipadic2Node(huruikeya);
  const parsedNodes = parser(nodes);
  const joinKu = joinNodes(parsedNodes!);
  expect(joinKu).toHaveLength(3);
});
