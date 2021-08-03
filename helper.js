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
    year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (date.length < 2) {
    date = '0' + date;
  }

  return [year, month, date].join('-');
}

export {convertDate, formatDate};
