# E-COMMERCE SPECIFICATION & IMPLEMENTATION PROMPT
## Project: Fasal Natural (E-Commerce Storefront)

> **Instructions for the Implementing AI (Claude / Developer):**
> Design taste, aesthetic theme, color palette, visual styling, and artistic layout are **intentionally left open for you to create freely**. Design a modern, premium, high-converting e-commerce storefront tailored for a Pakistani artisanal sweets & organic goods brand.

---

### 1. Store Overview & Core Configuration
* **Brand Name**: Fasal Natural (خالص اور روایتی پیداوار)
* **Tagline**: 100% Pure & Traditional Delights | Farm Fresh Ingredients
* **Origin / Dispatch City**: Multan, Pakistan
* **Official WhatsApp Business Number**: `+923041790269`
* **Shipping & Delivery Charge**: Flat **Rs 250** nationwide across Pakistan
* **Primary Checkout Mechanism**: Direct **WhatsApp Redirection** with complete itemized order invoice (no rigid third-party payment gateway needed; orders are finalized and dealt with directly over WhatsApp).
* **Source Data JSON File**: The ready-to-use product database is saved at [`fasal_natural_data.json`](file:///c:/Users/Hamza/Documents/antigravity/brave-hopper/fasal_natural_data.json).

---

### 2. Pricing Architecture & Discount Logic

Every product follows a specific psychological discount formula:
* **Compare-At / Strikethrough Price (Was)** = `Base Price + Rs 500`
* **Selling Price (Now)** = `Base Price`
* **Promotional Badge**: Highlight `"Save Rs 500"` / `"Flat Rs 500 OFF"` on every product card.

> **Important Data Correction**:
> In the raw client list, *Mix Dry Fruit Sohan Halwa* was typed as `Rs 230`. That is an obvious typo for `Rs 2,300`. It is fixed here to **Rs 2,300** (Compare-At: **Rs 2,800**) to ensure real-market accuracy.

---

### 3. Product Catalog & Variant Data

The store focuses exclusively on these core items (skip all unrelated products):

#### Collection A: Signature Sohan Halwa (1 Kg Gift Boxes)
| # | Product Name (English) | Urdu Name | Variant / Size | Compare Price *(Was)* | Selling Price *(Now)* | Discount |
|---|------------------------|-----------|----------------|-----------------------|-----------------------|----------|
| 1 | **Simple Sohan Halwa** | سادہ سوہن حلوہ | 1 Kg | ~~Rs 2,200~~ | **Rs 1,700** | Save Rs 500 |
| 2 | **Badami Sohan Halwa** | بادامی سوہن حلوہ | 1 Kg | ~~Rs 2,400~~ | **Rs 1,900** | Save Rs 500 |
| 3 | **Akhroti Sohan Halwa** | اخروٹی سوہن حلوہ | 1 Kg | ~~Rs 2,500~~ | **Rs 2,000** | Save Rs 500 |
| 4 | **Double Akhroti Sohan Halwa** | ڈبل اخروٹی سوہن حلوہ | 1 Kg | ~~Rs 2,700~~ | **Rs 2,200** | Save Rs 500 |
| 5 | **Mix Dry Fruit Sohan Halwa** | مکس ڈرائی فروٹ سوہن حلوہ | 1 Kg | ~~Rs 2,800~~ | **Rs 2,300** | Save Rs 500 |
| 6 | **Pista Sohan Halwa** | پستہ سوہن حلوہ | 1 Kg | ~~Rs 3,000~~ | **Rs 2,500** | Save Rs 500 |
| 7 | **Special Royal Sohan Halwa** | اسپیشل سوہن حلوہ | 1 Kg | ~~Rs 3,200~~ | **Rs 2,700** | Save Rs 500 |

#### Collection B: Pure Desi Ghee (Single Product with 3 Multi-Variants)
Customers can select their desired size via an interactive variant selector:
| Variant Size | Compare Price *(Was)* | Selling Price *(Now)* | Discount |
|--------------|-----------------------|-----------------------|----------|
| **250 Grams** | ~~Rs 2,000~~ | **Rs 1,500** | Save Rs 500 |
| **500 Grams** | ~~Rs 3,100~~ | **Rs 2,600** | Save Rs 500 |
| **1 Kg Tin**  | ~~Rs 5,000~~ | **Rs 4,500** | Save Rs 500 |

#### Collection C: Traditional Panjeeri
| Product Name (English) | Urdu Name | Variant / Size | Compare Price *(Was)* | Selling Price *(Now)* | Discount |
|------------------------|-----------|----------------|-----------------------|-----------------------|----------|
| **Desi Ghee Panjeeri** | دیسی گھی پنجیری | 1 Kg | ~~Rs 3,000~~ | **Rs 2,500** | Save Rs 500 |

---

### 4. Extracted Product Photo Assets

All product images have been extracted directly and saved locally in `extracted_photos/`. Complete mapping is available in `extracted_photos_map.json`:

* **Simple Sohan Halwa**: `extracted_photos/simple_sohan_halwa_main.webp`, `simple_sohan_halwa_box.jpg`, `simple_sohan_halwa_detail.jpg`
* **Badami Sohan Halwa**: `extracted_photos/badami_sohan_halwa_main.webp`, `badami_sohan_halwa_box.jpg`
* **Akhroti Sohan Halwa**: `extracted_photos/akhroti_sohan_halwa_main.webp`, `akhroti_sohan_halwa_box.jpg`
* **Double Akhroti Sohan Halwa**: `extracted_photos/double_akhroti_main.jpg`, `double_akhroti_detail.jpg`
* **Mix Dry Fruit Sohan Halwa**: `extracted_photos/mix_dry_fruit_main.jpg`, `mix_dry_fruit_box.jpg`, `mix_dry_fruit_combo.png`
* **Pista Sohan Halwa**: `extracted_photos/pista_sohan_halwa_main.webp`, `pista_sohan_halwa_box.jpg`, `pista_sohan_halwa_pack.png`
* **Special Royal Sohan Halwa**: `extracted_photos/special_sohan_halwa_main.webp`, `special_sohan_halwa_box.png`, `special_sohan_halwa_tray.png`
* **Desi Ghee Panjeeri**: `extracted_photos/desi_ghee_panjeeri_main.webp`
* **Pure Desi Ghee**: `extracted_photos/pure_desi_ghee_main.jpg`, `pure_desi_ghee_jar.jpg`

---

### 4. Required Functional Modules & User Experience

1. **Top Announcement Bar**:
   * Announce the launch offer: *"✨ Special Launch Offer: Flat Rs 500 OFF on All Products | 🚚 Flat Rs 250 Delivery Across Pakistan | 🧈 100% Pure Desi Ghee from Multan"*.

2. **Navigation & Header**:
   * Brand Name / Logo: **Fasal Natural**
   * Navigation links: *All Products*, *Sohan Halwa*, *Desi Ghee*, *Panjeeri*, *Contact / Order Support*
   * Search feature with instant filter
   * Cart icon with a real-time badge count

3. **Hero & Promotional Banners**:
   * Hero section introducing authentic Multani heritage and pure farm ingredients.
   * Prominent Call-to-Action buttons (e.g. *"Shop Now"* / *"Order via WhatsApp"*).

4. **Category Filtering**:
   * Quick filter tabs: `[All]`, `[Sohan Halwa]`, `[Pure Desi Ghee]`, `[Panjeeri]`.

5. **Product Cards**:
   * High-quality imagery with hover effect.
   * Clear display of bilingual title (English + Urdu).
   * Visual badge: `Save Rs 500`.
   * Strikethrough price and bold current selling price.
   * Size / Weight switcher for Desi Ghee (`250g` | `500g` | `1 Kg`) updating price dynamically.
   * Two action buttons:
     * `Add to Cart`
     * `Buy via WhatsApp` (direct instant order)

6. **Slide-Out Ajax Cart Drawer**:
   * Lists added items with quantity controls (`+` / `-`) and remove action.
   * Dynamic calculation:
     * **Items Subtotal**
     * **Flat Delivery Fee**: Rs 250
     * **Total Savings Counter**: *"You are saving Rs [X,XXX] on this order!"*
     * **Final Total Payable**
   * Primary action button: `Proceed to Order`.

7. **Express Checkout Modal (Customer Information)**:
   * When the customer proceeds from Cart or clicks Buy Now, a simple modal asks for:
     * **Full Name** (Required)
     * **Phone / WhatsApp Number** (Required)
     * **City** (Required)
     * **Complete Delivery Address** (Required)
     * **Preferred Payment Method**: Checkbox or radio for *Cash on Delivery (COD)* or *Bank Transfer / JazzCash / EasyPaisa*.
     * **Order Notes** (Optional)

---

### 5. WhatsApp Order Redirection Engine

When the checkout form is submitted:
1. The app generates a structured, professional WhatsApp message string with emojis.
2. It encodes the message via `encodeURIComponent()`.
3. It redirects the customer to:
   ```
   https://wa.me/923041790269?text=<ENCODED_MESSAGE>
   ```

#### Message Format Specification:
```text
🌿 *NEW ORDER — FASAL NATURAL* 🌿
━━━━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS:*
• Name: {customer_name}
• Phone: {customer_phone}
• City: {customer_city}
• Address: {customer_address}
• Payment Preference: {COD or Bank Transfer/JazzCash}
{notes_if_any}

📦 *ITEMS ORDERED:*
1. {Item Title} ({Variant}) × {Qty} = Rs {Subtotal}
2. ...

━━━━━━━━━━━━━━━━━━━━━
💰 *Subtotal:* Rs {items_subtotal}
🚚 *Delivery Charges:* Rs 250 (Flat Nationwide)
🎉 *Total Discount Savings:* Rs {total_savings}
⭐ *TOTAL PAYABLE:* Rs {grand_total}
━━━━━━━━━━━━━━━━━━━━━
📍 *Dispatch Origin:* Multan, Pakistan

_Please confirm my order and share dispatch details. Thank you!_
```

---

### 6. Trust Badges & Footer Information
* **Purity Guarantee**: 100% Pure Desi Ghee Certified, Made in Multan.
* **Packaging**: Airtight sealed tins and food-grade safety containers.
* **Nationwide Shipping**: 2-3 business days delivery via leading courier services (TCS / Trax / Leopards / Call Courier).
* **Direct Helpline**: WhatsApp: `+92 304 1790269`
* **Footer Columns**: Quick Links, Collections, Origin Information (Multan), and Customer Care.
