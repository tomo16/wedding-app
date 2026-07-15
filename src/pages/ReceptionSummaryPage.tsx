import { useEffect, useState } from 'react';
import type { User } from '../types/User';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

type Props = {
  side: 'groom' | 'bride';
};

export function ReceptionSummary({ side }: Props) {
  const [guests, setGuests] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyUnchecked, setShowOnlyUnchecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuests = async () => {
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

      setGuests(list);
      setGuests(list);
      setLoading(false);
    };

    fetchGuests();
  }, [side]);

  if (loading) return <p>読み込み中...</p>;

  const allCheckedIn = guests.every((g) => g.checkedin);
  const visibleGuests = showOnlyUnchecked
    ? guests.filter((g) => !g.checkedin)
    : guests;

  return (
    <>
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
          {/* 一覧カード */}
          <div
            style={{
              background: 'rgba(255,255,255,.92)',
              borderRadius: '24px',
              padding: '18px',
              boxShadow: '0 8px 30px rgba(0,0,0,.08)',
            }}
          >
            {/* ヘッダー行 */}
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

            {/* 一覧 */}
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
                    {/* 名前 */}
                    <div
                      onClick={() => navigate(`/reception/${g.code}`)}
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

                    {/* 受付 */}
                    <div>{g.checkedin ? '✅' : '❌'}</div>

                    {/* ご祝儀 */}
                    <div>{g.giftReceived ? '✅' : '❌'}</div>

                    {/* お車代 */}
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
    </>
  );
}
