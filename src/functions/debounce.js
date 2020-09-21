const debounce = (func, wait) => {
  let timeout;

  return function executedFunction() {
    const args = arguments;

    const later = () => {
      timeout = null;
      func.apply(null, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default debounce;
