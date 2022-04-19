import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class AboutPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='job__page'>
          <h1>About JobBoard App</h1>

          <p>
            This app was created as a playground with React.js on the frontend
            side, Node.js on the backend side, utilizing the amazing GraphQL as
            the backend API and MongoDB as the backend.
          </p>

          <p>
            Frontend site-wide state management was provided by React Context,
            while API endpoints mapped with GraphQL using Schema & Resolvers,
            and all data to be fetched from a MongoDB database.
          </p>

          <p>
            Authentication was created using BCrypt hash on server side and JWT
            (JSON Web Token) token string to be generated &amp; signed on server
            to be provided to client side for each authenticated logged-in user.{' '}
          </p>

          <p>
            Here we practice a de-coupled server backend from frontend client,
            where the server only provide data and is not related with
            client-side states.
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default AboutPage;
