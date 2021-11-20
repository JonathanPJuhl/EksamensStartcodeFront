import { accountURL, uploadPP } from "../../settings";
import React, { useState, useEffect } from "react";
import { fetchUsername } from "../Authentication/decodeJWT";
import UpdateProfile from "../Functionality/UpdateProfile";
import makeOptions, {makeOptionsForFileUpload} from "../Functionality/MakeOptionsWithToken";

export default function UserHomePage() {
  
  useEffect(() => {
    fetchItems();
  }, []);

  const [accountInfo, setaccountInfo] = useState({email: "", profileText: ""});

  const fetchItems = async () => {
    const options = makeOptions("GET", true);
    const accData = await fetch(accountURL + fetchUsername(), options);
    const accInfo = await accData.json();
  
    setaccountInfo(accInfo);
  };

  const HandleOnChange = (evt) => {
    evt.preventDefault();
    let target = evt.target;
    let id = target.id;
    let value = target.value;

    setaccountInfo({ ...accountInfo, [id]: value });
  }

  const update = (evt) => {
    evt.preventDefault();
    UpdateProfile(accountInfo)
  };
  const HandleFileUpload = (evt) => {
    console.log(evt.target.files[0])
      const options = makeOptionsForFileUpload("POST", true, evt.target.files[0]);
      const accData = fetch(uploadPP, options);
  };
  
    return (
     
        <div>
          <form onChange={HandleOnChange} onSubmit={update}>
            <p>Username:</p>
            <input type="email" id="email" defaultValue = {accountInfo.email}></input> 
            <p>Profile Text:</p>
            <textarea type="text" id="profileText" defaultValue = {accountInfo.profileText}></textarea>
            <p>Profile picure:</p>
            <input type="file" name="file" onChange={HandleFileUpload}/>
            <br></br>
            <br></br>
            <input
              className="buttons"
              type="submit"
              value="Update"
              //onClick={update}
            />
          </form>
        </div>
    );
}
