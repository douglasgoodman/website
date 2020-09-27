import * as React from "react";

export function useKeydownMultiple(
  targetKey1: string,
  targetKey2: string,
  callback: () => void
) {
  const savedCallback = React.useRef<() => void>();
  const targetKey1Down = React.useRef<boolean>(false);
  const targetKey2Down = React.useRef<boolean>(false);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === targetKey1) {
        targetKey1Down.current = true;
        event.preventDefault();
      } else if (key === targetKey2) {
        targetKey2Down.current = true;
        event.preventDefault();
      }

      if (
        targetKey1Down.current &&
        targetKey2Down.current &&
        savedCallback.current
      ) {
        event.preventDefault();
        savedCallback.current();
      }
    };

    const handleKeyup = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === targetKey1) {
        targetKey1Down.current = false;
      } else if (key === targetKey2) {
        targetKey2Down.current = false;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  });
}
