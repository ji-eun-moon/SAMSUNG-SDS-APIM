// time string을 시간:분 형식으로 포맷팅 하는 함수
export const formatTimeToHHMM = (rawTime: string) => {
  const date = new Date(rawTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours}:${String(minutes).padStart(2, '0')}`;
  return formattedTime;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const hexToRGBA = (hex: string, opacity: number): string => {
  // HEX 색상에서 RGB 값을 추출
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // RGBA 형식으로 반환
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const truncateText = (text: string, num: number) => {
  if (text?.length <= num) {
    return text;
  }
  return `${text?.substring(0, num)}...`;
};
