import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useRefCallback from '@kne/use-ref-callback';
import dayjs from 'dayjs';

const Timer = forwardRef(({ start = 0, duration = 0, autoplay = true, unit = 'seconds', format = 'mm:ss', onProgress, onComplete }, ref) => {
  const [time, setTime] = useState(start);
  const [isPause, setIsPause] = useState(!autoplay);
  const progressHandler = useRefCallback(onProgress);
  const completeHandler = useRefCallback(onComplete);
  const isPauseRef = useRef(isPause);
  isPauseRef.current = isPause;

  useImperativeHandle(ref, () => {
    return {
      restart: () => {
        setTime(0);
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
    duration > 0 && time >= duration && completeHandler && completeHandler();
  }, [time, progressHandler, completeHandler]);

  useEffect(() => {
    const currentUnit = Number(dayjs.duration(1, unit).valueOf());
    const timer = setInterval(() => {
      if (isPauseRef.current) {
        return;
      }
      setTime(time => {
        const newTime = time + 1;
        if (duration > 0 && newTime > duration) {
          clearInterval(timer);
          return 0;
        }
        return newTime;
      });

      return () => {
        clearInterval(timer);
      };
    }, currentUnit);
  }, [duration, unit]);

  return dayjs.duration(time, unit).format(format);
});

export default Timer;
