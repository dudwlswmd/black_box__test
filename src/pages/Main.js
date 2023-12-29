import "../styles/Main.scss";
import React, { useEffect, useRef, useState } from "react";

// 이미지
import pass_img from "../assets/images/pass-img.png";
import fail_img from "../assets/images/fail-img.png";
import arrow_down_red from "../assets/images/red-down-arrow.svg";
import reset_img from "../assets/images/autorenew.svg";

import ActionDetailModal from "../components/ActionDetailModal";
import { Link } from "react-router-dom";
const notice_dummy = [
  {
    id: 0,
    title: "NI건설 강남 대청현장 공지합니다.",
    day: "2023.01.17",
  },
  { id: 1, title: "NI건설 도곡 현장 공지합니다.", day: "2023.01.18" },
  { id: 2, title: "NI건설 강남 현장 공지합니다.", day: "2023.01.19" },
  { id: 3, title: "NI건설 강남 선릉 현장 공지합니다.", day: "2023.01.20" },
  { id: 4, title: "NI건설 강남 스퀘어 현장 공지합니다.", day: "2023.01.21" },
  { id: 5, title: "NI건설 강남 언주로 현장 공지합니다.", day: "2023.01.22" },
  { id: 6, title: "NI건설 강남 인텔릭스 현장 공지합니다.", day: "2023.01.23" },
];

//시간 렌덤으로
// function randomDate(start, end) {
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }
// function randomTime() {
//   const startDate = new Date(2022, 0, 1); // 2022년 1월 1일
//   const endDate = new Date(2022, 11, 31); // 2022년 12월 31일
//   const randomDateValue = randomDate(startDate, endDate);

//   const fixedRandomDate = randomDateValue.toISOString().slice(0, 19).replace("T", " "); // 고정된 무작위 시간값

//   return fixedRandomDate; // 고정된 값으로 반환
// }

const actionDummyData = [
  {
    id: 1,
    detectionDate: "2022-02-02 21:06:54 ~ 2022-02-02 21:34:39",
    location: "NI건설 가산 광진 현장",
    detectionText: "안전모 미착용",
    actionDate: "2022-02-02 22:11:05",
    checker: "송영진",
    actionPerson: "김진명",
    violator: "박만식",
    resultAction: "안전모 미착용 사례를 점검하여 해당 작업자와 더 넓은 작업자 집단에게 안전모 착용 규정을 재확인하고, 안전 교육을 강화하였습니다.",
    detailView: "상세",
  },
  {
    id: 2,
    detectionDate: "2022-03-02 17:32:27 ~ 2022-03-02 17:38:21",
    location: "NI건설 남성 사당로 현장",
    detectionText: "화재",
    actionDate: "2022-03-02 18:06:14",
    checker: "김성태",
    actionPerson: "안시만",
    violator: "남태만",
    resultAction: "화재 발생 시 대피 절차를 준수하고 모든 작업자의 안전을 확인하였으며, 화재 진압 및 소화 작업을 신속하게 진행하였습니다.",
    detailView: "상세",
  },
  {
    id: 3,
    detectionDate: "2022-09-13 06:01:07 ~ 2022-09-13 06:39:15",
    location: "NI건설 사당 5동 현장",
    detectionText: "쓰러짐",
    actionDate: "2022-09-13 07:00:43",
    checker: "송현진",
    actionPerson: "김민지",
    violator: "안수현",
    resultAction: "현장 인부 쓰러져서 즉시 119 응급 서비스를 호출한 후, 의료 지원이 도착하여 응급처치를 완료했습니다 ",
    detailView: "상세",
  },
  // {
  //   id: 4,
  //   detectionDate: randomTime() + " ~ " + randomTime(),
  //   location: "세븐일레븐 뚝섬역점",
  //   detectionText: "장시간 체류",
  //   actionDate: randomTime(),
  //   checker: "박하림",
  //   actionPerson: "김봄",
  //   violator: "최아라",
  //   resultAction: "안전벨트 미착용에 대한 확인 및 점포감...",
  //   detailView: "상세",
  // },
  // {
  //   id: 5,
  //   detectionDate: randomTime() + " ~ " + randomTime(),
  //   location: "세븐일레븐 성동 금호점",
  //   detectionText: "장시간 체류",
  //   actionDate: randomTime(),
  //   checker: "박태진",
  //   actionPerson: "안기만",
  //   violator: "김민수",
  //   resultAction: "안전벨트 미착용에 대한 확인 및 점포감...",
  //   detailView: "상세",
  // },
  // {
  //   id: 6,
  //   detectionDate: randomTime() + " ~ " + randomTime(),
  //   location: "세븐일레븐 경복궁점",
  //   detectionText: "장시간 체류",
  //   actionDate: randomTime(),
  //   checker: "강태원",
  //   actionPerson: "홍준표",
  //   violator: "김태화",
  //   resultAction: "안전벨트 미착용에 대한 확인 및 점포감...",
  //   detailView: "상세",
  // },
];

const statistical_dummy = [
  "NI건설 개봉 현장",
  "NI건설 개봉 아이파크 현장",
  "NI건설 고척 공원 현장",
  "NI건설 고척 중앙로 현장",
  "NI건설 경의숲길 현장",
  "NI건설 가락몰 현장",
  "NI건설 롯데월드 광장 현장",
  "NI건설 문정강진 현장",
];
function Main({ setClickMenu }) {
  // 경고 알림 카운트
  const [count, setCount] = useState(0);
  // 조치목록 Modal
  const [actionListModal, setActionListModal] = useState(false);
  // Statistical
  const [showMenu, setShowMenu] = useState("");
  const menuRef = useRef(null);
  const handleShowMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };
  // 백그라운드 클릭시 드롭다운 메뉴 닫게하기
  useEffect(() => {
    const handleBackgroundClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
      }
    };
    document.addEventListener("click", handleBackgroundClick);
    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);
  // 체크박스
  const [selectedSites, setSelectedSites] = useState([]);
  // 체크한 점포을 state에 저장합니다.
  const handleCheckboxSiteChange = (e, siteName) => {
    if (e.target.checked) {
      setSelectedSites([...selectedSites, siteName]);
    } else {
      setSelectedSites(selectedSites.filter((site) => site !== siteName));
    }
  };

  // 점포 모두선택
  const handleSelectAllSites = () => {
    const checkboxes = document.querySelectorAll(
      '.site__list-item input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
    setSelectedSites(statistical_dummy.map((item) => item));
    console.log(selectedSites);
  };
  // 점포 선택 초기화
  const handleResetAllSites = () => {
    const checkboxes = document.querySelectorAll(
      '.site__list-item input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedSites([]);
    console.log(selectedSites);
  };



const testNumber = 38;

function NumberCounter({ initialValue, targetValue }) {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = 1;
      if (count < targetValue) {
        setCount((prevCount) => prevCount + increment);
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [count, targetValue]);

  return (
    <span className="number-cases">{Math.round(count)}</span>
  );
}

const [selectedAction, setSelectedAction] = useState(null);//조치완료목록 상세 클릭



  return (
    <div className="main">
      {actionListModal ? (
        <ActionDetailModal setActionListModal={setActionListModal}
        selectedAction={selectedAction} // 선택한 액션 정보 전달
        
        />
      ) : (
        <div className="main__container">
          <div className="main__left">
            <div className="main__warning">
              <p className="warning__title">경고 알림현황</p>
              <div className="warning__container">
                <div className="warning__textbox">
                  <div
                    className={
                      count >= 1
                        ? "textbox__current-count-red"
                        : "textbox__current-count"
                    }
                  >
                    <p className="textbox__text">현재 경고 알림 건</p>
                    <span className="textbox__count">{count}건</span>
                  </div>

                  <div className="textbox__info">
                    {count >= 1 ? (
                      <p className="textbox__status">
                        현재 NI건설 금정 신중로 현장 센서값은
                        <br /> 모두 위험한 상태 입니다.
                      </p>
                    ) : (
                      <p className="textbox__status">
                        현재 NI건설 관악 남현 현장 센서값은
                        <br /> 모두 안전한 상태 입니다. :)
                      </p>
                    )}
                    <p className="textbox__info-live">
                      실시간 안전 검사가 진행중입니다.
                    </p>
                  </div>
                </div>
                <div className="warning__passbox">
                  <img
                    src={count && count >= 1 ? fail_img : pass_img}
                    alt="pass_img"
                  />
                </div>
              </div>
            </div>

            <div className="main__statistical-analysis">
              <div className="statistical__top-text">
                <p className="top__analysis">통계분석 </p>
                <Link
                  to="/statistical"
                  className="top__more"
                  onClick={() => setClickMenu("statistical")}
                >
                  더보기
                  <span className="more_plus">+</span>
                </Link>
              </div>
              <div className="statistical__content-box">
                <div className="statistical__filter-wrapper">
                  <div className="filter-wrapper__site-dropdown">
                    <div className="filter__site-name">현장명</div>
                    <div
                      className="filter__site-name--cliked"
                      onClick={handleShowMenu}
                    >
                      <p>
                        {selectedSites.length === 0
                          ? "NI건설 관악 현장"
                          : selectedSites.length === 1
                          ? selectedSites[0]
                          : `${selectedSites[0]} 외 ${
                              selectedSites.length - 1
                            }곳`}
                      </p>
                      <img src={arrow_down_red} alt="arrow-down" />
                    </div>
                  </div>
                  <div className="filter__setting">
                    <div className="filter-wrapper__date-range">
                      <input
                        type="date"
                        className="date-range__start-date"
                        data-placeholder="시작일"
                      />
                    </div>
                    <span className="filter-wrapper__tilde">~</span>
                    <div className="filter-wrapper__date-range">
                      <input
                        type="date"
                        className="date-range__end-date"
                        data-placeholder="종료일"
                      />
                    </div>
                    <button className="filter-wrapper__search-button">
                      <span>조회</span>
                    </button>
                  </div>
                </div>
                {showMenu ? (
                  <ul className="site__list" ref={menuRef}>
                    {statistical_dummy.map((item, index) => (
                      <li className="site__list-item" key={index}>
                        <input
                          type="checkbox"
                          value="check"
                          id={`site-checkbox-${index}`}
                          checked={selectedSites.includes(item)}
                          onChange={(e) => handleCheckboxSiteChange(e, item)}
                        />
                        <label htmlFor={`site-checkbox-${index}`}>{item}</label>
                      </li>
                    ))}
                    <div
                      className="site__all-check"
                      onClick={handleSelectAllSites}
                    >
                      모두선택
                    </div>
                    <div
                      className="site__check-reset"
                      onClick={handleResetAllSites}
                    >
                      <img src={reset_img} alt="reset_button" />
                      선택초기화
                    </div>
                  </ul>
                ) : null}
                <div className="statistical__container">

                  <div className="statistical__list">
                    <p className="statistical__list__name">안정모 미착용</p>
                    <div className="statistical__list__progress">
                      <div className="statistical__list__progressBar" style={{ width: '60%' }}>
                        <div className="statistical__list__progressBar-style"></div>
                      </div>
                    </div>
                    <div className="statistical__list__number">
                      <span className="number-cases">
                        <NumberCounter initialValue={0} targetValue={60} />
                      </span>
                      <span className="number-text">건</span>
                    </div>
                  </div>
                  <div className="statistical__list fire">
                    <p className="statistical__list__name">화재</p>
                    <div className="statistical__list__progress">
                      <div className="statistical__list__progressBar" style={{ width: '17%' }}>
                        <div className="statistical__list__progressBar-style"></div>
                      </div>
                    </div>
                    <div className="statistical__list__number">
                      <span className="number-cases">
                        <NumberCounter initialValue={0} targetValue={17} />
                      </span>
                      <span className="number-text">건</span>
                    </div>
                  </div>
                  <div className="statistical__list hardHat">
                    <p className="statistical__list__name">쓰러짐</p>
                    <div className="statistical__list__progress">
                      <div className="statistical__list__progressBar" style={{ width: '19%' }}>
                        <div className="statistical__list__progressBar-style"></div>
                      </div>
                    </div>
                    <div className="statistical__list__number">
                      <span className="number-cases">
                        <NumberCounter initialValue={0} targetValue={19} />
                      </span>
                      <span className="number-text">건</span>
                    </div>
                  </div>
                  <div className="statistical__list danger">
                    <p className="statistical__list__name">위험지역</p>
                    <div className="statistical__list__progress">
                      <div className="statistical__list__progressBar" style={{ width: `${testNumber}%`  }}>
                        <div className="statistical__list__progressBar-style"></div>
                      </div>
                    </div>
                    <div className="statistical__list__number">
                      <span className="number-cases">
                        <NumberCounter initialValue={0} targetValue={testNumber} />
                      </span>
                      <span className="number-text">건</span>
                    </div>
                  </div>


                  {/* <div className="statistical__container-list">
                    <div className="statistical__container-type">기물파손</div>
                    <div className="statistical__container-gage-total">
                      <div className="statistical__container-gage-current gage60"></div>
                    </div>
                    <div className="statistical__container-count">60건</div>
                  </div> */}
                  {/* <div className="statistical__container-list">
                    <div className="statistical__container-type">
                      장시간 체류
                    </div>
                    <div className="statistical__container-gage-total">
                      <div className="statistical__container-gage-current gage17"></div>
                    </div>
                    <div className="statistical__container-count count17">
                      17건
                    </div>
                  </div> */}
                  {/* <div className="statistical__container-list">
                    <div className="statistical__container-type">쓰러짐</div>
                    <div className="statistical__container-gage-total">
                      <div className="statistical__container-gage-current gage19"></div>
                    </div>
                    <div className="statistical__container-count count19">
                      19건
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="main__right">
            <div className="main__notice">
              <div className="notice__top-text">
                <p className="top__announcements">공지사항 </p>
                <Link
                  to="/notice"
                  className="top__more"
                  onClick={() => {
                    setClickMenu("notice");
                  }}
                >
                  더보기
                  <span className="more_plus">+</span>
                </Link>
              </div>
              <div className="notice__container">
                <ul className="container__list">
                  {notice_dummy
                    ? notice_dummy
                        .slice()
                        .reverse()
                        .map((item, index) => (
                          <li key={item.id} className="list__item">
                            <p className="item__title">{item.title}</p>
                            <p className="item__day">{item.day}</p>
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            </div>
            <div className="main__action-completed">
              <div className="action-completed__top-text">
                <p className="top__analysis">조치완료 목록 </p>
                <Link
                  to="/actionlist"
                  className="top__more"
                  onClick={() => setClickMenu("actionlist")}
                >
                  더보기
                  <span className="more_plus">+</span>
                </Link>
              </div>
              <div className="action-completed__container">
                {actionDummyData ? (
                  <table className="action-completed__table">
                    <thead>
                      <tr>
                        <th>번호</th>
                        <th>현장 위치</th>
                        <th>감지 내용</th>
                        <th className="hide-on-mobile">조치 일시</th>
                        <th>상세보기</th>
                      </tr>
                    </thead>
                    <tbody>
                      {actionDummyData.map((site) => (
                        <tr key={site.id}>
                          <td>{site.id}</td>
                          <td>{site.location}</td>
                          <td>{site.detectionText}</td>
                          <td style={{ display: 'none'  }}>{site.resultAction}</td>
                          <td className="hide-on-mobile">{site.actionDate}</td>
                          <td>
                            <button
                              className="action-completed__detaill-button"
                              onClick={() => {
                                setActionListModal((prev) => !prev);
                                setSelectedAction(site); 
                              }}
                            >
                              {site.detailView}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
