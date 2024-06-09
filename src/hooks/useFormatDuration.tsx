export const  useformatDuration = (durationMs: number) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);

  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${paddedSeconds}`;
}
