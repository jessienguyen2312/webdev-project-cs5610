import axios from "axios";

//const API_BASE = process.env.REACT_APP_API_BASE;
//const API_BASE = `https://bookazon-node-server.onrender.com`
const API_BASE = "http://localhost:4000"
const API_USERS = `${API_BASE}/api/users`
const API_SESSION = `${API_BASE}/api/session`

const request = axios.create({
    withCredentials: true
});

/* THIS MIGHT HELP WITH ON RENDER DEPLOYMENT
const request = axios.create({
    baseURL: API_BASE,
    withCredentials: true
}); */

export interface User {
    _id: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    dateCreated: Date,
    aboutMe: String,
    profilePicture: String, // Default empty, set conditionally below
    follower: String [],
    following: String[],
    favoriteBook: string[],
    OL_author_key: String
};

export const findUserByUserName = async (username: any) => {
    const response = await request.get(`${API_USERS}/find/${username}`, { withCredentials: true })
    return response.data;
}

export const findAllUsers = async () => {
    const response = await request.get(`${API_USERS}`, { withCredentials: true });
    return response.data;
};

export const findAllAuthors = async () => {
    try {
        const response = await request.get(`${API_USERS}?role=AUTHOR`, {withCredentials: true});
        console.log(response.data);
        return response.data;

    } catch (error: any) {
        console.log(error);
    }
}

export const findUserById = async (id: string) => {
    const response = await request.get(`${API_USERS}/${id}`, { withCredentials: true });
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await request.put(`${API_USERS}/${user._id}`, user, { withCredentials: true });
    return response.data;
};

export const deleteUser = async (user: any) => {
    const response = await request.delete(
        `${API_USERS}/${user._id}`, { withCredentials: true });
    return response.data;
};

export const signin = async (credentials: any) => {
    console.log("Credentials", credentials)
    const response = await request.post(`${API_USERS}/signin`, credentials, { withCredentials: true });
    console.log("Response data", response.data)
    return response.data;
};

export const signout = async () => {
    const response = await request.post(`${API_USERS}/signout`, { withCredentials: true });
    return response.data;
};


export const profile = async () => {
    const response = await request.post(`${API_USERS}/profile`, { withCredentials: true });
    return response.data;
};

export const session = async () => {
    try {
        const response = await request.get(`${API_SESSION}`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        // if error means no user
           return null
    }
};

export const signup = async (user: any) => {
    const response = await request.post(`${API_USERS}/signup`, user, { withCredentials: true });
    return response.data;
}

export const unfollowUser = async (userId: string, usernameToUnfollow: string) => {
    try {
        const response = await request.put(`${API_USERS}/${userId}/unfollow`, { usernameToUnfollow });
        console.log("CLIENT LOG: attempting to unfollow user: ", usernameToUnfollow)
        if (response.status === 200) {
            console.log('Unfollow successful:', response.data);
            return response.data;
        } else {
            throw new Error(`Failed to unfollow: Status ${response.status}`);
        }
    } catch (error) {
        console.error('Error while unfollowing user:', error);
        throw error;
    }
};

export const followUser = async (userId: string, usernameToFollow: string) => {
    try {
        const response = await request.put(`${API_USERS}/${userId}/follow`, { usernameToFollow });
        console.log("CLIENT LOG: attempting to follow user: ", usernameToFollow)
        if (response.status === 200) {
            console.log('Follow successful:', response.data);
            return response.data;
        } else {
            throw new Error(`Failed to follow: Status ${response.status}`);
        }
    } catch (error) {
        console.error('Error while following user:', error);
        throw error;
    }
};

export const findUsersByRole = async (role: string) => {
    const response = await
        request.get(`${API_USERS}?role=${role}`);
    return response.data;
};

