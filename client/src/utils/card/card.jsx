import React from 'react'
import styles from './card.module.css'

const Card = ({teamInfo}) => {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={`http://localhost:5000/${teamInfo.images[0]}`}/>
            </div>
            <div className={styles.description}>
                <h3>{teamInfo.title}</h3>
                <p>{teamInfo.description}</p>
            </div>
        </div>
    )
}

export default Card
