import type { VariantsType } from "../types";
import { Easing, Transition } from "framer-motion";

// ----------------------------------------------------------------------

interface TransitionProps {
  duration?: number;
  ease?: Easing | Easing[] | undefined;
}

const defaultEase: [number, number, number, number] = [0.42, 0, 0.58, 1];
const defaultDuration = 0.3;

export const varTranEnter = (props?: TransitionProps): Transition => ({
  duration: props?.duration || defaultDuration,
  ease: props?.ease || defaultEase,
});

export const varTranExit = (props?: TransitionProps): Transition => ({
  duration: props?.duration || defaultDuration,
  ease: props?.ease || defaultEase,
});

// ----------------------------------------------------------------------

export const varFade = (props?: VariantsType) => {
  const distance = props?.distance || 120;
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;

  const enter = varTranEnter({ duration: durationIn, ease: easeIn });
  const exit = varTranExit({ duration: durationOut, ease: easeOut });

  return {
    // IN
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: enter },
      exit: { opacity: 0, transition: exit },
    },
    inUp: {
      initial: { y: distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: enter },
      exit: { y: distance, opacity: 0, transition: exit },
    },
    inDown: {
      initial: { y: -distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: enter },
      exit: { y: -distance, opacity: 0, transition: exit },
    },
    inLeft: {
      initial: { x: -distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: enter },
      exit: { x: -distance, opacity: 0, transition: exit },
    },
    inRight: {
      initial: { x: distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: enter },
      exit: { x: distance, opacity: 0, transition: exit },
    },

    // OUT
    out: {
      initial: { opacity: 1 },
      animate: { opacity: 0, transition: enter },
      exit: { opacity: 1, transition: exit },
    },
    outUp: {
      initial: { y: 0, opacity: 1 },
      animate: { y: -distance, opacity: 0, transition: enter },
      exit: { y: 0, opacity: 1, transition: exit },
    },
    outDown: {
      initial: { y: 0, opacity: 1 },
      animate: { y: distance, opacity: 0, transition: enter },
      exit: { y: 0, opacity: 1, transition: exit },
    },
    outLeft: {
      initial: { x: 0, opacity: 1 },
      animate: { x: -distance, opacity: 0, transition: enter },
      exit: { x: 0, opacity: 1, transition: exit },
    },
    outRight: {
      initial: { x: 0, opacity: 1 },
      animate: { x: distance, opacity: 0, transition: enter },
      exit: { x: 0, opacity: 1, transition: exit },
    },
  };
};
