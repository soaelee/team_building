import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Infinite from './sections/infinite'
import styles from './infinitePosts.module.css'
import Checkbox from '../../../utils/checkbox/checkbox'
import Search from '../../../utils/search/search'
const InfiniteTeam = () => {
    const [teams, setTeams] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pontSize, setPontSize] = useState(0);
    const [filters, setFilters] = useState({
        category: 0,
    })
    const [fetching, setFetching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {

        let body = {
            skip: skip,
            limit: limit,
            filters: filters
        };
        getTeams(body)
    }, [])

    const getTeams = (body) => {
        axios.post("/api/team/teams", body)
            .then( res => {
                if(res.data.success) {
                    if(body.loadMore) {
                        setTeams([...teams, ...res.data.teamInfo]);
                    } else {
                        setTeams(res.data.teamInfo)
                    }
                    setPontSize(res.data.pontSize);
                } else {
                    alert("팀원 모집글을 가져오는데 실패 했습니다.")
                }
            })
    }

    const fetchMoreData = async () => {
        setFetching(true);
        let tmpSkip = skip + limit
        let body = {
            skip: tmpSkip,
            limit: limit,
            filters: filters,
            loadMore: true
        };

        getTeams(body);
        setSkip(tmpSkip);
        setFetching(false);
    }

    const setFilterDeparts = (keys) => {
        const tmpFilters = {...filters}
        tmpFilters["depart"] = keys

        let body = {
            skip: skip,
            limit: limit,
            filters: tmpFilters
        }
        getTeams(body);
        setSkip(0)
        setFilters(tmpFilters)
    }

    const searchTermHandler = (newSearchTerm) => {
        
        let body={
            skip: skip,
            limit: limit,
            filters: filters,
            searchTerm: newSearchTerm
        };

        getTeams(body);
        setSkip(0)
        setSearchTerm(newSearchTerm);
    }
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>팀원 모집</h2>
            <div className={styles.filters}>
                <Checkbox setFilterDeparts={setFilterDeparts}/>
                <Search searchTermHandler={searchTermHandler}/>
            </div>
            <Infinite category="1" posts={teams} fetchMoreData={fetchMoreData} fetching={fetching}/>
        </div>
    )
}

export default InfiniteTeam
