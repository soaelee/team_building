import React, {useState} from 'react'
import styles from '../detail.module.css'

const DetailLike = () => {
    
    const [views, setViews] = useState(2048);
    const [likes, setLikes] = useState(1024);
    return (
        <div className={styles.likeContainer}>
            <div className={styles.likeInfo}>
                <h4># views {views}</h4>
                <h4># like {likes}</h4>
            </div>
            <button className={styles.likeButton}>I LIKE IT !</button>
        </div>
    )
}

export default DetailLike
