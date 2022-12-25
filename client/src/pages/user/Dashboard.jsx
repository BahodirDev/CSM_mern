import React from 'react';
import { useAuth } from '../../components/context/auth';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';
import UserMenu from '../../components/nav/UserMenu';

function Dashboard(props) {

    // hooks
    const [auth, setAuth] = useAuth()
    return (
        <>
            <Jumbotron title={auth?.user?.name} subTitle="Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className='p-3 mb-2 h4 mt-2 bg-light'>
                            User Informations

                        </div>
                        <ul className='list-group list-unstyled'>
                            <li className='list-group-item'>
                                {auth?.user?.name}
                            </li>
                            <li className='list-group-item'>
                                {auth?.user?.email}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;