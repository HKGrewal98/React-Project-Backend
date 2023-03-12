import { Outlet } from "react-router-dom";
import classes from '../Layout/Header.module.css'
import MainNavigation from "../UI/MainNavigation";

export default function Root(){

    return (
        <>
         <header className={classes.header}>
            <h1>Ottomons</h1>
            <MainNavigation/>
        </header>
        <Outlet/>
        </>
    )
}