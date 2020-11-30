import React, { useState } from 'react'
import styles from './uploadForm.module.css'
import axios from 'axios'
import Main from '../main/main'
const UploadForm = (props) => {

    const [Images, setImages] = useState([]);
    const [category, setCategory] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [departs, setDepart] = useState([
        { key: 0, value: false, name: "기획/마케팅" },
        { key: 1, value: false, name: "디자인" },
        { key: 2, value: false, name: "프론트엔드" },
        { key: 3, value: false, name: "백엔드" },]);

    const [contact, setContact] = useState("");

    const dropHandler = (e) => {
        
        let formData = new FormData();
        formData.append('file', e.target.files[0])

        const config = { header: { 'content-type': 'multipart/form-data' } }
        axios.post('/api/team/image', formData, config)
            .then(res => {
                if (res.data.success) {
                    const filePath = "uploads/" + res.data.filePath.substring(8);
                    setImages([...Images, filePath]);
                    console.log(Images);
                } else {
                    alert("이미지 업로드에 실패했습니다.")
                }
            })
    }
    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images];
        newImages.splice(currentIndex, 1)
        setImages(newImages);
    }


    const radioHandler = (e) => setCategory(parseInt(e.currentTarget.value));
    const nameChangeHandler = (e) => setName(e.currentTarget.value);
    const descChangeHandler = (e) => setDescription(e.currentTarget.value);
    const contactChangeHandler = (e) => setContact(e.currentTarget.value);
    const departChangeHandler = (e) => {
        const checked = parseInt(e.currentTarget.value);
        let tmpDepart = [...departs].map(depart => {
            if (depart.key === checked)
                return { ...depart, value: !depart.value }
            return depart
        })
        setDepart(tmpDepart);
    }

    const submitHandle = (e) => {
        e.preventDefault();
        let tmpDepart = [];
        for (let i = 0; i < departs.length; i++) {
            if (departs[i].value) { tmpDepart.push(departs[i].key); }
        }

        if (!name || !description || !tmpArray || !contact || Images.length === 0) {
            return alert("모든 항목을 입력해주세요.");
        }

        const body = {
            writer: props.user.userData._id,
            category: category,
            name: name,
            description: description,
            images: Images,
            depart: tmpDepart,
            contact: contact
        }

        axios.post('/api/team', body)
            .then(res => {
                if (res.data.success) {
                    alert("글 작성을 완료했습니다.")
                    props.history.push("/")
                } else {
                    alert("글 작성을 실패했습니다.")
                }
            })
    }

    return (
        <>
            <Main />
            <div className={styles.uploadForm}>
                <form className={styles.form} onSubmit={submitHandle}>
                    <div className={styles.dropzoneContainer}>
                        <label htmlFor="input-file" className={styles.dropzone}>+</label>
                        <input
                            type="file"
                            style={{ display: "none" }}
                            id="input-file"
                            onChange={(e) => { dropHandler(e) }}
                        />
                        <div className={styles.images}>
                            {Images.map((image, idx) => (
                                <div onClick={() => deleteHandler(image)} key={idx}>
                                    <img src={`http://localhost:5000/${image}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.radioContainer}>
                        <p style={{ display: 'inline-block', marginRight: '1em' }}>Category</p>
                        <label>
                            <input
                                name="category"
                                type="radio"
                                value="0"
                                defaultChecked
                                onChange={radioHandler}
                            />
                        인재찾기
                    </label>
                        <label>
                            <input

                                name="category"
                                type="radio"
                                value="1"
                                onChange={radioHandler}
                            />
                        팀원모집
                    </label>
                    </div>
                    <input className={styles.input} type="text" className={styles.input} value={name} onChange={nameChangeHandler} placeholder="팀이름" />
                    <textarea className={styles.input} rows="20" placeholder="팀설명" value={description} onChange={descChangeHandler}></textarea>
                    <div className={styles.checkContainer}>
                        {departs.map(item => (
                            <label key={item.key} style={{ display: 'inline-block', width: '8em' }}>
                                <input type="checkbox" value={item.key} onChange={departChangeHandler} />
                                {item.name}
                            </label>
                        ))}
                    </div>
                    <textarea value={contact} onChange={contactChangeHandler} className={styles.input} rows="10" placeholder="연락할 수 있는 경로를 모두 입력해주세요. 예시) 카카오톡 아이디: asdfs, 연락처: 010-xxxx-xxxx"></textarea>
                    <button type="submit">작성하기</button>
                </form>
            </div>
        </>
    )
}

export default UploadForm
