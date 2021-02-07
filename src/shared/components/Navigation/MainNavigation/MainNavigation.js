import React, { useState } from 'react';
import './MainNavigation.css';
import MainHeader from '../MainHeader/MainHeader';
import { Link } from 'react-router-dom';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../BackDrop/Backdrop';

const MainNavigation = () => {
  const [isDrawer, setIsDrawer] = useState(false);
  return (
    <>
      {isDrawer && <Backdrop onClick={() => setIsDrawer(false)} />}
      <SideDrawer onClose={() => setIsDrawer(false)} show={isDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          onClick={() => setIsDrawer(true)}
          className="main-navigation__menu-btn"
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
