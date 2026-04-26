import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'

export default function LandingPage() {
  const cursorRef = useRef(null)
  const ringRef   = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Custom cursor
  useEffect(() => {
    const cur  = cursorRef.current
    const ring = ringRef.current
    if (!cur || !ring) return
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      cur.style.left = mx + 'px'
      cur.style.top  = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    const animate = () => {
      rx += (mx - rx) * .13
      ry += (my - ry) * .13
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)

    const grow   = () => { cur.style.width='12px'; cur.style.height='12px'; ring.style.width='42px'; ring.style.height='42px'; ring.style.borderColor='rgba(200,241,53,.6)' }
    const shrink = () => { cur.style.width='8px';  cur.style.height='8px';  ring.style.width='30px'; ring.style.height='30px'; ring.style.borderColor='rgba(200,241,53,.35)' }
    document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })

    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), 60) })
    }, { threshold: .1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    ;['.feat-card', '.feel-card', '.step'].forEach(sel => {
      document.querySelectorAll(sel + '.reveal').forEach((el, i) => { el.style.transitionDelay = (i * .06) + 's' })
    })

    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* Ambient glows */}
      <div className="glow glow-a" />
      <div className="glow glow-b" />

      {/* ── NAV ── */}
      <nav className="landing-nav">
        <Link to="/" className="nav-logo">
          <div className="logo-box">
            <svg viewBox="0 0 13 13" fill="none"><path d="M2 6.5L5.5 10L11 3" stroke="#050709" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          TaskVertex
        </Link>
        <ul className="landing-nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#feel">Benefits</a></li>
        </ul>
        <div className="landing-nav-right">
          <Link to="/login"    className="btn-ghost">Log in</Link>
          <Link to="/register" className="btn-lime-sm">Get Started →</Link>
        </div>
        <button className="land-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span/><span/><span/>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`land-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
        <a href="#how"      onClick={() => setMobileOpen(false)}>How It Works</a>
        <a href="#feel"     onClick={() => setMobileOpen(false)}>Benefits</a>
        <Link to="/login"    onClick={() => setMobileOpen(false)}>Log in</Link>
        <Link to="/register" onClick={() => setMobileOpen(false)}>Get Started Free</Link>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-pill">
          <span className="pill-badge">FREE TO USE</span>
          <span className="pill-sep">—</span>
          <span className="pill-badge">NO CARD NEEDED</span>
        </div>

        <h1>
          <span className="h1-stroke">STOP</span>
          
          <span className="h1-solid">LOSING</span>
          
          <span className="h1-lime">TRACK.</span>
        </h1>

        <p className="hero-tagline">One place for all your tasks. Always clear, always in control.</p>
        <p>TaskFlow is a personal task manager that helps you stay on top of your work every single day — without the chaos of sticky notes, forgotten reminders, or overflowing inboxes.</p>

        <div className="hero-btns">
          <Link to="/register" className="btn-hero">Start For Free →</Link>
          <a href="#how"       className="btn-hero-out">See How It Works</a>
        </div>

        {/* Trust stats */}
        <div className="trust-row">
          <div className="trust-item">
            <div className="trust-val">FREE</div>
            <div className="trust-label">Always free to use</div>
          </div>
          <div className="trust-item">
            <div className="trust-val">FAST</div>
            <div className="trust-label">No loading, no lag</div>
          </div>
          <div className="trust-item">
            <div className="trust-val">SAFE</div>
            <div className="trust-label">Your data, only yours</div>
          </div>
          <div className="trust-item">
            <div className="trust-val">SIMPLE</div>
            <div className="trust-label">No complicated setup</div>
          </div>
        </div>

        {/* Browser mockup — My Tasks view */}
        <div className="hero-mockup">
          <div className="mockup-bar">
            <span className="dot dot-r"/><span className="dot dot-y"/><span className="dot dot-g"/>
            <span className="mockup-url">app.taskvertex.io/dashboard</span>
          </div>
          <div className="mockup-body">
            <div className="mockup-sidebar">
              <div className="ms-logo">
                <div className="ms-logo-dot">
                  <svg viewBox="0 0 13 13" fill="none" width="10" height="10"><path d="M2 6.5L5.5 10L11 3" stroke="#050709" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span>TaskVertex</span>
              </div>
              <div className="ms-item act">⬛ Dashboard</div>
              <div className="ms-item">✓&nbsp; My Tasks</div>
              <div className="ms-item">📅&nbsp; Upcoming</div>
              <div className="ms-divider"/>
              <div className="ms-item ms-logout">↪&nbsp; Log out</div>
            </div>
            <div className="mockup-main">
              <div className="mm-topbar">
                <div className="mm-head">My Tasks</div>
                <button className="mm-add-btn">+ Add Task</button>
              </div>
              <div className="mm-tasks">
                <div className="mm-task">
                  <span className="mm-checkbox done-check">✓</span>
                  <span className="mm-task-title done-title">Planning planning session</span>
                  <span className="mm-task-status status-done">DONE</span>
                  <span className="mm-task-priority prio-low">LOW</span>
                </div>
                <div className="mm-task">
                  <span className="mm-checkbox"/>
                  <span className="mm-task-title">Send proposal to client</span>
                  <span className="mm-task-status status-progress">IN PROGRESS</span>
                  <span className="mm-task-priority prio-high">HIGH</span>
                </div>
                <div className="mm-task">
                  <span className="mm-checkbox"/>
                  <span className="mm-task-title">Review weekly goals</span>
                  <span className="mm-task-status status-progress">IN PROGRESS</span>
                  <span className="mm-task-priority prio-medium">MEDIUM</span>
                </div>
                <div className="mm-task">
                  <span className="mm-checkbox"/>
                  <span className="mm-task-title">Prepare Friday presentation slides</span>
                  <span className="mm-task-priority prio-high">HIGH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider"/>

      {/* ── FEATURES ── */}
      <div className="wrap" id="features">
        <div className="reveal">
          <div className="sec-tag">Features</div>
          <div className="sec-title">Everything you need<br/>to get things done.</div>
          <div className="sec-sub">Simple tools that fit how you already think and work — no complicated setup, no manual to read.</div>
        </div>
        <div className="feat-grid">
          <div className="feat-card reveal"><span className="feat-emoji">🔐</span><div className="feat-title">Your account, locked tight</div><div className="feat-desc">Sign up and log in safely. Your account is private — nobody else can see or touch your tasks. Ever.</div></div>
          <div className="feat-card reveal"><span className="feat-emoji">✅</span><div className="feat-title">Add, edit, check off</div><div className="feat-desc">Creating a task takes 5 seconds. Update it whenever you want. Check it off when you're done. It's that simple.</div></div>
          <div className="feat-card reveal"><span className="feat-emoji">🎯</span><div className="feat-title">Know what matters most</div><div className="feat-desc">Mark tasks as High, Medium, or Low. You always know exactly where to focus your energy first.</div></div>
          <div className="feat-card reveal"><span className="feat-emoji">📅</span><div className="feat-title">Never miss a deadline</div><div className="feat-desc">Set a due date on any task. Overdue tasks are highlighted automatically so nothing quietly slips through the cracks.</div></div>
          <div className="feat-card reveal"><span className="feat-emoji">🔍</span><div className="feat-title">Find anything instantly</div><div className="feat-desc">Filter by status or priority in one tap. No endless scrolling — just the tasks you need, right when you need them.</div></div>
          <div className="feat-card reveal"><span className="feat-emoji">📊</span><div className="feat-title">See your day at a glance</div><div className="feat-desc">Your dashboard shows tasks done, in-progress, and still waiting — so you always know where you stand.</div></div>
        </div>
      </div>

      <hr className="divider"/>

      {/* ── HOW IT WORKS ── */}
      <div className="wrap" id="how">
        <div className="reveal" style={{textAlign:'center',maxWidth:'560px',margin:'0 auto 0'}}>
          <div className="sec-tag">How It Works</div>
          <div className="sec-title">Ready in under<br/>a minute.</div>
          <div className="sec-sub" style={{margin:'0 auto'}}>No tutorials. No configuration. Just four simple steps and you're in.</div>
        </div>
        <div className="steps">
          <div className="step reveal"><div className="step-n">1</div><div className="step-t">Create your account</div><div className="step-d">Sign up with your name and email. Takes 20 seconds and it's completely free.</div></div>
          <div className="step reveal"><div className="step-n">2</div><div className="step-t">Log in anytime</div><div className="step-d">Your account is waiting for you whenever you need it — on any device, any browser.</div></div>
          <div className="step reveal"><div className="step-n">3</div><div className="step-t">Add your tasks</div><div className="step-d">Write down what needs to get done. Add a priority and due date — or keep it simple.</div></div>
          <div className="step reveal"><div className="step-n">4</div><div className="step-t">Check things off</div><div className="step-d">Work through your list, update statuses, and watch your progress build day by day.</div></div>
        </div>
      </div>

      <hr className="divider"/>

      {/* ── BENEFITS ── */}
      <div className="wrap" id="feel">
        <div className="reveal">
          <div className="sec-tag">Why TaskVertex</div>
          <div className="sec-title">Built around how<br/>people actually work.</div>
          <div className="sec-sub">Most apps are either too complicated or too basic. TaskFlow is just right — designed to get out of your way.</div>
        </div>
        <div className="feel-grid">
          <div className="feel-card reveal"><div className="feel-icon">😌</div><div><div className="feel-title">Less mental clutter</div><div className="feel-desc">When everything is written down in one place, you stop holding things in your head. Your brain gets to focus on doing — not remembering.</div></div></div>
          <div className="feel-card reveal"><div className="feel-icon">🎯</div><div><div className="feel-title">Always know what to do next</div><div className="feel-desc">Priorities and due dates mean you're never stuck staring at a list wondering where to start. The answer is always right there.</div></div></div>
          <div className="feel-card reveal"><div className="feel-icon">🔒</div><div><div className="feel-title">Completely private</div><div className="feel-desc">Your tasks belong to you — and only you. No one else can see your account or what's in it. That's a promise.</div></div></div>
          <div className="feel-card reveal"><div className="feel-icon">📱</div><div><div className="feel-title">Works on any device</div><div className="feel-desc">Laptop, phone, tablet — TaskFlow looks great everywhere. Start a task on your computer, check it off on your phone.</div></div></div>
          <div className="feel-card reveal"><div className="feel-icon">⚡</div><div><div className="feel-title">Fast — no waiting around</div><div className="feel-desc">Everything happens instantly. Add a task, update it, delete it — no loading screens, no lag. It just works.</div></div></div>
          <div className="feel-card reveal"><div className="feel-icon">✨</div><div><div className="feel-title">Actually enjoyable to use</div><div className="feel-desc">A clean, beautiful interface that makes you want to open it. When your tools feel good, you actually use them.</div></div></div>
        </div>
        <div className="quote-strip reveal">
          <div className="quote-text">The best task manager is the one you <em>actually use</em> every day — not the one with the most features.</div>
          <div className="quote-sub">That's the idea behind TaskVertex.</div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta reveal">
        <h2>YOUR<br/>MOVE<span>.</span></h2>
        <p>Everything you need to stay organised is already here. Free. Just sign up and start.</p>
        <Link to="/register" className="btn-hero cta-btn">Get Started Free →</Link>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="foot-brand">
          <div className="foot-mark">
            <svg viewBox="0 0 13 13" fill="none" width="11" height="11"><path d="M2 6.5L5.5 10L11 3" stroke="#050709" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          TaskVertex
        </div>
        <div className="foot-copy">Made to help you get things done.</div>
        <div className="foot-links">
          <button onClick={() => {}} className="foot-link-btn">GitHub</button>
          <button onClick={() => {}} className="foot-link-btn">LinkedIn</button>
          <Link to="/login">Log in</Link>
        </div>
      </footer>
    </>
  )
}
