import { MdViewer, Tags } from 'components/common';
import { PostViewerWrapper } from './PostViewer.styled';

export interface PostViewerProps {
  post;
  localTags?: string[];
}

const PostViewer = ({ post, localTags }: PostViewerProps) => {
  return (
    <PostViewerWrapper className="postViewerWrapper" post={post}>
      <p aria-label="글 제목" className="postTitleText" children={post.title} />
      <Tags tags={localTags ? localTags : post.tags} isWrite={false} />
      <MdViewer body={post.body} />
    </PostViewerWrapper>
  );
};

export default PostViewer;
