export const scrollToElement = (selector: string) => {
  const el = document.querySelector(selector);
  if (!el) return; // should probably alert/ toast here
  el.scrollIntoView();
};
