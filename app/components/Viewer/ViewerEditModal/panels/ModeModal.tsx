import { modeToggleAtom, resetToggleAtom, viewedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import EditModeModal from './EditModeModal';
import ResetLimitedModeModal from './ResetLimitedModeModal';

// limited modal 중심 뷰어

const ModeModal = () => {
  const [modeToggle] = useAtom(modeToggleAtom);
  const [resetToggle] = useAtom(resetToggleAtom);
  const [viewed] = useAtom(viewedAtom);

  return (
    <>
      {/* 이거 contexnt만 바꾸기, modal은 동일시 하게 제공. (cancel icon도 분립) */}
      <ResetLimitedModeModal visible={viewed ? resetToggle : false} />

      <EditModeModal
        visible={
          viewed ? (modeToggle ? (resetToggle ? false : true) : false) : false
        }
      />
    </>
  );
};

export default ModeModal;
