import React, { useEffect, useRef, useState } from "react";

const useInterval = (callback: any, delay: any) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);

  return <div>useInterval</div>;
};

export default useInterval;
