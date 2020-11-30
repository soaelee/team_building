import React, {useState, useRef} from 'react'
import styles from './login.module.css'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_actions'
import Identity from '../main/sections/identity'
export const Login = (props) => {

    const formRef = useRef();
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const idChangeHandler = (e) => {
        setId(e.currentTarget.value);
    }

    const pwChangeHandler = (e) => {
        setPw(e.currentTarget.value);
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if(!id || !pw){
            return alert("아이디와 비밀번호를 입력해주세요.");
        }
        const dataToSubmit = {
            name: id,
            password: pw
        }

        dispatch(loginUser(dataToSubmit))
            .then( res => {
                if(res.payload.loginSuccess) {
                    window.localStorage.setItem('userId', res.payload.userId);
                    props.history.push("/");
                } else {
                    alert(res.payload.message);
                }
            })
        setId("")
        setPw("")
    }

    return (
        <>
        <Identity />
        <div  className={styles.formContainer} >
            <form ref={formRef} onSubmit={submitHandler} className={styles.form}>
                    <div className={styles.id}>
                        <label>
                            아이디
                        </label>
                        <input className={styles.input} type="text" placeholder="Username" value={id} onChange={idChangeHandler}/> 
                    </div>
                    <div className={styles.pw}>
                        <label>
                            패스워드
                        </label>
                        <input  className={styles.input} type="password" placeholder="Password"value={pw }onChange={pwChangeHandler}/>
                    </div>
                    <button  className={styles.button}>SIGN IN</button>
            </form>
        </div>
        </>
  )
}
