
// functions.js
function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, duration) {
  // Функция для преобразования времени в минуты
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Конвертируем все времена в минуты
  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;

  // Проверяем, что встреча полностью в пределах рабочего дня
  return meetingStartMinutes >= workStartMinutes &&
         meetingEndMinutes <= workEndMinutes;
}
z
console.log(isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120));     // true
console.log(isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingWithinWorkHours('14:00', '17:30', '08:0', 90));  // false
console.log(isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900)); // false