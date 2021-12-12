import {
  EditDeleteButtonUnit,
  MdViewer,
  Tags,
  WriteActionBtn,
} from 'components/common';
import { PostViewerWrapper } from './PostViewer.styled';

export interface PostViewerProps {
  post;
  localTags?: string[];
  hasEdit?: boolean;
  onRemove?: () => void;
  writePath?: string;
}

const PostViewer = ({
  post,
  localTags,
  hasEdit,
  onRemove,
  writePath,
}: PostViewerProps) => {
  if (!post)
    return writePath ? (
      <WriteActionBtn
        path={writePath}
        id="goToWritePostPage"
        title="글 작성하기"
        btnText="글 작성하기"
        descText="아직 작성된 글이 없습니다."
      />
    ) : (
      <p>post가 없습니다.</p>
    );

  return (
    <PostViewerWrapper className="postViewerWrapper" post={post}>
      <p aria-label="글 제목" className="postTitleText" children={post.title} />
      {hasEdit && (
        <EditDeleteButtonUnit
          mode="post"
          updateLink={`/posts/${post._id}/edit`}
          onRemove={onRemove}
          className="editDeleteBtns"
        />
      )}
      <Tags tags={localTags ? localTags : post.tags} isWrite={false} />
      <MdViewer body={post.body} />
    </PostViewerWrapper>
  );
};

export default PostViewer;
