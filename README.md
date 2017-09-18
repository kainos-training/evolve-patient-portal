# evolve-patient-portal

## Getting Started

This seed project has been created to get you up and running quickly for development and testing on the Evolve patient portal.

For coding standards and additional info please see the project wiki :)

### Database
Run script for creation and insertion of mock data to create a local copy of the database.
patientPortalDB.sql

### Prerequisites

```
Node, npm, git
```

Please create a server/.env with the following template (refer to .env.example file):
```
# Express Variables
EXPRESSPORT={EXPRESS_PORT}

# MySQL Variables
MYSQL_USER={USER}
MYSQL_PASSWORD={PASSWORD}
MYSQL_HOST={HOST}
DATABASENAME={DATABASENAME}

# Email Variables
EMAIL={EMAIL}
EMAIL_PASSWORD={PASSWORD}
EMAIL_HOST={HOST}
EMAIL_PORT={PORT}
SECURE={SECURE}

# JWT Variables
JWT_SECRET={JWT_SECRET}
{
  "user" : "user",
  "password" : "password",
  "host" : "localhost",
  "port" : 8002,
  "database" :"database",
  "jwtSecret": "jwtSecret"
}
```

### Installing/Running

```
- Clone the repository
- cd client
- npm install
- npm start

- cd server
- npm install
- npm start
```
