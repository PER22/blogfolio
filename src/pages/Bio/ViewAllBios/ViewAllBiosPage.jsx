import { useState, useEffect } from "react";
import { getAllProfilesRequest } from "../../../utilities/profiles-api";
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
      {bios.map((eachBio, index) => (
        <h3 key={eachBio._id}>{eachBio.bio_string}</h3>
      ))}
    </>
  );
}
