export function animateNumber(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
) {
  const startTime = performance.now();
  const difference = end - start;

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = start + difference * easeOut;
    
    callback(current);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      callback(end);
    }
  }
  
  requestAnimationFrame(animate);
}
