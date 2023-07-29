import { errorAtom } from 'atoms/errorAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp } from 'layouts/properties';
import styled from 'styled-components';

// (0): border-radius 기능 추가하기

const ImagesScreen = ({ src }) => {
  const [, onError] = useAtom(errorAtom);

  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <Image
            src={src}
            onError={() => {
              // Uxpected error tracking (avif browser 지원안할때, file url 손상시, ...)
              onError({
                code: 405,
                message: 'ImagesViewer에서 image를 불러오는 중에 에러가 발생함',
              });
            }}
          />
        </ImageWrapper>
      </Wrapper>
    </Container>
  );
};
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  ${centerAlign}
`;
const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${centerAlign}
`;
const ImageWrapper = styled.div`
  max-height: 100%;
  max-width: 100%;
`;
const Image = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  margin: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 0.5rem;
  @media (${desktopVp}) {
    border-radius: 1rem;
  }
`;
export default ImagesScreen;
