import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {Routes, Route, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../../firebase-config";
import './forgot_index.css';
import LoadingSpinner from "../loading_spinner";


const Forgot_Password= () => { 
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


	const update =(event)=>
    {
    const id=event.target.id;
    const value=event.target.value;
     if(id=="email")
    setEmail(value);
    }

	const triggerResetEmail = async () => {
		setIsLoading(true);
		try {
		await sendPasswordResetEmail(auth, email);
		setIsLoading(false);	
		showToastMessage(0); 
    navigate('/'); 
			
		} catch(error) {
      setIsLoading(false);
			showToastMessage(1); 
		}        
	  }
	
	  const showToastMessage = (k) => {
        console.info("clicled");
        if(k===0)
       {
         toast.success('Email Successlly Sent !', {
          position: toast.POSITION.TOP_RIGHT
        });
       }
	   if(k===1)
       {
         toast.error('Email Not Sent !', {
          position: toast.POSITION.TOP_RIGHT
        });
       }

	}

	const renderUser=(<div class="container">
    <ToastContainer/>
    <div class="mainscreen">
      <div class="card">
        <div class="leftside">
          <img
            src="https://i.pinimg.com/564x/82/30/4a/82304a4a4bde2325b2e1822dc0eea21e.jpg"
            class="product"
            alt="Shoes"
          />
        </div>
        <div class="rightside">
          <form action="">
            <h1>Forgot Password</h1>
            <p>Email</p>
            <input type="text" class="inputbox" id="email" required value={email} onChange={update} placeholder="xxx@example.com" />
             <button  type="button" class="button-next" onClick={triggerResetEmail}>Send Email</button> 
          </form>
        </div>
      </div>
    </div>
    </div>
	);

	return (
		<div>
		{isLoading ? <LoadingSpinner/> : renderUser}
		</div>
	)
}
export default Forgot_Password;
