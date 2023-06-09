import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
// import { Button } from 'react-bootstrap';


export default function Navbar() {

  var link = window.location.href.split('/').reverse()[0]
  var link2 = window.location.href.split('/').reverse()[1]
  if (link === '') {
    link = 'main';
  }


  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  Axios.defaults.withCredentials = true;

  useEffect(() => {

    Axios.get('http://localhost:3001/login').then((response) => {
      // console.log(response.data.loggedIn);
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
        if (response.data.user[0].Name)
          setUsername(response.data.user[0].Name);
        else
          setUsername('Admin');
      }
    });

  }, []);

  const logout = () => {
    Axios.get('http://localhost:3001/logout').then((response) => {
      alert(response.data);
    });

    localStorage.removeItem("token");
  };

  const [search, setSearch] = useState("");
  const Search = () => {
    if (search === '') {
      alert('Please enter something to search');
      return;
    }

    if (link === 'clothes' || link2 === 'clothes') {
      window.location.href = `/search/clothes/${search}`
    } else if (link === 'cosmetics' || link2 === 'cosmetics') {
      window.location.href = `/search/cosmetics/${search}`
    } else if (link === 'electronics' || link2 === 'electronics') {
      window.location.href = `/search/electronics/${search}`
    } else if (link === 'books' || link2 === 'books') {
      window.location.href = `/search/books/${search}`
    } else if (link === 'yourshop' || link2 === 'yourshop') {
      window.location.href = `/search/yourshop/${search}`
    }
    else {
      window.location.href = `/search/main/${search}`
    }

  }




  return (

    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark ">
          <div className="container-fluid">
            <a style={{ color: 'white', backgroundColor: 'transparent' }}
              className="navbar-brand nav-link disabled" href="/">ShopEZ</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" href="/">Home</a>
                </li>
                <li className="nav-item">

                  <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">Clothes</a>
                  <ul style={{ marginLeft: '200px' }} className="dropdown-menu">
                    <li><a className="dropdown-item" href='/category/clothes/Male'>Male</a></li>
                    <li><a className="dropdown-item" href="/category/clothes/Female">Female</a></li>
                    <li><a className="dropdown-item" href="/category/clothes/Children">Children</a></li>
              
                    <li><hr className="dropdown-divider" /></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">Cosmetics</a>
                  <ul style={{ marginLeft: '300px' }} className="dropdown-menu">
                    <li><a className="dropdown-item" href='/category/cosmetics/SkinCare'>Skin Care</a></li>
                    <li><a className="dropdown-item" href="/category/cosmetics/HairCare">Hair Care</a></li>
                    <li><a className="dropdown-item" href="/category/cosmetics/Fragrance">Fragrance</a></li>
                    <li><a className="dropdown-item" href="/category/cosmetics/Makeup">Makeup</a></li>
                    <li><a className="dropdown-item" href="/category/cosmetics/Men">Men's Care</a></li>
                    <li><hr className="dropdown-divider" /></li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">Electronics</a>
                  <ul style={{ marginLeft: '400px' }} className="dropdown-menu">
                    <li><a className="dropdown-item" href='/category/electronics/PC'>PC</a></li>
                    <li><a className="dropdown-item" href="/category/electronics/Laptop">Laptop</a></li>
                    <li><a className="dropdown-item" href="/category/electronics/Phone">Phone</a></li>
                    <li><a className="dropdown-item" href="/category/electronics/Office-Equipments">Office-Equipments</a></li>
                    <li><a className="dropdown-item" href="/category/electronics/Others">Others</a></li>
                    <li><hr className="dropdown-divider" /></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">Books</a>
                  <ul style={{ marginLeft: '500px' }} className="dropdown-menu">
                    <li><a className="dropdown-item" href='/category/books/Non-Fiction'>Non-Fiction</a></li>
                    <li><a className="dropdown-item" href="/category/books/Horror">Horror</a></li>
                    <li><a className="dropdown-item" href="/category/books/Romantic">Romantic</a></li>
                    <li><a className="dropdown-item" href="/category/books/Fantasy">Fantasy</a></li>
                    <li><a className="dropdown-item" href="/category/books/Children">Children</a></li>
                    <li><hr className="dropdown-divider" /></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">Furnitures</a>
                  <ul style={{ marginLeft: '600px' }} className="dropdown-menu">
                    <li><a className="dropdown-item" href='/category/furnitures/Office'>Office Furnitures</a></li>
                    <li><a className="dropdown-item" href="/category/furnitures/Home">Home Furnitures</a></li>
                    <li><a className="dropdown-item" href="/category/furnitures/Outdoor">Outdoor Furnitures</a></li>         
                    <li><hr className="dropdown-divider" /></li>
                  </ul>
                </li>
                {!loginStatus && (

                  <li style={{ marginLeft: '130px', color: 'white', backgroundColor: 'transparent' }}
                    className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Login
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="/CustomerLogin">Customer</a></li>
                      <li><a className="dropdown-item" href="/AdminLogin">Admin</a></li>
                      <li><a className="dropdown-item" href="/SellerLogin">Seller</a></li>
                      <li><a className="dropdown-item" href="/WarehouseLogin">Warehouse</a></li>
                      <li><hr className="dropdown-divider" /></li>
                    </ul>
                  </li>
                )}



                {loginStatus && (
                  <li
                    style={{ marginLeft: '40px', color: 'white', backgroundColor: 'transparent' }}
                    className="nav-item">
                    <a style={{ color: '#ffeb00', backgroundColor: 'transparent',fontFamily:'monospace',fontSize:'20px' }} 
                      className="nav-link disabled" aria-current="page" href="/"> {username}</a>
                  </li>
                )}
                {loginStatus && (
                  <li className="nav-item">
                    <a onClick={logout} className="nav-link active" aria-current="page" href="/">Logout</a>
                  </li>
                )}
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                  onChange={(event) => setSearch(event.target.value)} />
                <button type="button" className="btn btn-outline-success" onClick={Search}>Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>

  )
}

