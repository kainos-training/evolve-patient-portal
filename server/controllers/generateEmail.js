const db = require('../db');

exports.getHTMLForEmail = function(info){
    let intro = '<p>'+info.firstName+' '+ info.lastName+',</p>';
    let appointmentInfo = '<p>Your appointment is at'+info.dueDate+' </p>';
    let location = '<p>At Hospital</p>';
return '<html><head><title>Reminder Email</title></head><body>'+intro+'<br>'+appointmentInfo+'<br>'+location+'</body></html>';
};
