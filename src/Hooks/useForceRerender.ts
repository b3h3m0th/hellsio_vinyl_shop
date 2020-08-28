import React, { useState } from "react";

export const useForceRerender = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
};
