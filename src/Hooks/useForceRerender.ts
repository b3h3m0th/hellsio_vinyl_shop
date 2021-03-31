import { useState } from "react";

export const useForceRerender: () => () => void = () => {
  const [_, setValue] = useState<boolean>(false);
  return (): void => setValue((v) => !v);
};
