import react, { useState, createContext } from "react";

// {
//     onCourseSearch : () => {},
//     onChildSubjectSearch : () => {},
//     onDateChange : () => {},
//     onSelfPasedChange : () => {}
// }

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({});

  console.log(auth);

  return (
    <AuthContext.Provider value={{auth,
    setAuth}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
