import React, { useEffect } from "react";
import Header from "../components/Header";

const VenueInfoPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",   // ページ全体のスクロール禁止
      }}
    >
      <Header title=" ご案内・注意事項" />

      {/* コンテンツをスクロールさせる領域 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",        // ← ここだけスクロール
          padding: "76px 0 20px",   // ヘッダー分の余白 + 下に少し余裕
        }}
      >
        {/* 披露宴会場（カード） */}
        <section
          style={{
            width: '90%',
            maxWidth: '420px',
            margin: '0 auto',
            textAlign: 'left',
            background: '#fafafa',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            backgroundColor: '#e6ffe6'
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>🎉 披露宴会場</h3>
          <p style={{ margin: '0', color: '#444' }}>
            会場：「グラマシースイート(B1F,1F)」<br/>
            スタッフのご案内があるまでは、1Fのウェルカムスペースにてお待ちください。<br/>
            カウンターバーでお好きなドリンクの注文も可能です。
          </p>
        </section>

        {/* 会場内の案内 */}
        <section
          style={{
            width: '90%',
            maxWidth: '420px',
            margin: '18px auto 0',
            textAlign: 'left',
            background: 'white',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            backgroundColor: '#e6ffe6'
          }}
        >
          <h3 style={{ marginTop: 0 }}>📌 会場内のご案内</h3>
          <ul
            style={{
              paddingLeft: '18px',
              margin: 0,
              color: '#444',
              lineHeight: 1.8,
            }}
          >
            <li>トイレ：披露宴フロアB1F（扉を出て右手）</li>
            <li>喫煙所：館内は全面禁煙</li>
            <li>クローク：1F 受付横（披露宴中はお預かり可能）</li>
          </ul>
        </section>

        {/* 当日のお願い */}
        <section
          style={{
            width: '90%',
            maxWidth: '420px',
            margin: '18px auto 0',
            textAlign: 'left',
            background: '#fdfdfd',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            backgroundColor: '#e6ffe6'
          }}
        >
          <h3 style={{ marginTop: 0 }}>📱 当日のお願い</h3>

          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontWeight: 700, margin: '0 0 6px 0' }}>スマホの設定</p>
            <p style={{ margin: 0, color: '#444' }}>
              式中はマナーモードまたはサイレントにしてください。
            </p>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontWeight: 700, margin: '0 0 6px 0' }}>写真撮影</p>
            <p style={{ margin: 0, color: '#444' }}>
              挙式中：撮影NG（会場規則に準拠）<br/>
              披露宴中：撮影OK（SNS投稿は控えめにお願いします）
            </p>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontWeight: 700, margin: '0 0 6px 0' }}>飲み物</p>
            <p style={{ margin: 0, color: '#444' }}>
              フリードリンクです。スタッフにお申し付けください。
            </p>
          </div>

          <div>
            <p style={{ fontWeight: 700, margin: '0 0 6px 0' }}>再入場について</p>
            <p style={{ margin: 0, color: '#444' }}>
              一時外出の際は受付またはスタッフにお声がけください。
            </p>
          </div>
        </section>

        {/* その他のご案内 */}
        <section
          style={{
            width: '90%',
            maxWidth: '420px',
            margin: '18px auto 28px',
            textAlign: 'left',
            background: '#fafafa',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            backgroundColor: '#e6ffe6'
          }}
        >
          <h3 style={{ marginTop: 0 }}>👶 その他のご案内</h3>

          <p style={{ margin: '6px 0', color: '#444' }}>
            おむつ替え：B1Fお手洗いにベビーシートあり。授乳室をご希望の方はスタッフまでお声がけください。
          </p>
        </section>
      </div>
    </div>
  );
};

export default VenueInfoPage;
