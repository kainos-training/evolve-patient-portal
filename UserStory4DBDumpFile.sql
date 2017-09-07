DROP DATABASE IF EXISTS patientPortal;

CREATE DATABASE IF NOT EXISTS patientPortal;

USE patientPortal;

CREATE TABLE IF NOT EXISTS GP (
gpID int auto_increment not null,
gpFullName varchar(150) not null,
gpPracticeName varchar(150) not null,
gpPracticeAddress varchar(300) not null,
primary key (gpID)
);

CREATE TABLE IF NOT EXISTS `User` (
userID int auto_increment not null, 
username varchar(100) not null,
`password` varchar(256) not null,
dateOfBirth date not null,
gender enum('Male', 'Female') not null,
MRIN char(9) not null,
firstName varchar(60) not null,
lastName varchar(60) not null,
phoneNumber varchar(20) not null,
title enum('Mr', 'Mrs', 'Miss', 'Ms', 'Dr') not null,
address varchar(150) not null,
email varchar(100) not null,
deceased enum('Yes', 'No') default 'No',
dateOfDeath datetime,
gpID int,
foreign key (gpID) references GP(gpID),
primary key (userID)
);

CREATE TABLE IF NOT EXISTS MedicationType (
medicationTypeID int auto_increment not null,
medicationType varchar(20),
primary key (medicationTypeID)
);


CREATE TABLE IF NOT EXISTS Medication (
medicationID int auto_increment not null,
medicationName varchar(60) not null,
medicationTypeID int not null,
resourceURL varchar(200),
primary key (medicationID),
foreign key (medicationTypeID) references MedicationType (medicationTypeID)
);

CREATE TABLE IF NOT EXISTS MedicationUser (
medicationUserID int auto_increment not null,
userID int not null, 
medicationID int not null,
startDate date not null,
endDate date,
dosage varchar(60) not null,
primary key (medicationUserID),
foreign key (userID) references `User` (userID),
foreign key (medicationID) references Medication (medicationID)
);

CREATE TABLE IF NOT EXISTS MedicationUserComment (
medicationUserCommentID int auto_increment not null, 
medicationUserID int not null,
commentText text not null,
`timeStamp` timeStamp not null,
primary key (medicationUserCommentID),
foreign key (medicationUserID) references MedicationUser (medicationUserID)
);

CREATE TABLE IF NOT EXISTS Clinician (
clinicianID int auto_increment not null,
title enum('Mr', 'Mrs', 'Miss', 'Ms', 'Dr') default 'Dr',
firstName varchar(60) not null,
lastName varchar(60) not null,
jobTitle varchar(30) not null,
primary key (clinicianID)
);

CREATE TABLE IF NOT EXISTS Location (
locationID int not null auto_increment,
locationAddress varchar(200) not null,
primary key (locationID)
);

CREATE TABLE IF NOT EXISTS Department (
departmentID int not null auto_increment,
departmentName varchar(200) not null,
primary key (departmentID)
);

CREATE TABLE IF NOT EXISTS LocationDepartment (
locationDepartmentID int auto_increment not null,
locationID int not null,
departmentID int not null,
primary key (locationDepartmentID),
foreign key (locationID) references Location (locationID),
foreign key (departmentID) references Department (departmentID)
);

CREATE TABLE IF NOT EXISTS AppointmentType(
appointmentTypeID int auto_increment not null,
`type` varchar(60) not null,
primary key (appointmentTypeID)
);

CREATE TABLE IF NOT EXISTS Appointment(
appointmentID int auto_increment not null,
userID int not null,
locationDepartmentID int not null,
clinicianID int not null,
dateOfAppointment datetime not null,
`comment` text,
appointmentTypeID int not null,
primary key (appointmentID),
foreign key (userID) references User(userID),
foreign key (locationDepartmentID) references LocationDepartment(locationDepartmentID),
foreign key (clinicianID) references Clinician(clinicianID),
foreign key (appointmentTypeID) references AppointmentType (appointmentTypeID)
);

INSERT INTO GP (gpFullName, gpPracticeName, gpPracticeAddress)
VALUES ('Dr. A Cheyne', 'Ormeau Park Surgery', '281 Ormeau Rd, Belfast BT7 3GG, UK'),
('Dr. E Glass', 'The Surgery', '1 Church St, Newtownards BT23 4FH'),
('Dr. R Kane', 'Springvale Medical Practice', '463 Springfield Rd, Belfast BT12 7DP, UK');

INSERT INTO `User` (username, `password`, dateOfBirth, gender, MRIN, firstName, lastName, phoneNumber, title, address, email, deceased, gpID)
VALUES ('jsmith', 'password123', '1960-01-01', 'Female', '123456789', 'Jane', 'Smith', '07712345678', 'Mrs', '32 Orby Walk, Belfast', 'j.smith@googlemail.com', 'No', 1),
('smurray', 'password123', '1997-08-08', 'Female', '123456890', 'Shannon', 'Murray', '07912345678', 'Mrs', '23 Grace Avenue, Belfast', 's.murray@hotmail.co.uk', 'No', 2),
('jdaniels', 'password123',  '1989-11-09', 'Male', '098765432', 'Jack', 'Daniels', '07745678921', 'Mr', '91 Bangor Road, Newtownards',  'jdaniels@gmail.com', 'No', 3);

INSERT INTO MedicationType(medicationType)
VALUES ('Antibiotics'), ('Mood Stabilizers'), ('Analgesics'), ('Antipyretics');

INSERT INTO Medication(medicationName, medicationTypeID, resourceURL)
VALUES('Penicillin', 1, 'https://en.wikipedia.org/wiki/Penicillin'), 
('Amoxicillin', 1, 'https://en.wikipedia.org/wiki/Amoxicillin'), 
('Lithium', 2, 'https://en.wikipedia.org/wiki/Lithium_(medication)'), 
('Olanzapine', 2, 'https://en.wikipedia.org/wiki/Olanzapine'),
('Paracetamol', 3, 'https://en.wikipedia.org/wiki/Paracetamol'), 
('Morphine', 3, 'https://en.wikipedia.org/wiki/Morphine'), 
('Ibuprofen', 4, 'https://en.wikipedia.org/wiki/Ibuprofen'), 
('Ketoprofen', 4, 'https://en.wikipedia.org/wiki/Ketoprofen');

INSERT INTO MedicationUser(userID, medicationID, startDate, endDate, dosage)
VALUES (1, 3, '2016-06-01', '2019-08-10', '2 tablets, up to 4 times daily'),
(1, 4, '2016-06-01', '2019-08-10', '2 tablets, up to 4 times daily'), 
(2, 1, '2017-02-09', '2017-02-27', '2 tablets, twice daily'),
(3, 2, '2016-09-29', '2016-10-10', 'Once in the morning daily');

INSERT INTO MedicationUserComment(medicationUserID, commentText)
VALUES (1, 'Not feeling the benefit after two weeks'), (2, 'Helping to minimise pain but still exists'),
(3, 'Not helping with pain, possibly need stronger medication'), (4, 'Feeling better mentally');

INSERT INTO Clinician (title, firstName, lastName, jobTitle)
VALUES ('Dr', 'Alex', 'Hyndman', 'Consultant'), ('Dr', 'John', 'Adams', 'Oncologist'), ('Dr', 'Karen', 'Reid', 'Obstetrician');

INSERT INTO Location (locationAddress)
VALUES ('Royal Victoria Hospital, 274 Grosvenor Rd, Belfast, BT12 6BA'), 
('Mater Hospital, 45-54 Crumlin Rd, Belfast, BT14 6AB'),
('Belfast City Hospital, Lisburn Rd, Belfast, BT9 7AB');

INSERT INTO Department (DepartmentName)
VALUES ('A&E'), ('Maternity'), ('Oncology');

INSERT INTO LocationDepartment (locationID, departmentID)
VALUES (1, 1), (2, 1), (2, 2), (3, 3);

INSERT INTO AppointmentType (`type`)
VALUES ('Pre-Op Assessment'), ('Emergency Surgery'), ('GP Appointment'), ('Check-up');

INSERT INTO Appointment (userID, locationDepartmentID, clinicianID, dateOfAppointment, `comment`, appointmentTypeID)
VALUES (1, 3, 3, '2017-09-07', 'Ultrasound performed, pregnancy progressing normally.', 4),
(1, 4, 2, '2017-09-06', null, 1),
(1, 2, 1, '2017-09-16', null, 1),
(1, 3, 3, '2016-11-08', null, 1),
(1, 4, 3,'2016-11-06', null, 1);
