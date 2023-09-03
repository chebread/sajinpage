import styled from 'styled-components';
import { useAtom } from 'jotai';
import ImagesViewer from '../ImagesViewer';
import VideosViewer from '../VideosViewer';
import fileDbAtom from 'atoms/fileDbAtom';
import transition from 'layouts/properties/transition';
import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp } from 'layouts/properties';
import { themeVars } from 'layouts/themes';
import { expandedAtom } from 'atoms/viewerAtom';
import MuteBtn from '../MuteBtn';
import CollapseBtn from '../CollapseBtn';

// (0): Threads 같은 zoom in-out 기능 구현하기
// (0): Threads 같은 음소거 / 비음소거 버튼 구현하기

const FilesViewer = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [expanded] = useAtom(expandedAtom);

  return (
    <>
      <CenterScreen expanded={expanded}>
        <Container expanded={expanded}>
          {(() => {
            switch (fileDb.fileType) {
              case 'image':
                return <ImagesViewer src={fileDb.url} />;
              case 'video':
                return <VideosViewer src={fileDb.url} />;
              default:
                null;
            }
          })()}
        </Container>
      </CenterScreen>
      <MuteBtn />
      <CollapseBtn />
    </>
  );
};

const CenterScreen = styled.div<{ expanded: boolean }>`
  ${transition('all')}
  position: fixed;
  height: 100%;
  @media (${desktopVp}) {
    height: ${({ expanded }) =>
      expanded ? '100%' : `${cssVarsPalette.content_full_height}`};
  }
  width: 100%;
  top: 0;
  @media (${desktopVp}) {
    top: ${({ expanded }) => (expanded ? '0' : '4rem')};
  }
`;

const Container = styled.div<{ expanded: boolean }>`
  ${transition('all')}
  height: 100%;
  width: 100%;
  background-color: ${themeVars.dark.background_color};
  @media (${desktopVp}) {
    background-color: ${({ expanded }) =>
      expanded
        ? `${themeVars.dark.background_color}`
        : `${themeVars.light.background_color}`};
  }
`;

export default FilesViewer;
