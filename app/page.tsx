import HomePage from "./ui/homepage";
import { Inter } from "next/font/google";
import Providers from "./providers";
import type { Metadata } from "next";
import JsonLd from "./ui/components/JsonLd";

const DEFAULT_LOCALE = "fr"; // Default locale, can be changed based on user preference

const inter = Inter({ subsets: ["latin"] });

// Dynamically import needed messages for given locale
async function getMessages(locale: string) {
  const messageModule = await import(`@/i18n/messages/${locale}.json`);

  return messageModule.default;
}

export async function generateMetadata(): Promise<Metadata> {
  const messages = await getMessages(DEFAULT_LOCALE);

  // Cast messages to any to access nested properties safely or define a type
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value as string;
  };

  return {
    title: t('header.name') + " - " + t('header.title'),
    description: t('header.tagline1') + " " + t('header.tagline2'),
    openGraph: {
      title: t('header.name') + " - " + t('header.title'),
      description: t('header.tagline1') + " " + t('header.tagline2'),
      url: `https://ageronjoachim.com`,
      siteName: "Joachim Ageron Portfolio",
      images: [
        {
          url: "https://ageronjoachim.com/pp.png",
          width: 800,
          height: 800,
        },
      ],
      locale: DEFAULT_LOCALE,
      type: "website",
    },
    alternates: {
      canonical: `https://ageronjoachim.com`,
      languages: {
        en: "https://ageronjoachim.com/en",
        fr: "https://ageronjoachim.com/fr",
      },
    },
  };
}

export default async function Home() {
  const messages = await getMessages(DEFAULT_LOCALE);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joachim Ageron",
    url: "https://ageronjoachim.com",
    jobTitle: "Full Stack Developer",
    image: "https://ageronjoachim.com/pp.png",
    sameAs: [
      "https://github.com/joachimageron",
      "https://www.linkedin.com/in/joachim-ageron-dit-blanc/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  };

  return (
    <html lang={DEFAULT_LOCALE}>
      <body className={inter.className}>
        <JsonLd data={jsonLd} />
        <Providers locale={DEFAULT_LOCALE} messages={messages}>
          <HomePage />
        </Providers>
      </body>
    </html>
  );
}
