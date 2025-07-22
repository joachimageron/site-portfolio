"use client";

import { NextIntlClientProvider } from "next-intl";
import PlausibleProvider from "next-plausible";

const timeZone = "Europe/Paris";

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
    <PlausibleProvider
      selfHosted={true}
      customDomain="plausible.ageronjoachim.com"
      domain="ageronjoachim.com"
      trackOutboundLinks
      trackFileDownloads
      trackLocalhost={false}
    >
      <NextIntlClientProvider
        timeZone={timeZone}
        locale={locale}
        messages={messages}
      >
        {children}
      </NextIntlClientProvider>
    </PlausibleProvider>
  );
}

export default Providers;
