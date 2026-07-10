import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import Header from '../components/Header';
import { useEffect } from 'react';
import usePageScrollLock from '../hooks/usePageScrollLock';
import eatingImg from '../../public/photos/full/eating.jpg';

function MenuPage() {
  const { guest } = useGuest();
  const navigate = useNavigate();

  usePageScrollLock(true);

  if (!guest) {
    navigate('/guest/login');
    return null;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuList = [
    {
      title: 'Premier',
      items: ['サーモンのマリネと檸檬のコンポジション'],
    },
    {
      title: 'Deuxième',
      items: ['カリフラワーのヴルーテトリュフとヘーゼルナッツ添え'],
    },
    {
      title: 'Poisson',
      items: ['真鯛のバプール イベリコ豚のチョリソとピペラード'],
    },
    {
      title: 'Granité',
      items: ['ピンクグレープフルーツのフローズンジュレ'],
    },
    {
      title: 'Viande',
      items: [
        '「しあわせ絆牛」フィレ肉と木の実味噌を纏ったフォアグラ 吟醸酒と塩麹のソース',
      ],
    },
    {
      title: 'Dessert',
      items: ['スイーツビュッフェ'],
    },
  ];

  return (
    <>
      <style>
        {`
        @keyframes bgSlide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-20%);
          }
        }
      `}
      </style>

      <div
        style={{
          height: '100dvh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* 背景 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
          }}
        >
          <img
            src={eatingImg}
            alt=""
            style={{
              position: 'absolute',
              width: '140%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 0.45,
              animation: 'bgSlide 18s ease-in-out infinite alternate',
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(rgba(255,255,255,.45), rgba(255,255,255,.55))',
            }}
          />
        </div>

        <Header title="" />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            overflowY: 'auto',
            padding: '90px 24px 50px',
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
            Menu
          </h1>

          <div
            style={{
              color: '#C9A44C',
              letterSpacing: '4px',
              marginBottom: '45px',
            }}
          >
            Today's Course
          </div>

          {menuList.map((section, index) => (
            <div
              key={section.title}
              style={{
                marginBottom: index === menuList.length - 1 ? '80px' : '42px',
              }}
            >
              <div
                style={{
                  color: '#5C4567',
                  fontSize: '30px',
                  fontFamily: '"Cormorant Garamond", serif',
                  marginBottom: '16px',
                }}
              >
                {section.title}
              </div>

              <div
                style={{
                  width: 60,
                  height: 1,
                  background: '#d8b985',
                  margin: '0 auto 18px',
                }}
              />

              {section.items.map((item) => (
                <div
                  key={item}
                  style={{
                    fontFamily: '"Noto Serif JP", serif',
                    fontSize: '17px',
                    color: '#4F4553',
                    lineHeight: 1.9,
                    letterSpacing: '0.03em',
                    textAlign: 'center',
                    fontWeight: 500,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}

          <div
            style={{
              marginTop: '40px',
              color: '#7E6B86',
              fontSize: '14px',
              lineHeight: 1.8,
            }}
          >
            Bon Appétit
            <br />
            We hope you enjoy every dish.
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuPage;
