import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex flex-row gap-10 underline">
      <a href="https://github.com/joachimageron">
        <FaGithub size="2rem" />
      </a>
      <a href="https://www.linkedin.com/in/joachim-ageron-dit-blanc/">
        <FaLinkedinIn size="2rem" />
      </a>
    </div>
  );
}
