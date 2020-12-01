import React, {useEffect, useState} from 'react'
import Card from '../../../../utils/card/card';
import styles from './infinite.module.css'
const Infinite = (props) => {
const {category} = props
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // const mergedData = posts.concat(...props.posts);
        setPosts(props.posts);
    }, [props])

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if(scrollTop + clientHeight >= scrollHeight && props.fetching === false) {
            props.fetchMoreData();
        }
    }

    useEffect(() => {
        //scroll event listener
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })
    return (
        <div className={styles.infinite}>
            { posts && posts.map((post, idx) => (
                <Card key={idx} teamInfo={post} />
            ))}
        </div>
    )
}

export default Infinite
