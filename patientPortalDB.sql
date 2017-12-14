DROP DATABASE IF EXISTS patientPortal;

CREATE DATABASE IF NOT EXISTS patientPortal;

USE patientPortal;

CREATE TABLE IF NOT EXISTS Pharmacy(
pharmacyID int auto_increment not null,
pharmacyName varchar(100),
address varchar(100),
primary key (pharmacyID)
);

CREATE TABLE IF NOT EXISTS GPPractice (
    gpPracticeID int auto_increment not null,
    gpPracticeName varchar(150) not null,
    gpPracticeAddress varchar(300) not null,
    primary key (gpPracticeID)
);

CREATE TABLE IF NOT EXISTS GP (
    gpID int auto_increment not null,
    gpFullName varchar(150) not null,
    gpPracticeID int not null,
    primary key (gpID),
    FOREIGN KEY (gpPracticeID)
        REFERENCES GPPractice (gpPracticeID)
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
    preferredName varchar(60) null,
    mobilePhoneNumber varchar(20) not null,
    homePhoneNumber varchar(20) null,
    workPhoneNumber varchar(20) null,
    title enum('Mr', 'Mrs', 'Miss', 'Ms', 'Dr') not null,
    address varchar(150) not null,
    email varchar(100) not null,
    deceased enum('Yes', 'No') default 'No',
    dateOfDeath datetime,
    gpID int,
    pharmacyID int,
    active bool default false,
    foreign key (gpID) references GP(gpID),
    primary key (userID),
    foreign key (pharmacyID) references Pharmacy(pharmacyID)
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

CREATE TABLE IF NOT EXISTS TaskQuestionnaire (
    questionnaireID int auto_increment not null,
    taskID int not null,
    answer varchar(5000) not null,
    answered bool not null,
    dateSubmitted datetime not null,
    primary key (questionnaireID),
    foreign key (taskID) references Task (taskID)
);

CREATE TABLE IF NOT EXISTS MedicationUser (
medicationUserID int auto_increment not null,
userID int not null,
medicationID int not null,
startDate date not null,
endDate date,
dosage varchar(60) not null,
prescribedDate date not null,
instructions varchar(200) not null,
repeated bool not null,
delivery bool not null,
collectionAddress varchar(200),
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
    title enum('Mr', 'Mrs', 'Miss', 'Ms', 'Dr'),
    firstName varchar(60) not null,
    lastName varchar(60) not null,
    jobTitle varchar(30) not null,
    email varchar(100) not null,
    primary key (clinicianID)
);

CREATE TABLE IF NOT EXISTS UserClinician (
    userClinicianID int auto_increment not null,
    userID int not null,
    clinicianID int not null,
    primary key (userClinicianID),
    foreign key (userID) references `User` (userID),
    foreign key (clinicianID) references Clinician(clinicianID)
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
    departmentURL varchar(900),
    departmentWards varchar(200),
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

CREATE TABLE IF NOT EXISTS UserDependant(
    userID int not null,
    dependantID int not null,
    primary key(userID, dependantID),
    foreign key (userID) references User(userID),
    foreign key (dependantID) references User(userID)
);

INSERT INTO Pharmacy(pharmacyName, address)
VALUES('Gordons Chemists', '15-17 Corn Market, Belfast BT1 4DA'),
('Stranmillis Pharmacy', '62 Stranmillis Rd, Belfast BT9 5AD');

CREATE TABLE IF NOT EXISTS UserSideEffect(
    userSideEffectID int auto_increment not null,
    userID int not null,
    sideEffectText text not null,
    `timeStamp` timeStamp not null DEFAULT CURRENT_TIMESTAMP,
    deleted boolean not null,
    primary key(userSideEffectID),
    foreign key (userID) references User(userID)
);

CREATE TABLE IF NOT EXISTS AppointmentQuery (
    appointmentQueryID int auto_increment not null,
    appointmentID int not null,
    clinicianID int not null,
    querySubject varchar(100) not null,
    queryText varchar(350) not null,
    primary key (appointmentQueryID),
    foreign key (appointmentID) references Appointment(appointmentID),
    foreign key (clinicianID) references Clinician(clinicianID)
);



INSERT INTO GP (gpFullName, gpPracticeID)
VALUES ('Dr. A Cheyne', 1),
('Dr. E Glass', 2),
('Dr. R Kane', 3),
('Dr. L Stout', 2),
('Dr. D Dunlop', 1),
('Dr. A Harper', 3);



INSERT INTO `User` (username, `password`, dateOfBirth, gender, MRIN, firstName, lastName, mobilePhoneNumber, homePhoneNumber, workPhoneNumber, title, address, email, deceased, gpID,pharmacyID, active)
VALUES ('jsmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '1960-01-01', 'Female', '123456789', 'Jane', 'Smith', '07712345678', '02890848567', '02890673645', 'Mrs', '32 Orby Walk, Belfast', 'fakeemail@kainos.com', 'No', 1,1, true),
('smurray', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '1997-08-08', 'Female', '123456890', 'Shannon', 'Murray', '07912345678', '02890829521', '028905364758', 'Mrs', '23 Grace Avenue, Belfast', 'fakeemail@kainos.com', 'No', 2,1, true),
('asmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '2005-03-01', 'Male', '123458289', 'Andrew', 'Smith', '07856748927', '02890379216', '', 'Mr', '32 Orby Walk, Belfast', 'fakeemail@kainos.com', 'No', 1,1,false),
('ksmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '2012-03-01', 'Female', '803409789', 'Kate', 'Smith', '07856799927', '02890562581', '', 'Miss', '32 Orby Walk, Belfast', 'fakeemail@kainos.com', 'No', 1,1, false),
('csmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '2005-03-01', 'Female', '803409789', 'Chloe', 'Smith', '07856799927', '02890458294', '', 'Ms', '32 Orby Walk, Belfast', 'fakeemail@kainos.com', 'No', 1,1, false),
('jdaniels', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee',  '1989-11-09', 'Male', '098765432', 'Jack', 'Daniels', '07745678921', '02890627036', '02890267384', 'Mr', '91 Bangor Road, Newtownards',  'fakeemail@kainos.com', 'No', 3,1, true),
('ajackson', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee',  '1995-12-25', 'Male', '543028796', 'Andrew', 'Jackson', '07899137817', '02890736284', '02890579543', 'Dr', '66 Church Street, Antrim',  'fakeemail@kainos.com', 'No', 3,1, true),
('bsmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee',  '1928-08-04', 'Male', '065756297', 'Bill', 'Smith', '07767584930', '02890173826', '', 'Mr', '33 Orby Walk, Belfast',  'fakeemail@kainos.com', 'No', 1,1, false);

INSERT INTO UserDependant (userID, dependantID)
VALUES(1, 3), (1, 4), (1, 8);

INSERT INTO MedicationType(medicationType)
VALUES ('Antibiotic'), ('Mood Stabilizer'), ('Analgesic'), ('Antipyretic'),('Pain Killer'),('Anti-Inflammatory'),('Hormone');

INSERT INTO Medication(medicationName, medicationTypeID, resourceURL)
VALUES('Penicillin', 1, 'https://en.wikipedia.org/wiki/Penicillin'), -- 1
('Amoxicillin', 1, 'https://en.wikipedia.org/wiki/Amoxicillin'), -- 2
('Lithium', 2, 'https://en.wikipedia.org/wiki/Lithium_(medication)'), -- 3
('Olanzapine', 2, 'https://en.wikipedia.org/wiki/Olanzapine'), -- 4
('Paracetamol', 3, 'https://en.wikipedia.org/wiki/Paracetamol'), -- 5
('Morphine', 3, 'https://en.wikipedia.org/wiki/Morphine'), -- 6
('Ibuprofen', 4, 'https://en.wikipedia.org/wiki/Ibuprofen'), -- 7
('Ketoprofen', 4, 'https://en.wikipedia.org/wiki/Ketoprofen'), -- 8
('Xylometazoline', 1, 'https://en.wikipedia.org/wiki/Xylometazoline'), -- 9
('Codeine',5,'https://en.wikipedia.org/wiki/Codeine'), -- 10
('Naproxen',6,'https://en.wikipedia.org/wiki/Naproxen'), -- 11
('Insulin',7,'https://en.wikipedia.org/wiki/Insulin'); -- 12

INSERT INTO MedicationUser(userID, medicationID, startDate, endDate, dosage, instructions,prescribedDate,repeated, delivery)
VALUES
(1, 12, '2017-06-01', '2019-08-10', '30 units', 'Subcutaneous injection. Take as recommended by your diabetic specialist','2017-09-01',TRUE,TRUE),
(1, 12, '2016-06-01', '2017-06-01', '20 units', 'Subcutaneous injection. Take as recommended by your diabetic specialist', '2017-09-01',TRUE,TRUE),
(1, 12, '2015-06-01', '2016-06-01', '20 units', 'Subcutaneous injection. Take as recommended by your diabetic specialist', '2017-04-01',TRUE,TRUE),
(1,10, (NOW() - INTERVAL 170 DAY),(NOW() + INTERVAL 100 DAY),'60mg','Take 1 tablet every 4 hours as needed. Do not exceed 240mg a day.', (NOW() - INTERVAL 20 DAY), true,TRUE),
(1,11,(NOW() - INTERVAL 170 DAY),(NOW() + INTERVAL 100 DAY),'220mg','Take 1 caplet every 8-12 hours',(NOW() - INTERVAL 20 DAY),false,TRUE),
(1,12,(NOW() - INTERVAL 1000 DAY),NULL,'30 Units','Subcutaneous injection. Take as recommended by your diabetic specialist',(NOW() - INTERVAL 12 DAY),true,TRUE),
(4,9,(NOW() - INTERVAL 2 DAY),(NOW() + INTERVAL 12 DAY),'30mg','Subcutaneous injection. Take as recommended by your diabetic specialist',(NOW() - INTERVAL 12 DAY),true,TRUE);

/*INSERT INTO MedicationUserComment(medicationUserID, commentText, deleted)
VALUES (1, 'Not feeling the benefit after two weeks', false), (2, 'Helping to minimise pain but still exists', false),
(8, 'Not helping with pain, possibly need stronger medication', false), (4, 'Feeling better mentally', false),
(5, 'Hearing not improving', false),
(6, 'Ear pain easing', false),
(6, 'Eye pain gone', true);*/

INSERT INTO Clinician (title, firstName, lastName, jobTitle, email)
VALUES ('Dr', 'Alex', 'Hyndman', 'Consultant', 'c.mullan@kainos.com'),
('Dr', 'John', 'Adams', 'Oncologist', 'c.mullan@kainos.com'),
('Dr', 'Karen', 'Reid', 'Obstetrician',  'c.mullan@kainos.com'),
('Dr', 'Sally', 'Jones', 'Consultant',  'c.mullan@kainos.com'),
('Dr', 'Ian', 'Stokes', 'Clinical Nurse Specialist',  'c.mullan@kainos.com'),
(NULL, 'Clinic', 'Administration', 'Admin team',  'c.mullan@kainos.com');

INSERT INTO UserClinician (userID, clinicianID)
VALUES (1, 4), (1, 5), (1, 6), (8, 4);

INSERT INTO Location (locationAddress)
VALUES ('Royal Victoria Hospital, 274 Grosvenor Rd, Belfast, BT12 6BA'),
('Mater Hospital, 45-54 Crumlin Rd, Belfast, BT14 6AB'),
('Belfast City Hospital, Lisburn Rd, Belfast, BT9 7AB');

INSERT INTO Department (DepartmentName)
VALUES ('Orthopeadic'), ('Community Diabetes Team'), ('Oncology'), ('GP');

INSERT INTO LocationDepartment (locationID, departmentID, departmentURL, departmentWards)
VALUES (1, 1, 'http://www.belfasttrust.hscni.net/services/3035.htm', '3a'), (2, 1, 'http://www.belfasttrust.hscni.net/services/3035.htm', '3a'), (2, 2, 'http://www.belfasttrust.hscni.net/CommunityDiabetesSpecialistTeams.htm', '4c'), (3, 3, 'http://www.belfasttrust.hscni.net/services/CommunityOncologyPalliativeCare.htm', '1b'),(1,4, 'http://online.hscni.net/family-practitioners/general-practitioners-gps/', '4a');

INSERT INTO AppointmentType (`type`)
VALUES ('Pre-Op Assessment'), ('Emergency Surgery'), ('GP Appointment'), ('Check-up');

INSERT INTO Appointment (userID, locationDepartmentID, clinicianID, dateOfAppointment, `comment`, appointmentTypeID)
VALUES
(1,3,1,(NOW() - INTERVAL 20 DAY),'Jane expressed issues with drowsiness recently, investigation ongoing.',4),
(1,3,1,(NOW() - INTERVAL 4 DAY),'Check up on Jane''s hip problems - surgery scheduled for a month''s time',1),
(1,5,3,(NOW() - INTERVAL 170 DAY),'Jane has been experiencing hip problems, prescribed painkillers, investigation ongoing',3),
(1,5,3,(NOW() - INTERVAL 30 DAY),'Diagnosed with conjunctivitis - antibiotics prescribed',3),
(1,1,1,(NOW() + INTERVAL 12 DAY),'Please fill in the pre-op assessment form',4),
(1,3,1,(NOW() + INTERVAL 20 DAY), NULL,4),
(8,4,2, (NOW() + INTERVAL 12 DAY), NULL, 1),
(8,5,1, (NOW() - INTERVAL 2 DAY), 'Regular check-up - patient in good health', 4),
(8,4,2, (NOW() - INTERVAL 322 DAY), 'null', 1),
(4,5,1, (NOW() + INTERVAL 12 DAY), 'Eye check-up', 4),
(4,5,1, (NOW() - INTERVAL 12 DAY), 'Eye check-up', 4),
(7,5,1, (NOW() - INTERVAL 62 DAY), 'Routine checkup.', 3),
(7,5,1, (NOW() - INTERVAL 62 DAY), 'Routine checkup.', 3),
(1,3,1,'2015-10-10','Jane has received a diagnosis of Type 1 Diabetes',3),
(1,3,1,'2016-04-10','Diabetes checkup',3),
(1,3,1,'2016-10-10','Diabetes checkup',3),
(1,3,1,'2017-04-10','Diabetes checkup',3),
(1,5,1,'2014-07-03','Jane has been diagnosed as being allergic to penicillin',3);

INSERT INTO `Condition` (conditionName, conditionLink)
VALUES ("Hip Replacement", "http://www.nhs.uk/Conditions/Hip-replacement/Pages/Introduction.aspx"),
("Diabetes", "http://www.nhs.uk/Conditions/Diabetes/Pages/Diabetes.aspx"),
("Conjunctivitis", "http:/g/www.nhs.uk/Conditions/Conjunctivitis-infective/Pages/Treatment.aspx"),
("Back Pain", "http://www.nhs.uk/conditions/back-pain/Pages/Introduction.aspx");

INSERT INTO UserCondition (userID, conditionID, startDate, endDate)
VALUES (1,1,(NOW() - INTERVAL 170 DAY),NULL),
(1,2,(NOW() - INTERVAL 1000 DAY),NULL),
(1,3,(NOW() - INTERVAL 30 DAY),(NOW() - INTERVAL 25 DAY)),
(4,3,(NOW() - INTERVAL 3 DAY),NULL);

INSERT INTO UserSideEffect (userID, sideEffectText, deleted)
VALUES (1, 'I get a sore head after I take my meds in the morning', false),
(1, 'I feel drowsy since I started lithium', false);

INSERT INTO Task(taskName, userID, taskSummary, recievedDate, dueDate)
VALUES('Pre-op questionnaire', 1, 'Questionnaire to be filled out before surgery. Includes allergies and general health questions.', (NOW() - INTERVAL 4 DAY), (NOW() + INTERVAL 30 DAY)),
('Pre-op Assessment: Olanzapine', 1, 'Form used to assess your suitibility for Olanzapine which will be used post surgery.', (NOW() - INTERVAL 12 DAY), (NOW() - INTERVAL 2 DAY));
