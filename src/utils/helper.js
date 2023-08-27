import moment from 'moment';

export function formatDate(date, format = 'DD/MM/YYYY HH:mm A') {
  if (!date) {
    return '';
  }
  let newDate = date;
  if (typeof date === 'string') {
    newDate = new Date(date);
    if (newDate.toString() === 'Invalid Date') {
      newDate = new Date(moment(date, format).toDate());
    }
  }
  return moment(newDate).format(format);
}
