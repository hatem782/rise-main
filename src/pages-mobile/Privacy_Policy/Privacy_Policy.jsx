import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";

import c from "../../assets/images/enroll/c.svg";
import c2 from "../../assets/images/enroll/c2.svg";
import { useSelector } from "react-redux";
import HomeNavbarMobile from "../../layouts/navbar-mobile/HomeNavbar/HomeNavbar";
import MainMobileFooter from "../../layouts/Footers/mobileFooter/MainFooter";

function Privacy_PolicyMobile() {
  const priv_pol = useRef(null);
  const tersm_cond = useRef(null);
  const moder_slavery = useRef(null);

  const target = useSelector((state) => state.link.privacy_policy_section);

  useEffect(() => {
    if (tersm_cond.current && target === "terms_conditions") {
      window.scrollTo({
        top: tersm_cond.current.offsetTop - 20,
        behavior: "instant",
      });
    }

    if (priv_pol.current && target === "privacy_policy") {
      window.scrollTo({
        top: priv_pol.current.offsetTop - 20,
        behavior: "instant",
      });
    }

    if (moder_slavery.current && target === "modern_salary") {
      window.scrollTo({
        top: moder_slavery.current.offsetTop - 20,
        behavior: "instant",
      });
    }

    if (target === "") {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [target]);

  return (
    <div className={styles["main"]}>
      <HomeNavbarMobile />
      <div className={styles["content"]}>
      

        <div className={styles["info-part"]}>
        <img src={c} alt="" className={styles["c1"]} />
          <div className={styles["info-part-freq"]}>
            
            <h1>Terms and<br /> Conditions,<br /> Privacy policy & <br /> Modern Slavery
            Statement</h1>
          </div>
          <p>
            We are committed to addressing any inquiries you might have about
            the processing of your personal data. The objective of this Privacy
            Policy is to inform you of the actions we've taken to ensure the
            highest degree of privacy and protection for your personal
            information.
          </p>

          <p>
            This Privacy Policy is designed to educate you about the handling
            and administration of any personal data you share with us, why we
            gather it, and how we safeguard it. This policy is created in
            accordance with the General Data Protection Regulation (GDPR)
            principles. If you have any questions after reading this document,
            feel free to email us at team@beenrising.com, and we'll be happy to
            assist.
          </p>

          <p>
            Rise is a limited company with registered offices at 58 Hyde Close,
            Hyde Park, Johannesburg 2193, South Africa, and The Promenade, 3rd
            Floor, Nairobi Garage, Spring Valley, Nairobi, Kenya.
          </p>

          <p>
            Rise provides an integrated ecosystem devoted to the professional
            growth of students and graduates who have registered for the Service
            (referred to as "Members"). The Service allows recruiters and
            companies ("Companies") to post job opportunities, company profiles,
            and career events, making it easier to find and hire talented
            entry-level candidates and other youth groups. Rise is the data
            controller for any personal information you provide while using the
            Service.
          </p>

          <p>
            Companies and recruiters are responsible for data processed during
            recruitment processes they initiate and/or recruitment events they
            organize. They are the natural recipients of data from Rise
            concerning applications for job opportunities or recruitment events.
            Each Employer / Recruiter gathers and processes data according to
            applicable laws and is responsible for their own actions. Rise also
            offers Guidance Modules, such as tools and exercises, to help
            Members learn more about themselves and develop their skills.
          </p>

          <h3 ref={priv_pol}>1. Privacy Policy</h3>
          <h4>1.1. Introduction</h4>

          <p>
            At Rise, your privacy is our priority, and we are dedicated to
            protecting your personal information. This Privacy Policy explains
            what types of information we collect, how we use it, and the
            measures we take to ensure its security. By using our website and
            services, you consent to the collection, usage, and disclosure of
            information in line with this policy.
          </p>

          <h4>1.2. Information Collection and Use</h4>

          <p>
            We collect information you provide when you create an account,
            update your profile, or use our services. This may include your
            name, email address, phone number, location, and other personal
            details. We use this information to offer and enhance our services,
            secure your account, and keep you informed about updates and
            opportunities.
          </p>

          <h4>1.3. Cookies and Other Tracking Technologies</h4>

          <p>
            Our website employs cookies and similar technologies to enhance your
            experience and help us understand how visitors use our site. By
            continuing to use our website, you agree to our use of cookies and
            other tracking technologies.
          </p>

          <h4>1.4. Information Sharing and Disclosure</h4>
          <p>
            We may share your information with third parties in specific
            situations, such as when required by law, to defend our rights, or
            to deliver services you have requested. We do not sell or rent your
            personal information to third parties for marketing purposes.
          </p>

          <h4>1.5. Data Security</h4>

          <p>
            We implement suitable measures to ensure the security of your
            personal information. While no online service can guarantee complete
            security, we continuously review and update our practices to protect
            against unauthorized access, disclosure, or alteration.
          </p>

          <h4>1.6. Changes to this Privacy Policy</h4>

          <p>
            We may revise our Privacy Policy from time to time. Any updates will
            be posted on this page, and we encourage you to check it regularly
            to stay informed about our privacy practices.
          </p>

          <h3 ref={tersm_cond}>2. Terms and Conditions</h3>
          <h4>2.1. Acceptance of Terms</h4>

          <p>
            By using our website and services, you agree to be bound by these
            Terms and Conditions. If you do not accept any part of these terms,
            you must stop using our site and services.
          </p>

          <h4>2.2. Account Registration and Use</h4>

          <p>
            You are responsible for keeping your account information
            confidential and ensuring that your account is used only by you or
            authorized individuals. You agree to promptly notify us of any
            unauthorized access or use of your account.All content on our
            website, including text, graphics, logos, and other materials, is
            the property of Rise or its content suppliers and is protected by
            copyright and other intellectual property laws.
          </p>

          <h4>2.4. User Conduct</h4>

          <p>
            You agree to use our website and services in a lawful and respectful
            manner. You may not engage in any activity that interferes with or
            disrupts the functioning of our site or services or violates the
            rights of others.
          </p>

          <h4>2.5. Limitation of Liability</h4>

          <p>
            To the fullest extent permitted by law, Rise shall not be liable for
            any direct, indirect, incidental, or consequential damages arising
            from your use of our website or services.
          </p>

          <h3 ref={moder_slavery}>3. Modern Slavery Statement</h3>
          <h4>3.1. Introduction</h4>

          <p>
            Rise is committed to preventing modern slavery in all its forms,
            including forced labor, human trafficking, and child labor. This
            Modern Slavery Statement outlines our policies and practices aimed
            at ensuring that our operations and supply chains are free from
            these practices.
          </p>

          <h4>3.2. Policies and Procedures</h4>

          <p>
            We have implemented policies and procedures to identify and address
            the risk of modern slavery in our operations and supply chains.
            These include employee training, supplier due diligence, and ongoing
            monitoring and auditing of our business practices.
          </p>

          <h4>3.3. Reporting and Accountability</h4>

          <p>
            We encourage employees and stakeholders to report any concerns or
            suspicions of modern slavery in our operations or supply chains.
            Reports can be made confidentially and without fear of retaliation.
          </p>
        </div>
      </div>
      <MainMobileFooter />
    </div>
  );
}

export default Privacy_PolicyMobile;
