import { clickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';
import getWebsiteUrl from 'lib/getWebsiteUrl';
import fileDbAtom from 'atoms/fileDbAtom';
import CopyToClipboard from 'react-copy-to-clipboard';
import onDelete from 'components/onDelete';
import Select from 'react-select';
import getUrl from 'lib/getUrl';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import { useState } from 'react';
import supabase from 'lib/supabase';
import { updateFiles } from 'api';
import getCurrentTime from 'lib/getCurrentTime';
import dateToString from 'lib/dateToString';
import addTime from 'lib/addTime';

// mobile에서만 보이며, viewermenu에서 mobile에서 viewermenu를 구현하기 위해 사용되는 컴포넌트임
// (0): 아래에서 위로 스크롤시 edit menu 활성화 됨

const ViewerMenu = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useAtom(clickedAtom);
  const [fileDb] = useAtom(fileDbAtom);
  const url = getUrl(); // current app url
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [modeToggle, setModeToggle] = useState(false);
  const [resetToggle, setResetToggle] = useState(false);

  const initValues = () => {
    setModeToggle(false);
    setResetToggle(false);
  };
  const onModeToggle = () => {
    setModeToggle(!modeToggle);
  };
  const onResetToggle = () => {
    setResetToggle(!resetToggle);
  };
  const onTurnOffLimitMode = async () => {
    // turn on public mode
    const { data: fileUrl, error: fileUrlError }: any = supabase.storage
      .from('images')
      .getPublicUrl(fileDb.fileId);
    const url = fileUrl.publicUrl;
    // update files
    await updateFiles({
      docId: fileDb.docId,
      url: url,
      limit: false,
      accessTime: '',
    }).catch(error => {
      console.log(error);
    });
    initValues();
  };
  const onModeSelect = async (e: any) => {
    // turn on limit mode
    const { value } = e; // value is timeLimit
    if (value) {
      const timeLimit = value;
      // update accessTime
      const currentTime = getCurrentTime();
      const accessTime = dateToString(
        addTime({ currentTime: currentTime, sec: timeLimit })
      );
      // update limit url
      const { data: fileUrl, error: fileUrlError }: any = await supabase.storage
        .from('images')
        .createSignedUrl(fileDb.fileId, timeLimit);
      // signed url error checking
      if (fileUrlError) {
        // an error occurs
        throw new Error('file signed url 생성중 오류 발생');
      }
      const url = fileUrl.signedUrl;
      // update file
      await updateFiles({
        docId: fileDb.docId,
        url: url,
        limit: true,
        accessTime: accessTime,
      }).catch(error => {
        console.log(error);
      });
      initValues();
    }
  };
  const onCancel = () => {
    setModeToggle(false);
    setResetToggle(false);
  };

  const onRedirect = () => {
    navigate('/');
  };
  const onClickMenu = () => {
    setClicked(!clicked);
  };
  const onCancelBg = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Btn onClick={onClickMenu}>
            <DotIcon />
          </Btn>
        </Wrapper>
        <Background visible={clicked} onClick={onCancelBg} />
        <>
          <ContainerX visible={clicked}>
            <CopyToClipboard
              text={getWebsiteUrl(`/v/${fileDb.docId}`)}
              onCopy={() => {
                // when copied
              }}
            >
              <button>Share</button>
            </CopyToClipboard>
            <button onClick={() => onDelete(fileDb.docId)}>delete file</button>
            {fileDb.limit ? (
              // limit mode
              modeToggle ? (
                <>
                  {resetToggle ? (
                    //  time limit 시간 설정하기 (같음)
                    <>
                      <Select
                        onChange={onModeSelect}
                        options={timeLimitOptions}
                      />
                      <button onClick={onCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={onResetToggle}>
                        limit mode 값 재설정하기
                      </button>
                      <button onClick={onTurnOffLimitMode}>
                        limit mode 끄기
                      </button>
                      <button onClick={onCancel}>Cancel</button>
                    </>
                  )}
                </>
              ) : (
                <button onClick={onModeToggle}>limit mode 재설정하기</button>
              )
            ) : // normal mode
            modeToggle ? (
              //  time limit 시간 설정하기 (같음)
              <>
                <Select onChange={onModeSelect} options={timeLimitOptions} />
                <button onClick={onCancel}>Cancel</button>
              </>
            ) : (
              <button onClick={onModeToggle}>limit mode 켜기</button>
            )}
          </ContainerX>
        </>
      </Container>
    </>
  );
};

const Container = styled.div`
  ${transition('all')}
  visibility: visible;
  opacity: 1;
  z-index: -1;
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
  }
`;

const Background = styled.div<{ visible: boolean }>`
  display: block;
  ${transition('all')}
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: ${({ visible }) => (visible ? '10000' : '-1')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const ContainerX = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 0;
  height: 20%;
  width: 100%;
  z-index: 10000;
  transform-origin: 0 100%;
  ${transition('transform')}
  transform: ${({ visible }) =>
    visible ? 'translateY(0)' : 'translateY(100%)'};
  background-color: #fff;
`;

const Wrapper = styled.div`
  ${transition('all')}
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
  ${disableTab}
  ${transition('all')}
  z-index: 10000;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  background-color: #1e1e1e;
  &:active {
    transform: scale(0.85);
    svg {
      transform: scale(0.85);
    }
  }
  svg {
    ${transition('transform')}
    height: 1rem;
    fill: #ffffff;
  }
  /* margin-bottom: 0.5rem; */
`;

export default ViewerMenu;
