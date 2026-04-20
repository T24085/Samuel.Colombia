import { SEO } from '../components/SEO'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { services } from '../data/services'

export function ServicesPage() {
  return (
    <>
      <SEO
        title="Services"
        description="Samuel Studio photography services for portraits, branding, couples, family sessions, and creative editorial work."
        path="/services"
      />
      <section className="bg-parchment py-24 text-ink">
        <div className="studio-shell">
          <SectionHeading
            tone="light"
            eyebrow="Services"
            title="Experiences tailored for portraits, branding, and editorial storytelling."
            description="Every package includes calm direction, deliberate pacing, and a polished final gallery. Pricing is presented as a starting point and can be customized to the brief."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
