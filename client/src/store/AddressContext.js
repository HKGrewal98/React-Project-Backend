import React, { createContext, useState } from "react";

// create a context with initial values
export const AddressContext = createContext({
   setOrderAddress:(houseNo,street,postal,city)=>{},
   getOrderAddress:()=>{}
});

const AddressContextProvider = ({ children }) => {

    const [userAddress,setUserAddress] = useState({
      houseNo:"",
      street:"",
      postal:"",
      city:""
    })

    console.log(userAddress)

    const setOrderAddress = (houseNo,street,postal,city) => {
             const address = {
              houseNo:houseNo,
              street:street,
              postal:postal,
              city:city
             }

             setUserAddress(address)
    }

    const getOrderAddress = () => {
      return userAddress
    }

  return (
    <AddressContext.Provider value={{
      setOrderAddress:setOrderAddress,
      getOrderAddress:getOrderAddress
    }}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContextProvider;
