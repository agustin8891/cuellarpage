import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/HomeView';


import Importar from './views/Importar';
import { Login } from './components/Login/Login'
import LimpiarBd from './components/LimpiarBd/LimpiarBd';
import { AuthProvider } from "./context/context";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from './Firebase/firebase-config';
import { ChakraProvider } from '@chakra-ui/react'
import { firestore } from "./context/context"
import Pdf from './components/Pdf/Pdf'



function App() {
  const [userlog, setUser] = React.useState(null);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    if (docuCifrada.data()) {
      const infoFinal = docuCifrada.data().rol;
      const infoFinal2 = docuCifrada.data().nombre;
      const infoFinal3 = docuCifrada.data().apellido;
      const infoFinal4 = docuCifrada.data().mail;
      return [infoFinal, infoFinal2, infoFinal3, infoFinal4];
    }
    else { return 4 }
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      if (typeof rol !== 'number') {
        const userData = {
          uid: usuarioFirebase.uid,
          email: usuarioFirebase.email,
          rol: rol[0],
          nombre: rol[1],
          apellido: rol[2],
          mail: rol[3]
        };
        setUser(userData);
        console.log("userData fianl", userData);
      } else { return 8 }
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final

      if (!userlog) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return (
    <div className="App">
      <ChakraProvider>
       <AuthProvider>
    <Routes>
      <Route path="/" element={<Home userlog={userlog}/>} />
      <Route path="/importar" element={<Importar userlog={userlog}/>} />
       <Route path ="/login" element ={<Login/>}/>
       <Route path ="/limpiarbd" element ={<LimpiarBd/>}/>
       <Route path ="/pdf" element ={<Pdf userlog={userlog}/>}/>
    </Routes>
    </AuthProvider>
    </ChakraProvider>
    </div>
  );
}
export default App
