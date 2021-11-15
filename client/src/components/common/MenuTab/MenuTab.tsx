import React from 'react';
import { NavLink } from 'react-router-dom';

interface MenuTabProps {
  menus: Array<{ name: string; path: string }>;
}

const MenuTab = ({ menus }: MenuTabProps) => {
  return (
    <>
      <ul>
        {menus.map((menu, index) => (
          <li key={index}>
            <NavLink to={menu.path}>{menu.name}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MenuTab;
