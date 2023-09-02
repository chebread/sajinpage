import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { get } from 'idb-keyval';
import { useNavigate } from 'react-router-dom';
import { broadcastChannel } from 'lib/broadcastChannel';
import getWebsiteUrl from 'lib/getWebsiteUrl';
import onCopy from 'components/onCopy';
import { desktopVp, landscapeVp } from 'layouts/properties';
import { cssVarsPalette } from 'layouts/cssVars';
import onDeleteBucket from 'components/MyFiles/deleteBucket';
import NotExistedBuckets from './panels/NotExistedBuckets';

// (0): urls를 my_files로 바꾸고, my_files에 [{ docId: ..., url: ..., excess: ..., accessTime: ..., limited: ...}. { .... }] 로 저장하기 (즉, fileDb를 완전 복사하여 저장하기)
// (0): 아이폰 갤러리 처럼 구성하기 (내가 올린 사진을 전체로 볼 수 있는 용도)
// (0): 약간 naver now 앱의 스크롤 처럼 딱딱 끊기는 것으로 구성함

const MyFiles = () => {
  const navigate = useNavigate();
  const [buckets, setBuckets] = useState<string[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      // await set('urls', [
      //   {
      //     docId: 'sfkasjkdjfsajfjasfs',
      //     url: 'https://newjeans.kr/imgs/getup/photos/NJ_GetUp_24.jpg',
      //   },
      //   {
      //     docId: 'csdfhaeISfcsdfsfsf',
      //     url: 'https://newjeans.kr/imgs/getup/photos/NJ_GetUp_27.jpg',
      //   },
      //   {
      //     docId: 'sfajfjakfjsfBSc23',
      //     url: 'https://newjeans.kr/imgs/getup/photos/NJ_GetUp_28.jpg',
      //   },
      // ]);
      // get datas in db
      const buckets: any = await get('urls');
      setBuckets(buckets);
      // track events
      broadcastChannel.addEventListener('message', onMessage);
      window.addEventListener('evented', onMessage);
    };
    onLoad().catch(error => {
      console.log(error.url);
    });
    return () => {
      broadcastChannel.removeEventListener('message', onMessage);
      window.removeEventListener('evented', onMessage);
    };
  }, []);

  const onMessage = async (e: any) => {
    if (e.data != undefined) {
      // console.log(e.data);
      if (e.data === 'CLEAR' || e.data === 'INSERT') {
        const newBuckets: any = await get('urls');
        setBuckets(newBuckets);
      }
    } else {
      // console.log(e.detail.data);
      if (e.detail.data === 'CLEAR' || e.detail.data === 'INSERT') {
        const newBuckets: any = await get('urls');
        setBuckets(newBuckets);
      }
    }
  };

  return buckets != undefined && buckets.length != 0 ? (
    <Container>
      <Wrapper>
        {buckets.map((docId: any, index: number) => (
          <CardWrapper key={index}>
            {/* <Image
                  src={data.url}
                  onClick={() => {
                    navigate(`/v/${data.docId}`);
                  }}
                /> */}
            <Button
              onClick={() => {
                navigate(`/v/${docId}`);
              }}
            >
              {docId}
            </Button>
            <Button onClick={() => onCopy(getWebsiteUrl(`/v/${docId}`))}>
              링크 복사
            </Button>
            <Button onClick={() => onDeleteBucket(buckets, docId)}>삭제</Button>
          </CardWrapper>
        ))}
      </Wrapper>
    </Container>
  ) : (
    <NotExistedBuckets />
  );
};

const Container = styled.div`
  margin: 0 auto;
  position: relative;
  height: auto;
  width: auto;
  @media (${desktopVp}) {
    width: 40rem;
  }
  padding: 2rem 1rem 2rem 1rem;
  @media (${landscapeVp}) {
    padding-left: calc(1rem + ${cssVarsPalette.sal});
    padding-right: calc(1rem + ${cssVarsPalette.sar});
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: auto;
  width: 100%;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
`;
const Image = styled.img``;
const Button = styled.button``;

export default MyFiles;
