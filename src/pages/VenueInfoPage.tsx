import React, { useEffect } from "react";
import Header from "../components/Header";

const VenueInfoPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,.88)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,.6)",
    borderRadius: "24px",
    padding: "22px",
    boxShadow: "0 8px 30px rgba(0,0,0,.08)",
    marginBottom: "22px",
  };

  const sectionTitle: React.CSSProperties = {
    color: "#5C4567",
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: "28px",
    marginBottom: "14px",
    textAlign: "center",
  };

  const textStyle: React.CSSProperties = {
    color: "#4F4553",
    lineHeight: 1.9,
    fontSize: "15px",
    margin: 0,
    textAlign: "left",
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)",
      }}
    >
      <Header title="" />

      <div
        style={{
          paddingTop: "80px",
          paddingBottom: "40px",
          maxWidth: "430px",
          margin: "0 auto",
          paddingInline: "18px",
        }}
      >
        {/* タイトル */}
        <div
          style={{
            width: 80,
            height: 2,
            background: "#d7b8ff",
            margin: "0 auto 24px",
          }}
        />

        <h1
          style={{
            fontSize: "34px",
            color: "#5C4567",
            fontWeight: 700,
            marginBottom: "8px",
            fontFamily: '"Cormorant Garamond", serif',
            textAlign: "center",
          }}
        >
          Guest Guide
        </h1>

        <div
          style={{
            color: "#C9A44C",
            letterSpacing: "3px",
            fontSize: "15px",
            marginBottom: "18px",
            textAlign: "center",
          }}
        >
          Information
        </div>

        <p
          style={{
            color: "#6F5E72",
            lineHeight: 1.8,
            marginBottom: "30px",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          当日のご案内と
          <br />
          お願い事項です
        </p>

        {/* 披露宴会場 */}
        <section style={cardStyle}>
          <h3 style={sectionTitle}>Reception</h3>

          <p style={textStyle}>
            <strong>📍 グラマシースイート（B1F・1F）</strong>
            <br />
            <br />
            スタッフのご案内があるまでは、
            <br />
            <strong>1Fウェルカムスペース</strong>
            にてお待ちください。
            <br />
            <br />
            カウンターバーでは
            お好きなドリンクをご注文いただけます。
          </p>
        </section>

        {/* 会場案内 */}
        <section style={cardStyle}>
          <h3 style={sectionTitle}>Venue</h3>

          <div style={textStyle}>
            <div style={{ marginBottom: 18 }}>
              <strong>🚻 トイレ</strong>
              <br />
              披露宴フロア B1F
              <br />
              （扉を出て右手）
            </div>

            <div>
              <strong>🚭 喫煙</strong>
              <br />
              館内は全面禁煙です
            </div>
          </div>
        </section>

        {/* お願い */}
        <section style={cardStyle}>
          <h3 style={sectionTitle}>Please</h3>

          <div style={textStyle}>
            <div style={{ marginBottom: 20 }}>
              <strong>📱 スマートフォン</strong>
              <br />
              式中はマナーモード
              (サイレントモード)への
              ご協力をお願いいたします。
            </div>

            <div style={{ marginBottom: 20 }}>
              <strong>🍸 ドリンク</strong>
              <br />
              Secret Drinksをご注文の際は、
              <br />
              アプリ内のドリンク画面を
              スタッフへお見せください。
            </div>

            <div>
              <strong>🚪 再入場</strong>
              <br />
              一時外出される際は、
              スタッフまでお声がけください。
            </div>
          </div>
        </section>

        {/* フッター */}
        <div
          style={{
            marginTop: "28px",
            color: "#A88BBF",
            fontSize: "13px",
            lineHeight: 1.8,
            textAlign: "center",
          }}
        >
          Thank you for celebrating
          <br />
          this special day with us.
        </div>
      </div>
    </div>
  );
};

export default VenueInfoPage;