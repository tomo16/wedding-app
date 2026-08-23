import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';
import Header from '../components/Header';

function SeatingChartPage() {
  const { guest } = useGuest();
  const navigate = useNavigate();

  if (!guest) {
    navigate('/guest/login');
    return null;
  }
  const tables = {
    A: [
      ['青木', '芳仁'],
      ['糸洲', '弘'],
      ['川上', '智司'],
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
      ['石田', '夏子'],
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
      ['木村', '晃大'],
      ['中島', '慎一'],
      ['中島', '智恵子'],
    ],
  };
  const [selectedTable, setSelectedTable] = useState<
    keyof typeof tables | null
  >(null);

  const tableCategory = {
    A: ['新郎友人', '（IS）'],
    B: ['新婦友人', '（立教）'],
    C: ['新婦友人', '（合宿委員）'],
    D: ['新郎友人', '（サッカー）'],
    E: ['新婦友人', '（山脇）'],
    F: ['新郎母方親族', ''],
    G: ['新郎父方親族', ''],
    H: ['新婦親族', ''],
    I: ['新郎家族', ''],
    J: ['新婦家族', ''],
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        background:
          'linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)',
        padding: '24px 18px 40px',
        textAlign: 'center',
      }}
    >
      <Header title="" />

      <div
        style={{
          paddingTop: '80px',
          maxWidth: '420px',
          margin: '0 auto',
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
            fontSize: '34px',
            color: '#5C4567',
            fontWeight: 700,
            marginBottom: '8px',
            fontFamily: '"Cormorant Garamond", serif',
          }}
        >
          Seating Chart
        </h1>

        <div
          style={{
            color: '#c9a44c',
            letterSpacing: '3px',
            fontSize: '15px',
            marginBottom: '18px',
          }}
        >
          Please Tap Your Table
        </div>

        <p
          style={{
            color: '#6F5E72',
            lineHeight: 1.8,
            marginBottom: '28px',
            fontSize: '14px',
          }}
        >
          テーブルをタップすると
          <br />
          お席をご確認いただけます
        </p>

        {/* 新郎新婦 */}
        <div
          style={{
            width: '220px',
            margin: '0 auto 30px',
            padding: '18px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,.92)',
            border: '1px solid #F2E5F6',
            boxShadow: '0 8px 24px rgba(160,120,190,.15)',
          }}
        >
          <div
            style={{
              color: '#5C4567',
              fontSize: '22px',
              fontWeight: 600,
              fontFamily: '"Cormorant Garamond", serif',
              letterSpacing: '1px',
            }}
          >
            Bride & Groom
          </div>
        </div>

        {/* テーブル一覧 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '16px',
          }}
        >
          {['A', 'B', 'C', 'D', '', 'E', 'F', 'G', 'H', 'I', '', 'J'].map(
            (table, index) => {
              if (table === '') {
                return <div key={index} />;
              }

              const [category, detail] =
                tableCategory[table as keyof typeof tableCategory];

              return (
                <button
                  key={table}
                  onClick={() => setSelectedTable(table as keyof typeof tables)}
                  style={{
                    background: 'rgba(255,255,255,.92)',
                    border: '1px solid #F1E6F8',
                    borderRadius: '18px',
                    padding: '18px 0',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,.05)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '28px',
                      color: '#C9A44C',
                      marginBottom: '8px',
                    }}
                  >
                    🍽
                  </div>

                  <div
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#5C4567',
                    }}
                  >
                    {table}
                  </div>

                  <div
                    style={{
                      marginTop: '6px',
                      lineHeight: 1.3,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#8B7A9A',
                        fontWeight: 600,
                      }}
                    >
                      {category}
                    </div>

                    {detail && (
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#B39AC8',
                        }}
                      >
                        {detail}
                      </div>
                    )}
                  </div>
                </button>
              );
            },
          )}
        </div>

        {selectedTable && (
          <div
            onClick={() => setSelectedTable(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,.45)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              padding: '20px',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '360px',
                maxHeight: '75vh',
                overflowY: 'auto',
                background: 'rgba(255,255,255,.97)',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 12px 35px rgba(0,0,0,.2)',
              }}
            >
              {/* タイトル */}
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '36px',
                  }}
                >
                  🍽
                </div>

                <div
                  style={{
                    fontSize: '26px',
                    color: '#5C4567',
                    fontWeight: 700,
                  }}
                >
                  Table {selectedTable}
                </div>
              </div>

              {/* ゲスト一覧 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {tables[selectedTable].map(([lastName, firstName]) => (
                  <div
                    key={`${lastName}${firstName}`}
                    style={{
                      background: '#FCF7FD',
                      border: '1px solid #F2E6F6',
                      borderRadius: '14px',
                      padding: '14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        color: '#5C4567',
                        fontWeight: 600,
                        fontSize: '16px',
                      }}
                    >
                      {lastName} {firstName}{' '}
                      {firstName === '奏翔' ? 'くん' : '様'}
                    </span>
                  </div>
                ))}
              </div>

              {/* 閉じる */}
              <button
                onClick={() => setSelectedTable(null)}
                style={{
                  width: '100%',
                  marginTop: '24px',
                  padding: '14px',
                  border: 'none',
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg,#D99CC7,#C08ED7)',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                閉じる
              </button>
            </div>
          </div>
        )}
        <div
          style={{
            marginTop: '32px',
            color: '#A88BBF',
            fontSize: '13px',
            lineHeight: 1.8,
          }}
        >
          Tap your table to view
          <br />
          the guest list.
        </div>
      </div>
    </div>
  );
}

export default SeatingChartPage;
