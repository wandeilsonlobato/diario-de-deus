export const PHONE_MAX_WIDTH = 760;

export const isPhone = ()=>typeof window !== 'undefined' && window.matchMedia(`(max-width: ${PHONE_MAX_WIDTH}px)`).matches;
