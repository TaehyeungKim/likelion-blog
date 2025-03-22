import { createContext, useState } from "react";

const UserContextDefaultValue = {
  user: null,
  setUser: () => {},
};
const UserContext = createContext(UserContextDefaultValue);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(UserContextDefaultValue.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
