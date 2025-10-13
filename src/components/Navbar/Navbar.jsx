import React from 'react'
import { useState,useEffect } from 'react'
//icons import
import {FiMenu,FiX} from "react-icons/fi";
import {FaGithub,FaLinkedin} from 'react-icons/fa'
function Navbar() {
  const [IsOpen, setIsOpen] = useState(false);
  const [activeSection, setactiveSection] = useState("");
  const [IsScrolled, setIsScrolled] = useState(false);

  useEffect(()=>{
    // scroll direct to page
   const handleScroll=()=>{
    setIsScrolled(window.scrollY > 50)
   }
   window.addEventListener("scroll",handleScroll);
   return ()=>window.removeEventListener("scroll",handleScroll);
  },[]);

  // handle menu items
  const handleMenuitemsClick = (sectionId) => {
    setactiveSection(sectionId);
    setIsOpen(false);
  }
  const menuItems = [
    { id: "about", label: "About" },
    { id: "Contact", label: "Contact" },
    { id: "Education", label: "Education" },
    { id: "Experience", label: "Experience" },
    { id: "Skills", label: "Skills" },
    { id: "Work", label: "Work" }
  ]

  return (
    //dekstop
    <div className={`fixed top-0 w-full z-50 transition duration-300 px-[7vwl] md:px-[7vw] lg:px-[20vw] ${
      IsScrolled?"bg-[#050414] bg-opacity-50 backdrop-blur-md shadow-md" :"bg-transparent"
    }`}>
      {/* title */}
      <div className="text-white py-5 flex justify-between items-center">
        <div className='text-lg font-semibold cursor-pointer'>
          <span className='text-[#8245ec]'>&lt;</span>
          <span className='text-white'>Rohit</span>
          <span className='text-[#8245ec]'>/</span>
          <span className='text-white'>Bamne</span>
          <span className='text-[#8245ec]'>&gt;</span>
        </div>
        {/* routes */}
        <ul className='hidden md:flex space-x-8 text-gray-300'>
          {menuItems.map((item) => {
            return <li key={item.id} className={`cursor-pointer hover:text-[#8245ec] 
              ${activeSection === item.id ? "text-[#8245ec]" : ""};`}><button onClick={()=>handleMenuitemsClick(item.id)}>{item.label}</button>
              </li>
          })}
        </ul>
       {/* social media icons */}
       <div className=" hidden md:flex space-x-4">
        <a 
        href="https://github.com/learnerbi2"
        target="_blank"
        rel="noopener noreferrer"
        className='text-gray-300 hover:text-[#8245ec]'>
          {/* github icon */}
          <FaGithub size={24}/>
        </a>
         <a 
        href="https://www.linkedin.com/in/rohit-bamne-b5ba82283/"
        target="_blank"
        rel="noopener noreferrer"
        className='text-gray-300 hover:text-[#8245ec]'>
          {/* linkedin icon */}
          <FaLinkedin size={24}/>
        </a>
       </div>

       {/*for mobile menu */}
       <div className='md:hidden'>
        {IsOpen?<FiX className='text-3xl text-[#8245ec] cursor-pointer'
         onClick={()=>setIsOpen(true)} />:<FiMenu className='text-3xl text-[#8245ec] cursor-pointer'
         onClick={()=>setIsOpen(true)}/>
         }
       </div>
      </div>
        {/* mobile menu items */}
       {IsOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-[#050414] bg-opacity-50 backdrop-filter backdrop-blur-lg z-50 rounded-lg shadow-lg md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-300">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer hover:text-white ${
                  activeSection === item.id ? "text-[#8245ec]" : ""
                }`}
              >
                <button onClick={() => handleMenuitemsClick(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
            <div className="flex space-x-4">
              <a
                href="https://github.com/codingmastr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
          <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/tarun-kaushik-553b441a4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </ul>
        </div>
      )}
       
    </div>
  )
}

export default Navbar