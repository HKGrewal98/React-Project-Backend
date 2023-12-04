import { useContext, useEffect, useState } from "react";
import mealContext from '../../store/MealItemContext';
import classes from './Admin.module.css'
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Card from "../UI/Card";

function Admin(){

    const ctx = useContext(mealContext)
    const [meal,setMeal] = useState([])
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [next,setNext] = useState(0)
    const [previous,setPrevious] = useState(0)
    const [show,setShow] = useState(false)
    const [msgLevel,setMsgLevel] = useState("info")
    const [msg,setMsg] = useState("")

    const onClose = (event) => {
        setShow(false)
    }


    async function fetchMeals(page){

        const response = await fetch('/web/getToken',{
            method:'POST',
            headers :{
                "Content-type":"application/json",
                'Access-Control-Allow-Origin':'*',
                "Accept": 'application/json'
            },
            body:JSON.stringify({"clientId":"frontend"})
            })
      
            const data = await response.json()
            console.log(data.accessToken)

            let uri = `/menu?paginated=${true}&page=${page}`
       
        const mealResponse = await fetch(uri,{
            headers:{
                "Content-type":"application/json",
                'Access-Control-Allow-Origin':'*',
                "Accept": 'application/json',
                "Authorization":data.accessToken
            }
        })
  
        const mealData = await mealResponse.json()

        console.log(mealData)
        setMeal(mealData.result)
        setPage(mealData.page)
        setNext(mealData.next)
        setPrevious(mealData.previous)
        setTotalPages(mealData.totalPages)
    }

    const navigationHandler = (value) => {
           console.log(value)
           fetchMeals(value)
    }

    useEffect(() =>{
        fetchMeals(page)
    },[])

    async function handleDelete(e,id){
        e.preventDefault();
        console.log(id)
        
        try{
            const response = await fetch(`/menu//deleteItem/${id}`,{
                headers:{
                    "Content-type":"application/json",
                    'Access-Control-Allow-Origin':'*',
                    "Accept": 'application/json',
                    "Authorization":ctx.jwt
                }
            })

            const result  = await response.json()
            setMsg(result.message)
             fetchMeals(page)
        }catch(e){
            setMsg("Unknown error occured. Please try again later.")
            setMsgLevel("error")
        }
        setShow(true)
    }


   async function handleDelete(e){
        e.preventDefault()
        console.log(e.target.title.value)
        const body = {"title":e.target.title.value}
        try{
            const response = await fetch(`/menu/title`,{
                method:"post",
                headers:{
                    "Content-type":"application/json",
                    'Access-Control-Allow-Origin':'*',
                    "Accept": 'application/json'
                },
                body:JSON.stringify(body)
            })

            setMsg("Title updated successfully.")
        }catch(ex){
            setMsg("Unknown error occured. Please try again later.")
            setMsgLevel("error")
        }
        setShow(true)
    }

    return (
        <>
          <div className={classes.content}>
            <button className={classes.create}><Link to={{
                                pathname: 'action',
                                search : '?action=1'
                              }}>New Meal</Link></button>
        <br></br>  

        <form  className={classes.titleForm} onSubmit={(e)=>handleDelete(e)}>
           <input type="text" name="title" placeholder="New Title" required/>
            <button className={classes.button}>Update Title</button>
        </form>

        
        <br></br>
                            {show &&  <Stack sx={{ width: 'auto' }} spacing={2}>
                                <Alert severity={msgLevel} onClick={onClose}>
                                        <AlertTitle>Alert</AlertTitle>
                                        <strong>{msg}</strong>
                                </Alert>
                            </Stack>}

                   <br></br>
                    <Card>
                    <ul>
                        {meal.map((m) => {
                         return (
                            <li className={classes.meal} key={m._id}>
                                    <div>
                                        <h3>{m.name}</h3>
                                        <div className={classes.description}>{m.description}</div>
                                        <div className={classes.price}>${m.price}</div>
                                        <div className={classes.price}>{m.available}</div>
                                         <div className={classes.changeLink}>
                                         <Link className={classes.edit} to={{
                                            pathname:'action',
                                            search: `?action=0&id=${m._id}`
                                         }}>Edit</Link>
                                         <Link className={classes.edit}
                                          onClick={(e)=>handleDelete(e,m._id)}
                                        >Delete</Link>
                                         </div>
                                    </div>
                            </li>

                         )

                        })}
                    </ul>
                    </Card>

         <div className={classes.navigate}>
            <button className={classes.navigationButton} onClick={() => fetchMeals(page-1)}>Previous</button>
            <h5 className={classes.pageTotal}>Page {page} of {totalPages}</h5>
            <button className={classes.navigationButton} onClick={() => fetchMeals(page+1)}>Next</button>
         </div>

          </div>
        </>
    );


}


export default Admin;