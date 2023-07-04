import styles from './index.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import ChatItem from '../chat-item';

import Menu from '../menu';
import { useLocalization } from '../../hooks';
import ComingSoonPage from '../coming-soon-page';
import axios from 'axios';
import _ from 'underscore';
const HistoryPage = () => {
  const [conversations, setConversations] = useState([]);
  const t = useLocalization();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/conversations`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      })
      .then((res) => {
        const sortedConversations = _.filter(
          res?.data?.userHistory,
          (conv) => conv?.conversationId !== null
        ).sort(
          //@ts-ignore
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        //@ts-ignore
        setConversations(sortedConversations);
        console.log('hie', sortedConversations);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to delete conversation by conversationId
  const deleteConversationById = useCallback(
    (conversationIdToDelete: any) => {
      const filteredConversations = [...conversations].filter(
        (conversation: any) =>
          conversation.conversationId !== conversationIdToDelete
      );
      setConversations(filteredConversations);
    },
    [conversations]
  );

  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>{t('label.chats')}</div>
        {/* <InputGroup>
            <InputLeftElement pointerEvents="none">
              <img src={searchIcon} alt="" width={20} height={20} />
            </InputLeftElement>
            <Input type="text" placeholder="Search" />
          </InputGroup> */}
        <div>
          {conversations.length > 0 ? (
            conversations.map((conv: any) => {
              return (
                <ChatItem
                  key={conv.id}
                  name={conv.query}
                  conversationId={conv.conversationId}
                  deleteConversationById={deleteConversationById}
                />
              );
            })
          ) : (
            <div className={styles.noHistory}>
              <div>{t('label.no_history')}</div>
              <p>{t('message.no_history')}</p>
            </div>
          )}
        </div>
      </div>
      <Menu />
    </>
  );
};

export default HistoryPage;
