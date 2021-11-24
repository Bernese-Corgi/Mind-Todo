import { MdViewer } from 'components/common';
import styled from 'styled-components';
import { PostViewerWrapper } from './PostViewer.styled';

export interface PostViewerProps {
  post;
  params?: {
    mindmapId?: string;
    nodeId?: string;
  };
}

const PostViewer = ({ post, params }: PostViewerProps) => {
  return (
    <PostViewerWrapper className="postViewerWrapper" post={post}>
      <p aria-label="글 제목" className="postTitleText" children={post.title} />
      <MdViewer body={post.body} />
    </PostViewerWrapper>
  );
};

export default PostViewer;
