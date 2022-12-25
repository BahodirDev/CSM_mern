import React from 'react';
import { NavLink } from 'react-router-dom';


function AdminMenu(props) {
    return (
        <>
            <div className='p-3 mb-2 h4 mt-2 bg-light'>
                Admin Links
            </div>
            <ul className='list-group list-unstyled'>
                <li>
                    <NavLink className='list-group-item' to={'/dashboard/admin/category'}>
                        Create Category
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-group-item' to={'/dashboard/admin/product'} >
                        Create Product
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-group-item' to={'/dashboard/admin/products'} >
                     Products
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-group-item' to={'/dashboard/admin/orders'} >
                     All Orders
                    </NavLink>
                </li>

            </ul>
        </>
    );
}

export default AdminMenu;