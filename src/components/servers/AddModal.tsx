import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import axios, { HttpStatusCode } from "axios";
import Select from "react-select";

const ModalExample: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [db, setdb] = useState<boolean>(false);
  const [dbConnect, setDbConnect] = useState<Boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgPath, setImgPath] = useState("");
  const [disSaveBtn, setDisSaveBtn] = useState<boolean>(true);
  const [formData, setFormData] = useState<{
    serverName: string;
    serverIp: string;
    serverPort: number;
    serverGame: string;
  }>({
    serverName: "",
    serverIp: "",
    serverPort: 0,
    serverGame: "",
  });

  interface OptionType {
    value: string;
    label: string;
  }

  const options: OptionType[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const handleSubmit = () => {
    const formDataToSend = new FormData();

    // 이미지 파일을 fileInputRef에서 가져와 FormData에 추가
    if (fileInputRef.current && fileInputRef.current.files) {
      const imageFile = fileInputRef.current.files[0];
      formDataToSend.append("multipartFile", imageFile); // 파일 이름 추가
    }

    // 서버 데이터 추가
    const jsonData = JSON.stringify(formData);

    const blob = new Blob([jsonData], { type: "application/json" });
    formDataToSend.append("server", blob);

    axios
      .put("http://localhost:8080/api/server", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type을 올바르게 설정
        },
      })
      .then((response) => {
        console.log("Server response:", response.data);
        closeModal(); // 성공적으로 전송되면 모달을 닫습니다.
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  useEffect(() => {
    ReactModal.setAppElement("#root"); // 루트 요소를 앱 요소로 설정
    setImgPath(""); // 모달 닫을 때 이미지 초기화
  }, [modalIsOpen]);

  useEffect(() => {
    if (db && dbConnect) {
      setDisSaveBtn(false);
    } else {
      setDisSaveBtn(!!db); // Converts db to a boolean value
    }
    console.log(disSaveBtn);
  }, [db, dbConnect]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력(input) 요소를 클릭하여 파일 선택 다이얼로그를 엽니다.
    }
  };

  const previewImage = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const img = fileInputRef.current.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        setImgPath(reader.result as string);
      };
    }
  };

  const changeSetDb = () => {
    if (db === true) {
      setdb(false);
    } else {
      setdb(true);
    }
  };

  const handleChangeSelect = (selectedOption: OptionType | null) => {
    const { value } = selectedOption as OptionType;
    setFormData((prev) => ({ ...prev, serverGame: value }));
  };
  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="hover:brightness-75 transition-all duration-300 bg-slate-50 min-w-72 h-48 rounded-md flex justify-center items-center my-anchor-elementnp"
        >
          <div>
            <FontAwesomeIcon
              icon={["fas", "plus"]}
              className="text-5xl text-slate-300"
            />
          </div>
        </button>
        <ReactModal
          style={{
            overlay: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              padding: "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              position: "relative",
              height: "700px",
              width: "600px",
              border: "none",
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          <form className="overflow-hidden h-full  flex flex-col justify-between">
            <div className="flex flex-col justify-between overflow-scroll p-4 h-full">
              <div className="flex flex-col gap-6">
                <button
                  className="hover:brightness-75 transition-all duration-300 bg-slate-50 h-48 rounded-md flex justify-center items-center relative my-anchor-elementnp"
                  onClick={handleFileButtonClick}
                >
                  <div className="w-full h-full relative content-center">
                    {imgPath ? (
                      <img
                        src={imgPath}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={["fas", "plus"]}
                        className="text-5xl text-slate-300 "
                      />
                    )}
                  </div>
                </button>
                {/* 파일 입력(input) 요소 */}
                <input
                  type="file"
                  accept=".gif, .jpg, .png"
                  onChange={previewImage}
                  ref={fileInputRef}
                  style={{ display: "none" }} // 실제로 표시되지 않도록 숨김
                />
                <Select options={options} onChange={handleChangeSelect} />
                <input
                  name="serverName"
                  className="border rounded-md h-12 px-4"
                  placeholder="Tag"
                  value={formData.serverName}
                  onChange={(e) => onChangeHandler(e)}
                />
                <input
                  name="serverIp"
                  className="border rounded-md h-12 px-4"
                  placeholder="IP"
                  value={formData.serverIp}
                  onChange={(e) => onChangeHandler(e)}
                ></input>
                <input
                  name="serverPort"
                  type="number"
                  className="border rounded-md h-12 px-4"
                  placeholder="Port"
                  value={formData.serverPort}
                  onChange={(e) => onChangeHandler(e)}
                ></input>
                <button
                  onClick={closeModal}
                  className="bg-blue-500 p-2 rounded-md min-w-16 text-white"
                >
                  Connect Test
                </button>
                <div className="flex justify-between items-center">
                  <label>
                    {" "}
                    Database connect{" "}
                    <input
                      type="checkbox"
                      checked={db}
                      onChange={changeSetDb}
                    ></input>
                  </label>
                </div>

                {db && (
                  <>
                    <input
                      className="border rounded-md h-12 px-4"
                      placeholder="Url"
                    />
                    <input
                      className="border rounded-md h-12 px-4"
                      placeholder="database"
                    ></input>
                    <input
                      className="border rounded-md h-12 px-4"
                      placeholder="Username"
                    ></input>
                    <input
                      className="border rounded-md h-12 px-4"
                      placeholder="Password"
                    ></input>
                    <button
                      onClick={closeModal}
                      className="bg-blue-500 p-2 rounded-md min-w-16 text-white"
                    >
                      Connect Test
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4 p-4">
              {""}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={disSaveBtn}
                className={`bg-blue-500 p-2 rounded-md min-w-16 text-white ${
                  disSaveBtn && "brightness-75"
                }`}
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-blue-500 p-2 rounded-md min-w-16 text-white"
              >
                Close
              </button>
            </div>
          </form>
        </ReactModal>
      </div>

      <Tooltip anchorSelect=".my-anchor-element" place="top">
        Add Server
      </Tooltip>
    </>
  );
};

export default ModalExample;
