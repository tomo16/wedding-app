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
    '青木芳仁',
    '糸洲弘',
    '川上さとし',
    '坂本亘',
    '薗頭雅人',
  ],
  B: [
    '原田祥代',
    '近藤実咲',
    '稲岡明音',
    '瀬川優佳',
    '高橋光太郎',
    '中島緑里',
    '長谷川広敬',
  ],
  C: [
    '井川葵',
    '黒田清一郎',
    '深尾千尋',
    '水谷里紗',
  ],
  D: [
    '浅野茉里有',
    '出久根良樹',
    '落合政宗',
    '佐野将洋',
    '小西亮太',
    '菊地修平',
    '竹村拓希',
    '栃木駿太',
  ],
  E: [
    '久米友里恵',
    '廣川媛香',
    '舟木智恵',
    '佐藤沙羅',
    '角野歌保',
  ],
  F: [
    '藤野亮介',
    '藤野隆之',
    '藤野広一',
    '藤野夏子',
    '藤野哲也',
    '藤野祐太',
    '田口綾香',
    '藤野康宏',
  ],
  G: [
    '秋山幸司',
    '秋山友子',
    '秋山元良',
    '森剛一',
    '森素子',
    '森丈士',
    '桝本祐美子',
  ],
  H: [
    '奥野ゆう',
    '奥野一英',
    '今村美羽',
    '奥野かおる',
    '奥野功一朗',
  ],
  I: [
    '秋山広治',
    '秋山恵子',
    '播磨愛里子',
    '播磨渉',
    '播磨奏翔',
    '播磨勉',
  ],
  J: [
    '中島道子',
    '木村晃之',
    '木村恵理子',
    '木村萌恵',
    '木村晃大',
    '中島慎一',
    '中島智恵子',
  ],
};

  type TableCardProps = {
    name: string;
    guests: string[];
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
          fontSize: '12px',
          lineHeight: '1.6',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '8px',
        }}
      >
        {guests.map((g) => (
          <div
            key={g}
            style={{
              whiteSpace: 'nowrap',
              fontSize: '11px',
            }}
          >
            {g}
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
