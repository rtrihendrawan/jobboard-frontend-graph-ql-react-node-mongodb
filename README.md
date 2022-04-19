# JobBoard App Frontend with React.js React Context GraphQL

`jobboard-frontend-graph-ql-react-node-mongodb`

## About

This app was created as a playground with React.js on the frontend side, Node.js on the backend side, utilizing the amazing GraphQL as the backend API and MongoDB as the backend.

Frontend site-wide state management was provided by React Context, while API endpoints mapped with GraphQL using Schema & Resolvers, and all data to be fetched from a MongoDB database.

Authentication was created using BCrypt hash on server side and JWT (JSON Web Token) token string to be generated & signed on server to be provided to client side for each authenticated logged-in user.

Here we practice a decoupled server backend from frontend clients, where the server only provide data and is not related with client-side states.

## Usage
### Create a new file named '.env' right in the root directory

### Add inside .env file variables as follows:
```
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_ASSET_URL=http://localhost:8000
```

### Run the following from command prompt
```
npm install
npm start
```

----------------
## Online Demo
<https://rikotrihendrawan.github.io/portfolio/job-board-graphql>
