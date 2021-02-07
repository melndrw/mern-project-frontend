import React from 'react';
import './SideDrawer.css';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const SideDrawer = (props) => {
  const drawer = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside onClick={props.onClose} className="side-drawer">
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(drawer, document.getElementById('drawer-hook'));
};

export default SideDrawer;