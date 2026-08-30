// src/pages/PhotoUploadPage.tsx
import { useEffect } from "react";
import Header from "../components/Header";
import usePageScrollLock from "../hooks/usePageScrollLock";

export default function PhotoUploadPage() {
  const groomDriveUrl =
    "https://drive.google.com/drive/folders/1OEQabaYkAGEtJCg39xP7zHJZwqUmPAoY?usp=drive_link";

  const brideDriveUrl =
    "https://drive.google.com/drive/folders/1Yxvbar_SBDQkYvM5n0eJzdOI0QIvg2H0?usp=drive_link";

  usePageScrollLock(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)",
        textAlign: "center",
        padding: "24px 18px 40px",
      }}
    >
      <Header title="" />

      <div
        style={{
          paddingTop: "80px",
          maxWidth: "420px",
          margin: "0 auto",
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
          }}
        >
          Photo Upload
        </h1>

        <div
          style={{
            color: "#c9a44c",
            letterSpacing: "3px",
            fontSize: "15px",
            marginBottom: "18px",
          }}
        >
          Share Your Memories
        </div>

        {/* カード */}
        <div
          style={{
            background: "rgba(255,255,255,.92)",
            borderRadius: "24px",
            padding: "28px",
            border: "1px solid #F2E5F6",
            boxShadow: "0 8px 24px rgba(160,120,190,.15)",
          }}
        >
          <div
            style={{
              fontSize: "54px",
              marginBottom: "16px",
            }}
          >
            📸
          </div>

          <div
            style={{
              color: "#5C4567",
              fontSize: "17px",
              lineHeight: 1.8,
              marginBottom: "28px",
            }}
          >
            当日の写真や動画を
            <br />
            ぜひアップロードしてください
          </div>

          <a
            href={groomDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
          >
            🤵🏻 新郎側ゲストはこちら
          </a>

          <a
            href={brideDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
          >
            👰🏻 新婦側ゲストはこちら
          </a>

          <div
            style={{
              marginTop: "28px",
              fontSize: "13px",
              color: "#8F7B9F",
              lineHeight: 1.8,
            }}
          >
            ※ Google Driveが開きます
            <br />
            ※ 写真・動画どちらも大歓迎です
          </div>
        </div>

        {/* フッター */}
        <div
          style={{
            marginTop: "34px",
            color: "#A88BBF",
            fontSize: "13px",
            lineHeight: 1.8,
          }}
        >
          Thank you for sharing
          <br />
          your wonderful memories.
        </div>
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  display: "block",
  width: "90%",
  boxSizing: "border-box",
  margin: "14px auto",
  padding: "16px 20px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: "16px",
  color: "#fff",
  background: "linear-gradient(90deg,#D99CC7,#C08ED7)",
  boxShadow: "0 6px 18px rgba(192,142,215,.35)",
};