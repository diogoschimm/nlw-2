export default function converHourToMinutes(time: string) {

  const [hour, minutes] = time.split(':').map(Number);
  const timesInMinutes = (hour * 60) + minutes;

  return timesInMinutes;
}