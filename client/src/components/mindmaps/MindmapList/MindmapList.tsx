import React from 'react';
import { Button, ListItem, LoadingIcon } from 'components/common';
import { MindmapListWrapper } from './MindmapList.styld';
import { MindmapType } from 'utils/api/mindmaps';
import { UserType } from 'utils/api/auth';

interface MindmapListProps {
  mindmaps: MindmapType[];
  loading: boolean;
  error;
}

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
      <ul className="mindmapList">
        {mindmaps?.map(mindmap => {
          const { _id, title, publisher, createdAt } = mindmap;

          const links = {
            title: `/mindmap/${_id}`,
            username: `/mindmap?${(publisher as UserType)?.username}`,
          };

          return (
            <ListItem
              key={_id}
              title={title}
              username={(publisher as UserType)?.username}
              createdAt={createdAt}
              links={links}
            />
          );
        })}
      </ul>
    </MindmapListWrapper>
  );
};

export default MindmapList;
