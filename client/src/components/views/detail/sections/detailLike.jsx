import React, {useState, useEffect} from 'react'
import styles from '../detail.module.css'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {USER_SERVER} from '../../../Config'

//<i class="far fa-heart"></i> 비어있는
//<i class="fas fa-heart"></i> 차있는
const DetailLike = (props) => {
    
    const user = useSelector(state => state.user);

    const [views, setViews] = useState(2048);
    const [likes, setLikes] = useState(1024);
    const [iClass, setIClass] = useState(false);

    const likeHandler = () => {
        if(!(user.userData.isAuth)){
            alert("로그인이 필요한 기능입니다.");
            props.history.push("/login");
        } else {
            likeChangeHandler();
        }
    }

    useEffect(() => {
        if(user.userData && user.userData.isAuth){
            // user.userData.like.forEach((item) => {
            //     console.log(item.id);
            // })
            if(user.userData.like.length > 0) {
                user.userData.like.forEach((item) => {
                    if(item.id === props.match.params.postId) {
                        setIClass(true);
                    }
                })
            }
        }
    }, [user]);
    const likeChangeHandler = () =>{
        console.log(props.match.params.postId)
        axios.post(`${USER_SERVER}/addLike`, {postId: props.match.params.postId})
            .then(res => {
                if(res.data.success){
                    if(res.data.duplicate){
                        return setIClass(false);
                    }
                    return setIClass(true);
                }
                return setIClass(false);
            })
    }

    return (
        <div className={styles.likeContainer}>
            <h1 className={styles.title}>{props.title}</h1>
            <button onClick={likeHandler} className={styles.likeButton}>
                LIKE 
                <i class={iClass ? "fas fa-heart":"far fa-heart"}></i> 
            </button>
        </div>
    )
}

export default withRouter(DetailLike)
