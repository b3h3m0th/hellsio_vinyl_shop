import React, { useState, useEffect } from "react";

interface LoaderProps {
  children: string;
}

const Loader: React.FC<LoaderProps> = ({ children }: LoaderProps) => {
  const [dots, setDots] = useState<number>(3);

  useEffect(() => {
    setInterval(() => {
      setDots(dots > 2 ? 0 : dots + 1);
    }, 500);
  }, [dots, setDots]);

  return (
    <div className="loader">
      {children}
      {[...new Array(dots)].map((_: any, i: number) => (
        <span key={i}>.</span>
      ))}
    </div>
  );
};

export default Loader;
