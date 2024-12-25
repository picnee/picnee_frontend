function FormatTimeAgo(createdAt: string): string {
  // 날짜 문자열을 Date 객체로 변환
  const createdDate = new Date(createdAt);

  // 현재 시간
  const now = new Date();

  // 두 시간의 차이를 밀리초 단위로 계산
  const timeDifference = now.getTime() - createdDate.getTime();

  // 밀리초 단위를 시간 단위로 변환
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  // 결과 반환
  if (hoursDifference < 1) {
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    return `${minutesDifference}분 전`;
  }
  if (hoursDifference < 24) {
    return `${hoursDifference}시간 전`;
  }
  const daysDifference = Math.floor(hoursDifference / 24);
  return `${daysDifference}일 전`;
}

export default FormatTimeAgo;
