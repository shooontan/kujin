import path from 'path';
import Ikku from '../Ikku';

const dicPath = path.resolve(__dirname, '../../node_modules/kuromoji/dict');

const ikku = new Ikku({
  dicPath,
});

test('getTokenizer', async () => {
  const tokenizer = await ikku.getTokenizer();
  expect(tokenizer).toBeDefined();
});

test('normalize', () => {
  const txt = '㌢㍍㍻';
  const normalized = ikku['normalize'](txt);
  expect(normalized).toBe('センチメートル平成');
});

test('getNodes', async () => {
  const nodes = await ikku['getNodes']('アルプス山脈の中腹に');
  expect(nodes).not.toHaveLength(0);
});

test('jadge', async () => {
  const isIkku = await ikku.jadge('アタタタた　あたたたたたた　あたたたた');
  expect(isIkku).toBeTruthy();

  const isNotIkku = await ikku.jadge('そこはかとなく');
  expect(isNotIkku).toBeFalsy();
});

test('find', async () => {
  const find = await ikku.find(
    'ああ、週末はちょっと一息つきたいな。ところでさ、今毎日がエブリデイ'
  );
  expect(find).toEqual([
    ['週末', 'は'],
    ['ちょっと', '一息'],
    ['つき', 'たい', 'な'],
  ]);
});

test('findAll', async () => {
  const find = await ikku.findAll(
    'ああ、週末はちょっと一息つきたいな。ところでさ、いま毎日がエブリデイ'
  );
  expect(find).toEqual([
    [['週末', 'は'], ['ちょっと', '一息'], ['つき', 'たい', 'な']],
    [['つき', 'たい', 'な'], ['ところで', 'さ', 'いま'], ['毎日', 'が']],
    [['ところで', 'さ'], ['いま', '毎日', 'が'], ['エブリデイ']],
  ]);
});
