export const throttle = (func: () => void, delay: number) => {
  let inProgress = false;
  return () => {
    if (inProgress) return;
    inProgress = true;
    setTimeout(() => {
      func();
      inProgress = false;
    }, delay);
  };
};
