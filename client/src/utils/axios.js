import axios from "axios";

const setBaseURL = () =>
    process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://onlineshitlist.com";

const Axios = axios.create({
    baseURL: setBaseURL(),
    timeout: 850,
    headers: {
        authorization: `Bearer ${
            localStorage.getItem("token") ? localStorage.getItem("token") : null
        }`,
        "access-control-allow-origin": "*"
    }
});

export default Axios;
