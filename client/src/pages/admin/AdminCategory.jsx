import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../components/context/auth';
import AdminForm from '../../components/form/AdminForm';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';
import { Modal } from 'antd'

function AdminCategory(props) {

    // state
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [updatingName, setUpdatingName] = useState('');
    const [selected, setSelected] = useState(null);

    // hooks
    const [auth, setAuth] = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.post('/category', { name });
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success(`"${data.name}" added`);
                loadingCategories();
                setName('')
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        loadingCategories();
    }, []);

    const loadingCategories = async () => {
        let { data } = await axios.get('/categories');
        setCategories(data);
    }


    const handleUpdate = async(e)=>{
        e.preventDefault();
        try {
            let {data} =await axios.put('/category/'+selected._id,{name:updatingName});
            if(data.error){
                toast.error(data.error)
                
            }else{
                loadingCategories();
                toast.success(`"${data.name}" successfully updated`)
                setVisible(false)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(`"${updatingName}" mau alredy exist, Tey again`)
        }
    }

    const handleDelete = async(e)=>{
        e.preventDefault();
        try {
            let {data} =await axios.delete('/category/'+selected._id);
            if(data.error){
                toast.error(data.error)
                
            }else{
                loadingCategories();
                toast.success(`"${data.name}" successfully deleted`)
                setVisible(false)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(`"${updatingName}" mau alredy exist, Tey again`)
        }
    }

    return (
        <>
            <Jumbotron title={auth?.user?.name} subTitle="Admin Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className='p-3 mb-2 h4 mt-2 bg-light'>
                            Admin Informations
                        </div>
                        <div className='p-3'>
                            <AdminForm
                                value={name}
                                setValue={setName}
                                handleSubmit={handleSubmit}
                            />
                            <div className="col">
                                {
                                    categories?.length && categories?.map((e) => (
                                        <button className='btn btn-outline-primary m-3' key={e._id} onClick={() => {
                                            setVisible(true)
                                            setSelected(e)
                                            setUpdatingName(e.name)
                                        }}>{e.name}</button>
                                    ))
                                }


                                <Modal
                                    open={visible}
                                    onOk={() => setVisible(false)}
                                    onCancel={() => setVisible(false)}
                                    footer={false}
                        >
                            <AdminForm
                            textButton='Update'
                            handleSubmit={handleUpdate}
                            handleDelete={handleDelete}
                            value={updatingName}
                            setValue={setUpdatingName}
                            />
                            </Modal>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminCategory;