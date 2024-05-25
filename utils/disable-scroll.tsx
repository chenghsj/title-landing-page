export function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
}

export function enableScroll() {
  document.body.style.overflow = 'auto';
  document.body.style.touchAction = 'auto';
}
