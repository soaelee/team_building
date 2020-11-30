import React from 'react'
import styles from './header.module.css'
import { useSelector } from 'react-redux'
import { USER_SERVER } from '../../Config'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const Rightnav = (props) => {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`)
            .then(res => {
                if (res.status === 200) {
                    props.history.push("/login");
                } else {
                    alert("로그아웃에 실패했습니다.")
                }
            });
    }

    if (user.userData && !user.userData.isAuth) {
        return (
            <>
                <ul className={styles.buttonList}>
                    <button className={styles.button}>
                        <a href="/login">
                            로그인
                        </a>
                    </button>
                    <button className={styles.button}>
                        <a href="/register">
                            회원가입
                        </a>
                    </button>
                </ul>
            </>
        )
    }
    else {
        return (
            <>
                <ul className={styles.buttonList}>
                    <button className={styles.button}>
                        <a href="/upload">
                            Upload
                        </a>
                    </button>
                    <button onClick={logoutHandler} className={styles.button}>
                        로그아웃
                    </button>
                </ul>
            </>
        )
    }
}

export default withRouter(Rightnav);