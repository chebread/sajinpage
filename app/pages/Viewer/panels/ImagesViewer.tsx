import styled from 'styled-components';
import { useAtom } from 'jotai';
import fileDbAtom from 'atoms/fileDbAtom';
import { ImagesScreen } from 'layouts/screens';
import FullContentScreen from 'layouts/screens/FullContentScreen';
import transition from 'layouts/properties/transition';
import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp } from 'layouts/properties';
import ViewerMobileMenuBtn from 'components/Viewer/ViewerMenu/ViewerMobileMenuBtn';
import MobileScreen from 'layouts/screens/MobileScreen';

// (0): 세션 종료시 imageviewer 컴포넌트 / viewer menu 종료될때 천천히 사라지기 (transition) imageviewer 나타날때도 천천히 나타나기
// (0): Threads 같은 zoom in-out 기능 구현하기
// (0): Mobile은 여기서 버튼을 구동함

const ImagesViewer = () => {
  const [fileDb] = useAtom(fileDbAtom);

  // 기능을 작동시키는 버튼만 존재. 버튼의 component는 따로 구현
  return (
    <Container>
      <ImagesScreen src={fileDb.url} />
      {/* <MobileScreen>
        <ViewerMobileMenuBtn />
      </MobileScreen> */}
    </Container>
  );
};

const Container = styled.div`
  // 안쪽으로 모였다, 넓혔다하는 약간 animation 적용하기 height로 조정하는 것이 아닌!
  ${transition('all')}
  position: absolute;
  height: 100%;
  @media (${desktopVp}) {
    height: ${cssVarsPalette.desktop_content_full_height};
  }
  width: 100%;
`;

export default ImagesViewer;
