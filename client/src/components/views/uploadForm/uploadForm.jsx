import React, {useState} from 'react'
import styles from './uploadForm.module.css'
import axios from 'axios'

const UploadForm = (props) => {

    const [Images, setImages] = useState([]);

    const dropHandler = (e) => {
        let formData = new FormData();
        formData.append('file', e.target.files[0])

        const config = { header: {'content-type': 'multipart/form-data'} }
        axios.post('/api/team/image', formData, config)
            .then(res => {
                if(res.data.success){
                    const filePath = "uploads/"+res.data.filePath.substring(8);
                    setImages([...Images, filePath]);
                    console.log(Images);
                }else {
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

    const submitHandle = (e) => {
        e.preventDefault();
        console.log("hi")
    }
    return (
        <div  className={styles.uploadForm}>
            <form className={styles.form} onSubmit={submitHandle}>
                <div className={styles.dropzoneContainer}>
                <label htmlFor="input-file" className={styles.dropzone}>+</label>
                <input type="file" style={{display:"none"}} id="input-file" name="file" onChange={(e) => {dropHandler(e)}}/>
                <div className={styles.images}>
                    {Images.map((image, idx) => (
                        <div onClick={() => deleteHandler(image)} key={idx}>
                            <img src={`http://localhost:5000/${image}`}/>
                        </div>
                    ))}
                </div>
                </div>
                <input type="text" className={styles.input} placeholder="라디오버튼"/>
                <input type="text" className={styles.input} placeholder="팀이름"/>
                <textarea name="" id="" cols="30" rows="10" className={styles.textarea} placeholder="팀설명"></textarea>
                <input type="text" className={styles.input} placeholder="체크박스"/>
                <textarea name="" id="" cols="30" rows="10" className={styles.textarea} placeholder="연락처"></textarea>
            </form>
        </div>
    )
}

export default UploadForm
