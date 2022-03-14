import { useEffect, useState } from "react";
import admin_service from "../services/admin_service";
import UserToAdministrate from "./UserToAdministrate";

import '../assets/css/UserAdministrator.css';

const UserAdministrator = (props) => {

    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        admin_service.getUsers()
        .then((response) => {

            console.log("Users getted successfull");
            setUsers(response.data);
        },
        (error) => {
            console.error("Error: Couldn't get users");
        })
    },[]);


    return (
        <div className="users-table-container">
            <input type="text" placeholder="Enter user to find" onChange={event => setQuery(event.target.value)} />

            <table>
                <thead>
                    <tr>
                        <th className="username">Username</th>
                        <th className="email">Email</th>
                        <th>Mod</th>
                        <th>Admin</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        users.filter(user => {
                            if(query === ""){
                                return user;
                            } else if (user.username.toLowerCase().includes(query.toLowerCase())){
                                return user;
                            }
                        }).map(user => {
                            return (<UserToAdministrate 
                                id={user.id}
                                username={user.username}
                                email={user.email}
                                roles={user.roles}
                                key={Math.random()}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UserAdministrator;