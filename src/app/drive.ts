/**
 * Google Driveの共有URLから直接ダウンロードURLを生成する
 * @param url 共有URL (https://drive.google.com/file/d/FILE_ID/view?usp=sharing など)
 */
export const getGoogleDriveDownloadUrl = (url: string): string => {
  const match = /\/file\/d\/([^/]+)\//.exec(url) || /id=([^&]+)/.exec(url);
  const fileId = match?.[1];

  if (fileId) {
    return `https://docs.google.com/uc?export=download&id=${fileId}`;
  }
  return url;
};

/**
 * バイト数を読みやすい形式（KB, MB, GB）に変換するユーティリティ
 * 手動で正確なサイズを計算して assets.ts に記載する際に役立ちます
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = Math.max(0, decimals);
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};