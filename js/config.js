/* ==========================================================================
   NextGen Academy — إعدادات الموقع / Site settings
   ✏️  عدّل الروابط والسعر من هنا فقط — وهتتحدّث في الصفحتين (عربي + English)
   ✏️  Edit links and price here only — both pages (Arabic + English) update.
   ========================================================================== */

window.NEXTGEN_CONFIG = {
  /* ---------- روابط السوشيال ميديا / Social links ---------- */

  // واتساب: اكتب الرقم بالصيغة الدولية بدون + وبدون أصفار في البداية
  // مثال لمصر: 201012345678   →  https://wa.me/201012345678
  whatsapp: "https://wa.me/201104534626",

  // فيسبوك (حسابك الشخصي)
  facebook: "https://www.facebook.com/profile.php?id=61574770233213",

  // تيليجرام (اليوزر نيم بدون @)
  telegram: "https://t.me/muh_syd",

  // صفحة الأكاديمية (فيسبوك)
  academyPage: "https://www.facebook.com/share/19Zec24SFm",

  /* ---------- رسالة واتساب الجاهزة / Prefilled WhatsApp message ---------- */
  whatsappMessage: {
    ar: "مرحبًا، عايز أشترك في كورس C++ من NextGen Academy.",
    en: "Hello, I'd like to subscribe to the C++ course at NextGen Academy."
  },

  /* ---------- سعر الاشتراك الشهري / Monthly price ----------
     اترك amount فاضي ("") لو مش عايز تعرض سعر — هيظهر "تواصل معنا لمعرفة السعر".
     Leave amount empty ("") to show "Contact us for the price" instead. */
  price: {
    amount: "",           // مثال: "300"
    currency: { ar: "جنيه", en: "EGP" },
    per: { ar: "/ شهريًا", en: "/ month" }
  }
};
