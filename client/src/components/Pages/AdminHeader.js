import { Outlet,Link } from "react-router-dom";
import classes from '../Layout/Header.module.css'
import header from './AdminHeader.module.css'

function AdminHeader(){
    return (
        <>
         <header className={classes.header}>
             <h3>Admin Console</h3>
              <div className={header.nav}>
                <a href="/admin">Home</a>
                <a href="/admin/stats">Analytics</a>
              </div>
             <a href="/" style={{float:"right",color:"white",fontFamily:"cursive",fontSize:"18px"}}>Logout</a>
        </header>
        <Outlet/>
        </>
    )
}

export default AdminHeader;