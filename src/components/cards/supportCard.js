  import { MdOutlineInsertComment } from 'react-icons/md';
  import { MdKeyboardArrowRight } from 'react-icons/md';  
  import Link from 'next/link'; 
 const SupportCard = ({title , description , buttonText , buttonLink}) => {
    return (
         <div 
            className="w-[320px] rounded-2xl border border-transparent bg-clip-padding [background:linear-gradient(white,white)_padding-box,linear-gradient(90deg,#1498EB_0%,#962DE3_100%)_border-box] p-4 flex"
          >
            <div className="flex items-start gap-4 w-full">
              {/* Icon with subtle gradient background */}
              <div 
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-[linear-gradient(90deg,rgba(20,152,235,0.3)_0%,rgba(150,45,227,0.3)_100%)]"
              > 
                <MdOutlineInsertComment className="text-[24px] text-[#3867D6]" />
              </div> 

              {/* Content Area */}
              <div className="flex flex-col gap-4 flex-1">
                <h3 className="font-poppins font-semibold text-base leading-6 text-black">
                  {title}
                </h3>

                <p className="font-poppins font-normal text-base leading-6 text-[#8E8E93]">
                  {description}
                </p>

                {/* Subtle Divider */}
                <div className="w-full h-[1px] bg-[#E0E0E0]" />

                {/* Footer Link with brand gradient text */}
                <Link
                  href="#"
                  className="flex justify-between items-center group"
                >
                  <span className="font-poppins font-semibold text-base leading-6 bg-gradient-to-r from-[#1498EB] to-[#962DE3] text-transparent bg-clip-text">
                    {buttonText}
                  </span>
                  <MdKeyboardArrowRight size={28} className="text-[#3867D6] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
    );
 };  


 export default SupportCard;