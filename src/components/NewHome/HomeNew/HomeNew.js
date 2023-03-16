import { useContext } from "react";
import { Link } from "react-router-dom";
import { OrderContextManager } from "../../../App";
import Loading from "../../Loading/Loading";
import Services from "../../NewService/Services/Services";
import Service_2 from "../../NewService/Service_2";
import video from "../VideoViewer/Video/demo.mp4";
import applelogo from "../HomeNew/img/apple_logo.png";
import googlelogo from "../HomeNew/img/google_logo.png";
import box from "../../NewService/Services/img/box.png";
import x from "../../NewService/Services/img/x.png";
import o from "../../NewService/Services/img/o.png";
import control from "../../NewService/Services/img/control.png";

import "./style.css";

const Home = () => {
  const [getMenuId, setMenuId, getServiceTypeId, setServiceTypeId, getMenu] =
    useContext(OrderContextManager);

  return (
    <div id="home">
      <div className=" container m-auto ">
        <div className="home_right flex">
          <div>
            <video
              className="mt-0 ml-10 mb-20"
              width="65%"
              height="450"
              controls
              autoPlay
              muted
              loop
            >
              <source src={video} type="video/mp4" />
            </video>
            <div className="flex ml-10">
              <img className="h-20 w-52 mr-2" src={applelogo} alt="" />
              <img className="h-16 w-40 mt-2" src={googlelogo} alt="" />
            </div>
          </div>
          <div>
            <h2>AI-Professionals Collaboration</h2>
            {getMenu.map(
              (data) =>
                data.type == "upload" && (
                  <Link onClick={() => setMenuId(data.id)} to={data.url}>
                    <button>Get Started</button>
                  </Link>
                )
            )}
            <div>
              <p className="mt-16 mb-6 text-white font-semibold text-4xl">
                Add-On Services
              </p>
              <div className="flex gap-5">
                <img className="h-12 w-12 " src={box} alt="" />
                <img className="h-12 w-12 " src={x} alt="" />
                <img className="h-12 w-12 " src={o} alt="" />
                <img className="h-12 w-12 " src={control} alt="" />
                <img className="h-12 w-12 " src={x} alt="" />
                <img className="h-12 w-12 " src={box} alt="" />
                <img className="h-12 w-12 " src={o} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loading></Loading>
      <Services></Services>
      <Service_2></Service_2>
    </div>
  );
};

export default Home;
