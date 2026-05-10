import { useNavigate } from "react-router-dom";
import { useGuest } from "../context/GuestContext";
import Header from "../components/Header";
import { useEffect } from "react";
import usePageScrollLock from "../hooks/usePageScrollLock";
import eatingImg from "../../public/photos/full/eating.jpg"; 
function MenuPage() {
  const { guest } = useGuest();
  const navigate = useNavigate();

  // ★これだけで十分。body の overflow 制御は絶対に二重で書かない
  usePageScrollLock(true);

  if (!guest) {
    navigate("/guest/login");
    return null;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuList = [
    {
      title: 'Amuse',
      items: ['季節のアミューズ'],
    },
    {
      title: 'Appetizer',
      items: ['真鯛のカルパッチョ', '彩り野菜のサラダ'],
    },
    {
      title: 'Soup',
      items: ['季節野菜のポタージュ'],
    },
    {
      title: 'Fish',
      items: ['オマール海老のポワレ'],
    },
    {
      title: 'Meat',
      items: ['国産牛フィレ肉のロースト'],
    },
    {
      title: 'Dessert',
      items: ['ウェディングデザート'],
    },
  ];

  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,0.78),
            rgba(255,255,255,0.78)
          ),
          url(${eatingImg})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
      // background: 'rgba(255,255,255,0.72)',
      // backdropFilter: 'blur(6px)',
      borderRadius: '24px',
      padding: '24px',
    }}
  >
    {menuList.map((section) => (
      <div key={section.title} style={{ marginBottom: '28px' }}>
        <h3
          style={{
            marginBottom: '12px',
            color: '#7b5e57',
            borderBottom: '1px solid #ddd',
            paddingBottom: '6px',
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
  );
}

export default MenuPage;
