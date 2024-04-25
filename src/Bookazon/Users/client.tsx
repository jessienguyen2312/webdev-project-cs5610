import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
// const API_BASE = `https://bookazon-node-server.onrender.com`
const API_USERS = `http://localhost:4000/api/users`
const API_SESSION = `http://localhost:4000/api/session`

const request = axios.create({
    withCredentials: true
});

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
    follower: [],
    following: [],
    favoriteBook: [],
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

export const findUserById = async (id: string) => {
    const response = await request.get(`${API_USERS}/${id}`, { withCredentials: true });
    return response.data;
};

// are we gonna use id or username?
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
