import { useEffect, useState } from 'react';
import { Button, LoadingIcon, SubInfo } from 'components/common';
import {
  MindmapListWrapper,
  StyledMindmapItemLink,
  StyledMindmapListLi,
  StyledMindmapListUl,
} from './MindmapList.styld';
import { CustomHierarchyNode, MindmapType } from 'utils/api/mindmaps';
import { UserType } from 'utils/api/auth';
import { isEmptyArray } from 'utils/arrayUtils';
import { stratifiedMindmap } from 'utils/mindmap';
import { MindmapPreview, WriteMindmapBtn } from '..';

interface MindmapListProps {
  mindmaps: MindmapType[];
  loading: boolean;
  error;
  onOpenDialog: () => void;
}

interface MindmapItemProps {
  mindmap: MindmapType;
  onLoad?: (e: any) => void;
}

export const MindmapItem = ({ mindmap, onLoad }: MindmapItemProps) => {
  const [treeData, setTreeData] = useState<CustomHierarchyNode>();

  const { _id, title, publisher, createdAt } = mindmap;

  const links = {
    title: `/mindmap/${_id}`,
    username: `/mindmap?${(publisher as UserType)?.username}`,
  };

  // set tree data
  useEffect(() => {
    if (mindmap!.body) {
      if (!isEmptyArray(mindmap!.body) && mindmap) {
        setTreeData(stratifiedMindmap(mindmap!.body));
      }
    }
  }, [mindmap]);

  if (!treeData) return <LoadingIcon />;

  return (
    <StyledMindmapItemLink to={links.title} className="link">
      <div className="dim"></div>
      <MindmapPreview treeData={treeData} className="preview" />
      <p children={title} className="title" />
      <SubInfo
        writer={(publisher as UserType).username}
        writtenDate={createdAt}
      />
    </StyledMindmapItemLink>
  );
};

const MindmapList = ({
  mindmaps,
  loading,
  error,
  onOpenDialog,
}: MindmapListProps) => {
  if (loading) return <LoadingIcon />;

  if (!mindmaps) return <p>데이터 없음</p>;

  if (error) return <p>오류 발생</p>;

  return (
    <MindmapListWrapper>
      <h2 className="sectionH2">Mindmap List</h2>

      {isEmptyArray(mindmaps) ? (
        <WriteMindmapBtn />
      ) : (
        <>
          <Button
            id="openAddMindmapDialog"
            title="마인드맵 생성 다이얼로그 열기"
            primary
            children="마인드맵 생성하기"
            className="addMindmapBtn"
            onClick={onOpenDialog}
          />

          <StyledMindmapListUl>
            {mindmaps?.map((mindmap, keyId) => {
              return (
                <StyledMindmapListLi>
                  <MindmapItem mindmap={mindmap} key={keyId} />
                </StyledMindmapListLi>
              );
            })}
          </StyledMindmapListUl>
        </>
      )}
    </MindmapListWrapper>
  );
};

export default MindmapList;
