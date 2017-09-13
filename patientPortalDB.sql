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
userID int auto_increment not null unique, 
username varchar(100) not null unique,
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

CREATE TABLE IF NOT EXISTS `Condition`(
conditionID int auto_increment not null,
conditionName varchar(60) not null,
conditionLink varchar(256) not null,
primary key (conditionID)
);

CREATE TABLE IF NOT EXISTS UserCondition(
userConditionID int auto_increment not null,
userID int not null,
conditionID int not null,
startDate date not null,
endDate date,
primary key (userConditionID),
foreign key (userID) references `User`(userID),
foreign key (conditionID) references `Condition`(conditionID)
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

CREATE TABLE IF NOT EXISTS Task (
taskID int auto_increment not null,
taskName varchar(60) not null,
userID int not null,
taskSummary varchar(100) not null,
recievedDate datetime not null,
dueDate datetime not null,
primary key (taskID),
foreign key (userID) references User (userID)
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
deleted boolean default false not null,
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
VALUES ('jsmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '1960-01-01', 'Female', '123456789', 'Jane', 'Smith', '07712345678', 'Mrs', '32 Orby Walk, Belfast', 's.dorrian@kainos.com', 'No', 1),
('smurray', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '1997-08-08', 'Female', '123456890', 'Shannon', 'Murray', '07912345678', 'Mrs', '23 Grace Avenue, Belfast', 's.dorrian@kainos.com', 'No', 2),
('jdaniels', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee',  '1989-11-09', 'Male', '098765432', 'Jack', 'Daniels', '07745678921', 'Mr', '91 Bangor Road, Newtownards',  's.dorrian@kainos.com', 'No', 3);

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
VALUES (1, 3, '2017-06-01', '2019-08-10', '10mg'),
(1, 3, '2016-06-01', '2017-06-01', '5mg'),
(1, 3, '2015-06-01', '2016-06-01', '20mg'),
(1, 4, '2016-06-01', '2019-08-10', '5mg'), 
(2, 1, '2017-02-09', '2019-02-27', '15mg'),
(3, 2, '2016-09-29', '2018-10-10', '10mg');

INSERT INTO MedicationUserComment(medicationUserID, commentText, deleted)
VALUES (1, 'Not feeling the benefit after two weeks', false), (2, 'Helping to minimise pain but still exists', false),
(3, 'Not helping with pain, possibly need stronger medication', false), (4, 'Feeling better mentally', false);

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
VALUES(1, 3, 3, (NOW() + INTERVAL 2 DAY), 'Ultrasound to be performed to ensure pregnancy is progressing normally.', 4),
(3, 4, 2, (NOW() + INTERVAL 12 DAY), null, 1),
(1, 3, 3, (NOW() - INTERVAL 20 DAY), 'Appointment in relation to abdominal cramps', 3),
(1, 3, 2, (NOW() + INTERVAL 30 DAY), 'Checkup after Ultrasound,', 4),
(1, 1, 1, (NOW() - INTERVAL 4 DAY), 'INSTRUCTIONS: Do not eat any food 24 hours before surgery.', 1),
(1, 2, 1, (NOW() + INTERVAL 4 DAY), 'Foot complaints.', 3),
(1, 3, 1, (NOW() - INTERVAL 62 DAY), 'Other food complaints .', 3);

INSERT INTO `Condition` (conditionName, conditionLink) 
VALUES ("Hip Replacement", "http://www.nhs.uk/Conditions/Hip-replacement/Pages/Introduction.aspx"), 
("Diabetes", "http://www.nhs.uk/Conditions/Diabetes/Pages/Diabetes.aspx"), 
("Conjunctivitis", "http://www.nhs.uk/Conditions/Conjunctivitis-infective/Pages/Treatment.aspx"), 
("Back Pain", "http://www.nhs.uk/conditions/back-pain/Pages/Introduction.aspx");

INSERT INTO UserCondition (userID, conditionID, startDate, endDate) 
VALUES (1, 4, '2017-01-10', '2017-07-15'),
(1, 3, '2016-11-10', '2017-07-20'),
(1, 2, '1998-04-03', null),
(1, 4, '2017-08-03', null);

INSERT INTO Task(taskName, userID, taskSummary, recievedDate, dueDate)
VALUES('Pre-op questionnaire', 1, 'Questionnaire to be filled out before surgery. Includes allergies and general health questions.', (NOW() - INTERVAL 4 DAY), (NOW() + INTERVAL 18 DAY)), 
('Pre-op Assessment: Olanzapine', 1, 'Form used to assess your suitibility for Olanzapine which will be used post surgery.', (NOW() - INTERVAL 12 DAY), (NOW() - INTERVAL 2 DAY)),
('Pre-op Assessment: Paracetamol', 1, 'Form used to assess your suitibility for Paracetamol which will be used post surgery.', NOW(), (NOW() + INTERVAL 12 DAY));
