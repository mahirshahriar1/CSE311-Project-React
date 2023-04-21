import React from 'react'
import Navbar from '../Components/Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function CheckOrder() {
    const CartID = window.location.href.split('/').reverse()[0]
    //console.log(CartID);

    const [customer, setCustomer] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);

    Axios.defaults.withCredentials = true;


    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        const getCartProducts = () => {
            Axios.post('http://localhost:3001/getCartProducts', { CartID: CartID }).then((response) => {
                //console.log(response.data);
                setCartProducts(response.data);
                //console.log(response.data);
            }
            );
        };

        getCartProducts();

        Axios.get('http://localhost:3001/login').then((response) => {
            //console.log(response.data.user[0].ID)
            if (response.data.type === 'Customer') {

                Axios.post('http://localhost:3001/isThisCustomersCart', {
                    CartID: CartID, CustomerID: response.data.user[0].ID
                }).then((response) => {
                    if (response.data) {
                        setCustomer(true);
                    }
                }
                );

            } else if (response.data.type === 'Admin') {
                setAdmin(true);
            }
        }
        )

    }, [customer, CartID])

    function getTotalPrice(price, quantity) {
        return price * quantity;
    }

    const order = (status) => {

        Axios.post('http://localhost:3001/orderAction', {
            CartID: CartID, Status: status
        }).then((response) => {
            if (response.data) {
                alert('Order has been ' + status);
                window.location.href = '/orderList';
            }
        }
        );
    }



    return (
        (customer || admin) && <div>
            <Navbar />
            <div className="container" style={{ marginLeft: "270px" }}>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-image">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartProducts.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="w-25">
                                            <img src={`http://localhost:3001/uploads/${item.Image}`} className="img-fluid img-thumbnail" alt={item.Name} />
                                        </td>
                                        <td>{item.Name}</td>
                                        <td>{item.Price}</td>
                                        <td>{item.TotalQuantity}</td>
                                        <td>{getTotalPrice(item.Price, item.TotalQuantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ paddingBottom: '80px', paddingTop: '30px' }}>
                    <Button style={{ marginLeft: '560px', height: '50px', width: '200px' }} className='btn btn-success'
                        onClick={() => {

                            order('Confirmed');
                        }
                        }
                    > Confirm this Order</Button>
                    <Button style={{ marginLeft: '560px', height: '50px', marginTop: '25px', width: '200px' }} className='btn btn-danger'
                        onClick={() => {
                                
                                order('Cancelled');

                        }
                        }
                    > Cancel this Order  </Button>
                </div>
            </div>
        </div>
    )
}
