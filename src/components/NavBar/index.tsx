import { useState, useContext, useCallback, useEffect } from 'react';
import styles from './index.module.css';
import PhoneImg from '../../assets/images/phone.png';
import MOA from '../../assets/images/MOA_logo.png';
import Emblem from '../../assets/images/emblem.png';
import plusIcon from '../../assets/icons/plus.svg';
import { AppContext } from '../../context';
import { v4 as uuidv4 } from 'uuid';
import { useLocalization } from '../../hooks';
import toast from 'react-hot-toast';
import { Select, MenuItem } from '@material-ui/core';
import { useNavigate, useLocation } from "react-router-dom";

function NavBar() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const context = useContext(AppContext);
  let navigate = useNavigate();
  let location = useLocation();
  const t = useLocalization();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('locale');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }else{
      localStorage.setItem('locale', 'en');
    }
  }, []);

  const toggleLanguage = useCallback(
    (event:any) => {
      const newLanguage = event.target.value;
      localStorage.setItem('locale', newLanguage);
      context?.setLocale(newLanguage);
      setSelectedLanguage(newLanguage);
    },
    [context]
  );

  const newChatHandler = useCallback(() => {
    if (context?.loading) {
      toast.error(`${t('error.wait_new_chat')}`);
      return;
    }
    const newConversationId = uuidv4();
    sessionStorage.setItem('conversationId', newConversationId);
    context?.setConversationId(newConversationId);
    context?.setMessages([]);
    context?.setIsMsgReceiving(false);
    context?.setLoading(false);
    navigate('/')
  }, [context, navigate, t]);

  if (location.pathname === '/chat' && !context?.isDown) {
    return (
      <div className={styles.navbar2}>
        <div className={styles.newChatContainer}>
          <div
            onClick={() => newChatHandler()}
            className={styles.iconContainer}>
            <img src={plusIcon} alt="plusIcon" width={25} height={25} />
          </div>
          <p>{t('label.new_chat')}</p>
        </div>
        <div className={styles.navbarHeading}>{t('label.title')}</div>
        <div className={styles.rightSideIcons}>
          <div className={styles.imageContainer}>
            <img src={PhoneImg} alt="" width={40} height={40} />
            <img src={MOA} alt="" width={40} height={40} />
            <img src={Emblem} alt="" width={30} height={40} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.navbar}>
        <div className={styles.newChatContainer}>
          <Select value={selectedLanguage} onChange={toggleLanguage}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">Hindi</MenuItem>
            <MenuItem value="bn">Bangla</MenuItem>
            <MenuItem value="ta">Tamil</MenuItem>
            <MenuItem value="te">Telugu</MenuItem>
          </Select>
        </div>
        <div className={styles.navbarHeading}>{t('label.title')}</div>
        <div className={styles.rightSideIcons}>
          <div className={styles.imageContainer}>
            <img src={PhoneImg} alt="" width={60} height={60} />
            <img src={MOA} alt="" width={60} height={60} />
            <img src={Emblem} alt="" width={45} height={60} />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
