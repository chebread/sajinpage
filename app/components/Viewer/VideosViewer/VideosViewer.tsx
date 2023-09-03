import { errorAtom } from 'atoms/errorAtom';
import {
  editClickedAtom,
  expandedAtom,
  mutedAtom,
  playingAtom,
  viewedAtom,
} from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp, transition } from 'layouts/properties';
import styled from 'styled-components';
import fileDbAtom from 'atoms/fileDbAtom';
import { useRef } from 'react';

// (0): player 중단 안되게 하기

const VideosScreen = ({ src }) => {
  const videoRef = useRef<any>(null);
  const [, setViewed] = useAtom(viewedAtom);
  const [fileDb] = useAtom(fileDbAtom);
  const [, onError] = useAtom(errorAtom);
  const [editClicked, setEditClicked] = useAtom(editClickedAtom);
  const [expanded, setExpanded] = useAtom(expandedAtom);
  const [playing, setPlaying] = useAtom(playingAtom);
  const [muted, setMuted] = useAtom(mutedAtom);

  const handleVideo = () => {
    setPlaying(!playing);
    if (playing === true) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <>
      <Container>
        <VideoWrapper
          expanded={expanded}
          onClick={() => {
            // (0): 이거 개편하기, Background로서 (memu modal의) 그렇게 제공하기
            // only mobile
            const currentWidth = window.innerWidth;
            if (currentWidth < 961) {
              setEditClicked(!editClicked);
            }
          }}
        >
          <VideoPlayer
            ref={videoRef}
            expanded={expanded}
            src={src}
            autoPlay
            loop
            muted={muted}
            onError={() => {
              // Uxpected error tracking (avif browser 지원안할때, file url 손상시, ...)
              onError({
                code: 400,
                message: '동영상 로딩중 알 수 없는 에러가 발생했습니다.',
              });
              setViewed(false);
            }}
            onClick={() => {
              // (0): 바꾸기
              // only desktop
              const currentWidth = window.innerWidth;
              if (currentWidth >= 961 && expanded === false) {
                setExpanded(!expanded);
              }
            }}
          ></VideoPlayer>
        </VideoWrapper>
      </Container>
    </>
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
const VideoPlayer = styled.video<{ expanded: boolean }>`
  ${transition('all')}
  display: block;
  height: 100%;
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
