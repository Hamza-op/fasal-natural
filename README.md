# 🌾 Fasal Natural (خالص اور روایتی پیداوار)

> **Authentic Multani Heritage, Pure Farm-Fresh Ingredients.**  
> Premium e-commerce storefront for traditional Multani Sohan Halwa, 100% Pure Desi Ghee, and nourishing Panjeeri with direct WhatsApp ordering and nationwide delivery across Pakistan.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Store-success?style=for-the-badge&logo=github)](https://hamza-op.github.io/fasal-natural/)
[![WhatsApp Checkout](https://img.shields.io/badge/Order-WhatsApp%20Direct-25D366?style=for-the-badge&logo=whatsapp)](https://wa.me/923041790269)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 🚀 Live Demo

Experience the live storefront on GitHub Pages:  
👉 **[https://hamza-op.github.io/fasal-natural/](https://hamza-op.github.io/fasal-natural/)**

---

## ✨ Key Features

- **🌾 Authentic Heritage Catalog**:
  - **Signature Sohan Halwa (1 Kg Boxes)**: Simple, Badami, Akhroti, Double Akhroti, Mix Dry Fruit, Pista, and Special Royal.
  - **Pure Desi Ghee**: Multi-variant selector for 250g, 500g, and 1 Kg Tin.
  - **Traditional Panjeeri**: Authentic 1 Kg desi ghee recipe.
- **💬 Direct WhatsApp Checkout**:
  - Automatically formats itemized Urdu/English orders with delivery fees, promotional savings, and customer shipping details.
  - No slow third-party payment gateways required — orders finalize directly with the merchant.
- **🛒 Dynamic Cart & State Persistence**:
  - Real-time cart badge counter, drawer preview, quantity controls, and total calculation.
  - Saved in browser `localStorage` across user sessions.
- **🏷️ Promotional Pricing Architecture**:
  - Flat **Rs 500 OFF** on all products with clear compare-at strikethroughs.
  - Flat **Rs 250 Delivery** across Pakistan + Cash On Delivery (COD) support.
- **🌗 Dark / Light Mode**:
  - System preference detection with smooth manual toggle.
- **📱 Mobile-First Responsive Design**:
  - Specially proportioned for handhelds with touch-friendly 44px+ touch targets and optimized media display.
- **⚡ Zero Dependencies**:
  - Pure vanilla HTML5, modern CSS3 (Custom Properties, Flexbox, CSS Grid), and lightweight ES6+ JavaScript.

---

## 📁 Repository Structure

```text
├── index.html                # Root entry point with instant redirect to store/
├── store/
│   ├── index.html            # Main storefront HTML
│   ├── styles.css            # Responsive styles, design system & dark mode
│   ├── app.js                # Catalog data, cart logic & WhatsApp checkout
│   └── images/               # Optimized web assets & product photos
│       ├── ghee.jpg
│       └── products/         # Sohan Halwa & Panjeeri photography
├── fasal_natural_data.json   # Structured catalog database
├── FASAL_NATURAL_PLAN.md     # E-commerce specification & business logic
├── package.json              # Local runner scripts
└── README.md                 # Project documentation
```

---

## 🛠️ Local Development

To run the storefront locally on your computer:

### Option 1: Any local HTTP server
Using Node / npx:
```bash
npx serve store
```
Or with Python:
```bash
# From within the store directory:
python -m http.server 3000
```

### Option 2: Direct browser opening
Open `store/index.html` directly in any modern web browser.

---

## 📦 Deployment

The storefront is fully static and ready to host anywhere:
- **GitHub Pages**: Configured and served automatically from the `main` branch.
- **Vercel / Netlify / Cloudflare Pages**: Set the publish directory to `store/` or repository root.

---

## 📞 Merchant Information

- **Brand**: Fasal Natural (ملتان سے آپ کے دروازے تک)
- **Dispatch**: Multan, Punjab, Pakistan
- **WhatsApp Support**: `+92 304 1790269`
- **Shipping**: Flat Rs 250 nationwide (COD available)

---

## 📄 License

Distributed under the MIT License.
