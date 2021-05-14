import { useState } from "react";

export const useForceRerender: () => () => any = () => {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setValue] = useState<boolean>(false);
  return (): void => setValue((v) => !v);
};
