import { cssVarsPalette } from 'layouts/cssVars';
import {
  centerAlign,
  desktopVp,
  disableSelection,
  disableTab,
} from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';
import { ReactComponent as CancelIcon } from 'assets/svg/CancelIcon.svg';
import { clickedAtom, loadedAtom, viewedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { Fragment, useEffect, useState } from 'react';
import { themeVars } from 'layouts/themes';
import ViewerBackground from '../ViewerMenu/ViewerBackground';
import { toast } from 'react-hot-toast';
import { deleteFiles, updateFiles } from 'api';
import fileDbAtom from 'atoms/fileDbAtom';
import getWebsiteUrl from 'lib/getWebsiteUrl';
import copyText from 'lib/copyText';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import Select from 'react-select';
import addTime from 'lib/addTime';
import getCurrentTime from 'lib/getCurrentTime';
import dateToString from 'lib/dateToString';
import supabase from 'lib/supabase';

// (0): 이게 복잡해 졌으므로 다시 그냥 독립적으로 imageviewer에 메뉴를 띄우는 것도 고려하자

const ViewerHeader = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [viewed] = useAtom(viewedAtom); // check that current route is viewer
  const [clicked, setClicked] = useAtom(clickedAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [modeToggle, setModeToggle] = useState(true); // atom으로 치환하기
  const [resetToggle, setResetToggle] = useState(false);

  useEffect(() => {
    // 세션종료시 즉시 메뉴 사라지게함
    if (!viewed) {
      onCancel();
    }
  }, [viewed]);

  const onMenu = () => {
    setClicked(!clicked);
  };
  const onCopy = async () => {
    const text = getWebsiteUrl(`/v/${fileDb.docId}`);
    await copyText(text)
      .then(() => {
        toast.success('Copied');
      })
      .catch(() => {
        toast.error('Copy error');
      });
    setClicked(false);
  };
  const onDelete = async () => {
    await deleteFiles(fileDb.docId)
      .then(() => {
        toast.success('delete file');
      })
      .catch(() => {
        toast.error('파일 삭제중 오류 발생');
      });
  };

  const initValues = () => {
    setModeToggle(false);
    setResetToggle(false);
    setClicked(false);
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
    setClicked(false);
  };

  return (
    <>
      <ContainerWrapper>
        <Container>
          <AsideLeftWrapper>
            <ButtonWrapper></ButtonWrapper>
          </AsideLeftWrapper>
          <LogoWrapper>
            <LogoBtn to="/">
              <Logo />
            </LogoBtn>
          </LogoWrapper>
          <AsideRightWrapper>
            <ButtonWrapper>
              <Btn visible={viewed} onClick={onMenu}>
                <DotIcon />
              </Btn>
            </ButtonWrapper>
          </AsideRightWrapper>
        </Container>
      </ContainerWrapper>

      <ModalContainer visible={clicked}>
        <Modal onClick={onCopy}>
          <ModalWrapper>링크 복사</ModalWrapper>
        </Modal>
        {fileDb.limit ? (
          <>
            <Modal onClick={onModeToggle}>
              <ModalWrapper>제한모드 재설정</ModalWrapper>
            </Modal>
          </>
        ) : (
          // normal mode
          <>
            <Modal onClick={onModeToggle}>
              <ModalWrapper>제한모드 켜기</ModalWrapper>
            </Modal>
          </>
        )}
        <Modal onClick={onDelete}>
          <ModalWrapper>삭제</ModalWrapper>
        </Modal>
      </ModalContainer>

      {fileDb.limit ? (
        // (0): 이건 floatmodal을 2개가 아닌 1개로 하며, btn만 visible 감싸기!!! => 구분하자.
        <>
          <FloatModalContainer visible={modeToggle}>
            <Select onChange={onModeSelect} options={timeLimitOptions} />
            <button onClick={() => setResetToggle(false)}>취소</button>

            <button onClick={onResetToggle}>limit mode 값 재설정하기</button>
            <button onClick={onTurnOffLimitMode}>limit mode 끄기</button>
            <button onClick={onCancel}>취소</button>
            <FloatBackground visible={modeToggle} onClick={onCancel} />
          </FloatModalContainer>
        </>
      ) : (
        <>
          <FloatModalContainer visible={modeToggle}>
            <FloatModal>
              <FloatModalHeader>
                <CancelButton onClick={onCancel}>
                  <CancelIcon />
                </CancelButton>
              </FloatModalHeader>

              {/* <Select onChange={onModeSelect} options={timeLimitOptions} /> */}
            </FloatModal>
            <FloatBackground visible={modeToggle} onClick={onCancel} />
          </FloatModalContainer>
        </>
      )}
      <ViewerBackground />
    </>
  );
};

const CancelButton = styled.button`
  all: unset;
  margin-left: 0.5rem;
  ${disableTab}
  ${transition('all')}
  z-index: 10000;
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  &:hover {
    background-color: rgb(235, 235, 235);
    svg {
      transform: scale(1.07);
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    svg {
      transform: scale(0.98);
    }
  }
  svg {
    ${transition('transform')}
    height: 13px; // 1rem
    fill: #ffffff;
  }
`;
const FloatModalHeader = styled.div`
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 53px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const FloatModal = styled.div`
  position: fixed;
  height: 28rem;
  width: 600px;
  border-radius: 1rem;
  background-color: #ffffff;
`;
const FloatModalContainer = styled.div<{ visible: boolean }>`
  ${transition('all')}
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  @media (${desktopVp}) {
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    z-index: ${({ visible }) =>
      visible ? '1000000' : '-1'}; // modalcontainer모다는 항시 커야함
  }
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  ${centerAlign}
`;
const FloatBackground = styled.div<{ visible: boolean }>`
  display: block;
  ${transition('all')}
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: -1;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;
const ModalContainer = styled.div<{ visible: boolean }>`
  ${transition('all')}
  cursor: pointer;
  visibility: hidden; // mobile은 다른 하단 modal이 튀어나옴!
  opacity: 0;
  z-index: -1;
  @media (${desktopVp}) {
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    z-index: ${({ visible }) => (visible ? '100000' : '-1')};
  }
  position: fixed;
  right: 0;
  margin-right: 3rem;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 1rem;
`;
const Modal = styled.div`
  ${transition('all')}
  height: 3rem;
  width: 10rem;
  display: flex;
  align-items: center;
  &:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  &:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
  &:not(:last-child) {
    border-bottom: rgba(0, 0, 0, 0.15) 0.5px solid;
  }
  ${disableSelection}
  font-weight: 600;
  &:last-child {
    color: #ff2f40; // #e03131
  }
  @media (${desktopVp}) {
    &:hover {
      background-color: rgb(235, 235, 235);
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
  }
`;
const ModalWrapper = styled.div`
  padding-left: 1rem;
`;

const ContainerWrapper = styled.div`
  ${transition('padding-top')}
  padding-top: ${cssVarsPalette.header_height};
`;
const Container = styled.div`
  ${transition('all')}
  position: fixed;
  margin-bottom: -3rem;
  transform: translateY(-100%);
  @media (${desktopVp}) {
    margin-bottom: auto;
    transform: translateY(0);
  }
  top: 0;
  z-index: 10000;
  height: ${cssVarsPalette.header_height};
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${themeVars.light.background_color};
`;
const Wrapper = styled.div`
  height: 100%;
  width: 33%;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
`;
const AsideLeftWrapper = styled(Wrapper)`
  justify-content: flex-start;
`;
const AsideRightWrapper = styled(Wrapper)`
  justify-content: flex-end;
`;
const LogoWrapper = styled(Wrapper)`
  justify-content: center;
`;

const LogoBtn = styled(Link)`
  all: unset;
  cursor: pointer;
  ${disableTab}
  svg {
    ${transition('transform', 'height')}
    height: 1.5rem;
    @media (${desktopVp}) {
      height: 2rem;
    }
    @media (${desktopVp}) {
      &:hover {
        transform: scale(1.07);
      }
    }
    &:active {
      transform: scale(0.88);
      @media (${desktopVp}) {
        transform: scale(0.98);
      }
    }
  }
`;
const ButtonWrapper = styled.div`
  ${transition('all')}
  padding-left: 1rem;
  padding-right: 1rem;
  @media (${desktopVp}) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;
const Btn = styled.button<{ visible: boolean }>`
  all: unset;
  cursor: pointer;
  ${transition('all')}
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) => (visible ? '0' : '-1')};

  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  ${transition('background-color')}
  &:hover {
    background-color: rgb(235, 235, 235);
    svg {
      transform: scale(1.07);
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    svg {
      transform: scale(0.98);
    }
  }
  svg {
    ${transition('transform')}
    height: 1.1rem;
  }
`;

export default ViewerHeader;

{
  /* <FloatModalContainer visible={resetToggle}>
            <Select onChange={onModeSelect} options={timeLimitOptions} />
            <button onClick={onCancel}>취소</button>
          </FloatModalContainer>
          <FloatModalContainer visible={modeToggle}>
            <button onClick={onResetToggle}>limit mode 값 재설정하기</button>
            <button onClick={onTurnOffLimitMode}>limit mode 끄기</button>
            <button onClick={onCancel}>취소</button>
          </FloatModalContainer> */
}

{
  /* <FloatWrapper visible={resetToggle}>
              <Select onChange={onModeSelect} options={timeLimitOptions} />
              <button onClick={() => setResetToggle(false)}>취소</button>
            </FloatWrapper>
            <FloatWrapper visible={!resetToggle}>
              <button onClick={onResetToggle}>limit mode 값 재설정하기</button>
              <button onClick={onTurnOffLimitMode}>limit mode 끄기</button>
              <button onClick={onCancel}>취소</button>
            </FloatWrapper> */
}

// const FloatWrapper = styled.div<ModalPropsType>`
//   visibility: hidden;
//   opacity: 0;
//   z-index: -1;
//   @media (${desktopVp}) {
//     ${transition('all')}
//     visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
//     opacity: ${({ visible }) => (visible ? 1 : 0)};
//     z-index: ${({ visible }) => (visible ? '1000000' : '-1')};
//   }
//   background-color: seagreen;
// `;
