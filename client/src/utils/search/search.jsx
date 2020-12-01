import React, {useState} from 'react'
import styles from './search.module.css'
const Search = (props) => {
    const [search, setSearch] = useState("");

    const searchChangeHandler = (e) => {
        setSearch(e.currentTarget.value);
        props.searchTermHandler(e.currentTarget.value);
    }
    return (
        <div className={styles.form}>
            <input type="text" value={search} onChange={searchChangeHandler}/>
            <button>SEARCH</button>
        </div>
    )
}

export default Search
