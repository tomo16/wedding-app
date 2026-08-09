import { useEffect, useState } from 'react';
import type { User } from '../types/User';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';

type Props = {
  side: 'groom' | 'bride';
};

export function ReceptionSummary({ side }: Props) {
  const [loading, setLoading] = useState(true);
  const [showOnlyUnchecked, setShowOnlyUnchecked] = useState(false);

  const navigate = useNavigate();

  const { guests, setGuests, setGuest } = useGuest();

  useEffect(() => {
    // 現在表示したいsideのゲストが
    // Contextにすでに存在するか確認
    const sideGuests = guests.filter((g) => g.side === side);
    // そのsideのゲストがすでにあれば再取得しない
    if (sideGuests.length > 0) {
      setLoading(false);
      return;
    }

    const fetchGuests = async () => {
      try {
        const q = query(collection(db, 'guest'), where('side', '==', side));

        const snapshot = await getDocs(q);

        const list = snapshot.docs
          .map((d) => ({
            id: d.id,
            ...(d.data() as Omit<User, 'id'>),
          }))
          .sort((a, b) => {
            const kanaA = a.name.match(/（(.+)）/)?.[1] ?? a.name;

            const kanaB = b.name.match(/（(.+)）/)?.[1] ?? b.name;

            return kanaA.localeCompare(kanaB, 'ja');
          });

        // Contextに保存
        setGuests((prev) => {
          const otherSideGuests = prev.filter((g) => g.side !== side);

          return [...otherSideGuests, ...list];
        });
      } catch (error) {
        console.error('ゲスト一覧取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, [side]);

  if (loading) {
    return <p style={{ textAlign: 'center' }}>読み込み中...</p>;
  }

  const sideGuests = guests.filter((g) => g.side === side);

  const allCheckedIn =
    sideGuests.length > 0 && sideGuests.every((g) => g.checkedin);

  const visibleGuests = showOnlyUnchecked
    ? sideGuests.filter((g) => !g.checkedin)
    : sideGuests;

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
            marginBottom: '18px',
            textAlign: 'center',
          }}
        >
          {side === 'groom' ? 'Groom Side' : 'Bride Side'}
        </div>

        {allCheckedIn ? (
          <div
            style={{
              background: '#F3FAF4',
              color: '#2E7D32',
              borderRadius: '16px',
              padding: '14px',
              marginBottom: '16px',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            ✅ 全員受付完了
          </div>
        ) : (
          <div
            style={{
              background: '#FFF4F4',
              color: '#D32F2F',
              borderRadius: '16px',
              padding: '14px',
              marginBottom: '16px',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            ❌ 未受付あり
          </div>
        )}

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            color: '#5C4567',
            fontWeight: 500,
          }}
        >
          <input
            type="checkbox"
            checked={showOnlyUnchecked}
            onChange={(e) => setShowOnlyUnchecked(e.target.checked)}
          />
          未受付のみ表示
        </label>

        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '18px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '8px',
              fontWeight: 700,
              color: '#5C4567',
              textAlign: 'center',
              padding: '10px 8px',
              marginBottom: '12px',
              background: '#F8F2FB',
              borderRadius: '14px',
            }}
          >
            <div>名前</div>
            <div>受付</div>
            <div>ご祝儀</div>
            <div>お車代</div>
          </div>

          <div
            style={{
              maxHeight: '60vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {visibleGuests.map((g) => {
              const [kanji, kana] = g.name.split('（');

              const furigana = kana?.replace('）', '');

              const isUnchecked = !g.checkedin;

              const transportationNotGiven =
                g.hasTransportationGift && !g.transportationGiftGiven;

              return (
                <div
                  key={g.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '8px',
                    padding: '14px',
                    borderRadius: '16px',
                    background: isUnchecked
                      ? '#FFF4F4'
                      : 'rgba(255,255,255,.95)',
                    border: isUnchecked
                      ? '1px solid #FFD5D5'
                      : '1px solid #F3E5FA',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    onClick={() => {
                      // 個人ページ用
                      setGuest(g);

                      navigate(`/reception/${g.code}`);
                    }}
                    style={{
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#5C4567',
                      lineHeight: 1.4,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '14px',
                      }}
                    >
                      {kanji}
                    </div>

                    <div
                      style={{
                        fontSize: '11px',
                        color: '#8B768F',
                      }}
                    >
                      {furigana}
                    </div>
                  </div>

                  <div>{g.checkedin ? '✅' : '❌'}</div>

                  <div>{g.giftReceived ? '✅' : '❌'}</div>

                  <div
                    style={{
                      color: transportationNotGiven ? '#D32F2F' : '#5C4567',
                      fontWeight: transportationNotGiven ? 700 : 500,
                    }}
                  >
                    {!g.hasTransportationGift
                      ? '―'
                      : g.transportationGiftGiven
                        ? '✅'
                        : '❌'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
