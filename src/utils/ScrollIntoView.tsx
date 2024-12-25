/**
 * 원하는 위치로 스크롤 이동 함수
 * @param getElementById 포커스 하고싶은 요소의 ID
 */
const ScrollIntoView = (getElementById: string) => {
  const myCommentElement = document.getElementById(getElementById);
  if (myCommentElement) {
    myCommentElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

export default ScrollIntoView;
