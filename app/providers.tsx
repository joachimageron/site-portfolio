"use client";

import { NextIntlClientProvider } from "next-intl";

const timeZone = 'Europe/Paris';


function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}) {
  return (
    <NextIntlClientProvider timeZone={timeZone} locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export default Providers;