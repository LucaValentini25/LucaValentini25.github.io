"""Genera la capa de datos para máquinas desde data.json.

    python tools/build.py

Escribe en la raíz del sitio:
  llms.txt        resumen en Markdown (convención llmstxt.org)
  llms-full.txt   versión completa en Markdown
  profile.json    JSON Resume (https://jsonresume.org/schema), fechas ISO
  sitemap.xml     todas las páginas de data.json
y reemplaza el bloque JSON-LD de index.html, entre los marcadores
<!-- JSONLD:START --> y <!-- JSONLD:END -->.

Solo usa la librería estándar. Si algo no cierra (marcadores ausentes, campos
obligatorios vacíos), sale con código 1 y no deja archivos a medio escribir.
"""
import json
import pathlib
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
D = json.loads((RAIZ / "data.json").read_text(encoding="utf-8"))
B, SITE = D["basics"], D["site"]
URL = SITE["url"].rstrip("/")


def fecha(f):
    """'2025-01' -> 'Jan 2025'; None -> 'Present'."""
    if not f:
        return "Present"
    meses = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()
    partes = f.split("-")
    return f"{meses[int(partes[1]) - 1]} {partes[0]}" if len(partes) > 1 else partes[0]


def chequear():
    faltan = [k for k in ("name", "label", "email", "url", "summary") if not B.get(k)]
    for p in D["projects"]:
        faltan += [f"projects.{p.get('id')}.{k}" for k in ("id", "name", "description") if not p.get(k)]
    if faltan:
        sys.exit("Faltan campos en data.json: " + ", ".join(faltan))


# ------------------------------------------------------------------ llms.txt
def llms():
    perfiles = " · ".join(f"[{p['network']}]({p['url']})" for p in B["profiles"])
    l = [f"# {B['name']}", "", f"> {B['summary']}", "",
         f"{B['availability']} Based in {B['location']['city']}, Argentina. Contact: {B['email']}. {perfiles}.", "",
         "## Pages", ""]
    l += [f"- [{p['title']}]({URL}{p['path']})" for p in SITE["pages"]]
    l += ["", "## Projects", ""]
    for p in D["projects"]:
        link = f"({p['url']})" if p.get("url") else f"({URL}/projects.html#{p['id']})"
        l.append(f"- [{p['name']}]{link}: {p['description']}")
    l += ["", "## Machine-readable data", "",
          f"- [llms-full.txt]({URL}/llms-full.txt): full profile in Markdown (experience, education, skills, projects, contact)",
          f"- [profile.json]({URL}/profile.json): the same data as JSON Resume",
          "", "## Optional", "",
          f"- [Case studies]({URL}/work.html): how specific problems were solved, with measured results"]
    return "\n".join(l) + "\n"


def llms_full():
    l = [f"# {B['name']}", "", f"> {B['label']}.", "", B["summary"], "", f"- **Availability:** {B['availability']}",
         f"- **Location:** {B['location']['city']}, Argentina (remote)", f"- **Email:** {B['email']}",
         f"- **Website:** {B['url']}"]
    l += [f"- **{p['network']}:** {p['url']}" for p in B["profiles"]]
    l += ["", "## Experience", ""]
    for w in D["work"]:
        l += [f"### {w['position']} · {w['name']}", f"{fecha(w.get('startDate'))} to {fecha(w.get('endDate'))} · {w.get('location', '')}", ""]
        if w.get("summary"):
            l += [w["summary"], ""]
        l += [f"- {h}" for h in w.get("highlights", [])] + [""]
    l += ["## Education", ""]
    for e in D["education"]:
        l += [f"- {e['studyType']} in {e['area']}, {e['institution']} ({fecha(e['startDate'])} to {fecha(e['endDate'])})"]
    l += ["", "## Skills", ""]
    l += [f"- **{s['name']}:** {', '.join(s['keywords'])}" for s in D["skills"]]
    l += ["", "## Languages", ""]
    l += [f"- {x['language']}: {x['fluency']}" for x in D["languages"]]
    l += ["", "## Projects", ""]
    for p in D["projects"]:
        l += [f"### {p['name']}", p["description"], "", f"- **Role:** {p['role']}", f"- **Result:** {p['result']}",
              f"- **Stack:** {', '.join(p.get('keywords', []))}"]
        if p.get("url"):
            l.append(f"- **Link:** {p['url']}")
        if p.get("video"):
            l.append(f"- **Trailer:** {p['video']}")
        l.append("")
    l += ["## Case studies", ""]
    l += [f"- [{c['title']}]({URL}/work.html#{c['id']}) ({c['project']}): {c['summary']}" for c in D["caseStudies"]]
    l += ["", "## Contact", "", f"Email {B['email']} or use the form at {URL}/contact.html."]
    return "\n".join(l) + "\n"


# -------------------------------------------------------------- profile.json
def profile():
    proyectos = []
    for p in D["projects"]:
        q = {k: p[k] for k in ("name", "description", "startDate", "endDate", "url", "keywords") if p.get(k)}
        q["roles"] = [p["role"]]
        q["highlights"] = [p["result"]]
        proyectos.append(q)
    return {
        "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
        "basics": {k: B[k] for k in ("name", "label", "image", "email", "url", "summary", "location", "profiles")},
        "work": [{**{k: w[k] for k in ("name", "position", "startDate", "endDate", "summary", "highlights") if w.get(k)}} for w in D["work"]],
        "education": D["education"],
        "skills": D["skills"],
        "languages": D["languages"],
        "projects": proyectos,
        "meta": {"canonical": f"{URL}/profile.json", "version": "v1.0.0", "lastModified": SITE["lastUpdated"]},
    }


# ------------------------------------------------------------------- JSON-LD
def jsonld():
    persona = {
        "@type": "Person", "@id": f"{URL}/#person", "name": B["name"], "jobTitle": "Senior Unity Developer",
        "description": B["summary"], "url": URL, "image": B["image"], "email": f"mailto:{B['email']}",
        "address": {"@type": "PostalAddress", "addressLocality": B["location"]["city"], "addressCountry": "AR"},
        "sameAs": [p["url"] for p in B["profiles"]],
        "knowsAbout": sorted({k for s in D["skills"] for k in s["keywords"]}),
        "knowsLanguage": ["es", "en"],
        "alumniOf": {"@type": "EducationalOrganization", "name": "Escuela Da Vinci"},
    }
    obras = []
    for p in D["projects"]:
        t = p["type"] if p["type"] in ("VideoGame", "SoftwareSourceCode", "SoftwareApplication") else "CreativeWork"
        o = {"@type": t, "@id": f"{URL}/projects.html#{p['id']}", "name": p["name"], "description": p["description"],
             "creator": {"@id": f"{URL}/#person"}, "keywords": ", ".join(p.get("keywords", []))}
        if p.get("url"):
            o["url"] = p["url"]
        if t == "SoftwareSourceCode":
            o["codeRepository"] = p["repository"]
            o["programmingLanguage"] = p["programmingLanguage"]
        if t == "VideoGame" and p.get("platforms"):
            o["gamePlatform"] = p["platforms"]
        obras.append(o)
    sitio = {"@type": "WebSite", "@id": f"{URL}/#website", "url": URL, "name": f"{B['name']} · Portfolio",
             "inLanguage": SITE["language"], "about": {"@id": f"{URL}/#person"}}
    return {"@context": "https://schema.org", "@graph": [sitio, persona] + obras}


def sitemap():
    l = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p in SITE["pages"]:
        l.append(f"  <url><loc>{URL}{p['path']}</loc><lastmod>{SITE['lastUpdated']}</lastmod></url>")
    for extra in ("/llms.txt", "/llms-full.txt", "/profile.json"):
        l.append(f"  <url><loc>{URL}{extra}</loc><lastmod>{SITE['lastUpdated']}</lastmod></url>")
    return "\n".join(l + ["</urlset>"]) + "\n"


def main():
    chequear()
    index = (RAIZ / "index.html").read_text(encoding="utf-8")
    ini, fin = "<!-- JSONLD:START -->", "<!-- JSONLD:END -->"
    if ini not in index or fin not in index:
        sys.exit("index.html no tiene los marcadores " + ini + " / " + fin)
    bloque = (ini + '\n<script type="application/ld+json">\n'
              + json.dumps(jsonld(), ensure_ascii=False, indent=2) + "\n</script>\n" + fin)
    index = index[: index.index(ini)] + bloque + index[index.index(fin) + len(fin):]

    salidas = {
        "llms.txt": llms(),
        "llms-full.txt": llms_full(),
        "profile.json": json.dumps(profile(), ensure_ascii=False, indent=2) + "\n",
        "sitemap.xml": sitemap(),
        "index.html": index,
    }
    for nombre, texto in salidas.items():
        (RAIZ / nombre).write_text(texto, encoding="utf-8", newline="\n")
        print("escrito", nombre)


if __name__ == "__main__":
    main()
