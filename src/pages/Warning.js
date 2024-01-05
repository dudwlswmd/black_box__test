import React, { useState , useRef} from "react";
import "../styles/Warning.scss";
import dummyImg2 from "../assets/images/dummy2.png";
import videoFire from "../assets/video/fire.mp4";
import fallDown from "../assets/video/fall_down.mp4";
import header from "../assets/video/header.mp4";

import videoTest from "../assets/video/videoTest4s.mp4";
import videoTest2 from "../assets/video/videogimull.mp4";
import videoTest3 from "../assets/video/leftOut.mp4";
import videoTest4 from "../assets/video/centerOut.mp4";
import videoTest5 from "../assets/video/infinity.mp4";
import StorageModal from "../components/StorageModal";

const Warning = () => {
  const [storageModal, setStorageModal] = useState(false);
  const timeoutRef = useRef(null); // 셋타임 초기화
  const dummyData = [
    {
      name: "NI건설 사당 현장",
      video:videoFire,
      timing:5000,
      txt:"화재"
    },
    {
      name: "NI건설 강남 현장",
      video:fallDown,
      timing:7000,
      txt:"쓰러짐"
    },
    {
      name: "NI건설 종로 현장",
      video:header,
      timing:5000,
      txt:"안전모 미착용"
    },
    // {
    //   name: "NI건설 중랑 현장",
    //   video:videoTest4,
    //   timing:8000,
    //   txt:"쓰러짐"
    // },
    // {
    //   name: "NI건설 송파 현장",
    //   video:videoTest5,
    //   timing:10000,
    //   txt:"장시간 체류"
    // },
  
  ];

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isMainVideoActive, setIsMainVideoActive] = useState(false);//비디오 에러 active
  const [isSensingItemActive, setIsSensingItemActive] = useState(false);//감지목록 active
  const [sensingText, setSensingText] = useState("");//감지목록의 기물파손,쓰러짐 텍스트
  const [isConfirmButtonActive, setIsConfirmButtonActive] = useState(false);//조치사항입력 active
  const [sensingText2, setSensingText2] = useState("");//조치사항 입력에서 편의점 이름


  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    setIsMainVideoActive(false);
    setIsSensingItemActive(false); //감지목록 리스트 이전 상태 초기화
    setSensingText(dummyData[index].txt); // 선택된 아이템에 따라 텍스트 설정
    setSensingText2(dummyData[index].name); // 선택된 아이템에 따라 텍스트 설정
    setIsConfirmButtonActive(false)//조치사항 리셋

    // 이전 셋타임아웃 해제
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newTimeout = setTimeout(() => {
      setIsMainVideoActive(true);

      setTimeout(() => {
        setIsSensingItemActive(true);
      },100);
      console.log("순서-----------------",index)
      console.log("순서시간-----------------",dummyData[index].timing)

    }, dummyData[index].timing);
  timeoutRef.current = newTimeout;
  };


  const getVideoSource = () => {
    if (selectedItemIndex !== null) {
      return dummyData[selectedItemIndex].video;
    }
    return "";
  };


  const toggleConfirmButton = () => {
    setIsConfirmButtonActive(!isConfirmButtonActive);
  };

  const [isCheckVideoButtonActive, setIsCheckVideoButtonActive] = useState(false);//영상확인 토글 active
  const toggleCheckVideoButton = () => {
    setIsCheckVideoButtonActive(!isCheckVideoButtonActive);
  };
  return (
    <div className="warning-background">
      <div className={`warning__container ${isMainVideoActive ? "active" : ""}`}>
        <div className="container__left-box">
          <div className="left-box__title">경고알림 현황</div>

          <div className="left-box__main">
            <div className="main__list">
              {dummyData.map((item, index) => (
                <div
                  className={`main__item ${index === selectedItemIndex ? "active" : ""}`}
                  key={index}
                  onClick={() => handleItemClick(index)}
                >
                  {item.name}
                </div>
              ))}
            </div>
            {selectedItemIndex !== null && (
              <div className={`main__video ${isMainVideoActive ? "active" : ""}`}>
                <div className="vide__demoVideo">
                    <video key={selectedItemIndex} autoPlay controls>
                      <source src={getVideoSource()} type="video/mp4" />
                    </video>
                </div>
                <span className="video__errorEffect"></span>
              </div>
            )}
            {selectedItemIndex === null && (
              <p>탭을 선택하여 비디오를 보실 수 있습니다.</p>
            )}
          </div>
          {/* left-box__main--END-- */}

        </div>
        <div className="container__right-box">
          <div className="right-box__sensing-list">
            <div className="sensing-list__title">감지목록</div>
            
              <ul className="sensing-list__main">
              {selectedItemIndex !== null && (
                  <li className={`sensing__item ${isSensingItemActive ? "active" : ""}`}>
                    <span className="sensing-item__time">
                      2023-10-22 05:14:51 ~ 2023-10-23 05:40:10
                    </span>
                    <span className="sensing-item__text">{sensingText}</span>
                    <button className={`sensing-item__btn ${isConfirmButtonActive ? "active" : ""}`} onClick={toggleConfirmButton}>조치하기</button>
                  </li>
                )}
                {/* <li className="sensing__item ">
                  <span className="sensing-item__time">
                    2022-01-22 05:14:51 ~ 2022-01-23 05:40:10
                  </span>
                  <span className="sensing-item__text">기물파손</span>
                  <button className={`sensing-item__btn active`}>조치하기</button>
                </li> */}
              </ul>
              {!isSensingItemActive && (
                <div className="sensing-list__empty">감지목록이 없습니다.</div>
              )}
            {/* <ul className="sensing-list__main"> */}
              {/* <li className="sensing__item">
                <span className="sensing-item__time">
                  2022-00-00 00:00:00 ~ 2022-0000 00:00:30
                </span>
                <span className="sensing-item__text">기물파손</span>
                <button className="sensing-item__btn">조치하기</button>
              </li> */}
              {/* <div className="sensing-list__empty">감지목록이 없습니다.</div> */}
            {/* </ul> */}
          </div>
          <div className="right-box__enter-action">
            <div className="enter-action__title">조치 사항 입력</div>
            <div className="enter-action__main">
              <div className={`enter-action__main__hidden ${isConfirmButtonActive ? "active" : ""}`}>
                <div className="enter-action__info">
                  <div className="info__left">
                    <span className="info-left__title">
                      {sensingText2}
                      <span className="safety-belt__text">{sensingText}</span>
                    </span>
                    <span className="info-left__time">
                      2023-09-22 05:14:51 ~ 2023-09-23 05:40:10
                    </span>
                  </div>
                  <button className={`check-video__btn ${isCheckVideoButtonActive ? "active" : ""}`} onClick={toggleCheckVideoButton}>
                    영상확인
                  </button>
                </div>
                <form
                  className="enter-action__form"
                >
                  <label>
                    <span>확인자</span>
                    <input type="text" />
                  </label>
                  <label>
                    <span>조치자</span>
                    <input type="text" />
                  </label>
                  <label>
                    <span>위반자</span>

                    <input type="text" />
                  </label>
                  <label>
                    <span>조치결과</span>

                    <input type="text" />
                  </label>
                  <button className="enter-action__storage-btn">
                    <span>저장</span>
                  </button>
                </form>
                {/* 조치 항목이 없을때 */}
              </div>
              {!isConfirmButtonActive && (
                <div className="enter-action__empty">조치 항목이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {storageModal && <StorageModal setStorageModal={setStorageModal}  />}
    </div>
  );
};

export default Warning;
