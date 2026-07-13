import React, { useEffect } from 'react';
import Header from '../components/Header';

const histories = [
  {
    date: '2023.07',
    title: '出会い',
    body: (
      <>
        マッチングアプリで出会いました。
        <br />
        会話の波長がとても合い、
        <br />
        初めてとは思えないほど自然に過ごすことができました。
      </>
    ),
  },
  {
    date: '2023.08',
    title: '交際スタート',
    body: (
      <>
        お互いの家が近かったこともあり、
        <br />
        週一以上のペースで会っていました。
        <br />
        北千住や上野を中心に、
        <br />
        たくさん思い出を作りました。
      </>
    ),
  },
  {
    date: '2024',
    title: '旅行三昧',
    body: (
      <>
        岩手・青森・北海道など、
        <br />
        たくさん旅行へ行きました。
        <br />
        わんこそばでは
        <br />
        新郎70杯・新婦100杯達成。
        <br />
        （本人談：「まだ食べられた」）
      </>
    ),
  },
  {
    date: '2025.08',
    title: 'プロポーズ',
    body: (
      <>
        東京タワーが見えるホテルで
        <br />
        プロポーズ。
        <br />
        自然体でいられる相手だと
        <br />
        改めて感じました。
      </>
    ),
  },
  {
    date: '2026.01',
    title: '入籍',
    body: (
      <>
        1月に入籍しました。
        <br />
        春秋がお互いの誕生日で、夏が交際記念日なので、
        <br />
        「一年中ケーキを食べる理由ができた！」
        <br />
        と二人で喜んでいます。
      </>
    ),
  },
  {
    date: '2026.09.26',
    title: 'Wedding Day',
    body: (
      <>
        本日はお越しいただき
        <br />
        本当にありがとうございます。
        <br />
        感謝の気持ちを込めて
        <br />
        準備いたしました。
        <br />
        どうぞごゆっくりお楽しみください。
      </>
    ),
  },
];

const HistoryPage: React.FC = () => {
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
      <Header title="" />

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
            fontSize: '38px',
            color: '#5C4567',
            fontFamily: '"Cormorant Garamond", serif',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          Our Story
        </h1>

        <div
          style={{
            color: '#C9A44C',
            letterSpacing: '3px',
            fontSize: '15px',
            marginBottom: '18px',
            textAlign: 'center',
          }}
        >
          Since 2023
        </div>

        <p
          style={{
            color: '#6F5E72',
            textAlign: 'center',
            lineHeight: 1.8,
            fontSize: '14px',
            marginBottom: '34px',
          }}
        >
          私たちの歩みを
          <br />
          少しだけご紹介します
        </p>

        {histories.map((history) => (
          <div
            key={history.date}
            style={{
              background: 'rgba(255,255,255,.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '22px',
              padding: '22px',
              marginBottom: '18px',
              boxShadow: '0 8px 24px rgba(0,0,0,.08)',
            }}
          >
            <div
              style={{
                color: '#C9A44C',
                fontSize: '13px',
                letterSpacing: '2px',
                marginBottom: '8px',
                fontWeight: 700,
              }}
            >
              {history.date}
            </div>

            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                color: '#5C4567',
                fontSize: '30px',
                marginBottom: '12px',
              }}
            >
              {history.title}
            </div>

            <div
              style={{
                width: '50px',
                height: 1,
                background: '#D6B4E8',
                marginBottom: '14px',
              }}
            />

            <div
              style={{
                color: '#555',
                lineHeight: 1.9,
                fontSize: '15px',
              }}
            >
              {history.body}
            </div>
          </div>
        ))}

        <div
          style={{
            marginTop: '24px',
            color: '#A88BBF',
            textAlign: 'center',
            fontSize: '13px',
            lineHeight: 1.8,
          }}
        >
          Every chapter has led us
          <br />
          to this wonderful day.
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;