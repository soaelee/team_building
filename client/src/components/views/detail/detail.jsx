import React, {useEffect, useState} from 'react'
import axios from 'axios'
import DetailImg from './sections/detailImg';
import DetailLike from './sections/detailLike';
import DetailInfo from './sections/detailInfo';
import styles from './detail.module.css';
import {useSelector} from 'react-redux';
import DetailUDButton from './sections/detailUDButton'

const Detail = ({match, history}) => {
    const postId = match.params.postId;
    const [post, setPost] = useState({});
    const [resUser, setResUser] = useState("");
    const [stateUser, setStateUser] = useState("");
    let user = useSelector( state => state.user);
    useEffect(() => {
        axios.get(`/api/team/post_by_id?id=${postId}&type=single`)
            .then(res => {
                setPost(res.data[0]);  
                setResUser(res.data[0].writer._id);          
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if(user.userData && user.userData.isAuth){
            setStateUser(user.userData._id);
        }
    }, [user])
    const updateClickHandler = () => {
        history.push(`/update/${postId}`)
    }

    const deleteClickHandler = () => {
        const res = window.confirm("해당 포스트를 삭제하시겠습니까?");
        if(res){
            console.log(postId);
            axios.get(`/api/team/removePost?id=${postId}`)
                .then(res => {
                    alert("삭제되었습니다.");
                    history.push("/");
                })
                .catch(err => {
                    alert(err);
                })
        }
    }
    return (
        <section className={styles.detail}>            
            { resUser === stateUser && (
                <div className={styles.buttonContainer}>
                <DetailUDButton text="update" onClick={updateClickHandler}/>
                <DetailUDButton text="delete" onClick={deleteClickHandler}/>
                </div>
            )}
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.top}>
                <DetailImg image={post.images}/>
                <DetailLike />
            </div>
            <div className={styles.bottom}>
                <DetailInfo postInfo={post}/>
            </div>
        </section>
    )
}

export default Detail
