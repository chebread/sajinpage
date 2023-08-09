import { updateFiles } from 'api';
import fileDbAtom from 'atoms/fileDbAtom';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import {
  clickedAtom,
  modeToggleAtom,
  onCancelAtom,
  resetToggleAtom,
} from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import getCurrentTime from 'lib/getCurrentTime';
import supabase from 'lib/supabase';
import styled from 'styled-components';
import { ReactComponent as CancelIcon } from 'assets/svg/CancelIcon.svg';
import turnOffLimitedMode from '../turnOffLimitedMode';
import turnOnLimitedMode from '../turnOnLimitedMode';
// import Select from 'react-select';

const FloatModal = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [modeToggle, setModeToggle] = useAtom(modeToggleAtom);
  const [resetToggle, setResetToggle] = useAtom(resetToggleAtom);
  const [, onCancel] = useAtom(onCancelAtom);

  const onResetToggle = () => {
    setResetToggle(!resetToggle);
  };

  const onSelectMode = async (e: any) => {
    // turn on limit mode
    const {
      target: { value },
    } = e; // value is timeLimit
    const timeLimit = value;
    if (timeLimit) {
      turnOnLimitedMode({
        timeLimit: timeLimit,
        docId: fileDb.docId,
        fileId: fileDb.fileId,
      });
      onCancel();
    }
  };

  return (
    <>
      {fileDb.limit ? (
        // (0): 이건 floatmodal을 2개가 아닌 1개로 하며, btn만 visible 감싸기!!! => 구분하자.
        <FloatModalsContainer visible={modeToggle}>
          {/* <Select onChange={onModeSelect} options={timeLimitOptions} /> */}
          <button onClick={() => setResetToggle(false)}>취소</button>
          {/* 구분 필요 */}
          <button onClick={onResetToggle}>limit mode 값 재설정하기</button>
          <button
            onClick={() => {
              turnOffLimitedMode({
                docId: fileDb.docId,
                fileId: fileDb.fileId,
              });
              onCancel();
            }}
          >
            limit mode 끄기
          </button>
          <button onClick={onCancel}>취소</button>
          <FloatModalsBackground onClick={onCancel} />
        </FloatModalsContainer>
      ) : (
        <>
          <FloatModalsContainer visible={modeToggle}>
            <FloatModals>
              <CancelButton onClick={onCancel}>
                <CancelIcon />
              </CancelButton>

              <SelectWrapper>
                <Select onChange={onSelectMode}>
                  <option hidden disabled selected value="">
                    시간 선택
                  </option>
                  {timeLimitOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </SelectWrapper>
            </FloatModals>
            <FloatModalsBackground onClick={onCancel} />
          </FloatModalsContainer>
        </>
      )}
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
  height: 100%;
  width: 100%;
  display: flex;
  ${centerAlign}
  z-index: -1;
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
    height: 1rem; // 1rem
    fill: #ffffff;
  }
`;

export default FloatModal;

{
  /* <SelectInput
                classNamePrefix="Select"
                placeholder="시간 선택"
                onChange={onModeSelect}
                options={timeLimitOptions}
                isSearchable={false}
                styles={{
                  placeholder: defaultStyles => {
                    return {
                      ...defaultStyles,
                      color: '#000000',
                    };
                  },
                }}
                // components={{
                //   DropdownIndicator: () => null,
                //   IndicatorSeparator: () => null,
                // }}
              /> */
}
// const SelectInput = styled(Select)`
//   .Select__control {
//     all: unset;
//   }

//   .Select__control:hover {
//     all: unset;
//   }

//   .Select__control--is-focused {
//     box-shadow: none;
//     outline: none;
//     border: none;
//   }

//   .Select__indicator-separator {
//     display: none;
//   }
//   .Select__dropdown-indicator {
//     display: none;
//   }

//   .Select__menu {
//     color: #3c3d3e;
//   }
// `;

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

/*
const onModeSelect = async (e: any) => {
  // turn on limit mode
  const {
    target: { value },
  } = e; // value is timeLimit
  console.log(value);

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
    onCancel();
  }
}; */
