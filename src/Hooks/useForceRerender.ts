import { useState } from "react";

export const useForceRerender = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => ++value);
};
