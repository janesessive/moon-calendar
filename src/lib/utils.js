export const formatDate = (date) => {
    date = new Date(date);
    var monthNames = [
        "/01/",
        "/02/",
        "/03/",
        "/04/",
        "/05/",
        "/06/",
        "/07/",
        "/08/",
        "/09/",
        "/10/",
        "/11/",
        "/12/"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    
    if (minutes < 10) {
        minutes = '0' + minutes;
    };

    return day + monthNames[monthIndex] + year;
}

export const formatDateToMinutes = (date) => {
    date = new Date(date);
    var monthNames = [
        "/01/",
        "/02/",
        "/03/",
        "/04/",
        "/05/",
        "/06/",
        "/07/",
        "/08/",
        "/09/",
        "/10/",
        "/11/",
        "/12/"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    
    if (minutes < 10) {
        minutes = '0' + minutes;
    };
    if (hour < 10) {
        hour = '0' + hour;
    };

    return day + monthNames[monthIndex] + year + ' '  + hour + ':' + minutes;
}
  