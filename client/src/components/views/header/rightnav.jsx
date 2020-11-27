import React from 'react'
import styles from './header.module.css'
export const Rightnav = () => {
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
