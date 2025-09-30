import { useState } from "react";

import Authentication from "./Authentication";
import Modal from "./Modal";

export default function Layout(props){
    const {children} = props;
    const [showModal,setshowModal]=useState(false);
    const header = (
        <header>
            <div>
                <h1 className="text-gradient">KaffeeMeter</h1>
                <p>For Coffee Insatiates</p>
            </div>
                <button>
                    <p>Logout</p>
                </button>
         
                <button  onClick={()=>{setshowModal(true)}}>
                    <p>Sign up free</p>
                    <i className="fa-solid fa-mug-hot"></i>
                </button>
            
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">KaffeeMeter</span> was made by <span className="text-gradient">Devanshu Prakash</span></p> <br />
            </footer>
    )

  return (
    <>
    {showModal&&(<Modal handleClsoeModal={()=>{setshowModal(false)}}>
        <Authentication/>
    </Modal>)}
      {header}
      <main>
        {children}
      </main>
      {footer}
    </>
  ) 
}