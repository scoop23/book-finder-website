export const containerVariant = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3, type: "spring" } },
  exit: { scale: 0.7, opacity: 0, }
}
export const parentVariant = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0, opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: { scale: 0.7, opacity: 0, pointerEvents: "none", transition: { duration: 1, staggerChildren: 0.1 } }
}
export const secondParentVariant = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: {
    x: 50, opacity: 0, transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
}
export const secondChildVariant = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1, type: "spring" } },
  exit: { x: -30, opacity: 0 }
}

