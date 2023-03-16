import hoody from "./img/hoody.jpg";
import { BiShow, BiDownload } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { OrderContextManager } from "../../App";
import ReactCompareImage from "react-compare-image";
import "./page3.css";

const ViewDwnld = ({ imagesBeforeAfter }) => {
  const [checked, setChecked] = useState(true);
  const [getServicMenu, setServiceMenu] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId] =
    useContext(OrderContextManager);

  const [isImageVisible, setImageVisibility] = useState(false);
  const before = imagesBeforeAfter.output_urls[0].compressed_raw_image_public_url;
  const after = imagesBeforeAfter.output_urls[0].default_compressed_output_public_url;
  const isProcess = imagesBeforeAfter.output_urls[0].is_ai_processed;

  const handleViewClick = () => {
    setImageVisibility(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseClick = () => {
    setImageVisibility(false);
    document.body.style.overflow = "unset";
  };


  const loadMenuServiceId = () => {
    fetch("http://103.197.204.22:8007/api/2023-02/service-types")
      .then((response) => response.json())
      .then((res) => {
        const promises = res.results.service_type_list.map((data) => {
          const menuList = { ...data, sub_menu: [] };
          data.is_default == true && setServiceTypeId(data.id);
          return fetch(
            `http://103.197.204.22:8007/api/2023-02/manual-service?service_type_id=${data.id}`
          )
            .then((listRes) => listRes.json())
            .then((resultList) => {
              menuList.sub_menu = resultList.results.service_items;
              return menuList;
            });
        });
        Promise.all(promises).then((menuArray) => {
          setServiceMenu(menuArray);
        });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    loadMenuServiceId();
  }, [imagesBeforeAfter]);
  
  return (
    <div>
      {isImageVisible && (
        <div>
          <div
            className="bg-green-800"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="h-[540px] w-[800px] bg-white mt-10 relative rounded-lg">
              <div className="  pt-20 pl-5 absolute ">
                <div className="w-[350px]">
                  <ReactCompareImage
                    hover={true}
                    vertical={false}
                    leftImage={before}
                    rightImage={after}
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <div>
                    <button className="bg-green-800 text-white rounded-2xl mt-4  px-4 w-40 py-1 hover:bg-white hover:text-black border border-green-800">
                      Download
                    </button>
                    <p className="text-sm text-center mt-1">
                      Preview Image 100/200
                    </p>
                  </div>
                  <div>
                    <button className="bg-white text-black border-green-800 border  rounded-2xl mt-4 px-4 w-40 py-1 hover:bg-green-800 hover:text-white">
                      Download HD
                    </button>
                    <p className="text-sm text-center mt-1">
                      Full Image 2000/3000
                    </p>
                  </div>
                </div>
              </div>

              <div id="rightMenuBarWrap" className="hfull  w-52   bg-white   ">
                <ul className="space-y-2">
                  {getServicMenu.length > 0 &&
                    getServicMenu.map((data, index) => (
                      <li key={index}>
                        <p className="pl-4 bg-gray-200 py-1 mb-2 rounded-l-3xl font-semibold">
                          {data.name}
                        </p>
                        {data.sub_menu.length > 0 &&
                          data.sub_menu.map((subData, sIndex) => (
                            <div
                              key={sIndex}
                              className="flex items-center p-2 text-base font-normal hover:border-r-2 rounded-l-3xl bg-green-700 hover:border-r-white text-white mb-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                defaultChecked={subData.is_checked}
                                onChange={() => setChecked(!checked)}
                                id={"check_" + sIndex}
                                className=" checked:bg-orange-400 checked:border-orange-400"
                              />
                              <label
                                htmlFor={"check_" + sIndex}
                                className="ml-3"
                              >
                                {subData.name}
                              </label>
                            </div>
                          ))}
                      </li>
                    ))}
                </ul>
                <button className="bg-green-700 mt-3 font-semibold px-8 rounded-3xl hover:bg-white border border-green-700 hover:text-black py-1 text-white">
                  Send
                </button>
              </div>
            </div>

            <button
              className="bg-white w-10 h-10 border border-theme-shade rounded-full"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                backgroundColor: "white",
                border: "none",
                padding: "10px 15px",
              }}
              onClick={handleCloseClick}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
      {isProcess && (
        <div className="grid sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-4 gap-5">
          <div className="col-span-3 ...">
            <BiShow
              className="h-8 w-8 opacity-40 "
              onClick={handleViewClick}
              style={{ cursor: "pointer" }}
            ></BiShow>
          </div>
          <div className="...">
            <a href={after} download>
              <BiDownload className="h-7 w-7 opacity-40"></BiDownload>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDwnld;
