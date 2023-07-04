import React, { useCallback, useContext, useState } from 'react';
import styles from './index.module.css';
import { ChatItemPropsType } from '../../types';
import messageIcon from '../../assets/icons/message.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../context';
import { useLocalization } from '../../hooks';

const ChatItem: React.FC<ChatItemPropsType> = ({
  name,
  conversationId,
  deleteConversationById,
}) => {
  const context = useContext(AppContext);
  const t = useLocalization();
  const [isConversationDeleted, setIsConversationDeleted] = useState(false);
  let navigate = useNavigate();
  const handleChatPage = useCallback(() => {
    sessionStorage.setItem('conversationId', conversationId || 'null');
    context?.setConversationId(conversationId);
    navigate('/chat');
  }, [context, conversationId]);

  const deleteConversation = useCallback(() => {
    const confirmed = window?.confirm(`${t('label.confirm_delete')}`);
    if (confirmed) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/user/conversations/delete/${conversationId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('auth')}`,
            },
          }
        )
        .then((res) => {
          console.log('deleting conversation');
          if (conversationId === sessionStorage.getItem('conversationId')) {
            const newConversationId = uuidv4();
            sessionStorage.setItem('conversationId', newConversationId);
            context?.setConversationId(newConversationId);
            context?.setMessages([]);
          }
          deleteConversationById(conversationId);
          setIsConversationDeleted(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [context, conversationId, deleteConversationById, t]);

  return (
    <>
      {!isConversationDeleted && (
        <div className={styles.chatContainer}>
          <div className={styles.sessionContainer} onClick={handleChatPage}>
            <div className={styles.messageIconContainer}>
              <img src={messageIcon} alt="messageIcon" />
            </div>
            <div className={styles.name}>{name}</div>
          </div>
          <div
            onClick={deleteConversation}
            className={styles.deleteIconContainer}>
            <img src={deleteIcon} alt="deleteIcon" width={25} height={25} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatItem;
