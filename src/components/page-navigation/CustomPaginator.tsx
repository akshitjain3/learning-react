import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import "./paginator.css";

interface CustomPaginatorProps {
  handleOnClick: (page: number) => void;
  maxVisiblePages?: number;
  currentPage: number;
  totalPages: number;
  size?: number;
  containerBG?: string;
  textColor?: string;
  buttonBG?: string;
}

export default function CustomPaginator({
  handleOnClick,
  maxVisiblePages = 3,
  currentPage,
  totalPages,
  size = 40,
  containerBG,
  textColor,
  buttonBG,
}: CustomPaginatorProps) {
  let pagesToDisplay: number[] = [];
  if (maxVisiblePages > totalPages) {
    Array.from({ length: totalPages }, (_, index) =>
      pagesToDisplay.push(index + 1)
    );
  } else {
    let fromPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    if (currentPage === totalPages) fromPage = totalPages - maxVisiblePages + 1;
    let toPage = Math.min(totalPages, fromPage + maxVisiblePages - 1);
    pagesToDisplay = Array.from(
      { length: toPage - fromPage + 1 },
      (_, i) => fromPage + i
    );
  }

  return (
    <div className="paginator-wrapper" style={{ backgroundColor: containerBG }}>
      <button
        className={currentPage === 1 ? "inactive" : "active"}
        style={{
          marginRight: "1rem",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "transparent",
        }}
        onClick={() => handleOnClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowLeft size={size * 0.8} color={textColor} />
      </button>
      {pagesToDisplay.map((page, index) => (
        <button
          onClick={() => handleOnClick(page)}
          key={index}
          className={`pagination-btn ${
            page === currentPage ? "active-page" : ""
          }`}
          style={{
            height: size,
            width: size,
            fontSize: 0.5 * size,
          }}
        >
          {page}
        </button>
      ))}
      <button
        className={currentPage === totalPages ? "inactive" : "active"}
        style={{
          marginLeft: "1rem",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "transparent",
        }}
        onClick={() => handleOnClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaArrowRight size={size * 0.8} color={textColor} />
      </button>
    </div>
  );
}
