import React, { useState } from "react";

const Card = ({ allcampaign, setOpenModel, setDonate, title }) => {
  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays.toFixed(0);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <p className="py-16 text-2xl font-bold leading-5">{title}</p>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {allcampaign?.length > 0 ? (
          allcampaign.map((campaign, i) => (
            <div
              onClick={() => (setDonate(campaign), setOpenModel(true))}
              key={i + 1}
              className="cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded shadow-md hover:shadow-lg"
            >
              <img
                src={campaign.image || "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
                className="object-cover w-full h-64 rounded-t"
                alt="Campaign"
              />

              <div className="py-5 pl-2 pr-2">
                <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                  Days Left: {daysLeft(campaign.deadline)}
                </p>
                <div className="inline-block mb-3 text-black transition-colors duration-200 hover:text-purple-600">
                  <p className="text-2xl font-bold leading-5">{campaign.title}</p>
                </div>
                <p className="mb-4 text-gray-700">{campaign.description}</p>
                <div className="flex space-x-4">
                  <p className="font-semibold">Target: {campaign.target} ETH</p>
                  <p className="font-semibold">
                    Raised: {campaign.amountCollected} ETH
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No campaigns available</p>
            <p className="text-gray-400 text-sm mt-2">Click "Create Campaign" to add your first campaign</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Create Campaign Form Component
const CreateCampaignForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleSubmit = () => {
    if (formData.title && formData.description && formData.target && formData.deadline) {
      onSubmit({
        ...formData,
        amountCollected: '0',
        id: Date.now() // Simple ID generation
      });
      setFormData({
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6">Create New Campaign</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter campaign title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your campaign"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Amount (ETH) *
            </label>
            <input
              type="number"
              name="target"
              value={formData.target}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline *
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (Optional)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Create Campaign
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const CampaignApp = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [donate, setDonate] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateCampaign = (newCampaign) => {
    // Add to both all campaigns and user's campaigns
    setCampaigns(prev => [...prev, newCampaign]);
    setUserCampaigns(prev => [...prev, newCampaign]);
    setShowCreateForm(false);
  };

  const handleDonate = (campaign) => {
    const donationAmount = prompt(`Enter donation amount for "${campaign.title}" (ETH):`);
    if (donationAmount && !isNaN(donationAmount) && parseFloat(donationAmount) > 0) {
      const updatedCampaigns = campaigns.map(c => 
        c.id === campaign.id 
          ? { ...c, amountCollected: (parseFloat(c.amountCollected) + parseFloat(donationAmount)).toString() }
          : c
      );
      setCampaigns(updatedCampaigns);
      
      // Update user campaigns too if it's their campaign
      const updatedUserCampaigns = userCampaigns.map(c => 
        c.id === campaign.id 
          ? { ...c, amountCollected: (parseFloat(c.amountCollected) + parseFloat(donationAmount)).toString() }
          : c
      );
      setUserCampaigns(updatedUserCampaigns);
      
      setOpenModel(false);
      alert(`Thank you for donating ${donationAmount} ETH to "${campaign.title}"!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* <h1 className="text-xl font-bold text-gray-900">Campaign Platform</h1> */}
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Create Campaign
            </button>
          </div>
        </div>
      </header>

      {/* All Campaigns Section */}
      <Card
        allcampaign={campaigns}
        setOpenModel={setOpenModel}
        setDonate={setDonate}
        title="All Listed Campaigns"
      />

      {/* User's Campaigns Section */}
      

      {/* Create Campaign Form Modal */}
      {showCreateForm && (
        <CreateCampaignForm
          onSubmit={handleCreateCampaign}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {/* Campaign Details Modal */}
      {openModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Campaign Details</h3>
            {donate && (
              <div>
                <img
                  src={donate.image || "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
                  className="w-full h-48 object-cover rounded mb-4"
                  alt="Campaign"
                />
                <p className="font-semibold text-lg mb-2">{donate.title}</p>
                <p className="text-gray-600 mb-4">{donate.description}</p>
                <div className="space-y-2 mb-4">
                  <p><span className="font-semibold">Target:</span> {donate.target} ETH</p>
                  <p><span className="font-semibold">Raised:</span> {donate.amountCollected} ETH</p>
                  <p><span className="font-semibold">Deadline:</span> {new Date(donate.deadline).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleDonate(donate)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Donate
                  </button>
                  <button
                    onClick={() => setOpenModel(false)}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignApp;