import { join } from 'path';
import kuromoji, { Tokenizer, IpadicFeatures } from 'kuromoji';
import {
  ipadic2Node,
  defaultIpadic2NodeOptions,
  Ipadic2NodeOptions,
} from './utils/node';
import {
  parser,
  defaultParserOpts,
  ParserOptions,
  joinNodes,
} from './utils/parser';

const defaultOptions = {
  dicPath: join(process.cwd(), 'node_modules', 'kuromoji', 'dict'),
};

export interface IkkuOptions extends Ipadic2NodeOptions, ParserOptions {
  dicPath?: string;
}

export default class Ikku {
  dicPath: string;
  tokenizer: Tokenizer<IpadicFeatures> | undefined;
  ipadicOptions: Ipadic2NodeOptions;
  parserOptions: ParserOptions;

  constructor(ikkuOptions?: IkkuOptions) {
    const options = {
      ...defaultOptions,
      ...defaultIpadic2NodeOptions,
      ...defaultParserOpts,
      ...ikkuOptions,
    };

    this.dicPath = options.dicPath;
    this.ipadicOptions = {
      noHeads: options.noHeads,
      noTails: options.noTails,
      trims: options.trims,
    };
    this.parserOptions = {
      rule: options.rule,
      exact: options.exact,
    };
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

  private normalize(txt: string) {
    return txt.normalize('NFKC');
  }

  private async getNodes(ku: string, opts?: Ipadic2NodeOptions) {
    return this.getTokenizer().then(tokenizer => {
      const nku = this.normalize(ku);
      const features = tokenizer.tokenize(nku);
      return ipadic2Node(features, opts);
    });
  }

  async jadge(ku: string, opts?: Ipadic2NodeOptions & ParserOptions) {
    const nodes = await this.getNodes(ku);
    const parsedNodes = parser(nodes, opts);
    return typeof parsedNodes !== 'undefined';
  }

  async find(ku: string, opts?: Ipadic2NodeOptions & ParserOptions) {
    const nodes = await this.getNodes(ku, opts);
    let findKu: string[][] = [];

    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
      const targetNodes = nodes.slice(nodeIndex);
      const parsedNodes = parser(targetNodes, opts);
      if (parsedNodes) {
        const joinKu = joinNodes(parsedNodes);
        findKu = joinKu;
        break;
      }
    }

    return findKu;
  }

  async findAll(ku: string, opts?: ParserOptions & Ipadic2NodeOptions) {
    const nodes = await this.getNodes(ku, opts);
    let findAllKu: string[][][] = [];

    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
      const targetNodes = nodes.slice(nodeIndex);
      const parsedNodes = parser(targetNodes, opts);
      if (parsedNodes) {
        const joinKu = joinNodes(parsedNodes);
        findAllKu.push(joinKu);
      }
    }

    return findAllKu;
  }
}
