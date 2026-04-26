# BD TRIPPER - Website Design Spec
Date: 2026-04-26

## 1. Project Overview
BD TRIPPER is a visa processing and travel agency website. The website is designed for beginners to easily understand, modify, and maintain. It will provide information and services related to different types of visas and bank solvency.

## 2. Technology Stack
*   **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
*   **CSS Framework:** Bootstrap 5 (via CDN for easy layout, responsiveness, and pre-built components like buttons/cards)
*   **Backend/Structure:** PHP (Used primarily for modularizing components like Header and Footer, and handling basic contact form submissions).
*   **Database:** Not required for Phase 1 (static content).

## 3. Site Architecture & Page Structure
The site will consist of the following main pages, utilizing PHP includes for shared components (`header.php` and `footer.php`):

1.  **`index.php` (Home):**
    *   Hero Section (Attractive banner image with a strong Call-to-Action).
    *   Brief "About Us" introduction.
    *   Summary cards linking to core services.
2.  **`services.php` (Visa Services):**
    *   **Work Visa:** Information section (supported for any country).
    *   **Student Visa:** Information section (supported for any country).
    *   **Medical Visa:** Information section (supported for any country).
3.  **`solvency.php` (Bank Solvency):**
    *   Details on providing bank solvency documents for any required amount.
    *   Explanation of the process.
4.  **`contact.php` (Contact Us):**
    *   Physical address, phone numbers, and email.
    *   A simple PHP-driven contact form for user inquiries.

## 4. Design & UI Requirements
*   **Color Theme:** Trust-inspiring Blue and Clean White.
*   **Responsiveness:** Must be fully mobile-responsive (handled via Bootstrap 5).
*   **Typography:** Clean, readable sans-serif fonts (e.g., Roboto or Open Sans).

## 5. Third-Party Integrations
*   **Social Media:** Direct links with icons in the footer (Facebook, Instagram, WhatsApp).
*   **Live Chat:** Integration using Tawk.to or Tidio. A JavaScript snippet will be placed in `footer.php` to ensure the chat widget appears on all pages.

## 6. Directory Structure
```text
bdtrippers/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       └── (placeholder images)
├── includes/
│   ├── header.php
│   └── footer.php
├── index.php
├── services.php
├── solvency.php
└── contact.php
```

## 7. Future Considerations
*   If the service list grows, implementing a simple MySQL database to manage countries and requirements dynamically.
*   Adding a blog section for travel tips and visa updates.
