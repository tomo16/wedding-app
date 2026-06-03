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
            スポーツ観戦が好きで、浦和レッズと埼玉西武ライオンズをゆるく応援しています。
            <br />
            現地観戦は年に数回ほどですが、普段から試合結果を追うのが日課です。
            <br />
            西武がようやく強くなってきて最近は楽しみが増えました。（浦和は少し心配ですが・・）
            <br />
            妻が「ベルーナドーム（西武の本拠地）は遠いからいやだ！！！」といっているのでCSに進出したら一緒に行こうと説得中です。
            <br />
            結婚式の準備では、このアプリの設計・開発・テストを担当しました。
            <br />
            バグを見つけた方は、メッセージ機能からこっそり教えてください。
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

          <p style={{ margin: '0 0 8px', color: '#555' }}>
            私は食べ飲みすることと、推し活を兼ねた旅行、そして実家の犬を愛でている時間が何よりも好きです！
            <br />
            落ち込んでいるときも、おいしいものを食べて飲んで、推しや犬に癒されればだいたいゴキゲンになります🍺
            <br />
            今日まで、家族（もちろん犬も含みます！）や友人との出会いに恵まれ、本当に幸せな人生を歩んできたと感じています。
            <br />
            こうして今日という日を迎えられたことに感謝し、これからは夫婦で力を合わせながら、笑顔とおいしいごはんの絶えない家庭を築いていきたいと思います。
            <br />
            まずは夫婦そろって健康に、美味しく食べ続けることを目標に、筋トレも頑張ります！
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
