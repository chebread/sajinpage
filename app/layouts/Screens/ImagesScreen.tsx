import { errorAtom } from 'atoms/errorAtom';
import { clickedAtom, viewedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { useState } from 'react';
import styled from 'styled-components';

// (0): mobile safari 에서 100vh 인데 갑자기 축소되서 이상해지는 현상
// (0): image 클릭시 전체화면으로 (모바일 처럼) 되는 것 구현하기 (부드럽게 적용함)
// (0): zoom은 그냥 스크롤 사용하여 구현하기 (자체 구현 x)

const ImagesScreen = ({ src }) => {
  const [, onError] = useAtom(errorAtom);
  const [clicked, setClicked] = useAtom(clickedAtom);
  console.log(clicked);

  return (
    <Container>
      <ImageWrapper
        onClick={() => {
          // 모바일 에서만 사용할 수 있기에 데스크탑에서는 비활성화함
          const currentWidth = window.innerWidth;
          if (currentWidth < 961) {
            setClicked(!clicked);
          }
        }}
      >
        <Image
          src={src}
          // onClick={onClick}
          onError={() => {
            // Uxpected error tracking (avif browser 지원안할때, file url 손상시, ...)
            onError({
              code: 400,
              message: 'ImagesViewer에서 image를 불러오는 중에 에러가 발생함',
            });
          }}
        />
      </ImageWrapper>
    </Container>
  );
};
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${centerAlign}
`;
const ImageWrapper = styled.div`
  ${transition('max-width')}
  cursor: pointer;
  height: 100%;
  width: 100%;
  @media (${desktopVp}) {
    width: calc(100% - 2rem);
    cursor: text;
  }
  display: flex;
  flex-direction: column;
  ${centerAlign}
`;
const Image = styled.img`
  ${transition('border-radius')}
  cursor: pointer;
  display: block;
  max-height: 100%;
  max-width: 100%;
  margin: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 0;
  @media (${desktopVp}) {
    border-radius: 1rem;
  }
`;
export default ImagesScreen;
