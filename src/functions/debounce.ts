const debounce = (func: (...params: any) => any, wait: number) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: []) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default debounce;
