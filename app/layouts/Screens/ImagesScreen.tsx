import styled from 'styled-components';
import CenterScreen from './CenterScreen';

const ImagesScreen = ({ src }) => {
  console.log(src);

  return (
    <ImageWrapper>
      <Image src={src} />
    </ImageWrapper>
  );
};
const ImageWrapper = styled(CenterScreen)`
  position: absolute;
`;
const Image = styled.img`
  display: block;
  max-height: 100%; // max-height 해야지만 처음에 object-fit이 맞춰지게 됨!
  max-width: 100%;
  object-fit: contain;
  object-position: center;
`;
export default ImagesScreen;
