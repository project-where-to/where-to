import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./DesktopNavbar.css";
import { useProfileStore } from "../../globalState.jsx";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import axios from "axios";

export default function DesktopNavbar() {
  const { profile, logout } = useProfileStore();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/session")
      .then(res => {
        if (!res.data.loggedIn) {
          console.log('hittington');
          navigate('/');
        }
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((response) => {
        console.log(response.data.message);
        logout();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const customToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));
  return (
    <Navbar
      expand="md"
      data-bs-theme="light"
      fixed="top"
      className="desktop-navbar-main"
    >
      <Container fluid>
        <Navbar.Brand className="desktop-navbar-brand-link">
          <Link to="/events" className="desktop-nav-link">
            <figure>
              <img
                src="../../pictures/whereto1.png"
                className="desktop-navbar-brand-img"
              />
            </figure>
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/events" className="desktop-nav-link desktop-nav-link-link">
            Events
          </Link>
          <Link to="/create" className="desktop-nav-link desktop-nav-link-link">
            Create
          </Link>
          <Link to="/myCalendar" className="desktop-nav-link desktop-nav-link-link">
            Calendar
          </Link>
        </Nav>
        <Nav className="ms-auto">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="desktop-navbar-dropdown-toggle"
              as={customToggle}
            >
              <Image
                className="desktop-navbar-profilepic"
                src={`${profile.profilePic}`}
                roundedCircle
              />
      
            </Dropdown.Toggle>

            <DropdownMenu
              align="end"
              className="desktop-navbar-dropdown-menu-left"
            >
              <Dropdown.Header className="desktop-navbar-dropdown-header">
                @{profile.username}
              </Dropdown.Header>
              <Dropdown.Item href="/profile">
                Settings
              </Dropdown.Item>
              <Dropdown.Item href="/" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </DropdownMenu>

          </Dropdown>
          {/* <Link to="/profile" className="desktop-nav-link-profile-pic"> */}
          {/* <Image
              className="desktop-navbar-profilepic"
              src={`${profile.profilePic}`}
              roundedCircle
            /> */}
          {/* </Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
