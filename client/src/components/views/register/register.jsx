import React, {useState, useRef} from 'react'
import styles from '../login/login.module.css'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_actions'

export const Register = (props) => {

    const formRef = useRef();
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwC, setPwC] = useState("");
    const idChangeHandler = (e) => {
        setId(e.currentTarget.value);
    }

    const pwChangeHandler = (e) => {
        setPw(e.currentTarget.value);
    }

    const pwCChangeHandler = (e) => {
        setPwC(e.currentTarget.value);
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if(!id || !pw) return alert("아이디와 비밀번호를 입력해주세요.");
        if(pw !== pwC) return alert("같은 비밀번호를 입력해주세요.");
        
        const dataToSubmit = {
            name: id,
            password: pw
        }
        dispatch(registerUser(dataToSubmit))
            .then(res => {
                if(res.payload.success){
                    props.history.push("/");
                } else { 
                    alert(res.payload.err);
                }
            })

        setId("")
        setPw("")
        setPwC("")
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
                    비밀번호
                    </label>
                    <input  className={styles.input} type="password" placeholder="Password"value={pw }onChange={pwChangeHandler}/>
                </div>
                <div className={styles.pw}>
                    <label>
                        비밀번호 확인
                    </label>
                    <input  className={styles.input} type="password" placeholder="Check Password" value={pwC} onChange={pwCChangeHandler}/>
                </div>

                <button  className={styles.button} >SIGN UP</button>
        </form>
        </div>

  )
}
