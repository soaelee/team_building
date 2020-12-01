import React, {useState, useEffect} from 'react'
import styles from '../main.module.css'
import axios from 'axios'
import Card from '../../../../utils/card/card'
const Landing = ({cate}) => {
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(3);

    useEffect(() => {
        const filter = {category: parseInt(cate),}
        const body = {
            skip: skip,
            limit: limit,
            filters: filter
        }
        axios.post("/api/team/teams", body)
            .then(res => {
                if(res.data.success) {
                    setPosts(res.data.teamInfo);
                } else {
                    alert(res)
                }
            })
    }, []);

    return (
        <div className={styles.landing}>
            {posts && posts.map((post, idx) => (
                <Card key={idx} teamInfo={post}/>
            ))}
        </div>
    )
}

export default Landing
