import imageCompression from 'browser-image-compression';

const compressImage = async (file: any) => {
  const options = {
    useWebWorker: true,
    fileType: 'image/webp', // webp로 파일을 압축함
  };
  try {
    const compressedImage = await imageCompression(file, options);
    return compressedImage;
  } catch (error) {
    throw new Error('파일 압축중 에러 발생');
  }
};

export default compressImage;
