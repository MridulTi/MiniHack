import { useEffect, useState } from "react";

const Modal = ({ contract }) => {
    const [address,setaddress]=useState("")
  const sharing = async () => {
    
    // const address = document.getElementsByClassName("address").value;
    console.log(address)
    
    await contract.add(address,"prashant");
    
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
                onChange={()=>{setaddress(value)}}
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;