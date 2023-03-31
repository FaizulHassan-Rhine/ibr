import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { menuContextManager, OrderContextManager, userContextManager } from '../../App';

const InitialDataLoad = () => {


  const [getServiceTypeId, setServiceTypeId, getSubscriptionPlanId, setSubscriptionPlanId, getModelBaseUrl, setModelBaseUrl, getOrderMasterId, setOrderMasterId, getCostDetails, setCostDetails] = useContext(OrderContextManager);
  const [getMenuId, setMenuId,  getMenu, setMenu, getDashboardMenu, setDashboardMenu] = useContext(menuContextManager)
  const [getUserInfo, setUserInfo, getToken, setToken] = useContext(userContextManager);

    const location = useLocation(); 

    const defaultSettingFunc =() =>{
      fetch("http://103.197.204.22:8007/api/2023-02/default-settings", { 
        headers:{
            'Authorization': 'bearer '+ getToken, 
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
      .then(res => res.json())
      .then(data => {
        if(data.status_code == 200){
          console.log(data); 
          setModelBaseUrl(data.results.default_settings[0].model_base_url)
          setServiceTypeId(data.results.default_settings[0].service_type_id)
          setSubscriptionPlanId(data.results.default_settings[0].subscription_plan_type_id)
        } 
      })
    } 

      const menuFunc = () =>{
        fetch("http://103.197.204.22:8007/api/2023-02/menu", { 
          headers:{
              'Authorization': 'bearer '+ getToken, 
              'Content-Type': 'application/x-www-form-urlencoded'
          }})
        .then((res) => res.json())
        .then(
          (data) => {
            setMenu(data.results.menu_list);
            data.results.menu_list.map(menuData => {
                console.log(location.pathname  == menuData.url); 
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
    


      useEffect(() => {
        defaultSettingFunc()
        menuFunc()
      }, []);
      
    return (
        <>
        </>
    );
};

export default InitialDataLoad;