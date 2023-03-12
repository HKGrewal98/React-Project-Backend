 import React,{useState,useContext,useEffect} from "react";
import mealContext from "../../../store/MealItemContext";
import Input from "../../UI/Input";
 import classes from './MealItemForm.module.css'
 import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


 export default function MealItemForm(props){

const [amount,setAmount] = useState(0)
const [error,setError] = useState(false)

const ctx = useContext(mealContext)
const {cartItems} = ctx


function getCurrentCount(){
  const data = cartItems.filter((meal) => meal.id === props.id)
  if(data.length!==0){ 
    console.log("For Id : " + JSON.stringify(props.id) + " ans amount is : " + JSON.stringify(data[0].amount) + " and data is : " + JSON.stringify(data))
     return data[0].amount 
  }else{
      return 0
  }
}

useEffect(()=>{
  const data = cartItems.filter((meal) => meal.id === props.id)
  if(data.length!==0){ 
    console.log("Use Effect For Id : " + JSON.stringify(props.id) + " ans amount is : " + JSON.stringify(data[0].amount) + " and data is : " + JSON.stringify(data))
       setAmount(data[0].amount) 
  }else{
      setAmount(0)
  }
},[cartItems,props.id])


 const onSubmitHandler = (event) => {
  setError(false)
   event.preventDefault();
   let newAmt = +amount+1
   if(newAmt > 10){
      setError(true)
      return;
   }
   
  props.onClickAmountHandler(newAmt)      
  setAmount(newAmt)
 }

 const amountHandler = (amt) => {
          setError(false)
          props.onClickAmountHandler(amt) 
          setAmount(amt)
 }

    return (
             <React.Fragment>
              <form className={classes.form} onSubmit={onSubmitHandler}>
                 <Input label="Amount" input={{
                    id : props.id,
                    type : 'number',
                    min: '0',
                    max: '10',
                    step: '1',
                    value :getCurrentCount()}}
                    onChange={amountHandler}/>
                <button>+ Add</button>
             </form>
             {error && <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      This is an error alert — <strong>Max count for a dish is 10.</strong>
                    </Alert>
              </Stack>}
             </React.Fragment>
    )

 }
