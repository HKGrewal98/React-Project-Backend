import React,{useEffect,useState,useContext,useCallback} from "react"
import Card from "../UI/Card"
import classes from './AvailableMeals.module.css'
import MealItem from "./MealItem/MealItem"
import mealContext from "../../store/MealItemContext"

const AvailableMeals = () =>{

    const [meals,setMeals] = useState([])

    const ctx = useContext(mealContext)
    
    const fetchData = useCallback(async ()=>{
        const response = await fetch('/web/getToken',{
            method:'POST',
            headers :{
                "Content-type":"application/json",
                'Access-Control-Allow-Origin':'*',
                "Accept": 'application/json',
            },
            body:JSON.stringify({"clientId":"frontend"})
            })
      
            const data = await response.json()
            console.log(data.accessToken)
           
        


      const mealResponse = await fetch('/menu',{
          headers:{
              "Content-type":"application/json",
              'Access-Control-Allow-Origin':'*',
              "Accept": 'application/json',
              "Authorization" : data.accessToken
          }
      })

      const mealData = await mealResponse.json()

      const updatedData = mealData.map((meal)=>{
              return {
                  ...meal,
                  id:meal._id
              }
      })

  

      setMeals(updatedData)
      console.log(updatedData)
    },[])   
   
    
    useEffect(()=>{
        fetchData()
        setInterval(()=>{
            fetchData()
           },900000)
    },[fetchData])
 
  
    return (
        <section className={classes.meals}>
           <Card>
              <button className={classes.button} onClick={() => fetchData()}>Reload</button>
                <ul>
                    {meals.map((meal) => {
                        return <MealItem 
                        key={meal.id} 
                        id = {meal.id}
                        name={meal.name} 
                        description={meal.description} 
                        price={meal.price} />
                    })}
                </ul>
           </Card>
        </section>
    )
}

export default AvailableMeals