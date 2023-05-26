const Home = () => {
	return (
		<div className="banner">
			<img src="/images/banner.jpg" className="banner__img" alt="banner"/>
			<div className="banner__content">
				<p className="banner__text"> Organize your <span>tasks</span></p>
				<a className="banner__tasks" href="/tasks"> Get Started</a>
			</div>
		</div>
	);
};

export default Home;
