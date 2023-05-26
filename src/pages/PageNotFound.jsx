import "./PageNotFound.css";

const PageNotFound = () => {
	return (
		<div className="notFound">
			<div className="notFound__content">
				<p className="notFound__err">ERROR 404</p>
				<h3 className="notFound__title">We couldn't find that page.</h3>
				<p className="notFound__text">
					Sorry! The page you are looking for does not exist or has been moved.
				</p>
				<a href="/" className="notFound__back">
					Go Home
				</a>
			</div>
		</div>
	);
};

export default PageNotFound;