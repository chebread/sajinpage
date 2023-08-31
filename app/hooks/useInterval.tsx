import { useEffect, useRef } from 'react';

type useIntervalProps = {
  (callback: () => void, delay: number): void;
};

const useInterval: useIntervalProps = (callback, delay) => {
  const savedCallback = useRef<(() => void) | null>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
