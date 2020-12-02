import React from 'react'
import styles from './card.module.css'

const Card = ({teamInfo}) => {
    const depart = teamInfo.depart.map((item, idx) => {
        if(item === 0){
            return(
                <div className={styles.departItem}>
                    <div className={styles.red}></div>
                    <p>기획/마케팅</p>
                </div>
            )
        }else if (item === 1){
            return (
                <div className={styles.departItem}>
                    <div className={styles.blue}></div>
                    <p>디자인</p>
                </div>
            )
        }else if(item === 2){
            return (
                <div className={styles.departItem}>
                <div className={styles.green}></div>
                <p>프론트엔드</p>
            </div>
            )
        } else {
            return (
                <div className={styles.departItem}>
                    <div className={styles.black}></div>
                    <p>백엔드</p>
                </div>
            )
        }
    })
    return (
        <div className={styles.card}>
            <a href={`/p/${teamInfo._id}`}>
            <div className={styles.image}>
                <img src={`http://localhost:5000/${teamInfo.images[0]}`}/>
            </div>
            <div className={styles.description}>
                <div className={styles.depart}>
                    {depart}
                </div>
                <h3>{teamInfo.title}</h3>
                <p className={styles.detail}>{teamInfo.description}</p>
            </div>
            </a>
        </div>
    )
}

export default Card
