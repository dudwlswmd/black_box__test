import React, { useState } from "react";
import "../styles/ActionList.scss";
import ActionDetailModal from "../components/ActionDetailModal";
import { PiCaretRightBold } from "react-icons/pi";
import { PiCaretLeftBold } from "react-icons/pi";


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

];
const ActionList = () => {
  const [actionListModal, setActionListModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  console.log("actionListModal", actionListModal);
  return (
    <div className="action-list__background">
      {actionListModal ? (
        <ActionDetailModal 
          setActionListModal={setActionListModal} 
          selectedAction={selectedAction} // 선택한 액션 정보 전달
        />
      ) : (
        <div className="action-list__container">
          <div className="action-list__main">
            <table className="action-list__main-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>감지 일시</th>
                  <th>현장 위치</th>
                  <th>감지 내용</th>
                  <th>조치 일시</th>
                  <th>확인자</th>
                  <th>조치자</th>
                  <th>위반자</th>
                  <th>조치결과</th>
                  <th>상세보기</th>
                </tr>
              </thead>
              <tbody>
                {actionDummyData.map((item) => {
                  return (
                    <>
                      {" "}
                      <tr>
                        <td className="list__text list__number">{item.id}</td>
                        <td className="list__text list__detection-date">
                          {item.detectionDate}
                        </td>
                        <td className="list__text list__location">
                          {item.location}
                        </td>
                        <td className="list__text list__detection-text">
                          {item.detectionText}
                        </td>
                        <td className="list__text list__action-date">
                          {item.actionDate}
                        </td>
                        <td className="list__text list__checker">
                          {item.checker}
                        </td>
                        <td className="list__text list__action-person">
                          {item.actionPerson}
                        </td>
                        <td className="list__text list__violator">
                          {item.violator}
                        </td>
                        <td className="list__text list__result-action">
                          {item.resultAction}
                        </td>
                        <td className="list__button">
                        <button
                            onClick={() => {
                              setActionListModal((prev) => !prev);
                              setSelectedAction(item); // 클릭한 정보를 상태에 저장
                            }}
                          >
                        상세
                      </button>
                        </td>
                      </tr>
                      {/* <tr className="list__margin"></tr> */}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="action-list__page">
            <button className="page__handler">
              <PiCaretLeftBold className="prev-button__PiCaretLeftBold"/>
              {/* Prev */}
            </button>
            <div className="page__number-box">
              <button className="page__number-btn pagination__button-active">1</button>
              <button className="page__number-btn">2</button>
              <button className="page__number-btn">3</button>
              <button className="page__number-btn">4</button>
              <button className="page__number-btn">5</button>
            </div>
            <button className="page__handler">
              <PiCaretRightBold className="next-button__PiCaretRightBold"/>
              {/* Next */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionList;
