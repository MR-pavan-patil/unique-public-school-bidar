import os

base_dir = r"e:\unique-public-school-bidar"
events_html = os.path.join(base_dir, "events.html")

dir_2026 = os.path.join(base_dir, r"assets\ups-26 data\School 2025-26 Pics")
dir_2025 = os.path.join(base_dir, r"assets\images")

exts = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}

def get_images_from_folder(folder_path, max_images=3):
    images = []
    if not os.path.isdir(folder_path):
        return images
    for entry in os.listdir(folder_path):
        full_path = os.path.join(folder_path, entry)
        if os.path.isfile(full_path) and os.path.splitext(entry)[1].lower() in exts:
            images.append(entry)
            if len(images) == max_images:
                break
    return images

def generate_html(year, base_folder_path, relative_prefix, skip_folders=None):
    if skip_folders is None:
        skip_folders = set()
    html_lines = []
    
    if not os.path.isdir(base_folder_path):
        return ""

    for folder_name in sorted(os.listdir(base_folder_path)):
        if folder_name in skip_folders:
            continue
        folder_path = os.path.join(base_folder_path, folder_name)
        if os.path.isdir(folder_path):
            images = get_images_from_folder(folder_path, 3)
            if images:
                for idx, img in enumerate(images):
                    img_src = f"{relative_prefix}/{folder_name}/{img}"
                    klass = "gal-item tall" if idx == 1 else "gal-item"
                    delay = f' data-reveal-delay="{idx}"' if idx > 0 else ''
                    display_name = folder_name.replace('_', ' ').title()
                    
                    block = f"""
        <div class="{klass}" data-cat="{year}" data-reveal{delay}>
          <img src="{img_src}" alt="{display_name}" onerror="this.parentElement.classList.add('gal-noimg'); this.style.display='none'"/>
          <div class="gal-noimg-inner">📸</div>
          <div class="gal-overlay"><span>{display_name} {year}</span></div>
        </div>"""
                    html_lines.append(block)
    return "".join(html_lines)

html_2026 = generate_html("2026", dir_2026, "assets/ups-26 data/School 2025-26 Pics")
skip_2025 = {"landing", "videos", "Testimonials", "core team", "css", "js", "coding classes"}
html_2025 = generate_html("2025", dir_2025, "assets/images", skip_folders=skip_2025)

template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="shortcut icon" href="assets/images/final-logo.png" type="image/x-icon"/>
  <title>Gallery – Unique Public School Bidar</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="assets/css/main.css"/>
  <link rel="stylesheet" href="assets/css/events-pg.css"/>
</head>
<body>
  <div id="nav-root"></div>

  <div class="page-banner">
    <div class="breadcrumb-bar">
      <a href="index.html">Home</a><span>/</span>
      <span style="color:rgba(255,255,255,0.7);">Gallery</span>
    </div>
    <h1>Photo <em>Gallery</em></h1>
    <p>Cherishing memories from events, celebrations, and everyday school life</p>
  </div>

  <section class="section-pad-sm" style="background:var(--off-white);">
    <div class="container">
      <div class="filter-bar" data-reveal>
        <button class="filter-btn active" data-filter="all">All Events</button>
        <button class="filter-btn" data-filter="2026">2026 Events</button>
        <button class="filter-btn" data-filter="2025">2025 Events</button>
      </div>
    </div>
  </section>

  <section class="section-pad" style="background:var(--off-white);">
    <div class="container">
      <div class="gallery-masonry" id="galleryGrid">
<!-- GALLERY_CONTENT -->
      </div>
    </div>
  </section>

  <div class="lightbox" id="lightbox">
    <div class="lb-backdrop" onclick="closeLightbox()"></div>
    <button class="lb-close" onclick="closeLightbox()">✕</button>
    <img class="lb-img" id="lbImg" src="" alt=""/>
    <div class="lb-caption" id="lbCaption"></div>
  </div>

  <div id="footer-root"></div>
  <script src="assets/js/shared.js"></script>
  <script>
    injectNav('nav-root');
    injectFooter('footer-root');

    // Filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.gal-item').forEach(item => {
          item.style.display = (f === 'all' || item.dataset.cat === f) ? '' : 'none';
        });
      });
    });

    // Lightbox
    document.querySelectorAll('.gal-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gal-overlay span')?.textContent;
        if (!img || !img.src) return;
        document.getElementById('lbImg').src = img.src;
        document.getElementById('lbCaption').textContent = caption || '';
        document.getElementById('lightbox').classList.add('open');
      });
    });
    function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });
  </script>
</body>
</html>"""

new_text = template.replace('<!-- GALLERY_CONTENT -->', html_2026 + "\n" + html_2025)

with open(events_html, 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Gallery generated successfully.")
