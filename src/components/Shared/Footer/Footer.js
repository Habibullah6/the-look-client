import React from "react";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
const Footer = () => {
  return (
    <div>
      <footer className="footer p-20 bg-secondary  text-white font-bold">
        <div>
          <p>
            H#000 (0th Floor), Road #00, <br/> New DOHS, Mohakhali, Dhaka, Bangladesh
          </p>
        </div>
        <div>
          
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          
          <a className="link link-hover">Quick Links</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          
          <a className="link link-hover">About us</a>
          <p>Lorem ipsum dolor sit amet consectetur <br/> adipisicing elit. Et nisi eaque, <br/> perferendis cumque quod blanditiis.</p>
          <div className="flex text-2xl">

            <AiFillFacebook className="mr-3"/>
            <AiFillInstagram className="mr-3"/>
            <AiFillLinkedin className="mr-3"/>
            <AiFillYoutube className="mr-3"/>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
