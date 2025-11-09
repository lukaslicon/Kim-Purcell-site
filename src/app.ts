// Persistent top (name + tagline + top bar). Bottom #view swaps via hash routes.

type Route = 'home' | 'books' | 'classes' | 'contact';

function isRoute(v: unknown): v is Route {
  return v === 'home' || v === 'books' || v === 'classes' || v === 'contact';
}

function getRouteFromHash(): Route {
  // supports "#books" and "#/books"
  const raw = location.hash.replace(/^#\/?/, '');
  return isRoute(raw) ? raw : 'home';
}

const view = document.getElementById('view') as HTMLElement | null;
const topbar = document.getElementById('primary-nav') as HTMLElement | null;
const navToggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
const yearEl = document.getElementById('year') as HTMLElement | null;

function setYear(): void {
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

if (view && view.focus) view.focus({ preventScroll: true });

window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); // or 'smooth'


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
          around the world finish their books and find joy in storytelling. She's the author of
          <em>Trafficked</em> (Penguin) and <em>This Is Not a Love Letter</em> (Disney/Hyperion).
        </p>
        <p>
          Her upcoming guide, <em>The Busy Writer's Guide to Finishing a Novel in 100 Days</em>
          (Penguin's Ten Speed Press), draws on her twenty years of teaching thousands of
          writers to reach their creative goals with less stress and more confidence.
        </p>
        <a class="book-btn" href="#classes" data-route="classes">Join a Writing Class Today!</a>
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
          “A long, beautiful, heart-breaking love letter to potential and possibilities and hope...” - NPR Book Reviews
        </p1>
        <p1>
        “Part love story, part mystery, this brave novel will make you feel, wonder, and think.” –Tamara Ireland Stone, New York Times best-selling author of Every Last Word
        </p1>
        <p class="left-middle-smaller no-bubble"><b>NPR'S BEST BOOKS OF 2018</b></p>
        <p class="left-middle-smaller no-bubble"><b>A MIGHTY GIRL BOOK OF 2018</b></p>
        <p class="left-middle-smaller no-bubble"><b>STARRED KIRKUS REVIEW</b></p>
       
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
          Gritty, realistic, and eye-opening.” - Booklist
        </p1>
        <p class="left-middle-smaller no-bubble"><b>Bankstreet College of Education Best Children's Books of 2013 - 14 and Older</b></p>
        <p class="left-middle-smaller no-bubble"><b>Eliot Rosewater Indiana High Shool Book Award List 2013</b></p>
      </div>
    </section>

    
    <section class="section bookwriting">
      <figure class="classes-figure-small">
        <img class="classes-img-small" src="assets/tenspeeds.png" alt="publisher logo" />
      </figure>

      <p class="classes-lede">
        Penguin is publishing my writing craft book!
      </p>
      <p class="left-middle">Penguin's Ten Speed Press is publishing my writing craft book, The Busy Writer's Guide to Finishing a Novel in 100 Days. This press has published two of my favorite writing craft books, Story Genius by Lisa Cron and Save the Cat by Blake Snyder. More great news: Donald Maass, one of my favorite craft book writers, has offered to write the foreword. If you've been in my classes, you know I love all of his craft books, especially Writing the Breakout Novel. In my book on writing, I take a progressive approach to writing, since this is how people learn anything, and this is how I help busy people finish books.</p>
      <h4 class="left-middle">What is the Busy Writer Method?</h4>
      <p class="left-middle"> Nowadays, everyone is busy: kids, teens, adults. So, how do you fit in the dream of writing a book? The Busy Writer Method is a faster and easier method of writing a book. It's based on research, my experience as a mom and novelist, a journalism degree and an MFA, and twenty years of teaching experience. I've taught thousands of people all over the world how to write, finish, and publish their books using this method.</p>
      <h4 class="left-middle">How does it work? You write for at least 15 minutes a day and build your skills in a progressive way.</h4>
      <p class="left-middle">When you learn any new skill, you need to build your skills from the basics. There are progressive skills for storytelling and novel-writing as well. Unfortunately, most of the time it's usually not taught in this way. You're thrown into the deep end. No wonder you feel like you're drowning!.</p>
      <p class="left-middle">In my class and in my guide, I help you build these skills in a progressive way as you write your draft.  First, develop the characters and the world. Then, you come up with a coherent plot, based on a four-act plot structure. I will give you skills for every time you sit down so you never feel overwhelmed or stuck. You simply open the guide and you know exactly what to do. Dive into your imagination for a minimum of 15 minutes a day and you'll finish a book. I can't wait to cheer you on!</p>

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
        Do you have a passion for storytelling and want to write a book?
        Let me help them accomplish your goals. Sign them up for one of my
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

      <figure class="yt-one">
        <iframe src="https://www.youtube.com/embed/a2JH0_sJYvw?si=AZEitGJPl-Vg109R" allowfullscreen></iframe>
      </figure>

      <section class="outschool-block">
        <h3 class="centered-head">2025 Schedule for Kids and Teens Classes</h3>
        <h4 class="left-head">Small Group Classes</h4>

        <p class="classes-body-outschool">When: Varying times five days a week</p>
        <p class="classes-body-outschool">Small Classes for kids 8-18: <a href="https://outschool.com" target="_blank" rel="noopener">Outschool.com</a></p>

        <div class="outschool-cta">
          <img class="outschool-logo" src="assets/outschoollogo.png" alt="Outschool logo" />
          <a class="cta-btn" href="https://outschool.com/teachers/Kim-Purcell" target="_blank" rel="noopener">
            Click to Explore my Outschool Writing Classes
          </a>
        </div>
        <h3 class="centered-head">2025: Schedule for Adult Writing Classes</h3>
        <figure class="classes-figure-write classes-figure-write">
          <img class="classes-img-write" src="assets/writewithkim.png" alt="Adult classes hero">
        </figure>
        <h4 class="left-head">The Busy Writers WorkShop</h4>
        <p class="classes-body"><b>Live Class Time:</b> Wednesdays starting in January, 6-7 PM PST (5:30 PM PST - free writing time)</p>
        <p class="classes-body"><b>Where:</b> <a href="https://zoom.us" target="_blank" rel="noopener">Zoom</a></p>
        <p class="classes-body"><b>Live Class Description:</b> 30 Minutes Discussion, Brainstorming, and Craft Talk, 25 Minutes Writing. (The class opens at 5:30 for flex writing time before the class starts.)</p>
        <p class="classes-body"><b>What Other Help Is Included:</b> A weekly guide with daily craft focuses, a bonus audio lecture, 5 days a week writing posts and accountability.</p>
        <dl class="kv">
          <div class="kv-row">
            <dt>Cost:</dt>
            <dd>$400 for 20 Weeks of Classes. 200 if you sign up by December 1st! PLUS: if you finish 60,000 words…</dd>
          </div>
        </dl>
        <p class="classes-body"><b>The Busy Writer Asynchronous Class:</b> In 100 days of writing, your novel will be finished! You'll receive a weekly email with a video and a skills focus for your writing. Start at any time. Every week, you write a chapter. No time to write? You write a summary of a chapter. No matter what, you move forward in your book. You have the option of an accountability email or text every day for your word count. Once a week, you can send me chapters and questions.</p>
      </section>
    
      <p class="classes-lede">
        For the FREE BUSY WRITER START-UP PACKAGE email kim@kimpurcell.com
      </p>
      <p class="classes-body">Ask for the free package to get you started! It includes the step by step digital PDF with activities to help you brainstorm your story, plot, characters, and world, and ten videos on the core skills you'll need to start writing your book. This is a gift from me to you to get you started. </p>


      <section class="youtube-block">
        <h3 class="centered-head underline">Writing Lessons on Youtube</h3>
        <div class="yt-intro">
          <img class="yt-badge" src="assets/youtube.png" alt="YouTube logo" />
          <p class="classes-body">
            On my YouTube video channel for kids: "Anyone Can Write a Book," you'll find
            a wide variety of fun, free creative writing lessons for kids.
          </p>
        </div>

        <div class="yt-grid">
          <div class="yt-video">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/BRYjAqjrTUQ?si=sxiHjRIqoH7aj3Bt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div class="yt-video">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/1Q54AoHti44?si=-AkTy1dXHS4SWShX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </section>


  

    </section>
    
  `;
}



function contactHTML(): string {
  // SOCIAL ROW + CONTACT CARD
  return `
    <section class="section contactwriting">
      <h4 class="classes-lede">Privates, Editing, and Publishing for Adults and Kids</h4>
      <p class="classes-body"><b>Cost for Privates:</b> 100 for an hour of online live instruction. (On Outschool, it's 100 for 45 minutes). For live in-person in Santa Monica or Culver City, it's 150 per hour. </p>
      <p class="classes-body"><b>Cost for Editing: </b> I do developmental editing for 100 an hour. I can read and give feedback on around 5000-7500 words in that time period, depending on how much work it needs. </p>
    </section>
      <p class="classes-lede-smaller">
        I help writers publish their books on Lulu.com and Amazon. You can follow my free YouTube video tutorial, or I can guide you through the process for my hourly rate of $100. If you prefer a full-service option where I handle everything, prices range from $500 to $5000 depending on the manuscript’s length, format, and extras. The publishing tutorial is below. 
      </p>
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

        <button class="book-btn" type="submit">Send</button>
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
    onRoute(getRouteFromHash());
  });

  const initial = getRouteFromHash();
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


document.querySelectorAll<HTMLAnchorElement>('.nav-link[data-route]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const r = a.dataset.route;
    if (!isRoute(r)) return;            // ignore unknown data-route values
    history.pushState({}, '', `#/${r}`); // use "#/route" to avoid anchor jumps
    onRoute(r);
    view?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });
});

function init(): void {
  setYear();
  initNavToggle();
  initRouter();
  if (view) view.setAttribute('tabindex', '-1');
}

document.addEventListener('DOMContentLoaded', init);