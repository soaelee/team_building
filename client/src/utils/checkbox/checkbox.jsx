import React, {useState} from 'react'
import styles from './checkbox.module.css'

const Checkbox = (props) => {

    const [departs, setDeparts] = useState([
        { key: 0, value: false, name: "기획/마케팅" },
        { key: 1, value: false, name: "디자인" },
        { key: 2, value: false, name: "프론트엔드" },
        { key: 3, value: false, name: "백엔드" },]);

    const checkHandler = e => {
        let tmpDeparts = [...departs].map(depart => {
            if(depart.key === parseInt(e.currentTarget.value)) {
                return {...depart, value: !depart.value}
            } else return depart
        })
        
        setDeparts(tmpDeparts)

        let tmpIndex = []
        for(let i = 0; i < tmpDeparts.length; i++){
            if(tmpDeparts[i].value){
                tmpIndex.push(tmpDeparts[i].key)
            }
        }

        props.setFilterDeparts(tmpIndex)
    }
    return (
        <form className={styles.form}>
            {departs.map((depart, idx)=> (
                <label key={idx} className={styles.checkbox}>
                    <input type="checkbox" value={depart.key} name="depart" onChange={checkHandler}/>
                    {depart.name}
                </label>
            ))}
        </form>
    )
}

export default Checkbox
