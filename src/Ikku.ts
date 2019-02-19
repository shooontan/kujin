import { join } from 'path';
import kuromoji, { Tokenizer, IpadicFeatures } from 'kuromoji';
import { ipadic2Node } from './utils/node';
import { parser, ParserOptions } from './utils/parser';

const defaultOptions = {
  dicPath: join(process.cwd(), 'node_modules', 'kuromoji', 'dict'),
};

export interface IkkuOptions {
  dicPath?: string;
}

export default class Ikku {
  dicPath: string;
  tokenizer: Tokenizer<IpadicFeatures> | undefined;

  constructor(options?: IkkuOptions) {
    this.dicPath = (options && options.dicPath) || defaultOptions.dicPath;
  }

  getTokenizer(): Promise<Tokenizer<IpadicFeatures>> {
    if (typeof this.tokenizer !== 'undefined') {
      return Promise.resolve(this.tokenizer);
    }

    return new Promise((resolve, reject) => {
      kuromoji
        .builder({
          dicPath: this.dicPath,
        })
        .build((error, tokenizer) => {
          if (error) {
            return reject(error);
          }
          this.tokenizer = tokenizer;
          return resolve(this.tokenizer);
        });
    });
  }

  async jadge(ku: string, opts?: ParserOptions): Promise<boolean> {
    return this.getTokenizer().then(tokenizer => {
      const features = tokenizer.tokenize(ku);
      const nodes = ipadic2Node(features);
      const parsedNodes = parser(nodes, opts);
      return typeof parsedNodes !== 'undefined';
    });
  }
}
