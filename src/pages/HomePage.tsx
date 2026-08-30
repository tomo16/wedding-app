import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import type { User } from '../types/User';
import { doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';

export const seedGuests = async () => {
  // ① CSV読み込み
  const csvText = await fetch('/guests.csv').then((res) => res.text());

  // ② CSVパース
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  console.log('CSV raw data:', result.data);

  (result.data as any[]).forEach((row, index) => {
    console.log(`row ${index}`, row, 'code=', row.code);
  });

  // ③ CSV → User 型へ変換（undefined防止）
  const guests: User[] = (result.data as any[])
    .filter((row) => row.code && row.name) // ★ 超重要
    .map((row) => ({
      name: row.name.trim(),
      code: row.code.trim(),
      checkedin: row.checkedin === 'TRUE',
      message: row.message ?? '',
      seatNumber: row.seatNumber ?? '',
      hasTransportationGift: row.hasTransportationGift === 'TRUE',
      transportationGiftGiven: row.transportationGiftGiven === 'TRUE',
      giftReceived: row.giftReceived === 'TRUE',
      giftReceivedAtReception: row.giftReceivedAtReception === 'TRUE',
      side: row.side === 'groom' ? 'groom' : 'bride',
    }));

  // ④ Firestoreへ一括登録
  const batch = writeBatch(db);
  // const guestCollection = collection(db, "guest");

  guests.forEach((guest) => {
    if (!guest.code) return; // 保険

    const docRef = doc(db, 'guest', guest.code);
    batch.set(docRef, guest);
  });

  await batch.commit();

  console.log(`✅ ${guests.length} 件のゲストを登録しました`);
};
export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        background:
          'linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)',
      }}
    >
      <Header title="no_back" />

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
          Admin
        </h1>

        <div
          style={{
            color: '#C9A44C',
            letterSpacing: '3px',
            textAlign: 'center',
            marginBottom: '18px',
          }}
        >
          Management
        </div>

        <p
          style={{
            color: '#6F5E72',
            lineHeight: 1.8,
            fontSize: '14px',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          管理者向けメニューです
          <br />
          ゲスト一覧画面へ進めます
        </p>

        {/* カード */}

        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: '18px',
              textAlign: 'center',
              fontSize: '28px',
              color: '#5C4567',
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            Tools
          </h3>

          <div
            style={{
              width: 50,
              height: 1,
              background: '#D6B4E8',
              margin: '0 auto 28px',
            }}
          />

          {import.meta.env.DEV && (
            <button onClick={seedGuests} style={buttonStyle}>
              📥 初期データ投入
            </button>
          )}

          {import.meta.env.DEV && (
            <Link to="/guest/login" style={linkStyle}>
              💒 Weddingページ
            </Link>
          )}

          {import.meta.env.DEV && (
            <Link to="/messageList" style={linkStyle}>
              💌 Message一覧
            </Link>
          )}

          <Link to="/groomSummary" style={linkStyle}>
            👦 新郎ゲスト一覧
          </Link>

          <Link to="/brideSummary" style={linkStyle}>
            👰 新婦ゲスト一覧
          </Link>

          <Link to="/qrScanner" style={linkStyle}>
            QRコードスキャナー
          </Link>
        </div>
      </div>
    </div>
  );
}
const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  border: 'none',
  borderRadius: '999px',
  background: 'linear-gradient(90deg,#D99CC7,#C08ED7)',
  color: '#fff',
  fontWeight: 700,
  fontSize: '16px',
  cursor: 'pointer',
  marginBottom: '18px',
  boxShadow: '0 8px 20px rgba(192,142,215,.35)',
};

const linkStyle: React.CSSProperties = {
  display: 'block',
  textAlign: 'center',
  textDecoration: 'none',
  color: '#5C4567',
  background: '#FCFAFD',
  border: '1px solid #E8DAF2',
  borderRadius: '16px',
  padding: '16px',
  marginBottom: '14px',
  fontWeight: 600,
};
