import { stratify } from 'd3-hierarchy';
import { chunkString } from './stringUtils';

export const stratifiedMindmap = treeData => {
  const stratifiedData = stratify()
    .id((d: any) => d.node.name)
    .parentId((d: any) => d.parent.name)(treeData);

  return stratifiedData;
};

export const wrapText = (
  selection,
  text: string,
  splitLength: number = 10,
  coordinates?: { x?: number | string; y?: number }
) => {
  // 매개변수 1. 자를 텍스트 길이
  // 매개변수 2. selection
  // 매개변수 3. 자를 텍스트
  const _x = coordinates?.x ? coordinates?.x : 0;
  const _y = coordinates?.y ? coordinates?.y : 14;

  const slicedTexts = chunkString(text, splitLength);

  const firstText = text.slice(0, splitLength);

  selection.text(firstText).attr('x', _x);

  slicedTexts?.map((t, i) => {
    if (i === 0) return;
    selection
      .append('tspan')
      .text(t)
      .attr('x', _x)
      .attr('y', _y * (i + 1));
  });
};
