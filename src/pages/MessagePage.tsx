import React, { useState } from "react";
import Header from "../components/Header";
import {
  addDoc,
  collection,
  Timestamp,
  // doc,
  // deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const MessagePage: React.FC = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [side, setSide] = useState<'groom' | 'bride' | ''>('');



  // 名前読み込み
  const handleSubmit = async () => {
    if (!name.trim() || !text.trim() || !side) {
      setErrorMessage('お名前・ご関係（新郎側/新婦側）・メッセージを入力してください！');
      setShowErrorModal(true);
      return;
    }

    const newMessage = { name, text, side,time: Timestamp.now() };

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
    <div style={{ paddingBottom: '40px', backgroundColor: '#ffe6f5' }}>
      <Header title=" メッセージ" />

      {/* --- 注意書き（固定） --- */}
      <div
        style={{
          position: 'fixed',
          top: '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '95%',
          maxWidth: '500px',
          background: '#FFF7E6',
          padding: '10px 14px',
          borderRadius: '10px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          zIndex: 25,
          color: '#8A5B00',
          fontSize: '14px',
          textAlign: 'left',
          backgroundColor: '#ffe6f5',
        }}
      >
        新郎新婦に向けて、メッセージをお寄せください！
        <br />
        いただいたメッセージは後日、
        <br />
        二人で大切に読ませていただきます。
        <br />
        また、投稿前に下記のご確認をお願いします。
        <br />
        <br />
        ・お名前は、新郎新婦がわかる名前でお願いします。
        <br />
        ・公序良俗に反する投稿は控えてください。
        <br />・<strong>Twitter</strong> 風のつぶやき投稿も大歓迎です。
        <br />
        ・投稿は複数回可能です。
        <br />
      </div>

      {/* --- フォーム固定 --- */}
      <div
        style={{
          position: 'fixed',
          top: '350px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '95%',
          maxWidth: '500px',
          background: 'white',
          padding: '12px',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          zIndex: 20,
          backgroundColor: '#ffe6f5',
        }}
      >
        <h3 style={{ marginTop: 0 }}>✏️ メッセージを書く</h3>

        <input
          type="text"
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '94%',
            padding: '10px',
            marginBottom: '8px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <div style={{ marginBottom: '12px' }}>
          <label>
            <input
              type="radio"
              value="groom"
              checked={side === 'groom'}
              onChange={() => setSide('groom')}
            />
            新郎側
          </label>

          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              value="bride"
              checked={side === 'bride'}
              onChange={() => setSide('bride')}
            />
            新婦側
          </label>
        </div>

        <textarea
          placeholder="メッセージ"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '94%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginBottom: '6px',
            fontSize: '16px',
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '8px',
            background: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
          }}
        >
          送信する
        </button>
      </div>

      {/* --- 送信完了モーダル --- */}
      {showSuccessModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100dvh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '24px',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '360px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
          >
            <h3 style={{ marginTop: 0 }}>🎉 送信完了</h3>

            <p style={{ fontSize: '14px', lineHeight: 1.6 }}>
              メッセージを送信しました。
              <br />
              新郎新婦にしっかり届いています！
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              style={{
                marginTop: '16px',
                padding: '10px 20px',
                background: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* --- 入力エラーモーダル --- */}
      {showErrorModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100dvh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '24px',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '360px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
          >
            <h3 style={{ marginTop: 0, color: '#D32F2F' }}>
              ⚠️ 入力してください
            </h3>

            <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{errorMessage}</p>

            <button
              onClick={() => setShowErrorModal(false)}
              style={{
                marginTop: '16px',
                padding: '10px 20px',
                background: '#D32F2F',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage;
