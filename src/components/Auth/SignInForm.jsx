import useAuth from "../../hooks/useAuth";
import "./Auth.css";

const SignInForm = () => {
	const { handleSignIn, setSignInEmail, setSignInPassword } = useAuth();

	return (
		<form className="signin__form" onSubmit={(e) => handleSignIn("email", e)}>
			<label className="form__label">
				Email
				<input
                    className="form__input"
					type="email"
					name="email"
					autoComplete="email"
					required
					onChange={(e) => setSignInEmail(e.target.value)}
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
					onChange={(e) => setSignInPassword(e.target.value)}
				/>
			</label>
			<input type="submit" value={"Sign in"} className="form__submit"/>
			<p className="form__text">
				Don't have an account yet? <a href="/signup">Sign up</a>
			</p>
		</form>
	);
};

export default SignInForm;
