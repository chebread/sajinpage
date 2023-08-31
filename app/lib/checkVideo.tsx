const checkVideo = (url: string, timeoutT?: number) => {
  return new Promise(function (resolve, reject) {
    const timeout = timeoutT || 5000;
    const video = document.createElement('video');
    video.onerror = video.onabort = function (e) {
      clearTimeout(timer);
      reject('error');
    };
    video.oncanplay = function () {
      clearTimeout(timer);
      resolve('success');
    };
    const timer = setTimeout(function () {
      video.setAttribute('src', '//!!!!/noexist.mp4');
      reject('timeout');
    }, timeout);
    video.setAttribute('src', url);
  });
};

export default checkVideo;
