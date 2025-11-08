// Persistent top (name + tagline + top bar). Bottom #view swaps via hash routes.

type Route = 'home' | 'books' | 'classes' | 'contact';

const view = document.getElementById('view') as HTMLElement | null;
const topbar = document.getElementById('primary-nav') as HTMLElement | null;
const navToggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
const yearEl = document.getElementById('year') as HTMLElement | null;

function setYear(): void {
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function setActive(route: Route): void {
  document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach(a => {
    a.classList.toggle('is-active', (a.dataset.route as Route) === route);
  });
}

/* ---------- Route views ---------- */

function homeHTML(): string {
  // HERO ONLY (portrait + about + CTA)
  return `
    <section class="hero">
      <img class="hero-img" src="assets/kim.jpg" alt="Kim Purcell portrait" />
      <div class="hero-copy">
        <h2>About</h2>
        <p>
          Kim Purcell is a novelist and writing teacher who helps kids, teens, and adults
          around the world finish their books and find joy in storytelling. She’s the author of
          <em>Trafficked</em> (Penguin) and <em>This Is Not a Love Letter</em> (Disney/Hyperion).
        </p>
        <p>
          Her upcoming guide, <em>The Busy Writer’s Guide to Finishing a Novel in 100 Days</em>
          (Penguin’s Ten Speed Press), draws on her twenty years of teaching thousands of
          writers to reach their creative goals with less stress and more confidence.
        </p>
        <a class="cta" href="#classes" data-route="classes">Join a Writing Class Today!</a>
      </div>
    </section>
  `;
}

function booksHTML(): string {
  // BOTH BOOK SECTIONS MOVED HERE
  return `
    <section class="section book">
      <img class="book-cover" src="assets/book-love-letter.jpg" alt="This Is Not a Love Letter cover" />
      <div>
        <h3>This Is Not a Love Letter</h3>
        <p>
          Jessie thought a one-week break before graduation would help her and her boyfriend, Chris, clear their heads.
          But when Chris disappears during a run by the river, everything changes. The police say he ran away, but Jessie
          knows better. Chris was a star athlete with a college scholarship and just weeks ago, he was beaten by boys from a
          rival school. Now, as one of the only Black kids in their depressed paper mill town, Jessie is terrified of what might have happened.
        </p>
        <p class="quote">
          “[A] long, beautiful, heart-breaking love letter to potential and possibilities and hope...” – NPR Book Reviews
        </p>
        <a class="btn" href="#" aria-label="Buy This Is Not a Love Letter on Amazon">Buy on Amazon</a>
      </div>
    </section>

    <section class="section book">
      <img class="book-cover" src="assets/book-trafficked.jpg" alt="Trafficked cover" />
      <div>
        <h3>Trafficked</h3>
        <p>
          Hannah believes she's being brought from Moldova to Los Angeles to become a nanny for a Russian family.
          But her American dream quickly spirals into a nightmare. The Platonovs force Hannah to work sixteen-hour days,
          won't let her leave the house, and seem to have a lot of secrets—from Hannah and from each other.
          Stranded in a foreign land with false documents, no money, and nobody who can help her, Hannah must find
          a way to save herself or risk losing the one thing she has left: her life.
        </p>
        <p class="quote">
          “Purcell's well-researched look into human trafficking has the slow pull of a dawning nightmare ...
          Gritty, realistic, and eye-opening.” – Booklist
        </p>
        <a class="btn" href="#" aria-label="Buy Trafficked on Amazon">Buy on Amazon</a>
      </div>
    </section>
  `;
}

function classesHTML(): string {
  // SIMPLE CLASSES PAGE CONTENT
  return `
    <section class="section">
      <h2>Writing Classes</h2>
      <p>
        Practical, encouraging workshops focused on finishing your book with less stress and more confidence.
        All classes include weekly goals, feedback, and community support.
      </p>
      <ul class="classes-list">
        <li><strong>Foundations:</strong> Build a sustainable writing habit and outline your novel.</li>
        <li><strong>Draft in 100 Days:</strong> Guided milestones, accountability, and weekly check-ins.</li>
        <li><strong>Revision Lab:</strong> Restructure scenes, sharpen prose, and prepare for submission.</li>
      </ul>
      <p style="margin-top:12px">
        Curious which class fits you? <a href="#contact" data-route="contact">Get in touch</a> and I’ll recommend the best path.
      </p>
      <a class="btn" href="#contact" data-route="contact" aria-label="Contact about classes">Ask About Classes</a>
    </section>
  `;
}

function contactHTML(): string {
  // SOCIAL ROW + CONTACT CARD
  return `
    <section class="social" aria-labelledby="social-title">
      <h3 id="social-title">Find Kim On...</h3>
      <div class="social-icons">
        <a href="#" aria-label="Social link 1"><img src="assets/social-1.png" alt="" /></a>
        <a href="#" aria-label="Social link 2"><img src="assets/social-2.png" alt="" /></a>
        <a href="#" aria-label="Social link 3"><img src="assets/social-3.png" alt="" /></a>
      </div>
    </section>

    <section class="section contact-card">
      <h2>Contact</h2>
      <p>Questions about books, classes, or events? Send a note:</p>
      <form class="contact-form" onsubmit="return false">
        <label for="name">Name</label>
        <input id="name" name="name" autocomplete="name" required />

        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="email" required />

        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button class="btn" type="submit">Send</button>
      </form>
    </section>
  `;
}

/* ---------- Router ---------- */

function render(route: Route): void {
  if (!view) return;

  switch (route) {
    case 'home':
      view.innerHTML = homeHTML();
      break;
    case 'books':
      view.innerHTML = booksHTML();
      break;
    case 'classes':
      view.innerHTML = classesHTML();
      break;
    case 'contact':
      view.innerHTML = contactHTML();
      break;
    default:
      view.innerHTML = `<section class="section"><h2>Not found</h2></section>`;
  }

  view.focus();
}

function onRoute(route: Route): void {
  setActive(route);
  render(route);
  if (topbar) topbar.setAttribute('aria-expanded', 'false');
}

function initRouter(): void {
  // Delegate clicks on [data-route]
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement | null;
    const anchor = t?.closest?.('[data-route]') as HTMLAnchorElement | null;
    if (anchor?.dataset?.route) {
      e.preventDefault();
      const route = anchor.dataset.route as Route;
      window.location.hash = route;
      onRoute(route);
    }
  });

  // Hash routing
  window.addEventListener('hashchange', () => {
    const route = (location.hash.replace('#', '') || 'home') as Route;
    onRoute(route);
  });

  const initial = (location.hash.replace('#', '') || 'home') as Route;
  onRoute(initial);
}

function initNavToggle(): void {
  if (!topbar || !navToggle) return;
  topbar.setAttribute('aria-expanded', 'false');
  navToggle.addEventListener('click', () => {
    const expanded = topbar.getAttribute('aria-expanded') === 'true';
    topbar.setAttribute('aria-expanded', (!expanded).toString());
    navToggle.setAttribute('aria-expanded', (!expanded).toString());
  });
}

function init(): void {
  setYear();
  initNavToggle();
  initRouter();
  if (view) view.setAttribute('tabindex', '-1');
}

document.addEventListener('DOMContentLoaded', init);