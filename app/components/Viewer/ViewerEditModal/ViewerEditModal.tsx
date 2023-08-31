import fileDbAtom from 'atoms/fileDbAtom';
import { modeToggleAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import OnLimitedModeModal from './panels/OnLimitedModeModal';
import ModeModal from './panels/ModeModal';

// edit modal 중심부

const ViewerEditModal = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [modeToggle] = useAtom(modeToggleAtom);

  return fileDb.limit ? (
    <>
      <ModeModal />
    </>
  ) : (
    <>
      <OnLimitedModeModal visible={modeToggle} />
    </>
  );
};

export default ViewerEditModal;
