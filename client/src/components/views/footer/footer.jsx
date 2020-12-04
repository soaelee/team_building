import React from 'react'
import styles from './footer.module.css'
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.line} />
            <ul>
                <li>@2020</li>
                <li><a href="https://github.com/soaelee/team_building" target="blank">github</a></li>
                <li>soaelee</li>
                <li className={styles.hidden}>front end</li>
                <li className={styles.hidden}>engineering</li>
                <li className={styles.hidden}>toy project</li>
                <li>team building</li>
            </ul>
        </footer>
    )
}

export default Footer
