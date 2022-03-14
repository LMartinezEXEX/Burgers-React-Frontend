import { useState } from "react";
import admin_service from "../services/admin_service";

import '../assets/css/UserToAdministrate.css';

const UserToAdministrate = (props) => {

    const role_names = props.roles.map(role => role.name);

    const [isMod, setIsMod] = useState(role_names.includes("ROLE_MODERATOR"));
    const [isAdmin, setIsAdmin] = useState(role_names.includes("ROLE_ADMIN"));

    const onChangeAdmin = (e) => {

        if(e.target.checked){
            admin_service.addRole(props.id, "admin")
            .then(() => {
                console.log("Admin role assigned successfully to: ", props.username);
            },
            (error) => {
                console.error("Error: Couldn't add admin role to: ", props.username);
            })
        } else {
            admin_service.removeRole(props.id, "admin")
            .then(() => {
                console.log("Admin role removed successfully from: ", props.username);
            },
            (error) => {
                console.error("Error: Couldn't remove admin role from: ", props.username);
            })
        }
    };

    const onChangeMod = (e) => {

        if(e.target.checked){
            admin_service.addRole(props.id, "mod")
            .then(() => {
                console.log("Moderator role assigned successfully to: ", props.username);
            },
            (error) => {
                console.error("Error: Couldn't moderator admin role to: ", props.username);
            })
        } else {
            admin_service.removeRole(props.id, "mod")
            .then(() => {
                console.log("Moderator role removed successfully from: ", props.username);
            },
            (error) => {
                console.error("Error: Couldn't remove moderator role from: ", props.username);
            })
        }
    };


    return (
        <tr>
            <td>{ props.username }</td>
            <td>{ props.email }</td>
            <td className="role-cell"><input type="checkbox" defaultChecked={isMod} onChange={onChangeMod}></input></td>
            <td className="role-cell"><input type="checkbox" defaultChecked={isAdmin} onChange={onChangeAdmin}></input></td>
        </tr>
    );
};

export default UserToAdministrate;