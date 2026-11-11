# Security Policy

This repository hosts a static personal portfolio (GitHub Pages) and the COBIT Workshop learning site under `/cobit/`. There is no server-side code, database, login or form submission.

## Reporting a vulnerability

If you find a security issue, please report it privately:

- Preferred: GitHub **Security → Report a vulnerability** (private vulnerability reporting) on this repository
- Or email: turhansolmaz@hotmail.com

Please include the affected URL, steps to reproduce and the potential impact. Do not run automated scans that could degrade service, and do not access data that is not yours. I aim to acknowledge reports within 72 hours.

## Security measures in place

- Content Security Policy on every page; no inline scripts or inline event handlers
- Third-party libraries pinned to exact versions with Subresource Integrity (SRI)
- `strict-origin-when-cross-origin` referrer policy and `rel="noopener"` on external links
- HTTPS enforced by GitHub Pages
- GitHub secret scanning and code scanning (CodeQL) enabled
