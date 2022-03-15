import { useEffect, useState } from 'react';
import { AddMindmapDialog, MindmapList } from 'components/mindmaps';
import { useSelector } from 'react-redux';
import { listMindmapAsync } from 'redux/modules/mindmaps/mindmaps';
import { RootState } from 'redux/modules';
import { writeMindmapAsync } from 'redux/modules/mindmaps/mindmap';
import { writeNodeAsync } from 'redux/modules/mindmaps/node';
import { MindmapType } from 'utils/api/mindmaps';
import { useReduxDispatch } from 'redux/store';
import { withRouter } from 'react-router';

const MindmapListContainer = ({ history }) => {
  const dispatch = useReduxDispatch();
  const { mindmaps, mindmapsLoading, mindmapsError, mindmapError } =
    useSelector(({ mindmaps, mindmap }: RootState) => ({
      mindmaps: mindmaps.mindmaps,
      mindmapsLoading: mindmaps.loading,
      mindmapsError: mindmaps.error,
      mindmapError: mindmap.error,
    }));

  const handleWriteMindmap = async (newMindmapValues: MindmapType) => {
    const newMindmap = await dispatch(writeMindmapAsync(newMindmapValues));

    if (newMindmap) {
      await dispatch(
        writeNodeAsync(newMindmap._id, { name: newMindmap.title })
      );

      history.push(`/mindmap/${newMindmap._id}`);
    }
  };

  const [hasDialog, setHasDialog] = useState(false);

  const handleOpenDialog = () => setHasDialog(true);

  const handleCloseDialog = () => setHasDialog(false);

  useEffect(() => {
    dispatch(listMindmapAsync());
  }, [dispatch]);

  return (
    <>
      <MindmapList
        mindmaps={mindmaps}
        loading={mindmapsLoading}
        error={mindmapsError}
        onOpenDialog={handleOpenDialog}
      />
      {hasDialog && (
        <AddMindmapDialog
          visible={hasDialog}
          error={mindmapError}
          onWrite={handleWriteMindmap}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
};

export default withRouter(MindmapListContainer);
