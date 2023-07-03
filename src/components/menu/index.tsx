import styles from './index.module.css';
import homeIcon from '../../assets/icons/home.svg';
import messageIcon from '../../assets/icons/message-menu.svg';
import menuIcon from '../../assets/icons/menu.svg';

import { useCookies } from 'react-cookie';
import { FC, useCallback, useContext } from 'react';
import { AppContext } from '../../context';
import { useLocalization } from '../../hooks';
import toast from 'react-hot-toast';

const Menu: FC = () => {
  const t = useLocalization();
  const [cookies, setCookies] = useCookies();
  const context = useContext(AppContext);
  // const router = useRouter();

  const urlChanger = (link: string) => {
    // if (cookies['access_token'] !== undefined) {
      if(link === '/history' && context?.loading){   
        toast.error(`${t("error.wait_new_chat")}`);
        return;        
    }
      // router.push(link);
    // }
  };

  const homeUrlChanger = useCallback(() => {
    // if (cookies['access_token'] !== undefined) {
      if(context?.messages?.length !== 0){
        // router.push('/chat');
      }
      // else router.push('/');
    // }
  }, [context?.messages, cookies]);

  return (
    <div className={styles.menu}>
      <div onClick={homeUrlChanger}>
        <img alt="homeIcon" src={homeIcon} width={25} height={25} />
      </div>
      <div onClick={() => urlChanger('/history')}>
        <img alt="messageIcon" src={messageIcon} width={25} height={25} />
      </div>
      <div onClick={() => urlChanger('/more')}>
        <img alt="menuIcon" src={menuIcon} width={25} height={25} />
      </div>
    </div>
  );
};

export default Menu;
