import styled from 'styled-components';
import { useAtom } from 'jotai';
import fileDbAtom from 'atoms/fileDbAtom';
import { ImagesScreen } from 'layouts/screens';
import transition from 'layouts/properties/transition';
import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp } from 'layouts/properties';
import { themeVars } from 'layouts/themes';
import ViewerMenu from 'components/Viewer/ViewerMenu';

// (0): 세션 종료시 imageviewer 컴포넌트 / viewer menu 종료될때 천천히 사라지기 (transition) imageviewer 나타날때도 천천히 나타나기
// (0): Threads 같은 zoom in-out 기능 구현하기
// (0): 여기서 type 체킹후 pdf / image 보여주기

const ImagesViewer = () => {
  const [fileDb] = useAtom(fileDbAtom);

  // 기능을 작동시키는 버튼만 존재. 버튼의 component는 따로 구현
  return (
    <>
      <CenterScreen>
        <Container>
          <ImagesScreen src={fileDb.url} />
        </Container>
      </CenterScreen>
      <ViewerMenu />
    </>
  );
};

const CenterScreen = styled.div`
  ${transition('height')}
  position: fixed;
  height: 100%;
  @media (${desktopVp}) {
    height: ${cssVarsPalette.content_full_height};
  }
  width: 100%;
  top: 0;
  top: 50%;
  transform: translate(0, -50%); // 중앙정렬
`;

const Container = styled.div`
  ${transition('background-color')}
  height: 100%;
  background-color: ${themeVars.dark.background_color};
  @media (${desktopVp}) {
    background-color: ${themeVars.light.background_color};
  }
  width: 100%;
`;

export default ImagesViewer;
