import {Link} from "react-router-dom";

function Navigation() {
    return (
        <div>
            <Link to="/Bookazon/Home">Home</Link> |
            <Link to="/Bookazon/Profile">Profile</Link> |
            <Link to="/Bookazon/SignIn">Sign in</Link> |
            <Link to="/Bookazon/SignUp">Sign up</Link> |
            <Link to="/Bookazon/Reviews">Reviews</Link> |
            <Link to="/Bookazon/Search">Search Books</Link> |
            <Link to="/Bookazon/SearchResult">SearchResult</Link> |
            <Link to="/Bookazon/BookDetail">BookDetail</Link> |
        </div>

    )
}

export default Navigation;