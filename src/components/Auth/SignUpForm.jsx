import useAuth from "../../hooks/useAuth";
import "./Auth.css";
import removeBlanks from "../../utilities/removeBlanks";

const SignUpForm = () => {
	const { handleSignUp, setSignUpEmail, setSignUpPassword ,setSignUpUsername} = useAuth();

	return (
		<form className="signup__form" onSubmit={(e) => handleSignUp("email", e)}>
			<label className="form__label">
				Username
				<input
                    className="form__input"
					type="text"
					name="displayName"
					autoComplete="username"
					required
					onChange={(e) => setSignUpUsername(removeBlanks((e.target.value)))}
				/>
			</label>
			<label className="form__label">
				Email
				<input
                    className="form__input"
					type="email"
					name="email"
					autoComplete="email"
					required
					onChange={(e) => setSignUpEmail(e.target.value)}
				/>
			</label>
			<label className="form__label">
                Password
				<input
                    className="form__input"
					type="password"
					name="password"
					autoComplete="current-password"
					required
					minLength={6}
					onChange={(e) => setSignUpPassword(e.target.value)}
				/>
			</label>
			<input type="submit" value={"Sign up"} className="form__submit"/>
			<p className="form__text">
				Already signed up? <a href="/signin">Sign in</a>
			</p>
		</form>
	);
};

export default SignUpForm;
