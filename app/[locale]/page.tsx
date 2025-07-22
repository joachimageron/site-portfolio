
import Providers from "../providers";
import HomePage from "./homepage";

const LOCALES = ["en", "fr"];

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

export default async function Home({params}: Readonly<{params: {locale: string}}>) {

  const awaitedParams = await params;

  const messages = await getMessages(awaitedParams.locale);


  return (
    <html lang={awaitedParams.locale}>
      <body>
        <Providers
            locale={awaitedParams.locale}
            messages={messages}
        >
        <HomePage />
        </Providers>
      </body>
    </html>
  );

}
