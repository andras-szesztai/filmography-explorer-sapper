import gsap from 'gsap'
export const animateUnderline = (
  el: HTMLSpanElement,
  scaleX: number,
  duration: number
) => {
  gsap.to(el, {
    scaleX: scaleX,
    duration: duration,
    delay: 0.1,
    ease: 'power2.inOut',
  })
}
