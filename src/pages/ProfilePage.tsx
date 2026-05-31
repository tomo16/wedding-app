import React, { useEffect } from "react";
import Header from "../components/Header";
import groomImg from "../../public/photos/full/tomokisolo.jpg";  // 新郎写真
import brideImg from "../../public/photos/full/hitomisolo.jpg";  // 新婦写真

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
          <p style={{ margin: '0 0 8px', color: '#555' }}>・名前：ともき</p>
          <p style={{ margin: '0 0 8px', color: '#555' }}>・出身：練馬区</p>
          <p style={{ margin: '0 0 8px', color: '#555' }}>
            ・趣味：スポーツ観戦
          </p>

          <p style={{ margin: '0 0 8px', color: '#555' }}>
            スポーツ観戦が好きで、浦和レッズと埼玉西武ライオンズを応援しています。
            <br />
            西武がようやく強くなってきて、最近はとても楽しいです。（浦和は少し心配ですが。。）
            <br />
            妻が「ベルーナドーム（西部の本拠地）は遠いからいやだ！！！」、といっているのでCSに進出したら一緒に行こうと勝手に約束しています。
            <br />
            <br />
            結婚式の準備では、このアプリの設計・開発・テストを担当しました。
            <br />
            バグを見つけた方は、メッセージ機能から教えてください。
            <br />
            本日は楽しんでいただけるとうれしいです！
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

          <div
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '16px auto',
              border: '3px solid #eee',
            }}
          >
            <img
              src={brideImg}
              alt="新婦写真"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',

                // ← 顔位置微調整
                objectPosition: 'center 60%',

                // ← 写真だけ拡大
                transform: 'scale(1.22)',
              }}
            />
          </div>

          <p style={{ margin: '0 0 8px', color: '#555' }}>・名前：ひとみ</p>
          <p style={{ margin: '0 0 8px', color: '#555' }}>・出身：足立区</p>
          <p style={{ margin: '0 0 8px', color: '#555' }}>・趣味：推し活</p>
        </div>

        {/* Q&Aコーナー */}
        {/* <div
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

            <p style={{ margin: 0, color: '#555', display: 'flex' }}>
              <span style={{ minWidth: '3em', fontWeight: 500 }}>新郎：</span>
              <span>
                かわいさやおもしろさがありながら、
                <br />
                物事に真剣に向き合う真面目さも兼ね備えているところです。
              </span>
            </p>
            <p style={{ margin: 0, color: '#555', display: 'flex' }}>
              <span style={{ minWidth: '3em', fontWeight: 500 }}>新婦：</span>
              <span>てすと</span>
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Q. 相手の「ここがすごい」と思うところは？
            </p>
            <p style={{ margin: 0, color: '#555', display: 'flex' }}>
              <span style={{ minWidth: '3em', fontWeight: 500 }}>新郎：</span>
              <span>
                目標を立てると自分で考えて行動し、
                <br />
                それを継続して、きちんと結果につなげるところです。
              </span>
            </p>
            <p style={{ margin: 0, color: '#555', display: 'flex' }}>
              <span style={{ minWidth: '3em', fontWeight: 500 }}>新婦：</span>
              <span>てすと</span>
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Q. お互いの「相手の」ちょっとした失敗エピソードは？
            </p>
            <p style={{ margin: 0, color: '#555', display: 'flex' }}>
              <span style={{ minWidth: '3em', fontWeight: 500 }}>新郎：</span>
              <span>
                コショウをミルで挽くとき、
                <br />
                キャップを付けたまま一生懸命ガリガリ回して
                <br />
                「全然出ない！」と騒いでいましたが、
                <br />
                キャップに気づいて外した瞬間、
                <br />
                今度はどばっと出てしまったこと。
              </span>
            </p>
            <p style={{ margin: 0, color: '#555', display: 'flex' }}>
              <span style={{ minWidth: '3em', fontWeight: 500 }}>新婦：</span>
              <span>てすと</span>
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Q. 結婚の決め手は？
            </p>
            <p style={{ margin: 0, color: '#555', display: 'flex' }}>
              <span style={{ minWidth: '3em', fontWeight: 500 }}>新郎：</span>
              <span>
                一緒に過ごす時間がとても居心地よく、何気ない毎日も楽しく感じられたことです。
              </span>
            </p>
            <p style={{ margin: 0, color: '#555', display: 'flex' }}>
              <span style={{ minWidth: '3em', fontWeight: 500 }}>新婦：</span>
              <span>てすと</span>
            </p>
          </div>

          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Q. これから二人で大切にしたいことは？
            </p>
            <p style={{ margin: 0, color: '#555', display: 'flex' }}>
              <span style={{ minWidth: '3em', fontWeight: 500 }}>新郎：</span>
              <span>
                どんなときも話し合いを大切にしながら、
                <br />
                笑顔で過ごせる関係でいることです。
              </span>
            </p>
            <p style={{ margin: 0, color: '#555', display: 'flex' }}>
              <span style={{ minWidth: '3em', fontWeight: 500 }}>新婦：</span>
              <span>てすと</span>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
