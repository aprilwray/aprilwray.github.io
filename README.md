# April Wray — portfolio

Static site for [aprilwray.github.io](https://aprilwray.github.io). Plain HTML and CSS, plus one self-hosted script for the homepage helix. No build step and no CDN. Edit a file, commit it to `main`, and GitHub Pages publishes it.

## Turn GitHub Pages on

1. Merge the redesign pull request into `main`.
2. Open the repository **aprilwray/aprilwray.github.io** on GitHub.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Set **Branch** to `main` and **Folder** to **/ (root)**. Save.
6. The site will be at <https://aprilwray.github.io/> after a minute or two.

There is no install or build command. If Pages offers GitHub Actions, choose **Deploy from a branch**.

Preview on your computer from this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening an HTML file straight from the desktop will not load the styles, because the links start at the site root.

## How to edit the words

Open the `.html` file for that page and change the text. Leave the tags around it (`<p>`, `<h1>`, `<a>`).

| Page | File |
| --- | --- |
| Home | `index.html` |
| Work | `work/index.html` |
| Each project | `work/` plus the project name, for example `work/nova-holistic-spa.html` |
| Services | `services.html` |
| About | `about.html` |
| Contact | `contact.html` |
| Missing page | `404.html` |

Colours and type live at the top of `assets/css/styles.css`, under `:root`.

The header and footer are copied into every HTML file. Search the project for a label if you change it.

## Images

Every picture is a normal image file. Nothing important is painted in the CSS. Above each picture in the HTML there is a comment like:

```html
<!-- IMAGE: replace /assets/images/work/nova-holistic-spa/card.webp (recommended 1200x900) -->
```

### Swap one image

1. Export a new photo or screenshot at the size in the table (or close to that shape). WebP or JPEG is fine. Keep the file reasonably small.
2. On GitHub, open the folder that holds the current file.
3. Choose **Add file → Upload files**.
4. Upload your new file **with the same name** as the one you are replacing (for example `card.webp`).
5. Commit the upload. The page updates on its own. You do not need to touch the HTML if the name stays the same.

To point a page at a different filename, change the `src="..."` on that `<img>` and keep the `width` and `height` numbers close to the real pixel size so the page does not jump while the picture loads.

### Every image

| File | Where it shows | Recommended size |
| --- | --- | --- |
| `assets/images/work/nova-holistic-spa/card.webp` | Homepage helix and Work index | 1200×900 |
| `assets/images/work/nova-holistic-spa/gallery-01.webp` | Nova case study, desktop homepage | 1600×1100 |
| `assets/images/work/nova-holistic-spa/gallery-02.webp` | Nova case study, phone | 430×932 |
| `assets/images/work/nova-holistic-spa/gallery-03.webp` | Nova case study, bathhouse services | 1600×1100 |
| `assets/images/work/gold-and-sage/card.webp` | Home spread and Work index | 1200×900 |
| `assets/images/work/gold-and-sage/gallery-01.webp` | Gold & Sage homepage | 1600×900 |
| `assets/images/work/gold-and-sage/gallery-02.webp` | Lifestyle picnic | 1600×1100 |
| `assets/images/work/gold-and-sage/gallery-03.webp` | Morning Sun tin | 1200×1200 |
| `assets/images/work/gold-and-sage/gallery-04.webp` | Velvet Star tin | 1200×1200 |
| `assets/images/work/gold-and-sage/gallery-05.webp` | Evening Cloud tin | 1200×1200 |
| `assets/images/work/kindred-souls-collective/card.webp` | Home spread and Work index | 1200×900 |
| `assets/images/work/kindred-souls-collective/gallery-01.webp` | Education carousel | 1200×1200 |
| `assets/images/work/holy-threads/card.webp` | Home spread and Work index | 1200×900 |
| `assets/images/work/holy-threads/gallery-01.webp` | Storefront | 1600×900 |
| `assets/images/work/holy-threads/gallery-02.webp` | Don’t Be Afraid tee | 1200×1500 |
| `assets/images/work/tea-by-birdy/card.webp` | Work index | 1200×900 |
| `assets/images/work/tea-by-birdy/gallery-01.webp` | Shopify homepage, brand context | 1400×1600 |
| `assets/images/work/tickets-in-a-hat/card.webp` | Work index | 1200×900 |
| `assets/images/work/tickets-in-a-hat/gallery-01.webp` | Logo | 1400×740 |
| `assets/images/work/tickets-in-a-hat/gallery-02.webp` | Demo illustration. Do not quote the numbers on it. | 1000×1330 |
| `assets/images/work/capstone-industries/card.webp` | Work index | 1200×900 |
| `assets/images/work/capstone-industries/gallery-01.webp` | Homepage, 25 November 2026 | 1400×1600 |
| `assets/images/work/sunflower-community-supports/card.webp` | Work index | 1200×900 |
| `assets/images/work/sunflower-community-supports/gallery-01.webp` | Homepage, 25 November 2026 | 1400×1600 |
| `assets/images/og.jpg` | Image shown when the site is shared. It has the name on it. | 1200×630 |

Intuitive Healing with Jo and Monument Homes are type-led on purpose. There is no picture until you add one. To add a card image, upload `assets/images/work/intuitive-healing-with-jo/card.webp` (or `monument-homes/card.webp`) at about 1200×900, then add an `<img>` in `work/index.html` in that project’s card, using the same pattern as Nova.

The Kindred Souls class-booking carousel is not on the site. The file repeats the word “of”. Fix that, then it can be added as another gallery image.

## Still to supply

These are not on the public pages, on purpose.

- Email address. When you have it, add a `mailto:` link on `contact.html` with the label **Email April**, and you can add it to the footer.
- Instagram and LinkedIn URLs, same idea. Don’t link them until the addresses are real.
- Homepage screenshot, and any product or planner stills, for Intuitive Healing with Jo.
- Homepage screenshot for Monument Homes.
- Website, shop or email figures for Jo. Instagram figures are already published.
- Bookings, gift-card sales, or a later SEO month for Nova. The July 2024 report is already published.
- Results for the other projects, only when you have a source. Don’t use the demo numbers on the Tickets in a Hat illustration.
- Which Tea Journal posts are yours, and the Instagram handle once you know it.
- Whether you built Jo’s shop or took it over.
- Photography credit on Gold & Sage and Holy Threads, only if it is yours.
- Sunflower: employer agreement before the page is public, and which parts of the rebuild are yours. The page stays general. No participant stories.

## What the services section links to

`#websites` `#seo` `#social` `#copy` `#branding` `#ads` `#email` `#creative` `#ai` on `services.html`.
