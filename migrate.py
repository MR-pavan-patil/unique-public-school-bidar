import os
import re

old_file = r"e:\unique-public-school-bidar\unique public school bidar- old site\events.html"
new_file = r"e:\unique-public-school-bidar\events.html"

with open(old_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace old navbar with the new site's <div id="nav-root"></div>
text = re.sub(r'<nav class="navbar navbar-expand-lg navbar-light">[\s\S]*?</nav>', '<div id="nav-root"></div>', text)

# Insert the 2 new events just after new-branch-section-1
insertion_point = r'<div class="new-branch-section-1">\s*<img src="assets/images/cover-event\.jpg" class=" feature-image" alt="\.\.\.">\s*</div>'

new_events = """
    <!-- 26th Jan -->
    <section>
        <div class="container my-5 text-center">
            <h2 class="event-heading" data-aos="fade-up">🎉 26th Jan / Republic Day</h2>

            <div class="row g-4">
                <div class="col-12 col-md-4">
                    <div class="event-box" data-aos="zoom-in">
                        <img src="assets/ups-26 data/School 2025-26 Pics/26th jan/WhatsApp Image 2026-02-05 at 01.24.56 (1).jpeg" alt="Event 1">
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="event-box" data-aos="zoom-in" data-aos-delay="200">
                        <img src="assets/ups-26 data/School 2025-26 Pics/26th jan/WhatsApp Image 2026-02-05 at 01.24.57 (1).jpeg" alt="Event 2">
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="event-box" data-aos="zoom-in" data-aos-delay="400">
                        <img src="assets/ups-26 data/School 2025-26 Pics/26th jan/WhatsApp Image 2026-02-05 at 01.24.57 - Copy.jpeg" alt="Event 3">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Annual Sports Meet -->
    <section>
        <div class="container my-5 text-center">
            <h2 class="event-heading" data-aos="fade-up">🎉 Annual Sports Meet</h2>

            <div class="row g-4">
                <div class="col-12 col-md-4">
                    <div class="event-box" data-aos="zoom-in">
                        <img src="assets/ups-26 data/School 2025-26 Pics/Annual Sports Meet/WhatsApp Image 2026-02-05 at 01.18.35 (1).jpeg" alt="Event 1">
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="event-box" data-aos="zoom-in" data-aos-delay="200">
                        <img src="assets/ups-26 data/School 2025-26 Pics/Annual Sports Meet/WhatsApp Image 2026-02-05 at 01.18.35.jpeg" alt="Event 2">
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="event-box" data-aos="zoom-in" data-aos-delay="400">
                        <img src="assets/ups-26 data/School 2025-26 Pics/Annual Sports Meet/WhatsApp Image 2026-02-05 at 01.19.04.jpeg" alt="Event 3">
                    </div>
                </div>
            </div>
        </div>
    </section>
"""

match = re.search(insertion_point, text)
if match:
    text = text[:match.end()] + "\n" + new_events + text[match.end():]
else:
    print("Could not find insertion point!")

# Replace old footer with the new site's <div id="footer-root"></div>
text = re.sub(r'<footer class="footer bg-primary text-center text-light pt-5 pb-4">[\s\S]*?</footer>', '<div id="footer-root"></div>', text)

# Add fonts and shared.js
# First, add Google Fonts before </head>
fonts = """
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
"""
text = text.replace('</head>', fonts + '\n</head>')

# Add shared.js and injection calls at the end before </body>
closing_script = """
    <script src="assets/js/shared.js"></script>
    <script>
        injectNav('nav-root');
        injectFooter('footer-root');
    </script>
"""
# There are Bootstrap JS scripts at the bottom. We can just add this before </body>
text = text.replace('</body>', closing_script + '\n</body>')

with open(new_file, 'w', encoding='utf-8') as f:
    f.write(text)

print("HTML constructed and saved successfully.")
