import { useState } from "react";

import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../../context/AuthContext";

export default function Layout(props){
    const {children} = props;
    const [showModal,setShowModal]=useState(false);
    const {globalUser,logout}=useAuth()
    const header = (
        <header>
            <div>
                <h1 className="text-gradient">KaffeeMeter</h1>
                <p>For Coffee Insatiates</p>
            </div>
             
             { globalUser ?(  <button  onClick={logout}>
                    <p>Logout</p>
                    <i className="fa-solid fa-mug-hot"></i>
                </button>):(  <button  onClick={()=>{setShowModal(true)}}>
                    <p>Sign up free</p>
                    <i className="fa-solid fa-mug-hot"></i>
                </button>)}
            
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">KaffeeMeter</span> was made by <span className="text-gradient">Devanshu Prakash</span></p> <br />
            </footer>
    )
  function handleCloseModal() {
        setShowModal(false)
    }
  return (
    <>
    {showModal&&(<Modal handleCloseModal={handleCloseModal}>
        <Authentication handleCloseModal={handleCloseModal}/>
    </Modal>)}
      {header}
      <main>
        {children}
      </main>
      {footer}
    </>
  ) 
}