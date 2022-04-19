import React from 'react';

const AuthContext = React.createContext({
  token: null,
  userId: null,
  email: null,
  login: (token, userId, email, tokenExpiration) => {},
  logout: () => {},
});

// export const UserProvider = AuthContext.Provider;
// export const UserConsumer = AuthContext.Consumer;

export default AuthContext;
