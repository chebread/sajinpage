const checkUrlFormat = (url: string) => {
  const expUrl = /^http[s]?:\/\/([\S]{3,})/i;
  return expUrl.test(url);
};

export default checkUrlFormat;
