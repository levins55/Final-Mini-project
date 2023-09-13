import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset, logout } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { UseCard } from "../components/partials/UseCard";
import { capitalize } from "../features/capitalize";
import axios from "axios";

const passWrap = {
    display: "flex",
    position: "relative",
};

const eyeStyle = {
    position: "absolute",
    right: "1rem",
    top: ".3rem",
};

export const CreateAccount = () => {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    const currentUser = localStorage.getItem("user");

    useEffect(() => {
        if (isError) {
            toast.error(message, {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
            });
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) =>
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

    function validate(field, label) {
        const nameRegex = /^[a-zA-Z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!field) {
            toast.error("Error: " + label + " is required", {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
            });
            return false;
        }
        if (!nameRegex.test(name)) {
            toast.error("Error: Please enter a valid name!", {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
            });
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error("Error: Please enter a valid email!", {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
            });
            return false;
        }
        if (password.length < 8) {
            toast.error("Error: Password must be at least 8 characters", {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
            });
            return false;
        }
        return true;
    }

    const createUser = async (userData) => {
        await axios.post("http://localhost:8080/api/users", userData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const data = response.data;
            console.log('data', data);
    
            // Handle the response data here
            if (response.status === 200) {
                // Account created successfully
                toast.success("Your account has been created successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false,
                });
                // You can add additional logic here, such as redirecting the user to a login page
                // navigate("/login");
            } else {
                // Handle server-side validation errors or other errors
                toast.error("Error creating account. Please try again.", {
                    position: "top-right",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false,
                });
            }
        })
        .catch((error) => {
            // Handle network errors or other exceptions
            console.error("Error creating user:", error);
        });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            password,
        };

        if (
            !validate(name, "Name") ||
            !validate(email, "Email") ||
            !validate(password, "Password")
        )
            return;
        dispatch(register(createUser(userData))); // Call the createUser function to make the API request
    };

    const togglePass = () => {
        setShowPass((prevShowPass) => !prevShowPass);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        dispatch(logout());
        setFormData({
            name: "",
            email: "",
            password: "",
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return currentUser ? (
        <>
            <UseCard
                align="center"
                bgcolor="success"
                opacity="10"
                header={`Hello, ${capitalize(user.name)}!`}
                body={
                    <>
                        <h4>You are logged in!</h4>
                        <p>Log out if you want to use a different account.</p>
                        <button
                            type="submit"
                            id="logOutButton"
                            className="btn btn-outline-success"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt /> Log Out
                        </button>
                    </>
                }
            />
        </>
    ) : (
        <UseCard
            bgcolor="success"
            opacity="10"
            header={<>Create Account</>}
            body={
                <>
                    <form onSubmit={handleSubmit}>
                        Name
                        <br />
                        <input
                            type="input"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={onChange}
                        />
                        <br />
                        Email
                        <br />
                        <input
                            type="input"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={onChange}
                        />
                        <br />
                        Password
                        <br />
                        <div style={passWrap}>
                            <input
                                type={showPass ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={onChange}
                            />
                            <div style={eyeStyle}>
                                <BsEyeSlashFill
                                    fontSize={"1.5rem"}
                                    onClick={togglePass}
                                    style={{ cursor: "pointer" }}
                                    hidden={showPass}
                                />
                                <BsEyeFill
                                    fontSize={"1.5rem"}
                                    onClick={togglePass}
                                    style={{ cursor: "pointer" }}
                                    hidden={!showPass}
                                />
                            </div>
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="btn btn-outline-success"
                        >
                            <FaUserPlus />
                            {"   "}Create account
                        </button>
                    </form>
                </>
            }
        />
    );
};

export default CreateAccount;
