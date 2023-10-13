import { expandedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import {
  centerAlign,
  desktopVp,
  disableTab,
  transition,
} from 'layouts/properties';
import styled from 'styled-components';
import { ReactComponent as CancelIcon } from 'assets/svg/CancelIcon.svg';

const CollapseBtn = () => {
  const [expanded, setExpanded] = useAtom(expandedAtom);

  const onCollapse = () => {
    setExpanded(false);
  };

  return (
    <Container expanded={expanded}>
      <BtnWrapper>
        <Btn onClick={onCollapse}>
          <CancelIcon />
        </Btn>
      </BtnWrapper>
    </Container>
  );
};

const Container = styled.div<{ expanded: boolean }>`
  display: none;
  @media (${desktopVp}) {
    display: ${({ expanded }) => (expanded ? 'block' : 'none')};
  }
`;

const BtnWrapper = styled.div`
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Btn = styled.button`
  all: unset;
  ${transition('all')}
  ${disableTab}
  z-index: 100000;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  background-color: rgb(30, 30, 30);
  &:hover {
    /* background-color: rgb(35, 35, 35); */
    svg {
      /* transform: scale(1.07); */
    }
  }
  &:active {
    transform: scale(0.93);
  }
  svg {
    ${transition('transform')}
    height: 1rem;
    fill: #787878;
  }
`;

export default CollapseBtn;
