import React from 'react'
import styles from './main.module.css'
import Identity from './sections/identity'
import Landing from './sections/landing'
const Main = () => {
  return (
    <section className={styles.main}>
      <Identity />
      <h1 className={styles.title}>Recent Project >></h1>
      <Landing cate="0" />
      <button className={styles.button}>more</button>
      <h1 className={styles.title}>Recent People >></h1>
      <Landing cate="1" />
      <button className={styles.button}>more</button>
    </section>
  )
}

export default Main
