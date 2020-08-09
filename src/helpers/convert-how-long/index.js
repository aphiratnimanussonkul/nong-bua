export const convertHowLong = (timeStamp) => {
  const now = Math.ceil(new Date().getTime() / 1000);
  const different = now - timeStamp;
  if (different >= 60 * 60 * 24 * 7) {
    return new Date(timeStamp * 1000).toDateString();
  } else if (different >= 60 * 60 * 24) {
    const day = Math.floor(different / 60 / 60 / 24);
    return `${day} วันที่แล้ว`;
  } else if (different >= 60 * 60) {
    const hour = Math.floor(different / 60 / 60);
    return `${hour} ชั่วโมงที่แล้ว`;
  } else if (different >= 60) {
    const min = Math.floor(different / 60);
    return `${min} นาทีที่แล้ว`;
  }
  return "< 1 นาทีที่แล้ว";
};
