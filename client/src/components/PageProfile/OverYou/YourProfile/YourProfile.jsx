import React,  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EditAbout from "../EditAbout/editAbout";
import { BsPencilSquare } from "react-icons/bs";

function YourProfile({profileId}) {

  const [editAbout, setEditAbout] = useState(false);
  const about = useSelector((state) => state.userProfileFriend?.description);
  const userId = useSelector((state) => state.userInformation?._id);

  useEffect(() => {
  }, [about, editAbout]);

  return (
    <div className=" h-full w-full p-4 gap-3 flex flex-col rounded-lg">
      <h1 className="text-2xl font-black">
        Acerca de
      </h1>
      {
        editAbout ? (
          <div className="h-full ">
            <EditAbout  editAbout = { editAbout } setEditAbout = { setEditAbout } userId = { profileId } currentAbout = { about } />
          </div>
        ) : (
          <div className="flex w-full h-full  relative ">
            <BsPencilSquare className="absolute bottom-2 right-2 w-10 h-10 text-amber-300 cursor-pointer" onClick={() => setEditAbout(true)} />
            {
              about ? (
                <div className="flex flex-col w-full">
                  <p className="text-justify overflow-auto">
                    {about}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  <p>
                    Completa tu perfil, describe quien eres y que te gusta...
                  </p> 
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
}

export default YourProfile;
