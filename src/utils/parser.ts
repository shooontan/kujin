import { Node } from './node';

export interface ParserOptions {
  rule?: number[];
  exact?: boolean;
}

const defaultParserOpts = {
  rule: [5, 7, 5],
  exact: true,
};

const sutekana = /[ぁぃぅぇぉゃゅょゎァィゥェォャュョヮ]/g;

export const parser = (
  nodes: Node[],
  options?: ParserOptions
): Node[] | undefined => {
  let ku: Node[] = [];
  let rulePosition = 0;
  let reading = 0;
  let fullRule = false;

  const { rule, exact } = {
    ...defaultParserOpts,
    ...options,
  };

  const addNode = (_node: Node) => {
    ku.push(_node);
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
      addNode(node);
    } else if (reading === rule[rulePosition]) {
      addNode(node);
      nextPosition();
      reset();
      if (typeof rule[rulePosition] === 'undefined') {
        fullRule = true;
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
