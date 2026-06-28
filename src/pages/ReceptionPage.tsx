import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from '../types/User';

export default function ReceptionPage() {
  const { code } = useParams<{ code: string }>();

  const [guest, setGuest] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchGuest = async () => {
      if (!code) return;

      const q = query(collection(db, 'guest'), where('code', '==', code));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];

        setGuest({
          id: docSnap.id,
          ...(docSnap.data() as Omit<User, 'id'>),
        });
      } else {
        alert('ゲストが見つかりません');
      }

      setLoading(false);
    };

    fetchGuest();
  }, [code]);

  /* Firestore更新 共通関数 */
  const updateGuest = async (data: Partial<User>) => {
    if (!guest || updating) return;

    try {
      setUpdating(true);

      const q = query(collection(db, 'guest'), where('code', '==', guest.code));

      const snapshot = await getDocs(q);

      for (const d of snapshot.docs) {
        await updateDoc(doc(db, 'guest', d.id), data);
      }

      setGuest((prev) => (prev ? { ...prev, ...data } : null));
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center' }}>読み込み中...</p>;
  }

  if (!guest) {
    return <p style={{ textAlign: 'center' }}>ゲストが見つかりません</p>;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '48px',
          marginBottom: '24px',
          color: '#243447',
        }}
      >
        受付画面
      </h1>

      <h2
        style={{
          marginBottom: '24px',
          color: '#243447',
        }}
      >
        {guest.name}
      </h2>

      {/* 状態カード */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '20px',
          margin: '0 auto 24px',
          width: '100%',
          maxWidth: '360px',
          boxSizing: 'border-box',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: '20px',
            textAlign: 'center',
            color: '#243447',
          }}
        >
          状態
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '70px 1fr',
            rowGap: '16px',
            columnGap: '12px',
            alignItems: 'center',
            fontSize: '16px',
          }}
        >
          <div>ご祝儀</div>
          <div
            style={{
              textAlign: 'right',
              fontWeight: 'bold',
            }}
          >
            {guest.giftReceived ? '✅ お預かり済' : '❌ 未受領'}
          </div>

          <div>お車代</div>
          <div
            style={{
              textAlign: 'right',
              fontWeight: 'bold',
            }}
          >
            {!guest.hasTransportationGift
              ? 'なし'
              : guest.transportationGiftGiven
                ? '✅ 渡し済'
                : '💴 未渡し'}
          </div>

          <div>受付状態</div>
          <div
            style={{
              textAlign: 'right',
              fontWeight: 'bold',
            }}
          >
            {guest.checkedin ? '✅ 受付済' : '❌ 未受付'}
          </div>
        </div>
      </div>

      {/* 操作ボタン */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        {!guest.checkedin && (
          <button
            disabled={updating}
            onClick={() => updateGuest({ checkedin: true })}
            style={greenButtonStyle}
          >
            受付完了
          </button>
        )}

        {guest.checkedin && (
          <button
            disabled={updating}
            onClick={() => updateGuest({ checkedin: false })}
            style={redButtonStyle}
          >
            受付取消
          </button>
        )}

        {!guest.giftReceived && guest.giftReceivedAtReception && (
          <button
            disabled={updating}
            onClick={() => updateGuest({ giftReceived: true })}
            style={greenButtonStyle}
          >
            ご祝儀受領
          </button>
        )}

        {guest.giftReceived && guest.giftReceivedAtReception && (
          <button
            disabled={updating}
            onClick={() => updateGuest({ giftReceived: false })}
            style={redButtonStyle}
          >
            ご祝儀受領取消
          </button>
        )}

        {guest.hasTransportationGift && !guest.transportationGiftGiven && (
          <button
            disabled={updating}
            onClick={() => updateGuest({ transportationGiftGiven: true })}
            style={greenButtonStyle}
          >
            お車代を渡した
          </button>
        )}

        {guest.hasTransportationGift && guest.transportationGiftGiven && (
          <button
            disabled={updating}
            onClick={() => updateGuest({ transportationGiftGiven: false })}
            style={redButtonStyle}
          >
            お車代取消
          </button>
        )}
      </div>
    </div>
  );
}

const greenButtonStyle = {
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  padding: '14px 24px',
  minWidth: '240px',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  cursor: 'pointer',
};

const redButtonStyle = {
  backgroundColor: '#f44336',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  padding: '14px 24px',
  minWidth: '240px',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  cursor: 'pointer',
};
