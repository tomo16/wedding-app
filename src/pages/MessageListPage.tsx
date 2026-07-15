import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

type Message = {
  id: string;
  name: string;
  text: string;
  time: string;
  side: 'groom' | 'bride';
};

const MessageListPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'groom' | 'bride'>('all');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('time', 'desc')); // 最新順

    const unsub = onSnapshot(q, (snapshot) => {
      const list: Message[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        let timeString = '';
        if (data.time?.seconds) {
          timeString = new Date(data.time.seconds * 1000).toLocaleString(
            'ja-JP',
          );
        } else {
          timeString = data.time;
        }

        return {
          id: doc.id,
          name: data.name,
          text: data.text,
          time: timeString,
          side: data.side,
        };
      });

      setMessages(list);
    });

    return () => unsub();
  }, []);
  const filteredMessages = messages.filter(
    (msg) => filter === 'all' || msg.side === filter,
  );
  return (
    <div
      style={{
        minHeight: '100dvh',
        background:
          'linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)',
      }}
    >
      <Header title="" />

      <div
        style={{
          paddingTop: '80px',
          paddingBottom: '40px',
          maxWidth: '900px',
          margin: '0 auto',
          paddingInline: '18px',
        }}
      >
        {/* タイトル */}
        <div
          style={{
            width: 80,
            height: 2,
            background: '#d7b8ff',
            margin: '0 auto 24px',
          }}
        />

        <h1
          style={{
            fontSize: '34px',
            color: '#5C4567',
            fontWeight: 700,
            marginBottom: '8px',
            fontFamily: '"Cormorant Garamond", serif',
            textAlign: 'center',
          }}
        >
          Guest Messages
        </h1>

        <div
          style={{
            color: '#C9A44C',
            letterSpacing: '3px',
            fontSize: '15px',
            marginBottom: '28px',
            textAlign: 'center',
          }}
        >
          Message Board
        </div>

        {/* フィルター */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '28px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { key: 'all', label: '全件' },
            { key: 'groom', label: '新郎側' },
            { key: 'bride', label: '新婦側' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as typeof filter)}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                border: '1px solid #F0E6F6',
                background:
                  filter === item.key
                    ? 'linear-gradient(90deg,#DFA9D6,#C08ED7)'
                    : 'rgba(255,255,255,.9)',
                color: filter === item.key ? '#fff' : '#5C4567',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow:
                  filter === item.key
                    ? '0 6px 16px rgba(217,156,199,.25)'
                    : '0 3px 10px rgba(0,0,0,.05)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* メッセージなし */}
        {filteredMessages.length === 0 ? (
          <div
            style={{
              background: 'rgba(255,255,255,.92)',
              borderRadius: '24px',
              padding: '50px',
              textAlign: 'center',
              color: '#8B768F',
              boxShadow: '0 8px 30px rgba(0,0,0,.08)',
            }}
          >
            まだメッセージはありません。
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '18px',
              justifyContent: 'center',
            }}
          >
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  width: '260px',
                  background: 'rgba(255,255,255,.92)',
                  borderRadius: '22px',
                  padding: '18px',
                  border: '1px solid #F3E5FA',
                  boxShadow: '0 8px 24px rgba(0,0,0,.08)',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    color: '#5C4567',
                    fontWeight: 700,
                    fontSize: '16px',
                    marginBottom: '12px',
                  }}
                >
                  {msg.name}
                </div>

                <div
                  style={{
                    color: '#555',
                    lineHeight: 1.8,
                    fontSize: '14px',
                    whiteSpace: 'pre-wrap',
                    minHeight: '90px',
                  }}
                >
                  {msg.text}
                </div>

                <div
                  style={{
                    marginTop: '18px',
                    paddingTop: '12px',
                    borderTop: '1px solid #F3E5FA',
                    color: '#A88BBF',
                    fontSize: '12px',
                    textAlign: 'right',
                  }}
                >
                  {msg.side === 'groom' ? '🤵 新郎側' : '👰 新婦側'}
                  <br />
                  {msg.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageListPage;
