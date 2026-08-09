import { useNavigate } from "react-router-dom";

type Props = {
  title?: string;
  showBack?: boolean;
};

export default function Header({
  title,
  showBack = true,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        borderBottom: "1px solid #F0E6F6",
      }}
    >
      {/* 戻るボタン */}
      {showBack && !title && (
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            left: "18px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid #F0E6F6",
            background: "rgba(255,255,255,0.8)",
            color: "#5C4567",
            fontSize: "22px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>
      )}

      {/* タイトル */}
      <div
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: "22px",
          fontWeight: 700,
          color: "#5C4567",
          letterSpacing: "1px",
        }}
      >
        T & H Wedding
      </div>
    </div>
  );
}