import { errorAtom } from 'atoms/errorAtom';
import {
  editClickedAtom,
  expandedAtom,
  mutedAtom,
  playingAtom,
} from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import ReactPlayer from 'react-player';
import {
  centerAlign,
  desktopVp,
  disableTab,
  transition,
} from 'layouts/properties';
import styled, { css } from 'styled-components';
import fileDbAtom from 'atoms/fileDbAtom';
import { ReactComponent as MuteIcon } from 'assets/svg/MuteIcon.svg';
import { ReactComponent as UnmuteIcon } from 'assets/svg/UnmuteIcon.svg';
import { useRef } from 'react';

const VideosScreen = ({ src }) => {
  const videoRef = useRef<any>(null);
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
  const onMuted = () => {
    // 음소거 / 비음소거
    setMuted(!muted);
  };
  console.log(expanded);

  return (
    <>
      <Container>
        <Wrapper
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
          <VideoWrapper
            onClick={() => {
              // (0): 바꾸기
              if (expanded) {
                handleVideo();
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
            <MuteBtnContainer
              visible={fileDb.fileType === 'video' ? true : false}
              expanded={expanded}
            >
              <MuteBtnWrapper>
                <MuteBtn onClick={onMuted}>
                  {muted ? <UnmuteIcon /> : <MuteIcon />}
                </MuteBtn>
              </MuteBtnWrapper>
            </MuteBtnContainer>
          </VideoWrapper>
        </Wrapper>
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
const Wrapper = styled.div<{ expanded: boolean }>`
  ${transition('all')}
  height: 100%;
  width: 100%;
  @media (${desktopVp}) {
    width: ${({ expanded }) => (expanded ? '100%' : 'calc(100% - 2rem)')};
  }
  display: flex;
  position: relative;
  justify-content: center;
`;
const VideoWrapper = styled.div`
  position: absolute;
  display: flex;
  height: 100%; // max-height: 100% 은 이미지가 작다면 화면에 꽉 차지 않음
  max-width: 100%;
`;
const VideoPlayer = styled.video<{ expanded: boolean }>`
  ${transition('all')}
  background-color: seagreen;
  display: block;
  max-height: 100%;
  max-width: 100%;
  margin: auto;
  object-fit: contain;
  object-position: center;
  @media (${desktopVp}) {
    cursor: pointer;
    border-radius: ${({ expanded }) => (expanded ? '0' : '1rem')};
    &:active {
      transform: ${({ expanded }) => (expanded ? 'scale(1)' : 'scale(0.98)')};
    }
  }
`;

const MuteBtnContainer = styled.div<{ visible: boolean; expanded: boolean }>`
  ${transition('all')}
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  bottom: 0;
  right: 0;
  position: ${({ expanded }) => (expanded ? 'fixed' : 'absolute')};
`;
const MuteBtnWrapper = styled.div`
  padding-bottom: 1.5rem;
  padding-right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MuteBtn = styled.button`
  all: unset;
  z-index: 100000000;
  ${transition('all')}
  ${disableTab}
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  @media (${desktopVp}) {
    height: 3rem;
    width: 3rem;
  }
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  background-color: rgb(30, 30, 30);
  &:active {
    transform: scale(0.93);
  }
  svg {
    ${transition('transform')}
    height: 12px;
    @media (${desktopVp}) {
      height: 1rem;
    }
    width: auto;
    fill: #787878;
  }
`;

export default VideosScreen;
