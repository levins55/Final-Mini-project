import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFlow() {
  const socialContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    margin: "20px 0",
  };

  const socialLinkStyle = {
    color: "black",
    textDecoration: "none",
    transition: "color 0.3s ease",
  };

  const socialLinkHoverStyle = {
    color: "#0317ad",
  };

  return (
    <div>
      <footer>
        <p style={socialContainerStyle}>
          <a
            href="https://github.com/levins55"
            className="github social"
            style={socialLinkStyle}
            onMouseOver={(e) => (e.target.style = socialLinkHoverStyle)}
            onMouseOut={(e) => (e.target.style = socialLinkStyle)}
          >
            <FontAwesomeIcon icon={faGithub} size="3x" />
          </a>
          <a
            href="https://www.facebook.com/slevin.levin.9?mibextid=ZbWKwL"
            className="facebook social"
            style={socialLinkStyle}
            onMouseOver={(e) => (e.target.style = socialLinkHoverStyle)}
            onMouseOut={(e) => (e.target.style = socialLinkStyle)}
          >
            <FontAwesomeIcon icon={faFacebook} size="3x" />
          </a>
          <a
            href="https://www.instagram.com/phoenix_bank_of_india/"
            className="instagram social"
            style={socialLinkStyle}
            onMouseOver={(e) => (e.target.style = socialLinkHoverStyle)}
            onMouseOut={(e) => (e.target.style = socialLinkStyle)}
          >
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </a>
          <a
            href="https://twitter.com/levins_6383"
            className="twitter social"
            style={socialLinkStyle}
            onMouseOver={(e) => (e.target.style = socialLinkHoverStyle)}
            onMouseOut={(e) => (e.target.style = socialLinkStyle)}
          >
            <FontAwesomeIcon icon={faTwitter} size="3x" />
          </a>
        </p>
      </footer>
    </div>
  );
}
