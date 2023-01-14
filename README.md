# Burgers React Frontend

Demo frontend for **Burgers** developed with ReactJS library with usage of Redux to store and update data across the application.

---

## Description

This project connects to the **Burgers** [backend](https://github.com/LMartinezEXEX/Burgers-Spring-Backend) api for a user web interface. You can register as a regular user and make your own custom burger orders :p

> In order to create admin or mod users, who can configurate the ingridients, prices and discount codes, should be used `curl` os Postman to hit the respective api endpoint. Take the next json as the body of the message:
>
> ```json
> {
>    "username" : "full_User",
>    "email" : "full_user@mail.com",
>    "password" : "nonSecurePassw0rd",
>    "role" : ["user", "mod", "admin"]
> }
> ```
>

## Download and run

```bash
# Clone this repository
git clone https://github.com/LMartinezEXEX/Burgers-React-Frontend.git

# Change your CWD inside the cloned repository
cd Burgers-React-Frontend

# Install the needed dependencies
npm install

# Start the application
npm start
```

> **CLARIFICATION**: This project was developed to deepend my knowledge in the library, so by **NO** means this should be used for commercial use.