import { Button, MdViewer, Tags } from 'components/common';
import { PostViewerWrapper } from './PostViewer.styled';

export interface PostViewerProps {
  post;
  localTags?: string[];
}

const PostViewer = ({ post, localTags }: PostViewerProps) => {
  const postId = post._id;
  return (
    <PostViewerWrapper className="postViewerWrapper" post={post}>
      <Button
        linkTo={`/post/${postId}/edit`}
        id="editNode"
        title="노드 이름 수정하기"
        children="수정"
      />
      <p aria-label="글 제목" className="postTitleText" children={post.title} />
      <Tags tags={localTags ? localTags : post.tags} isWrite={false} />
      <MdViewer body={post.body} />
    </PostViewerWrapper>
  );
};

export default PostViewer;
