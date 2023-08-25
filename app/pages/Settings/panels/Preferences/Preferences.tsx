import { desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { ReactComponent as DeleteIcon } from 'assets/svg/DeleteIcon.svg';
import { ReactComponent as SaveIcon } from 'assets/svg/SaveIcon.svg';
import styled from 'styled-components';
import onClearIdb from 'components/Settings/onClearIdb';
import { useEffect, useState } from 'react';
import { get, set } from 'idb-keyval';
import { broadcastChannel, triggerEvent } from 'lib/broadcastChannel';
import { toast } from 'react-hot-toast';
import { cssVarsPalette } from 'layouts/cssVars';

const Preferences = () => {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    const onLoad = async () => {
      const enabled: boolean = await get('enabled_myfiles');
      setEnabled(enabled === undefined ? true : enabled);
      broadcastChannel.addEventListener('message', onMessage);
      window.addEventListener('evented', onMessage);
    };
    onLoad();
    return () => {
      broadcastChannel.removeEventListener('message', onMessage);
      window.removeEventListener('evented', onMessage);
    };
  }, []);
  const onEnable = async () => {
    await set('enabled_myfiles', !enabled);
    triggerEvent('UPDATE');
    if (!enabled) {
      toast('On');
    } else {
      toast('Off');
    }
  };
  const onMessage = async (e: any) => {
    if (e.data != undefined) {
      if (e.data === 'UPDATE') {
        const enabled: any = await get('enabled_myfiles');
        setEnabled(enabled);
      }
    } else {
      if (e.detail.data === 'UPDATE') {
        const enabled: any = await get('enabled_myfiles');
        setEnabled(enabled);
      }
    }
  };

  return (
    <Container>
      <Category>My files</Category>
      <Description>My files를 맞춤 설정하세요.</Description>
      <ButtonWrapper>
        <Button onClick={onClearIdb}>
          <DeleteIcon />
          버킷 비우기
        </Button>
        <Button onClick={onEnable}>
          <SaveIcon />
          {enabled ? '버킷 저장 기능 끄기' : '버킷 저장 기능 켜기'}
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: auto;
  margin-bottom: ${cssVarsPalette.nav_height};
  padding: 2rem 1rem 2rem 1rem;
  @media (${desktopVp}) {
    width: 40rem;
  }
`;
const Category = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  @media (${desktopVp}) {
    font-weight: 500;
    font-size: 2rem;
  }
  padding-bottom: 1rem;
  &:not(:first-child) {
    padding-top: 2rem;
  }
`;
const Description = styled.div`
  font-size: 0.9rem;
  @media (${desktopVp}) {
    font-size: 1rem;
  }
  font-weight: 400;
  padding-bottom: 1rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  gap: 0.5rem;
`;
const Button = styled.button`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  width: auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  @media (${desktopVp}) {
    font-size: 1rem;
  }
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  @media (${desktopVp}) {
    &:hover {
      background-color: rgb(235, 235, 235);
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    transform: scale(0.98);
  }
  svg {
    height: 1.5rem;
    fill: #1969d2;
  }
`;

export default Preferences;
