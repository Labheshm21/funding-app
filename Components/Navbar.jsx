import React, { useState, useContext } from "react";
// internal import 
import { CrowdFundingContext } from "../Context/CrowdFundingContext";
import { Logo, Menu } from "./index";

export default function Navbar() {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuLList = ["White Paper", "Project", "Donation", "Members"];

  return (
    <div className="bg-black text-white">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              aria-label="Labhesh"
              title="Labhesh"
              className="inline-flex items-center mr-8"
            >
              <Logo color="text-white" />
              <span className="ml-2 text-xl font-bold tracking-wide text-red-500 uppercase">
                Venturly 0.1
              </span>
            </a>
            <ul className="flex items-center space-x-8 lg:flex">
              {menuLList.map((el, i) => (
                <li key={i}>
                  <a
                    href="/"
                    aria-label={el}
                    title={el}
                    className="font-medium tracking-wide text-red-500 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    {el}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {!currentAccount && (
            <ul className="flex items-center space-x-8 lg:flex">
              <li>
                <button
                  onClick={connectWallet}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          )}

          <div className="lg:hidden z-40">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>

            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <Logo color="text-black" />
                        <span className="ml-2 text-xl font-bold tracking-wide text-red-500 uppercase">
                          Company
                        </span>
                      </a>
                    </div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <nav>
                    <ul className="space-y-4">
                      {menuLList.map((el, i) => (
                        <li key={i+1}>
                          <a
                            href="/"
                            aria-label="Our Product"
                            title="Our Product"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            {el}
                          </a>
                        </li>
                      ))}

                      {!currentAccount && (
                        <li>
                          <button
                            onClick={connectWallet}
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                          >
                            Connect Wallet
                          </button>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
