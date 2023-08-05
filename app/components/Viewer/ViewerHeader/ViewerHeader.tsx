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
import { clickedAtom, loadedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { themeVars } from 'layouts/themes';
import ViewerBackground from '../ViewerMenu/ViewerBackground';
import { toast } from 'react-hot-toast';
import { deleteFiles } from 'api';
import fileDbAtom from 'atoms/fileDbAtom';
import CopyToClipboard from 'react-copy-to-clipboard';
import getWebsiteUrl from 'lib/getWebsiteUrl';

// (0): desktop menu modal 만들기 => threads 처럼 구성하며, atom value를 사용함
// (0): desktop 용이기에 mobile 대응 제거하기

const ViewerHeader = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [clicked, setClicked] = useAtom(clickedAtom);
  const [loaded] = useAtom(loadedAtom); // check that current route is viewer

  const onMenu = () => {
    setClicked(!clicked);
  };
  const onCopy = () => {
    setClicked(false);
    toast.success('Copied');
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
              {loaded ? (
                <Btn onClick={onMenu}>
                  <DotIcon />
                </Btn>
              ) : (
                ''
              )}
            </ButtonWrapper>
          </AsideRightWrapper>
        </Container>
      </ContainerWrapper>

      <ModalContainer visible={clicked}>
        <CopyModal text={getWebsiteUrl(`/v/${fileDb.docId}`)} onCopy={onCopy}>
          <ModalWrapper>링크 복사</ModalWrapper>
        </CopyModal>
        <Modal>
          <ModalWrapper>제한모드 켜기</ModalWrapper>
        </Modal>
        <Modal onClick={onDelete}>
          <ModalWrapper>삭제</ModalWrapper>
        </Modal>
      </ModalContainer>
      <ViewerBackground />
    </>
  );
};
type ModalPropsType = {
  visible: boolean;
};

const ModalContainer = styled.div<ModalPropsType>`
  ${transition('all')}
  cursor: pointer;
  visibility: hidden; // mobile은 다른 하단 modal이 튀어나옴!
  opacity: 0;
  @media (${desktopVp}) {
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    opacity: ${({ visible }) => (visible ? 1 : 0)};
  }
  position: fixed;
  z-index: 10000;
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
    color: #ff2f40;
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
const CopyModal = styled(CopyToClipboard)`
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
    color: #ff2f40;
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
const Btn = styled.button`
  all: unset;
  cursor: pointer;
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
