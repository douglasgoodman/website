const start = new Audio("/start.mp3");
const levelComplete = new Audio("/level-complete.mp3");
const qbertJump = new Audio("/qbert-jump.mp3");
const qbertFall = new Audio("/qbert-fall.mp3");

function playSound(sound: HTMLAudioElement): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    sound.onended = () => resolve();
    sound.play();
  });
}

export const Sounds = {
  start: (): Promise<void> => playSound(start),
  levelComplete: (): Promise<void> => playSound(levelComplete),
  qbertJump: (): Promise<void> => playSound(qbertJump),
  qbertFall: (): Promise<void> => playSound(qbertFall),
};
