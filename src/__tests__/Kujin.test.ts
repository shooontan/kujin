import path from 'path';
import Kujin from '../Kujin';

const dicPath = path.resolve(__dirname, '../../node_modules/kuromoji/dict');

const kujin = new Kujin({
  dicPath,
});

test('getTokenizer', async () => {
  const tokenizer = await kujin.getTokenizer();
  expect(tokenizer).toBeDefined();
});

test('normalize', () => {
  const txt = '㌢㍍㍻';
  const normalized = kujin['normalize'](txt);
  expect(normalized).toBe('センチメートル平成');
});

test('getNodes', async () => {
  const nodes = await kujin['getNodes']('アルプス山脈の中腹に');
  expect(nodes).not.toHaveLength(0);
});

test('jadge', async () => {
  const isKu = await kujin.jadge('アタタタた　あたたたたたた　あたたたた');
  expect(isKu).toBeTruthy();

  const isNotKu = await kujin.jadge('そこはかとなく');
  expect(isNotKu).toBeFalsy();
});

test('find', async () => {
  const find = await kujin.find(
    'ああ、週末はちょっと一息つきたいな。ところでさ、今毎日がエブリデイ'
  );
  expect(find).toEqual([
    ['週末', 'は'],
    ['ちょっと', '一息'],
    ['つき', 'たい', 'な'],
  ]);
});

test('flat find', async () => {
  const find = await kujin.find(
    'ああ、週末はちょっと一息つきたいな。ところでさ、今毎日がエブリデイ',
    { flat: true }
  );
  expect(find).toEqual('週末は ちょっと一息 つきたいな');
});

test('findAll', async () => {
  const find = await kujin.findAll(
    'ああ、週末はちょっと一息つきたいな。ところでさ、いま毎日がエブリデイ'
  );
  expect(find).toEqual([
    [['週末', 'は'], ['ちょっと', '一息'], ['つき', 'たい', 'な']],
    [['つき', 'たい', 'な'], ['ところで', 'さ', 'いま'], ['毎日', 'が']],
    [['ところで', 'さ'], ['いま', '毎日', 'が'], ['エブリデイ']],
  ]);
});

test('flat findAll', async () => {
  const find = await kujin.findAll(
    'ああ、週末はちょっと一息つきたいな。ところでさ、いま毎日がエブリデイ',
    { flat: true }
  );
  expect(find).toEqual([
    '週末は ちょっと一息 つきたいな',
    'つきたいな ところでさいま 毎日が',
    'ところでさ いま毎日が エブリデイ',
  ]);
});
