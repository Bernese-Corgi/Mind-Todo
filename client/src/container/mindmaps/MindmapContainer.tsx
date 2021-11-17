/* ---------------------------------- react --------------------------------- */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
/* ---------------------------------- redux --------------------------------- */
import { useSelector } from 'react-redux';
import { useReduxDispatch } from 'redux/store';
import { RootState } from 'redux/modules';
import {
  initializeMindmapForm,
  readMindmapAsync,
} from 'redux/modules/mindmaps/mindmap';
import { writeNodeAsync } from 'redux/modules/mindmaps/nodes';
/* -------------------------------- component ------------------------------- */
import { LoadingIcon } from 'components/common';
import { AddNodeDialog, Mindmap } from 'components/mindmaps';
/* ---------------------------------- utils --------------------------------- */
import { isEmptyArray } from 'utils/checkUtils';
import { stratifiedMindmap } from 'utils/mindmap';

const MindmapContainer = ({ history, match }) => {
  const dispatch = useReduxDispatch();
  const { mindmap, nodes } = useSelector((state: RootState) => state);

  const [errorMsg, setErrorMsg] = useState('');

  const [isWrite, setIsWrite] = useState(false);
  const [writeInput, setWriteInput] = useState('');
  const [parent, setParent] = useState('');
  const [treeData, setTreeData] = useState<any>();

  const { mindmapId } = match.params;

  useEffect(() => {
    async function dispatchReadMindmap(mindmapId) {
      await dispatch(readMindmapAsync(mindmapId));
    }
    dispatchReadMindmap(mindmapId);

    return () => {
      dispatch(initializeMindmapForm());
    };
  }, [dispatch, mindmapId]);

  const handleClickAddButton = (e, parentId) => {
    const rootNode = mindmap.data.body[0].node;
    const _parentId = parentId ? parentId : rootNode.nodeId;

    setParent(_parentId);
    setIsWrite(true);
  };

  const handleChangeWriteInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setWriteInput(value);
    if (value) {
      setErrorMsg('');
      return;
    }
  };

  const handleSubmitWriteNode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!writeInput) {
      setErrorMsg('노드의 이름을 입력하세요');
      return;
    }

    await dispatch(
      writeNodeAsync(mindmapId, {
        name: writeInput,
        parentId: parent,
      })
    );

    setIsWrite(false);
  };

  const handleCloseDialog = () => {
    setIsWrite(false);
  };

  useEffect(() => {
    if (!isEmptyArray(mindmap.data?.body) && mindmap.data) {
      setTreeData(stratifiedMindmap(mindmap.data?.body));
    }
  }, [mindmap.data]);

  if (mindmap.loading) return <LoadingIcon />;

  if (!mindmap.data) return <LoadingIcon />;

  if (!treeData) return <LoadingIcon />;

  return (
    <>
      <Mindmap
        mindmap={mindmap.data}
        onClickAddButton={handleClickAddButton}
        treeData={treeData}
        rootNode={nodes.data?.tree}
      />

      {isWrite && (
        <AddNodeDialog
          visible={isWrite}
          onSubmit={handleSubmitWriteNode}
          onChangeInput={handleChangeWriteInput}
          onClose={handleCloseDialog}
          errorMsg={errorMsg}
        />
      )}
      {/* <Button linkTo="/mindmaps" onClick={handleClick}>
        뒤로가기
      </Button> */}
    </>
  );
};

export default withRouter(MindmapContainer);
