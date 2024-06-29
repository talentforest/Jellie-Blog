export const getTimeTaken = (startDate: string, endDate: string) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  // 시간 차이 (밀리초 단위)
  const differenceInMilliseconds = end - start;

  const millisecondsInOneDay = 24 * 60 * 60 * 1000;
  const daysDifference = differenceInMilliseconds / millisecondsInOneDay;

  const monthsDifference = Math.floor(daysDifference / 30);
  const yearsDifference = Math.floor(daysDifference / 365);

  if (yearsDifference >= 1) {
    return `${yearsDifference}년`;
  } else if (monthsDifference >= 1) {
    return `${monthsDifference}달`;
  } else {
    return `${daysDifference}일`;
  }
};
