import styles from './index.module.css';
import Logo from "../../assets/images/MOA_logo.png";

function LaunchPage() {
  return (
    <div className={`${styles.container}`}>
      <img
              className={styles.loginImage}
              src={Logo}
              alt="Logo"
              width={235}
              height={235}
            />
            <span>AgrI-Mitra</span>
    </div>
  )
}

export default LaunchPage