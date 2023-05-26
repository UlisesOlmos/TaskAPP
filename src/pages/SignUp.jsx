import { AlternativeAuth, SignUpForm } from "../components";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";

const SignUp = () => {
	const { user ,authError} = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate("/tasks");
	}, [user,navigate]);


	return (
		<div className="auth">
            <p className="auth__text">Sign up for free</p>
			<div className="auth__form">
				{!authError ? null : <p className="auth__msg">{`*${authError.slice(5).replace(/-/g," ")}`}</p>}
				<SignUpForm />
				<AlternativeAuth />
			</div>
		</div>
	);
};

export default SignUp;
