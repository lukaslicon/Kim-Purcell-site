// Persistent top (name + tagline + top bar). Bottom #view swaps via hash routes.
// Colors/structure match the PDF; Home view includes kim.jpg, social row, and two books.

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

function homeHTML(): string {
  return `
    <!-- HERO -->
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

    <!-- SOCIAL -->
    <section class="social" aria-labelledby="social-title">
      <h3 id="social-title">Find Kim On...</h3>
      <div class="social-icons">
        <a href="#" aria-label="Social link 1"><img src="assets/social-1.png" alt="" /></a>
        <a href="#" aria-label="Social link 2"><img src="assets/social-2.png" alt="" /></a>
        <a href="#" aria-label="Social link 3"><img src="assets/social-3.png" alt="" /></a>
      </div>
    </section>

    <!-- BOOK: This Is Not a Love Letter -->
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

    <!-- BOOK: Trafficked -->
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

function render(route: Route): void {
  if (!view) return;
  if (route !== 'home') {
    view.innerHTML = `
      <section class="section">
        <h2 style="margin-top:0">Coming soon</h2>
        <p>The top stays fixed; only this area will change when routes are implemented.</p>
      </section>
    `;
    view.focus();
    return;
  }
  view.innerHTML = homeHTML();
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
  if (view) view.setAttribute('tabindex', '-1'); // for skip-link/focus on route change
}

document.addEventListener('DOMContentLoaded', init);