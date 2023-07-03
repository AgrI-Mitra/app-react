'use client';
import Menu from '../menu';
import styles from './index.module.css';

import downTimeIcon from '../../assets/icons/down-time.svg';
import { useLocalization } from '../../hooks';

function DownTimePage() {
  const t = useLocalization();
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={downTimeIcon} alt="downTimeIcon" width={25} height={25} />
      </div>
      <span>{t("message.temporarily_down")}</span>
      <p className={styles.miniText}>
        {t("message.temporarily_down_description")}
      </p>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => window?.location.reload()}>
        {t("message.down_time_retry")}
      </button>
      <Menu />
    </div>
  );
}

export default DownTimePage;

