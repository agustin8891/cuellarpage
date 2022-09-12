import React from 'react'
import { Link } from 'react-router-dom'
import {  useNavigate } from "react-router-dom";
import './navbar.css'
import { useSelector } from 'react-redux';
import { useAuth } from "../../context/context";
import { getAuth } from "firebase/auth";
import SearchBar from "../SearchBar/SearchBar";
import swal from 'sweetalert';


function Navbar({userlog}) {
  const navigate = useNavigate();
const cart = useSelector((state) => state.rootReducer.cart);



  const auth = getAuth();
  const user = auth.currentUser;

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      swal({
        title: "Cerraste sesion",
        icon: "success",
      })

      navigate("/login")
    } catch (error) {
      console.error(error.message);
    }
  };


  if(!user) {
    if(user?.email===undefined) {
      navigate("/login")
    }
  } 


  return (

<nav class="navbar navbar-expand-lg ">
  <div class="container-fluid">

        <Link to="/">
        <button class="logoToHome">CUELLAR PERFORACIONES</button>
        </Link>
        <div class="searchBuscar">
        <SearchBar/>
        </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <span class="navbar-text">


      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item  paq-btn">
          <Link to="/importar" className='btn-sm '>
          <a class="nav-link" href="#">Importar Productos</a>
          </Link>
        </li>

      <li class="nav-item  paq-btn">
          <Link to="/pdf" className='btn-sm '>
          <a class="nav-link" href="#">Crear Archivo PDF</a>
          </Link>
        </li>
        <li class="nav-item">
        {userlog? <div class="userlog-container">

            <p className='nombreperf'>{userlog.nombre +" "+ userlog.apellido}</p>

            <div className='btn-sm1'>
            <a class="nav-link " href="#" onClick={handleLogout}>Cerrar Sesion</a>
            {/* <Link to='/user'>Perfil</Link> */}
            </div>
          </div>: <Link to="/login" className='btn-sm'>
          <a class="nav-link " href="#">Iniciar Sesion</a>
          </Link>}

        </li>
        </ul>
      </span>
    </div>
  </div>
</nav>
  )
}

export default Navbar