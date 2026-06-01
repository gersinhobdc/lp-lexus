import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Problem } from "@/components/sections/Problem";
import { Services } from "@/components/sections/Services";
import { MidCTA } from "@/components/sections/MidCTA";
import { HowItWorks } from "@/components/sections/HowItWorks";
// Projects desabilitado a pedido (excesso de informacao na pagina).
// import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/conversion/FloatingWhatsApp";
import { StickyMobileCTA } from "@/components/conversion/StickyMobileCTA";
// import { ExitIntentPopup } from "@/components/conversion/ExitIntentPopup";
// import disabled: o popup promete um "catalogo exclusivo" mas o form
// nao envia o email pra lugar nenhum. Reabilitar quando houver fluxo real.
import { CookieBanner } from "@/components/conversion/CookieBanner";
import { SITE } from "@/lib/constants";

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "CNPJ",
      value: SITE.cnpj,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.6334,
      longitude: -46.7043,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:30",
      },
    ],
    sameAs: [SITE.instagram, SITE.youtube, SITE.facebook].filter(
      (u) => u && !/^https?:\/\/(www\.)?(youtube|facebook)\.com\/?$/i.test(u)
    ),
    priceRange: "$$",
    image: `${SITE.url}/og-image.jpg`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main id="main-content">
        <Hero />
        <LeadForm />
        <SocialProof />
        <Problem />
        <Services />
        <MidCTA />
        <HowItWorks />
        <Testimonials />
        <About />
        <FAQ />
        <LeadForm sectionId="diagnostico-final" />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyMobileCTA />
      <CookieBanner />
    </>
  );
}
