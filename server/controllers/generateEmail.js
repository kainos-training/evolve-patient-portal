const db = require('../db');

exports.getHTMLForEmail = function(userID){
    var intro = '<p>Hello '+name+'</p>';
    var appointmentInfo = '<p>Your appointment is at '+time+' on '+date+'</p>';
    var location = '<p>At '+hospital+'</p>';
return '<html><head><title>Reminder Email</title></head><body>'+intro+'<br>'+appointmentInfo+'<br>'+location+'</body></html>';
}


getInfo = function(userId){

}