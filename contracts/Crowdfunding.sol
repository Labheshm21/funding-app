// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint goal;
        uint deadline;
        uint amountCollected;
        address[] donors;
        uint[] donations;
    }

    mapping(uint => Campaign) public campaigns;
    uint public numberOfCampaigns;

    function createCampaign(
        string memory _title,
        string memory _description,
        uint _goal,
        uint _deadline
    ) public returns (uint) {
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner           = msg.sender;
        campaign.title           = _title;
        campaign.description     = _description;
        campaign.goal            = _goal;
        campaign.deadline        = _deadline;
        campaign.amountCollected = 0;

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint _id) public payable {
        require(_id < numberOfCampaigns, "Campaign does not exist");

        Campaign storage campaign = campaigns[_id];
        campaign.donors.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;

        (bool sent,) = payable(campaign.owner).call{ value: msg.value }("");
        require(sent, "Failed to send Ether");
    }

    function getDonors(uint _id)
        external
        view
        returns (address[] memory, uint[] memory)
    {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        return (campaigns[_id].donors, campaigns[_id].donations);
    }

    /// @dev internal function to get all campaigns
    function _getAllCampaigns()
        internal
        view
        returns (Campaign[] memory)
    {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

    /// @dev returns every campaign in one go
    function getAllCampaigns()
        external
        view
        returns (Campaign[] memory)
    {
        return _getAllCampaigns();
    }

    /// @dev alias so JS can call `contract.getCampaigns()`
    function getCampaigns()
        external
        view
        returns (Campaign[] memory)
    {
        return _getAllCampaigns();
    }
}