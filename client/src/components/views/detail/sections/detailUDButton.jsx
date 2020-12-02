import React from 'react'
import styles from '../detail.module.css'
const DetailUDButton = ({text, onClick}) => {
    return (
        <button 
            onClick={onClick}
            className={styles.UDButton}
        >
            {text}
        </button>
    )
}

export default DetailUDButton
