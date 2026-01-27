
import { Link } from "react-router-dom";
import "./NotFound.css"; // NEW: Import the dedicated CSS file

const NotFound = () => {
  return (
    // Use className="not-found-container"
    <div className="not-found-container">
        {/* Use className="not-found-content" */}
        <div className="not-found-content">
            
            {/* 404 Title */}
            <h1 className="not-found-title">404</h1>
            
            {/* Friendly Message */}
            <p className="not-found-message">
                Oops! The page you’re looking for doesn’t exist.
            </p>
            <p className="not-found-text">
                We could n't find your order or menu item. Let's get you back home!
            </p>
            
            {/* Go Home Button */}
            <Link to="/" className="home-button">
                Go Back Home
            </Link>
            
        </div>
    </div>
  );
};



export default NotFound;