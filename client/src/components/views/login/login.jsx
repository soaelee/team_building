import React, {useState, useRef} from 'react'
import styles from './login.module.css'

export const Login = () => {

    const formRef = useRef();

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
        setId("")
        setPw("")
    }

    return (
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
  )
}
