const HORIZONTAL_REVEAL_BASE = {
  initial: {
    width: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  transition: {
    duration: 0.65,
    ease: 'easeOut',
  },
} as const

export const BOUNCE_ROTATE = {
  initial: {
    rotate: 0,
    x: 0,
  },
  animate: {
    rotate: [0, 3, 0],
    x: [0, 15, 0],
    transition: {
      duration: 1.0,
      ease: 'easeOut',
      times: [0, 0.7, 1],
    },
  },
}

export const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.25,
    ease: 'easeOut',
  },
} as const

export const FADE_SCALE = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: {
    duration: 0.2,
    ease: 'easeOut',
    exit: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
} as const

export const FADE_IN_SCALE = {
  layout: true,
  transition: {
    duration: 0.45,
    ease: [0.4, 0, 0.2, 1],
    layout: {
      duration: 0.45,
    },
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  initial: {
    scale: 0.98,
    opacity: 0.8,
  },
} as const

export const HORIZONTAL_REVEAL = {
  ...HORIZONTAL_REVEAL_BASE,
  animate: { width: '100%' },
  exit: { width: 0 },
} as const

export const HORIZONTAL_REVEAL_IN_VIEW = {
  ...HORIZONTAL_REVEAL_BASE,
  viewport: { once: true },
  whileInView: { width: '100%' },
} as const

export const POP_OUT = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 1.5,
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
      y: {
        type: 'spring',
        damping: 6,
        stiffness: 80,
      },
    },
  },
} as const

export const ROTATE_SCALE = {
  initial: { rotate: -15, scale: 0.95, opacity: 0 },
  animate: { rotate: 0, scale: 1, opacity: 1 },
  exit: { rotate: 15, scale: 0.95, opacity: 0 },
  transition: { duration: 0.5, ease: 'easeInOut' },
} as const

export const SLIDE_FADE = {
  layout: true,
  initial: {
    opacity: 0,
    x: -20,
    y: 10,
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: {
    opacity: 0,
    x: 20,
    y: -10,
  },
  transition: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
    layout: {
      duration: 0.2,
      type: 'spring',
      bounce: 0.1,
    },
  },
} as const

export const SLIDE_FROM_LEFT = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
} as const

export const SPRING_LAYOUT = {
  layout: {
    type: 'spring',
    bounce: 0.2,
    duration: 0.3,
  },
} as const

export const TELEPORT = {
  layout: true,
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    opacity: {
      duration: 0.1,
    },
    layout: {
      type: 'spring',
      bounce: 0.1,
      duration: 0.3,
    },
  },
} as const

export const ZOOM_IN = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
} as const

export const animateSlideUpEntrance = (index: number) =>
  ({
    initial: {
      opacity: 0,
      y: '50%',
    },
    transition: {
      delay: 0.1 + 0.1 * index,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
    viewport: { once: true },
    whileInView: { opacity: 1, y: '0' },
  }) as const
