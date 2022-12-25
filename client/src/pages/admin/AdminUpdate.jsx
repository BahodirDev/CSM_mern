import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../components/context/auth';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
const { Option } = Select;

function AdminProductUpdate(props) {

    const navigate = useNavigate()

    // params
    const { slug } = useParams()

    // state
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [shipping, setShipping] = useState('')
    const [quantity, setQuantity] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        loadingCategories();
    }, [])

    useEffect(() => {
        loadingUpdate()
    }, [])
    // loading
    const loadingCategories = async () => {
        let { data } = await axios.get('/categories');
        setCategories(data);
    }

    const handleDelete = async () => {
        let answer = window.confirm('Are you sure to delete')
        if(!answer) return;
        let { data } = await axios.delete('/product/'+id);
        if(data.error){
            toast.error(data.error)
        }else{
            navigate('/dashboard/admin/products')
        }
    }
    const loadingUpdate = async () => {
        let { data } = await axios.get(`/product/${slug}`);
        if (data.error) {
            toast.error(data.error)
        } else {
            setName(data.name);
            setCategory(data.category._id);
            setDescription(data.description);
            setPrice(data.price);
            setShipping(data.shipping);
            setQuantity(data.quantity);
            setId(data._id)
        }

    }

    // function
    const handleSubmit = async () => {
       
        try {
            const productData = new FormData();
             photo && productData.append("photo", photo);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("shipping", shipping);
            productData.append("name", name);
            productData.append("quantity", quantity);
            productData.append("description", description);
            let { data } = await axios.put('/product/'+id, productData);
            if (data.error) {
                toast.error(data.error)
            } else {
                navigate('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error);
        }
    }

    // hooks
    const [auth, setAuth] = useAuth();
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
                        {
                            photo ? <div className='text-center' >
                                <img src={URL.createObjectURL(photo)} alt="Image" className='img img-responsive ' height='200px' />
                            </div>
                                :
                                <div className='text-center' >
                                    <img src={`${process.env.REACT_APP_API}/product/photo/${id}`} alt="product image" className='img img-responsive ' height='200px' />

                                </div>

                        }
                        <div className="col-12 p-3">
                            <label className='btn btn-outline-secondary mt-2 col-12'>
                                {photo ? photo.name : 'Upload photo'}
                                <input
                                    type="file"
                                    name='photo'
                                    accept='image/*'
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden={true}
                                />
                            </label>
                        </div>

                        <div className='p-3 col-12'>
                            <Select className='form-select' bordered={false} size="large" value={category.name} placeholder="Choose Category" onChange={(value) => setCategory(value)}>
                                {
                                    categories?.map((e) => <Option key={e._id} value={e._id} >{e.name}</Option>)
                                }
                            </Select>
                            <Select className='form-select mt-2' bordered={false} size="large" value={shipping ? "Yes" : "No"} placeholder="Choose Shipping" onChange={(value) => setShipping(value)}>
                                <Option value='1' >Yes</Option>
                                <Option value='0' >No</Option>
                            </Select>
                            <input type="text" className='p-3 mt-2 form-control' placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)} />

                            <textarea className='form-control mt-2' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                            <input type="number" className='p-3 mt-2 form-control' placeholder='Enter product price' value={price} onChange={(e) => setPrice(e.target.value)} />

                            <input type="number" className='p-3 mt-2 form-control' min='1' placeholder='Enter product  quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                         <div className="d-flex justify-content-between">
                         <button className='btn btn-primary' onClick={handleSubmit}> Update</button>
                         <button className='btn btn-danger' onClick={handleDelete}> Delete</button>
                         </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminProductUpdate;