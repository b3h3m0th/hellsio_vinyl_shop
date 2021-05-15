import { useState, useEffect } from "react";

const useScript = (url: string, name: any) => {
  const [lib, setLib] = useState<any>({});

  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    script.onload = () => setLib({ [name]: window[name] });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return lib;
};

export default useScript;
