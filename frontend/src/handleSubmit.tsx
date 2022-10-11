import axios from "axios";

export const handleSubmit = (email: string, pass: string) => {

    //reqres registered sample user
    const loginPayload = {
        email: email,
        password: pass
    }

    axios.post("http://localhost:3001/auth/login", loginPayload)
    .then(response => {
        window.alert("")
        //get token from response
        const token  =  response.data.Authorization;
        console.log(token);

        //set JWT token to local
        localStorage.setItem("token", token);

        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        location.reload()
    })
    .catch(err => console.log(err));
    window.alert("")
};

export const setAuthToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else delete axios.defaults.headers.common["Authorization"];
}