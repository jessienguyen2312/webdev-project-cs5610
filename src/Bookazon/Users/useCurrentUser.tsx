import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as userClient from "./client";
import { resetUser, setUser } from './userReducer';

function useCurrentUser() {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {

            const user = await userClient.session();
            // console.log(user)

            if (user) {
                dispatch(setUser(user));
                console.log('login success')
            }
            else {
                console.log('Not logged in or session expired');
                dispatch(resetUser());
            }


        };

        fetchProfile();
    }, [dispatch]);


}

export default useCurrentUser;
