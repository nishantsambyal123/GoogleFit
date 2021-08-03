import moment from 'moment';

function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? '0' + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    date = '' + d.getDate(),
    year = d.getFullYear(),
    days = d.getDay(),
    hours = d.getHours(),
    minutes = d.getMinutes();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (date.length < 2) {
    date = '0' + date;
  }
  console.log(d);
  return [year, getMonthName(month), date, getDayName(days), hours, minutes];
}
function getMonthName(int) {
  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return monthNames[parseInt(int - 1)];
}

function getDayName(int) {
  var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayNames[parseInt(int)];
}
function getHourMinutes(timeStamp) {
  return moment(timeStamp, 'YYYY-MM-DD HH:mm:SS').format('h:mma');
}

export {convertDate, formatDate, getHourMinutes};
