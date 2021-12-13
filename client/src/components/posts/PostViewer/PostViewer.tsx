import {
  EditDeleteButtonUnit,
  LoadingIcon,
  MdViewer,
  Tags,
  WriteActionBtn,
} from 'components/common';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { PostViewerWrapper } from './PostViewer.styled';

interface PostViewerParams {
  postId?: string;
  nodeId?: string;
  mindmapId?: string;
}

export interface PostViewerProps {
  post;
  localTags?: string[];
  hasEdit?: boolean;
  onRemove?: () => void;
  writePath?: string;
  loading?: boolean;
  error?: any;
}

const PostViewer = ({
  post,
  localTags,
  hasEdit,
  onRemove,
  writePath,
  loading,
  error,
  match,
}: PostViewerProps & RouteComponentProps<PostViewerParams>) => {
  const { postId } = match.params;

  if (loading) return <LoadingIcon />;

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
      <div className="postTitleText">
        {postId ? (
          <p aria-label="글 제목" children={post.title} />
        ) : (
          <Link
            to={`/posts/${post._id}`}
            aria-label="글 제목"
            children={post.title}
          />
        )}
      </div>
      {hasEdit && (
        <EditDeleteButtonUnit
          id="editDelPost"
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

export default withRouter(PostViewer);
