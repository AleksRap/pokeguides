// @ts-ignore
function setVariable(): void {
  const vh: number = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.onresize = setVariable;
