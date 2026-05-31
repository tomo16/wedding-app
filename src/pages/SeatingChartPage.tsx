import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import seatingChart from "../assets/seating.png";
import { useGuest } from "../context/GuestContext";
import Header from "../components/Header";

function SeatingChartPage() {
  const { guest } = useGuest();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden"; // ← scroll完全禁止
    return () => {
      document.body.style.overflow = "auto"; // ← ページ離脱時に戻す
    };
  }, []);

  if (!guest) {
    navigate("/guest/login");
    return null;
  }
  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#fff9cc'
      }}
    >
      <Header title=" 席次表" />

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '56px',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={seatingChart}
          alt="席次表"
          style={{
            maxWidth: '90%',
            height: 'auto',
            borderRadius: '12px',
            border: '2px solid #eee',
          }}
        />
      </div>
    </div>
  );
}

export default SeatingChartPage;
