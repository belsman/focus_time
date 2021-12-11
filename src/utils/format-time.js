export const formatSecondsinMMSS = (seconds) => {
  const formatedMinute = Math.floor(seconds / 60);
  const formatedSeconds = seconds % 60;

  return `${formatedMinute < 10 ? '0' : ''}${formatedMinute}:${
    formatedSeconds < 10 ? '0' : ''
  }${formatedSeconds}`;
};
