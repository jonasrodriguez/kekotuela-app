export function formatDate(date, time) {

    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    var hour = date.getHours().toString();
    hour = hour.length > 1 ? hour : '0' + hour;

    var minute = date.getMinutes().toString();
    minute = minute.length > 1 ? minute : '0' + minute;
    
    if (time) {
        return day + '/' + month + '/' + year + " " + hour + ":" + minute;
    } else {
        return day + '/' + month + '/' + year;
    }
}
 