import React, { useEffect } from "react";
import Header from "../components/Header";
import drinkImg from "../../public/photos/full/drink.jpg"; 

const DrinkMenuPage: React.FC = () => {
  const alcoholList = [
    { name: 'ビール(エビス)' },
    { name: 'ノンアルコールビール(サッポロプレミアムアルコールフリー)' },
    { name: 'ロゼワイン（プラネタ ロゼ）' },
    { name: 'ロゼワイン（カルヴェミュルミュールドプロヴァンス ロゼ）' },
    { name: 'ロゼワイン（ローゼ・ディ・マァジ）' },
    { name: 'ウイスキー（デュワーズ12年）' },
    { name: '芋焼酎（黒霧島）', options: ['ソーダ割', 'ロック', '水割り'] },
    { name: '麦焼酎（白水）', options: ['ソーダ割', 'ロック', '水割り'] },
    { name: '日本酒（獺祭 純米大吟醸45）', options: ['冷', '常温'] },
    { name: 'ウォッカ/ジン/カシス'},
    { name: 'レモンサワー'},
  ];
  const softDrinkList = [
    { name: 'ピンクグレープフルーツジュース' },
    { name: 'コーラ' },
    { name: 'アップルジュース' },
    { name: 'ジンジャーエール' },
    { name: 'スルジーヴァ ナチュラル' },
    { name: 'スルジーヴァ スパークリング' },
    { name: 'ほうじ茶' },
    { name: '緑茶' },
    { name: 'すもも50％果汁入り飲料' },
    { name: '温州みかんストレートジュース' },
    { name: '白桃ストレートジュース' },
  ];



  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div
      style={{
        height: '100dvh',
        overflow: 'hidden',
        // backgroundColor: '#ffffff',
        backgroundImage: `
        linear-gradient(
        rgba(255,255,255,0.78),
        rgba(255,255,255,0.78)),url(${drinkImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 固定ヘッダー */}
      <Header title="飲み物" />

      {/* スクロール区域 */}
      <div
        style={{
          height: 'calc(100dvh - 130px)',
          overflowY: 'auto',
          padding: '20px',
          maxWidth: '420px',
          margin: '56px auto 0', // ← これだけ残す
        }}
      >
        {/* 🍸 おすすめドリンク */}
        <h3>おすすめドリンク</h3>

        <div
          style={{
            background: '#fff',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 0 8px' }}>
            <strong>田酒</strong>
          </p>
          <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
            新郎おすすめの日本酒。水のように飲める。
          </p>
        </div>

        <div
          style={{
            background: '#fff',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '0 0 8px' }}>
            <strong>鳥飼</strong>
          </p>
          <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
            新婦おすすめの米焼酎。米焼酎とは思えないフルーティーさ。
          </p>
        </div>

        {/* 🍺 アルコール */}
        <h3>アルコール</h3>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
          {alcoholList.map((drink) => (
            <li key={drink.name}>
              ・ {drink.name}
              {drink.options && (
                <span style={{ fontSize: '12px', color: '#777' }}>
                  （{drink.options.join(' / ')}）
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* 🥤 ソフトドリンク */}
        <h3 style={{ marginTop: '24px' }}>ソフトドリンク</h3>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
          {softDrinkList.map((drink) => (
            <li key={drink.name}>・ {drink.name}</li>
          ))}
        </ul>

        <p style={{ marginTop: '30px', fontSize: '13px', color: '#666' }}>
          ※おすすめドリンクについては、持ち込みのため品切れになる可能性があります。
        </p>
      </div>
    </div>
  );
};

export default DrinkMenuPage;
