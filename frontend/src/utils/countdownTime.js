const countdownTime = (time) => {
  const endTime = new Date(time).getTime();
  const timeNow = Date.now();

  return endTime - timeNow;
};

export default countdownTime;
