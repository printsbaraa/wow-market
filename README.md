# WoW Market (واو ماركت) — Premium Online Grocery Platform

A modern, production-grade online grocery e-commerce platform built for **WoW Market (واو ماركت)**, an authentic supermarket located on Al-Karama Street in New Zarqa, Jordan.

---

## 🏬 Verified Business Information

- **Business Name**: WoW Market | واو ماركت
- **Type**: Neighborhood Supermarket & Local Online Grocery Delivery
- **Country & City**: Jordan — Zarqa (New Zarqa / Madinat Al Sharq / Al-Karama St)
- **Founded**: 2017
- **Official Phone**: `+962 7 9676 7613`
- **Published Working Hours**: 8:00 AM – 11:55 PM (Daily)
- **Delivery Zone**: New Zarqa & Madinat Al Sharq (Flat rate 1.000 JOD / Free on orders ≥ 20.000 JOD)
- **Official Website**: [wowmarket.net](https://wowmarket.net)
- **Facebook**: [facebook.com/Wow.Market1](https://www.facebook.com/Wow.Market1/)
- **Google Maps**: [View on Maps](https://maps.app.goo.gl/jDcV98dYngwKbxh3A) — Verified rating 4.3 ★ (2,032+ reviews)
- **Talabat Jordan**: [Talabat Listing](https://www.talabat.com/jordan/wow-market) — Verified rating 4.4 ★ (146 ratings)
- **Brand Positioning**: *"We are not a warehouse or a dark store. We are your neighborhood supermarket, now delivering to your doorstep."*

---

## 🎨 Design System & Visual Identity

- **Primary Colors**:
  - Primary Green: `#168447`
  - Deep Forest Green: `#105B34`
  - Accent Green: `#B9E8C7`
  - Background: `#FAFBF8`
  - Clean Surface: `#FFFFFF`
  - Text Primary: `#18251D`
  - Muted Text: `#78847B`
- **Bilingual & RTL-First**:
  - Default: Arabic (Tajawal font with true RTL layout)
  - English: One-click toggle in announcement bar (Inter font with LTR layout)
- **Apple Minimal Layout Discipline & Playful Micro-Interactions**:
  - Rounded-3xl cards with soft layered shadows
  - Shipping progress bar in slide-over cart drawer
  - Interactive quick view modal
  - Confetti order completion celebration

---

## 📦 23 Official Store Categories

1. **Appetizers — المقبلات**
2. **Baby Needs — احتياجات الطفل**
3. **Bakery — المخبوزات**
4. **Beverages — المشروبات**
5. **Breakfast — طعام الإفطار**
6. **Canned Food — المعلبات**
7. **Cleaning and Laundry — التنظيف والغسيل**
8. **Cooking — الطهي**
9. **Dairy and Eggs — منتجات الألبان والبيض**
10. **Fresh Food — الأطعمة الطازجة**
11. **Disposable Products — للاستخدام الواحد**
12. **Fruits and Vegetables — الفواكه والخضراوات**
13. **Frozen Food — الأطعمة المجمدة**
14. **Hot Drinks — المشروبات الساخنة**
15. **Household Supplies — المستلزمات المنزلية**
16. **Ice Cream — آيس كريم**
17. **Meat and Poultry — اللحوم والدواجن**
18. **Personal Care — العناية الشخصية**
19. **Pet Care — العناية بالحيوانات الأليفة**
20. **Protein and Special Diet — البروتين والنظام الغذائي الخاص**
21. **Roasted Products — المحمص**
22. **Snacks and Chocolate — الوجبات الخفيفة والشوكولاتة**
23. **Soups and Spices — الحساء والتوابل**

---

## 🛒 Real Seed Products & Brands

- **A.G Original Pasta Sauce (14 oz)** — 2.500 JOD
- **Al Alali Hot Pizza Sauce (320 g)** — 2.250 JOD
- **Maxim White Vinegar (473 ml)** — 0.750 JOD
- **A.G Squeeze Mustard (8 oz)** — 1.350 JOD
- **A.G Burger Sliced Pickles (32 oz)** — 3.850 JOD
- **A.G Original Mayonnaise** — 5.450 JOD
- Plus Almarai Fresh Milk (2L), Baladna Eggs (Tray of 30), Baladna Turkish Labneh, Aquafina 6x1.5L, Red Bull, Barbican, Al Rabie Orange Juice, Fresh Jordanian Baladi Tomatoes & Cucumbers, Samoon Bakery Bread, Nutella, Oreo, Jordanian Virgin Olive Oil, Fairy, Tide, Fine Tissues, Pampers, Lipton Tea.

---

## 🛠️ Complete Multi-Page Routing

1. **Homepage** (`/`)
2. **Shop All** (`/shop`) — with Brand, Price, Category, Availability filters & sorting
3. **Category Pages** (`/category/[slug]`) — for all 23 aisles
4. **Product Details** (`/product/[id]`) — with full specifications sheet & related products
5. **Search Results** (`/search`) — with live keyword querying
6. **Offers & Deals** (`/offers`)
7. **Shopping Cart** (`/cart`) — full page + slide-over drawer
8. **Checkout** (`/checkout`) — Cash on Delivery / CliQ on delivery with New Zarqa address fields
9. **Sign In** (`/login`) — with one-click demo access for Admin and Customer
10. **Register** (`/register`)
11. **User Profile** (`/profile`) — saved addresses & account info
12. **Wishlist** (`/wishlist`)
13. **Order History** (`/orders`)
14. **Order Receipt** (`/orders/[id]`) — printable customer receipt
15. **About Us** (`/about`) — authentic 2017 story & neighborhood positioning
16. **Contact Us** (`/contact`) — with interactive form, phone & map links
17. **FAQ** (`/faq`) — delivery zones, fees, hours, return policy
18. **Privacy Policy** (`/privacy`)
19. **Terms & Conditions** (`/terms`)
20. **Admin Dashboard** (`/admin`) — Products, Inventory, Orders, Categories & Store Settings
21. **404 Not Found** (`/_not-found`)
22. **Robots & Sitemap** (`/robots.txt`, `/sitemap.xml`)

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```

### Admin Credentials for Demo:
- Email: `admin@wowmarket.net`
- Password: `admin123`
