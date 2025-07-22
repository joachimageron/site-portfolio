"use client";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import CursorHalo from "@/app/ui/cursorHalo";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const [activeId, setActiveId] = useState("");
  const t = useTranslations();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${window.innerHeight * 0.2 - 2}px 0px -${
          window.innerHeight * 0.8 - 2
        }px 0px`,
      }
    );
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });
  }, []);

  return (
    <main className="dark">
      <CursorHalo />
      <div className="z-10 justify-center bg-darkbg px-6 py-12 text-main-text flex flex-col items-center lg:flex-row lg:items-start lg:px-24 lg:py-0 lg:gap-10">
        <header className="max-w-2xl w-full relative lg:sticky lg:top-0 lg:h-screen lg:py-16 lg:flex lg:flex-col lg:justify-between	">
          <div>
            <div className={"flex gap-8 mb-6"}>
              <div>
                <h1 className="text-4xl font-bold pb-4 text-white">
                  {t("header.name")}
                </h1>
                <h2 className="text-2xl font-bold text-white">
                  {t("header.title")}
                </h2>
              </div>
              <div
                className={
                  "rounded-full w-28 h-28 relative hidden lg:block -mt-4"
                }
              >
                <Image
                  src={"/pp.png"}
                  alt={"profile picture"}
                  fill={true}
                  className={"rounded-full object-cover "}
                />
              </div>
            </div>
            <p>{t("header.tagline1")}</p>
            <p>{t("header.tagline2")}</p>
            <p className={"mt-5"}>
              <a
                className={"underline"}
                href={"https://maps.app.goo.gl/MMUkjZXHrV4B5x4s6"}
              >
                {t("header.location")}
              </a>
              , {t("header.country")}
            </p>
            <div
              className={
                "flex flex-col lg:flex-row flex-wrap gap-3 pb-5 txt-sm mt-5"
              }
            >
              <p className={"l font-bold text-white text-nowrap "}>
                {t("header.contact")}
              </p>
              <a href={"mailto:ageron.joachim@gmail.com"}>
                <p className={"underline"}>{t("header.email")}</p>
              </a>
              <a href={"tel:+33781413042"}>
                <p className={"underline"}>{t("header.phone")}</p>
              </a>
            </div>
            <div className={"mb-10 lg:mb-16"}>
              <a href={"/CV JOACHIM AGERON.pdf"} target={"_blank"}>
                <p className={"text-white underline font-bold"}>
                  {t("header.resume")} {"->"}
                </p>
              </a>
            </div>
            <ul className={"hidden text-sm lg:block"}>
              <li>
                <a href={`#TECHNICAL TOOLKIT`}>
                  <div
                    className={`group flex gap-3 mb-8 w-min ${
                      activeId === "TECHNICAL TOOLKIT" ? "active" : ""
                    }`}
                  >
                    <div
                      className={
                        "bg-white w-8 h-0.5 rounded-full self-center group-hover:w-16 group-hover:bg-indigo-200 transition-all group-[.active]:w-16 group-[.active]:bg-indigo-200"
                      }
                    />
                    <h2
                      className={
                        "font-bold text-white text-nowrap group-hover:text-main-text group-[.active]:text-main-text transition-all"
                      }
                    >
                      {t("navigation.technicalToolkit")}
                    </h2>
                  </div>
                </a>
              </li>
              <li>
                <a href={`#ABOUT`}>
                  <div
                    className={`group flex gap-3 mb-8 w-min ${
                      activeId === "ABOUT" ? "active" : ""
                    }`}
                  >
                    <div
                      className={
                        "bg-white w-8 h-0.5 rounded-full self-center group-hover:w-16 group-hover:bg-indigo-200 transition-all group-[.active]:w-16 group-[.active]:bg-indigo-200"
                      }
                    />
                    <h2
                      className={
                        "font-bold text-white text-nowrap group-hover:text-main-text group-[.active]:text-main-text transition-all"
                      }
                    >
                      {t("navigation.about")}
                    </h2>
                  </div>
                </a>
              </li>
              <li>
                <a href={`#EDUCATION`}>
                  <div
                    className={`group flex gap-3 mb-8 w-min ${
                      activeId === "EDUCATION" ? "active" : ""
                    }`}
                  >
                    <div
                      className={
                        "bg-white w-8 h-0.5 rounded-full self-center group-hover:w-16 group-hover:bg-indigo-200 transition-all group-[.active]:w-16 group-[.active]:bg-indigo-200"
                      }
                    />
                    <h2
                      className={
                        "font-bold text-white text-nowrap group-hover:text-main-text group-[.active]:text-main-text transition-all"
                      }
                    >
                      {t("navigation.education")}
                    </h2>
                  </div>
                </a>
              </li>
              <li>
                <a href={`#EXPERIENCE`}>
                  <div
                    className={`group flex gap-3 mb-10 w-min ${
                      activeId === "EXPERIENCE" ? "active" : ""
                    }`}
                  >
                    <div
                      className={
                        "bg-white w-8 h-0.5 rounded-full self-center group-hover:w-16 group-hover:bg-indigo-200 transition-all group-[.active]:w-16 group-[.active]:bg-indigo-200"
                      }
                    />
                    <h2
                      className={
                        "font-bold text-white text-nowrap group-hover:text-main-text group-[.active]:text-main-text transition-all"
                      }
                    >
                      {t("navigation.experience")}
                    </h2>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className={"flex flex-row gap-10 underline"}>
            <a href={"https://github.com/joachimageron"}>
              <FaGithub size={"2rem"} />
            </a>
            <a href={"https://www.linkedin.com/in/joachim-ageron-dit-blanc/"}>
              <FaLinkedinIn size={"2rem"} />
            </a>
          </div>
        </header>
        <div className={"max-w-2xl lg:w-full"}>
          <section id={"TECHNICAL TOOLKIT"} className={"pt-32 lg:pt-16"}>
            <div className={"flex gap-5 mb-10"}>
              <h2 className={"text-xl font-bold text-white text-nowrap"}>
                {t("navigation.technicalToolkit")}
              </h2>
              <div
                className={"bg-white w-full h-0.5 rounded-full self-center"}
              />
            </div>
            <div className={"flex gap-10 lg:gap-14 flex-wrap justify-start"}>
              <article className={"flex gap-3"}>
                <p className={"text-white"}>Cypress</p>
                <p className={"text-white"}>I</p>
                <p>{t("skills.professionalPractitioner")}</p>
              </article>

              <article className={"flex gap-3"}>
                <p className={"text-white"}>React</p>
                <p className={"text-white"}>I</p>
                <p>{t("skills.professionalPractitioner")}</p>
              </article>

              <article className={"flex gap-3"}>
                <p className={"text-white"}>React Native</p>
                <p className={"text-white"}>I</p>
                <p>{t("skills.hobbyistHacker")}</p>
              </article>

              <article className={"flex gap-3"}>
                <p className={"text-white"}>Next.js</p>
                <p className={"text-white"}>I</p>
                <p>{t("skills.professionalPractitioner")}</p>
              </article>

              <article className={"flex gap-3"}>
                <p className={"text-white"}>PHP</p>
                <p className={"text-white"}>I</p>
                <p>{t("skills.hobbyistHacker")}</p>
              </article>

              <article className={"flex gap-3"}>
                <p className={"text-white"}>Symfony</p>
                <p className={"text-white"}>I</p>
                <p>{t("skills.dippingToes")}</p>
              </article>

              <article className={"flex gap-3"}>
                <p className={"text-white"}>SQL</p>
                <p className={"text-white"}>I</p>
                <p>{t("skills.hobbyistHacker")}</p>
              </article>

              <article className={"flex gap-3"}>
                <p className={"text-white"}>C#</p>
                <p className={"text-white"}>I</p>
                <p>{t("skills.hobbyistHacker")}</p>
              </article>
            </div>
          </section>
          <section id={"ABOUT"} className={"pt-32"}>
            <div className={"flex gap-5 mb-10"}>
              <h2 className={"text-xl font-bold text-white text-nowrap"}>
                {t("navigation.about")}
              </h2>
              <div
                className={"bg-white w-full h-0.5 rounded-full self-center"}
              />
            </div>
            <p className={"mb-6"}>
              {t("about.intro")}{" "}
              <span className={"text-white font-bold"}>{t("header.name")}</span>
              {t("about.description1")}{" "}
              <span className={"text-white font-bold"}>React</span>,{" "}
              <span className={"text-white font-bold"}>Next.js</span>,{" "}
              {t("about.description2")}{" "}
              <span className={"text-white font-bold"}>Typescript</span>
              {t("about.description2")}{" "}
              <span className={"text-white font-bold"}>Transfert Pro</span>{" "}
              {t("about.description3")}{" "}
              <span className={"text-white font-bold"}>Wallix</span>
              {t("about.description4")}{" "}
              <span className={"text-white font-bold"}>C#</span>
              {t("about.description5")}{" "}
              <span className={"text-white font-bold"}>Next.js</span>{" "}
              {t("about.description6")}{" "}
              <span className={"text-white font-bold"}>Prisma</span>
              {t("about.description7")}
            </p>
            <p className={"mb-6"}>
              {t("about.personal1")}{" "}
              <span className={"text-white font-bold"}>
                {t("about.personal2")}
              </span>{" "}
              {t("about.personal3")}{" "}
              <span className={"text-white font-bold"}>
                {t("about.personal4")}
              </span>
              .
            </p>
            <p className={""}>
              {t("about.conclusion1")}
              <span className={"text-white font-bold"}>
                {" "}
                {t("about.conclusion2")}
              </span>{" "}
              {t("about.conclusion3")}
            </p>
          </section>
          <section id={"EDUCATION"} className={"pt-32"}>
            <div className={"flex gap-5 mb-16 "}>
              <h2 className={"text-xl font-bold text-white text-nowrap"}>
                {t("navigation.education")}
              </h2>
              <div
                className={"bg-white w-full h-0.5 rounded-full self-center"}
              />
            </div>
            <div className={"flex flex-col gap-10"}>
              <article className={"flex gap-5 lg:gap-14"}>
                <div>
                  <p className={"text-nowrap"}>2024 - 2026</p>
                </div>
                <div>
                  <a
                    href={"https://www.esgi.fr/programmes/ingenierie-web.html"}
                  >
                    <h3 className={"text-white font-bold underline pb-2"}>
                      {t("education.esgi.title")} {"->"}
                    </h3>
                  </a>
                  <p className={"pb-1"}>{t("education.esgi.item1")}</p>
                  <p className={"pb-1"}>{t("education.esgi.item2")}</p>
                  <p className={"pb-1"}>{t("education.esgi.item3")}</p>
                </div>
              </article>
              <article className={"flex gap-5 lg:gap-14"}>
                <div className={"text-nowrap"}>
                  <p>2021 - 2024</p>
                </div>
                <div>
                  <a
                    href={
                      "https://formations.univ-grenoble-alpes.fr/fr/catalogue-2021/but-bachelor-universitaire-de-technologie-CBB/but-metiers-du-multimedia-et-de-l-internet-KI4YX5MN/parcours-developpement-web-et-dispositifs-interactifs-KWDMXUGX.html"
                    }
                  >
                    <h3 className={"text-white font-bold underline pb-2"}>
                      {t("education.but.title")}
                      {"->"}
                    </h3>
                  </a>
                  <p className={"pb-1"}>{t("education.but.item1")}</p>
                  <p className={"pb-1"}>{t("education.but.item2")}</p>
                  <p className={"pb-1"}>{t("education.but.item3")}</p>
                </div>
              </article>
              <article className={"flex gap-14"}>
                <div className={"text-nowrap"}>
                  <p>2018 - 2021</p>
                </div>
                <div>
                  <a
                    href={
                      "https://lyceereneperrin.fr/lycee-general-et-technologique/"
                    }
                  >
                    <h3 className={"text-white font-bold underline pb-2 "}>
                      {t("education.bac.title")} {"->"}
                    </h3>
                  </a>
                </div>
              </article>
            </div>
          </section>
          <section id={"EXPERIENCE"} className={"pt-32"}>
            <div className={"flex gap-5 mb-10"}>
              <h2 className={"text-xl font-bold text-white text-nowrap"}>
                {t("navigation.experience")}
              </h2>
              <div
                className={"bg-white w-full h-0.5 rounded-full self-center"}
              />
            </div>
            <div className={"flex flex-col gap-14 lg:gap-20"}>
              <article>
                <div className={"flex flex-col lg:flex-row gap-4"}>
                  <h3 className={"text-white font-bold pb-2 text-nowrap"}>
                    {t("experience.bypolar.title")}{" "}
                    <a
                      className={"underline"}
                      href={"https://bypolar.ageronjoachim.com"}
                    >
                      {t("experience.bypolar.link")} {"->"}
                    </a>
                  </h3>
                  <p className={"text-nowrap mb-4"}>
                    {t("experience.bypolar.period")}
                  </p>
                </div>
                <p className={"pb-5"}>{t("experience.bypolar.description")}</p>
                <div className={"flex gap-5"}>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>Next</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>Next Auth</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>Next UI</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>Prisma</p>
                  </div>
                </div>
              </article>

              <article>
                <div className={"flex flex-col lg:flex-row gap-4"}>
                  <h3 className={"text-white font-bold pb-2 text-nowrap"}>
                    {t("experience.transfertpro.title")}{" "}
                    <a
                      className={"underline"}
                      href={"https://www.transfertpro.com/"}
                    >
                      {t("experience.transfertpro.link")} {"->"}
                    </a>
                  </h3>
                  <p className={"text-nowrap mb-4"}>
                    {t("experience.transfertpro.period")}
                  </p>
                </div>
                <p className={"pb-5"}>
                  {t("experience.transfertpro.description")}
                </p>
                <div className={"flex gap-5"}>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>C#</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>Cypress</p>
                  </div>
                </div>
              </article>

              <article>
                <div className={"flex flex-col lg:flex-row gap-4"}>
                  <h3 className={"text-white font-bold pb-2 text-nowrap"}>
                    {t("experience.cypress.title")}{" "}
                    <a
                      className={"underline"}
                      href={"https://www.transfertpro.com/"}
                    >
                      {t("experience.cypress.link")} {"->"}
                    </a>
                  </h3>
                  <p className={"text-nowrap mb-4"}>
                    {t("experience.cypress.period")}
                  </p>
                </div>
                <p className={"pb-5"}>{t("experience.cypress.description")}</p>
                <div className={"flex gap-5"}>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>Cypress</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>JS</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>PowerShell</p>
                  </div>
                </div>
              </article>

              <article>
                <div className={"flex flex-col lg:flex-row gap-4"}>
                  <h3 className={"text-white font-bold pb-2 text-nowrap"}>
                    {t("experience.wallix.title")}{" "}
                    <a
                      className={"underline"}
                      href={"https://www.wallix.com/fr/"}
                    >
                      {t("experience.wallix.link")} {"->"}
                    </a>
                  </h3>
                  <p className={"text-nowrap mb-4"}>
                    {t("experience.wallix.period")}
                  </p>
                </div>
                <p className={"pb-5"}>{t("experience.wallix.description")}</p>
                <div className={"flex gap-5"}>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>React</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>SCSS</p>
                  </div>
                </div>
              </article>
              <article>
                <div className={"flex flex-col lg:flex-row gap-4"}>
                  <h3 className={"text-white font-bold pb-2 text-nowrap"}>
                    {t("experience.messages.title")}
                  </h3>
                  <p className={"text-nowrap mb-4"}>
                    {t("experience.messages.period")}
                  </p>
                </div>
                <p className={"pb-5"}>{t("experience.messages.description")}</p>
                <div className={"flex gap-5 flex-wrap"}>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>Next.js</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>TypeScript</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>Tailwind</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>Postgres</p>
                  </div>
                </div>
              </article>
              <article>
                <div className={"flex flex-col lg:flex-row gap-4"}>
                  <h3 className={"text-white font-bold pb-2 text-nowrap"}>
                    {t("experience.escapeGame.title")}
                  </h3>
                  <p className={"text-nowrap mb-4"}>
                    {t("experience.escapeGame.period")}
                  </p>
                </div>
                <p className={"pb-5"}>
                  {t("experience.escapeGame.description")}
                </p>
                <div className={"flex gap-5 flex-wrap"}>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>TypeScript</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>React Native</p>
                  </div>
                </div>
              </article>
              <article>
                <div className={"flex flex-col lg:flex-row gap-4"}>
                  <h3 className={"text-white font-bold pb-2 text-nowrap"}>
                    {t("experience.socialMedia.title")}
                  </h3>
                  <p className={"text-nowrap mb-4"}>
                    {t("experience.socialMedia.period")}
                  </p>
                </div>
                <p className={"pb-5"}>
                  {t("experience.socialMedia.description")}
                </p>
                <div className={"flex gap-5 flex-wrap"}>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>PHP</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>HTML</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>CSS</p>
                  </div>
                  <div className={"rounded-full px-5 py-2 bg-blue-950 w-fit"}>
                    <p>SQL</p>
                  </div>
                </div>
              </article>
            </div>
          </section>
          <footer className={"mt-14 lg:mt-32 lg:mb-16"}>
            <p className={"text-sm"}>
              {t("footer.designed")}{" "}
              <span className={"text-white font-bold"}>Figma</span>,{" "}
              {t("footer.built")}{" "}
              <span className={"text-white font-bold"}>Next.js</span>{" "}
              {t("footer.and")}{" "}
              <span className={"text-white font-bold"}>Tailwind CSS</span>.{" "}
              {t("footer.avatar")}{" "}
              <a
                href={"https://www.instagram.com/agbi.png/"}
                className={"text-white font-bold underline"}
              >
                @agbi.png {"->"}
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}