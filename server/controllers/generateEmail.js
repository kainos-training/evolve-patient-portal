const db = require('../db');

exports.getHTMLForEmail = function(userID){
    var intro = '<p>Hello Name</p>';
    var appointmentInfo = '<p>Your appointment is at Time on Date</p>';
    var location = '<p>At Hospital</p>';
return '<html><head><title>Reminder Email</title></head><body>'+intro+'<br>'+appointmentInfo+'<br>'+location+'</body></html>';
}


getInfo = function(userId){

}