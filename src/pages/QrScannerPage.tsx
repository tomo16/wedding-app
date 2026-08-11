import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import Header from '../components/Header';

export default function QrScannerPage() {
  const navigate = useNavigate();

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const scannerId = 'qr-reader';

    const scanner = new Html5Qrcode(scannerId);
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          async (decodedText) => {
            console.log('QR読み取り:', decodedText);

            // 二重読み取り防止
            if (!scannerRef.current) return;

            try {
              await scanner.stop();
            } catch (e) {
              console.error('QRスキャナー停止エラー:', e);
            }

            scannerRef.current = null;

            /*
             * QRコードの想定URL
             *
             * https://thwedding.vercel.app/guest/qr/le5YUKLSxld9
             *
             * 最後の部分をcodeとして取得
             */
            try {
              const url = new URL(decodedText);

              const match = url.pathname.match(/^\/reception\/([^/]+)\/?$/);

              if (!match) {
                setError('このQRコードは受付用QRではありません。');
                console.error('想定外のQR URL:', url.pathname);
                return;
              }

              const code = match[1];

              // 個人受付ページへ
              navigate(`/reception/${code}`);
            } catch (e) {
              console.error('QR URL解析エラー:', e);
              setError('QRコードの内容を読み取れませんでした。');
            }
          },
          () => {
            // QR未検出時は何もしない
          }
        );
      } catch (e) {
        console.error('カメラ起動エラー:', e);
        setError(
          'カメラを起動できませんでした。カメラの使用を許可してください。'
        );
      }
    };

    startScanner();

    return () => {
      const cleanup = async () => {
        if (scannerRef.current) {
          try {
            await scannerRef.current.stop();
          } catch (e) {
            console.error('QRスキャナー終了エラー:', e);
          }

          scannerRef.current = null;
        }
      };

      cleanup();
    };
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: '100dvh',
        background:
          'linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)',
      }}
    >
      <Header title="no_back" />

      <div
        style={{
          paddingTop: '90px',
          paddingBottom: '40px',
          maxWidth: '430px',
          margin: '0 auto',
          paddingInline: '18px',
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
            textAlign: 'center',
          }}
        >
          QR Reception
        </h1>

        <div
          style={{
            color: '#C9A44C',
            letterSpacing: '3px',
            fontSize: '15px',
            marginBottom: '18px',
            textAlign: 'center',
          }}
        >
          Reception
        </div>

        <p
          style={{
            color: '#6F5E72',
            lineHeight: 1.8,
            fontSize: '14px',
            textAlign: 'center',
            marginBottom: '28px',
          }}
        >
          ゲストのQRコードを
          <br />
          カメラにかざしてください
        </p>

        {/* QRスキャナー */}
        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
            marginBottom: '20px',
          }}
        >
          <div
            id="qr-reader"
            style={{
              width: '100%',
              overflow: 'hidden',
              borderRadius: '18px',
            }}
          />
        </div>

        {/* 説明 */}
        <div
          style={{
            background: 'rgba(255,255,255,.75)',
            borderRadius: '18px',
            padding: '16px',
            textAlign: 'center',
            color: '#6F5E72',
            fontSize: '13px',
            lineHeight: 1.7,
            marginBottom: '18px',
          }}
        >
          QRコードを読み取ると
          <br />
          自動的にゲストの受付画面へ移動します
        </div>

        {/* エラー */}
        {error && (
          <div
            style={{
              background: '#FFF4F4',
              color: '#D32F2F',
              borderRadius: '16px',
              padding: '14px',
              textAlign: 'center',
              fontSize: '14px',
              marginBottom: '18px',
            }}
          >
            {error}
          </div>
        )}

        {/* 管理画面へ戻る */}
        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '999px',
            border: '1px solid #E8DAF2',
            background: '#FCFAFD',
            color: '#5C4567',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          管理画面へ戻る
        </button>
      </div>
    </div>
  );
}