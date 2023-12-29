import "../styles/Notice.scss";
import Header from "../components/Header";
import React, { useState } from "react";
import NoticePostModal from "../components/NoticePostModal";

import { FiEdit } from "react-icons/fi";
import { PiCaretRightBold } from "react-icons/pi";
import { PiCaretLeftBold } from "react-icons/pi";

const dummy = [
  { id: 1, text: "NI건설 사당 현장 공지합니다.", day: "2023.01.18" },
  { id: 2, text: "NI건설 강남 현장 공지합니다.", day: "2023.01.19" },
  { id: 3, text: "NI건설 홍대 현장 공지합니다.", day: "2023.01.20" },
  { id: 4, text: "NI건설 신촌 현장 공지합니다.", day: "2023.01.21" },
  { id: 5, text: "NI건설 이태 현장점 공지합니다.", day: "2023.01.22" },
  { id: 6, text: "NI건설 종로 현장 공지합니다.", day: "2023.01.23" },
  { id: 7, text: "NI건설 명동 현장 공지합니다.", day: "2023.01.24" },
  { id: 8, text: "NI건설 서초 현장 공지합니다.", day: "2023.01.25" },
  { id: 9, text: "NI건설 강북 현장 공지합니다.", day: "2023.01.26" },
  { id: 10, text: "NI건설 강동 현장 공지합니다.", day: "2023.01.27" },
  { id: 11, text: "NI건설 강서 현장 공지합니다.", day: "2023.01.28" },
  { id: 12, text: "NI건설 신림 현장 공지합니다.", day: "2023.01.29" },
  { id: 13, text: "NI건설 잠실 현장 공지합니다.", day: "2023.01.30" },
  { id: 14, text: "NI건설 노원 현장 공지합니다.", day: "2023.01.31" },
  { id: 15, text: "NI건설 성북 현장 공지합니다.", day: "2023.02.01" },
  { id: 16, text: "NI건설 서대 현장 공지합니다.", day: "2023.02.02" },
  { id: 17, text: "NI건설 은평 현장 공지합니다.", day: "2023.02.03" },
  { id: 18, text: "NI건설 중랑 현장 공지합니다.", day: "2023.02.04" },
  { id: 19, text: "NI건설 동대 현장 공지합니다.", day: "2023.02.05" },
  { id: 20, text: "NI건설 관악 현장 공지합니다.", day: "2023.02.06" },
  { id: 21, text: "NI건설 구로 현장 공지합니다.", day: "2023.02.07" },
  { id: 22, text: "NI건설 영등 현장 공지합니다.", day: "2023.02.08" },
  { id: 23, text: "NI건설 송파 현장 공지합니다.", day: "2023.02.09" },
  { id: 24, text: "NI건설 강남 현장 공지합니다.", day: "2023.02.10" },
  { id: 25, text: "NI건설 홍대 현장 공지합니다.", day: "2023.02.11" },
  { id: 26, text: "NI건설 서울 현장 공지합니다.", day: "2023.02.12" },
  { id: 27, text: "NI건설 고려 현장 공지합니다.", day: "2023.02.13" },
  { id: 28, text: "NI건설 건국 현장 공지합니다.", day: "2023.02.14" },
  { id: 29, text: "NI건설 한양 현장 공지합니다.", day: "2023.02.15" },
  { id: 30, text: "NI건설 서울 현장 공지합니다.", day: "2023.02.16" },
  { id: 31, text: "NI건설 홍익 현장 공지합니다.", day: "2023.02.17" },
  { id: 32, text: "NI건설 연세 현장 공지합니다.", day: "2023.02.18" },
  { id: 33, text: "NI건설 서강 현장 공지합니다.", day: "2023.02.19" },
  { id: 34, text: "NI건설 경희 현장 공지합니다.", day: "2023.02.20" },
  { id: 35, text: "NI건설 한국 현장 공지합니다.", day: "2023.02.21" },
  { id: 36, text: "NI건설 이화 현장 공지합니다.", day: "2023.02.22" },
  { id: 37, text: "NI건설 숙대 현장 공지합니다.", day: "2023.02.23" },
  { id: 38, text: "NI건설 성신 현장 공지합니다.", day: "2023.02.24" },
  { id: 39, text: "NI건설 한양 현장 공지합니다.", day: "2023.02.25" },
  { id: 40, text: "NI건설 숭실 현장 공지합니다.", day: "2023.02.26" },
  { id: 41, text: "NI건설 동덕 현장 공지합니다.", day: "2023.02.27" },
  { id: 42, text: "NI건설 서경 현장 공지합니다.", day: "2023.02.28" },
  { id: 43, text: "NI건설 경기 현장 공지합니다.", day: "2023.03.01" },
  { id: 44, text: "NI건설 수원 현장 공지합니다.", day: "2023.03.02" },
  { id: 45, text: "NI건설 성균 현장 공지합니다.", day: "2023.03.03" },
  { id: 46, text: "NI건설 순천 현장 공지합니다.", day: "2023.03.04" },
  { id: 47, text: "NI건설 계명 현장 공지합니다.", day: "2023.03.05" },
  { id: 48, text: "NI건설 아주 현장 공지합니다.", day: "2023.03.06" },
  { id: 49, text: "NI건설 충남 현장 공지합니다.", day: "2023.03.07" },
  { id: 50, text: "NI건설 경북 현장 공지합니다.", day: "2023.03.08" },
];

const Notice = ({ setClickMenu }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(dummy.length / itemsPerPage); // ceil 을 써야 마지막 아이템이 한개라도있어도 페이지를 생성 시킬 수 있기때문에

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const reversedDummy = [...dummy].reverse();
  const currentItems = reversedDummy.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 공지 모달
  const [noticePostModal, setNoticePostModal] = useState(false);
  const handlePostModal = (e) => {
    setNoticePostModal((prev) => !prev);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="notice">
      <div className="notice__container">
        <div className="notice__top-content">
          <h1 className="notice__title">공지사항</h1>
          <button className="notice__post" onClick={handlePostModal}>
            {/* 공지작성 */}
            <FiEdit />
          </button>
        </div>
        <div className="notice__list-box">
          <ul className="notice__list">
            {currentItems.map((item, index) => (
              <li className="notice__list-item" key={item.id}>
                <p className="list-item__index">{item.id}</p>
                <div className="list-item__wrapper">
                  <p className="list-item__text">{item.text}</p>
                  <p className="list-item__day">{item.day}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="notice__pagination">
          <div className="pagination__box">
            <button
              className="pagination__prev-button"
              onClick={() => handleClick(Math.max(1, currentPage - 1))}
            >
              <PiCaretLeftBold className="prev-button__PiCaretLeftBold"/>
              {/* Prev */}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                className={`pagination__button ${
                  currentPage === page ? "pagination__button-active" : ""
                }`}
                key={page}
                onClick={() => handleClick(page)}
              >
                {page}
                {/* 다섯개 단위로 끊을려면 생각해보기 */}
              </button>
            ))}
            <button
              className="pagination__next-button"
              onClick={() => handleClick(Math.min(totalPages, currentPage + 1))}
            >
              <PiCaretRightBold className="next-button__PiCaretRightBold"/>
              {/* Next */}
            </button>
          </div>
        </div>
      </div>
      {noticePostModal && (
        <NoticePostModal setNoticePostModal={setNoticePostModal} />
      )}
    </div>
  );
};

export default Notice;
