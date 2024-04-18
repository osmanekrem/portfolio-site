import { useEffect, useState } from "react";

export default function useMedia(width = 1024) {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia(`(max-width: ${width}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      setStatus(e.matches);
    };

    setStatus(matchMedia.matches);

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  });

  return status;
}
