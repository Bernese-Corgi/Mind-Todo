import {
  EditDeleteButtonUnit,
  LoadingIcon,
  MdViewer,
  Skeleton,
  SubInfo,
  Tags,
  WriteActionBtn,
} from 'components/common';
import { NodeRoute } from 'components/node';
import { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { UserType } from 'utils/api/auth';
import { MindmapType } from 'utils/api/mindmaps';
import { PostType } from 'utils/api/posts';
import { getNodeRoute } from 'utils/mindmap';
import { PostViewerWrapper } from './PostViewer.styled';

interface PostViewerParams {
  postId?: string;
  nodeId?: string;
  mindmapId?: string;
}

export interface PostViewerProps {
  post: PostType;
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

  const postMindmapAssert = post?.mindmapId as Partial<MindmapType>;
  const postPublisherAssert = post?.publisher as UserType;

  const mindmapOfPost = postMindmapAssert?.body;
  const mindmapIdOfPost = postMindmapAssert._id;
  const postUsername = postPublisherAssert?.username;

  const isOwnPost = currentUser && postUsername === currentUser.username;

  const nodeLink = post && `/mindmap/${mindmapIdOfPost}/${post.nodeId}`;

  const [nodeRoute, setNodeRoute] = useState<string>();

  useEffect(() => {
    if (post && mindmapOfPost) {
      const matchNode = mindmapOfPost?.find(
        tree => tree.node._id === post.nodeId
      );

      const route = matchNode && getNodeRoute(matchNode, mindmapOfPost);

      setNodeRoute(route);
    }
  }, [post, mindmapOfPost]);

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
      {nodeRoute && (
        <NodeRoute content={nodeRoute} link={nodeLink} className="nodeRoute" />
      )}
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
      <SubInfo writer={postUsername} writtenDate={post.createdAt} />

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
