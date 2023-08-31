import { errorAtom } from 'atoms/errorAtom';
import { editClickedAtom, expandedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, transition } from 'layouts/properties';
import styled, { css } from 'styled-components';

const VideosScreen = ({ src }) => {
  const [, onError] = useAtom(errorAtom);
  const [editClicked, setEditClicked] = useAtom(editClickedAtom);
  const [expanded, setExpanded] = useAtom(expandedAtom);

  return (
    // <Container>
    //   <ReactPlayer
    //     height={'100%'}
    //     width={'auto'}
    //     url={src}
    //     playing={true}
    //     controls
    //     loop
    //   />
    // </Container>
    <Container>
      <VideoWrapper
        expanded={expanded}
        onClick={() => {
          // only mobile
          const currentWidth = window.innerWidth;
          if (currentWidth < 961) {
            setEditClicked(!editClicked);
          }
        }}
      >
        <Video
          expanded={expanded}
          onClick={() => {
            // only desktop
            const currentWidth = window.innerWidth;
            if (currentWidth >= 961 && expanded === false) {
              setExpanded(!expanded);
            }
          }}
        >
          {/* <ReactPlayer
            url={src}
            playing
            loop
            muted
            width="100%"
            height="100%"
            onError={error => {
              // Uxpected error tracking (avif browser 지원안할때, file url 손상시, ...)
              onError({
                code: 400,
                message: '동영상 로딩중 알 수 없는 에러가 발생했습니다.',
              });
            }}
          /> */}
        </Video>
      </VideoWrapper>
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
const VideoWrapper = styled.div<{ expanded: boolean }>`
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
const Video = styled.div<{ expanded: boolean }>`
  ${transition('all')}
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

export default VideosScreen;
