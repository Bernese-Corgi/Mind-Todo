import {
  EditDeleteButtonUnit,
  LoadingIcon,
  MdViewer,
  SubInfo,
  Tags,
  WriteActionBtn,
} from 'components/common';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { UserType } from 'utils/api/auth';
import { PostViewerWrapper } from './PostViewer.styled';

interface PostViewerParams {
  postId?: string;
  nodeId?: string;
  mindmapId?: string;
}

export interface PostViewerProps {
  post;
  currentUser?: UserType;
  localTags?: string[];
  hasEdit?: boolean;
  onRemove?: () => void;
  writePath?: string;
  loading?: boolean;
  error?: any;
}

const PostViewer = ({
  post,
  currentUser,
  localTags,
  hasEdit,
  onRemove,
  writePath,
  loading,
  error,
  match,
}: PostViewerProps & RouteComponentProps<PostViewerParams>) => {
  const { postId } = match.params;

  const isOwnPost =
    currentUser && post?.publisher.username === currentUser.username;

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
      <SubInfo writer={post.publisher.username} writtenDate={post.createdAt} />

      {hasEdit && isOwnPost && (
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
