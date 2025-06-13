import { useContext } from 'react';
import { ThemeContext } from '../App';
export default function ChangeMode(props){
    const { toggleTheme } = useContext(ThemeContext); 
    return(
        <button className="theme-changer" onClick={toggleTheme}>
          <img className="mode-image" src={props.img}/>
          <label>{props.theme} Mode</label>
        </button>
    )
}