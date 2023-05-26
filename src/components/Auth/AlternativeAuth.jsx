import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const AlternativeAuth = () => {
	const { handleSignIn } = useAuth();
	return (
		<button onClick={() => handleSignIn("google")} className="google-auth">
			Continue with Google <FcGoogle />
		</button>
	);
};

export default AlternativeAuth
