import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import drinkImg from '../../public/photos/full/drink.jpg';

const DrinkMenuPage: React.FC = () => {
  const alcoholList = [
    { name: 'ビール(エビス)' },
    { name: 'ノンアルコールビール(サッポロプレミアム\nアルコールフリー)' },
    {
      name: 'ロゼワイン\n（プラネタ ロゼ/カルヴェミュルミュールドプロヴァンス ロゼ/\nローザ・ディ・マージ）',
    },
    { name: 'ウイスキー（デュワーズ12年）' },
    { name: '芋焼酎（黒霧島）' },
    { name: '麦焼酎（白水）' },
    { name: '日本酒（獺祭 純米大吟醸45）' },
    { name: 'ウォッカ/ジン/カシス/レモンサワー' },
  ];

  // ソフトドリンク
  const softDrinkList = [
    { name: 'ピンクグレープフルーツ' },
    { name: 'アップル' },
    { name: 'コーラ' },
    { name: 'ジンジャーエール' },
    { name: 'スルジーヴァ ナチュラル' },
    { name: 'スルジーヴァ スパークリング' },
  ];

  // CRAFT BREW TEA
  const teaList = [
    { name: 'ほうじ茶' },
    { name: '緑茶' },
  ];

  // ストレートジュース
  const juiceList = [
    { name: '長野県産\nフジ林檎ストレートジュース' },
    { name: '静岡県産\n温州みかんストレートジュース' },
    { name: '山梨県産\n白桃ストレートジュース' },
  ];

  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });

    const shown = sessionStorage.getItem('drinkNoticeShown');

    if (!shown) {
      setShowNotice(true);
      sessionStorage.setItem('drinkNoticeShown', 'true');
    }
  }, []);

  return (
    <div
      style={{
        height: '100dvh',
        overflow: 'hidden',
        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,0.45),
        rgba(255,255,255,0.55)),
        url(${drinkImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 固定ヘッダー */}
      <Header title="" />

      {/* スクロール区域 */}
      <div
        style={{
          height: 'calc(100dvh - 56px)',
          overflowY: 'auto',
          padding: '90px 24px 80px',
          maxWidth: '420px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* タイトル */}
        <div
          style={{
            width: 70,
            height: 2,
            background: '#d7b8ff',
            margin: '0 auto 20px',
          }}
        />

        <h1
          style={{
            fontSize: '48px',
            color: '#5C4567',
            fontFamily: '"Cormorant Garamond", serif',
            marginBottom: '6px',
          }}
        >
          Drinks
        </h1>

        <div
          style={{
            color: '#C9A44C',
            letterSpacing: '4px',
            marginBottom: '45px',
          }}
        >
          Beverage Menu
        </div>

        {/* 🍸 おすすめドリンク */}
        <h3
          style={{
            fontSize: '30px',
            color: '#5C4567',
            fontFamily: '"Cormorant Garamond", serif',
            marginBottom: '18px',
          }}
        >
          Special Drinks
        </h3>

        <div
          style={{
            padding: '34px 26px',
            marginBottom: '40px',
            background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            border: '1px solid rgba(255,255,255,.30)',
            borderRadius: '26px',
            boxShadow: '0 10px 30px rgba(0,0,0,.08)',
          }}
        >
          <div
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '30px',
              color: '#4B3459',
              marginBottom: '10px',
            }}
          >
            田酒
          </div>

          <div
            style={{
              color: '#4F4553',
              lineHeight: 1.8,
              fontSize: '15px',
            }}
          >
            新郎おすすめの日本酒。
            <br />
            水のように飲める。
            <br />
            (妻と1時間で720mlを飲み干しました。)
          </div>

          <div
            style={{
              width: '70%',
              height: 1,
              background: 'rgba(92,69,103,.18)',
              margin: '28px auto',
            }}
          />

          <div
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '30px',
              color: '#4B3459',
              marginBottom: '10px',
            }}
          >
            Ao
          </div>

          <div
            style={{
              color: '#4F4553',
              lineHeight: 1.8,
              fontSize: '15px',
            }}
          >
            新婦おすすめのウイスキー。
            <br />
            ごはんにも、甘いものにも合う。
            <br />
            (ハイボールでよく飲んでます。)
          </div>
        </div>

        {/* 🍺 アルコール */}
        <div
          style={{
            background: 'rgba(255,255,255,.14)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '36px',
          }}
        >
          <h3
            style={{
              fontSize: '30px',
              color: '#5C4567',
              fontFamily: '"Cormorant Garamond", serif',
              marginBottom: '12px',
            }}
          >
            Alcohol
          </h3>

          <div
            style={{
              width: 50,
              height: 1,
              background: '#D6B4E8',
              margin: '0 auto 20px',
            }}
          />

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              lineHeight: '1.8',
            }}
          >
            {alcoholList.map((drink) => (
              <li
                key={drink.name}
                style={{
                  marginBottom: '12px',
                  fontFamily: '"Noto Serif JP", serif',
                  fontSize: '16px',
                  color: '#2F2635',
                  fontWeight: 500,
                  textShadow: '0 1px 5px rgba(255,255,255,.9)',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {drink.name}
              </li>
            ))}
          </ul>
        </div>

        {/* 🥤 ソフトドリンク */}
        <div
          style={{
            background: 'rgba(255,255,255,.14)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '36px',
          }}
        >
          <h3
            style={{
              fontSize: '30px',
              color: '#5C4567',
              fontFamily: '"Cormorant Garamond", serif',
              marginBottom: '12px',
            }}
          >
            Soft Drinks
          </h3>

          <div
            style={{
              width: 50,
              height: 1,
              background: '#D6B4E8',
              margin: '0 auto 20px',
            }}
          />

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              lineHeight: '1.8',
            }}
          >
            {softDrinkList.map((drink) => (
              <li
                key={drink.name}
                style={{
                  marginBottom: '12px',
                  fontFamily: '"Noto Serif JP", serif',
                  fontSize: '16px',
                  color: '#2F2635',
                  fontWeight: 500,
                  textShadow: '0 1px 5px rgba(255,255,255,.9)',
                  lineHeight: 1.8,
                }}
              >
                {drink.name}
              </li>
            ))}
          </ul>
        </div>

        {/* 🍵 CRAFT BREW TEA */}
        <div
          style={{
            background: 'rgba(255,255,255,.14)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '36px',
          }}
        >
          <h3
            style={{
              fontSize: '30px',
              color: '#5C4567',
              fontFamily: '"Cormorant Garamond", serif',
              marginBottom: '12px',
            }}
          >
            CRAFT BREW TEA
          </h3>

          <div
            style={{
              width: 50,
              height: 1,
              background: '#D6B4E8',
              margin: '0 auto 20px',
            }}
          />

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              lineHeight: '1.8',
            }}
          >
            {teaList.map((drink) => (
              <li
                key={drink.name}
                style={{
                  marginBottom: '12px',
                  fontFamily: '"Noto Serif JP", serif',
                  fontSize: '16px',
                  color: '#2F2635',
                  fontWeight: 500,
                  textShadow: '0 1px 5px rgba(255,255,255,.9)',
                  lineHeight: 1.8,
                }}
              >
                {drink.name}
              </li>
            ))}
          </ul>
        </div>

        {/* 🍎 ストレートジュース */}
        <div
          style={{
            background: 'rgba(255,255,255,.14)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '36px',
          }}
        >
          <h3
            style={{
              fontSize: '30px',
              color: '#5C4567',
              fontFamily: '"Cormorant Garamond", serif',
              marginBottom: '12px',
            }}
          >
            Juice
          </h3>

          <div
            style={{
              width: 50,
              height: 1,
              background: '#D6B4E8',
              margin: '0 auto 20px',
            }}
          />

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              lineHeight: '1.8',
            }}
          >
            {juiceList.map((drink) => (
              <li
                key={drink.name}
                style={{
                  marginBottom: '12px',
                  fontFamily: '"Noto Serif JP", serif',
                  fontSize: '16px',
                  color: '#2F2635',
                  fontWeight: 500,
                  textShadow: '0 1px 5px rgba(255,255,255,.9)',
                  lineHeight: 1.8,
                }}
              >
                {drink.name}
              </li>
            ))}
          </ul>
        </div>

        <p
          style={{
            marginTop: '30px',
            fontSize: '13px',
            color: '#666',
            marginBottom: '80px',
          }}
        >
          ※Special Drinksについては持ち込みのため,
          <br />
          品切れになる可能性があります。
        </p>
      </div>

      {/* お知らせ */}
      {showNotice && (
        <div
          onClick={() => setShowNotice(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '340px',
              background: 'rgba(255,255,255,.96)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              padding: '28px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,.2)',
            }}
          >
            <div
              style={{
                fontSize: '28px',
                color: '#5C4567',
                fontFamily: '"Cormorant Garamond", serif',
                marginBottom: '12px',
              }}
            >
              お知らせ
            </div>

            <p
              style={{
                lineHeight: 1.9,
                color: '#555',
                marginBottom: '24px',
              }}
            >
              Special Drinks は
              <br />
              このアプリ限定メニューです。
              <br />
              テーブルのメニューには
              <br />
              掲載されておりません。
              <br />
              <br />
              <strong>
                ご注文の際は
                <br />
                この画面をスタッフへ お見せください。
              </strong>
            </p>

            <button
              onClick={() => setShowNotice(false)}
              style={{
                width: '100%',
                padding: '14px',
                border: 'none',
                borderRadius: '999px',
                background: 'linear-gradient(90deg,#D99CC7,#C08ED7)',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              メニューを見る
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinkMenuPage;