import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Children, useCallback, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
gsap.registerPlugin(ScrollTrigger); // moduel init

// (bug): panel들에서 텍스트 선택시 한 패널만 선택되고 다른 패널에서는 선택이 불가능함
const HorizontalScreen = ({ children }: any) => {
  const panelRef = useRef<any>([]);
  const containerRef = useRef<any>(null); // (bug): <any>로 일단은 에러 잡음

  const createPanelsRefs = useCallback(() => {
    let index = -1;
    const f = (panel: any) => {
      // (bug): 일단은 any로 때움 (39 ref 때문에)
      // panel은 <div> 어쩌고의 값이 들어온다
      index++;
      panelRef.current[index] = panel;
    };
    return f;
  }, []);
  const create = createPanelsRefs(); // closure

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      console.log(1);

      gsap.to(panelRef.current, {
        ease: 'none',
        xPercent: -100 * (panelRef.current.length - 1),
        scrollTrigger: {
          end: () => '+=' + containerRef.current.offsetWidth * 2,
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5,
        },
      });
      ScrollTrigger.normalizeScroll(true); // 뭔지는 모르지만 일단은 허용한다
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <Container ref={containerRef}>
      {Children.toArray(children).map((element, index) => (
        <Panel ref={create} key={index}>
          {element}
        </Panel>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  overscroll-behavior: none;
  height: 100%;
  width: max-content;
  display: flex;
  flex-direction: row;
`;
const Panel = styled.div``;

export default HorizontalScreen;
