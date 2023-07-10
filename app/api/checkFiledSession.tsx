// check file session is excess

const checkFileSession = async (url: any, f: any) => {
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
