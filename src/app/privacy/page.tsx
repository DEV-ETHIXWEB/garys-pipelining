import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.shortName} handles the information you share through this website, including estimate requests, the chatbot, and contact details.`,
  alternates: { canonical: "/privacy" },
};

// Kept deliberately short and specific to what this site actually does. If a
// form field, third-party embed, or tracking script is ever added, update this
// page in the same change.
const LAST_UPDATED = "September 27, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl tracking-tight text-ink md:text-3xl">{title}</h2>
      <div className="mt-4 grid gap-4 text-pretty leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Privacy Policy", url: `${siteConfig.url}/privacy` },
        ])}
      />
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div className="container-px mx-auto max-w-[820px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Privacy Policy</span>
          </nav>
          <h1 className="mt-6 text-balance text-[40px] leading-[1.05] tracking-tight md:text-6xl">Privacy Policy</h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            This page explains what {siteConfig.legalName} collects through this website, why we collect it, and who
            it goes to. Last updated {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-px mx-auto max-w-[820px]">
          <Section title="What we collect">
            <p>
              We only collect what you type into the site. When you send an estimate request, use the contact form,
              submit a contractor partnership request, or talk to the chatbot, that can include your name, phone
              number, email address, service address, the service you need, and whatever you tell us about the
              problem. Partnership requests also include your company details and, if you choose to attach one, a
              file (PDF, JPG, PNG, or DWG).
            </p>
            <p>
              Our server also records the page you submitted from, the time of the submission, and the IP address the
              request came from. We use those to stop automated spam and to limit how often the same sender can
              submit. We do not use them to build a profile of you.
            </p>
            <p>We do not ask for, and have no reason to collect, payment details through this website.</p>
          </Section>

          <Section title="How we use it">
            <p>
              We use your details to respond to your request: to call or email you back, to ask follow-up questions,
              to quote the work, and to schedule it. If you tick the communication consent box, we may also send you
              calls or texts about that request, such as appointment confirmations and updates. That consent is not
              required to use our services, and you can tell us to stop at any time by replying or calling us.
            </p>
            <p>We do not sell your information, and we do not share it for anyone else&rsquo;s advertising.</p>
          </Section>

          <Section title="Who else is involved">
            <p>
              Your submission is delivered to our team by email, so it passes through our email delivery provider and
              sits in our email accounts. The site itself is hosted on Vercel, whose servers process requests to the
              site and keep short-lived technical logs.
            </p>
            <p>
              Two third-party services run in your browser on this site. Cloudflare Turnstile performs the security
              check on our forms, which is what keeps automated spam out of our inbox. Pages that show a map embed
              Google Maps. Both receive the technical information needed to load them, including your IP address, and
              both handle that under their own privacy policies rather than ours.
            </p>
            <p>
              Beyond that, we may share information where we are legally required to, or where it is necessary to
              carry out the work you have asked us to do.
            </p>
          </Section>

          <Section title="Cookies and browser storage">
            <p>
              This site does not use advertising cookies, analytics cookies, or tracking pixels, and it does not set
              any cookies of its own.
            </p>
            <p>
              It does store two small things in your own browser so the site behaves sensibly: your accessibility
              preferences, so the site stays the way you set it, and a note that the chat window has already greeted
              you, so it does not do it repeatedly. Neither is sent to us, and clearing your browser data removes
              both. Cloudflare and Google may set their own cookies as part of the security check and the map.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Enquiries arrive as email and stay in our email accounts, so we keep them for as long as we need them
              to serve you and to keep ordinary business records. If you would like us to delete your enquiry, ask us
              and we will, unless we are required to keep it.
            </p>
          </Section>

          <Section title="Your choices">
            <p>
              You can ask us what we hold about you, ask us to correct it, or ask us to delete it. The quickest way
              is to email{" "}
              <a href={siteConfig.emailHref} className="text-primary link-underline">
                {siteConfig.email}
              </a>{" "}
              or call{" "}
              <a href={siteConfig.phoneHref} className="text-primary link-underline">
                {siteConfig.phone}
              </a>
              . If you would rather not submit anything through the website at all, call us instead and nothing is
              stored here.
            </p>
          </Section>

          <Section title="Children">
            <p>
              This site is aimed at homeowners, property managers, and contractors arranging plumbing work. It is not
              directed at children, and we do not knowingly collect information from them.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we change what we collect or who it goes to, we will update this page and the date at the top. For
              anything you are unsure about, contact us using the details above.
            </p>
          </Section>

          <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteConfig.legalName} &middot; {siteConfig.address.full} &middot;{" "}
              <a href={siteConfig.phoneHref} className="text-primary link-underline">
                {siteConfig.phone}
              </a>{" "}
              &middot;{" "}
              <a href={siteConfig.emailHref} className="text-primary link-underline">
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
