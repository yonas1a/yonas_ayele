import React, { useEffect, useState } from "react";
import "../components/style.css";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import projects from "../components/projects";
import projects_part from "../components/projects_part";
import { MdOutlineClose } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";


const portfolios = [
    {
      category: "Branding",
      image: "/branding.jpg", // Replace with actual image path
    },
    {
      category: "UI/UX Design",
      image: "/uiux.jpg", // Replace with actual image path
    },
    {
      category: "Social Media",
      image: "/social.jpg", // Replace with actual image path
    },
  ];



const Home = ({ items }) => {
  const [cloudPosition, setCloudPosition] = useState({ x: 0, y: 0 });
  var mouseY;
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      if(event.clientY + window.scrollY < 4600){
        mouseY = event.clientY;
        setCloudPosition({
            x: event.clientX + window.pageXOffset, // Include horizontal scroll offset
            y: event.clientY + window.pageYOffset, // Include vertical scroll offset
          });
      }
      else{
      setCloudPosition({
                x: event.clientX + window.pageXOffset, // Include horizontal scroll offset
            });
      }
    };
    const handleScroll = () => {
      console.log(window.scrollY);
      if(window.scrollY < 4100){
        setCloudPosition({
            y: mouseY + window.scrollY, // Include vertical scroll offset
        });
        }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const [portfolio, setPortfolio] = useState(false);

  const togglePortfolio = () => {
    setPortfolio((prev) => !prev); // Toggle state correctly
    //console.log(!portfolio); // Logs the correct toggled value
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = (position) => {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
    setMenuOpen(false); // Close the menu after clicking
  };

  
  //portfolio side
  const [selected, setSelected] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [projectname, setprojectname] = useState("none");


  useEffect(() => {
    if (projectname != "none") {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset scrolling when unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [projectname != "none"]);










  const [isTriggered, setIsTriggered] = useState(false);
  const [skills, setSkills] = useState({
    skill1: "0%",
    skill2: "0%",
    skill3: "0%",
    skill4: "0%",
    skill5: "0%",
    skill6: "0%",
    skill7: "0%",
    skill8: "0%",
    skill9: "0%",
  });

  useEffect(() => {
    const updateSkills = (triggered) => {
      setSkills({
        skill1: triggered ? "90%" : "0%",
        skill2: triggered ? "88%" : "0%",
        skill3: triggered ? "85%" : "0%",
        skill4: triggered ? "89%" : "0%",
        skill5: triggered ? "76%" : "0%",
        skill6: triggered ? "80%" : "0%",
        skill7: triggered ? "85%" : "0%",
        skill8: triggered ? "82%" : "0%",
        skill9: triggered ? "78%" : "0%",
      });
    };

    const checkScroll = () => {
      if (window.scrollY >= 1300) {
        setIsTriggered(true);
        updateSkills(true);
      }
    };

    // Run check on mount (for initial page load)
    checkScroll();

    // Listen for scrolling
    window.addEventListener("scroll", checkScroll);
    
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isTriggered]);





  return (
    <div className="background">
      <div
        className="cloud"
        style={{
          top: `${cloudPosition.y - 200}px`, // Offset to center the cloud
          left: `${cloudPosition.x - 200}px`,
        }}
      ></div>

      <div className="continer">
        <div className="contanier_div">
          <div className="first_div">
            <div className="logo">
              <img className="image_of_logo" id="logo" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/337cf1221557341.67d6dcc95bddd.png" alt="Logo" />
            </div>
            <div className="menu">
              <h2 id="link" onClick={() => handleScroll(0)}>About Me</h2>
              <h2 id="link" onClick={() => handleScroll(600)}>Journey</h2>
              <h2 id="link" onClick={() => handleScroll(1700)}>Skill</h2>
              <h2 id="link" onClick={() => handleScroll(2400)}>Portfolio</h2>
              <h2 id="link" onClick={() => handleScroll(4100)}>Contact</h2>
            </div>
            
            <div className="mobile_menu">
                <button className="menu-toggle" onClick={toggleMenu}>
                    ☰
                </button>
                <div className={`side-menu ${menuOpen ? "open" : ""}`}>
                    <ul>
                    <li>
                        <button onClick={() => handleScroll(0)}>Home</button>
                    </li>
                    <li>
                        <button onClick={() => handleScroll(680)}>Journey</button>
                    </li>
                    <li>
                        <button onClick={() => handleScroll(2500)}>Skills</button>
                    </li>
                    <li>
                        <button onClick={() => handleScroll(3700)}>Portfolio</button>
                    </li>
                    <li>
                        <button onClick={() => handleScroll(4700)}>Contact</button>
                    </li>
                    </ul>
                </div>
                <div className={`overlay ${menuOpen ? "show" : ""}`} onClick={toggleMenu}></div>
            </div>
          </div>
          <div class="second_div">
                <div id="main_view">   
                    <div id="mv">
                        <div id="cpu">
                            <img className="image_of_cpu" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/6310ee221557341.67d6dcc95c8ad.png" id="cpu_img"/>
                            <img className="image_of_shdow" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/790699221557341.67d6dcc95c364.png" id="cpu_shdow"/>
                        </div>
                    </div>
                    <div id="mv">
                        <h1 id="my_name">Yonas Ayele</h1>
                        <h3 id="skill_text">Developer/Designer</h3>
                        <p id="par">I'm a dedicated web developer and graphic designer with a talent for blending creativity with technical expertise. My mission is to transform ideas into visually stunning and highly functional digital experiences.</p>
                    </div>
                </div>
            </div>
            <div class="third_div">
                <div id="journey">
                    <h1 id="journey_heading">My Journey</h1>
                    <div id="journey_1">
                        <h1 id="j_e">Education</h1>
                        <div id="edu_raw">
                            <img src="/src/assets/date_icon.svg" id="date_icon"/>
                            <div id="edu_text">
                                <h2 id="date">2019 -- 2023</h2>
                                <h2 id="edu_head">BSc in Information Technology</h2>
                                <p id="edu_dec">
                                I completed a four-year Information Technology program at a government university, where I developed basic programming skills and acquired essential IT knowledge.                               
                                    </p>
                            </div>
                        </div>
                        <div id="edu_raw">
                            <img src="/src/assets/date_icon.svg" id="date_icon"/>
                            <div id="edu_text">
                                <h2 id="date">2024</h2>
                                <h2 id="edu_head">Digital Marketing Certificate</h2>
                                <p  id="edu_dec">
                                    I successfully completed a six-month Digital Marketing course and earned a Digital Marketing certificate. During the course, I gained foundational skills in SEO, Google Ads, and social media marketing.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="journey_1">
                        <h1 id="j_e">Experiance</h1>
                        <div id="edu_raw">
                            <img src="/src/assets/date_icon.svg" id="date_icon"/>
                            <div id="edu_text">
                                <h2 id="date">2019 -- 2023</h2>
                                <h2 id="edu_head">Wizdan Online Shopping</h2>
                                <p  id="edu_dec">While pursuing my university degree, I worked remotely for Wizdan Online Shopping, where I undertook various graphic design and video editing tasks.</p>
                            </div>
                        </div>
                        <div id="edu_raw">
                            <img src="/src/assets/date_icon.svg" id="date_icon"/>
                            <div id="edu_text">
                                <h2 id="date">09/2023 -- 03/2024</h2>
                                <h2 id="edu_head">Meri Technology </h2>
                                <p id="edu_dec">
                                    Two weeks after my graduation, I secured a full-time position at Meri Technology in Addis Ababa. During my six-month tenure there, I gained valuable experience and contributed to the company's operations.</p>
                            </div>
                        </div>
                        <div id="edu_raw">
                            <img src="/src/assets/date_icon.svg" id="date_icon"/>
                            <div id="edu_text">
                                <h2 id="date">2024</h2>
                                <h2 id="edu_head">Droga Pharma</h2>
                                <p id="edu_dec">
                                    Six months after my graduation, I transitioned to a full-time role as a graphic designer at Droga Pharma</p>
                            </div>
                        </div>
                        <div id="edu_raw">
                            <img src="/src/assets/date_icon.svg" id="date_icon"/>
                            <div id="edu_text">
                                <h2 id="date">2024</h2>
                                <h2 id="edu_head">Droga Consulting</h2>
                                <p id="edu_dec">
                                    Six months after my graduation, I transitioned to a full-time role as a graphic designer at Droga Pharma</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fourth_div">
                <div id="skill">
                    <h1 id="journey_heading">My Skill</h1>
                    <div id="journey_1">
                        <h1 id="j_e">Professional skills</h1>
                        <div id="edu_text">
                            <div id="skill_n">
                                <h2 id="skill_name">Product Design</h2>
                                <h2 class="sk_1" id="skill_percentage">90%</h2>
                                <div id="percentage_border">
                                    <div id="percentage_bar" style={{width: skills['skill1']}}></div>
                                </div>
                                <div id="skill_n">
                                    <h2 id="skill_name">Graphic Design</h2>        
                                    <h2 class="sk_2" id="skill_percentage">88%</h2>
                                    <div id="percentage_border">
                                        <div id="percentage_bar" style={{width: skills['skill2']}}></div>
                                    </div>
                                </div>                      
                                <div id="skill_n">
                                    <h2 id="skill_name">UI/UX Design</h2>
                                    <h2 class="sk_3"id="skill_percentage">85%</h2>
                                    <div id="percentage_border">
                                        <div id="percentage_bar"   style={{width: skills['skill3']}}></div>
                                    </div>
                                </div>
                                <div id="skill_n">
                                    <h2 id="skill_name">Frontend Development </h2>
                                    <h2 class="sk_4" id="skill_percentage">89%</h2>
                                    <div id="percentage_border">
                                        <div id="percentage_bar"  style={{width: skills['skill4']}}></div>
                                    </div>
                                </div>
                                <div id="skill_n">
                                    <h2 id="skill_name">Backend Development</h2>
                                    <h2 class="sk_5" id="skill_percentage">76%</h2>
                                    <div id="percentage_border">
                                        <div id="percentage_bar" style={{width: skills['skill5']}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="journey_1">
                        <h1 id="j_e">Other Skills</h1>
                        <div id="edu_text">
                            <div id="skill_n">
                                <h2 id="skill_name">AI Specialist</h2>
                                <h2 class="sk_6" id="skill_percentage">80%</h2>
                                <div id="percentage_border">
                                    <div id="percentage_bar" style={{width: skills['skill6']}}></div>
                                </div>
                            </div>
                            <div id="skill_n">
                                <h2 id="skill_name">3D Modeling</h2>
                                <h2 class="sk_7" id="skill_percentage">85%</h2>
                                <div id="percentage_border">
                                    <div id="percentage_bar"  style={{width: skills['skill7']}}></div>
                                </div>
                            </div>
                            <div id="skill_n">
                                <h2 id="skill_name">Digital Marketing</h2>
                                <h2 class="sk_8" id="skill_percentage">82%</h2>
                                <div id="percentage_border">
                                    <div id="percentage_bar"  style={{width: skills['skill8']}}></div>
                                </div>
                            </div>
                            <div id="skill_n">
                                <h2 id="skill_name">Social media managment</h2>
                                <h2 class="sk_9" id="skill_percentage">78%</h2>
                                <div id="percentage_border">
                                    <div id="percentage_bar"    style={{width: skills['skill9']}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fiveth_div">
                <div className="popup-portfolio">                    
                    {true && (
                        <div 
                        className="popup_div"
                        onClick={() => setprojectname("none")}
                        style={{
                            opacity: projectname!= "none" ? 1 : 0, // Controls visibility smoothly
                            visibility: projectname!= "none" ? "visible" : "hidden", // Prevents interaction when hidden
                            transition: "opacity 1s ease-in-out, visibility 1s ease-in-out",
                        }}
                        >
                        <div className="project_bridge" 
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        >
                            <button 
                            className="cloth_popup"
                            onClick={() => setprojectname("none")}
                            >
                            <MdOutlineClose />
                            </button>
                            <div className="project_view">
                                {projects_part.map((project_part, index) => (
                                    project_part.type === "brand" && (
                                            project_part.project === "part" && (
                                                project_part.title === projectname && (
                                                    <div className="sub_project_div">
                                                    <img className="sub_project" src={project_part.link}></img>
                                                    </div>
                                                )
                                            )
                                        )
                                    )
                                )}
                            </div>
                        </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center space-y-6">
                    <h1 className="text-4xl font-bold">PORTFOLIO</h1>
                    <div className="flex space-x-6">
                        {portfolios.map((item, index) => (
                            <button
                            key={index}
                            onClick={() => setSelected(index)}
                            className={selected === index ? "underline font-bold" : "text-gray-500"}
                          >
                            {item.category}
                          </button>
                        ))}
                    </div>
                    <div className="port_con">
                    <motion.div
                        className="relative w-[80%] overflow-hidden"
                        initial={{ x: "0%" }}
                        animate={{ x: `-${selected * 33.3}%` }}
                        transition={{ duration: 1 }}
                    >
                        
                            <div className="port_div1 port_div">
                                {projects.map((project, index) => (
                                    project.type === "brand" && (
                                        <div className="hold_img"  onClick={() => setprojectname(project.title)}>
                                        <div className="hover_text">
                                        <h1 className="hover_h1">{project.title}</h1>
                                        <p className="hover_p"></p>
                                        </div>
                                        <img className="port_img" src={project.link}></img>
                                        </div>
                                    )
                                ))}
                            </div>
                            <div className="port_div2 port_div">
                                {projects.map((project, index) => (
                                    project.type === "ui/ux_and_Web" && (
                                        <div className="hold_img"  onClick={() => setprojectname(project.title)}>
                                        <div className="hover_text">
                                        <h1 className="hover_h1">{project.title}</h1>
                                        <a className="hover_p" href={project.web_link}>Visit</a>
                                        </div>
                                        <img className="port_img" src={project.link}></img>
                                        </div>
                                    )
                                ))}
                            </div>
                            <div className="port_div3 port_div">
                                {projects.map((project, index) => (
                                    project.type === "social_media" && (
                                        <div className="hold_img"  onClick={() => setprojectname(project.title)}>
                                        <div className="hover_text">
                                        <h1 className="hover_h1">{project.title}</h1>
                                        <p className="hover_p"></p>
                                        </div>
                                        <img className="port_img" src={project.link}></img>
                                        </div>
                                    )
                                ))}
                            </div>
                    </motion.div>
                    </div>
                </div>
            </div>
            <div className="six_div">
                <p className="project-mind">HAVE A PROJECT IN MIND?</p>
                <h1 className="main-title">
                    Let's <span>work</span>
                    <br />
                    <span className="together">together</span>
                </h1>
                <div className="contact_info_div">
                    <div className="contact-2"><LuPhone />+251963155856</div>
                    <div className="contact-1"><MdOutlineEmail />yonasayele11@gmail.com</div>
                </div>
            </div>
            <footer className="footer">
                {/* Brand */}
                <div className="footer-brand">JOHNA.</div>

                

                {/* Pages */}
                <div className="footer-sections">
                    <div>
                        {/* Social Media */}
                        <h4 className="footer-header">Profile</h4>
                        <ul className="footer-list">
                            <li><a href="https://www.linkedin.com/in/yonas-ayele-030b03286" className="footer-link">LinkedIn</a></li>
                            <li><a href="https://www.behance.net/yonas_ayele" className="footer-link">Behance</a></li>
                            <li><a href="https://github.com/yonas1a" className="footer-link">Github</a></li>
                            <li><a href="https://t.me/John_Ay1" className="footer-link">Telegram</a></li>
                        </ul>
                    </div>
                    <div className="footer_pages">
                    <h4 className="footer-header">Pages</h4>
                    <ul className="footer-list">
                        <li><a  className="footer-link"     onClick={() => handleScroll(0)}>About Me</a></li>
                        <li><a  className="footer-link" onClick={() => handleScroll(600)}>Journey</a></li>
                        <li><a  className="footer-link"    onClick={() => handleScroll(1700)}>Skill</a></li>
                        <li><a  className="footer-link"  onClick={() => handleScroll(2400)}>Portfolio</a></li>
                        <li><a  className="footer-link"  onClick={() => handleScroll(4100)}>Contact</a></li>
                    </ul>
                    </div>

                    {/* Contact */}
                    <div>
                    <h4 className="footer-header">Contact</h4>
                    <ul className="footer-list">
                        <li><a href="mailto:yonasayele11@gamil.com" className="footer-link">Email</a></li>
                        <li><a href="tel:+251963155856" className="footer-link">Call</a></li>
                    </ul>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="footer-note">
                    Yonas Ayele Portfolio 2024 
                </div>
                </footer>

        </div>
      </div>
    </div>
  );
}


export default Home;
