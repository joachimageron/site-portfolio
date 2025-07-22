import HomePage from "./ui/homepage";
import { Inter } from "next/font/google";
import Providers from "./providers";

const DEFAULT_LOCALE = "fr"; // Default locale, can be changed based on user preference

const inter = Inter({ subsets: ["latin"] });

// Dynamically import needed messages for given locale
async function getMessages(locale: string) {
  const messageModule = await import(`@/i18n/messages/${locale}.json`);

  return messageModule.default;
}

export default async function Home() {
  const messages = await getMessages(DEFAULT_LOCALE);

  return (
    <html lang={DEFAULT_LOCALE}>
      <body className={inter.className}>
        <Providers locale={DEFAULT_LOCALE} messages={messages}>
          <HomePage />
        </Providers>
      </body>
    </html>
  );
}
