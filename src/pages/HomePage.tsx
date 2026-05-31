import Papa from "papaparse";
import { Link } from "react-router-dom";
import type { User } from "../types/User";
import {doc, writeBatch } from "firebase/firestore";
import { db } from "../firebase";


export const seedGuests = async () => {
  // ① CSV読み込み
  const csvText = await fetch("/guests.csv").then((res) => res.text());

  // ② CSVパース
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

    console.log("CSV raw data:", result.data);

  (result.data as any[]).forEach((row, index) => {
    console.log(`row ${index}`, row, "code=", row.code);
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
    giftReceivedBefore: row.giftReceivedBefore === 'TRUE',
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
        textAlign: "center",
        margin: "50px auto 0",  // ← 横中央にする設定
        width: "fit-content",    // ← 必須：内容幅に合わせて中央に寄せる
      }}
    >
      <h1>管理用ページ</h1>
      <button onClick={seedGuests}>初期データ投入（開発用）</button>
      <p>テストリンク:</p>
      <Link to="/guest/login">Weddingページへ</Link>
      <br />
      {/* 仮でT01の人のReceptionページへ遷移 */}
      <Link to="/reception/T01">T01のゲストのReceptionページへ</Link>
      <br />
      <Link to="/messageList">MessageListページへ</Link>
      <br />
      <Link to="/groomSummary">新郎ゲストListページへ</Link>
      <br />
      <Link to="/brideSummary">新婦ゲストListページへ</Link>
    </div>
  );
}
