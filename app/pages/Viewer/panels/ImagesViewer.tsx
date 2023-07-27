import styled from 'styled-components';
import { useAtom } from 'jotai';
import fileDbAtom from 'atoms/fileDbAtom';
import { ImagesScreen } from 'layouts/screens';
import FullContentScreen from 'layouts/screens/FullContentScreen';
import transition from 'layouts/properties/transition';
import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp } from 'layouts/properties';

// (0): 세션 종료시 imageviewer 컴포넌트 / viewer menu 종료될때 천천히 사라지기 (transition) imageviewer 나타날때도 천천히 나타나기
// (0): Threads 같은 zoom in-out 기능 구현하기

const ImagesViewer = () => {
  const [fileDb] = useAtom(fileDbAtom);

  // 기능을 작동시키는 버튼만 존재. 버튼의 component는 따로 구현
  return (
    <Container>
      <ImagesScreen src={fileDb.url} />
    </Container>
  );
};

const Container = styled(FullContentScreen)`
  // (0): 왜 전체의 height가 적용되는지는 모르겠음 => 전체의 height를 img도 전체를 Height로 잡으니 영향을 받는 것임
  position: relative;
  // animation
  ${transition('height', 'width')}
  height: ${cssVarsPalette.mobile_content_full_height};
  @media (${desktopVp}) {
    height: ${cssVarsPalette.desktop_content_full_height};
  }
  width: 100%;
`;

export default ImagesViewer;
