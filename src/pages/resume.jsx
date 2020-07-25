import { useEffect } from "react";
import { navigate } from "gatsby";

const RESUME_LINK = "https://kkhan01.github.io/resume/resume.pdf";
const Resume = () => {
  useEffect(() => navigate(RESUME_LINK), []);
  return null;
};

export default Resume;
