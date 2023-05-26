import { useState, createContext, useContext, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authError, setAuthError] = useState();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(
			(currentUser) => {
				setUser(currentUser);
				setAuthError(null);
			},
			(error) => {
				setAuthError(error);
				setUser(null);
			}
		);
		return unsubscribe;
	}, []);

  useEffect(()=>{
    setTimeout(()=> setAuthError(""),3000)
  },[authError])

	return (
		<UserContext.Provider value={{ user, setUser, authError, setAuthError }}>
			{children}
		</UserContext.Provider>
	);
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
