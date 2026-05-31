import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { User } from "../types/User";



export default function ReceptionPage() {
  const { code } = useParams<{ code: string }>();
  const [guest, setGuest] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* ゲスト取得 */
  useEffect(() => {
    const fetchGuest = async () => {
      if (!code) return;

      const q = query(collection(db, "guest"), where("code", "==", code));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        setGuest({ id: docSnap.id, ...(docSnap.data() as Omit<User, "id">) });
      } else {
        alert("ゲストが見つかりません");
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

    const q = query(
      collection(db, "guest"),
      where("code", "==", guest.code)
    );

    const snapshot = await getDocs(q);

    for (const d of snapshot.docs) {
      await updateDoc(doc(db, "guest", d.id), data);
    }

    setGuest((prev) => (prev ? { ...prev, ...data } : null));
  } finally {
    setUpdating(false);
  }
};

  if (loading) return <p>読み込み中...</p>;
  if (!guest) return <p>ゲストが見つかりません</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>受付画面</h1>

      <p>名前：{guest.name}</p>

      <p>
        ご祝儀：
        {guest.giftReceivedBefore ? '✅ お預かり済' : '❌ 未受領'}
      </p>

      <p>
        お車代：
        {!guest.hasTransportationGift && ' なし'}
        {guest.hasTransportationGift &&
          (guest.transportationGiftGiven ? ' ✅ 渡し済' : ' 💴 未渡し')}
      </p>

      <p>
        受付状態：
        {guest.checkedin ? ' ✅ 受付済' : ' ❌ 未受付'}
      </p>

      <div
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          alignItems: 'center',
        }}
      >
        {!guest.checkedin && (
          <button
            disabled={updating}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
            }}
            onClick={() => updateGuest({ checkedin: true })}
          >
            受付完了
          </button>
        )}

        {guest.checkedin && (
          <button
            disabled={updating}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
            }}
            onClick={() => updateGuest({ checkedin: false })}
          >
            未受付にする
          </button>
        )}

        {!guest.giftReceivedBefore && (
          <button
            disabled={updating}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
            }}
            onClick={() => updateGuest({ giftReceivedBefore: true })}
          >
            ご祝儀 受け取り済にする
          </button>
        )}

        {guest.giftReceivedBefore && (
          <button
            disabled={updating}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
            }}
            onClick={() => updateGuest({ giftReceivedBefore: false })}
          >
            ご祝儀 未受領にする
          </button>
        )}

        {guest.hasTransportationGift && !guest.transportationGiftGiven && (
          <button
            disabled={updating}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
            }}
            onClick={() => updateGuest({ transportationGiftGiven: true })}
          >
            お車代 渡し済みにする
          </button>
        )}

        {guest.hasTransportationGift && guest.transportationGiftGiven && (
          <button
            disabled={updating}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
            }}
            onClick={() => updateGuest({ transportationGiftGiven: false })}
          >
            お車代 未渡しにする
          </button>
        )}
      </div>
    </div>
  );
}
