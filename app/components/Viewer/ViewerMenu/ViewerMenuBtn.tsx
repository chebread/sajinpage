import { clickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';
import ViewerMenuModal from './ViewerMenuModal';
import ViewerBackground from './ViewerBackground';
import { useNavigate } from 'react-router-dom';

// 로고 버튼 클릭시 viewer nav 처럼 nav 가 나오며 또 ... 으로 되어있는 버튼이 나오게 됨 이 버튼은 menu btn으로 파일을 관리하는 버튼으로 동작함
// 아니면 로고 버튼 클릭시 그냥 viewer desktop 처럼 threads의 버튼 처럼 구성하기

const ViewerMenuBtn = () => {
  return <></>;
};

export default ViewerMenuBtn;
