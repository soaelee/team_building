import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Pagination from './pagination.jsx'
import styles from './mylist.module.css'

const Mylist = ({userId, params}) => {

    console.log({params});
    const [listInfo, setListInfo] = useState([]);
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    useEffect(() => {
        console.log(userId);
        if(params == "mylist"){
            const body = {
                skip: skip,
                limit: limit
            }
            getListData(body);
        } else {
            const body = {
                skip: skip,
                limit: limit,
                isLike: true
            }
            getListData(body);
        }
    }, [])

    const getListData = (body) => {
        axios.post('/api/team/mylist', body)
            .then(res => {
                console.log(res.data);
                setListInfo(res.data.listInfo);
            })
            .catch(err => {
                alert("정보를 불러오는데에 실패했습니다.");
            })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSkip((page - 1) * limit);
        const body = {
            skip: (page - 1) * limit,
            limit: limit
        }
        getListData(body);
        setCurrentPage(page)
    }

    const deleteClickHandler = (postId) => {
        const res = window.confirm("해당 포스트를 삭제하시겠습니까?");
        if(res){
            console.log(postId);
            axios.get(`/api/team/removePost?id=${postId}`)
                .then(res => {
                    alert("삭제되었습니다.");
                    getListData();
                })
                .catch(err => {
                    alert(err);
                })
        }
    }
    return (
        <div className={styles.container}>
            <table className={styles.board}>
                <thead>
                    <tr>
                        <td>category</td>
                        <td>제목</td>
                        <td>날짜</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                { listInfo.map((item, idx) => {
                    if(listInfo.length > 0){
                        const data = item.updateData.substring(0, 10);
                        return(
                            <tr key={idx}>
                                <td>{item.category == 1 ? "팀원모집" : "인재지원"}</td>
                                <td>
                                    <a href={`/p/${item._id}`}>
                                        {item.title}
                                    </a>
                                </td>
                                <td>{data}</td>
                                <td><button onClick={() => deleteClickHandler(item._id)} className={styles.button}>삭제</button></td>
                            </tr>
                        )
                    }
                    }
                    )
                }
                </tbody>
            </table>
            <Pagination pageSize={limit} currentPage={currentPage} onPageChange={handlePageChange}/>
        </div>
    )
}

export default Mylist
