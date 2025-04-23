import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react';
import useRefCallback from '@kne/use-ref-callback';

dayjs.extend(duration);

const CountDown = forwardRef(({ duration = 60, autoplay = true, unit = 'seconds', format = 'mm:ss', onProgress, onComplete }, ref) => {
  const [time, setTime] = useState(duration);
  const [isPause, setIsPause] = useState(!autoplay);
  const progressHandler = useRefCallback(onProgress);
  const completeHandler = useRefCallback(onComplete);

  const isPauseRef = useRef(isPause);
  isPauseRef.current = isPause;

  useImperativeHandle(ref, () => {
    return {
      restart: () => {
        setTime(duration);
        setIsPause(false);
      },
      pause: () => {
        setIsPause(true);
      },
      start: () => {
        setIsPause(false);
      },
      switch: () => {
        setIsPause(isPause => !isPause);
      },
      getTime: () => {
        return time;
      }
    };
  });

  useEffect(() => {
    progressHandler && progressHandler(time);
    time <= 0 && completeHandler && completeHandler();
  }, [time, progressHandler, completeHandler]);

  useEffect(() => {
    const currentUnit = Number(dayjs.duration(1, unit).valueOf());
    const timer = setInterval(() => {
      if (isPauseRef.current) {
        return;
      }
      setTime(time => {
        const newTime = time - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return newTime;
      });

      return () => {
        clearInterval(timer);
      };
    }, currentUnit);
  }, [unit]);
  return dayjs.duration(time, unit).format(format);
});

export default CountDown;
