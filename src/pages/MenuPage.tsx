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
      items: ['「しあわせ絆牛」フィレ肉と木の実味噌を纏ったフォアグラ 吟醸酒と塩麹のソース'],
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
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-20%);
            }
          }
        `}
      </style>

      <div
        style={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#fdfaf7',
        }}
      >
        {/* 背景画像 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            zIndex: 0,
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

              opacity: 0.4,

              animation:
                'bgSlide 18s ease-in-out infinite alternate',
            }}
          />

          {/* 白オーバーレイ */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.45)',
            }}
          />
        </div>

        {/* メインコンテンツ */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header title=" お食事" />

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '76px 20px 40px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                maxWidth: '420px',
                margin: '0 auto',

                background: 'transparent',

                borderRadius: '24px',
                padding: '24px',

                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
            >
              {menuList.map((section) => (
                <div
                  key={section.title}
                  style={{
                    marginBottom: '28px',
                  }}
                >
                  <h3
                    style={{
                      marginBottom: '12px',
                      color: '#7b5e57',
                      borderBottom: '1px solid #ddd',
                      paddingBottom: '6px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {section.title}
                  </h3>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      lineHeight: '2',
                      color: '#444',
                    }}
                  >
                    {section.items.map((item) => (
                      <li key={item}>・{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuPage;