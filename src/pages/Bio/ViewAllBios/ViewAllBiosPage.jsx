import { useState, useEffect } from "react";
import { getAllProfilesRequest } from "../../../utilities/profiles-api";
export default function ViewAllBiosPage() {
  const [bios, setBios] = useState([]);

  useEffect(() => {
    async function fetchBios() {
      try {
        const biosData = await getAllProfilesRequest();
        setBios(biosData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBios();
  }, []);

  return (
    <>
      {bios.map((eachBio, index) => (
        <h3 key={eachBio._id}>{eachBio.bio_string}</h3>
      ))}
    </>
  );
}
