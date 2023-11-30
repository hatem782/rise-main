import heading from "../../assets/svgs/sidebar/profile.svg";
import letter from "../../assets/svgs/sidebar/letter.svg";
import mail from "../../assets/svgs/sidebar/mail.svg";
import work from "../../assets/svgs/sidebar/work.svg";
import eductaion from "../../assets/svgs/sidebar/eductaion.svg";

export const menu = [
  { icon: heading, text: "Profile", value: "/user_dashboard/profile" },
  // { icon: letter, text: "Jobs & Internships" },
  {
    icon: work,
    text: "Jobs & Internships",
    value: "/user_dashboard/job_and_internships",
  },
  // { icon: eductaion, text: "not mentioned", value: "/404" },
  {
    icon: mail,
    text: "My Applications",
    value: "/user_dashboard/my_applications",
  },
  {
    icon: eductaion,
    text: "Interviews",
    value: "/user_dashboard/reply_to_emp",
  },
];
