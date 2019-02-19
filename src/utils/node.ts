import { IpadicFeatures } from 'kuromoji';

export interface Node extends IpadicFeatures {
  head: boolean;
}

const nodeProps = {
  head: true,
};
const noHeads = ['助詞', 'フィラー'];
const trimPos = ['記号'];
const trimWord = ['!', '?'];

export const ipadic2Node = (features: IpadicFeatures[]): Node[] => {
  const nodes = features
    .filter(
      _feature =>
        !trimPos.includes(_feature.pos) &&
        !trimWord.includes(_feature.surface_form)
    )
    .map(_feature => {
      const { pos } = _feature;

      const feature = {
        ..._feature,
        ...nodeProps,
      };

      if (noHeads.includes(pos)) {
        feature.head = false;
      }

      return feature;
    });

  return nodes;
};
