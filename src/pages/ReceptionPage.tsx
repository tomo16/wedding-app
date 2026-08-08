import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from '../types/User';
import Header from '../components/Header';

export default function ReceptionPage() {
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  const initialGuest = location.state?.guest as User | undefined;
  const [guest, setGuest] = useState<User | null>(
    initialGuest ?? null
  );
  const [loading, setLoading] = useState(!initialGuest);
  const [updating, setUpdating] = useState(false);
  const [kanji, kana] = guest?.name.split('（') || ['', ''];
  const furigana = kana?.replace('）', '');


  useEffect(() => {
    const fetchGuest = async () => {
      if (!code) {
        setLoading(false);
        return;
      }

      try {
        const guestRef = doc(db, 'guest', code);
        const snapshot = await getDoc(guestRef);

        if (snapshot.exists()) {
          setGuest({
            id: snapshot.id,
            ...(snapshot.data() as Omit<User, 'id'>),
          });
        } else {
          alert('ゲストが見つかりません');
        }
      } catch (error) {
        console.error('ゲスト取得エラー:', error);
        alert('ゲスト情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

  fetchGuest();
}, [code]);

  /* Firestore更新 共通関数 */
  const updateGuest = async (data: Partial<User>) => {
    if (!guest || updating) return;

    try {
      setUpdating(true);

      const guestRef = doc(db, 'guest', guest.code);

      await updateDoc(guestRef, data);

      setGuest((prev) => (prev ? { ...prev, ...data } : null));
    } catch (error) {
      console.error('ゲスト更新エラー:', error);
      alert('ゲスト情報の更新に失敗しました');
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
            fontSize: '34px',
            color: '#5C4567',
            fontWeight: 700,
            marginBottom: '8px',
            fontFamily: '"Cormorant Garamond", serif',
            textAlign: 'center',
          }}
        >
          Reception
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
          Guest Check-in
        </div>

        {/* ゲスト名カード */}
        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '22px',
            marginBottom: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            <div
              style={{
                fontSize: '26px',
                fontWeight: 700,
                color: '#5C4567',
              }}
            >
              {kanji}
            </div>

            {furigana && (
              <div
                style={{
                  marginTop: '6px',
                  fontSize: '13px',
                  color: '#8B768F',
                  letterSpacing: '2px',
                }}
              >
                {furigana}
              </div>
            )}
          </div>
        </div>
        {/* 状態カード */}
        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '22px',
            marginBottom: '28px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
          }}
        >
          <h3
            style={{
              margin: '0 0 20px',
              textAlign: 'center',
              color: '#5C4567',
              fontSize: '22px',
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 600,
            }}
          >
            Status
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '90px 1fr',
              rowGap: '18px',
              columnGap: '12px',
              alignItems: 'center',
              fontSize: '15px',
            }}
          >
            <div style={{ color: '#5C4567', fontWeight: 600 }}>ご祝儀</div>

            <div
              style={{
                textAlign: 'right',
                color: guest.giftReceived ? '#2E7D32' : '#D32F2F',
                fontWeight: 700,
              }}
            >
              {guest.giftReceived ? '✅ お預かり済' : '❌ 未受領'}
            </div>

            <div style={{ color: '#5C4567', fontWeight: 600 }}>お車代</div>

            <div
              style={{
                textAlign: 'right',
                color: !guest.hasTransportationGift
                  ? '#888'
                  : guest.transportationGiftGiven
                    ? '#2E7D32'
                    : '#D32F2F',
                fontWeight: 700,
              }}
            >
              {!guest.hasTransportationGift
                ? '―'
                : guest.transportationGiftGiven
                  ? '✅ 渡し済'
                  : '💴 未渡し'}
            </div>

            <div style={{ color: '#5C4567', fontWeight: 600 }}>受付</div>

            <div
              style={{
                textAlign: 'right',
                color: guest.checkedin ? '#2E7D32' : '#D32F2F',
                fontWeight: 700,
              }}
            >
              {guest.checkedin ? '✅ 受付済' : '❌ 未受付'}
            </div>
          </div>
        </div>
        {/* 操作カード */}
        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '22px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {!guest.checkedin && (
            <button
              disabled={updating}
              onClick={() => updateGuest({ checkedin: true })}
              style={primaryButtonStyle}
            >
              ✅ 受付完了
            </button>
          )}

          {guest.checkedin && (
            <button
              disabled={updating}
              onClick={() => updateGuest({ checkedin: false })}
              style={dangerButtonStyle}
            >
              受付取消
            </button>
          )}

          {!guest.giftReceived && guest.giftReceivedAtReception && (
            <button
              disabled={updating}
              onClick={() => updateGuest({ giftReceived: true })}
              style={primaryButtonStyle}
            >
              💴 ご祝儀受領
            </button>
          )}

          {guest.giftReceived && guest.giftReceivedAtReception && (
            <button
              disabled={updating}
              onClick={() => updateGuest({ giftReceived: false })}
              style={dangerButtonStyle}
            >
              ご祝儀受領取消
            </button>
          )}

          {guest.hasTransportationGift && !guest.transportationGiftGiven && (
            <button
              disabled={updating}
              onClick={() => updateGuest({ transportationGiftGiven: true })}
              style={primaryButtonStyle}
            >
              🚗 お車代を渡した
            </button>
          )}

          {guest.hasTransportationGift && guest.transportationGiftGiven && (
            <button
              disabled={updating}
              onClick={() => updateGuest({ transportationGiftGiven: false })}
              style={dangerButtonStyle}
            >
              お車代取消
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
const primaryButtonStyle = {
  width: '100%',
  padding: '16px',
  borderRadius: '16px',
  border: 'none',
  background: 'linear-gradient(135deg,#D6B7F6,#C7A0EF)',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 700 as const,
  cursor: 'pointer',
  boxShadow: '0 8px 20px rgba(170,135,200,.25)',
};

const dangerButtonStyle = {
  width: '100%',
  padding: '16px',
  borderRadius: '16px',
  border: '1px solid #F4C9C9',
  background: '#FFF4F4',
  color: '#D32F2F',
  fontSize: '16px',
  fontWeight: 700 as const,
  cursor: 'pointer',
};
