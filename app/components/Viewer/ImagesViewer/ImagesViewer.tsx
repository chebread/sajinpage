import { errorAtom } from 'atoms/errorAtom';
import { editClickedAtom, expandedAtom, viewedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

// (0): mobile safari 에서 100vh 인데 갑자기 축소되서 이상해지는 현상

const ImagesViewer = ({ src }) => {
  const [, setViewed] = useAtom(viewedAtom);
  const [, onError] = useAtom(errorAtom);
  const [editClicked, setEditClicked] = useAtom(editClickedAtom);
  const [expanded, setExpanded] = useAtom(expandedAtom); // 전체화면 축소 / 확대

  return (
    <>
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
              if (currentWidth >= 961 && expanded === false) {
                setExpanded(!expanded);
              }
            }}
            onError={() => {
              onError({
                code: 400,
                message: '이미지 로드 중 알 수 없는 에러가 발생했습니다.',
              });
              setViewed(false); // (0): onError 함수에 통합하는 방향 검토
            }}
          ></Image>
          <ExpandBackground
            expanded={expanded}
            onClick={() => {
              // only desktop
              const currentWidth = window.innerWidth;
              if (currentWidth >= 961 && expanded === true) {
                setExpanded(!expanded);
              }
            }}
          ></ExpandBackground>
        </ImageWrapper>
      </Container>
    </>
  );
};
const ExpandBackground = styled.div<{ expanded: boolean }>`
  position: absolute;
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
  ${transition('all')}
  height: 100%;
  width: 100%;
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${centerAlign}
`;
const ImageWrapper = styled.div<{ expanded: boolean }>`
  ${transition('all')}
  position: relative;
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
  position: absolute;
  z-index: 1000;
  display: block;
  height: 100%; // max-height: 100% 은 이미지가 작다면 화면에 꽉 차지 않음
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
export default ImagesViewer;
