import onLimitedMode from 'api/onLimitedMode';
import fileDbAtom from 'atoms/fileDbAtom';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import { onCancelAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import {
  centerAlign,
  desktopVp,
  disableTab,
  transition,
} from 'layouts/properties';
import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { ReactComponent as CancelIcon } from 'assets/svg/CancelIcon.svg';

// normal mode에서 나오는 Modal

const OnLimitedModeModal = ({ visible }) => {
  const selectRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const [fileDb] = useAtom(fileDbAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const currentDatetime = useRef(
    new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
  );
  const [, onCancel] = useAtom(onCancelAtom);

  useEffect(() => {
    if (visible) {
      // visible이 true라는 것은 컴포넌트가 화면에 보여질때임
      selectRef.current.selectedIndex = 0; // 화면에 보여지면 즉시 select tag의 selected 된 것 초기화
    }
  }, [visible]);

  const onMode = async (e: any) => {
    // turn on limit mode
    const {
      target: { value },
    } = e; // value is timeLimit
    if (value) {
      const timeLimit: number = Number(value); // value is string type
      await onLimitedMode({
        timeLimit: timeLimit,
        docId: fileDb.docId,
        fileId: fileDb.fileId,
        uploadType: fileDb.uploadType,
      }).catch(() => {
        toast.error('Turn on limited mode error');
      });
      onCancel();
    }
  };

  return (
    <>
      <FloatModalsContainer visible={visible}>
        <FloatModals>
          <CancelButton onClick={onCancel}>
            <CancelIcon />
          </CancelButton>
          <SelectWrapper>
            <Select ref={selectRef} onChange={onMode} defaultValue={'DEFAULT'}>
              <option value="DEFAULT" disabled>
                시간 선택
              </option>
              {timeLimitOptions.map(option => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </Select>
          </SelectWrapper>
        </FloatModals>
        <FloatModalsBackground onClick={onCancel} />
      </FloatModalsContainer>
    </>
  );
};

const FloatModalsContainer = styled.div<{ visible?: boolean }>`
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
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  ${centerAlign}
`;
const FloatModalsBackground = styled.div`
  display: block;
  ${transition('all')}
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;
const FloatModals = styled.div`
  position: fixed;
  height: 28rem;
  width: 600px;
  border-radius: 1rem;
  background-color: #ffffff;
`;
const SelectWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  ${centerAlign}
  z-index: -1;
  flex-direction: column;
`;
const Select = styled.select``;
const CancelButton = styled.button`
  all: unset;
  margin: 0.5rem;
  ${disableTab}
  ${transition('all')}
  z-index: 10000;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  &:hover {
    background-color: rgb(235, 235, 235);
    svg {
      /* transform: scale(1.07); */
    }
  }
  &:active {
    /* background-color: rgb(220, 220, 220); */
    transform: scale(0.93);
  }
  svg {
    ${transition('transform')}
    height: 1rem; // 1rem
    fill: #000000;
  }
`;

export default OnLimitedModeModal;
