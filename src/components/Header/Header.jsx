import "./Header.css";
import { useTheme } from "../../contexts/ThemeContext";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { useUser } from "../../contexts/UserContext";
import useAuth from "../../hooks/useAuth";

const Header = () => {
	const { changeTheme, theme } = useTheme();
	const themesIcons = { light: <RiSunLine />, dark: <RiMoonLine /> };
	const { user } = useUser();
    const {signout} = useAuth()

	const isAuth = !!user?.accessToken;

	return (
		<header className="header">
			<a href="/" className="logo">
				Tasks
			</a>
			<nav className="nav">
				{isAuth ? (
					<>
						<a href="/tasks" className="nav__tasks">
							My Tasks
						</a>
						<button className="nav__btn" onClick={()=> signout()}>Logout</button>
					</>
				) : (
					<a href="/signin" className="nav__sign">
						Sign in
					</a>
				)}
				<button onClick={() => changeTheme()} className="theme__btn">
					{themesIcons[theme]}
				</button>
			</nav>
		</header>
	);
};

export default Header;
