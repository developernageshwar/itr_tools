import Image from 'next/image';

const About = () => {
  return (
    <section className="bg-white py-[40px] px-10 font-outfit">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-[40px] flex  h-auto py-10 gap-10">
        {/* Left: Illustration */}
        <div className="flex-1 w-[680px] relative h-[400px]">
          <Image
            src="/aboutimg.jpg"
            alt="About Candid Tax"
            fill
            className="object-contain"
          />
        </div>

        {/* Right: Content */}
        <div className="flex-1 gap-[40px] flex flex-col">  
          <div className='flex flex-col gap-4'>
          <p className="text-[16px] font-medium tracking-wider font-poppins   text-base leading-[26.4px] tracking-normal uppercase [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent ">  
            India's best tax experts at your service for a tailored, accurate and premium tax filing experience. 
          </p>
          
          <h2 className="font-poppins font-bold text-[52px] leading-[62.4px] tracking-normal [leading-trim:none]">
            About us
          </h2>  
          </div> 

          <ul>
            <li className="font-poppins font-normal text-base leading-6 tracking-normal [leading-trim:none] flex gap-3">
              <span className=" text-xl">•</span>
              <p className="text-[16px] text-gray-700 leading-relaxed">
                At Candid Tax, we believe in giving client more <span>Understanding, More Expertise, More Confidence, & More Confidentiality.</span>
              </p>
            </li>
            <li className="font-poppins font-normal text-base leading-6 tracking-normal [leading-trim:none] flex gap-3">
              <span className="text-xl">•</span>
              <p className="text-[16px] text-gray-700 leading-relaxed">
                Filing of Tax Return of Salaried/Individual and providing them Tax saving solutions to reduce their tax burden is our utmost priority.
              </p>
            </li>
            <li className="font-poppins font-normal text-base leading-6 tracking-normal [leading-trim:none] flex gap-3">
              <span className=" text-xl">•</span>
              <p className="text-[16px] text-gray-700 leading-relaxed">
                We are a team of professionals like Chartered Accountants, Company Secretaries, Lawyers and others who work hard every day and night to make client happy by maintaining a balance between cost & compliance of regulatory requirements.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
