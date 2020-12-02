import React, {useEffect, useState} from 'react'
import styles from '../detail.module.css'

const DetailInfo = ({postInfo}) => {
    const [depart, setDepart] = useState([]);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [contact, setContact] = useState("");
    useEffect(() => {
        if(Object.keys(postInfo).length > 0) {
            setDepart(postInfo.depart);
            setDescription(postInfo.description);
            setTitle(postInfo.title);
            setContact(postInfo.contact);
        }
    }, [postInfo])

    const departRender = depart.map((item, idx) => {
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
        <div className={styles.detailInfo}>
            <table>
                {depart && (
                    <tr>
                        <td className={styles.tableDepart}>
                            <p className={styles.description} style={{fontSize: '.9rem'}}>분야</p>
                            {departRender}
                        </td>
                    </tr>
                )}
                <tr>
                    <td className={styles.tableDetail}>
                        <p className={styles.description}>소개합니다</p>
                        {description}
                    </td>
                </tr>
                <tr>
                    <td className={styles.tableDetail}>
                        <p className={styles.description}>지원/문의 연락처</p>
                        {contact}
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default DetailInfo
