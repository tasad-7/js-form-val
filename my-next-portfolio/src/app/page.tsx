'use client';
import styles from "./page.module.css";
import Image from 'next/image'
import car from "../../public/car.png"
import lake from "../../public/lake.png"
import beach from "../../public/beach.png"
import {motion} from 'framer-motion'

export default function Home() {
  return (
    <main className={styles.main}>
     
      <video src={require('../../public/faisalMosque.mp4')} autoPlay muted loop className={styles.video}/>


<motion.div className={styles.text} initial='hidden' animate='visible' variants={{
  hidden: {
    scale: 0.8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.4
    }
  }
}}>
      
<h1>Welcome</h1>
<p>to my site</p>
      
      </motion.div>


      <div className={styles.leftContainer}>
        <div className={styles.brownText}>
        <h1>Welcome</h1>
        <p>to my site</p> 
        </div>

        <Image
              src={car}
              width={800}
              height={500}
              alt="Picture of the author"
            />

      </div>


      <div className={styles.rightContainer}>

        <Image
              src={lake}
              width={800}
              height={500}
              alt="Picture of the author"
            />

<div className={styles.lightText}>
        <h1>Welcome</h1>
        <p>to my site</p> 
        </div>

      </div>


      <div className={styles.last}>
<div className={styles.lightText}>
<h1>Welcome</h1>
<p>to my site</p> 
</div>

<Image
      src={beach}
      width={800}
      height={500}
      alt="Picture of the author"
    />
    
</div>

    </main>
  );
}
