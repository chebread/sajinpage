import { desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { ReactComponent as DeleteIcon } from 'assets/svg/DeleteIcon.svg';
import { ReactComponent as DisableIcon } from 'assets/svg/DisableIcon.svg';
import styled from 'styled-components';
import onClear from 'components/Settings/onClear';
import { useEffect, useState } from 'react';
import { get, set } from 'idb-keyval';
import { broadcastChannel, triggerEvent } from 'lib/broadcastChannel';

// (0): viewer 확인시에 저장되는 자동 My files 저장 기능 끄기 기능 추가하기 (idb myfiles enabled로 관리 boolean으로 지정함 만약 myfiles: false 라면 viewer에서 저장 안됨 my files 접속시 버킷 자동 저장 기능이 비활성화 되어 있습니다 이런 것은 띄우지 않음)

const Preferences = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    const onLoad = async () => {
      const enabled: any = await get('enabled_myfiles');
      setEnabled(enabled === undefined ? false : enabled);
      broadcastChannel.addEventListener('message', onMessage);
      // window.addEventListener('evented', onMessage);
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
  };
  const onMessage = async (e: any) => {
    if (e.data != undefined) {
      console.log(e.data);
      if (e.data === 'UPDATE') {
        const enabled: any = await get('urls');
        setEnabled(enabled);
      }
    } else {
      console.log(e.detail.data);
      if (e.detail.data === 'UPDATE') {
        const enabled: any = await get('urls');
        setEnabled(enabled);
      }
    }
  };

  return (
    <Container>
      <Category>My files</Category>
      <Description>My files를 맞춤설정 해보세요.</Description>
      <ButtonWrapper>
        <Button onClick={onClear}>
          <DeleteIcon />
          버킷 비우기
        </Button>
        <Button onClick={onEnable}>
          <DisableIcon />
          {enabled ? '버킷 저장 기능 끄기' : '버킷 저장 기능 켜기'}
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: auto;
  padding: 2rem 1rem 1rem;
  @media (${desktopVp}) {
    width: 40rem;
    padding: 2rem 1rem 1rem;
  }
`;
const Category = styled.div`
  font-size: 2rem;
  font-weight: 500;
  padding-bottom: 1rem;
  &:not(:first-child) {
    padding-top: 2rem;
  }
`;
const Description = styled.div`
  font-size: 1rem;
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
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
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
