# Sparsam - An awesome budgeting app 🐽

This application handles the **backend** of the sparsam budgeting app. [See the frontend here.](https://github.com/fraulueneburg-ironhack/p3-frontend)

## Demo

- Demo at https://sparsam.netlify.app/

## Code

- Frontend at https://github.com/fraulueneburg-ironhack/p3-frontend
- Backend at https://github.com/fraulueneburg-ironhack/p3-backend

## Technologies

| Name                       | Description                                                                             |
| :------------------------- | :-------------------------------------------------------------------------------------- |
| **Create React App**       | Bootstrap code                                                                          |
| **MongoDB:**               | Non-relational database                                                                 |
| **Node.js:**               | JavaScript runtime environment for server-side development |
| **Express.js:**            | Backend web application framework for Node.js. |
| **Axios:**                 | For uncomplicated HTTP requests to interact with the backend                            |

## Installation

### Clone the repository:

```
git clone https://github.com/fraulueneburg-ironhack/p3-backend.git
```

### Install dependencies:

```
npm install mongo-db
npm install express
npm install axios
```

### Set up your backend

- see https://github.com/fraulueneburg-ironhack/p3-backend for that

### Set up MongoDB

- Install MongoDB 👉 https://docs.mongodb.com/manual/installation/
- Configure MongoDB connection

### Start the server
- start the server: `npm start`

## API Endpoints

### User-related Endpoints
| Name | Description |
|:--|:--|
| `GET /auth/profile` | Get the user data |
| `POST /auth/profile` | Update the user data |
| `DELETE /auth/profile/delete` | Delete user data |

### Budget-related Endpoints
| Name | Description |
|:--|:--|
| `GET /budget/` | Get the user’s budget and daily expenses |
| `POST /budget/settings` | Get the user’s budget data |
| `POST /budget/create` | Update budget data / create budget for new user |

### DailyExpenses-related Endpoints
| Name | Description |
|:--|:--|
| `POST /budget/addexpense` | Adds a new daily expense |
| `POST /budget/updateexpense/:dailyExpenseId` | Updates an existing daily expense |
| `DELETE /deleteexpense/:dailyExpenseId` | Deletes an existing daily expense |

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, please open an issue or submit a pull request.

## Authors

Sparsam is a full stack web app created by [Michel](https://github.com/michelsaber) and [Wiebke](https://github.com/fraulueneburg-ironhack). We hope you enjoy it.
