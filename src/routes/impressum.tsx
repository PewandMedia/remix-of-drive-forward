import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – MIRO-DRIVE Fahrschule" },
      { name: "description", content: "Anbieterkennzeichnung nach § 5 TMG für die Fahrschule MIRO-DRIVE in Bochum." },
      { property: "og:title", content: "Impressum – MIRO-DRIVE Fahrschule" },
      { property: "og:description", content: "Anbieterkennzeichnung nach § 5 TMG für die Fahrschule MIRO-DRIVE in Bochum." },
      { property: "og:url", content: "/impressum" },
    ],
    links: [{ rel: "canonical", href: "/impressum" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero title="Impressum" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm leading-relaxed text-foreground/80 sm:px-6 lg:px-8">
        <section className="space-y-3">
          <h2 className="font-display text-lg text-foreground">Angaben gemäß § 5 TMG</h2>
          <p>
            <strong>Fahrschule Miro-Drive</strong>
            <br />
            Ilkay Altin (Einzelunternehmen)
            <br />
            Herner Str. 365
            <br />
            44807 Bochum
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Kontakt</h2>
          <p>
            Telefon: <a href="tel:01772358248" className="text-primary hover:underline">01772358248</a>
            <br />
            E-Mail: <a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">{CONTACT.email}</a>
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
            <br />
            <strong>DE341767395</strong>
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Aufsichtsbehörde</h2>
          <p>
            Straßenverkehrsamt Bochum
            <br />
            Bulksmühle 17
            <br />
            44809 Bochum
          </p>
          <p>
            <a
              href="https://www.bochum.de/Leben-in-Bochum/Verkehr/Stra%C3%9Fenverkehrsamt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Straßenverkehrsamt | Stadt Bochum
            </a>
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            Ilkay Altin
            <br />
            Herner Str. 365
            <br />
            44807 Bochum
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
            Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
            übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
            eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
            bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
            konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
            Inhalte umgehend entfernen.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb
            können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
            stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
            Verlinkung nicht erkennbar.
          </p>
          <p>
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
            Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
            entfernen.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
            des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und
            Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p>
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
            beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Datenschutz</h2>
          <p>
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in unserer{" "}
            <Link to="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </section>
      </div>
    </SiteLayout>
  ),
});
