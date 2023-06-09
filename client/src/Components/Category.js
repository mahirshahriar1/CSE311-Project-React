import React from 'react'
import Item from './Item'
import Navbar from './Navbar'
import Axios from 'axios';
import { useState, useEffect, useRef } from 'react';

export default function Category() {
    const category = window.location.href.split('/').reverse()[1]
    const subcategory = window.location.href.split('/').reverse()[0]

    // console.log(category);
    //console.log(subcategory);

    const [seller, setSeller] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [customerID, setCustomerID] = useState(0);
    const [cartID, setCartID] = useState(0);

    const [bool, setBool] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [productList, setProductList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);


    const getProducts = () => {
        if (category === 'books') {
            Axios.get('http://localhost:3001/importBooks', { params: { category: category, subcategory: subcategory } }).then((response) => {
                setAllProducts(response.data);
                setProductList(response.data.slice(0, 6));
                //console.log(response.data);
            });

        } else if (category === 'electronics') {
            Axios.get('http://localhost:3001/importElectronics', { params: { category: category, subcategory: subcategory } }).then((response) => {
                setAllProducts(response.data);
                setProductList(response.data.slice(0, 6));
                //console.log(response.data);
            });
        } else if (category === 'cosmetics') {
            Axios.get('http://localhost:3001/importCosmetics', { params: { category: category, subcategory: subcategory } }).then((response) => {
                setAllProducts(response.data);
                setProductList(response.data.slice(0, 6));
                //console.log(response.data);
            });
        } else if (category === 'clothes') {
            Axios.get('http://localhost:3001/importClothes', { params: { category: category, subcategory: subcategory } }).then((response) => {
                setAllProducts(response.data);
                setProductList(response.data.slice(0, 6));
                //console.log(response.data);
            });
        } else if (category === 'furnitures') {
            Axios.get('http://localhost:3001/importFurnitures', { params: { category: category, subcategory: subcategory } }).then((response) => {
                setAllProducts(response.data);
                setProductList(response.data.slice(0, 6));
                //console.log(response.data);
            });
        }
        else {


            Axios.get('http://localhost:3001/importCategoricalProducts', { params: { category: category, subcategory: subcategory } }).then((response) => {
                setAllProducts(response.data);
                setProductList(response.data.slice(0, 6));
                //console.log(response.data);
            });
        }
    };
    console.log(allProducts);
    const getMoreProducts = () => {
        const numFetchedProducts = productList.length;
        const remainingProducts = allProducts.length - numFetchedProducts;
        //console.log(remainingProducts);
        if (remainingProducts === 0) {
            setIsComplete(true);
            setIsLoading(false);
            return;
        }

        setTimeout(() => {

            setProductList((prevProductList) =>

                prevProductList.concat(allProducts.slice(prevProductList.length, prevProductList.length + 6))
            );
            setIsLoading(false);

        }
            , 500);

    };
    const sort = (text) => {
        //  console.log(text);


        Axios.get(`http://localhost:3001/sortCategories/${category}/${text}/ASC`).then((response) => {
            //clear product list
            setProductList([])
            setAllProducts(response.data);
            setProductList(response.data.slice(0, 6));
            setIsComplete(false);
        });


    }

    const [showMenu, setShowMenu] = useState(false);
    const containerRef = useRef(null);


    useEffect(() => {
        if (bool === false) {
            getProducts();
            setBool(true);

            Axios.get('http://localhost:3001/login').then((response) => {
                if (response.data.type === 'Seller') {
                    setSeller(true);
                } else if (response.data.type === 'Customer') {
                    setCustomerID(response.data.user[0].ID)
                    setCustomer(true);

                    Axios.get('http://localhost:3001/getCartID', { params: { id: response.data.user[0].ID } }).then((response) => {
                        setCartID(response.data[0].ID);
                    })
                } else if (response.data.type === 'Admin') {
                    setAdmin(true);
                }
            });
        }

        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.offsetHeight &&
                !isLoading && !isComplete
            ) {
                setIsLoading(true);
                getMoreProducts();
            }
        };

        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, isLoading, productList, containerRef, showMenu]);





    return (
        <div>
            <Navbar />

            <div className="container">

                <div className="row">
                    {productList.map((element) => {

                        return <div className="col-md-4" key={element.ID} style={{ display: 'flex', justifyContent: 'center' }} >
                            <Item name={element.Name} description={element.Price}
                                imglink={element.Image} id={element.ID} product={true} admin={admin} customer={customer} seller={seller} customerID={customerID}
                                cartID={cartID} prodQuantity={element.Quantity} home={true}
                                price={element.Price} productID={element.ProductID}
                            /> 
                        </div>
                    })}

                </div>
            </div>
            {isLoading && (
                <div style={{ marginTop: '50px', height: '200px', display: "flex", justifyContent: "center" }}>
                    <div style={{ height: '60px', width: '60px' }} className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {customer && <button className='cart-button fa-solid fa-cart-shopping'
                onClick={() => {
                    //send cartid to /cart

                    window.location.href = `http://localhost:3000/cart/`

                }
                }

            > </button>}
            <button className='back-to-top fa-solid fa-arrow-up' onClick={() => { window.scrollTo(0, 0); }}></button>

            <div className="show-more-options-container" ref={containerRef}>
                <button className="show-more-options" onClick={() => setShowMenu(!showMenu)}>
                    Sort
                </button>
                {showMenu && (
                    <div className="show-more-options-menu">
                        <button
                            onClick={() => {
                                sort('Name');
                                setShowMenu(false);
                            }}
                        >Name</button>
                        <button
                            onClick={() => {
                                sort('Price');
                                setShowMenu(false);
                            }}

                        >Price</button>
                        <button
                            onClick={() => {
                                sort('Quantity');
                                setShowMenu(false);
                            }}
                        >Quantity</button>
                        <button
                            onClick={() => {
                                sort('ID');
                                setShowMenu(false);
                            }}
                        >Date Added</button>
                    </div>
                )}
            </div>

        </div>
    )
}
