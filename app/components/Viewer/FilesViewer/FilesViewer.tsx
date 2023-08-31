import styled from 'styled-components';
import { useAtom } from 'jotai';
import { ReactComponent as CancelIcon } from 'assets/svg/CancelIcon.svg';
import ImagesViewer from '../ImagesViewer';
import VideosViewer from '../VideosViewer';
import fileDbAtom from 'atoms/fileDbAtom';
import transition from 'layouts/properties/transition';
import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import { themeVars } from 'layouts/themes';
import { expandedAtom } from 'atoms/viewerAtom';

// (0): Threads 같은 zoom in-out 기능 구현하기
// (0): Threads 같은 음소거 / 비음소거 버튼 구현하기

const FilesViewer = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [expanded, setExpanded] = useAtom(expandedAtom);

  const onCollapse = () => {
    setExpanded(false);
  };

  return (
    <>
      <CenterScreen expanded={expanded}>
        <Container expanded={expanded}>
          {(() => {
            switch (fileDb.fileType) {
              case 'image':
                return <ImagesViewer src={fileDb.url} />;
              case 'video':
                return <VideosViewer src={fileDb.url} />;
              default:
                null;
            }
          })()}
        </Container>
      </CenterScreen>
      <CancelBtnContainer expanded={expanded}>
        <CancelBtnWrapper>
          <Btn onClick={onCollapse}>
            <CancelIcon />
          </Btn>
        </CancelBtnWrapper>
      </CancelBtnContainer>
    </>
  );
};

const CancelBtnContainer = styled.div<{ expanded: boolean }>`
  transition: all;
  transition-duration: 0s;
  transition-timing-function: ease-out;
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  @media (${desktopVp}) {
    visibility: ${({ expanded }) => (expanded ? 'visible' : 'hidden')};
    opacity: ${({ expanded }) => (expanded ? '1' : '0')};
    z-index: ${({ expanded }) => (expanded ? '0' : '-1')};
  }
`;

const CancelBtnWrapper = styled.div`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
`;
const Btn = styled.button`
  all: unset;
  ${transition('all')}
  ${disableTab}
  z-index: 100000;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  background-color: rgb(30, 30, 30);
  &:hover {
    /* background-color: rgb(35, 35, 35); */
    svg {
      /* transform: scale(1.07); */
    }
  }
  &:active {
    transform: scale(0.93);
  }
  svg {
    ${transition('transform')}
    height: 1rem;
    fill: #787878;
  }
`;

const CenterScreen = styled.div<{ expanded: boolean }>`
  ${transition('all')}
  position: fixed;
  height: 100%;
  @media (${desktopVp}) {
    height: ${({ expanded }) =>
      expanded ? '100%' : `${cssVarsPalette.content_full_height}`};
  }
  width: 100%;
  // 중앙 정렬
  /* top: 50%;
  transform: translate(0, -50%); */
  top: 0;
  @media (${desktopVp}) {
    top: ${({ expanded }) => (expanded ? '0' : '4rem')};
  }
`;

const Container = styled.div<{ expanded: boolean }>`
  ${transition('all')}
  height: 100%;
  width: 100%;
  background-color: ${themeVars.dark.background_color};
  @media (${desktopVp}) {
    background-color: ${({ expanded }) =>
      expanded
        ? `${themeVars.dark.background_color}`
        : `${themeVars.light.background_color}`};
  }
`;

export default FilesViewer;
