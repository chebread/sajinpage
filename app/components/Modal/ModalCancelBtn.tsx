import { disableTab, transition } from 'layouts/properties';
import styled from 'styled-components';

const ModalCancelBtn = styled.button`
  all: unset;
  ${disableTab}
  ${transition('all')}
  z-index: 10000;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  &:hover {
    background-color: rgb(235, 235, 235);
  }
  &:active {
    transform: scale(0.93);
  }
  svg {
    ${transition('transform')}
    height: 1rem; // 1rem
    fill: #000000;
  }
`;

export default ModalCancelBtn;
