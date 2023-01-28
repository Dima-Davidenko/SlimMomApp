import React from 'react';
import { NavLink } from 'react-router-dom';
import './AppNavLink.css';

interface IProps {
  text: string;
  path: string;
}

const AppNavLink: React.FC<IProps> = ({ text, path }) => {
  return (
    <NavLink className="appNavLink" to={path}>
      {text}
    </NavLink>
  );
};

export default AppNavLink;
