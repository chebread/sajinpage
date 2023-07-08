// (0): fetch할때 get 400 console error 없에는 법은?

const checkFileSession = async (url: any, f: any) => {
  // limit mode일때
  const response = await fetch(url, {
    method: 'GET',
  });
  console.log('check session');
  if (response.ok != true) {
    // file excessed
    await f();
  }
};

export default checkFileSession;
