import React from "react";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import Section1 from "./Section1/Section1";
import Section2 from "./Section2/Section2";
import Section3 from "./Section3/Section3";
import Section4 from "./Section4/Section4";
import Section5 from "./Section5/Section5";
import HomeNavbarMobile from "../../layouts/navbar-mobile/HomeNavbar/HomeNavbar";
import MainMobileFooter from "../../layouts/Footers/mobileFooter/MainFooter";

function HomeMobile() {
  return (
    <div>
      <HomeNavbarMobile />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <MainMobileFooter />
    </div>
  );
}

export default HomeMobile;
  /*
     
      <Section4 />
      <Section5 />*/