import React, {useState, useEffect, useRef} from 'react'
import Rightnav from './rightnav.jsx'
import styles from './header.module.css'
import logo from '../../../ui/tLogo.png'

export const Header = () => {
    const [nav, setNav] = useState([
        {
            key: 1,
            name: "인재찾기",
            to: "/people",
            clicked: false
        },
        {
            key: 2,
            name: "팀원모집",
            to: "/team_building",
            clicked: false
        }
    ]);
    const headerRef = useRef();
    const backgroundColor = styles.color;


  useEffect(() => {
    window.addEventListener("scroll", () => {
      const headerH = document.getElementById("header").clientHeight;
      if(window.scrollY > headerH){
        headerRef.current.classList.add(backgroundColor);
      } else {
        headerRef.current.classList.remove(backgroundColor);
      }
    })
  }, [])
    const navClickHandler = (key) => {
        console.log(key);
    };
    return (
        <header 
            id="header" 
            ref={headerRef} 
            className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logo}>
                    <a href="/">
                        <img src={logo} alt=""/>
                    </a>
                </div>
                <div className={styles.nav}>
                    {nav.map(item=>(
                        <li key={item.key} onClick={() => navClickHandler(item.key)}>
                            <a href={item.to}>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </div>
                <Rightnav />
                {/* auth 체크를 해서 sign-in인지 logout인지 결정 */}
            </div>
        </header>
    )
}
