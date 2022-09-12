import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/context";
import { Alert } from "./Alert";
import { useDispatch } from "react-redux";
import "../../views/LoginView/loginView.css";
import { app } from "../../Firebase/firebase-config";
import {  doc, getDoc,getFirestore } from "firebase/firestore";
import { deleteUser } from "firebase/auth";



export function Login() {

  useEffect(() => {
    if (!localStorage.getItem("Presupuesto")) {localStorage.setItem("Presupuesto", "[]")}
  });

  const [user, setUser] = useState({
    mail: "",
    password: "",
    rol: "",
  });


  const firestore = getFirestore(app);
  const { login, loginWithGoogle, resetPassword} = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
    let r=  await login(user.mail, user.password)
    let r_uid = await r.user.uid;
    let rol =  await getRol(r_uid);

    
      if (user.mail === "productowner@henry.com" || rol ==='admin') {
        navigate("/admin");
      } else {
        
        let storage=JSON.parse(localStorage.getItem("myCartNotLoggedin"));
        console.log("STORAGE VACIO LOGIN:"+storage)


        
        if (!localStorage.getItem("Presupuesto")) {        
          localStorage.setItem("Presupuesto", "[]");
        }
        navigate("/");
      }
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        setError("Usuario o contraseña incorrectos");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    setUser({ ...user, [name]: value });
  };


    const getRol= async(uid) => {
      // obtener rol
      const docuRef = doc(firestore, `usuarios/${uid}`);
      const docuCifrada = await getDoc(docuRef);
      if(docuCifrada.data()){const infoFinal = docuCifrada.data().rol;
      return infoFinal;}
      else{return 4}
    }
  const handleGoogleSignin = async () => {
    try {
    let r=  await loginWithGoogle()
    let rol = await getRol(r.user.uid);
   if( typeof rol ==='number'){deleteUser(r.user);
    alert("No estas Registrad@,No esperes mas!")}
    else{  if (rol==='client') navigate('/')
    else{navigate('/admin')}}
    } catch (error) {
      setError(error.message);
      console.log(error)
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.mail)
      return setError("Escribe tu mail para resetear tu contrsaeña");
    try {
      await resetPassword(user.mail);
      setError("Te enviamos un mail para recuperar tu contraseña");
    } catch (error) {
      setError(error.message);
    }
  };
    


  return (

    <div className="container w-75 bg-white mt-5 rounded">
      <div className="row align-items-stretch ">
        <div className="col  d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">
          <img class="imgLogin" src="https://mercadoyempresas.com/web/fotos/Perforadora-1-2.jpg" alt="foto" />
          <div className="py-5"></div>
          <div className="text-center">
          </div>
        </div>
        <div className="col bg-white p-5 rounded-end">

          <h2 className="fw-bold text-center py-5">Bienvenido</h2>
          {/*/ Login */}
          {error && <Alert message={error} />}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="mail"
                className="form-label block text-gray-700 text-sm font-bold mb-2"
              >
                Correo Electronico
              </label>
              <input
                type="mail"
                name="mail"
                id="mail"
                onChange={handleChange}
                className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="youremail@company.tld"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="form-label block text-gray-700 text-sm font-bold mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="*************"
              />
            </div>
            <div className="d-grid">
              <button 
                className="btn btn-primary hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Iniciar sesión
              </button>     
               </div>
                
             </form> 
        </div>
      </div>
    </div>
   
   );
}


