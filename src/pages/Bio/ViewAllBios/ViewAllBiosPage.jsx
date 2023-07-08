import { useState, useEffect } from "react";
import { getAllProfilesRequest } from "../../../utilities/profiles-api";
import BioCard from "../../../components/BioCard/BioCard";
export default function ViewAllBiosPage() {
  const [bios, setBios] = useState([]);

  useEffect(() => {
    async function getAllProfiles() {
      try {
        const biosData = await getAllProfilesRequest();
        setBios(biosData);
      } catch (error) {
        console.log(error);
      }
    }
    getAllProfiles();
  }, []);

  return (
    <>
      {bios.map((eachBio) => (
        <BioCard profile={eachBio} specifiedUser={eachBio.user}/>
      ))}
    </>
  );
}
