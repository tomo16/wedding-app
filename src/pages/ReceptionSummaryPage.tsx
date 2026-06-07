import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

type Props = {
  side: "groom" | "bride";
};

export function ReceptionSummary({ side }: Props) {
  const [guests, setGuests] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyUnchecked, setShowOnlyUnchecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuests = async () => {
      const q = query(
        collection(db, "guest"),
        where("side", "==", side)
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<User, "id">),
      }));
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
      {/* ② ヘッダー */}
      <Header title={'ゲスト一覧'} />

      <div style={{ paddingTop: '56px' }}>
        <Header title={'ゲスト一覧'} />

        <div style={{ padding: '16px' }}>
          <h2>{side === 'groom' ? '新郎側' : '新婦側'} 一覧</h2>

          {allCheckedIn ? (
            <p style={{ color: 'green', fontWeight: 'bold' }}>
              ✅ 全員受付完了
            </p>
          ) : (
            <p style={{ color: 'red', fontWeight: 'bold' }}>❌ 未受付あり</p>
          )}

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <input
              type="checkbox"
              checked={showOnlyUnchecked}
              onChange={(e) => setShowOnlyUnchecked(e.target.checked)}
            />
            未受付のみ表示
          </label>

          {/* ===== ヘッダー行 ===== */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '8px',
              fontWeight: 'bold',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            <div>名前</div>
            <div>受付</div>
            <div>ご祝儀</div>
            <div>お車代</div>
          </div>

          {/* ===== 一覧（縦スクロール） ===== */}
          <div
            style={{
              maxHeight: '60vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {visibleGuests.map((g) => {
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
                    padding: '10px',
                    borderRadius: '10px',
                    background: isUnchecked ? '#ffe5e5' : '#fff', // ★ 未受付は薄赤
                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: '#1976d2',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                    onClick={() => navigate(`/reception/${g.code}`)}
                  >
                    {g.name}
                  </div>

                  <div>{g.checkedin ? '✅' : '❌'}</div>

                  <div>{g.giftReceived ? '✅' : '❌'}</div>

                  {/* お車代 */}
                  <div
                    style={{
                      fontWeight: transportationNotGiven ? 'bold' : 'normal',
                      color: transportationNotGiven ? 'red' : 'inherit',
                    }}
                  >
                    {!g.hasTransportationGift && '―'}
                    {g.hasTransportationGift &&
                      (g.transportationGiftGiven ? '✅' : '❌')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
