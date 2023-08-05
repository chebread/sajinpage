import styled from 'styled-components';
import { useAtom } from 'jotai';
import fileDbAtom from 'atoms/fileDbAtom';
import { ImagesScreen } from 'layouts/screens';
import transition from 'layouts/properties/transition';
import { cssVars } from 'layouts/cssVars';
import { centerAlign, desktopVp } from 'layouts/properties';
import { themeVars } from 'layouts/themes';
import ViewerMenu from 'components/Viewer/ViewerMenu';

// (0): 세션 종료시 imageviewer 컴포넌트 / viewer menu 종료될때 천천히 사라지기 (transition) imageviewer 나타날때도 천천히 나타나기
// (0): Threads 같은 zoom in-out 기능 구현하기

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
  // 확대, 축소의 animation을 위해 center container를 추가함
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  ${centerAlign}
  top: 0;
  // (0): header를 왜 가리는지는 잘 모르겠음
`;

const Container = styled.div`
  ${transition('all')}
  position: absolute;
  height: 100%;
  background-color: ${themeVars.dark.background_color};
  @media (${desktopVp}) {
    height: ${cssVars.desktop.content_full_height};
    background-color: ${themeVars.light.background_color};
  }
  width: 100%;
`;

export default ImagesViewer;
