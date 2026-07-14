import React, { useEffect } from 'react';
import Header from '../components/Header';
import groomImg from '../../public/photos/full/tomokisolo.jpg'; // 新郎写真
import brideImg from '../../public/photos/full/hitomisolo.jpg'; // 新婦写真

const ProfilePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      style={{
        minHeight: '100dvh',
        background:
          'linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)',
      }}
    >
      {/* 固定ヘッダー */}
      <Header title="" />

      {/* コンテンツ（スクロール部分） */}
      <div
        style={{
          paddingTop: '80px',
          paddingBottom: '40px',
          maxWidth: '430px',
          margin: '0 auto',
          paddingInline: '18px',
        }}
      >
        {/* タイトル */}

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
            fontSize: '36px',
            color: '#5C4567',
            fontFamily: '"Cormorant Garamond", serif',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          Profile
        </h1>

        <div
          style={{
            color: '#C9A44C',
            letterSpacing: '3px',
            textAlign: 'center',
            marginBottom: '18px',
          }}
        >
          About Us
        </div>

        <p
          style={{
            color: '#6F5E72',
            lineHeight: 1.8,
            fontSize: '14px',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          新郎新婦のプロフィールを
          <br />
          ご紹介します
        </p>

        {/* ▼ 新郎プロフィールカード */}
        {/* ▼ 新郎プロフィール ▼ */}

        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
            marginBottom: '30px',
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: '18px',
              textAlign: 'center',
              fontSize: '28px',
              color: '#5C4567',
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            Groom
          </h3>

          <div
            style={{
              width: 50,
              height: 1,
              background: '#D6B4E8',
              margin: '0 auto 24px',
            }}
          />

          <img
            src={groomImg}
            alt="新郎写真"
            style={{
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
              margin: '0 auto 24px',
              border: '5px solid rgba(255,255,255,.95)',
              boxShadow: '0 10px 30px rgba(170,135,200,.22)',
            }}
          />

          <h2
            style={{
              textAlign: 'center',
              color: '#5C4567',
              fontSize: '24px',
              marginBottom: '6px',
              fontWeight: 600,
            }}
          >
            ともき
          </h2>

          <p
            style={{
              textAlign: 'center',
              color: '#A88BBF',
              marginBottom: '28px',
              fontSize: '14px',
              letterSpacing: '1px',
            }}
          >
            東京都練馬区
          </p>

          <div
            style={{
              color: '#555',
              lineHeight: 2,
              fontSize: '15px',
            }}
          >
            <p style={{ marginTop: 0 }}>
              スポーツ観戦が好きで、浦和レッズと埼玉西武ライオンズを
              ゆるく応援しています。
            </p>

            <p>
              交際当初妻は、スポーツ観戦に全く興味がありませんでした。
              地道なプレゼン活動の結果、
              今では一緒にスタジアムへ行ってくれるまでになりました。
            </p>

            <p>
              とはいえ、 「ベルーナドームは遠いから嫌！」という壁だけは
              まだ乗り越えられていません。 <br />
              西武がCSに進出したら、 一緒に応援へ行くのが密かな目標です。
            </p>

            <div
              style={{
                height: 1,
                background: 'rgba(92,69,103,.12)',
                margin: '20px 0',
              }}
            />

            <p>
              今日という日を迎えられたのは、
              これまで支えてくださった皆様のおかげです。
            </p>

            <p>
              感謝の気持ちを少しでも形にしたいと思い、
              このアプリをおもてなしの一つとして、心を込めて作成しました。
              少しでも楽しんでいただけたら嬉しいです。
            </p>

            <p style={{ marginBottom: 0 }}>
              本日はどうぞごゆっくりお過ごしください。
              皆様と素敵な一日を過ごせることを、 心より楽しみにしています。
            </p>
          </div>
        </div>

        {/* ▼ 新婦プロフィール ▼ */}

        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
            marginBottom: '30px',
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: '18px',
              textAlign: 'center',
              fontSize: '28px',
              color: '#5C4567',
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            Bride
          </h3>

          <div
            style={{
              width: 50,
              height: 1,
              background: '#D6B4E8',
              margin: '0 auto 24px',
            }}
          />

          <div
            style={{
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto 24px',
              border: '5px solid rgba(255,255,255,.95)',
              boxShadow: '0 10px 30px rgba(170,135,200,.22)',
            }}
          >
            <img
              src={brideImg}
              alt="新婦写真"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 60%',
                transform: 'scale(1.22)',
              }}
            />
          </div>

          <h2
            style={{
              textAlign: 'center',
              color: '#5C4567',
              fontSize: '24px',
              marginBottom: '6px',
              fontWeight: 600,
            }}
          >
            ひとみ
          </h2>

          <p
            style={{
              textAlign: 'center',
              color: '#A88BBF',
              marginBottom: '28px',
              fontSize: '14px',
              letterSpacing: '1px',
            }}
          >
            東京都足立区
          </p>

          <div
            style={{
              color: '#555',
              lineHeight: 2,
              fontSize: '15px',
            }}
          >
            <p style={{ marginTop: 0 }}>
              食べること・飲むこと、 推し活を兼ねた旅行、
              そして実家の犬を愛でる時間が何より好きです。
            </p>

            <p>
              落ち込んでいるときも、 おいしいものを食べて飲んで、
              推しや犬に癒やされれば、 だいたいゴキゲンになります🍺
            </p>

            <div
              style={{
                height: 1,
                background: 'rgba(92,69,103,.12)',
                margin: '20px 0',
              }}
            />

            <p>
              今日まで、家族（もちろん犬も含みます！）や
              友人との出会いに恵まれ、
              本当に幸せな人生を歩んできたと感じています。
            </p>

            <p>
              今日という日を迎えられたことに感謝し、
              これからは夫婦で力を合わせながら、
              笑顔とおいしいごはんの絶えない家庭を 築いていきたいと思います。
            </p>

            <p style={{ marginBottom: 0 }}>
              まずは夫婦そろって健康に、 美味しく食べ続けることを目標に、
              筋トレも頑張ります！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
