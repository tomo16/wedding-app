// src/pages/GuestApp.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import coupleImg from '../assets/home.jpg';

export default function GuestApp() {
  const navigate = useNavigate();
  const { guest, setGuest } = useGuest();
  const DEV_MODE = import.meta.env.DEV;

  // スタッフ用プレビューパスワード
  const STAFF_PASSWORD ="aoyama"
    import.meta.env.VITE_STAFF_PREVIEW_PASSWORD;

  const [staffPassword, setStaffPassword] = useState('');
  const [showStaffLogin, setShowStaffLogin] = useState(false);
  const [staffLoginError, setStaffLoginError] = useState('');

  // ---------------------------------------------------------
  // localStorage からログイン状態を復元
  // ---------------------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem('guest');

    if (!guest && saved) {
      setGuest(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!guest) return;

    window.scrollTo(0, 0);
  }, [guest]);

  // 自動ログアウト（180分）
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

  // ---------------------------------------------------------
  // 通常ログイン
  // ---------------------------------------------------------
  const handleLogin = () => {
    const userData = {
      id: 'common',
      name: 'ゲスト',
      seatNumber: '-',
      message: '',
      checkedin: true,
      code: '0926',
      hasTransportationGift: false,
      giftReceived: false,
      giftReceivedAtReception: false,
      transportationGiftGiven: false,
      side: 'groom' as const,
    };

    setGuest(userData);
    localStorage.setItem('guest', JSON.stringify(userData));
  };

  // ---------------------------------------------------------
  // スタッフ用ログイン
  // ---------------------------------------------------------
  const handleStaffLogin = () => {
    setStaffLoginError('');

    if (!STAFF_PASSWORD) {
      setStaffLoginError('スタッフ用パスワードが設定されていません。');
      return;
    }

    if (staffPassword !== STAFF_PASSWORD) {
      setStaffLoginError('パスワードが正しくありません。');
      return;
    }

    // スタッフ確認用のゲスト情報
    const staffGuest = {
      id: 'staff-preview',
      name: 'スタッフ',
      seatNumber: '-',
      message: '',
      checkedin: true,
      code: 'staff-preview',
      hasTransportationGift: false,
      giftReceived: false,
      giftReceivedAtReception: false,
      transportationGiftGiven: false,
      side: 'groom' as const,
    };

    // パスワード入力欄からフォーカスを外す
    (document.activeElement as HTMLElement)?.blur();

    setStaffPassword('');
    setShowStaffLogin(false);

    setGuest(staffGuest);
    localStorage.setItem('guest', JSON.stringify(staffGuest));
  };;

  // ---------------------------------------------------------
  // カウントダウン
  // ---------------------------------------------------------
  const weddingStart = new Date('2026-09-26T13:00:00');

  const [now, setNow] = useState(new Date());

  const [devUnlock, setDevUnlock] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const diff = weddingStart.getTime() - now.getTime();

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24),
  );

  const hours =
    Math.floor(diff / (1000 * 60 * 60)) % 24;

  const minutes =
    Math.floor(diff / (1000 * 60)) % 60;

  const seconds =
    Math.floor(diff / 1000) % 60;

  const canLogin =
    devUnlock || now >= weddingStart;

  // ---------------------------------------------------------
  // 戻るボタン無効化
  // ---------------------------------------------------------
  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(
        null,
        '',
        window.location.href,
      );
    };

    window.history.pushState(
      null,
      '',
      window.location.href,
    );

    window.addEventListener(
      'popstate',
      handlePopState,
    );

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState,
      );
    };
  }, []);

  // ---------------------------------------------------------
  // 各ページ遷移
  // ---------------------------------------------------------
  const handleOpenSeating = () =>
    navigate('/seating');

  const handleOpenMenu = () =>
    navigate('/menu');

  const handleOpenPhoto = () =>
    navigate('/photo');

  const handleOpenPhotoUpload = () =>
    navigate('/photoUpload');

  const handleOpenProfile = () =>
    navigate('/profile');

  const handleOpenVenueInfo = () =>
    navigate('/venueInfo');

  const handleOpenVenueMap = () =>
    navigate('/history');

  const handleOpenMessage = () =>
    navigate('/message');

  const handleOpenDrink = () =>
    navigate('/drink');

  const menuItems = [
    {
      icon: '🪑',
      label: '席次表',
      action: handleOpenSeating,
    },
    {
      icon: '📷',
      label: '前撮り',
      action: handleOpenPhoto,
    },
    {
      icon: '📸',
      label: '写真',
      action: handleOpenPhotoUpload,
    },
    {
      icon: '🍽',
      label: '料理',
      action: handleOpenMenu,
    },
    {
      icon: '🍷',
      label: '飲み物',
      action: handleOpenDrink,
    },
    {
      icon: '📍',
      label: 'ご案内',
      action: handleOpenVenueInfo,
    },
    {
      icon: '💌',
      label: 'メッセージ',
      action: handleOpenMessage,
    },
    {
      icon: '👤',
      label: 'プロフィール',
      action: handleOpenProfile,
    },
    {
      icon: '📖',
      label: 'ヒストリー',
      action: handleOpenVenueMap,
    },
  ];

  // ---------------------------------------------------------
  // ログイン前画面
  // ---------------------------------------------------------
  if (!guest) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflowY: 'auto',
          background:
            'linear-gradient(180deg,#FEFCFF 0%,#F8F1FB 45%,#F2E8F8 100%)',
          padding: '40px 20px 60px',
        }}
      >
        <div
          style={{
            maxWidth: '420px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* タイトル */}
          <div
            style={{
              width: '80px',
              height: '2px',
              background: '#D9C8FF',
              margin: '0 auto 20px',
            }}
          />

          <h1
            style={{
              fontSize: '40px',
              color: '#5C4567',
              marginBottom: '8px',
              fontWeight: 800,
              letterSpacing: '1px',
              fontFamily: '"Lora", serif',
            }}
          >
            T & H Wedding
          </h1>

          <div
            style={{
              color: '#C8A96A',
              fontSize: '15px',
              letterSpacing: '3px',
              marginBottom: '24px',
            }}
          >
            September 26, 2026
          </div>

          <p
            style={{
              color: '#6F5E72',
              lineHeight: 1.8,
              marginBottom: '28px',
              fontSize: '15px',
            }}
          >
            ゲストのみなさまへ
            <br />
            当日のご案内や
            <br />
            様々なコンテンツをご用意しております
          </p>

          {/* コンテンツカード */}
          <div
            style={{
              background:
                'rgba(255,255,255,0.92)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow:
                '0 12px 32px rgba(114,88,130,0.12)',
              border: '1px solid #F0E6EF',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: '#5C4567',
                marginBottom: '20px',
                fontFamily:
                  '"Cormorant Garamond", serif',
                fontWeight: 600,
                letterSpacing: '1px',
              }}
            >
              Contents
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
                textAlign: 'left',
                color: '#6F5E72',
                fontSize: '15px',
              }}
            >
              <div>🪑 席次表</div>
              <div>📷 前撮りフォト</div>
              <div>📸 写真アップロード</div>
              <div>🍽 お食事メニュー</div>
              <div>🍷 飲み物メニュー</div>
              <div>📍 ご案内・注意事項</div>
              <div>💌 メッセージ</div>
              <div>👤 プロフィール</div>
              <div>📖 二人のヒストリー</div>
            </div>
          </div>

          {/* カウントダウン */}
          {diff > 0 && (
            <div
              style={{
                marginTop: '24px',
                marginBottom: '32px',
                background:
                  'rgba(255,255,255,0.92)',
                borderRadius: '20px',
                padding: '24px',
                boxShadow:
                  '0 12px 32px rgba(114,88,130,0.12)',
                border: '1px solid #F0E6EF',
              }}
            >
              <div
                style={{
                  color: '#C8A96A',
                  fontSize: '13px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  fontFamily:
                    '"Cormorant Garamond", serif',
                  fontWeight: 600,
                }}
              >
                Wedding Countdown
              </div>

              <div
                style={{
                  fontSize: '54px',
                  fontWeight: 800,
                  color: '#5C4567',
                  lineHeight: 1,
                }}
              >
                {days}
              </div>

              <div
                style={{
                  color: '#B796D1',
                  fontSize: '22px',
                  marginTop: '8px',
                  fontFamily: 'serif',
                }}
              >
                Days
              </div>

              <div
                style={{
                  marginTop: '18px',
                  marginBottom: '20px',
                  fontSize: '18px',
                  color: '#5C4567',
                  fontWeight: 500,
                }}
              >
                {hours}時間 {minutes}分 {seconds}秒
              </div>

              <div
                style={{
                  marginTop: '18px',
                  paddingTop: '16px',
                  borderTop:
                    '1px solid #F3EAF5',
                  color: '#8B768F',
                  fontSize: '13px',
                  lineHeight: 1.8,
                }}
              >
                <strong
                  style={{
                    color: '#6A4E72',
                    fontSize: '15px',
                  }}
                >
                  2026年9月26日（土）
                </strong>
                <br />
                13:00よりアプリをご利用いただけます
              </div>
            </div>
          )}

          {/* 入場ボタン */}
          <button
            disabled={!canLogin}
            onClick={handleLogin}
            style={{
              width: '100%',
              marginTop: '20px',
              maxWidth: '320px',
              padding: '14px',
              fontSize: '16px',
              borderRadius: '999px',
              border: 'none',
              fontWeight: 700,
              color: 'white',
              background: canLogin
                ? 'linear-gradient(90deg,#DFA9D6,#C08ED7)'
                : '#E8E1EB',
              cursor: canLogin
                ? 'pointer'
                : 'not-allowed',
              boxShadow: canLogin
                ? '0 6px 16px rgba(217,156,199,.35)'
                : 'none',
            }}
          >
            入場する（受付済の方）
          </button>

          {/* スタッフ用ログイン */}
          <button
            onClick={() => {
              setShowStaffLogin(
                !showStaffLogin,
              );
              setStaffLoginError('');
            }}
            style={{
              marginTop: '28px',
              border: 'none',
              background: 'transparent',
              color: '#A58DB5',
              fontSize: '13px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            スタッフ用ログイン
          </button>

          {showStaffLogin && (
            <div
              style={{
                marginTop: '14px',
                background:
                  'rgba(255,255,255,0.92)',
                borderRadius: '18px',
                padding: '18px',
                maxWidth: '320px',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow:
                  '0 8px 24px rgba(114,88,130,0.12)',
                border: '1px solid #F0E6EF',
              }}
            >
              <div
                style={{
                  color: '#5C4567',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '12px',
                }}
              >
                スタッフ用パスワード
              </div>

              <input
                type="password"
                value={staffPassword}
                onChange={(e) => {
                  setStaffPassword(
                    e.target.value,
                  );
                  setStaffLoginError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleStaffLogin();
                  }
                }}
                placeholder="パスワード"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border:
                    '1px solid #E5D8EB',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#5C4567',
                  marginBottom: '10px',
                }}
              />

              {staffLoginError && (
                <div
                  style={{
                    color: '#D32F2F',
                    fontSize: '12px',
                    marginBottom: '10px',
                  }}
                >
                  {staffLoginError}
                </div>
              )}

              <button
                onClick={handleStaffLogin}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '999px',
                  background:
                    'linear-gradient(90deg,#DFA9D6,#C08ED7)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                スタッフとして入場
              </button>
            </div>
          )}

          {/* 開発モード */}
          {DEV_MODE && (
            <button
              onClick={() =>
                setDevUnlock(!devUnlock)
              }
              style={{
                display: 'block',
                margin:
                  '20px auto 0',
                border: 'none',
                borderRadius: '999px',
                background: devUnlock
                  ? '#C8A96A'
                  : '#F4EDF8',
                color: devUnlock
                  ? '#fff'
                  : '#5C4567',
                padding: '10px 20px',
                cursor: 'pointer',
              }}
            >
              🛠{' '}
              {devUnlock
                ? '開発モード ON'
                : '開発モード OFF'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // ログイン後
  // ---------------------------------------------------------
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        boxSizing: 'border-box',
        textAlign: 'center',
        background:
          'linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)',
        padding: '24px 18px 40px',
      }}
    >
      {/* タイトル */}
      <div style={{ marginTop: '10px' }}>
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
            fontSize: '38px',
            color: '#5C4567',
            marginBottom: '8px',
            fontWeight: 700,
            letterSpacing: '1px',
            fontFamily: '"Cormorant Garamond", serif',
          }}
        >
          T & H Wedding
        </h1>

        <div
          style={{
            color: '#c9a44c',
            letterSpacing: '4px',
            fontSize: '16px',
            marginBottom: '18px',
            fontFamily: '"Cormorant Garamond", serif',
          }}
        >
          Welcome to Our Wedding
        </div>
      </div>

      {/* 写真 */}
      <div
        style={{
          marginTop: '30px',
          marginBottom: '28px',
          padding: '6px',
        }}
      >
        <img
          src={coupleImg}
          alt="Welcome"
          style={{
            width: '260px',
            height: '260px',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '6px solid rgba(255,255,255,0.95)',
            boxShadow: '0 10px 35px rgba(207,182,225,0.35)',
          }}
        />
      </div>

      {/* メニューカード */}
      <div
        style={{
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '24px',
          padding: '22px',
          maxWidth: '410px',
          margin: '0 auto',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#5A476F',
            marginBottom: '22px',
            fontFamily: '"Cormorant Garamond", serif',
          }}
        >
          Contents
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '14px',
          }}
        >
          {menuItems.map(({ icon, label, action }) => (
            <button
              key={label}
              onClick={action as () => void}
              style={{
                border: '1px solid #F3E5FA',
                background: 'linear-gradient(180deg,#FFFFFF,#FCF5FF)',
                borderRadius: '18px',
                padding: '16px 6px',
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
                transition: '0.2s',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  marginBottom: '8px',
                }}
              >
                {icon}
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: '#5A476F',
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* フッター */}
      <div
        style={{
          marginTop: '35px',
          color: '#a88bbf',
          fontSize: '13px',
          lineHeight: 1.8,
        }}
      >
        Thank you for celebrating with us.
        <br />
        Please enjoy this special day.
        <br />
        2026.09.26
      </div>

      {/* ログアウト */}
      <button
        onClick={() => {
          localStorage.removeItem('guest');
          setGuest(null);
        }}
        style={{
          marginTop: '20px',
          color: '#A58DB5',
          padding: '7px 16px',
          borderRadius: '30px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #F0E6F6',
          opacity: 0.7,
        }}
      >
        logout
      </button>
    </div>
  );
}