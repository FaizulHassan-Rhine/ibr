import React, { useContext, useEffect, useState } from "react";
import offer from "../CouponCode/img/coupon_2.jpg"
import logo from "../../images/logo.png"
import { userContextManager } from "../../App";
import { Link } from "react-router-dom";

function CouponCode() {


    const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);

    const [getCouponDetails, setCouponDetails] = useState([])

    useEffect(() => {

        fetch('http://103.197.204.22:8007/api/2023-02/promotions', {
            headers: {
                'Authorization': 'bearer ' + getToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => res.json())
            .then(data => setCouponDetails(data))


    }, []);


    return (
        <>
            <div className="container mx-auto">

                <div>
                    <div className="flex justify-center mb-10">
                        <h2 className="text-4xl mt-4 text-green-700 font-semibold">PROMO CODE |</h2>
                        <img className="h-12 w-60 mt-3" src={logo} alt="" />
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-y-8 gap-x-5 mt-10">
                        {console.log(getCouponDetails)}
                        {Object.keys(getCouponDetails).length > 0 && typeof getCouponDetails.results.promotions_list !== 'undefined' &&
                            getCouponDetails.results.promotions_list.map((data, index) => (

                                <div className="">
                                    <div className="card p-2  border border-green-400  bg-white shadow-xl">
                                        <img className="" src={offer} alt="" />

                                        <div className="card-body ml-2">
                                            <p className="font-semibold">{data.title}</p>
                                            <h2 className="card-title ">CODE <span className="text-orange-500 pl-2 font-semibold">{data.code}</span></h2>
                                            <p className="text-sm">{data.description}</p>

                                            <div className="card-actions flex justify-between">
                                                <p className="text-xs pt-2">2K Users use this today.</p>
                                                <button className="bg-green-400 text-sm px-4 py-1 mr-3 hover:bg-teal-300 text-white font-semibold rounded-md">Avail</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
                <Link to="/file-uploads">
                    <button
                        className=" w-10 h-10 border border-theme-shade rounded-full"
                        style={{
                            position: "absolute",
                            top: 60,
                            right: 20,
                            backgroundColor: "white",

                            padding: "8px 15px",
                        }}

                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </Link>
            </div>
        </>
    );
}
export default CouponCode;
