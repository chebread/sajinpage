// (0): fetch할때 get 400 console error 없에는 법은?

const checkFileSession = async (url: any, f: any) => {
  // check file session is excess
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Request faild');
    }
  } catch (error) {
    // file excessed
    await f();
  }
};

export default checkFileSession;
