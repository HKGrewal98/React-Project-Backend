import React,{useState,useContext,useRef} from 'react'
import './Login.css'
import { useForm } from "react-hook-form";
import mealContext from '../../store/MealItemContext';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {useNavigate} from 'react-router-dom'

function Login(){

	const navigate = useNavigate()
  
    const [msg,setMsg] = useState("Welcome to the Ottomons family.")
	const [msgLevel,setMsgLevel] = useState("info")
	const [showMsg,setShowMsg] = useState(false)
	const ctx = useContext(mealContext)
	
	
	const {register,handleSubmit,formState:{errors}} = useForm({
		delayError:1000,
		criteriaMode:"all",
		mode:"onSubmit",
		reValidateMode:"onChange"
	})


	const onSignUpSubmit = async (data,event) => {
		event.preventDefault()
		console.log(data)
		
		try{
           const response =  await fetch('/user/signUp',{
				method:'POST',
				body:JSON.stringify(data),
				headers :{
					"Content-type":"application/json",
					'Access-Control-Allow-Origin':'*',
					"Accept": 'application/json',
					"Authorization" : ctx.jwt
				}
			 })

			 if(response.status===400 || response.status===500){
				console.log(await response.json())
				setMsg("Unknown error occured. Please try again later.")
				setMsgLevel("error")
			 }else if(response.status===201){
				const result = await response.json()
				console.log(result)
				setMsg(result.message)
				setMsgLevel("info")
			 }else{
				const result = await response.json()
				console.log(result)
				setMsg(result.message)
				setMsgLevel("success")
			 }
             
			 data = {}
			
		}catch(error){
               console.log("Error : " + error)
			   setMsg("Unknown error occured. Please try again later.")
			   setMsgLevel("error")
		}
		setShowMsg(true)
		event.target.reset()
	}


    const onClose = (event) => {
		setShowMsg(false)
	}

   
	const emailRef = useRef()
	const passwordRef = useRef()


	const onLoginHandler = async (event) => {
		  event.preventDefault()
          const body = {
			email:emailRef.current.value,
			password: passwordRef.current.value
		  }
		  console.log(body)

		  try{

			const response =  await fetch('/user/signIn',{
				method:'POST',
				body:JSON.stringify(body),
				headers :{
					"Content-type":"application/json",
					'Access-Control-Allow-Origin':'*',
					"Accept": 'application/json',
					"Authorization" : ctx.jwt
				}
			 })

			 const result = await response.json()
             console.log(result)
			 if(response.status===500){
				setMsg("Unknown error occured. Please try again later.")
				setMsgLevel("error")
				setShowMsg(true)
			 }else if(response.status===400){
				setMsg(result.message)
				setMsgLevel("info")
				setShowMsg(true)
			 }else{
				const {id,name,email} = result.user
				ctx.setLoginedUser(id,name,email)
				ctx.setUserLogin(true)
				navigate("/ottomonMenu")
			 }

		  }catch(error){
			console.log("Catch")
             console.log(error)
			 setMsg("Unknown error occured. Please try again later.")
			 setMsgLevel("error")
			 setShowMsg(true)
		  }  
	}



    return(
             <>
			    {showMsg &&  <Stack sx={{ width: 'auto' }} spacing={2}>
											<Alert severity={msgLevel} onClick={onClose}>
													<AlertTitle>Alert</AlertTitle>
													<strong>{msg}</strong>
											</Alert>
                               </Stack>}
				
       <div className='loginMaster'>
	<title>Slide Navbar</title>
	<link rel="stylesheet" type="text/css" href="slide navbar style.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet"/>
	<div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div className="signup" onSubmit={handleSubmit(onSignUpSubmit)}>
				<form className='forms'>
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="name"  placeholder="User name" {...register("name",{required:"Name is Required."})}/>
					<p>{errors.name?.message}</p>
					<input type="email" name="email" placeholder="Email" {...register("email",{required:"Email is Required."})}/>
					<p>{errors.email?.message}</p>
					<input type="password" name="password" placeholder="Password" 
					{...register("password",{required:"Password is Required.",
					minLength:{
						value:8,
						message:"Password length should be greater than or equal to 8."
					}})}/>
						<p>{errors.password?.types?.required}</p>
						<p>{errors.password?.types?.minLength}</p>
					<input type="text" name="phone" placeholder="Phone Number" {...register("phone",{required:"Phone Number is Required."})}/>
					<p>{errors.phone?.message}</p>
					<button className='loginButton'>Sign up</button>
				</form>
			</div>

			<div className="login">
				<form className='forms' onSubmit={onLoginHandler}>
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" ref={emailRef} required/>
					<input type="password" name="password" placeholder="Password" ref={passwordRef} required />
					<button className='loginButton'>Login</button>
				</form>
			</div>
	</div>
</div>
			 </>
   
    )
}

export default Login;