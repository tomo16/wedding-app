import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

type Photo = {
  thumb: string;
  full: string;
};

const photos: Photo[] = [
  { thumb: '/photos/thumb/photo3.jpg', full: '/photos/full/photo3.jpg' },
  { thumb: '/photos/thumb/photo5.jpg', full: '/photos/full/photo5.jpg' },
  { thumb: '/photos/thumb/photo4.jpg', full: '/photos/full/photo4.jpg' },
  { thumb: '/photos/thumb/photo1.jpg', full: '/photos/full/photo1.jpg' },
  { thumb: '/photos/thumb/photo2.jpg', full: '/photos/full/photo2.jpg' },
  { thumb: '/photos/thumb/photo6.jpg', full: '/photos/full/photo6.jpg' },
  { thumb: '/photos/thumb/photo9.jpg', full: '/photos/full/photo9.jpg' },
  { thumb: '/photos/thumb/photo8.jpg', full: '/photos/full/photo8.jpg' },
  { thumb: '/photos/thumb/photo7.jpg', full: '/photos/full/photo7.jpg' },
];

const PhotoGalleryPage: React.FC = () => {
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (modalUrl) {
        setModalUrl(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [modalUrl]);

  const openModal = (url: string) => {
    window.history.pushState({ modal: true }, '');
    setModalUrl(url);
  };

  const closeModal = () => {
    setModalUrl(null);

    if (window.history.state?.modal) {
      window.history.back();
    }
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        background:
          'linear-gradient(180deg,#FFFDFE 0%,#F8F2FB 35%,#EFE2F7 100%)',
      }}
    >
      <Header title="" />

      <div
        style={{
          paddingTop: '80px',
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
          Pre Wedding Photos
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
          Our Memories
        </div>

        <p
          style={{
            color: '#6F5E72',
            lineHeight: 1.8,
            marginBottom: '28px',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          前撮りのお写真を
          <br />
          ご自由にご覧ください
        </p>

        {/* 写真カード */}

        <div
          style={{
            background: 'rgba(255,255,255,.92)',
            borderRadius: '24px',
            padding: '18px',
            boxShadow: '0 8px 30px rgba(0,0,0,.08)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '12px',
            }}
          >
            {photos.map((photo, i) => (
              <img
                key={i}
                src={photo.thumb}
                loading="lazy"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onClick={() => openModal(photo.full)}
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  borderRadius: '18px',
                  border: '3px solid rgba(255,255,255,.95)',
                  boxShadow: '0 6px 18px rgba(170,135,200,.18)',
                  transition: '.2s',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* フッター */}

        <div
          style={{
            marginTop: '28px',
            color: '#A88BBF',
            fontSize: '13px',
            lineHeight: 1.8,
            textAlign: 'center',
          }}
        >
          Every picture tells
          <br />a piece of our story.
        </div>
      </div>

      {/* モーダル */}

      {modalUrl && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(45,35,55,.78)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            style={{
              position: 'absolute',
              top: '22px',
              right: '22px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.4)',
              background: 'rgba(255,255,255,.15)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              fontSize: '26px',
              cursor: 'pointer',

              // 追加
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>

          <img
            src={modalUrl}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '20px',
              border: '6px solid rgba(255,255,255,.95)',
              boxShadow: '0 20px 50px rgba(0,0,0,.35)',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryPage;
