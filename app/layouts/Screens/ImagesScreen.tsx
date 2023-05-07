import styled from 'styled-components';

const ImagesScreen = ({ src }) => {
  return (
    <ImageWrapper>
      <Image src={src} />
    </ImageWrapper>
  );
};
const ImageWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgb(15, 15, 15);
`;
const Image = styled.img`
  display: block;
  max-height: 100%; // max-height 해야지만 처음에 object-fit이 맞춰지게 됨!
  max-width: 100%;
  object-fit: contain;
  object-position: center;
`;
export default ImagesScreen;
