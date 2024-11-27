import { Dispatch, SetStateAction, useState } from "react";

interface PaginationProps {
  totalItems: number; // 전체 데이터 개수
  itemsPerPage: number; // 페이지당 아이템 수
  currentPage: number; // 현재 선택된 페이지 수
  setCurrentPage: Dispatch<SetStateAction<number>>; // 선택된 페이지 수 저장
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  // 현재 페이지 그룹 (10개 단위)
  const [currentPageGroup, setCurrentPageGroup] = useState(1);
  // 전체 페이지 수
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // 한 번에 표시할 페이지 수
  const pagesPerGroup = 10;
  // 전체 그룹 수
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // 범위 체크
    setCurrentPage(page);
  };

  // 그룹 변경 핸들러
  const handleGroupChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPageGroup > 1) {
      setCurrentPageGroup((prev) => prev - 1);
    } else if (direction === "next" && currentPageGroup < totalGroups) {
      setCurrentPageGroup((prev) => prev + 1);
    }
  };

  // 현재 그룹의 페이지 번호 생성
  const getPageNumbers = () => {
    const startPage = (currentPageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* prev 버튼 */}
      <button
        className="w-[32px] h-[32px] bg-gray-200 rounded disabled:opacity-50"
        onClick={() => handleGroupChange("prev")}
        disabled={currentPageGroup === 1}
      ></button>

      {/* 페이지 번호 */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`w-[32px] h-32px] rounded ${
            page === currentPage
              ? "text-black"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* next 버튼 */}
      <button
        className="w-[32px] h-[32px] bg-gray-200 rounded disabled:opacity-50"
        onClick={() => handleGroupChange("next")}
        disabled={currentPageGroup === totalGroups}
      ></button>
    </div>
  );
};

export default Pagination;
