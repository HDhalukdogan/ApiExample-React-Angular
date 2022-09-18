import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import './Header.css';

const Header = () => {
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    return (
        <Nav className="d-flex justify-content-around align-self-center" variant="pills">
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
            {user ? 
            <>{user.email} <button className='btn btn-secondary' onClick={() => dispatch(signOut())}>Signout</button> </> : 
            <> <Nav.Item>
                <NavLink to='/login'>
                    Login
                </NavLink>
            </Nav.Item>
                <Nav.Item>
                    <NavLink to='/register'>
                        Register
                    </NavLink>
                </Nav.Item></>}
        </Nav>
    );
}

export default Header;