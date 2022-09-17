import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <Nav variant="pills" activeKey="1">
            <Nav.Item>
                <NavLink to='/'>
                    Home
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to='/create'>
                    Create
                </NavLink>
            </Nav.Item>
            <NavDropdown title="Dropdown" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">
                    <NavLink to='/login'>
                        Login
                    </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">
                    <NavLink to='/register'>
                        Register
                    </NavLink>
                </NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
}

export default Header;