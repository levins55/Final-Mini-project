import React from 'react';
import { UseCard } from "../components/partials/UseCard";
import logo from "../images/phoenixlogo.png"
import SocialFlow from "../components/partials/socialicon";

const warningStyle = {
    color: "red",
    fontSize: ".8rem",
    fontWeight: "bold",
    marginBottom: "1rem",
};

export const Home = () => {
    return (
        <><UseCard
            align="center"
            txtcolor="black"
            header={<h3 style={{ color: "red" }}>A Phoenix Of Bank</h3>}
            title={<h4 style={{ color: "blue" }}>Welcome to Bank!</h4>}
            text="We were bad, but we got better."
            body={<>
                <img
                    alt="bank"
                    className="bank rounded-circle"
                    variant="top"
                    src={logo}
                    style={{
                        width: "400px",
                        height: "400px",
                        objectFit: "cover",
                        border: "4px solid white"
                    }} />
                <br />
                <div
                    style={{
                        fontSize: ".6rem",
                    }}
                >
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://icons8.com/icon/tx3AdinOQ2kf/bank"
                    >
                        Bank
                    </a>{" "}
                    icon by{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://icons8.com"
                    >
                        Icons8
                    </a>
                </div>
                <p style={warningStyle}>
                    This app is for educational purposes only. Please do not
                    use your real credentials
                </p>
            </>
            } />
            <SocialFlow />
            </>
        
    );
};
