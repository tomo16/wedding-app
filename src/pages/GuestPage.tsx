// src/pages/GuestApp.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGuest } from "../context/GuestContext";
import coupleImg from "../assets/home.jpg";

export default function GuestApp() {
  const navigate = useNavigate();
  const { guest, setGuest } = useGuest();

  // ---------------------------------------------------------
  // 🟣 対策① localStorage からログイン状態を復元
  // ---------------------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem('guest');
    if (!guest && saved) {
      setGuest(JSON.parse(saved));
    }
  }, []);

  // ---------------------------------------------------------
  // 🟣 対策② 自動ログアウト（180分）
  // ---------------------------------------------------------
  useEffect(() => {
    if (!guest) return;

    const AUTO_LOGOUT_MIN = 180;
    const timer = setTimeout(
      () => {
        localStorage.removeItem('guest');
        setGuest(null);
      },
      AUTO_LOGOUT_MIN * 60 * 1000,
    );

    return () => clearTimeout(timer);
  }, [guest]);

  // 🔑 ログイン処理
  const handleLogin = () => {
    // TODO ここで当日以外のログインを制御できる
    // if (!isWeddingDay()) {
    //   alert('当日のみご利用いただけます');
    //   return;
    // }
    const userData = {
      id: 'common',
      name: 'ゲスト',
      seatNumber: '-',
      message: '',
      checkedin: true,
      code: '0926',
      hasTransportationGift: false,
      giftReceivedBefore: false,
      transportationGiftGiven: false,
      side: 'groom',
    };

    setGuest(userData);

    // ★ localStorage に保存
    localStorage.setItem('guest', JSON.stringify(userData));
  };

  // 日付チェック関数
  // const isWeddingDay = () => {
  //   const today = new Date();
  //   const weddingDate = new Date('2026-09-26');

  //   return (
  //     today.getFullYear() === weddingDate.getFullYear() &&
  //     today.getMonth() === weddingDate.getMonth() &&
  //     today.getDate() === weddingDate.getDate()
  //   );
  // };
  // 🔒 戻るボタン無効化
  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 各ページ遷移
  const handleOpenSeating = () => navigate('/seating');
  const handleOpenMenu = () => navigate('/menu');
  const handleOpenPhoto = () => navigate('/photo');
  const handleOpenPhotoUpload = () => navigate('/photoUpload');
  const handleOpenProfile = () => navigate('/profile');
  const handleOpenVenueInfo = () => navigate('/venueInfo');
  const handleOpenVenueMap = () => navigate('/venueMap');
  const handleOpenMessage = () => navigate('/message');
  const handleOpenDrink = () => navigate('/drink');

  // ---------------------------------------------------------
  // ここから先は UI（元コードそのまま）
  // ---------------------------------------------------------

  const memberColors = [
    '#fff9cc', // 岩本：黄色・薄い
    '#f4e8ff', // 深澤：紫・薄い
    '#ffffff', // ラウール：白
    '#e3f0ff', // 渡辺：青・薄い
    '#ffe8cc', // 向井：オレンジ・薄い
    '#e6ffe6', // 阿部：緑・薄い
    '#f0f0f0', // 目黒：黒（薄いグレー）
    '#ffdddd', // 宮舘：赤・薄い
    '#ffe6f5', // 佐久間：ピンク・薄い
  ];

  // ▼ ログイン前画面（デザインB）
  if (!guest) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 20px',
          backgroundColor: '#f7f3ff',
        }}
      >
        {/* タイトル */}
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#4A3F6B',
            marginBottom: '8px',
          }}
        >
          T & H Wedding App
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: '#5A4E72',
            marginTop: '0',
            marginBottom: '20px',
            lineHeight: '1.6',
          }}
        >
          ゲストのみなさまに向けて、
          <br />
          必要な情報をまとめたアプリを開発しました。
          <br />
          気軽に見て楽しんでください。
        </p>

        <button
          onClick={handleLogin}
          style={{
            marginTop: '15px',
            padding: '8px 20px',
            fontSize: '15px',
            cursor: 'pointer',
            borderRadius: '6px',
            backgroundColor: '#eee4ff',
          }}
        >
          入場する（受付済の方）
        </button>
      </div>
    );
  }

  // ▼ ログイン後（デザインB）
  return (
    <div
      style={{
        textAlign: 'center',
        minHeight: '100dvh',
        backgroundColor: '#f7f3ff',
        padding: '20px 0',
      }}
    >
      {/* タイトル */}
      <div style={{ marginTop: '10px' }}>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#4A3F6B',
            marginBottom: '5px',
          }}
        >
          Welcome to Our Wedding
        </h1>

        <div
          style={{
            color: '#D7C3FF',
            fontSize: '20px',
            marginBottom: '5px',
          }}
        >
          ♡
        </div>

        <div
          style={{
            width: '70%',
            height: '2px',
            backgroundColor: '#D9C8FF',
            margin: '5px auto 15px',
            borderRadius: '3px',
          }}
        />

        <h2
          style={{
            fontSize: '16px',
            color: '#4A3F6B',
            marginBottom: '20px',
          }}
        >
          2026.9.26
        </h2>
      </div>

      {/* 丸い写真 */}
      <img
        src={coupleImg}
        alt="Welcome"
        style={{
          width: '220px',
          height: '220px',
          objectFit: 'cover',
          borderRadius: '50%',
          margin: '10px auto 20px',
          border: '4px solid white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      />

      {/* グリッドボタン */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <button
          onClick={handleOpenSeating}
          style={{ backgroundColor: memberColors[0] }}
        >
          席次表
        </button>
        <button
          onClick={handleOpenPhoto}
          style={{ backgroundColor: memberColors[1] }}
        >
          前撮りフォト
        </button>
        <button
          onClick={handleOpenPhotoUpload}
          style={{ backgroundColor: memberColors[4] }}
        >
          写真
          <br />
          アップロード
        </button>
        <button
          onClick={handleOpenMenu}
          style={{ backgroundColor: memberColors[7] }}
        >
          お食事
        </button>
        <button
          onClick={handleOpenDrink}
          style={{ backgroundColor: memberColors[2] }}
        >
          飲み物
        </button>
        <button
          onClick={handleOpenVenueInfo}
          style={{ backgroundColor: memberColors[5] }}
        >
          ご案内
          <br />
          注意事項
        </button>
        <button
          onClick={handleOpenMessage}
          style={{ backgroundColor: memberColors[8] }}
        >
          メッセージ
        </button>
        <button
          onClick={handleOpenProfile}
          style={{ backgroundColor: memberColors[6] }}
        >
          プロフィール
        </button>
        <button
          onClick={handleOpenVenueMap}
          style={{ backgroundColor: memberColors[3] }}
        >
          会場内
          <br />
          MAP
        </button>
      </div>

      {/* ログアウト */}
      <div style={{ marginTop: '30px' }}>
        <button
          onClick={() => setGuest(null)}
          style={{
            backgroundColor: '#fff0fb',
            padding: '8px 16px',
            borderRadius: '6px',
          }}
        >
          ← ログアウト
        </button>
      </div>
    </div>
  );
}
