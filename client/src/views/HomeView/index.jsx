import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./homeView.css";
import HomeBody from "../../components/HomeBody";


function HomeView({userlog}) {
  
  return (<>
    <div>
      <Navbar userlog={userlog} />
    </div>
    <div>
      <HomeBody />
    </div>
    <div className="footerDiv">
      <Footer />
    </div>
  </>

  );
}

export default HomeView;
