import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import QRCode from 'react-qr-code';
import { db } from '../firebase';
import type { User } from '../types/User';

export default function GuestQrPage() {
  const { code } = useParams<{ code: string }>();

  const [guest, setGuest] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [kanji, kana] = guest?.name.split('（') || ['', ''];
  const furigana = kana?.replace('）', '');

  useEffect(() => {
    const fetchGuest = async () => {
      if (!code) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'guest'),
          where('code', '==', code)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];

          setGuest({
            id: doc.id,
            ...(doc.data() as Omit<User, 'id'>),
          });
        }
      } catch (error) {
        console.error('ゲスト情報の取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
  }, [code]);

  // ローディング画面
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background:
            'linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)',
          padding: '24px',
        }}
      >
        <div>
          {/* 上部ライン */}
          <div
            style={{
              width: '60px',
              height: '2px',
              background: '#d7b8ff',
              margin: '0 auto 24px',
            }}
          />

          <div
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '32px',
              fontWeight: 700,
              color: '#5C4567',
              letterSpacing: '1px',
              marginBottom: '8px',
            }}
          >
            T & H Wedding
          </div>

          <div
            style={{
              color: '#c9a44c',
              letterSpacing: '4px',
              fontSize: '14px',
              fontFamily: '"Cormorant Garamond", serif',
              marginBottom: '32px',
            }}
          >
            Reception QR
          </div>

          {/* ローディング */}
          <div
            style={{
              width: '34px',
              height: '34px',
              border: '3px solid #E8DDF0',
              borderTop: '3px solid #A88BBF',
              borderRadius: '50%',
              margin: '0 auto 18px',
              animation: 'spin 1s linear infinite',
            }}
          />

          <div
            style={{
              color: '#6F5E72',
              fontSize: '15px',
              lineHeight: 1.8,
            }}
          >
            受付用QRコードを
            <br />
            準備しています
          </div>

          <style>
            {`
              @keyframes spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  if (!guest) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background:
            'linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)',
          padding: '24px',
          color: '#6F5E72',
          lineHeight: 1.8,
        }}
      >
        ゲスト情報が見つかりません。
      </div>
    );
  }

  const receptionUrl =
    `${window.location.origin}/reception/${guest.code}`;

  return (
    <div
      style={{
        minHeight: '100dvh',
        textAlign: 'center',
        background:
          'linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)',
        padding: '24px 18px 40px',
      }}
    >
      {/* タイトル */}
      <div style={{ marginTop: '10px' }}>
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
            fontSize: '38px',
            color: '#5C4567',
            marginBottom: '8px',
            fontWeight: 700,
            letterSpacing: '1px',
            fontFamily: '"Cormorant Garamond", serif',
          }}
        >
          T & H Wedding
        </h1>

        <div
          style={{
            color: '#c9a44c',
            letterSpacing: '4px',
            fontSize: '16px',
            marginBottom: '30px',
            fontFamily: '"Cormorant Garamond", serif',
          }}
        >
          Reception QR
        </div>
      </div>

      {/* QRカード */}
      <div
        style={{
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '24px',
          padding: '32px 24px',
          maxWidth: '410px',
          margin: '0 auto',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        }}
      >
        {/* 名前 */}
        <div
          style={{
            color: '#5A476F',
            fontSize: '22px',
            fontWeight: 600,
            marginBottom: '6px',
          }}
        >
          {kanji} 様
        </div>

        {furigana && (
          <div
            style={{
              color: '#8B768F',
              fontSize: '14px',
              marginBottom: '24px',
            }}
          >
            {furigana}
          </div>
        )}

        <div
          style={{
            width: '60px',
            height: '1px',
            background: '#E6D6B8',
            margin: '0 auto 24px',
          }}
        />

        <p
          style={{
            color: '#6F5E72',
            fontSize: '15px',
            lineHeight: 1.8,
            marginBottom: '24px',
          }}
        >
          受付にてこちらのQRコードを
          <br />
          ご提示ください
        </p>

        {/* QR */}
        <div
          style={{
            display: 'inline-block',
            background: '#fff',
            padding: '18px',
            borderRadius: '18px',
            border: '1px solid #F0E6F6',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <QRCode
            value={receptionUrl}
            size={220}
          />
        </div>

        {/* スクショ案内 */}
        <div
          style={{
            marginTop: '28px',
            padding: '16px 14px',
            borderRadius: '16px',
            background: '#FBF7FD',
            border: '1px solid #E9DDF0',
          }}
        >
          <div
            style={{
              color: '#5C4567',
              fontSize: '15px',
              fontWeight: 600,
              marginBottom: '6px',
            }}
          >
            📸 この画面をスクリーンショット
          </div>

          <div
            style={{
              color: '#7B697F',
              fontSize: '13px',
              lineHeight: 1.8,
            }}
          >
            事前にスクリーンショットを
            <br />
            保存しておくと安心です。
            <br />
            当日は保存した画像を受付スタッフに
            <br />
            ご提示ください。
          </div>
        </div>
      </div>

      {/* フッター */}
      <div
        style={{
          marginTop: '35px',
          color: '#a88bbf',
          fontSize: '13px',
          lineHeight: 1.8,
        }}
      >
        Thank you for celebrating with us.
        <br />
        Please enjoy this special day.
        <br />
        2026.09.26
      </div>
    </div>
  );
}