import { LoadingIcon } from 'components/common';
import React, {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { isEmptyArray } from 'utils/checkUtils';
import { stratifiedMindmap } from 'utils/mindmap';
import { AddNodeDialog, Mindmap } from '..';
import { StyledMindmapDetailSection } from './MindmapDetail.styled';

interface MindmapDetailProps {
  mindmap;
  onWrite: (newNode) => void;
}

const MindmapDetail = ({
  mindmap,
  onWrite,
  history,
}: MindmapDetailProps & RouteComponentProps) => {
  const mindmapId = mindmap?._id;

  // input state
  const [writeInput, setWriteInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // dialog state
  const [isWrite, setIsWrite] = useState(false);
  // parent state
  const [parent, setParent] = useState('');
  // tree data state
  const [treeData, setTreeData] = useState<any>();

  const handleClicks = {
    // click add node button
    addBtn: (e: MouseEventHandler<SVGGElement>, parentId: string) => {
      const rootNodeId = mindmap.body[0].node._id;
      const _parentId = parentId ? parentId : rootNodeId;

      setParent(_parentId);
      setIsWrite(true);
    },
    // click node
    node: (e: MouseEventHandler<SVGGElement>, nodeId: string) => {
      history.push(`/mindmap/${mindmapId}/${nodeId}`);
    },
    // close dialog
    closeDialog: () => {
      setIsWrite(false);
      setErrorMsg('');
    },
  };

  // change write input value
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

  // submit node name
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

    // write node
    onWrite({ name: writeInput, parentId: parent });

    setIsWrite(false);
    setErrorMsg('');
  };

  // set tree data
  useEffect(() => {
    if (!isEmptyArray(mindmap?.body) && mindmap) {
      setTreeData(stratifiedMindmap(mindmap?.body));
    }
  }, [mindmap]);

  if (!treeData) return <LoadingIcon />;

  return (
    <>
      <StyledMindmapDetailSection>
        <h2>
          <Link to={`/mindmap/${mindmapId}`} children={mindmap?.title} />
        </h2>
        <Mindmap
          treeData={treeData}
          onClickAddButton={handleClicks.addBtn}
          onClickNode={handleClicks.node}
        />
      </StyledMindmapDetailSection>

      {isWrite && (
        <AddNodeDialog
          visible={isWrite}
          onSubmit={handleSubmitWriteNode}
          onChangeInput={handleChangeWriteInput}
          onClose={handleClicks.closeDialog}
          errorMsg={errorMsg}
        />
      )}
    </>
  );
};

export default withRouter(MindmapDetail);
