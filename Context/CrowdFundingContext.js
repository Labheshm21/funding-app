import React, { createContext, useState, useEffect, useCallback } from 'react';
import Web3Modal from 'web3modal';
import {
  Contract,
  JsonRpcProvider,
  BrowserProvider,
  parseUnits,
  parseEther,
  formatEther
} from 'ethers';
import CrowdfundingArtifact from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json';

const CrowdFundingABI     = CrowdfundingArtifact.abi;
const CrowdFundingAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const LOCAL_RPC = 'http://127.0.0.1:8545';

export const CrowdFundingContext = createContext(null);

const fetchContract = signerOrProvider =>
  new Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingProvider = ({ children }) => {
  const titleData = 'Crowd Funding Contract';
  const [currentAccount, setCurrentAccount] = useState('');
  const [error, setError] = useState('');

  // Wrap functions with useCallback to prevent recreating on every render
  const debugContract = useCallback(async () => {
    try {
      const provider = new JsonRpcProvider(LOCAL_RPC);
      
      const code = await provider.getCode(CrowdFundingAddress);
      console.log("Contract exists:", code !== "0x");
      console.log("Contract code length:", code.length);
      
      const network = await provider.getNetwork();
      console.log("Network:", network);
      
      const contract = fetchContract(provider);
      const numCampaigns = await contract.numberOfCampaigns();
      console.log("Number of campaigns:", numCampaigns.toString());
      
      return { exists: code !== "0x", numCampaigns: numCampaigns.toString() };
    } catch (error) {
      console.error("Debug error:", error);
      return { exists: false, numCampaigns: "0" };
    }
  }, []); // Empty dependency array since it doesn't depend on any state

  const getCampaigns = useCallback(async () => {
    try {
      const provider = new JsonRpcProvider(LOCAL_RPC);
      const contract = fetchContract(provider);

      const code = await provider.getCode(CrowdFundingAddress);
      if (code === "0x") {
        throw new Error("Contract not deployed at this address");
      }

      const numCampaigns = await contract.numberOfCampaigns();
      console.log("Number of campaigns:", numCampaigns.toString());

      if (numCampaigns.toString() === "0") {
        console.log("No campaigns created yet");
        return [];
      }

      const raw = await contract.getCampaigns();
      console.log("Raw campaigns:", raw);

      return raw.map((c, i) => ({
        pId: i,
        owner: c.owner,
        title: c.title,
        description: c.description,
        target: formatEther(c.goal),
        amountCollected: formatEther(c.amountCollected),
        deadline: Number(c.deadline)
      }));
    } catch (err) {
      console.error('Get campaigns error:', err);
      setError(`Failed to fetch campaigns: ${err.message}`);
      return [];
    }
  }, []); // Empty dependency array

  const getUserCampaigns = useCallback(async () => {
    try {
      const all = await getCampaigns();
      return all.filter(c => c.owner.toLowerCase() === currentAccount.toLowerCase());
    } catch (err) {
      console.error('Get user campaigns error:', err);
      setError('Failed to fetch user campaigns');
      return [];
    }
  }, [currentAccount, getCampaigns]); // Only depends on currentAccount and getCampaigns

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch {
      setError('Failed to connect wallet');
    }
  }, []);

  const createCampaign = useCallback(async ({ title, description, amount, deadline }) => {
    if (!currentAccount) {
      setError('Wallet not connected');
      return;
    }
    try {
      const web3Modal  = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider   = new BrowserProvider(connection);
      const signer     = await provider.getSigner();
      const contract   = fetchContract(signer);

      const tx = await contract.createCampaign(
        title,
        description,
        parseUnits(amount.toString(), 18),
        Math.floor(new Date(deadline).getTime() / 1000)
      );
      await tx.wait();
    } catch (err) {
      console.error('Create campaign error:', err);
      setError('Failed to create campaign');
    }
  }, [currentAccount]);

  const donate = useCallback(async (pId, amount) => {
    if (!currentAccount) {
      setError('Wallet not connected');
      return;
    }
    try {
      const web3Modal  = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider   = new BrowserProvider(connection);
      const signer     = await provider.getSigner();
      const contract   = fetchContract(signer);

      const tx = await contract.donateToCampaign(pId, {
        value: parseEther(amount.toString())
      });
      await tx.wait();
      return tx;
    } catch (err) {
      console.error('Donate error:', err);
      setError('Failed to donate');
    }
  }, [currentAccount]);

  const getDonations = useCallback(async (pId) => {
    try {
      const provider = new JsonRpcProvider(LOCAL_RPC);
      const contract = fetchContract(provider);
      const [donators, donations] = await contract.getDonors(pId);

      return donators.map((d, i) => ({
        donator: d,
        donation: formatEther(donations[i])
      }));
    } catch (err) {
      console.error('Get donations error:', err);
      setError('Failed to fetch donations');
      return [];
    }
  }, []);

  // Check for already connected wallet
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length) setCurrentAccount(accounts[0]);
        })
        .catch(() => setError('Failed to check wallet'));
    } else {
      setError('Please install MetaMask');
    }
  }, []);

  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        error,
        connectWallet,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        debugContract
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};