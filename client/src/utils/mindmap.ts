import * as d3 from 'd3';
import { stratify } from 'd3-hierarchy';
import { MindmapType, NodeType, TreeType } from './api/mindmaps';
import { chunkString } from './stringUtils';

export const stratifiedMindmap = (treeData: TreeType[]) => {
  const stratifiedData = stratify<TreeType>()
    .id(d => (typeof d.node !== 'string' ? d.node?.name : d.node))
    .parentId(d => (typeof d.parent !== 'string' ? d.parent?.name : d.parent))(
    treeData
  );

  return stratifiedData;
};

/**
 * 인수로 svg의 <text/> d3 selection 객체를 전달받아 줄바꿈 스타일을 적용합니다.
 * @param selection 줄바꿈 스타일을 적용할 <text/> 요소의 d3 selection 객체를 지정합니다.
 * @param text <text /> 요소의 텍스트를 지정합니다.
 * @param splitLength 분리할 문자열의 길이를 지정합니다. 이 숫자대로 문자열이 줄바꿈됩니다.
 * @param [coordinates] 문자를 배치할 좌표를 x, y로 지정해 객체로 전달합니다. 기본적으로 좌표는 숫자로 지정합니다. x좌표는 예외적으로 '0.5em'과 같이 문자열을 전달할 수 있지만, y좌표는 문자열이 허용되지 않습니다.
 */
export const wrapText = (
  selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  text: string,
  splitLength: number = 10,
  coordinates?: { x?: number | string; y?: number }
) => {
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
      .attr('y', _y * i);
  });
};

/**
 * css 선택자로 엘리먼트를 찾고, 인수로 전달받은 id와 id 어트리뷰트가 일치하는 엘리먼트의 d3 selection 객체를 반환한다.
 * @param selector 엘리먼트를 찾을 css 선택자. 예를 들어, className으로 찾는 경우 '.className'을 전달한다.
 * @param id 엘리먼트의 id 어트리뷰트와 매치되는 id 값
 * @returns 엘리먼트의 d3 selection 객체
 */
export const getD3NodeSelectionById = (
  selector: string,
  id: string | undefined
) => {
  const selection = d3.selectAll(selector).select(function (this) {
    return (this as HTMLElement).getAttribute('id') === id ? this : null;
  });

  return selection;
};

/**
 * 인수로 전달받은 d3 selection 객체의 getBBox() 반환 객체를 반환한다.
 * @param selection getBBox 반환 객체를 받을 d3 selection 객체
 * @returns 엘리먼트의 getBBox가 반환하는 SVGRect 객체
 */
export const getNodeBBox = (
  selection: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
) => (selection.node() as SVGRectElement).getBBox();

export const checkIsRoot = (mindmap: MindmapType, nodeId: string) => {
  const rootNode = mindmap?.body?.find(tree => tree.parent === null);
  return (rootNode?.node as NodeType)?._id === nodeId;
};

export const findRootNode = (mindmap: MindmapType): TreeType | undefined =>
  mindmap?.body?.find(tree => tree.parent === null);

export const findNodeAsTreeById = (nodeId: string, mindmapBody: TreeType[]) =>
  mindmapBody.find(
    (obj: TreeType) => (obj.node as NodeType)?._id === nodeId && obj
  );

export const getNodeRoute = (
  nodeToFindRoute: TreeType,
  mindmapBody: TreeType[],
  mark: string = '>'
) => {
  const markWithBlank = ' ' + mark + ' ';

  let array: string[] = [];

  array.push((nodeToFindRoute.node as NodeType).name);

  (function insertParentName(prev, arr) {
    if (!prev.parent) return;

    const parent = mindmapBody.find((obj: TreeType) =>
      (obj.node as NodeType)._id === (prev.parent as NodeType)._id ? obj : null
    );

    if ((parent?.node as NodeType).name) {
      arr.push((parent?.node as NodeType).name);
      insertParentName(parent as TreeType, arr);
    }

    return arr;
  })(nodeToFindRoute, array);

  return array.reverse().join(markWithBlank);
};
