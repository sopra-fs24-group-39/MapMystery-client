import { useEffect } from 'react';

export const useBeforeUnload = (message: string, onBeforeUnload: () => void) => {
  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      onBeforeUnload();

      // returnValue triggers confirmation message
      //event.preventDefault();
      //console.log(message);
      //event.returnValue = message;
    };

    window.addEventListener('beforeunload', handler);

    // Cleanup function
    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [message, onBeforeUnload]);
};
