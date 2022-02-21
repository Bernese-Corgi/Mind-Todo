import { useEffect, useState } from 'react';
import { Button, LoadingIcon, SubInfo } from 'components/common';
import {
  MindmapListWrapper,
  StyledMindmapItemLi,
  StyledMindmapListUl,
} from './MindmapList.styld';
import { CustomHierarchyNode, MindmapType } from 'utils/api/mindmaps';
import { UserType } from 'utils/api/auth';
import { isEmptyArray } from 'utils/arrayUtils';
import { stratifiedMindmap } from 'utils/mindmap';
import { Link } from 'react-router-dom';
import { MindmapPreview } from '..';

interface MindmapListProps {
  mindmaps: MindmapType[];
  loading: boolean;
  error;
}

interface MindmapItemProps {
  mindmap: MindmapType;
}

const MindmapItem = ({ mindmap }: MindmapItemProps) => {
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
    <StyledMindmapItemLi>
      <Link to={links.title} className="link">
        <div className="dim"></div>
        <MindmapPreview treeData={treeData} />
        <p children={title} className="title" />
        <SubInfo
          writer={(publisher as UserType).username}
          writtenDate={createdAt}
        />
      </Link>
    </StyledMindmapItemLi>
  );
};

const MindmapList = ({ mindmaps, loading, error }: MindmapListProps) => {
  if (loading) return <LoadingIcon />;

  if (!mindmaps) return <p>데이터 없음</p>;

  if (error) return <p>오류 발생</p>;

  return (
    <MindmapListWrapper>
      <h2 className="sectionH2">Mindmap List</h2>
      <Button
        id="openAddMindmapDialog"
        title="마인드맵 생성 다이얼로그 열기"
        linkTo="/mindmaps/create-mindmap"
        primary
        children="마인드맵 생성하기"
        className="addMindmapBtn"
      />

      <StyledMindmapListUl>
        {mindmaps?.map((mindmap, keyId) => {
          return <MindmapItem mindmap={mindmap} key={keyId} />;
        })}
      </StyledMindmapListUl>
    </MindmapListWrapper>
  );
};

export default MindmapList;
