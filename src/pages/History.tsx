import React, { useEffect } from "react";
import Header from "../components/Header";

const HistoryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header title="ヒストリー" />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: '76px',
          paddingBottom: '24px',
        }}
      >
        <div
          style={{
            width: '90%',
            maxWidth: '400px',
            margin: '0 auto',
            textAlign: 'left',
            backgroundColor: '#e3f0ff',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          <h3 style={{ marginTop: 0, color: '#2C7A7B' }}>📖 ふたりの歩み</h3>

          <div>
            <div style={{ margin: '12px 0' }}>
              <strong style={{ color: '#2C7A7B' }}>◯ 2023年7月 出会い</strong>
              <p style={{ margin: '4px 0', color: '#555' }}>
                マッチングアプリで出会いました。
                <br />
                会話の波長がとても合い、
                <br />
                初めてとは思えないほど自然に過ごすことができました。
              </p>
            </div>

            <div style={{ margin: '12px 0' }}>
              <strong style={{ color: '#2C7A7B' }}>
                ◯ 2023年8月 交際スタート
              </strong>
              <p style={{ margin: '4px 0', color: '#555' }}>
                互いの家がかなり近かったこともあり、週一以上のペースで会っていました。
                <br />
                北千住、上野のカフェや居酒屋を中心に、いろんなところに遊びに行きました。
                <br />
                酒場ハコザキ上野店は二人の行きつけとなり、今でも上野へ行くと立ち寄っています。
              </p>
            </div>

            <div style={{ margin: '12px 0' }}>
              <strong style={{ color: '#2C7A7B' }}>
                ◯ 2025年8月 プロポーズ
              </strong>
              <p style={{ margin: '4px 0', color: '#555' }}>
                東京タワーが見えるホテルの部屋でプロポーズしました。
                <br />
                お互いに気を張らずに自然体でいられる関係になり、
                これから先も人生を共に歩んでいきたいと思いました。
              </p>
            </div>

            <div style={{ margin: '12px 0' }}>
              <strong style={{ color: '#2C7A7B' }}>◯ 2026年1月 入籍</strong>
              <p style={{ margin: '4px 0', color: '#555' }}>
                1月に入籍しました。
                <br />
                春秋がお互いの誕生日で、夏が交際記念日なので、
                <br />
                「一年中ケーキを食べる理由ができた！」と妻が喜んでます。
              </p>
            </div>

            <div
              style={{
                margin: '12px 0',
                paddingTop: '12px',
                borderTop: '1px solid rgba(44,122,123,0.2)',
              }}
            >
              <strong style={{ color: '#2C7A7B' }}>
                ◯ 2026年9月26日 結婚式
              </strong>
              <p style={{ margin: '4px 0', color: '#555' }}>
                本日はお越しいただきありがとうございます。
                <br />
                今日という日を迎えられたのは、いつも支えてくださった皆さまのおかげです。
                <br />
                感謝の気持ちを込めて準備してまいりましたので、
                <br />
                どうぞごゆっくりお楽しみください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;