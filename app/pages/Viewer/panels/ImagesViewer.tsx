import styled from 'styled-components';
import { useAtom } from 'jotai';
import fileDbAtom from 'atoms/fileDbAtom';
import { ImagesScreen } from 'layouts/screens';
import transition from 'layouts/properties/transition';
import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import { themeVars } from 'layouts/themes';
import ViewerMenu from 'components/Viewer/ViewerMenu';
import { expandedAtom } from 'atoms/viewerAtom';
import { ReactComponent as CancelIcon } from 'assets/svg/CancelIcon.svg';

// (0): 세션 종료시 imageviewer 컴포넌트 / viewer menu 종료될때 천천히 사라지기 (transition) imageviewer 나타날때도 천천히 나타나기
// (0): Threads 같은 zoom in-out 기능 구현하기
// (0): 여기서 type 체킹후 pdf / image 보여주기

const ImagesViewer = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [expanded, setExpanded] = useAtom(expandedAtom);

  const onCollapse = () => {
    setExpanded(false);
  };
  // 기능을 작동시키는 버튼만 존재. 버튼의 component는 따로 구현
  return (
    <>
      <CenterScreen expanded={expanded}>
        <Container expanded={expanded}>
          <ImagesScreen src={fileDb.url} />
        </Container>
      </CenterScreen>
      <X expanded={expanded}>
        <Wrapper>
          <Btn onClick={onCollapse}>
            <CancelIcon />
          </Btn>
        </Wrapper>
      </X>
      <ViewerMenu />
    </>
  );
};

const X = styled.div<{ expanded: boolean }>`
  transition: all;
  transition-duration: 0s; // animation 있으면 눈이 너무 아픔 // 근데 에니메이션 없에면 즉각 반영으로 이상함으로 ease-out을 동작시키기 위해 0s라고 설정함
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

const Wrapper = styled.div`
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
    svg {
      transform: scale(1.07);
    }
  }
  &:active {
    background-color: rgb(35, 35, 35);
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
  top: 0;
  top: 50%;
  transform: translate(0, -50%); // 중앙정렬
`;

const Container = styled.div<{ expanded: boolean }>`
  transition: background-color;
  transition-duration: 0.125s; // 0.15s // 0.2s animation은 눈이 너무 아픔
  transition-timing-function: ease-out;
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

export default ImagesViewer;
