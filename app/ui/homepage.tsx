"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import CursorHalo from "@/app/ui/components/cursorHalo";
import Navigation from "@/app/ui/components/Navigation";
import LanguageSwitcher from "@/app/ui/components/LanguageSwitcher";
import SectionHeader from "@/app/ui/components/SectionHeader";
import SkillItem from "@/app/ui/components/SkillItem";
import EducationItem from "@/app/ui/components/EducationItem";
import ExperienceItem from "@/app/ui/components/ExperienceItem";
import SocialLinks from "@/app/ui/components/SocialLinks";

export default function HomePage() {
  const [activeId, setActiveId] = useState("");
  const t = useTranslations();
  const locale = useLocale();

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
        rootMargin: `-${window.innerHeight * 0.2 - 2}px 0px -${window.innerHeight * 0.8 - 2
          }px 0px`,
      }
    );
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });
  }, []);

  const skills = [
    { skill: "TypeScript", level: t("skills.professionalPractitioner") },
    { skill: "Next.js", level: t("skills.professionalPractitioner") },
    { skill: "React", level: t("skills.professionalPractitioner") },
    { skill: "Docker / Swarm", level: t("skills.professionalPractitioner") },
    { skill: "CI/CD", level: t("skills.professionalPractitioner") },
    { skill: "Node.js", level: t("skills.hobbyistHacker") },
    { skill: "NestJS", level: t("skills.hobbyistHacker") },
    { skill: "SQL", level: t("skills.hobbyistHacker") },
    { skill: "C# / .NET", level: t("skills.hobbyistHacker") },
    { skill: "Linux / VPS", level: t("skills.hobbyistHacker") },
    { skill: "Go", level: t("skills.dippingToes") },
    { skill: "Kubernetes", level: t("skills.dippingToes") },
  ];

  const educationItems = [
    {
      period: "2024 - 2026",
      title: t("education.esgi.title"),
      url: "https://www.esgi.fr/programmes/ingenierie-web.html",
      items: [
        t("education.esgi.item1"),
        t("education.esgi.item2"),
        t("education.esgi.item3"),
      ],
    },
    {
      period: "2021 - 2024",
      title: t("education.but.title"),
      url: "https://formations.univ-grenoble-alpes.fr/fr/catalogue-2021/but-bachelor-universitaire-de-technologie-CBB/but-metiers-du-multimedia-et-de-l-internet-KI4YX5MN/parcours-developpement-web-et-dispositifs-interactifs-KWDMXUGX.html",
      items: [
        t("education.but.item1"),
        t("education.but.item2"),
        t("education.but.item3"),
      ],
    },
    {
      period: "2018 - 2021",
      title: t("education.bac.title"),
      url: "https://lyceereneperrin.fr/lycee-general-et-technologique/",
    },
  ];

  const experienceItems = [
    {
      title: t("experience.transfertpro.title"),
      period: t("experience.transfertpro.period"),
      description: t("experience.transfertpro.description"),
      url: "https://www.transfertpro.com/",
      linkText: t("experience.transfertpro.link"),
      tags: ["TypeScript", "Next.js", "shadcn/ui", "Turbo", "Docker", "CI/CD", ".NET"],
    },
    {
      title: t("experience.cypress.title"),
      period: t("experience.cypress.period"),
      description: t("experience.cypress.description"),
      url: "https://www.transfertpro.com/",
      linkText: t("experience.cypress.link"),
      tags: ["Cypress", "JS", "PowerShell"],
    },
    {
      title: t("experience.selfHosting.title"),
      period: t("experience.selfHosting.period"),
      description: t("experience.selfHosting.description"),
      tags: ["Linux", "Dokploy", "Docker", "Odoo"],
    },
    {
      title: t("experience.guessWho.title"),
      period: t("experience.guessWho.period"),
      description: t("experience.guessWho.description"),
      tags: ["WebSockets"],
    },
    {
      title: t("experience.bypolar.title"),
      period: t("experience.bypolar.period"),
      description: t("experience.bypolar.description"),
      tags: ["Next", "Next Auth", "Next UI", "Prisma"],
    },
    {
      title: t("experience.wallix.title"),
      period: t("experience.wallix.period"),
      description: t("experience.wallix.description"),
      url: "https://www.wallix.com/fr/",
      linkText: t("experience.wallix.link"),
      tags: ["React", "SCSS"],
    },
    {
      title: t("experience.booking.title"),
      period: t("experience.booking.period"),
      description: t("experience.booking.description"),
      tags: ["API"],
    },
    {
      title: t("experience.messages.title"),
      period: t("experience.messages.period"),
      description: t("experience.messages.description"),
      tags: ["Next.js", "TypeScript", "Tailwind", "Postgres"],
    },
    {
      title: t("experience.escapeGame.title"),
      period: t("experience.escapeGame.period"),
      description: t("experience.escapeGame.description"),
      tags: ["TypeScript", "React Native"],
    },
    {
      title: t("experience.socialMedia.title"),
      period: t("experience.socialMedia.period"),
      description: t("experience.socialMedia.description"),
      tags: ["PHP", "HTML", "CSS", "SQL"],
    },
  ];

  return (
    <main className="dark">
      <CursorHalo />
      <div className="z-10 justify-center bg-darkbg px-6 py-12 text-main-text flex flex-col items-center lg:flex-row lg:items-start lg:px-24 lg:py-0 lg:gap-10">
        <header className="max-w-2xl w-full relative lg:sticky lg:top-0 lg:h-screen lg:py-16 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex gap-8 mb-6">
              <div>
                <h1 className="text-4xl font-bold pb-4 text-white">
                  {t("header.name")}
                </h1>
                <h2 className="text-2xl font-bold text-white">
                  {t("header.title")}
                </h2>
              </div>
              <div className="rounded-full w-28 h-28 relative hidden lg:block -mt-4">
                <Image
                  src="/pp.png"
                  alt="profile picture"
                  fill={true}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <p>{t("header.tagline1")}</p>
            <p>{t("header.tagline2")}</p>
            <p className="mt-5">
              <a
                className="underline"
                href="https://maps.app.goo.gl/MMUkjZXHrV4B5x4s6"
              >
                {t("header.location")}
              </a>
              , {t("header.country")}
            </p>
            <div className="flex flex-col lg:flex-row flex-wrap gap-3 pb-5 txt-sm mt-5">
              <p className="l font-bold text-white text-nowrap">
                {t("header.contact")}
              </p>
              <a href="mailto:ageron.joachim@gmail.com">
                <p className="underline">{t("header.email")}</p>
              </a>
              <a href="tel:+33781413042">
                <p className="underline">{t("header.phone")}</p>
              </a>
            </div>
            <div className="mb-10 lg:mb-16">
              <a
                href={
                  locale === "fr"
                    ? "/JOACHIM%20AGERON%20fr.pdf"
                    : "/JOACHIM%20AGERON%20en.pdf"
                }
                target="_blank"
              >
                <p className="text-white underline font-bold">
                  {t("header.resume")} {"->"}
                </p>
              </a>
            </div>
            <Navigation activeId={activeId} />
            <LanguageSwitcher />
          </div>
          <SocialLinks />
        </header>
        <div className="max-w-2xl lg:w-full">
          <section id="TECHNICAL TOOLKIT" className="pt-32 lg:pt-16">
            <SectionHeader title={t("navigation.technicalToolkit")} />
            <div className="flex gap-10 lg:gap-14 flex-wrap justify-start">
              {skills.map((skill) => (
                <SkillItem
                  key={skill.skill}
                  skill={skill.skill}
                  level={skill.level}
                />
              ))}
            </div>
          </section>

          <section id="ABOUT" className="pt-32">
            <SectionHeader title={t("navigation.about")} />
            <p className="mb-6">
              {t("about.intro")}{" "}
              <span className="text-white font-bold">{t("header.name")}</span>
              {t("about.description1")}{" "}
              <span className="text-white font-bold">TransfertPro</span>
              {t("about.description2")}
            </p>
            <p className="mb-6">
              {t("about.project1")}{" "}
              <span className="text-white font-bold">Tsend</span>
              {t("about.project2")}{" "}
              <span className="text-white font-bold">Next.js + shadcn/ui</span>{" "}
              {t("about.project3")}{" "}
              <span className="text-white font-bold">
                {t("about.project4")}
              </span>
              .
            </p>
            <p className="mb-6">
              {t("about.personal1")}{" "}
              <span className="text-white font-bold">Dokploy</span>
              {t("about.personal2")}{" "}
              <span className="text-white font-bold">Odoo</span>{" "}
              {t("about.personal3")}
            </p>
            <p>
              {t("about.conclusion1")}{" "}
              <span className="text-white font-bold">
                {t("about.conclusion2")}
              </span>
              {t("about.conclusion3")}
            </p>
          </section>

          <section id="EDUCATION" className="pt-32">
            <SectionHeader title={t("navigation.education")} />
            <div className="flex flex-col gap-10">
              {educationItems.map((item, index) => (
                <EducationItem
                  key={index}
                  period={item.period}
                  title={item.title}
                  url={item.url}
                  items={item.items}
                />
              ))}
            </div>
          </section>

          <section id="EXPERIENCE" className="pt-32">
            <SectionHeader title={t("navigation.experience")} />
            <div className="flex flex-col gap-14 lg:gap-20">
              {experienceItems.map((item, index) => (
                <ExperienceItem
                  key={index}
                  title={item.title}
                  period={item.period}
                  description={item.description}
                  url={item.url}
                  linkText={item.linkText}
                  tags={item.tags}
                />
              ))}
            </div>
          </section>

          <footer className="mt-14 lg:mt-32 lg:mb-16">
            <p className="text-sm">
              {t("footer.designed")}{" "}
              <span className="text-white font-bold">Figma</span>,{" "}
              {t("footer.built")}{" "}
              <span className="text-white font-bold">Next.js</span>{" "}
              {t("footer.and")}{" "}
              <span className="text-white font-bold">Tailwind CSS</span>.{" "}
              {t("footer.avatar")}{" "}
              <a
                href="https://www.instagram.com/agbi.png/"
                className="text-white font-bold underline"
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
