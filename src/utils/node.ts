import { IpadicFeatures } from 'kuromoji';
import { includeSamePropertyValue } from './object';

export interface Node extends IpadicFeatures, NodeProps {}

export interface NodeProps {
  head: boolean;
  tail: boolean;
}

export interface Ipadic2NodeOptions {
  noHeads?: Partial<IpadicFeatures>[];
  noTails?: Partial<IpadicFeatures>[];
  trims?: Partial<IpadicFeatures>[];
}

const nodeProps: NodeProps = {
  head: true,
  tail: true,
};

export const defaultIpadic2NodeOptions = {
  noHeads: [
    {
      pos: '助詞',
    },
    {
      pos: '助動詞',
    },
    {
      pos: 'フィラー',
    },
  ],
  noTails: [
    {
      pos: '動詞',
      conjugated_form: '未然形',
    },
    {
      pos: '接頭詞',
    },
  ],
  trims: [
    {
      pos: '記号',
    },
    {
      pos: '名詞',
      surface_form: '!',
    },
    {
      pos: '名詞',
      surface_form: '?',
    },
    {
      pos: '名詞',
      surface_form: ')',
    },
  ],
};

export const ipadic2Node = (
  features: IpadicFeatures[],
  ipadic2NodeOptions?: Ipadic2NodeOptions
): Node[] => {
  const options = { ...defaultIpadic2NodeOptions, ...ipadic2NodeOptions };
  const { noHeads, noTails, trims } = options;

  const nodes = features
    .filter(_feature => !includeSamePropertyValue(_feature as any, trims))
    .map(_feature => {
      const feature = {
        ..._feature,
        ...nodeProps,
      };

      feature.head = !includeSamePropertyValue(feature, noHeads);
      feature.tail = !includeSamePropertyValue(feature, noTails);

      return feature;
    });

  console.log('====================================');
  console.log(nodes);
  console.log('====================================');

  return nodes;
};
