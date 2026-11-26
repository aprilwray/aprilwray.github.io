# April Wray — portfolio

Static site for [aprilwray.github.io](https://aprilwray.github.io). Plain HTML and CSS, served from the repository root. There is no build step and no JavaScript.

Edit a file, commit it to `main`, and GitHub Pages will publish the change.

## Turn GitHub Pages on

The live site is the root of the `main` branch. A pull request does not update the public site until it is merged.

1. Merge the portfolio pull request into `main`.
2. On GitHub, open the repository **aprilwray/aprilwray.github.io**.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Set **Branch** to `main` and **Folder** to **/ (root)**. Save.
6. Give it a minute. The site will be at <https://aprilwray.github.io/>.

If Pages offers GitHub Actions as the source, choose **Deploy from a branch** instead. There is no install or build command.

Keep the repository name as `aprilwray.github.io`. That name is what publishes the site at the root of `aprilwray.github.io`. Do not add a custom domain unless you have one ready.

## How the files are organised

```
index.html              Home
about.html              About
services.html           Services
contact.html            Contact
work/index.html         Work index, with the Wellness / All brands / Employment filter
work/*.html             One page per case study or employment showcase
404.html                Missing-page message
assets/css/styles.css   All visual styles. Colours and type are in :root at the top.
assets/fonts/           Self-hosted Fraunces and Source Sans 3
assets/images/          Photographs and screenshots, already resized
favicon.svg             Browser icon
```

## How to edit

- **Words.** Open the `.html` file for that page and change the text. Leave the tags around it (`<p>`, `<h2>`, `<a>`).
- **A link to a live client site.** Find the address inside `href="..."` on that case-study page.
- **Colours.** In `assets/css/styles.css`, edit the values under `:root`. Sage, cream and terracotta are the ones that set the mood.
- **A photograph or screenshot.** Export a compressed WebP or JPEG, put it in the matching folder under `assets/images/`, and point the `<img src>` at it. Set `width` and `height` to the file’s real pixel size so the page does not jump while it loads. Homepage screenshots look best with `class="top"` so the card crop keeps the top of the page.
- **Navigation labels.** The header and the footer are copied into every HTML file. Search the project for the label and update each one.
- **A new project.** Duplicate a file in `work/`, change the words, then add a card in `work/index.html` (and on `index.html` if it should be featured). Give the card `data-group` by placing it in the Wellness, Other industries, or Employment section.

To preview on your own computer, from the repository folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening an HTML file directly from the desktop will not load the styles, because the links start at the site root.

## Placeholders to fill

Search the project for `[ADD`. Each one is also marked on the page: a sand panel with a terracotta edge, or a dashed link. Replace the token, including inside `href` and `mailto:`.

### On every page (footer)

| Token | What to put there |
| --- | --- |
| `[ADD EMAIL]` | The real address. It appears as the visible text and inside `mailto:` in the footer of every page, and again on `contact.html`. Replace every occurrence. |
| `[ADD INSTAGRAM URL]` | Full Instagram URL, in the footer link. After it works, you can shorten the link text to “Instagram”. |
| `[ADD LINKEDIN URL]` | Full LinkedIn URL, same as Instagram. |

### Images

| Where | Token |
| --- | --- |
| `about.html` | `[ADD IMAGE]` A portrait, if you want one. Delete the block to keep the page as type only. |
| `work/index.html` and `work/intuitive-healing-with-jo.html` | `[ADD IMAGE]` Homepage screenshot, plus approved product photos, planner, booklet or video stills. |
| `work/kindred-souls-collective.html` | `[ADD IMAGE]` Class-booking carousel. The current file is **not on the site**. It repeats the word “of” in “BREAK FREE OF OF YOUR CONSTANT EXHAUSTION”. Fix that, then add the image. |
| `work/monument-homes.html` and its card on `work/index.html` | `[ADD IMAGE]` Homepage screenshot of monumenthomes.com.au. Do not use an error or blocked-page capture. |
| `work/tickets-in-a-hat.html` | `[ADD IMAGE]` A real homepage screenshot. The illustration already on the page is not a substitute. |
| `work/capstone-industries.html` | `[ADD IMAGE]` A brochure, spec sheet or capability statement, if it is yours to publish. |

### Results — do not invent these

No traffic, sales, ranking or follower figure is published. Add one only with a source you are happy to show (a screenshot or an export), then delete the placeholder.

| Page | What is waiting |
| --- | --- |
| Intuitive Healing with Jo | `[ADD RESULT]` Website, shop or email figures, once Jo agrees. Later Instagram or Google Business figures. Early 2025 insight screenshots exist; **the numbers are deliberately not on this site** until she says they can be. |
| Nova Holistic Spa | `[ADD RESULT]` July 2024 SEO report figures, once Nova and Tomedia agree. Bookings, gift-card sales, or a later month. **The report numbers are not on this site.** |
| Gold & Sage | `[ADD RESULT]` Launch date, traffic, sales or social performance. |
| Tea by Birdy | `[ADD RESULT]` Ad performance, blog or email or social figures, any sales lift. |
| Kindred Souls Collective | `[ADD RESULT]` Instagram, class bookings or email performance. |
| Holy Threads | `[ADD RESULT]` Launch date, sales, traffic or social performance. |
| Monument Homes | `[ADD RESULT]` Launch year, enquiries, traffic or campaigns. |
| Tickets in a Hat | `[ADD RESULT]` Real launch or fundraising figures only. **Never quote the numbers drawn on the analytics illustration.** Those are demo art. |
| Capstone Industries | `[ADD RESULT]` Search Console figures for the six-month window, rankings, and any enquiry or conversion change. Resume claims are not repeated here. |
| Sunflower Community Supports | `[ADD RESULT]` Search, Google Ads, Facebook Ads, social, and expo or referral figures, with the domain named. |

### Details and credits

| Page | What is waiting |
| --- | --- |
| Intuitive Healing with Jo | `[ADD DETAIL]` Whether the WordPress shop was built from scratch or taken over. |
| Gold & Sage | `[ADD CREDIT]` Photography. Add your name only if you shot the images or art-directed them. |
| Tea by Birdy | `[ADD DETAIL]` Which Tea Journal posts are yours, and the Instagram handle once you have confirmed it. The Shopify theme is not claimed as your build. |
| Kindred Souls Collective | `[ADD DETAIL]` Formal role, dates, credit list, and the studio’s current public name. This page is social and copy only. The website is VisiBelle’s. |
| Holy Threads | `[ADD CREDIT]` What you personally delivered, versus development or photography. |
| Tickets in a Hat | `[ADD DETAIL]` Credit list, year, and the public Tomedia case-study link. |
| Sunflower Community Supports | `[ADD DETAIL]` Confirm the `.com` address, what to say about `.com.au`, and which pages and photography are yours. |

## Before you share the link

The pages name the clients, because a portfolio has to. Please check you have permission before the site is public:

- **Jo** — name, website, creative, and any social screenshots. Anything about support work stays off the site.
- **Nova and Tomedia** — name, the screenshots, and the July 2024 SEO figures if you decide to add them.
- **Gold & Sage, Holy Threads, Monument Homes, Tickets in a Hat, Tea by Birdy** — name, and the images on each page. Tea by Birdy also needs which Journal posts are yours.
- **Kelly / Kindred Souls** — name, the carousel, and whether the studio is still called Kindred Souls Collective.
- **Tomedia** — describing this work as delivered while you were Project Manager / Content Writer, and leaving the “Site by Tomedia” / “Made by Tomedia” lines in place.
- **Capstone Industries** — showing the live site and the November 2026 screenshot. The Portal in the navigation is not described as your 2023–2024 build.
- **Sunflower Community Supports** — you still work here. The page is general on purpose: public website and marketing brief only, no participant stories. Get employer agreement before it is public, and confirm which parts of the rebuild are yours.

## What was deliberately left out

- Jo’s Instagram insight numbers, and Nova’s July 2024 SEO report numbers.
- The Kindred Souls “Join our next class” carousel, until the repeated “of” is fixed.
- Any dollar or ticket count printed inside the Tickets in a Hat illustration.
- Keto cookbook and meal planners for Jo, the Nova “Skin Health” copy document, and the Kindred VibroSound booklet — those were not confirmed as part of the public credit.
- Participant stories, reviewer names, intake detail and internal operations for Sunflower.
