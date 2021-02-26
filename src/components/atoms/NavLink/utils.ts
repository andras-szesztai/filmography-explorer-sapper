import gsap from 'gsap'

export const animateUnderline = (
  el: HTMLSpanElement,
  scaleX: number,
  duration: number
) => {
  if (el) {
    gsap.to(el, {
      scaleX: scaleX,
      duration: duration,
      delay: 0.1,
      ease: 'power2.inOut',
    })
  }
}
