// time string을 시간:분 형식으로 포맷팅 하는 함수
export const formatTimeToHHMM = (rawTime: string) => {
  const date = new Date(rawTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours}:${String(minutes).padStart(2, '0')}`;
  return formattedTime;
};

export const hexToRGBA = (hex: string, opacity: number): string => {
  // HEX 색상에서 RGB 값을 추출
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // RGBA 형식으로 반환
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
