import initValuesAtom from 'atoms/initValuesAtom';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import { linkUploaderClickedAtom } from 'atoms/uploaderAtom';
import { useAtom } from 'jotai';
import { desktopVp, disableTab, transition } from 'layouts/properties';
import styled from 'styled-components';

const MobileSelectModes = ({ onSelectMode }) => {
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [, initValues] = useAtom(initValuesAtom);
  const [, setClicked] = useAtom(linkUploaderClickedAtom);

  return (
    <Container>
      <Wrapper>
        <Button onClick={onSelectMode} name="normal">
          일반 업로드
        </Button>
        <Select onChange={onSelectMode} name="limited" defaultValue={'DEFAULT'}>
          <option value="DEFAULT" disabled>
            제한모드 시간 선택
          </option>
          {timeLimitOptions.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </Select>
        <Button
          onClick={() => {
            initValues();
            setClicked(false);
          }}
        >
          취소
        </Button>
      </Wrapper>
      <Background onClick={initValues} />
    </Container>
  );
};

const Select = styled.select`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  padding: 1.25rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  @media (${desktopVp}) {
    &:hover {
      /* background-color: rgb(235, 235, 235); */
    }
  }
  &:active {
    background-color: rgb(235, 235, 235);
    transform: scale(0.98);
  }
`;
const Button = styled.button`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  padding: 1.25rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  &:active {
    background-color: rgb(235, 235, 235);
    transform: scale(0.98);
  }
`;
const Wrapper = styled.div`
  position: fixed;
  height: auto;
  width: 100%;
  background-color: #fff;
  z-index: 100000;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;
const Background = styled.div`
  ${transition('all')}
  visibility: visible;
  opacity: 1;
  z-index: 10000;
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Container = styled.div`
  visibility: visible;
  opacity: 1;
  z-index: 0;
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
`;

export default MobileSelectModes;
