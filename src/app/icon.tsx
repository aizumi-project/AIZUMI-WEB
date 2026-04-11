import { ImageResponse } from 'next/og';

// 画像のサイズ設定（32x32ピクセル）
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // スタイリッシュな円形グラデーションと「A」のデザイン
      <div
        style={{
          fontSize: 22,
          background: '#0a0e12',
          border: '2px solid #3b82f6',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '50%',
          fontWeight: 900,
          fontStyle: 'italic', // ロゴの斜体デザインに合わせる
          boxShadow: 'inset 0 0 10px rgba(59, 130, 246, 0.5)',
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}