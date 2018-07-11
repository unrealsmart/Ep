export function getToday() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const Ymd = `${year}-${month >= 10 ? month : `0${month}`}-${date >= 10 ? date : `0${date}`}`
  
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const His = `${hour >= 10 ? hour : `0${hour}`}:${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}`;
  
  return `${Ymd} ${His}`;
}
