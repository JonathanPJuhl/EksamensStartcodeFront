import { accountURL, accountImageURL, uploadPP } from "../../settings";
import React, { useState, useEffect } from "react";
import { fetchUsername } from "../Authentication/decodeJWT";
import UpdateProfile from "../Functionality/UpdateProfile";
import makeOptions, {makeOptionsForFileUpload} from "../Functionality/MakeOptionsWithToken";
import resizeFile from "../Functionality/ImgResizer";

export default function UserHomePage() {
  
  useEffect(() => {
    fetchItems();
  }, []);

  const [accountInfo, setaccountInfo] = useState({email: "", profileText: ""});
  const [profilePic, setProfilePic] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchItems = async () => {
    const options = makeOptions("GET", true);
    const picOpts = makeOptionsForFileUpload("GET", true);
    const accData = await fetch(accountURL + fetchUsername(), options);
    const accPic = await fetch(accountImageURL, picOpts);
    const accInfo = await accData.json();
    const picText = await accPic.blob();
    
    const localUrl = URL.createObjectURL(picText);
    setProfilePic(localUrl);
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
    evt.preventDefault();
    const options = makeOptionsForFileUpload("POST", true, selectedFile);
    fetch(uploadPP, options);
  };
  const FixFile = async (evt) => {
    evt.preventDefault();
    const img = await resizeFile(evt.target.files[0]);
    setSelectedFile(img);
  }
  
    return (
     
        <div>
          <form onChange={HandleOnChange} onSubmit={update}>
            <p>Username:</p>
            <input type="email" id="email" defaultValue = {accountInfo.email}></input> 
            <p>Profile Text:</p>
            <textarea type="text" id="profileText" defaultValue = {accountInfo.profileText}></textarea>
            <p>Profile picure:</p>
            <img src={profilePic}/>
            <br></br>
            <br></br>
            <br></br>
            <input type="file" name="file" onChange={FixFile}/>
            <button onClick={HandleFileUpload}>Submit new profile picture</button>
            <br></br>
            <br></br>
            <input
              className="buttons"
              type="submit"
              value="Update"
            />
          </form>
        </div>
    );
}
