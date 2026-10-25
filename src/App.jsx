import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { basics, changes, chat, nav, products, sectors, stats, steps, terms, tools } from './content.js'

// ---- jargon popovers -------------------------------------------------------

const TermContext = createContext(null)

function TermProvider({ children }) {
  const [open, setOpen] = useState(null) // { key, el }
  const popRef = useRef(null)
  const [pos, setPos] = useState(null)

  useEffect(() => {
    if (!open) return
    const place = () => {
      const r = open.el.getBoundingClientRect()
      const w = Math.min(300, window.innerWidth - 32)
      const left = Math.max(16, Math.min(r.left, window.innerWidth - w - 16))
      setPos({ left: left + window.scrollX, top: r.bottom + window.scrollY + 8, width: w })
    }
    place()
    const onDown = (e) => {
      if (!popRef.current?.contains(e.target) && !open.el.contains(e.target)) setOpen(null)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('resize', place)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', place)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = (key, el) => setOpen((cur) => (cur?.key === key && cur.el === el ? null : { key, el }))

  return (
    <TermContext.Provider value={{ open, toggle }}>
      {children}
      {open && pos && (
        <div ref={popRef} className="pop" role="status" style={pos}>
          <strong>{terms[open.key].label}</strong>
          {terms[open.key].def}
        </div>
      )}
    </TermContext.Provider>
  )
}

function Term({ k, children }) {
  const { open, toggle } = useContext(TermContext)
  const ref = useRef(null)
  const isOpen = open?.el === ref.current && open?.key === k
  return (
    <button ref={ref} type="button" className="term" aria-expanded={isOpen} onClick={() => toggle(k, ref.current)}>
      {children ?? terms[k].label}
    </button>
  )
}

// Renders copy arrays like ['Text ', { term: 'crm' }, '.']
function Rich({ parts }) {
  return parts.map((p, i) => (typeof p === 'string' ? p : <Term key={i} k={p.term}>{p.text}</Term>))
}

// ---- layout ----------------------------------------------------------------

function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

const navIds = nav.map((n) => n.id)

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(navIds)
  return (
    <header className="site">
      <div className="wrap bar">
        <a className="mark" href="#top" aria-label="SparkTG concept, top of page">
          <i />SparkTG
        </a>
        <nav id="nav" className={menuOpen ? 'open' : ''} aria-label="Main">
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={active === n.id ? 'on' : ''} onClick={() => setMenuOpen(false)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn solid sm hide-sm" href="#talk">Get a call</a>
        <button className="menu-btn" aria-expanded={menuOpen} aria-controls="nav" onClick={() => setMenuOpen((o) => !o)}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  )
}

function Section({ id, eyebrow, title, intro, className = '', children }) {
  return (
    <section id={id} className={className}>
      <div className="wrap">
        <div className="head">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
          {intro && <p className="intro">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

// ---- sections --------------------------------------------------------------

function ChatDemo() {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(chat.length)
      return
    }
    const timers = chat.map((_, i) => setTimeout(() => setShown(i + 1), 500 + i * 1100))
    return () => timers.forEach(clearTimeout)
  }, [])
  return (
    <div className="call" aria-label="An example customer call, illustrative">
      <div className="call-head">
        <span><b className="live" /> Example call</span>
        <span>Shop order enquiry</span>
      </div>
      {chat.map((m, i) => (
        <div key={i} className={`msg ${m.from} ${i < shown ? 'in' : ''}`}>
          <small>{m.from === 'caller' ? 'Customer' : 'SparkTG assistant'}</small>
          <p>{m.text}</p>
        </div>
      ))}
      <p className="call-foot">An illustrative conversation written for this concept.</p>
    </div>
  )
}

function Hero() {
  return (
    <div id="top" className="hero">
      <div className="wrap grid">
        <div>
          <p className="eyebrow">Calls · WhatsApp · Assistants</p>
          <h1>Answer every customer, on call or WhatsApp.</h1>
          <p className="lede">
            SparkTG puts your phone calls, WhatsApp chats and automated assistants in one place, so no customer waits
            and nothing gets missed.
          </p>
          <div className="cta">
            <a className="btn solid" href="#talk">Get a call</a>
            <a className="btn" href="#how">See how it works</a>
          </div>
          <p className="cta-note">Underlined words open a short, plain explanation.</p>
        </div>
        <ChatDemo />
      </div>
    </div>
  )
}

function What() {
  return (
    <Section
      id="what"
      eyebrow="In short"
      title="What SparkTG is, in three lines"
      intro="A business that gets many customer calls usually needs more than a phone. SparkTG covers these three parts."
    >
      <div className="cards three">
        {basics.map((b) => (
          <div className="card" key={b.title}>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
            <Term k={b.term}>{b.ask}</Term>
          </div>
        ))}
      </div>
    </Section>
  )
}

function RouteDiagram() {
  return (
    <figure className="route">
      <svg viewBox="0 0 960 230" role="img" aria-labelledby="routeTitle routeDesc">
        <title id="routeTitle">How a call is routed</title>
        <desc id="routeDesc">
          A customer's call reaches a menu. From the menu, routine questions go to an assistant and other requests go to
          your team. Both outcomes are recorded in your CRM.
        </desc>
        <g fill="none" stroke="#10264A" strokeWidth="1.6" strokeLinecap="round">
          <path d="M150 115 H258" />
          <path d="M392 115 C 430 115, 430 56, 478 56" />
          <path d="M392 115 C 430 115, 430 174, 478 174" />
          <path d="M658 56 C 706 56, 706 115, 752 115" />
          <path d="M658 174 C 706 174, 706 115, 752 115" />
        </g>
        <g fill="none" stroke="#FFB020" strokeWidth="3.2" strokeLinecap="round" className="flow">
          <path d="M150 115 H258" />
          <path d="M392 115 C 430 115, 430 56, 478 56" />
          <path d="M658 56 C 706 56, 706 115, 752 115" />
        </g>
        <g fontFamily="Familjen Grotesk, system-ui, sans-serif" fontSize="17" fill="#10264A">
          {[
            [30, 92, 120, 'Customer'],
            [258, 92, 134, 'Call menu'],
            [478, 33, 180, 'Assistant answers'],
            [478, 151, 180, 'Your team helps'],
            [752, 92, 178, 'Saved in your CRM'],
          ].map(([x, y, w, label]) => (
            <g key={label}>
              <rect x={x} y={y} width={w} height="46" rx="10" fill="#fff" stroke="#D3DAE4" />
              <text x={x + w / 2} y={y + 28} textAnchor="middle">{label}</text>
            </g>
          ))}
        </g>
        <g fontFamily="Familjen Grotesk, system-ui, sans-serif" fontSize="14" fill="#4F5F78">
          <text x="410" y="38" textAnchor="end">routine questions</text>
          <text x="410" y="204" textAnchor="end">everything else</text>
        </g>
      </svg>
      <figcaption>The amber path shows a routine question being answered by an assistant.</figcaption>
    </figure>
  )
}

function How() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title="How a typical setup works"
      intro="Four steps from signing up to seeing results. These steps are illustrative; SparkTG can confirm its own process."
    >
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="num">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p><Rich parts={s.text} /></p>
          </li>
        ))}
      </ol>
      <RouteDiagram />
    </Section>
  )
}

function Products() {
  return (
    <Section
      id="products"
      eyebrow="Products"
      title="What you get"
      intro="SparkTG lists these products on its site. Each one is described here in plain words."
    >
      <dl className="rows">
        {products.map((p) => (
          <div className="row" key={p.name}>
            <dt>{p.name}</dt>
            <dd><Rich parts={p.text} /></dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

function Who() {
  return (
    <Section
      id="who"
      eyebrow="Industries"
      title="Who it's for"
      intro="SparkTG has pages for these four sectors. The examples below are written for this concept."
    >
      <div className="cards four">
        {sectors.map((s) => (
          <div className="card" key={s.name}>
            <h3>{s.name}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Proof() {
  return (
    <section id="proof" className="proof">
      <div className="wrap">
        <p className="eyebrow">Numbers</p>
        <h2>What SparkTG says about itself</h2>
        <div className="stats">
          {stats.map((s) => (
            <div key={s.value}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <blockquote>
          “A 50% drop in call handling time.”
          <cite>RetailHub India's operations manager, per SparkTG's website</cite>
        </blockquote>
        <p className="small">
          All figures are SparkTG's own claims from sparktg.com. The current site shows three different uptime numbers
          (99.9%, 99.99% and 99.2%), so this concept leaves uptime out until SparkTG confirms one.
        </p>
      </div>
    </section>
  )
}

function Tools() {
  return (
    <Section id="tools" eyebrow="Integrations" title="Works with the tools you already use" intro="SparkTG says it has 100+ integrations in total. A few of them:">
      <ul className="chips">
        {tools.map((t) => <li key={t}>{t}</li>)}
        <li className="more">+ more</li>
      </ul>
    </Section>
  )
}

function Changes() {
  return (
    <Section
      id="changes"
      eyebrow="About this concept"
      title="What this concept changes"
      intro="A first-time visitor's four reactions to the current site, and what this version does about each."
    >
      <div className="cards two">
        {changes.map((c) => (
          <div className="card change" key={c.problem}>
            <h3>{c.problem}</h3>
            <p>{c.fix}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Talk() {
  return (
    <section id="talk" className="talk">
      <div className="wrap talk-box">
        <div>
          <h2>Talk to a person.</h2>
          <p className="intro">Ask for a call back, or ring SparkTG directly. In this concept the buttons are for show.</p>
        </div>
        <div className="cta">
          <a className="btn solid" href="#top">Get a call</a>
          <a className="btn" href="#how">See how it works</a>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <TermProvider>
      <a className="skip" href="#main">Skip to content</a>
      <div className="notice">
        <div className="wrap">
          <p>
            <strong>Unofficial redesign concept</strong> by Samaira Sahay, a student. Not made by or connected to
            SparkTG. Facts come from sparktg.com, read on 24 October 2026. Buttons here don't send anything.
          </p>
        </div>
      </div>
      <Header />
      <main id="main">
        <Hero />
        <What />
        <How />
        <Products />
        <Who />
        <Proof />
        <Tools />
        <Changes />
        <Talk />
      </main>
      <footer>
        <div className="wrap">
          <p>
            This page is an unofficial redesign concept made by Samaira Sahay as a student exercise. It is not made by,
            endorsed by or connected to SparkTG, and it uses no SparkTG logo, customer logos or contact details.
          </p>
          <p>
            Sources: sparktg.com and sparktg.com/blog, read on 24 October 2026. Illustrative content is labelled as
            such. Anything not on SparkTG's site is the author's own wording.
          </p>
        </div>
      </footer>
    </TermProvider>
  )
}
