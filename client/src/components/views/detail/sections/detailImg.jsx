import React, {useState, useEffect} from 'react'
import styles from '../detail.module.css'

const DetailImg = ({image}) => {

    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        // 이거는 에러! console.log(image[0])
        if(image && image.length > 0){
            setImageSrc(image[0])
        }
    }, [image])
    return (
        <div className={styles.imageContainer}>
            <img src={`http://localhost:5000/${imageSrc}`} />
        </div>
    )
}

export default DetailImg
