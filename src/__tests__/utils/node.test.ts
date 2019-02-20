import { huruikeya } from '../ipadic';
import { ipadic2Node } from '../../utils/node';

test('ipadic2Node', () => {
  const nodes = ipadic2Node(huruikeya);

  nodes.forEach(node => {
    expect(node).toHaveProperty('head');
    expect(node).toHaveProperty('tail');
    expect(typeof node.head).toBe('boolean');
    expect(typeof node.tail).toBe('boolean');
  });
});

test('ipadic2Node with noHeads opts', () => {
  const opts = {
    noHeads: [
      {
        pos: '名詞',
      },
    ],
  };
  const nodes = ipadic2Node(huruikeya, opts);

  nodes.forEach(node => {
    if (node.pos === opts.noHeads[0].pos) {
      expect(node.head).toBeFalsy();
    } else {
      expect(node.head).toBeTruthy();
    }
  });
});

test('ipadic2Node with noTails opts', () => {
  const opts = {
    noTails: [
      {
        pos: '名詞',
      },
    ],
  };
  const nodes = ipadic2Node(huruikeya, opts);

  nodes.forEach(node => {
    if (node.pos === opts.noTails[0].pos) {
      expect(node.tail).toBeFalsy();
    } else {
      expect(node.tail).toBeTruthy();
    }
  });
});

test('ipadic2Node with trims opts', () => {
  const opts = {
    trims: [
      {
        pos: '名詞',
      },
    ],
  };
  const nodes = ipadic2Node(huruikeya, opts);

  const noNoun = nodes.every(node => node.pos !== opts.trims[0].pos);
  expect(noNoun).toBeTruthy();
});
