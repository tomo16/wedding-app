import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import {
  addDoc,
  collection,
  Timestamp,
  // doc,
  // deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const MessagePage: React.FC = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [side, setSide] = useState<'groom' | 'bride' | ''>('');

  // スクロール位置リセット
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // 名前読み込み
  const handleSubmit = async () => {
    if (!name.trim() || !text.trim() || !side) {
      setErrorMessage(
        'お名前・ご関係（新郎側/新婦側）・メッセージを入力してください！',
      );
      setShowErrorModal(true);
      return;
    }

    const newMessage = { name, text, side, time: Timestamp.now() };

    try {
      await addDoc(collection(db, 'messages'), newMessage);

      localStorage.setItem('guestName', name);
      setText('');

      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (err) {
      console.error('メッセージ送信失敗', err);
    }
  };

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
          maxWidth: '430px',
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
            fontSize: '36px',
            color: '#5C4567',
            fontFamily: '"Cormorant Garamond", serif',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          Messages
        </h1>

        <div
          style={{
            color: '#C9A44C',
            letterSpacing: '3px',
            textAlign: 'center',
            marginBottom: '18px',
          }}
        >
          Leave a Message
        </div>

        <p
          style={{
            color: '#6F5E72',
            lineHeight: 1.8,
            fontSize: '14px',
            textAlign: 'center',
            marginBottom: '28px',
          }}
        >
          新郎新婦へ
          <br />
          あたたかいメッセージをお送りください
        </p>

        {/* Message Guide */}

        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
            marginBottom: '26px',
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: '18px',
              textAlign: 'center',
              fontSize: '26px',
              color: '#5C4567',
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            Message Guide
          </h3>

          <div
            style={{
              width: 50,
              height: 1,
              background: '#D6B4E8',
              margin: '0 auto 20px',
            }}
          />

          <div
            style={{
              color: '#555',
              lineHeight: 1.9,
              fontSize: '15px',
            }}
          >
            <p style={{ marginTop: 0 }}>
              新郎新婦に向けて、
              <br />
              ぜひメッセージをお寄せください。
            </p>

            <p>
              いただいたメッセージは、
              <br />
              後日ふたりで大切に読ませていただきます。
            </p>

            <div
              style={{
                height: 1,
                background: 'rgba(92,69,103,.12)',
                margin: '20px 0',
              }}
            />

            <div style={{ color: '#6F5E72' }}>
              ✓ お名前は新郎新婦が分かるお名前でお願いします。
              <br />
              ✓ 新郎側・新婦側をご選択ください。
              <br />
              ✓ 公序良俗に反する内容はご遠慮ください。
              <br />
              ✓ Twitter風の一言投稿も大歓迎です。
              <br />✓ 投稿は何度でも可能です。
            </div>
          </div>
        </div>

        {/* ↓ここからMessage Formカード */}
        {/* Message Form */}

        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
            marginBottom: '30px',
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: '18px',
              textAlign: 'center',
              fontSize: '26px',
              color: '#5C4567',
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            Message Form
          </h3>

          <div
            style={{
              width: 50,
              height: 1,
              background: '#D6B4E8',
              margin: '0 auto 24px',
            }}
          />

          {/* 名前 */}

          <input
            type="text"
            placeholder="お名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '14px',
              border: '1px solid #E8DAF2',
              background: '#FCFAFD',
              fontSize: '15px',
              marginBottom: '18px',
              boxSizing: 'border-box',
            }}
          />

          {/* 新郎側・新婦側 */}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '28px',
              marginBottom: '20px',
              color: '#5C4567',
              fontSize: '15px',
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                checked={side === 'groom'}
                onChange={() => setSide('groom')}
              />
              新郎側
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                checked={side === 'bride'}
                onChange={() => setSide('bride')}
              />
              新婦側
            </label>
          </div>

          {/* メッセージ */}

          <textarea
            rows={6}
            placeholder="メッセージを入力してください..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid #E8DAF2',
              background: '#FCFAFD',
              resize: 'vertical',
              fontSize: '15px',
              lineHeight: 1.8,
              marginBottom: '24px',
              boxSizing: 'border-box',
            }}
          />

          {/* 送信ボタン */}

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '16px',
              border: 'none',
              borderRadius: '999px',
              background: 'linear-gradient(90deg,#D99CC7,#C08ED7)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(192,142,215,.35)',
              transition: '.2s',
            }}
          >
            メッセージを送る
          </button>
        </div>

        {/* --- 送信完了モーダル --- */}
        {showSuccessModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(45,35,55,.55)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '24px',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '340px',
                background: 'rgba(255,255,255,.96)',
                backdropFilter: 'blur(12px)',
                borderRadius: '26px',
                padding: '30px 26px',
                textAlign: 'center',
                boxShadow: '0 18px 40px rgba(0,0,0,.18)',
              }}
            >
              <div
                style={{
                  fontSize: '52px',
                  marginBottom: '12px',
                }}
              >
                💌
              </div>

              <h2
                style={{
                  margin: 0,
                  color: '#5C4567',
                  fontSize: '30px',
                  fontFamily: '"Cormorant Garamond", serif',
                }}
              >
                Thank You
              </h2>

              <div
                style={{
                  width: 60,
                  height: 1,
                  background: '#D6B4E8',
                  margin: '18px auto 22px',
                }}
              />

              <p
                style={{
                  color: '#555',
                  lineHeight: 1.8,
                  fontSize: '15px',
                  marginBottom: '28px',
                }}
              >
                メッセージを送信しました。
                <br />
                新郎新婦へ大切にお届けします。
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: 'none',
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg,#D99CC7,#C08ED7)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(192,142,215,.35)',
                }}
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        {/* --- 入力エラーモーダル --- */}
        {showErrorModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(45,35,55,.55)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '24px',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '340px',
                background: 'rgba(255,255,255,.96)',
                backdropFilter: 'blur(12px)',
                borderRadius: '26px',
                padding: '30px 26px',
                textAlign: 'center',
                boxShadow: '0 18px 40px rgba(0,0,0,.18)',
              }}
            >
              <div
                style={{
                  fontSize: '50px',
                  marginBottom: '12px',
                }}
              >
                ⚠️
              </div>

              <h2
                style={{
                  margin: 0,
                  color: '#5C4567',
                  fontSize: '30px',
                  fontFamily: '"Cormorant Garamond", serif',
                }}
              >
                Input Required
              </h2>

              <div
                style={{
                  width: 60,
                  height: 1,
                  background: '#D6B4E8',
                  margin: '18px auto 22px',
                }}
              />

              <p
                style={{
                  color: '#555',
                  lineHeight: 1.8,
                  fontSize: '15px',
                  marginBottom: '28px',
                }}
              >
                {errorMessage}
              </p>

              <button
                onClick={() => setShowErrorModal(false)}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: 'none',
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg,#D99CC7,#C08ED7)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(192,142,215,.35)',
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
