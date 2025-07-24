"use client";

import { NextIntlClientProvider } from "next-intl";
import Plausible from "./ui/components/Plausible";

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
    <NextIntlClientProvider
      timeZone={timeZone}
      locale={locale}
      messages={messages}
    >
      <Plausible/>
      {children}
    </NextIntlClientProvider>
  );
}

export default Providers;
