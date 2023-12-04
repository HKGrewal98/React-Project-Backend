import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import classes from './AdminAction.module.css'
import mealContext from '../../store/MealItemContext';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'


function AdminAction(){

   const navigate = useNavigate()
   const ctx = useContext(mealContext)
   const location = useLocation()
   const [meta,setMeta] = useState({
    action:1,
    id:null
   })
   const [item,setItem] = useState({
        _id: "",
        name: "",
        description: "",
        price: 0,
        available: "",
        resturantId: ""
        }
   )
   const [timeInterval,setTimeInterval] = useState([])
   const [show,setShow] = useState(false)
   const [msgLevel,setMsgLevel] = useState("info")
   const [msg,setMsg] = useState("")


   let availableListConstants = ['Breakfast','Lunch','Dinner','Regular'];
     
   async function getItem(id){
    
    const response = await fetch(`/menu/item/${id}`,{
        headers:{
            "Content-type":"application/json",
            'Access-Control-Allow-Origin':'*',
            "Accept": 'application/json',
            "Authorization":ctx.jwt
        }
    })

    const meal = await response.json()
     let newList = []
     availableListConstants.forEach((d) => {
        if(d !== meal.available){
            newList.push(d)
        }
    })
  
    newList.unshift(meal.available)
    setTimeInterval(newList)
    return meal

   }


   useEffect(()=>{
   
   async function init(){
    const action = parseInt(new URLSearchParams(location.search).get('action')); 
    const id = new URLSearchParams(location.search).get('id');

    if(action === 1){
        setTimeInterval(availableListConstants)
    }
    
    if(action === 0){
            const meal = await getItem(id);
            console.log(meal)
            setItem(meal)
            setMeta({
                action:0,
                id:id
            })
            document.getElementById('rate').value = meal.price
          
    }}
   
     init();
     
  
   },[])

   function handleSubmit(e){
    e.preventDefault();
    console.log(e.target.name.value)

    let body = {
        id: item._id,
        name: e.target.name.value,
        description: e.target.description.value,
        price: e.target.price.value,
        available: e.target.available.value,
        resturantId: item.resturantId
        }

         console.log(body)
         saveData(body)
   }

   async function saveData(body){

         let url = ''
         if(meta.action === 1){
            url = '/menu/addItem'
         }else{
            url = '/menu/updateItem'
         }
          
           try{
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                    'Access-Control-Allow-Origin':'*',
                    "Accept": 'application/json',
                    "Authorization":ctx.jwt
                },
                body:JSON.stringify(body)
             })
    
             const result  = await response.json()
             console.log(result)
             setMsg(result.message)
           }catch(e){
             setMsg("Unknown error occured. Please try again later.")
             setMsgLevel("error")
           }

           setShow(true)

   }

   const onClose = (event) => {
    setShow(false)
    navigate("/admin")
}


    return (
        <div className={classes.content}>

            <h1>Action Form</h1>
 
                    {show &&  <Stack sx={{ width: 'auto' }} spacing={2}>
                                <Alert severity={msgLevel} onClick={onClose}>
                                        <AlertTitle>Alert</AlertTitle>
                                        <strong>{msg}</strong>
                                </Alert>
                              </Stack>}

                   <br></br>
            
            <form onSubmit={(e) => handleSubmit(e)}>
              
           <div className={classes.inputValue}>
                <label htmlFor="fname">Name</label>
                <input type="text" id="fname" name="name" defaultValue={item.name} placeholder="Item name.." required/>
           </div>

            <div className={classes.inputValue}>
                <label htmlFor="rate">Price</label>
                <input type="number" id="rate" name="price" step="0.01"
                  defaultValue={item.price}
                placeholder="Item price.."/>
            </div>

            <div className={classes.inputValue}>
                  <label htmlFor="time">Available</label>
                  <select id="time" name="available" defaultValue={item.available}>
                  {timeInterval.map((d)=>{
                    return (
                        <option key={d} value={d} defaultChecked={item.available === d} >{d}</option>
                    )
                   })}
                  </select>
            </div>

            <div className={classes.inputValue}>
             
                <textarea type="text" id="desc" name="description" defaultValue={item.description} placeholder="Item description.." required></textarea>
            </div>
               
               <div className={classes.inputValue}>
                 <button className={classes.create}>Save</button>
               </div>
            
            </form>

            <Link className={classes.backward} to="/admin">Back</Link>
           
        </div>
    )

}

export default AdminAction;