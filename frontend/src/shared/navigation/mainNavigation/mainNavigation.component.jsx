import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackDrop from "../../uiElements/backDrop.component.jsx";
import MainHeader from "../mainHeader/mainHeader.component.jsx";
import NavLinks from "../navLinks/navLinks.component.jsx";
import SideDrawer from "../sideDrawer/sideDrawer.component.jsx";

import "./mainNavigation.styles.css";

const MainNavigation = props =>{
    const [openDrawer, setOpenDrawer] = useState(false)
    const open = () =>{
        setOpenDrawer(true);
    }
    const close = () =>{
        setOpenDrawer(false);
    }
    return (
        <React.Fragment>
            {openDrawer && <BackDrop onClick={close}/>}
            <SideDrawer show={openDrawer} onClick={close}>
                <nav className="main_navigation_drawer_nav">
                    <NavLinks className="drawer_nav"/>
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main_nav_menu_button" onClick={open}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                <h1 className="main_nav_title">
                    <Link to="/">Ghurte Jabo</Link>
                </h1>
                <nav className="main_navigation_header_nav">
                    <NavLinks/>
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation;