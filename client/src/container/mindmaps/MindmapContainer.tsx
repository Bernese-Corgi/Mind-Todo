/* ---------------------------------- react --------------------------------- */
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
/* ---------------------------------- redux --------------------------------- */
import { useSelector } from 'react-redux';
import { useReduxDispatch } from 'redux/store';
import { RootState } from 'redux/modules';
import {
  initializeMindmapForm,
  readMindmapAsync,
} from 'redux/modules/mindmaps/mindmap';
import { writeNodeAsync } from 'redux/modules/mindmaps/node';
/* -------------------------------- component ------------------------------- */
import { LoadingIcon } from 'components/common';
import { AddNodeDialog, Mindmap } from 'components/mindmaps';
/* ---------------------------------- utils --------------------------------- */
import { isEmptyArray } from 'utils/checkUtils';
import { stratifiedMindmap } from 'utils/mindmap';

interface MindmapContainerProps {
  history;
  match;
}

const MindmapContainer = ({ history, match }: MindmapContainerProps) => {
  const dispatch = useReduxDispatch();
  const {
    mindmap,
    mindmapLoading,
    mindmapError,
    node,
    nodeLoading,
    nodeError,
  } = useSelector(({ mindmap, node }: RootState) => ({
    mindmap: mindmap.data,
    mindmapLoading: mindmap.loading,
    mindmapError: mindmap.error,
    node: node.data,
    nodeLoading: node.loading,
    nodeError: node.error,
  }));

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

  const handleClicksMindmap = {
    addBtn: (e: MouseEventHandler<SVGGElement>, parentId: string) => {
      const rootNodeId = mindmap.body[0].node._id;
      const _parentId = parentId ? parentId : rootNodeId;

      setParent(_parentId);
      setIsWrite(true);
    },
    node: (e: MouseEventHandler<SVGGElement>, nodeId: string) => {
      history.push(`/mindmap/${mindmapId}/${nodeId}`);
    },
  };

  const handleChangeWriteInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setWriteInput(value);

    if (value) {
      setErrorMsg('');
    }

    if (value.length > 50) {
      setErrorMsg('50자 이하로 작성해주세요');
    }
  };

  const handleSubmitWriteNode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const overlapNodeName = mindmap?.body.find(
      tree => tree.node.name === writeInput
    );

    if (overlapNodeName) {
      setErrorMsg('존재하는 이름입니다. 중복이 되지 않도록 입력해주세요.');
      return;
    }

    if (!writeInput) {
      setErrorMsg('노드의 이름을 입력하세요');
      return;
    }

    if (writeInput.length > 50) {
      setErrorMsg('50자 이하로 작성해주세요');
      return;
    }

    await dispatch(
      writeNodeAsync(mindmapId, {
        name: writeInput,
        parentId: parent,
      })
    );

    dispatch(readMindmapAsync(mindmapId));

    setIsWrite(false);
    setErrorMsg('');
  };

  const handleCloseDialog = () => {
    setIsWrite(false);
    setErrorMsg('');
  };

  useEffect(() => {
    if (!isEmptyArray(mindmap?.body) && mindmap) {
      setTreeData(stratifiedMindmap(mindmap?.body));
    }
  }, [mindmap]);

  if (mindmapLoading) return <LoadingIcon />;

  if (!mindmap) return <LoadingIcon />;

  if (!treeData) return <LoadingIcon />;

  return (
    <>
      <h2 className="a11yHidden">{mindmap?.title}</h2>
      <section
        style={{ width: '85vw', height: '75vh', margin: '0 auto 0 auto' }}>
        <Mindmap
          mindmap={mindmap}
          treeData={treeData}
          loading={nodeLoading}
          error={nodeError}
          onClicks={handleClicksMindmap}
        />
      </section>

      {isWrite && (
        <AddNodeDialog
          visible={isWrite}
          onSubmit={handleSubmitWriteNode}
          onChangeInput={handleChangeWriteInput}
          onClose={handleCloseDialog}
          errorMsg={errorMsg}
        />
      )}
    </>
  );
};

export default MindmapContainer;
