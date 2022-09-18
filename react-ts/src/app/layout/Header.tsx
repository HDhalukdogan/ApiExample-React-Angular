import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const Header = () => {
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    return (
        <Nav  className="d-flex justify-content-between" variant="pills" activeKey="1">
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
           {user ? <>{user.email} <button onClick={()=> dispatch(signOut())}>Signout</button> </>:<> <Nav.Item>
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