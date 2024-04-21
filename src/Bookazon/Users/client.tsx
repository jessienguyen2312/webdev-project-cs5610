import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const API_USERS = `${API_BASE}/api/users`

axios.defaults.withCredentials = true

export interface User {
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
    const response = await axios.get(`${API_USERS}/find/${username}`)
    return response.data;
}

export const findAllUsers = async () => {
    const response = await axios.get(`${API_USERS}`);
    return response.data;
};

export const findUserById = async (id: string) => {
    const response = await axios.get(`${API_USERS}/${id}`);
    return response.data;
};

// are we gonna use id or username?
export const updateUser = async (user: any) => {
    const response = await axios.put(`${API_USERS}/${user._id}`, user);
    return response.data;
};

export const deleteUser = async (user: any) => {
    const response = await axios.delete(
        `${API_USERS}/${user._id}`);
    return response.data;
};

export const signin = async (credentials: User) => {
    console.log(credentials)
    const response = await axios.post(`${API_USERS}/signin`, credentials);
    return response.data;
};

export const signout = async () => {
    const response = await axios.post(`${API_USERS}/signout`);
    return response.data;
};


export const profile = async () => {
    const response = await axios.post(`${API_USERS}/profile`);
    return response.data;
};
