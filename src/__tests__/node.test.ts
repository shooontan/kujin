import { huruikeya } from './ipadic';
import { ipadic2Node } from '../utils/node';

test('ipadic2Node', () => {
  const nodes = ipadic2Node(huruikeya);

  nodes.forEach(_node => {
    expect(_node).toHaveProperty('head');
    expect(typeof _node.head).toBe('boolean');
  });
});
