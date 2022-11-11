import React, { useState, useEffect } from "react";
import './profile_index.css';
import { auth } from "../../firebase-config";
import {signOut} from "firebase/auth";
import {Routes, Route, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth
} from "firebase/auth";
import LoadingSpinner from "../loading_spinner";


const Profile= () => { 
    const [email, setEmail] = useState("");
    const [fullname,setFullname]=useState("");
    const [address,setAddress]=useState("");
    const [stateValue,setStateValue]=useState(true);
    const [mobilenumber,setMobilenumber]=useState("1");
    const navigate = useNavigate();
    const [uid,setUid]=useState("");
    
    useEffect(() => {
       const auth = getAuth();
       if(auth.currentUser!=null){
        console.info(auth);
       setUid(auth.currentUser.uid);
       if(uid!=="")
       getFromDatabase(); 
       }
       else
       navigate('/'); 
    }, [uid]);

    const update =(event)=>
    {
    const id=event.target.id;
    const value=event.target.value;
    if(id=="fullname")
    setFullname(value);
    else if(id=="email")
    setEmail(value);
    else if(id=="mobilenumber")
    setMobilenumber(event.target.value.replace(/\D/,''));
    else if(id=="address")
    setAddress(value) 
    }

const changeReadable =(k) => {
  document.getElementById("fullname").readOnly=k
  document.getElementById("mobilenumber").readOnly=k
  document.getElementById("address").readOnly=k 
  if(k==false)
  document.getElementById("fullname").focus();
    };

  
 const handleClick=()=>{

  if(stateValue===true){ 
    showToastMessage (2) 
    changeReadable(false);
   setStateValue(false) 
  }
  else{ 
    showToastMessage (3)
    sendToDatabase();   
   changeReadable(true);
   setStateValue(true);
  }
 } 
 
 const showToastMessage = (k) => {
  console.info("clicled");
  if(k===0)
 {
   toast.success('Successlly LoggedOut  !', {
    position: toast.POSITION.TOP_RIGHT
  });
 }
 if(k===1)
 {
   toast.success('Successlly LoggedIn  !', {
    position: toast.POSITION.TOP_RIGHT
  });
 }
 if(k===2)
 {
   toast.warn('Edit Mode Activated  !', {
    position: toast.POSITION.TOP_RIGHT
  });
 }
 if(k===3)
 {
   toast.success('Profile Saved !', {
    position: toast.POSITION.TOP_RIGHT
  });
 }

}

 const logout = async () => {
  await signOut(auth);
  showToastMessage (0) 
  navigate('/');
};

const getFromDatabase=async()=>{
   fetch(`https://information-a0f23-default-rtdb.firebaseio.com/Users/${uid}.json`)
  .then(results => results.json())
  .then(data => {
     setAddress(data.address);
     setEmail(data.email);
     setMobilenumber(data.mobilenumber);
     setFullname(data.fullname); 
     console.info(data);
  })
}

const sendToDatabase=async()=>{

  await fetch(`https://information-a0f23-default-rtdb.firebaseio.com/Users/${uid}.json`, {
    method: 'PUT',
    body: JSON.stringify({
     email,
     fullname,
     address,
     mobilenumber
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
}).catch((err) => {
        console.log(err.message);
    });
}
const renderUser =(
<div class="container">
    <ToastContainer/>
    <div class="mainscreen">
      <div class="card">
        <div class="leftside">
          <img
            src="https://i.pinimg.com/564x/06/8d/3a/068d3a2ed434c895415965c887946333.jpg"
            class="product"
            alt="Shoes"
          />
        </div>
        <div class="rightside">
          <form action="">
            <h1>Profile</h1>
            <h2>Personal Information</h2>
            <p>Email</p>
            <input readOnly={true}  type="text" class="inputbox" id="email" required value={email} onChange={update}/>
            <p>Fullname</p>
            <input  readOnly={true} type="text" class="inputbox" id="fullname" required value={fullname} onChange={update}/>
            <p>Mobile Number</p>
            <input  readOnly={true} type="text" class="inputbox" id="mobilenumber" required value={mobilenumber} onChange={update}/>
             <p>Address</p>
             <input readOnly={true} type="text" class="inputbox" id="address" required value={address} onChange={update}/>
             <div class="buttons">   
             <button  type="button" class="button" onClick={logout}  >Logout</button> 
            <button  type="button" class="button" onClick={handleClick} >{stateValue ? "Edit" : "Save"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
);

return(
  <div>
 {uid===""? <LoadingSpinner/> : renderUser}  </div> 
);
}

export default Profile;
