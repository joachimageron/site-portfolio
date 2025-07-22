"use client";
import { useTranslations } from "next-intl";

interface NavigationProps {
  activeId: string;
}

export default function Navigation({ activeId }: NavigationProps) {
  const t = useTranslations();

  const navigationItems = [
    { id: "TECHNICAL TOOLKIT", label: t("navigation.technicalToolkit") },
    { id: "ABOUT", label: t("navigation.about") },
    { id: "EDUCATION", label: t("navigation.education") },
    { id: "EXPERIENCE", label: t("navigation.experience") },
  ];

  return (
    <ul className="hidden text-sm lg:block">
      {navigationItems.map((item, index) => (
        <li key={item.id}>
          <a href={`#${item.id}`}>
            <div
              className={`group flex gap-3 ${
                index === navigationItems.length - 1 ? "mb-10" : "mb-8"
              } w-min ${activeId === item.id ? "active" : ""}`}
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
                {item.label}
              </h2>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
