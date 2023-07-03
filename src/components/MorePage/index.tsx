import styles from './index.module.css';
import React, { useContext, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/router';
import logoutIcon from '../../assets/icons/logout.svg';
import userCircleIcon from '../../assets/icons/user-circle.svg';
import userAltIcon from '../../assets/icons/user-alt.svg';
import questionMarkIcon from '../../assets/icons/question-mark.svg';
import thumbsUpIcon from '../../assets/icons/thumbs-up.svg';
import RightIcon from '../../assets/icons/right.jsx';

import { useCookies } from 'react-cookie';
import Menu from '../menu';
import { useLocalization } from '../../hooks';
import { AppContext } from '../../context';

const MorePage: React.FC = () => {
  // const router = useRouter();
  const context = useContext(AppContext);
  const [cookie, setCookie, removeCookie] = useCookies();
  const t=useLocalization();

  function logout() {
    removeCookie('access_token', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
    context?.setMessages([]);
    // router.push('/');
    if(typeof window !== "undefined") window?.location.reload();
  }

  const [welcome, profile, faqs, feedback, logoutLabel, more] =useMemo(()=>[t('label.welcome'),t('label.profile'),t('label.faqs'),t('label.feedback'),t('label.logout'),t('label.more')],[t])
  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>{more}</div>

        <div className={styles.user}>
          <div className={styles.icon1}>
            <img src={userCircleIcon} alt="" width={25} height={25} />
          </div>
          <div className={styles.userInfo}>
            <p style={{ fontWeight: 'bold' }}>{welcome}</p>
            <p style={{ color: 'var(--grey)' }}>
              {localStorage.getItem('phoneNumber') && `+91 ${localStorage.getItem('phoneNumber')}`}
            </p>
          </div>
        </div>
        <div className={styles.user}>
          <div className={styles.icon2}>
            <img src={userAltIcon} alt="" width={25} height={25}/>
          </div>
          <div className={styles.userInfo2}>
            <p style={{ fontWeight: 'bold' }}>{profile}</p>
          </div>
          <div className={styles.icon3}>
          <RightIcon width="5.5vh" color="black" />
          </div>
        </div>
        <div className={styles.user}>
          <div className={styles.icon2}>
            <img src={questionMarkIcon} alt="" width={25} height={25} />
          </div>
          <div className={styles.userInfo2}>
            <p style={{ fontWeight: 'bold' }}>{faqs}</p>
          </div>
          <div className={styles.icon3}>
          <RightIcon width="5.5vh" color="black" />
          </div>
        </div>
        <div className={styles.user}>
          <div className={styles.icon2}>
            <img src={thumbsUpIcon} alt="" width={25} height={25} />
          </div>
          <div className={styles.userInfo2}>
            <p style={{ fontWeight: 'bold' }}>{feedback}</p>
          </div>
          <div className={styles.icon3}>
          <RightIcon width="5.5vh" color="black" />
          </div>
        </div>
        <div className={styles.user} onClick={() => logout()}>
          <div className={styles.icon2}>
            <img src={logoutIcon} alt="" width={25} height={25} />
          </div>
          <div className={styles.userInfo2}>
            <p style={{ fontWeight: 'bold' }}>{logoutLabel}</p>
          </div>
          <div className={styles.icon3}>
            <RightIcon width="5.5vh" color="black" />
          </div>
        </div>
      </div>
      <Menu />
    </>
  );
};

export default MorePage;
