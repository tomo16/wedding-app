import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import Header from '../components/Header';

function SeatingChartPage() {
  const { guest } = useGuest();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!guest) {
    navigate('/guest/login');
    return null;
  }
  const tables = {
    A: [
      ['青木', '芳仁'],
      ['糸洲', '弘'],
      ['川上', '智司'],
      ['坂本', '亘'],
      ['薗頭', '雅人'],
    ],
    B: [
      ['原田', '祥代'],
      ['近藤', '実咲'],
      ['稲岡', '明音'],
      ['瀬川', '優佳'],
      ['高橋', '光太郎'],
      ['中島', '緑里'],
      ['長谷川', '広敬'],
    ],
    C: [
      ['井川', '葵'],
      ['黒田', '清一郎'],
      ['深尾', '千尋'],
      ['水谷', '里紗'],
    ],
    D: [
      ['浅野', '茉里有'],
      ['出久根', '良樹'],
      ['落合', '政宗'],
      ['佐野', '将洋'],
      ['小西', '亮太'],
      ['菊地', '修平'],
      ['竹村', '拓希'],
      ['栃木', '駿太'],
    ],
    E: [
      ['久米', '友里恵'],
      ['廣川', '媛香'],
      ['舟木', '智恵'],
      ['佐藤', '沙羅'],
      ['角野', '歌保'],
    ],
    F: [
      ['藤野', '亮介'],
      ['藤野', '隆之'],
      ['藤野', '広一'],
      ['藤野', '夏子'],
      ['藤野', '哲也'],
      ['藤野', '祐太'],
      ['田口', '綾香'],
      ['藤野', '康宏'],
    ],
    G: [
      ['秋山', '幸司'],
      ['秋山', '友子'],
      ['秋山', '元良'],
      ['森', '剛一'],
      ['森', '素子'],
      ['森', '丈士'],
      ['桝本', '祐美子'],
    ],
    H: [
      ['奥野', 'ゆう'],
      ['奥野', '一英'],
      ['今村', '美羽'],
      ['奥野', 'かおる'],
      ['奥野', '功一朗'],
    ],
    I: [
      ['秋山', '広治'],
      ['秋山', '恵子'],
      ['播磨', '愛里子'],
      ['播磨', '渉'],
      ['播磨', '奏翔'],
      ['播磨', '勤'],
    ],
    J: [
      ['中島', '道子'],
      ['木村', '晃之'],
      ['木村', '恵理子'],
      ['木村', '萌恵'],
      ['木村', '晃大'],
      ['中島', '慎一'],
      ['中島', '智恵子'],
    ],
  };

  type TableCardProps = {
    name: string;
    guests: string[][];
  };

  const TableCard = ({ name, guests }: TableCardProps) => (
    <div
      style={{
        background: '#fff',
        border: '2px solid #b8860b',
        borderRadius: '8px',
        overflow: 'hidden',
        minHeight: '150px',
      }}
    >
      <div
        style={{
          backgroundColor: '#b8860b',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '4px',
        }}
      >
        {name}
      </div>

      <div
        style={{
          padding: '8px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '8px',
          rowGap: '6px',
        }}
      >
        {guests.map(([lastName, firstName]) => (
          <div
            key={`${lastName}${firstName}`}
            style={{
              textAlign: 'center',
              fontSize: '12px',
              lineHeight: '1.1',
            }}
          >
            <div>{lastName}</div>
            <div>{firstName}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff9cc',
      }}
    >
      <Header title="席次表" />

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
            maxWidth: '500px',
            margin: '0 auto',
            padding: '16px',
          }}
        >
          {/* 新郎新婦 */}
          <div
            style={{
              width: '220px',
              margin: '0 auto 24px',
              textAlign: 'center',
              padding: '12px',
              border: '2px solid #b8860b',
              borderRadius: '8px',
              backgroundColor: '#fff',
              fontWeight: 'bold',
            }}
          >
            新郎新婦
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
          >
            {/* 1行目 */}
            <TableCard name="A" guests={tables.A} />
            <TableCard name="B" guests={tables.B} />
            <TableCard name="C" guests={tables.C} />

            <TableCard name="D" guests={tables.D} />
            <div />
            <TableCard name="E" guests={tables.E} />

            <TableCard name="F" guests={tables.F} />
            <TableCard name="G" guests={tables.G} />
            <TableCard name="H" guests={tables.H} />

            <TableCard name="I" guests={tables.I} />
            <div />
            <TableCard name="J" guests={tables.J} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatingChartPage;
