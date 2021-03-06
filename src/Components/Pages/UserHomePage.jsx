import { accountURL, accountImageURL, uploadPP, virusTotal } from "../../settings";
import React, { useState, useEffect } from "react";
import UpdateProfile from "../Functionality/UpdateProfile";
import makeOptions, {makeOptionsForFileUpload, makeOptionsForFileUploadCheck} from "../Functionality/MakeOptionsWithToken";
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
    const accData = await fetch(accountURL, options);
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
  };

  const update = () => {
    UpdateProfile(accountInfo)
  };

  const HandleFileUpload = (evt) => {
    window.location.reload(true)
    const options = makeOptionsForFileUpload("POST", true, selectedFile);
    fetch(uploadPP, options);
  };
  const FixFile = async (evt) => {

    evt.preventDefault();
    
    
    let file = evt.target.files[0];
    // This SHOULD work, but apparently virustotal has a bug on their api
    //which makes this non-functional
    /* 
    const Buffer = require('buffer').Buffer;
    if (typeof input=="string") file = Buffer.from(file, 'utf8')
    if (Buffer.isBuffer(file)) file = file;
    file = JSON.stringify(file);
    let formData = new FormData();
    let fileObj = {value: file, options: {filename: file.name, filetype: file.type}};
    formData.append("file", fileObj);
    const fileCheckOpts = makeOptionsForFileUploadCheck("POST", formData);
    console.log(evt.target.files[0], fileCheckOpts);
    const fileCheck = await fetch(virusTotal, fileCheckOpts);
    const filecheckJson = await fileCheck.json();
    */
    const img = await resizeFile(file);
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
            <img src={profilePic} alt=""/>
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
