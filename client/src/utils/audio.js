export const playSound = (soundFile) => {
  const audio = new Audio(soundFile);
  audio.play().catch(e => console.error("Sound play failed:", e));
};