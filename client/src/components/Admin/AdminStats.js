import { useEffect, useState } from "react";
import classes from './AdminStats.module.css'

function AdminStats() {

    const navList = {
        Year: 4,
        HalfYear: 3,
        Month: 2,
        Week: 1,
        CurrentDay: 0
    }

    const [status, setStatus] = useState(navList.Year);
    const [stats, setStats] = useState({})
    console.log("Status is : " + status)
    
    async function fetchStats(val) {
        const response = await fetch(`/order/data?status=${val}`, {
            headers: {
                "Content-type": "application/json",
                'Access-Control-Allow-Origin': '*',
                "Accept": 'application/json'
            }
        })

            const result = await response.json()
            console.log(result)
            setStats(result)
            return result
    }

    useEffect(() => {
        fetchStats(status)
    }, [])


    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setStatus(navList[e.target.value])
        fetchStats(navList[e.target.value])
    }
    
    return (
        <div className={classes.content}>
             
            <div className={classes.filterCustom}>
                    <label htmlFor="status01">Filter By:</label>
                    <select name="status" id="status01" onChange={(e) => handleChange(e)}>
                        {Object.keys(navList).map((val,i) => {
                            return (
                                    <option key={i} value={val}>{val}</option>
                            )})}
                    </select>
            </div>
            
           {Object.keys(stats).length !== 0  ? <>

                <div className={classes.record}>
                    <h4>Total Orders: {stats.totalOrders}</h4>
                    <h4>Total Amount: ${stats.totalAmount}</h4>
                </div>
                
                {stats.sortBycount && stats.sortBycount.length > 0 ?
                     <div className={classes.tableTwo}>
                     <h2>Sort By Count</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Count</th>
                                    <th>Total Amount</th>
                                    <th>Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {stats.sortBycount.map((item) => {
                                 
                                  return (
                                  <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td> 
                                    <td>${item.totalSaleAmount}</td> 
                                    <td>{item.available}</td> 
                                  </tr>
                                  )})}

                            </tbody>
                        </table> 
                     </div>
                : ''}

                {stats["sortByamount"] && stats["sortByamount"].length > 0 ?
                            <div className={classes.tableTwo}>
                            <h2>Sort By Amount</h2>
                                        <table >
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Count</th>
                                                    <th>Total Amount</th>
                                                    <th>Available</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                             {stats.sortByamount.map((item) => {
                                 
                                                            return (
                                                            <tr key={item._id}>
                                                                <td>{item.name}</td>
                                                                <td>{item.count}</td> 
                                                                <td>${item.totalSaleAmount}</td> 
                                                                <td>{item.available}</td> 
                                                            </tr>
                                                )})}

                                            </tbody>
                                        </table> 
                            </div> 
                           
                : ''}
           </> : <>No data available.</>}

        </div>
    );

}

export default AdminStats;