import { errorAtom } from 'atoms/errorAtom';
import { editClickedAtom, expandedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

// (0): mobile safari 에서 100vh 인데 갑자기 축소되서 이상해지는 현상
// (0): click 하는 것을 하나의 컨테이너로 관리하기

const ImagesScreen = ({ src }) => {
  const [, onError] = useAtom(errorAtom);
  const [editClicked, setEditClicked] = useAtom(editClickedAtom);
  const [expanded, setExpanded] = useAtom(expandedAtom); // 전체화면 축소 / 확대

  return (
    <Container>
      <ImageWrapper
        expanded={expanded}
        onClick={() => {
          // only mobile
          const currentWidth = window.innerWidth;
          if (currentWidth < 961) {
            setEditClicked(!editClicked);
          }
        }}
      >
        <Image
          src={src}
          draggable={false}
          expanded={expanded}
          onClick={() => {
            // only desktop
            const currentWidth = window.innerWidth;
            if (currentWidth >= 961) {
              setExpanded(!expanded);
            }
          }}
          onError={() => {
            // Uxpected error tracking (avif browser 지원안할때, file url 손상시, ...)
            onError({
              code: 400,
              message: 'ImagesViewer에서 image를 불러오는 중에 에러가 발생함',
            });
          }}
        />
      </ImageWrapper>
    </Container>
  );
};
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${centerAlign}
`;
const ImageWrapper = styled.div<{ expanded: boolean }>`
  ${transition('all')}
  height: 100%;
  width: 100%;
  @media (${desktopVp}) {
    width: ${({ expanded }) => (expanded ? '100%' : 'calc(100% - 2rem)')};
  }
  display: flex;
  flex-direction: column;
  ${centerAlign}
`;
const Image = styled.img<{ expanded: boolean }>`
  ${transition('all')}
  display: block;
  max-height: 100%;
  max-width: 100%;
  margin: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 0;
  @media (${desktopVp}) {
    cursor: pointer;
    border-radius: ${({ expanded }) => (expanded ? '0' : '1rem')};
    &:active {
      transform: ${({ expanded }) => (expanded ? 'scale(1)' : 'scale(0.98)')};
    }
  }
`;
export default ImagesScreen;
