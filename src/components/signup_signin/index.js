import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {Routes, Route, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth
} from "firebase/auth";
import { auth } from "../../firebase-config";
import './index.css';
import LoadingSpinner from "../loading_spinner";

const Signup_Signin= () => { 
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmpassword]=useState("");
    const [fullname,setFullname]=useState("");
    const [address,setAddress]=useState("");
    const [mobilenumber,setMobilenumber]=useState("");
    const [singin,setSingin]=useState(true);
    const [singup,setSingup]=useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);



useEffect(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    setUser(currentUser);
  const uid = user.uid;
  navigate('/profile');
} });

}, []);
     

const sendToDatabase=async(uid)=>{

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
}
).catch((err) => {
        console.log(err.message);
    });
    setIsLoading(false);
    navigate('/'); 
}



    const updateCheck =(event)=>
    {
     const check= event.target.checked
     const id= event.target.id
     if(id=="tab-1")
     {
      setSingin(check);
      if(check==true)
      setSingup(false);
      else
      setSingup(true);
     }
     else{
        setSingup(check);
        if(check==true)
        setSingin(false);
        else
        setSingin(true);  
     }
    }


    const update =(event)=>
    {
    const id=event.target.id;
    const value=event.target.value;
    if(id=="fullname")
    setFullname(value);
    else if(id=="password")
    setPassword(value);
    else if(id=="confirmpassword")
    setConfirmpassword(value);
    else if(id=="email")
    setEmail(value);
    else if(id=="mobilenumber")
    setMobilenumber(event.target.value.replace(/\D/,''));
    else if(id=="address")
    setAddress(value) 
    }

    const showToastMessage = (k) => {
        console.info("clicled");
        if(k===0)
       {
         toast.success('Successlly LoggedIn  !', {
          position: toast.POSITION.TOP_RIGHT
        });
       }
        if(k===1)
        {
            toast.error('Fill all the fields !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        if(k===2)
        {
            toast.error('Password should be minimum 8 characters !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        if(k===3)
        {
            toast.error('Use a valid email address !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        if(k===4)
        {
            toast.error('Password not equal to Repeat Password !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        if(k===5)
        {
            toast.error('Mobile Number should be 10 digit !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        if(k===6)
        {
            toast.error('Email is already in use !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        if(k===7)
        {
            toast.error('Email or Password wrong !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        if(k===8)
        {
            toast.error('Email not found !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        if(k===9)
        {
            toast.error('Too many wrong attempts, Try after some time !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        if(k===10)
        {
            toast.error('Something Went wrong !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        

    };

    const validateEmail = (text) => {
        return String(text)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const submiting =()=>
    {
        let confirm=true;

      if(email===""||password===""||mobilenumber===""||address===""||confirmpassword===""||fullname==="")
         {
            confirm=false;
            showToastMessage(1);         
         }
      if(password.length<8)
      {
         confirm=false;
         showToastMessage(2);
      }
      if(!validateEmail(email)){
        confirm=false;
         showToastMessage(3);
      }
      if(password!=confirmpassword){
        confirm=false;
         showToastMessage(4);
      }
      if(mobilenumber.length<10){
        confirm=false;
         showToastMessage(5);
      }
      if(confirm==true)
      {
        register();

      }
        
    }    

   
    const loggingIn =(event)=>
    {
        let confirm=true;

        if(email===""||password==="")
           {
              confirm=false;
              showToastMessage(1);         
           }
        if(password.length<8)
        {
           confirm=false;
           showToastMessage(2);
        }
        if(!validateEmail(email)){
          confirm=false;
           showToastMessage(3);
        }
        if(confirm==true){
          login();
        }
            
    }

    
  
    const register = async () => {
      setIsLoading(true);
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(user);
        const uid =user.user.uid;
        sendToDatabase(uid);               
      } catch (error) {
        if(error.message==="Firebase: Error (auth/email-already-in-use).")
       { setIsLoading(false);
        showToastMessage(6);
       }
       else{
        setIsLoading(false);
        showToastMessage(10);
       }

      }
    };
  
    const login = async () => {
      setIsLoading(true);
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setIsLoading(false);

      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
        if(error.message==='Firebase: Error (auth/wrong-password).')
        showToastMessage(7);
         else if(error.message==='Firebase: Error (auth/user-not-found).')
         showToastMessage(8);
         else if(error.message==='Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).')
         showToastMessage(9);
      }
    };


   const sendToForgotPassword =()=>{
    navigate('/forgotpassword');
   }

  const renderUser =(
<div class="login-wrap">
  <ToastContainer/>
<div class="login-html">
  <input id="tab-1" type="radio" name="tab" class="sign-in" checked={singin} onChange={updateCheck}/><label htmlFor="tab-1" class="tab">Sign In</label>
  <input id="tab-2" type="radio" name="tab" class="sign-up" checked={singup} onChange={updateCheck}/><label htmlFor="tab-2" class="tab">Sign Up</label>
  <div class="login-form">

   {/* SIGN_IN */}

    <div class="sign-in-htm">
      <div class="group">
        <label for="user" class="label">Email</label>
        <input id="email" type="text" class="input" value={email} onChange={update} placeholder="xxx@example.com" />
      </div>
      <div class="group">
        <label for="pass" class="label">Password</label>
        <input id="password" type="password" class="input" data-type="password"  value={password} onChange={update} placeholder="Minimum 8 letters" />
      </div>
      <div class="group">
        <input id="check" type="checkbox" class="check" checked/>
        <label for="check"><span class="icon"></span> Keep me Signed in</label>
      </div>
      <div class="group">
        <input type="submit" class="button" value="Sign In" onClick={loggingIn}/>
      </div>
      <div class="hr"></div>
      <div class="foot-link">
        <label onClick={sendToForgotPassword}>Forgot Password?</label>
      </div>
    </div>

   {/* SIGN_UP */}

    <div class="sign-up-htm">
      <div class="group">
        <label for="user" class="label">Fullname</label>
        <input id="fullname" type="text" class="input" value={fullname} onChange={update} placeholder="Enter Full Name"/>
      </div>
      <div class="group">
        <label for="pass" class="label">Password</label>
        <input id="password" type="password" class="input" data-type="password" value={password} onChange={update} placeholder="Minimum 8 letters"/>
      </div>
      <div class="group">
        <label for="pass" class="label">Repeat Password</label>
        <input id="confirmpassword" type="password" class="input" data-type="password" value={confirmpassword} onChange={update} placeholder="Minimum 8 letters"/>
      </div>
      <div class="group">
        <label for="pass" class="label">Email Address</label>
        <input id="email" type="text" class="input" value={email} onChange={update} placeholder="xxx@example.com"/>
      </div>
              <div class="group">
        <label for="user" class="label">Mobile Number</label>
        <input id="mobilenumber"  maxLength="10" class="input" value={mobilenumber} onChange={update} placeholder="xxxxx-xxxxx"/>
      </div>
              <div class="group">
        <label for="user" class="label">Address</label>
        <input id="address" type="text" class="input" value={address} onChange={update} placeholder="Enter Address"/>
      </div>
      <div class="group">
        <input type="submit" class="button" value="Sign Up" onClick={submiting}/>
      </div>
      <div class="hr"></div>
      <div class="foot-link">
              <label htmlFor="tab-1">Already Member?</label>
      </div>
    </div>
  </div>
</div>
</div>
);
  return (
    <div>
    {isLoading ? <LoadingSpinner/> : renderUser}
    </div>
  );
}

export default Signup_Signin;