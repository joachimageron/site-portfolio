import Providers from "../providers";
import JsonLd from "../ui/components/JsonLd";
import HomePage from "../ui/homepage";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const LOCALES = ["en", "fr"];

export const dynamicParams = false;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale: locale,
  }));
}

// Dynamically import needed messages for given locale
async function getMessages(locale: string) {
  const messageModule = await import(`@/i18n/messages/${locale}.json`);

  return messageModule.default;
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);

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
      url: `https://ageronjoachim.com/${locale}`,
      siteName: "Joachim Ageron Portfolio",
      images: [
        {
          url: "https://ageronjoachim.com/pp.png",
          width: 800,
          height: 800,
        },
      ],
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: `https://ageronjoachim.com/${locale}`,
      languages: {
        en: "https://ageronjoachim.com/en",
        fr: "https://ageronjoachim.com/fr",
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const awaitedParams = await params;

  const messages = await getMessages(awaitedParams.locale);

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
    <html lang={awaitedParams.locale}>
      <body className={inter.className}>
        <JsonLd data={jsonLd} />
        <Providers locale={awaitedParams.locale} messages={messages}>
          <HomePage />
        </Providers>
      </body>
    </html>
  );
}
