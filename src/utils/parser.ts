import { Node } from './node';

export interface ParserOptions {
  rule?: number[];
  exact?: boolean;
}

export const defaultParserOpts = {
  rule: [5, 7, 5],
  exact: false,
};

const sutekana = /[ぁぃぅぇぉゃゅょゎァィゥェォャュョヮ]/g;

export const parser = (
  nodes: Node[],
  options?: ParserOptions
): Node[][] | undefined => {
  let ku: Node[][] = [];
  let rulePosition = 0;
  let reading = 0;
  let fullRule = false;

  const { rule, exact } = {
    ...defaultParserOpts,
    ...options,
  };

  const addNode = (_node: Node, index: number) => {
    if (!ku[index]) {
      ku[index] = [];
    }
    ku[index].push(_node);
  };

  const nextPosition = () => {
    rulePosition++;
  };

  const reset = () => {
    reading = 0;
  };

  for (let node of nodes) {
    const _read = (node.reading || node.surface_form).replace(sutekana, '');

    if (reading === 0 && !node.head) {
      ku = [];
      break;
    }

    reading += _read.length;

    if (reading < rule[rulePosition]) {
      addNode(node, rulePosition);
    } else if (reading === rule[rulePosition]) {
      addNode(node, rulePosition);
      nextPosition();
      reset();
      if (typeof rule[rulePosition] === 'undefined') {
        fullRule = true;
        if (!node.tail) {
          ku = [];
        }
        break;
      }
    } else {
      ku = [];
      break;
    }
  }

  if (!fullRule) {
    return undefined;
  }

  if (exact && ku.length !== nodes.length) {
    return undefined;
  }

  return ku;
};

export const joinNodes = (nodes: Node[][]) => {
  return nodes.map(_node => _node.map(_nd => _nd.surface_form));
};
