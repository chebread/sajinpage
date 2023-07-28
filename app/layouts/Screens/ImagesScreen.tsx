import { errorAtom } from 'atoms/errorAtom';
import { useAtom } from 'jotai';
import { centerAlign } from 'layouts/properties';
import styled from 'styled-components';

// (0): border-radius 기능 추가하기
// (0): 스크롤 막기

const ImagesScreen = ({ src }) => {
  const [, onError] = useAtom(errorAtom);

  return (
    <Container>
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
    </Container>
  );
};
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  ${centerAlign}/* background-color: seagreen; */
`;
const ImageWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${centerAlign}
`;
const Image = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  margin: auto;
  object-fit: contain;
  object-position: center;
`;
export default ImagesScreen;
