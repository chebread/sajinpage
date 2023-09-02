import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import Dropzone from 'react-dropzone';
import hashMaker from 'lib/hashMaker';
import filesAtom from 'atoms/filesAtom';
import checkUrlFormat from 'lib/checkUrlFormat';
import DropGuide from 'components/Upload/Uploader/DropGuide';
import { toast } from 'react-hot-toast';
import DesktopUploader from 'components/Upload/Uploader/DesktopUploader';
import MobileUploader from 'components/Upload/Uploader/MobileUploader';
import DropZone from 'components/Upload/Uploader/DropZone';
import checkImage from 'lib/checkImage';
import checkVideo from 'lib/checkVideo';

// (0): 모바일은 바로 + 누르면 editmodal 처럼 (like youtube) 처럼 모달이 홈에서 제공함 select mode도 동일함 (데스크탑과는)
// (0): pdf upload 기능 추가하기
// (0): 링크 업로드 기능 사용시 video, pdf, 한글, ... 파일 지원하기 (set type으로서 이거는 viewer에서 처리하지 db에서는 아무런 처리 필요 x)
// (0): 나중에는 파일 공유앱으로 바뀜
// 관건은 이 파일의 형식을 알아내는 것임. 이거 찾아보자. 일단은 한개의 파일만 가능. video, image만 지원함 (v1) => 주소에 mp4가 있는지, jpg가 있는지로 판단함.

const Uploader = () => {
  const [files, setFiles] = useAtom(filesAtom);

  const fileAcceptTypes = {
    'image/*': [],
    'image/avif': [], // for firefox
  };
  const FILE_MAX_SIZE = 5000000; // 5mb

  useEffect(() => {
    // 파일 붙여넣기시
    window.addEventListener('paste', onPaste);
    return () => {
      window.removeEventListener('paste', onPaste);
    };
  }, []);

  const onPaste = async (e: any) => {
    const { clipboardData } = e;
    const pastedUrl =
      clipboardData.getData('Text') || (window as any).clipboardData;
    const pastedFiles = clipboardData.files;
    if (pastedUrl != '' && pastedUrl != undefined) {
      if (checkUrlFormat(pastedUrl)) {
        onDropUrl(pastedUrl);
      } else {
        toast.error('링크를 붙여넣어 주세요');
      }
    }
    if (pastedFiles.length != 0) {
      await onDropFile(pastedFiles);
    }
  };
  const onDropFile = useCallback(async (files: any) => {
    // 1개 초과 파일은 받지 않음
    if (files.length === 0) {
      toast.error('하나의 파일만 업로드 가능합니다');
      return;
    }
    toast.loading('업로드중');
    const file = files[0];
    const isImageFile = file.type.match(/(image)/g); // type이 image, pdf 인지 파일 체크
    const docId = hashMaker();
    const fileId = hashMaker();
    // check file's type
    if (isImageFile === null) {
      toast.dismiss();
      toast.error('업로드 할 수 없는 파일입니다');
      return;
    }
    // check file's size (limit 5MB)
    if (file.size >= FILE_MAX_SIZE) {
      toast.dismiss();
      toast.error('5MB 이하의 파일만 업로드 가능합니다');
      return;
    } else {
      toast.dismiss();
    }
    // initialize file
    setFiles(prevState => {
      return {
        ...prevState,
        filed: true,
        file: file,
        docId: docId,
        fileId: fileId,
        uploadType: 'file',
        fileType: 'image',
      };
    });
  }, []);
  const onDropUrl = async (url: string) => {
    toast.loading('업로드중');
    const docId = hashMaker();
    // check if file url can be loaded
    const isImage = await checkImage(url)
      .then(() => true)
      .catch(() => false);
    const isVideo = await checkVideo(url)
      .then(() => true)
      .catch(() => false);
    if (isImage || isVideo) {
      if (isImage) {
        setFiles(prevState => {
          return {
            ...prevState,
            fileType: 'image',
          };
        });
      }
      if (isVideo) {
        setFiles(prevState => {
          return {
            ...prevState,
            fileType: 'video',
          };
        });
      }
      toast.dismiss();
      setFiles(prevState => {
        return {
          ...prevState,
          filed: true,
          docId: docId,
          url: url,
          uploadType: 'url',
        };
      });
    } else {
      toast.dismiss();
      toast.error('업로드 할 수 없는 파일입니다');
    }
  };

  return (
    <Dropzone
      onDrop={onDropFile}
      accept={fileAcceptTypes}
      noClick
      noKeyboard
      multiple={false}
    >
      {({ getRootProps, getInputProps, open, isDragActive }) => {
        return (
          <>
            <DropZone {...getRootProps()}>
              <input {...getInputProps()} />
              <MobileUploader open={open} onDropUrl={onDropUrl} />
              <DesktopUploader open={open} onDropUrl={onDropUrl} />
              <DropGuide visible={isDragActive} />
            </DropZone>
          </>
        );
      }}
    </Dropzone>
  );
};

export default Uploader;
