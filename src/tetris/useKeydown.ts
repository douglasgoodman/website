import * as React from "react";

export function useKeydown(targetKey: string, callback: () => void) {
  const savedCallback = React.useRef<() => void>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === targetKey && savedCallback.current) {
        event.preventDefault();
        savedCallback.current();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  });
}
