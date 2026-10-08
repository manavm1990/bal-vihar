import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  ADMIN_OFFICE,
  BASE_TITLE,
  DESCRIPTION,
  FEDERAL_TAX_ID,
  FOUNDING_YEAR,
  ORGANIZATION_LEGAL_NAME,
  ORGANIZATION_NAME,
  SCHOOL_LOCATION,
} from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createJsonLd(name: string, description = DESCRIPTION) {
  const jsonLdDisplayName =
    name === ORGANIZATION_LEGAL_NAME ? ORGANIZATION_NAME : `${ORGANIZATION_NAME} - ${name}`;
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: jsonLdDisplayName,
    legalName: ORGANIZATION_LEGAL_NAME,
    alternateName: BASE_TITLE,
    url: "/",
    logo: "/logo.svg",
    image: "/logo.svg",
    description,
    foundingDate: FOUNDING_YEAR,
    taxId: FEDERAL_TAX_ID,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADMIN_OFFICE.streetAddress,
      addressLocality: ADMIN_OFFICE.addressLocality,
      addressRegion: ADMIN_OFFICE.addressRegion,
      postalCode: ADMIN_OFFICE.postalCode,
      addressCountry: ADMIN_OFFICE.addressCountry,
    },
    location: {
      "@type": "Place",
      name: SCHOOL_LOCATION.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: SCHOOL_LOCATION.streetAddress,
        addressLocality: SCHOOL_LOCATION.addressLocality,
        addressRegion: SCHOOL_LOCATION.addressRegion,
        postalCode: SCHOOL_LOCATION.postalCode,
        addressCountry: SCHOOL_LOCATION.addressCountry,
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "administrative office",
      telephone: ADMIN_OFFICE.phoneHref,
      areaServed: "Metro St. Louis",
      availableLanguage: "English",
    },
  };
}
