import { menuClickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp, landscapeVp, transition } from 'layouts/properties';
import styled from 'styled-components';

// header component 내부에서 출력됨

const NavigationMenu = () => {
  const [menuClicked] = useAtom(menuClickedAtom);
  return (
    <>
      <Container visible={menuClicked}>hello</Container>
    </>
  );
};

const Container = styled.div<{ visible: boolean }>`
  ${transition('all')}
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) => (visible ? '1000000' : '-1')};
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  position: fixed;
  top: 3rem;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${cssVarsPalette.content_full_screen};
  width: auto;
  background-color: #ffffff;
  padding: 2rem 1rem 2rem 1rem;
  @media (${landscapeVp}) {
    padding-left: calc(1rem + ${cssVarsPalette.sal});
    padding-right: calc(1rem + ${cssVarsPalette.sar});
  }
`;

export default NavigationMenu;
