import React from 'react';
import { ReactComponent as Sun } from '../Sun.svg';
import { ReactComponent as Moon } from '../Moon.svg';
import '../index.css';
import { useTheme } from '../contexts/mode.context';

const DarkMode = () => {
  const { isDarkMode, setLightMode, toggleMode, setDarkMode } = useTheme();

  /*const setDarkMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'dark');
  };

  const setLightMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'light');
  };*/

  //  setDarkMode();

  return (
    <div className='dark_mode'>
      <input className='dark_mode_input' type='checkbox' id='darkmode-toggle' />
      <label
        className='dark_mode_label'
        htmlFor='darkmode-toggle'
        onClick={toggleMode}
      >
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
