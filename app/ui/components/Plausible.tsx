import Script from "next/script";

export default function Plausible() {
    return (
        <>
            <Script
                defer
                data-domain="ageronjoachim.com"
                src="https://plausible.ageronjoachim.com/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
            />
            <Script id="plausible-init">
                {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
            </Script>
        </>
    )
}