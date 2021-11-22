/* ---------------------------------- react --------------------------------- */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
/* ------------------------------ redux module ------------------------------ */
import { RootState } from 'redux/modules';
import { useReduxDispatch } from 'redux/store';
import { readNodeAsync } from 'redux/modules/mindmaps/node';
/* -------------------------------- component ------------------------------- */
import { LoadingIcon, Portal, WriteActionBtn } from 'components/common';
import { PostViewer } from 'components/posts';
import { MindmapContainer } from 'container/mindmaps';
import { StyledNodeContainerArticle } from './NodeContainer.styled';

const NodeContainer = ({ history, match }) => {
  const dispatch = useReduxDispatch();
  const { mindmap, post, nodeLoading } = useSelector(
    ({ mindmap, node }: RootState) => ({
      mindmap: mindmap.data,
      node: node.data?.node,
      nodeError: node.error,
      nodeLoading: node.loading,
      post: node.data?.post,
      todos: node.data?.todos,
    })
  );

  const { mindmapId, nodeId } = match.params;

  useEffect(() => {
    dispatch(readNodeAsync(mindmapId, nodeId));

    return () => {
      // dispatch(unloadPost);
    };
  }, [dispatch, mindmapId, nodeId]);

  return (
    <StyledNodeContainerArticle>
      {/* --------------------------------- mindmap -------------------------------- */}
      <section className="mindmapSection">
        <h3>{mindmap?.title}</h3>
        <MindmapContainer history={history} match={match} />
      </section>
      {/* ----------------------------- todos and post ----------------------------- */}
      <div className="todoAndPostWrapper">
        {/* todos */}
        <section className="todosSection">
          <h3>todos</h3>
        </section>
        {/* post */}
        <section className="postSection">
          <h3>post</h3>
          <div className="postContent">
            {post ? (
              <PostViewer post={post} />
            ) : (
              <WriteActionBtn
                path={`/mindmap/${mindmapId}/${nodeId}/write-post`}
                id="goToWritePostPage"
                title="글 작성하기"
                btnText="글 작성하기"
                descText="아직 작성된 글이 없습니다."
              />
            )}
          </div>
        </section>
      </div>
    </StyledNodeContainerArticle>
  );
};

export default NodeContainer;
