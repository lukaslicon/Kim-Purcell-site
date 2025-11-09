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
  return `
    <section class="hero">
      <img class="hero-img" src="assets/kim.jpg" alt="Kim Purcell portrait" />
      <div class="hero-copy">
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
      <div>
        <img class="book-cover" src="assets/thisisnotaloveletter.jpg" alt="This Is Not a Love Letter cover" />
        <a class="book-btn" href="https://www.amazon.com/This-Not-Love-Letter-Purcell/dp/1484798341/ref=sr_1_1?crid=1134YHTLI75PB&dib=eyJ2IjoiMSJ9.hnhFXpEGTowlN3n531UjO07xTTvj2mvuk3sfuAE_Ocff1VgdBpFltdoKpin9gAv_tB_zgpZdjxefwy0bVfSm134wzzpXecFlmtz_pVB2CuF5QjbRF1geMaBQDggq5GjCJnOOa_Rm3rm1bmzQOzPd78S-sgtJoKgRkNXQ7TLOCMLkYWTHbUwaq6FdNUGxA1inEv6iUAhLqlPHS0pNQLDY1kSHI1nl62fFk1TGaY0IbTw.t4BzvbdHphFyeW41rbs9mFK0iL9doswKUH4zNR-HCTY&dib_tag=se&keywords=this+is+not+a+love+letter&qid=1762583609&sprefix=this+is+not+a+love+lette%2Caps%2C179&sr=8-1" aria-label="Buy This Is Not a Love Letter on Amazon">Buy on Amazon</a>
      </div>
      <div>
        <h3>This Is Not a Love Letter</h3>
        <p>
          Jessie thought a one-week break before graduation would help her and her boyfriend, Chris, clear their heads.
          But when Chris disappears during a run by the river, everything changes. The police say he ran away, but Jessie
          knows better. Chris was a star athlete with a college scholarship and just weeks ago, he was beaten by boys from a
          rival school. Now, as one of the only Black kids in their depressed paper mill town, Jessie is terrified of what might have happened.
        </p>
        <p1>
          “A long, beautiful, heart-breaking love letter to potential and possibilities and hope...” – NPR Book Reviews
        </p1>
        
      </div>
    </section>

    <section class="section book">
      <div>
        <img class="book-cover" src="assets/trafficked.png" alt="Trafficked cover" />
        <a class="book-btn" href="https://www.amazon.com/Trafficked-Kim-Purcell/dp/0670012807/ref=sr_1_1?crid=1RKPVYQHW60OR&dib=eyJ2IjoiMSJ9.68NNkQE_Hj-0w3N9eFQLXZ77IjsnIjKYgIvbUKuANYg.GIYLhHW2B1n1OqNgaf7r-PvUgZMPKRGWB8PcGxHGePM&dib_tag=se&keywords=trafficked+by+kim+purcell&qid=1762583662&sprefix=trafficked+by+k%2Caps%2C194&sr=8-1" aria-label="Buy Trafficked on Amazon">Buy on Amazon</a> 
      </div> 
      <div>
        <h3>Trafficked</h3>
        <p>
          Hannah believes she's being brought from Moldova to Los Angeles to become a nanny for a Russian family.
          But her American dream quickly spirals into a nightmare. The Platonovs force Hannah to work sixteen-hour days,
          won't let her leave the house, and seem to have a lot of secrets—from Hannah and from each other.
          Stranded in a foreign land with false documents, no money, and nobody who can help her, Hannah must find
          a way to save herself or risk losing the one thing she has left: her life.
        </p>
        <p1>
          “Purcell's well-researched look into human trafficking has the slow pull of a dawning nightmare ...
          Gritty, realistic, and eye-opening.” – Booklist
        </p1>
      </div>
    </section>
  `;
}


function classesHTML() {
  return `
    <section class="section classes">
      <h2 class="page-title">Online writing classes for both kids and adults</h2>
      <figure class="classes-figure">
        <img class="classes-img" src="assets/writeanovel.jpg" alt="Kids and teens writing class" />
      </figure>

      <p class="classes-lede">
        Do your kid have a passion for storytelling and want to write a book?
        Let me help help them accomplish your goals. Sign them up for one of my
        fun and uplifting classes for kids and teens!
      </p>

      <p class="classes-body">
        I teach kids and teens how to write and publish their own chapter books and novels in
        engaging, supportive online classes. My students build confidence, creativity, and strong
        writing skills through fun, multi-sensory prompts and personalized feedback. For younger
        writers, you can join group classes and camps through <strong>Outschool</strong>. For private
        lessons and adults classes starting in January, reach out directly at
        <a href="mailto:kim@kimpurcell.com">kim@kimpurcell.com</a>.
      </p>

      <figure class="classes-figure">
        <img class="classes-img" src="assets/publish.jpg" alt="Kids and teens writing class" />
      </figure>

      <h3 class="section-subtitle">Online Writing Classes Through Outschool</h3>

      <p class="classes-body">
        I offer continuous and drop-in writing classes for kids and teens through Outschool.
        Over 300 5-star ratings and counting! I specialize in teaching writing through storytelling
        in fun, inclusive classes. When you help students use their imagination and you make writing
        fun, their writing improves in every area.
      </p>

      <figure class="classes-figure">
        <img class="classes-img" src="assets/outschool.png" alt="Outschool class overview" />
      </figure>
    </section>
  `;
}


function contactHTML(): string {
  // SOCIAL ROW + CONTACT CARD
  return `
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