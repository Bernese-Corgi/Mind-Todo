import { LoadingIcon } from 'components/common';
import React, {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { CustomHierarchyNode, MindmapType, NodeType } from 'utils/api/mindmaps';
import { isEmptyArray } from 'utils/arrayUtils';
import { stratifiedMindmap } from 'utils/mindmap';
import { AddNodeDialog, Mindmap, MindmapTitle } from '..';
import { StyledMindmapDetailSection } from './MindmapDetail.styled';

interface MindmapDetailProps {
  mindmap: MindmapType;
  onWrite: (newNode) => void;
  onEdit: (updateMindmapTitle: string) => void;
  onRemove: () => void;
}

interface MindmapDetailParams {
  mindmapId?: string;
  nodeId?: string;
}

const MindmapDetail = ({
  mindmap,
  onWrite,
  onEdit,
  onRemove,
  history,
  match,
}: MindmapDetailProps & RouteComponentProps<MindmapDetailParams>) => {
  const mindmapId = mindmap?._id;

  // input state
  const [writeInput, setWriteInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // dialog state
  const [isWrite, setIsWrite] = useState(false);
  // parent state
  const [parent, setParent] = useState('');
  // tree data state
  const [treeData, setTreeData] = useState<CustomHierarchyNode>();

  const handleClicks = {
    // click add node button
    addBtn: useCallback(
      (e: MouseEventHandler<SVGGElement>, parentId: string) => {
        const rootNodeId = (mindmap!.body![0].node as NodeType)._id;
        const _parentId = parentId ? parentId : rootNodeId;

        _parentId && setParent(_parentId);
        setIsWrite(true);
      },
      [mindmap]
    ),
    // click node
    node: useCallback(
      (e: MouseEventHandler<SVGGElement>, nodeId: string) => {
        history.push(`/mindmap/${mindmapId}/${nodeId}`);
      },
      [history, mindmapId]
    ),
    // close dialog
    closeDialog: useCallback(() => {
      setIsWrite(false);
      setErrorMsg('');
    }, []),
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

    const overlapNodeName = mindmap!.body!.find(
      tree => (tree.node as NodeType).name === writeInput
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
    if (mindmap!.body) {
      if (!isEmptyArray(mindmap!.body) && mindmap) {
        setTreeData(stratifiedMindmap(mindmap!.body));
      }
    }
  }, [mindmap]);

  useEffect(() => {
    // console.log(mindmap);
    // console.log(treeData);
  }, [mindmap, treeData]);

  if (!treeData) return <LoadingIcon />;

  if (!mindmap) return <LoadingIcon />;

  return (
    <>
      <StyledMindmapDetailSection>
        {match.params.nodeId ? (
          // NodePage인 경우
          <h2 className="mindmapTitle">
            <Link to={`/mindmap/${mindmapId}`} children={mindmap.title} />
          </h2>
        ) : (
          // MindmapPage인 경우
          <MindmapTitle
            title={mindmap.title}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        )}
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
