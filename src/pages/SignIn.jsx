import { SignInForm, AlternativeAuth } from "../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";


const SignIn = () => {
	const { user ,authError} = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate("/tasks");
	}, [user,navigate]);


	return (
		<div className="auth">
            <p className="auth__text">Sign in to your account</p>
			<div className="auth__form">
			{!authError ? null : <p className="auth__msg">*Incorrect email or password</p>}
				<SignInForm />
				<AlternativeAuth />
			</div>
		</div>
	);
};

export default SignIn;
