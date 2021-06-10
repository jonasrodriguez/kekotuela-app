export function formatDate(date, time) {

    if (!date) {
        return '';
    }

    if (date === ''){
        return '';
    }
    
    var formatDate = new Date(date);

    var year = formatDate.getFullYear();

    var month = (1 + formatDate.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = formatDate.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    var hour = formatDate.getHours().toString();
    hour = hour.length > 1 ? hour : '0' + hour;

    var minute = formatDate.getMinutes().toString();
    minute = minute.length > 1 ? minute : '0' + minute;
    
    if (time) {
        return day + '/' + month + '/' + year + " " + hour + ":" + minute;
    } else {
        return day + '/' + month + '/' + year;
    }
}
 