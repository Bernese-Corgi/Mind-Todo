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
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';

interface MindmapContainerProps {
  history;
  match;
}

const MindmapContainer = ({ history, match }: MindmapContainerProps) => {
  const dispatch = useReduxDispatch();
  const { mindmap, node } = useSelector((state: RootState) => state);

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

  const handleClickAddButton = (
    e: MouseEventHandler<SVGGElement>,
    parentId: string
  ) => {
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

    dispatch(readMindmapAsync(mindmapId));

    setIsWrite(false);
  };

  const handleClickNode = (e, nodeId) => {
    history.push(`/mindmap/${mindmapId}/${nodeId}`);
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
      <ParentSize>
        {({ width, height }) => (
          <Mindmap
            width={width}
            height={height - 5}
            mindmap={mindmap.data}
            onClickAddButton={handleClickAddButton}
            onClickNode={handleClickNode}
            treeData={treeData}
            rootNode={node.data?.tree}
          />
        )}
      </ParentSize>

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
