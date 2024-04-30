'use client';
import {FaGithub, FaLinkedinIn} from "react-icons/fa";
import {useEffect, useState} from "react";
import Image from "next/image";
import CursorHalo from "@/app/ui/cursorHalo";

export default function Home() {
   const [activeId, setActiveId] = useState('')
   
   
   useEffect(() => {
      
      
      const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               setActiveId(entry.target.id)
            }
         })
      }, {
         rootMargin: `-${window.innerHeight * 0.2 - 2}px 0px -${window.innerHeight * 0.8 - 2}px 0px`,
         
      })
      document.querySelectorAll('section').forEach(section => {
         observer.observe(section)
      })
   }, []);
   
   return (
      <main className="dark">
         <CursorHalo/>
         <div
            className="z-10 justify-center bg-darkbg px-6 py-12 text-main-text flex flex-col items-center lg:flex-row lg:items-start lg:px-24 lg:py-0 lg:gap-10">
            
            <header
               className="max-w-2xl w-full relative lg:sticky lg:top-0 lg:h-screen lg:py-24 lg:flex lg:flex-col lg:justify-between	">
               
               <div>
                  <div className={'flex gap-8 mb-6'}>
                     <div>
                        <h1 className='text-4xl font-bold pb-4 text-white'>Ageron Joachim</h1>
                        <h2 className='text-2xl font-bold text-white'>Full stack developer</h2>
                     </div>
                     <div className={'rounded-full w-28 h-28 relative hidden lg:block -mt-4'}>
                        <Image src={'/pp.png'} alt={'profile picture'} fill={true} className={'rounded-full object-cover '}/>
                     </div>
                  </div>
                  <p>
                     Crafting seamless, robust, and cutting-edge solutions
                  </p>
                  <p className={'pb-10'}>
                     for the modern web, one line of code at a time.
                  </p>
                  <div className={'flex flex-col lg:flex-row flex-wrap gap-3 pb-10 txt-sm '}>
                     <p className={'l font-bold text-white text-nowrap '}>Contact :</p>
                     <a href={'https://maps.app.goo.gl/3aAsoYNV3ppCiu6w7'}>
                        <p className={'underline'}>Grenoble</p>
                     </a>
                     <a href={'mailto:ageron.joachim@gmail.com'}>
                        <p className={'underline'}>ageron.joachim@gmail.com</p>
                     </a>
                     <a href={'tel:+33781413042'}>
                        <p className={'underline'}>+33 7 81 41 30 42</p>
                     </a>
                  </div>
                  <div className={'mb-10 lg:mb-20'}>
                     <a href={'/CV JOACHIM AGERON.pdf'} target={'_blank'}>
                        <p className={'text-white underline font-bold'}>
                           Download my resume {'->'}
                        </p>
                     </a>
                  </div>
                  <ul className={'hidden text-sm lg:block'}>

                        <li>
                           <a href={`#TECHNICAL TOOLKIT`}>
                              <div
                                 className={`group flex gap-3 mb-10 w-min ${activeId === 'TECHNICAL TOOLKIT' ? 'active' : ''}`}>
                                 <div
                                    className={'bg-white w-8 h-0.5 rounded-full self-center group-hover:w-16 group-hover:bg-indigo-200 transition-all group-[.active]:w-16 group-[.active]:bg-indigo-200'}/>
                                 <h2
                                    className={'font-bold text-white text-nowrap group-hover:text-main-text group-[.active]:text-main-text transition-all'}>TECHNICAL TOOLKIT</h2>
                              </div>
                           </a>
                        </li>
                        <li>
                           <a href={`#ABOUT`}>
                              <div
                                 className={`group flex gap-3 mb-10 w-min ${activeId === 'ABOUT' ? 'active' : ''}`}>
                                 <div
                                    className={'bg-white w-8 h-0.5 rounded-full self-center group-hover:w-16 group-hover:bg-indigo-200 transition-all group-[.active]:w-16 group-[.active]:bg-indigo-200'}/>
                                 <h2
                                    className={'font-bold text-white text-nowrap group-hover:text-main-text group-[.active]:text-main-text transition-all'}>ABOUT</h2>
                              </div>
                           </a>
                        </li>
                        <li>
                           <a href={`#EDUCATION`}>
                              <div
                                 className={`group flex gap-3 mb-10 w-min ${activeId === 'EDUCATION' ? 'active' : ''}`}>
                                 <div
                                    className={'bg-white w-8 h-0.5 rounded-full self-center group-hover:w-16 group-hover:bg-indigo-200 transition-all group-[.active]:w-16 group-[.active]:bg-indigo-200'}/>
                                 <h2
                                    className={'font-bold text-white text-nowrap group-hover:text-main-text group-[.active]:text-main-text transition-all'}>EDUCATION</h2>
                              </div>
                           </a>
                        </li>
                        <li>
                           <a href={`#EXPERIENCE`}>
                              <div
                                 className={`group flex gap-3 mb-10 w-min ${activeId === 'EXPERIENCE' ? 'active' : ''}`}>
                                 <div
                                    className={'bg-white w-8 h-0.5 rounded-full self-center group-hover:w-16 group-hover:bg-indigo-200 transition-all group-[.active]:w-16 group-[.active]:bg-indigo-200'}/>
                                 <h2
                                    className={'font-bold text-white text-nowrap group-hover:text-main-text group-[.active]:text-main-text transition-all'}>EXPERIENCE</h2>
                              </div>
                           </a>
                        </li>

                  
                  </ul>
               </div>
               <div className={'flex flex-row gap-10 underline'}>
                  <a href={'https://github.com/joachimageron'}>
                     <FaGithub size={'2rem'}/>
                  </a>
                  <a href={'https://www.linkedin.com/in/joachim-ageron-dit-blanc/'}>
                     <FaLinkedinIn size={'2rem'}/>
                  </a>
               </div>
            </header>
            <div className={'max-w-2xl lg:w-full'}>
               <section id={'TECHNICAL TOOLKIT'} className={'pt-32 lg:pt-24'}>
                  <div className={'flex gap-5 mb-10'}>
                     <h2 className={'text-xl font-bold text-white text-nowrap'}>TECHNICAL TOOLKIT</h2>
                     <div className={'bg-white w-full h-0.5 rounded-full self-center'}/>
                  </div>
                  <div className={'flex gap-10 lg:gap-14 flex-wrap justify-start'}>
                     
                     <article className={'flex gap-3'}>
                        <p className={'text-white'}>JS</p>
                        <p className={'text-white'}>I</p>
                        <p>Professional Practitioner</p>
                     </article>
                     
                     <article className={'flex gap-3'}>
                        <p className={'text-white'}>React</p>
                        <p className={'text-white'}>I</p>
                        <p>Hobbyist Hacker</p>
                     </article>
                     
                     <article className={'flex gap-3'}>
                        <p className={'text-white'}>React Native</p>
                        <p className={'text-white'}>I</p>
                        <p>Hobbyist Hacker</p>
                     </article>
                     
                     <article className={'flex gap-3'}>
                        <p className={'text-white'}>Next.js</p>
                        <p className={'text-white'}>I</p>
                        <p>Hobbyist Hacker</p>
                     </article>
                     
                     <article className={'flex gap-3'}>
                        <p className={'text-white'}>PHP</p>
                        <p className={'text-white'}>I</p>
                        <p>Hobbyist Hacker</p>
                     </article>
                     
                     <article className={'flex gap-3'}>
                        <p className={'text-white'}>Laravel</p>
                        <p className={'text-white'}>I</p>
                        <p>Dipping Toes</p>
                     </article>
                     
                     <article className={'flex gap-3'}>
                        <p className={'text-white'}>SQL</p>
                        <p className={'text-white'}>I</p>
                        <p>Professional Practitioner</p>
                     </article>
                     
                     <article className={'flex gap-3'}>
                        <p className={'text-white'}>C#</p>
                        <p className={'text-white'}>I</p>
                        <p>Hobbyist Hacker</p>
                     </article>
                  
                  
                  </div>
               </section>
               <section id={'ABOUT'} className={'pt-32'}>
                  <div className={'flex gap-5 mb-10'}>
                     <h2 className={'text-xl font-bold text-white text-nowrap'}>ABOUT</h2>
                     <div className={'bg-white w-full h-0.5 rounded-full self-center'}/>
                  </div>
                  <p className={'mb-6'}>
                     Hello, I&apos;m <span className={'text-white font-bold'}>Joachim Ageron</span>, a Full Stack
                     developer
                     passionate about the art of turning ideas into
                     tangible digital solutions. My journey in web development began with simple curiosity and has
                     flourished into a career dedicated to exploring new technologies, such as <span
                     className={'text-white font-bold'}>React</span> and <span
                     className={'text-white font-bold'}>PHP</span>.
                     Although my experience in project collaboration is limited, each opportunity has been embraced with
                     seriousness and has contributed to refining my skills and vision for development.
                  </p>
                  <p className={'mb-6'}>
                     Beyond the digital world, I find my inspiration in the tranquility of nature, the depth of music,
                     and the enriching company of my friends. These passions, far from diverting me from my profession,
                     enrich my <span className={'text-white font-bold'}>creativity</span> and <span
                     className={'text-white font-bold'}>positively </span>.
                  </p>
                  <p className={''}>
                     I am constantly on the lookout for new challenges and open to discussions on
                     technological innovations. If you are<span className={'text-white font-bold'}> in search of a motivated developer</span> to
                     bring a new dimension
                     to your projects or for an exchange of ideas on the future of the web, I would be delighted to meet
                     you. Together, let&apos;s explore the possibilities that web development offers to turn your
                     visions into
                     reality.
                  </p>
               
               </section>
               <section id={'EDUCATION'} className={'pt-32'}>
                  <div className={'flex gap-5 mb-16 '}>
                     <h2 className={'text-xl font-bold text-white text-nowrap'}>EDUCATION</h2>
                     <div className={'bg-white w-full h-0.5 rounded-full self-center'}/>
                  </div>
                  <div className={'flex flex-col gap-10'}>
                     <article className={'flex gap-5 lg:gap-14'}>
                        <div>
                           <p className={'text-nowrap'}>2024 - 2026</p>
                        </div>
                        <div>
                           <a href={'https://www.esgi.fr/programmes/ingenierie-web.html'}>
                              <h3 className={'text-white font-bold underline pb-2'}>ESGI Ingénierie du Web {"->"}</h3>
                           </a>
                           <p className={'pb-1'}>- Development</p>
                           <p className={'pb-1'}>- Cyber Security</p>
                           <p className={'pb-1'}>- Project Management</p>
                        </div>
                     </article>
                     <article className={'flex gap-5 lg:gap-14'}>
                        <div className={'text-nowrap'}>
                           <p>2021 - 2024</p>
                        </div>
                        <div>
                           <a href={'https://formations.univ-grenoble-alpes.fr/fr/catalogue-2021/but-bachelor-universitaire-de-technologie-CBB/but-metiers-du-multimedia-et-de-l-internet-KI4YX5MN/parcours-developpement-web-et-dispositifs-interactifs-KWDMXUGX.html'}>
                              <h3 className={'text-white font-bold underline pb-2'}>BUT MMI option
                                 development {"->"}</h3>
                           </a>
                           <p className={'pb-1'}>- Web Development</p>
                           <p className={'pb-1'}>- Communication</p>
                           <p className={'pb-1'}>- Audiovisuel</p>
                        </div>
                     </article>
                     <article className={'flex gap-14'}>
                        <div className={'text-nowrap'}>
                           <p>2018 - 2021</p>
                        </div>
                        <div>
                           <a href={'https://lyceereneperrin.fr/lycee-general-et-technologique/'}>
                              <h3 className={'text-white font-bold underline pb-2 '}>
                                 BAC STI2D option SIN {"->"}
                              </h3>
                           </a>
                        </div>
                     </article>
                  
                  </div>
               </section>
               <section id={'EXPERIENCE'} className={'pt-32'}>
                  <div className={'flex gap-5 mb-10'}>
                     <h2 className={'text-xl font-bold text-white text-nowrap'}>EXPERIENCE</h2>
                     <div className={'bg-white w-full h-0.5 rounded-full self-center'}/>
                  </div>
                  <div className={'flex flex-col gap-14 lg:gap-20'}>
                     <article>
                        <div className={'flex flex-col lg:flex-row gap-4'}>
                           <h3 className={'text-white font-bold pb-2 text-nowrap'}>Work-study program at <a
                              className={'underline'} href={'https://www.transfertpro.com/'}>Transfertpro {'->'}</a>
                           </h3>
                           <p className={'text-nowrap mb-4'}>2023 - Present</p>
                        </div>
                        <p className={'pb-5'}>
                           At TransfertPro, I enhanced their secure data transfer platform and developed my Full Stack
                           development skills, particularly in C#.
                        </p>
                        <div className={'flex gap-5'}>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>C#</p></div>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>Vue</p></div>
                        </div>
                     </article>
                     <article>
                        <div className={'flex flex-col lg:flex-row gap-4'}>
                           <h3 className={'text-white font-bold pb-2 text-nowrap'}>Stage at <a
                              className={'underline'} href={'https://www.wallix.com/fr/'}>Wallix {'->'}</a>
                           </h3>
                           <p className={'text-nowrap mb-4'}>2023 - 2 Month</p>
                        </div>
                        <p className={'pb-5'}>
                           During my internship at Wallix, I developed my front-end development skills by working with
                           React and creating SCSS themes, enriching the backend interface of their
                           security solutions.
                        </p>
                        <div className={'flex gap-5'}>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>React</p></div>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>SCSS</p></div>
                        </div>
                     </article>
                     <article>
                        <div className={'flex flex-col lg:flex-row gap-4'}>
                           <h3 className={'text-white font-bold pb-2 text-nowrap'}>Messages application course
                              project</h3>
                           <p className={'text-nowrap mb-4'}>2024 - 3 weeks</p>
                        </div>
                        <p className={'pb-5'}>
                           In a course project, I created an instant messaging application using Next.js, leveraging
                           server-side rendering for real-time communication and an enhanced user experience. </p>
                        <div className={'flex gap-5 flex-wrap'}>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>Next.js</p></div>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>TypeScript</p></div>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>Tailwind</p></div>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>Postgres</p></div>
                        </div>
                     </article>
                     <article>
                        <div className={'flex flex-col lg:flex-row gap-4'}>
                           <h3 className={'text-white font-bold pb-2 text-nowrap'}>Escape game course project</h3>
                           <p className={'text-nowrap mb-4'}>2024 - 2 month</p>
                        </div>
                        <p className={'pb-5'}>
                           For a course project, we developed an escape game application using React Native, It will be
                           played in june.
                        </p>
                        <div className={'flex gap-5 flex-wrap'}>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>TypeScript</p></div>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>React Native</p></div>
                        </div>
                     </article>
                     <article>
                        <div className={'flex flex-col lg:flex-row gap-4'}>
                           <h3 className={'text-white font-bold pb-2 text-nowrap'}>Social media course project</h3>
                           <p className={'text-nowrap mb-4'}>2022 - 1 month</p>
                        </div>
                        <p className={'pb-5'}>
                           For a course project, we built a social media platform using native PHP.</p>
                        <div className={'flex gap-5 flex-wrap'}>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>PHP</p></div>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>HTML</p></div>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>CSS</p></div>
                           <div className={'rounded-full px-5 py-2 bg-blue-950 w-fit'}><p>SQL</p></div>
                        </div>
                     </article>
                  
                  </div>
               </section>
               <footer className={'mt-14 lg:my-32'}>
                  <p className={'text-sm'}>
                     Designed in <span className={'text-white font-bold'}>Figma</span>,
                     built with <span className={'text-white font-bold'}>Next.js</span> and <span
                     className={'text-white font-bold'}>Tailwind CSS</span>,
                     deployed with <span className={'text-white font-bold'}>Vercel</span>.
                  </p>
               
               </footer>
            </div>
         </div>
      </main>
   );
}
