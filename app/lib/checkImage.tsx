const checkImage = (url: string, timeoutT?: number) => {
  return new Promise(function (resolve, reject) {
    const timeout = timeoutT || 5000;
    const img = new Image();
    img.onerror = img.onabort = function () {
      clearTimeout(timer);
      reject('error');
    };
    img.onload = function () {
      clearTimeout(timer);
      resolve('success');
    };
    const timer = setTimeout(function () {
      img.src = '//!!!!/noexist.jpg';
      reject('timeout');
    }, timeout);
    img.src = url;
  });
};

const checkImages = (url: string) => {
  return url.match(/\.(jpeg|jpg|gif|png|webp|avif|svg)/) != null;
};

export default checkImage;
