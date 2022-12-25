import React from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useCarts } from '../context/cart';
import Search from '../form/Search';
import useCategory from '../hooks/useCategory';
import { Badge } from 'antd'


function Menu(props) {

    // hooks
    const [auth, setAuth] = useAuth();
    const [carts, setCarts] = useCarts();

    // hooks
    const categories = useCategory();


    const navigate = useNavigate()

    function logout() {
        setAuth({
            ...auth,
            user: null,
            token: ''
        });
        localStorage.removeItem('auth')
        navigate("/login")
    }

    return (
        <>
            <ul className="nav d-flex justify-content-between shadow-sm p-2 mb-2 sticky-top bg-light">

                <li className="nav-item">
                    <NavLink className="nav-link" to="/">HOME</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/shop">SHOP</NavLink>
                </li>
                <li className="nav-item">
                    <Badge count={carts?.length} offset={[-5, 19]} showZero={true}>
                        <NavLink className="nav-link" to="/cart">
                            CARTS
                        </NavLink>
                    </Badge>
                </li>

                <li>
                    <ul className='dropdown'>
                        <li style={{listStyle:"none"}}>
                            <a className='nav-link dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false"> CATEGORIES</a>

                            <ul className='dropdown-menu'>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/categories`}>All categories</NavLink>
                                </li>
                                {
                                    categories?.map(c => (
                                            <NavLink key={c._id} className="nav-link" to={`/category/${c.slug}`}>{c.name}</NavLink>
                                    ))
                                }

                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <Search />
                </li>

                {
                    !auth?.user ? (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">REGISTER</NavLink>
                            </li>
                        </>
                    ) : (
                        <div className='dropdown'>
                            <li >
                                <a className='nav-link dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false"> {auth?.user.name}</a>
                                <ul className='dropdown-menu'>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={`dashboard/${auth.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pointer" onClick={logout}>Logout</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pointer"href='https://t.me//isbot_istar' target={'_blank'}>Contact with developer</a>
                                    </li>
                                </ul>
                            </li>
                        </div>

                    )
                }




            </ul>


        </>
    );
}

export default Menu;