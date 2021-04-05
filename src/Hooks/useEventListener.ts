import { useEffect, useRef, EventHandler } from "react";
export const useEventListener = (
  eventName: string,
  handler: EventHandler<any>,
  element = window
) => {
  const savedHandler: any = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: any) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
