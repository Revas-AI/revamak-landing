import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function createScrollTriggerAnimation(
  element: HTMLElement | string,
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
) {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...triggerOptions,
    },
  });
}

export function createParallax(
  element: HTMLElement | string,
  speed: number = 0.5,
  triggerOptions?: ScrollTrigger.Vars
) {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      ...triggerOptions,
    },
  });
}

export function createTextReveal(
  element: HTMLElement | string,
  triggerOptions?: ScrollTrigger.Vars
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none reverse",
      ...triggerOptions,
    },
  });

  tl.fromTo(
    element,
    { opacity: 0, y: 100, skewY: 7 },
    { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: "power3.out" }
  );

  return tl;
}

export function createStaggerReveal(
  container: HTMLElement | string,
  items: string,
  stagger: number = 0.1
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  tl.fromTo(
    items,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger,
      ease: "power3.out"
    }
  );

  return tl;
}
