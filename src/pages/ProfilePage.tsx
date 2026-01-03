import React, { useEffect } from "react";
import Header from "../components/Header";
import groomImg from "../../public/photos/full/IMG_6736.jpg";  // 新郎写真
import brideImg from "../../public/photos/full/IMG_6711.jpg";  // 新婦写真

const ProfilePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* 固定ヘッダー */}
      <Header title="プロフィール" />

      {/* コンテンツ（スクロール部分） */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: '76px',
          paddingBottom: '24px',
        }}
      >
        {/* ▼ 新郎プロフィール ▼ */}
        <div
          style={{
            width: '90%',
            maxWidth: '400px',
            margin: '0 auto',
            background: '#ffffff',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            textAlign: 'left',
            backgroundColor: '#f0f0f0',
          }}
        >
          <h3 style={{ margin: 0 }}>👦 新郎プロフィール</h3>

          <img
            src={groomImg}
            alt="新郎写真"
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%', // ← 丸型にする
              objectFit: 'cover', // ← 顔の中心をきれいに表示
              display: 'block',
              margin: '16px auto', // ← 中央寄せ
              border: '3px solid #eee', // ← ほんのり枠（おしゃれ）
            }}
          />

          <p style={{ margin: '0 0 8px', color: '#555' }}>・名前：秋山 朋輝</p>
          <p style={{ margin: '0 0 8px', color: '#555' }}>・出身：練馬区</p>
          <p style={{ margin: '0 0 8px', color: '#555' }}>
            ・趣味：スポーツ観戦
          </p>
          <p style={{ margin: 0, color: '#555' }}>
            ・性格：穏やかで優しいタイプ
          </p>
        </div>

        {/* ▼ 新婦プロフィール ▼ */}
        <div
          style={{
            width: '90%',
            maxWidth: '400px',
            margin: '24px auto 0',
            background: '#ffffff',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            textAlign: 'left',
            backgroundColor: '#f0f0f0',
          }}
        >
          <h3 style={{ margin: 0 }}>👰 新婦プロフィール</h3>

          <img
            src={brideImg}
            alt="新婦写真"
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
              margin: '16px auto',
              border: '3px solid #eee',
            }}
          />

          <p style={{ margin: '0 0 8px', color: '#555' }}>・名前：中島 瞳</p>
          <p style={{ margin: '0 0 8px', color: '#555' }}>・出身：足立区</p>
          <p style={{ margin: '0 0 8px', color: '#555' }}>
            ・趣味：旅行
          </p>
          <p style={{ margin: 0, color: '#555' }}>
            ・性格：明るくて笑顔が多いタイプ
          </p>
        </div>

        {/* ▼ ストーリー & Q&A（元コードそのまま利用可） ▼ */}
        {/* ここからはあなたの元コードそのまま貼ってOK */}
        {/* タイムライン風ストーリー */}
        <div
          style={{
            width: '90%',
            maxWidth: '400px',
            margin: '24px auto 0',
            textAlign: 'left',
            background: 'white',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            backgroundColor: '#f0f0f0',
          }}
        >
          <h3 style={{ marginTop: 0 }}>📖 2人のストーリー</h3>

          <div style={{ borderLeft: '3px solid #4F46E5', paddingLeft: '12px' }}>
            <div style={{ margin: '12px 0' }}>
              <strong>2023年 7月 初デート</strong>
              <p style={{ margin: '4px 0', color: '#555' }}>
                会話の波長がとても合って、不思議と緊張せずに過ごせました。
              </p>
            </div>

            <div style={{ margin: '12px 0' }}>
              <strong>2023年 8月 交際スタート</strong>
              <p style={{ margin: '4px 0', color: '#555' }}>
                会う回数が増えるにつれて、日常の中に相手がいることが当たり前になっていきました。
              </p>
            </div>

            <div style={{ margin: '12px 0' }}>
              <strong>2025年 8月 プロポーズ</strong>
              <p style={{ margin: '4px 0', color: '#555' }}>
                お互いに気を張らずに自然体でいられる関係になり、これから先も隣で歩んでいきたいと思いました。
              </p>
            </div>

            <div style={{ margin: '12px 0' }}>
              <strong>2026年 9/26 結婚式</strong>
              <p style={{ margin: '4px 0', color: '#555' }}>
                本日はどうぞごゆっくりお楽しみください。
              </p>
            </div>
          </div>
        </div>

        {/* Q&Aコーナー */}
        <div
          style={{
            width: '90%',
            maxWidth: '400px',
            margin: '24px auto 0',
            textAlign: 'left',
            background: '#fdfdfd',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            backgroundColor: '#f0f0f0',
          }}
        >
          <h3 style={{ marginTop: 0 }}>❓ Q&A</h3>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Q. 相手のどんなところに惹かれましたか？
            </p>
            <p style={{ margin: 0, color: '#555' }}>
              新郎：かわいさとおもしろさを持ちつつ、真面目さも兼ね備えているところです。<br/>
              新婦：てすと
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Q. 相手の「ここがすごい」と思うところは？
            </p>
            <p style={{ margin: 0, color: '#555' }}>
              新郎：目標を立てたら、自分で考えて行動し、それを継続して、きちんと結果も出すところです。
            </p>
            <p style={{ margin: 0, color: '#555' }}>
              新婦：てすと
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Q. お互いの「相手の」ちょっとした失敗エピソードは？
            </p>
            <p style={{ margin: 0, color: '#555' }}>
              新郎：ボトルタイプの日焼け止めを包んでいる外側のフィルムを、開け口とは違うところからパワーで剥がそうとして、結局ポンプの部分に引っかかって開けられませんでした。
            </p>
            <p style={{ margin: 0, color: '#555' }}>
              新婦：てすと
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Q. 結婚の決め手は？
            </p>
            <p style={{ margin: 0, color: '#555' }}>
              新郎：一緒に過ごす時間が居心地よく、何気ない毎日も楽しく感じられたことです。
            </p>
            <p style={{ margin: 0, color: '#555' }}>
              新婦：てすと
            </p>
          </div>

          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Q. これから二人で大切にしたいことは？
            </p>
            <p style={{ margin: 0, color: '#555' }}>
              新郎：どんなときも話し合いを大切にしながら、笑顔で過ごせる関係でいることです。
            </p>
            <p style={{ margin: 0, color: '#555' }}>
              新婦：てすと
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
