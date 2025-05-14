export function createElement(tag, className, textContent) {
  const el = document.createElement(tag, className, textContent);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}
