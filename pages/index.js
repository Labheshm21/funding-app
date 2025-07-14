import React, { useEffect, useContext, useState } from "react";
import { CrowdFundingContext } from "../Context/CrowdFundingContext";
import Hero from "../Components/Hero";
import Card from "../Components/Card";
import PopUp from "../Components/PopUp";

export default function HomePage() {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
    debugContract,
  } = useContext(CrowdFundingContext);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  useEffect(() => {
    async function loadCampaigns() {
      try {
        setLoading(true);
        
        console.log("=== DEBUG CONTRACT ===");
        const debugInfo = await debugContract();
        console.log("Debug info:", debugInfo);
        
        if (!debugInfo.exists) {
          console.error("Contract not found! Please deploy the contract first.");
          return;
        }
        
        console.log("=== LOADING CAMPAIGNS ===");
        const all = await getCampaigns();
        console.log("All campaigns loaded:", all);
        setAllCampaigns(all);

        const users = await getUserCampaigns();
        console.log("User campaigns loaded:", users);
        setUserCampaigns(users);
        
      } catch (error) {
        console.error("Failed to load campaigns:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, [getCampaigns, getUserCampaigns, debugContract]); // Now these are stable references

  console.log("Current donate campaign:", donateCampaign);

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} setOpenModel={setOpenModel} />
      <Card title="All Listed Campaigns" allCampaigns={allCampaigns} setOpenModel={setOpenModel} setDonateCampaign={setDonateCampaign} />
      <Card title="Your Created Campaign" allCampaigns={userCampaigns} setOpenModel={setOpenModel} setDonateCampaign={setDonateCampaign} />
      {openModel && <PopUp setOpenModel={setOpenModel} getDonations={getDonations} donate={donateCampaign} donateFunction={donate} />}
    </>
  );
}