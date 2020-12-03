import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import styles from './mypage.module.css'
import Mylist from './sections/mylist';

const MyPage = () => {
    const user = useSelector(state => state.user);
    const [page, setPage] = useState(true); // true면 내가 올린 글, false면 좋아요 한 글

    const navTrueHandler = () => setPage(true);
    const navFalseHandler = () => setPage(false);
    return (
        <section className={styles.mypage}>
            <div>
                <nav className={styles.nav}>
                    <ul className={styles.ul}>
                        <li 
                            onClick={navTrueHandler}
                            className={page ? styles.active : null}
                        >내가 올린 글</li>
                        <li 
                            onClick={navFalseHandler}
                            className={page ? null : styles.active }
                        >좋아요 목록</li>
                    </ul>
                </nav>
            </div>
            <div className={styles.mypageInfo}>
                {page && user.userData && (
                    <Mylist userId={user.userData._id} params="mylist"/>
                )}
                {(!page) && user.userData && (
                    <Mylist userId={user.userData._id} params="mylike"/>
                )}
            </div>
        </section>
    )
}

export default MyPage
