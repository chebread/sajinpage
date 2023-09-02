import { expandedAtom, mutedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import {
  centerAlign,
  desktopVp,
  disableTab,
  transition,
} from 'layouts/properties';
import styled from 'styled-components';
import { ReactComponent as MuteIcon } from 'assets/svg/MuteIcon.svg';
import { ReactComponent as UnmuteIcon } from 'assets/svg/UnmuteIcon.svg';
import fileDbAtom from 'atoms/fileDbAtom';

const MuteBtn = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [expanded, setExpanded] = useAtom(expandedAtom);
  const [muted, setMuted] = useAtom(mutedAtom);

  const onMuted = () => {
    setMuted(!muted);
  };

  return (
    <Container
      visible={fileDb.fileType === 'video' ? true : false}
      expanded={expanded}
    >
      <BtnWrapper>
        <Btn onClick={onMuted}>{muted ? <UnmuteIcon /> : <MuteIcon />}</Btn>
      </BtnWrapper>
    </Container>
  );
};

const Container = styled.div<{ expanded: boolean; visible: boolean }>`
  transition: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  z-index: ${({ visible }) => (visible ? '0' : '-1')};
  @media (${desktopVp}) {
    visibility: ${({ expanded, visible }) =>
      expanded && visible ? 'visible' : 'hidden'};
    opacity: ${({ expanded, visible }) => (expanded && visible ? '1' : '0')};
    z-index: ${({ expanded, visible }) => (expanded && visible ? '0' : '-1')};
  }
`;
const BtnWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin-bottom: 1.5rem;
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Btn = styled.button`
  all: unset;
  z-index: 100000000;
  ${transition('all')}
  ${disableTab}
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  @media (${desktopVp}) {
    height: 3rem;
    width: 3rem;
  }
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  background-color: rgb(30, 30, 30);
  &:active {
    transform: scale(0.85);
    @media (${desktopVp}) {
      transform: scale(0.93);
    }
  }
  svg {
    ${transition('transform')}
    height: 12px;
    @media (${desktopVp}) {
      height: 1rem;
    }
    width: auto;
    fill: #787878;
  }
`;

export default MuteBtn;
