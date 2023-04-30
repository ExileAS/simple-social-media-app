import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers, selectAllUsers } from "./UsersSlice";
import React, { useEffect } from "react";


export const UsersList = () => {
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    },[dispatch]);
    
    const renderedUsers = users.map(user => {
        return (
           <li key={user.id}>
                <Link to={'/users/' + user.id}>{user.name}</Link>
           </li>
        )
    });
    
    
    

    return (
        <section>
            <h2>Users</h2>
            <ul>{renderedUsers}</ul>
        </section>
    )

}
