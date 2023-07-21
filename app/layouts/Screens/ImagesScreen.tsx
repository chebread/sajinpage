import { errorAtom } from 'atoms/errorAtom';
import { useAtom } from 'jotai';
import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import FullContentScreen from './FullContentScreen';

const ImagesScreen = ({ src }) => {
  const [, onError] = useAtom(errorAtom);

  return (
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
  );
};
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
  height: 100%; // (0): max-height 해야지만 처음에 object-fit이 맞춰지게 됨! <= 무슨 오류인지 모름
  width: 100%;
  object-fit: contain;
  object-position: center;
`;
export default ImagesScreen;
