import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import QRCode from 'react-qr-code';
import { db } from '../firebase';
import Header from '../components/Header';
import type { User } from '../types/User';

export default function GuestQrPage() {
  const { code } = useParams<{ code: string }>();

  const [guest, setGuest] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [kanji, kana] = guest?.name.split('（') || ['', ''];
  const furigana = kana?.replace('）', '');
  useEffect(() => {
    const fetchGuest = async () => {
      if (!code) return;

      const q = query(collection(db, 'guest'), where('code', '==', code));

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];

        setGuest({
          id: doc.id,
          ...(doc.data() as Omit<User, 'id'>),
        });
      }

      setLoading(false);
    };

    fetchGuest();
  }, [code]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (!guest) {
    return <p>ゲストが見つかりません。</p>;
  }

  const receptionUrl = `${window.location.origin}/reception/${guest.code}`;

  return (
    <div
      style={{
        height: '100dvh',
        background: '#fff9f2',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* <Header title="受付QRコード" /> */}

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '380px',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '32px 24px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              marginBottom: '12px',
              color: '#1f3b5b',
              lineHeight: 1.4,
            }}
          >
            <div>{kanji} 様</div>

            <div
              style={{
                fontSize: '18px',
                color: '#666',
                fontWeight: 'normal',
                marginTop: '6px',
              }}
            >
              （{furigana}）
            </div>
          </h2>

          <p
            style={{
              color: '#666',
              marginBottom: '28px',
              lineHeight: 1.6,
            }}
          >
            受付でこちらのQRコードを
            <br />
            ご提示ください。
          </p>

          <div
            style={{
              display: 'inline-block',
              background: '#fff',
              padding: '16px',
              borderRadius: '12px',
            }}
          >
            <QRCode value={receptionUrl} size={220} />
          </div>

          <p
            style={{
              marginTop: '24px',
              color: '#888',
              fontSize: '14px',
            }}
          >
            スクリーンショットでも受付可能です。
          </p>
        </div>
      </div>
    </div>
  );
}
