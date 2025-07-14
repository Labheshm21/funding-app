import React from 'react';

export default function Footer (){
  const productList=["Market","ERC20 Token","Donation"];
  const contactList=
  ["support@venturlyinvestments.com",
  "info@venturlyinvestments.com",
  "Contact Us"];
  const usefulLink=["Home","About Us","Company Bio"];
    return (
      <footer className='text-center text-white bg-black p-4'>
        <div className='mx-6 py-10 text-center md:text-left'>
          <div className='grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            <div className=''>

              <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start'>
                Venturly 0.1
              </h6>
              <p>
                The ultimate investment crowdfunding platform for investors and startups
              </p>
              </div>
            <div className=''>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Products
              </h6>
              {productList.map((el, i) => {
  return (
    <p className="mb-4" key={i+1}>
      <a href="#!">{el}</a>
    </p>
  );
})}

              </div>
              <div className=''>
                <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
                  Useful Links
                </h6>
                {usefulLink.map((el,i)=>(
                  <p className='mb-4' key={i+1}>
                    <a href="#!">{el}</a>
                  </p>
                ))}
              </div>
              
            </div>
            <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
              Contact Us
            </h6>
            {contactList.map((el,i)=>{
              <p className='mb-4' key={i+1}>
                <a href='#!'>{el}</a>'
              </p>
            })}
          </div>
       <div className='bg-gray-800 text-white p-4 mt-6'>
        <span>
          @ 2025 Copyright: Venturly Investments. All rights reserved.
        </span>
        <a className='font-semibold' href='https://tailwind-elements.com/'>
        Venturly 0.1
        </a>
        </div>
        </footer>
    )
}