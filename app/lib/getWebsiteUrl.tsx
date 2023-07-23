// https://sajin.page/ 만 불러오는 것으로 getUrl과 다릅니다 || str 받아서 website url에 이어서 반환해줍니다

const getWebsiteUrl = (str?: string) => {
  const win = window as Window;
  const origin = win.location.origin;
  const isArgument = str === undefined ? false : true;
  if (!isArgument) {
    return origin;
  } else {
    const newOrigin = origin + str;
    return newOrigin;
  }
};

export default getWebsiteUrl;
