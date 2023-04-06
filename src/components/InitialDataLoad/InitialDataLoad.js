import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiUrlContextManager, menuContextManager, OrderContextManager, userContextManager } from '../../App';
import localforage from 'localforage';

const InitialDataLoad = () => {


  const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId,  getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);
  const [getMenuId, setMenuId, getMenu, setMenu, getDashboardMenu, setDashboardMenu] = useContext(menuContextManager)
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);
  const [getModelBaseUrl, setModelBaseUrl, getApiBasicUrl, setApiBasicUrl] = useContext(apiUrlContextManager); 

  const location = useLocation();

  const defaultSettingFunc = (token) => {
    console.log(token)
    fetch(getApiBasicUrl+"/default-settings", {
      headers: {
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status_code == 200) {
          console.log(data);
          setModelBaseUrl(data.results.default_settings[0].model_base_url)
          setServiceTypeId(data.results.default_settings[0].service_type_id)
          setSubscriptionPlanId(data.results.default_settings[0].subscription_plan_type_id)
        }
      })
  }

  const menuFunc = () => {
    fetch(getApiBasicUrl+"/menu", {
      headers: {
        'Authorization': 'bearer ' + getToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((res) => res.json())
      .then(
        (data) => {
          setMenu(data.results.menu_list);
          data.results.menu_list.map(menuData => {
            console.log(location.pathname == menuData.url);
            menuData.url == '/file-uploads' && setMenuId(menuData.id)
            /*
            if(location.pathname == menuData.url){
                setMenuId(menuData.id)
            }
            */
          })
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const getUserInfoFunc =()=>{
    localforage.getItem("userInfo").then(data => {
      if(data !== null && Object.keys(data).length > 0 ){
        setUserInfo(data); 
        setToken(data.results.token); 
        defaultSettingFunc(data.results.token)
      }
    })
  }
  useEffect(() => {
    getUserInfoFunc()
    defaultSettingFunc(getToken);
    menuFunc()
  }, []);

  return (
    <>
    </>
  );
};

export default InitialDataLoad;