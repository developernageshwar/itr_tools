// "use client";

// import React from 'react';
// import Modal from './Modal';
// import { MdKeyboardArrowRight } from 'react-icons/md';
// import { HiPlus } from 'react-icons/hi';
// import { useItrStore } from '@/store/itrStore';

// const AddUserModal = ({ isOpen, onClose, onFileForNew }) => {
//   const { profiles, activeProfileId, setActiveProfile, saveCurrentProfileData } = useItrStore();

//   const handleProfileSwitch = (profileId) => {
//     if (profileId === activeProfileId) {
//       onClose();
//       return;
//     }

//     saveCurrentProfileData();

//     setActiveProfile(profileId);
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} className="w-full  opacity-100  ">
//       <div className="flex flex-col bg-white rounded-[16px] border border-[#C7C7CC] ">
//         {/* User Info Section */}
//         <div className="flex flex-col border-b border-black max-h-[400px] overflow-y-auto">
//           {profiles
//             .find(profile => profile.id === activeProfileId) && (
//               <div
//                 onClick={() => handleProfileSwitch(profiles.find(p => p.id === activeProfileId).id)}
//                 className="font-poppins font-semibold text-[16px] leading-[24px] tracking-normal flex flex-col opacity-100 gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50"
//               >
//                 <h2 className="flex items-center justify-between">
//                   {profiles.find(p => p.id === activeProfileId).name}
//                   <span className="text-[12px] text-[#3867D6] bg-[#3867D633] px-2 py-1 rounded-full">Active</span>
//                 </h2>
//                 <p className="font-normal text-[14px] text-gray-600">
//                   PAN: {profiles.find(p => p.id === activeProfileId).pan || 'Not Available'} | AY: {profiles.find(p => p.id === activeProfileId).assessmentYear} | Type: {profiles.find(p => p.id === activeProfileId).filingType}
//                 </p>
//               </div>
//             )}
//         </div>

//         {/* Footer Actions */}
//         <div className=" h-[92px] opacity-100 flex justify-between   gap-10 p-4">
//           <div
//             className="flex items-center gap-10 font-poppins font-semibold text-[18px] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent  hover:opacity-80 transition-opacity cursor-pointer"
//             onClick={onClose}
//           >
//             <span>View more</span>
//             <MdKeyboardArrowRight size={28} color='#962DE3' />
//           </div>

//           <div
//             className="flex items-center gap-10 font-poppins font-semibold text-[18px] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent  hover:opacity-80 transition-opacity cursor-pointer"
//             onClick={onFileForNew}
//           >
//             <span>File for new person</span>
//             <HiPlus size={20} color='#962DE3' />
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default AddUserModal;  




"use client";

import React from 'react';
import Modal from './Modal';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { HiPlus } from 'react-icons/hi';  
import { useItrStore } from '@/store/itrStore';


const AddUserModal = ({ isOpen, onClose , onFileForNew }) => { 
    const { profiles, activeProfileId, setActiveProfile, saveCurrentProfileData } = useItrStore(); 

    const handleProfileSwitch = (profileId) => {
        if (profileId === activeProfileId) {
            onClose();
            return;
        }

        saveCurrentProfileData();

        setActiveProfile(profileId);
        onClose();
    };


  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full  opacity-100  ">
      <div className="flex flex-col bg-white rounded-[16px] border border-[#C7C7CC] ">
        {/* User Info Section */}
        <div className="font-poppins font-semibold text-[16px] leading-[24px] tracking-normal flex flex-col  opacity-100 gap-3 p-4 border-b border-black  ">   


               {profiles
            .find(profile => profile.id === activeProfileId) && (
              <div
                onClick={() => handleProfileSwitch(profiles.find(p => p.id === activeProfileId).id)}
                className="font-poppins font-semibold text-[16px] leading-[24px] tracking-normal flex flex-col opacity-100 gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50"
              >
                <h2>
                  {profiles.find(p => p.id === activeProfileId).name}
                </h2> 
                <p>
                  PAN: {profiles.find(p => p.id === activeProfileId).pan || 'Not Available'} | AY: {profiles.find(p => p.id === activeProfileId).assessmentYear} | Type: {profiles.find(p => p.id === activeProfileId).filingType}
                </p>
              </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className=" h-[92px] opacity-100 flex justify-between   gap-10 p-4">
          <div 
            className="flex items-center gap-10 font-poppins font-semibold text-[18px] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent  hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            <span>View more</span>
            <MdKeyboardArrowRight size={28} color='#962DE3' />
          </div>

           <div 
            className="flex items-center gap-10 font-poppins font-semibold text-[18px] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent  hover:opacity-80 transition-opacity"
            onClick={onFileForNew}
          >
            <span>File for new person</span>
            <HiPlus size={20} color='#962DE3' />
          </div> 
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal; 
