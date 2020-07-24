import { useRef, useEffect } from "react";

// https://stackoverflow.com/a/39094299/2338922
const useUnload = (fn) => {
  const cb = useRef(fn);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [cb]);
};

export default useUnload;
