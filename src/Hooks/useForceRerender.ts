import { useState } from "react";

export const useForceRerender: () => () => any = () => {
  const [_, setValue] = useState<boolean>(false);
  return (): void => setValue((v) => !v);
};
