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
          <p>
            <strong>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</strong>
            <br />
            DE341767395
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
          <h2 className="font-display text-lg text-foreground">EU-Online-Streitbeilegung</h2>
          <p>
            Die EU-Kommission bietet die Möglichkeit zur Online-Streitbeilegung auf einer von ihr betriebenen
            Online-Plattform. Diese Plattform ist über den externen Link{" "}
            <a
              href="http://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              http://ec.europa.eu/consumers/odr/
            </a>{" "}
            zu erreichen.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Geltungsbereich</h2>
          <p>
            Das Impressum gilt auch für alle Social-Media-Kanäle, welche auf unserer Seite verlinkt sind.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Haftungsausschluss</h2>

          <h3 className="mt-4 font-semibold text-foreground">Inhalt des Onlineangebotes</h3>
          <p>
            Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der
            bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder
            ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die
            Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen,
            sofern seitens des Autors kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
          </p>
          <p>
            Alle Angebote sind freibleibend und unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten
            oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die
            Veröffentlichung zeitweise oder endgültig einzustellen.
          </p>

          <h3 className="mt-4 font-semibold text-foreground">Verweise und Links</h3>
          <p>
            Bei direkten oder indirekten Verweisen auf fremde Internetseiten („Links"), die außerhalb des
            Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in
            Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre,
            die Nutzung im Falle rechtswidriger Inhalte zu verhindern.
          </p>
          <p>
            Der Autor erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu
            verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die
            Urheberschaft der gelinkten/verknüpften Seiten hat der Autor keinerlei Einfluss. Deshalb distanziert er sich
            hiermit ausdrücklich von allen Inhalten aller gelinkten/verknüpften Seiten, die nach der Linksetzung verändert
            wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise
            sowie für Fremdeinträge in vom Autor eingerichteten Gästebüchern, Diskussionsforen und Mailinglisten. Für
            illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder
            Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf
            welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
          </p>

          <h3 className="mt-4 font-semibold text-foreground">Urheber- und Kennzeichenrecht</h3>
          <p>
            Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente,
            Videosequenzen und Texte zu beachten, von ihm selbst erstellte Grafiken, Tondokumente, Videosequenzen und
            Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen.
          </p>
          <p>
            Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen
            unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der
            jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass
            Markenzeichen nicht durch Rechte Dritter geschützt sind!
          </p>
          <p>
            Das Copyright für veröffentlichte, vom Autor selbst erstellte Objekte bleibt allein beim Autor der Seiten. Eine
            Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen
            elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung des Autors nicht gestattet.
          </p>

          <h3 className="mt-4 font-semibold text-foreground">Rechtswirksamkeit dieses Haftungsausschlusses</h3>
          <p>
            Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite
            verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht
            mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und
            ihrer Gültigkeit davon unberührt.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Datenschutz</h2>
          <p>
            Informationen zum Datenschutz finden Sie auf unserer{" "}
            <Link to="/datenschutz" className="text-primary hover:underline">
              Datenschutzseite
            </Link>
            .
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Verwendung von Facebook Social Plugins</h2>
          <p>
            Unser Internetauftritt verwendet Social Plugins („Plugins") des sozialen Netzwerkes facebook.com, welches von
            der Facebook Inc., 1601 S. California Ave, Palo Alto, CA 94304, USA betrieben wird („Facebook"). Die Plugins
            sind mit einem Facebook Logo oder dem Zusatz „Facebook Social Plugin" gekennzeichnet.
          </p>
          <p>
            Wenn Sie eine Webseite unseres Internetauftritts aufrufen, die ein solches Plugin enthält, baut Ihr Browser
            eine direkte Verbindung mit den Servern von Facebook auf. Der Inhalt des Plugins wird von Facebook direkt an
            Ihren Browser übermittelt und von diesem in die Webseite eingebunden.
          </p>
          <p>
            Durch die Einbindung der Plugins erhält Facebook die Information, dass Sie die entsprechende Seite unseres
            Internetauftritts aufgerufen haben. Sind Sie bei Facebook eingeloggt, kann Facebook den Besuch Ihrem
            Facebook-Konto zuordnen. Wenn Sie mit den Plugins interagieren, zum Beispiel den „Gefällt mir"-Button betätigen
            oder einen Kommentar abgeben, wird die entsprechende Information von Ihrem Browser direkt an Facebook
            übermittelt und dort gespeichert.
          </p>
          <p>
            Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten durch Facebook sowie
            Ihre diesbezüglichen Rechte und Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre entnehmen Sie bitte
            den Datenschutzhinweisen von Facebook. Wenn Sie nicht möchten, dass Facebook über unseren Internetauftritt
            Daten über Sie sammelt, müssen Sie sich vor Ihrem Besuch unseres Internetauftritts bei Facebook ausloggen.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">Verwendung von Google Analytics</h2>
          <p>
            Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google"). Google Analytics
            verwendet sog. „Cookies", Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der
            Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Nutzung
            dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
          </p>
          <p>
            Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite, wird Ihre IP-Adresse von Google jedoch
            innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den
            Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von
            Google in den USA übertragen und dort gekürzt. Die IP-Anonymisierung ist auf dieser Website aktiv. Im Auftrag
            des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website
            auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und
            der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen.
          </p>
          <p>
            Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von
            Google zusammengeführt. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer
            Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht
            sämtliche Funktionen dieser Website vollumfänglich werden nutzen können.
          </p>
          <p>
            Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen
            Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem
            Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren:{" "}
            <a
              href="http://tools.google.com/dlpage/gaoptout?hl=de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              http://tools.google.com/dlpage/gaoptout?hl=de
            </a>
            .
          </p>
        </section>

        <p className="mt-10 text-xs text-muted-foreground">
          Die hier gegebenen Informationen erfolgten zur Erfüllung nachfolgend genannter gesetzlicher Verpflichtungen:
          § 5 und § 6 Telemediengesetz (TMG), § 4 Abs. 3 Bundesdatenschutzgesetz (BDSG), § 312c Bürgerliches Gesetzbuch
          (BGB), § 1 BGB-Informationspflichten-Verordnung (BGB-InfoV).
        </p>
      </div>
    </SiteLayout>
  ),
});
