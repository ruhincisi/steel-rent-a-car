const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const iso = date => date.toISOString().split("T")[0];
const startInput = document.querySelector("#startDate");
const endInput = document.querySelector("#endDate");
startInput.min = iso(today);
startInput.value = iso(tomorrow);
endInput.min = iso(tomorrow);
endInput.value = iso(nextWeek);

startInput.addEventListener("change", () => {
  const minimumEnd = new Date(startInput.value);
  minimumEnd.setDate(minimumEnd.getDate() + 1);
  endInput.min = iso(minimumEnd);
  if (!endInput.value || endInput.value <= startInput.value) endInput.value = iso(minimumEnd);
});

document.querySelector("#bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const carClass = document.querySelector("#carClass").value;
  const startTime = document.querySelector("#startTime").value;
  const customerPhone = document.querySelector("#customerPhone").value.trim();
  const delivery = document.querySelector("#delivery").value;
  const formatter = new Intl.DateTimeFormat("tr-TR", {day: "2-digit", month: "long", year: "numeric"});
  const start = formatter.format(new Date(`${startInput.value}T12:00:00`));
  const end = formatter.format(new Date(`${endInput.value}T12:00:00`));
  const message = encodeURIComponent(`Merhaba STEEL Rent A Car, araç kiralama teklifi almak istiyorum.\n\n📅 Alış: ${start} — ${startTime}\n📅 İade: ${end}\n🚘 Araç tercihi: ${carClass}\n🚚 Teslimat: ${delivery}\n📞 Telefon: ${customerPhone}`);
  const toast = document.querySelector(".toast");
  toast.classList.add("show");
  setTimeout(() => {
    window.open(`https://wa.me/905417980949?text=${message}`, "_blank", "noopener");
    toast.classList.remove("show");
  }, 500);
});

document.querySelectorAll(".select-car").forEach(link => {
  link.addEventListener("click", () => {
    const car = link.dataset.car;
    document.querySelector("#carClass").value = car;
    document.querySelector("#selectedCarName").textContent = car;
    document.querySelectorAll(".select-car").forEach(item => item.classList.remove("selected"));
    link.classList.add("selected");
    link.firstChild.textContent = "Seçildi ";
  });
});

const translations = {
  tr: {callNow:"Hemen Ara",heroEyebrow:"ŞANLIURFA’DA PREMIUM ARAÇ KİRALAMA",heroTitle:"Yolculuğun",heroAccent:"seninle başlar.",heroText:"Yeni model araçlar, şeffaf fiyatlandırma ve her an yanında olan gerçek bir ekip. Anahtarı teslim al, gerisini bize bırak.",chooseCar:"Aracını şimdi seç",exploreFleet:"Filoyu keşfet",quickQuote:"Hızlı Teklif Al",quoteSub:"Bilgilerini gönder, en iyi teklifimizle hemen dönelim.",selectedVehicle:"SEÇİLEN ARAÇ",noPreference:"Henüz araç seçilmedi",changeVehicle:"Değiştir",pickupDate:"Alış Tarihi",returnDate:"İade Tarihi",pickupTime:"Alış Saati",phone:"Telefon",vehiclePreference:"Araç Tercihi",deliveryPreference:"Teslimat Tercihi",askAvailability:"Müsaitlik Sor",freeQuote:"Ücretsiz teklif",fastReply:"Hızlı dönüş",noHiddenFee:"Gizli ücret yok"},
  en: {callNow:"Call Now",heroEyebrow:"PREMIUM CAR RENTAL IN ŞANLIURFA",heroTitle:"Your journey",heroAccent:"starts with you.",heroText:"New model cars, transparent pricing and a real team by your side. Pick up the key and leave the rest to us.",chooseCar:"Choose your car",exploreFleet:"Explore the fleet",quickQuote:"Get a Quick Quote",quoteSub:"Send your details and we'll return with our best offer.",selectedVehicle:"SELECTED VEHICLE",noPreference:"No vehicle selected yet",changeVehicle:"Change",pickupDate:"Pickup Date",returnDate:"Return Date",pickupTime:"Pickup Time",phone:"Phone",vehiclePreference:"Vehicle Preference",deliveryPreference:"Delivery Preference",askAvailability:"Check Availability",freeQuote:"Free quote",fastReply:"Fast response",noHiddenFee:"No hidden fees"},
  ar: {callNow:"اتصل الآن",heroEyebrow:"تأجير سيارات مميز في شانلي أورفا",heroTitle:"رحلتك",heroAccent:"تبدأ معك.",heroText:"سيارات حديثة وأسعار واضحة وفريق حقيقي بجانبك دائماً. استلم المفتاح واترك الباقي لنا.",chooseCar:"اختر سيارتك",exploreFleet:"استكشف السيارات",quickQuote:"احصل على عرض سريع",quoteSub:"أرسل معلوماتك وسنعود إليك بأفضل عرض.",selectedVehicle:"السيارة المختارة",noPreference:"لم يتم اختيار سيارة",changeVehicle:"تغيير",pickupDate:"تاريخ الاستلام",returnDate:"تاريخ الإرجاع",pickupTime:"وقت الاستلام",phone:"الهاتف",vehiclePreference:"نوع السيارة",deliveryPreference:"خيار التسليم",askAvailability:"تحقق من التوفر",freeQuote:"عرض مجاني",fastReply:"رد سريع",noHiddenFee:"بدون رسوم مخفية"}
};

const pageCopy = {
  en: {
    "Araçlar":"Vehicles","Neden Steel?":"Why Steel?","Yorumlar":"Reviews","SSS":"FAQ","İletişim":"Contact",
    "Fiyatlar tarih ve müsaitliğe göre belirlenir. Gizli ücret yok.":"Prices depend on dates and availability. No hidden fees.",
    "Ofisten teslim alacağım":"Pickup from office","GAP Havalimanı teslimatı":"GAP Airport delivery","Otogar teslimatı":"Bus station delivery","Adresime teslimat istiyorum":"Delivery to my address",
    "Ekonomik (Clio, Egea vb.)":"Economy (Clio, Egea etc.)","Orta Sınıf (Corolla vb.)":"Mid-size (Corolla etc.)",
    "STEEL Rent A Car Avantajları":"STEEL Rent A Car Advantages","NEDEN STEEL?":"WHY STEEL?","Kiralamanın":"Car rental,","iyi hali.":"done right.",
    "Biz yalnızca araç teslim etmiyoruz. Şanlıurfa’daki yolculuğunuzun her anını daha kolay, daha güvenli ve daha keyifli hale getiriyoruz.":"We do more than hand over a car. We make every moment of your Şanlıurfa journey easier, safer and more enjoyable.",
    "Bizi yakından tanıyın":"Get to know us","Hızlı & Esnek":"Fast & Flexible","Güvence Dahil":"Protection Included","Yeni Model Filo":"New Model Fleet","7/24 Yanında":"Support 24/7",
    "Planlar değişebilir. Rezervasyonunu kolayca güncelle, vaktini yolda geçir.":"Plans can change. Easily update your booking and spend your time on the road.",
    "Bakımlı araçlar ve kapsamlı güvence paketleriyle kafan daima rahat.":"Drive with peace of mind thanks to maintained cars and comprehensive protection.",
    "Temiz, konforlu, yakıtı verimli ve özenle seçilmiş otomobiller.":"Clean, comfortable, fuel-efficient and carefully selected cars.",
    "Bir sorunda otomatik yanıta değil, gerçekten yardımcı olan ekibimize ulaşırsın.":"When you need help, you reach a real team—not an automated reply.",
    "ÖNE ÇIKAN ARAÇLAR":"FEATURED VEHICLES","Tarzına uygun":"A vehicle that fits","bir yol arkadaşı.":"your journey.","Tümü":"All","Ekonomi":"Economy",
    "Bu aracı seç":"Select this vehicle","Seçildi":"Selected","EKONOMİK":"ECONOMY","TİCARİ / GENİŞ":"COMMERCIAL / LARGE","KOMPAKT":"COMPACT","PREMIUM HB":"PREMIUM HB","VIP / MAKAM":"VIP / EXECUTIVE",
    "Benzin":"Petrol","Dizel":"Diesel","Otomatik":"Automatic","Manuel":"Manual","5 Kişi":"5 Seats","Geniş Bagaj":"Large Boot","Lüks":"Luxury",
    "mutlu yolculuk":"happy journeys","STEEL DENEYİMİ":"THE STEEL EXPERIENCE","Direksiyonda sen,":"You drive,","arkanda biz varız.":"we have your back.",
    "Rezervasyondan araç iadesine kadar tek bir sözümüz var: işini kolaylaştırmak.":"From booking to return, we have one promise: making things easier for you.",
    "Şeffaf teklif":"Transparent quote","Sonradan çıkan ücret yok":"No surprise charges","Bakımlı araçlar":"Maintained cars","Her teslimat öncesi kontrol":"Checked before every delivery",
    "Esnek teslimat":"Flexible delivery","Havalimanı, otogar ve adres":"Airport, station or address","Yol boyunca gerçek destek":"Real support throughout your journey",
    "MİSAFİR YORUMLARI":"GUEST REVIEWS","Yola çıkanlar":"What do our guests","ne diyor?":"say?","Doğrulanmış müşteri":"Verified customer",
    "MERAK ETTİKLERİN":"WHAT YOU MAY WONDER","Kısa cevaplar,":"Short answers,","net bilgiler.":"clear information.","Aklında başka bir soru mu var?":"Have another question?","WhatsApp’tan sor":"Ask on WhatsApp",
    "Depozito talep ediyor musunuz?":"Do you require a deposit?","Yakıt politikanız nedir?":"What is your fuel policy?","Aracı farklı bir noktada teslim edebilir miyim?":"Can I return the car at another location?","Kiralamak için yaş sınırı nedir?":"What is the minimum rental age?",
    "YOLA ÇIKMAYA HAZIR MISIN?":"READY TO HIT THE ROAD?","Bir sonraki rota":"Your next route","buradan başlıyor.":"starts here.","WhatsApp’tan yaz":"Message on WhatsApp",
    "BİZİ NEREDE BULURSUN?":"WHERE TO FIND US","Şanlıurfa’nın":"We are in the heart","merkezindeyiz.":"of Şanlıurfa.","Yol tarifi al":"Get directions","Bizi ara":"Call us",
    "Tüm hakları saklıdır.":"All rights reserved."
  },
  ar: {
    "Araçlar":"السيارات","Neden Steel?":"لماذا ستيل؟","Yorumlar":"الآراء","SSS":"الأسئلة الشائعة","İletişim":"اتصل بنا",
    "Fiyatlar tarih ve müsaitliğe göre belirlenir. Gizli ücret yok.":"تتحدد الأسعار حسب التاريخ والتوفر. بدون رسوم مخفية.",
    "Ofisten teslim alacağım":"الاستلام من المكتب","GAP Havalimanı teslimatı":"التسليم في مطار GAP","Otogar teslimatı":"التسليم في محطة الحافلات","Adresime teslimat istiyorum":"التسليم إلى عنواني",
    "Ekonomik (Clio, Egea vb.)":"اقتصادية (كليو، إيgea وغيرها)","Orta Sınıf (Corolla vb.)":"متوسطة (كورولا وغيرها)",
    "NEDEN STEEL?":"لماذا ستيل؟","Kiralamanın":"تأجير سيارات","iyi hali.":"بأفضل تجربة.",
    "Biz yalnızca araç teslim etmiyoruz. Şanlıurfa’daki yolculuğunuzun her anını daha kolay, daha güvenli ve daha keyifli hale getiriyoruz.":"نحن لا نسلم سيارة فقط، بل نجعل رحلتك في شانلي أورفا أسهل وأكثر أماناً ومتعة.",
    "Bizi yakından tanıyın":"تعرف علينا","Hızlı & Esnek":"سريع ومرن","Güvence Dahil":"الحماية مشمولة","Yeni Model Filo":"أسطول حديث","7/24 Yanında":"دعم على مدار الساعة",
    "Planlar değişebilir. Rezervasyonunu kolayca güncelle, vaktini yolda geçir.":"قد تتغير الخطط. عدّل حجزك بسهولة واستمتع بوقتك على الطريق.",
    "Bakımlı araçlar ve kapsamlı güvence paketleriyle kafan daima rahat.":"قد بثقة مع سيارات مصانة وحماية شاملة.",
    "Temiz, konforlu, yakıtı verimli ve özenle seçilmiş otomobiller.":"سيارات نظيفة ومريحة واقتصادية مختارة بعناية.",
    "Bir sorunda otomatik yanıta değil, gerçekten yardımcı olan ekibimize ulaşırsın.":"عند الحاجة ستتواصل مع فريق حقيقي جاهز للمساعدة.",
    "ÖNE ÇIKAN ARAÇLAR":"السيارات المميزة","Tarzına uygun":"سيارة تناسب","bir yol arkadaşı.":"أسلوب رحلتك.","Tümü":"الكل","Ekonomi":"اقتصادية",
    "Bu aracı seç":"اختر هذه السيارة","Seçildi":"تم الاختيار","EKONOMİK":"اقتصادية","TİCARİ / GENİŞ":"تجارية / واسعة","KOMPAKT":"مدمجة","PREMIUM HB":"فاخرة","VIP / MAKAM":"VIP / رجال أعمال",
    "Benzin":"بنزين","Dizel":"ديزل","Otomatik":"أوتوماتيك","Manuel":"يدوي","5 Kişi":"5 ركاب","Geniş Bagaj":"صندوق واسع","Lüks":"فاخرة",
    "mutlu yolculuk":"رحلة سعيدة","STEEL DENEYİMİ":"تجربة ستيل","Direksiyonda sen,":"أنت تقود،","arkanda biz varız.":"ونحن ندعمك.",
    "Rezervasyondan araç iadesine kadar tek bir sözümüz var: işini kolaylaştırmak.":"من الحجز حتى إعادة السيارة، وعدنا أن نجعل كل شيء أسهل.",
    "Şeffaf teklif":"عرض واضح","Sonradan çıkan ücret yok":"بدون رسوم مفاجئة","Bakımlı araçlar":"سيارات مصانة","Her teslimat öncesi kontrol":"فحص قبل كل تسليم",
    "Esnek teslimat":"تسليم مرن","Havalimanı, otogar ve adres":"المطار أو المحطة أو العنوان","Yol boyunca gerçek destek":"دعم حقيقي طوال رحلتك",
    "MİSAFİR YORUMLARI":"آراء العملاء","Yola çıkanlar":"ماذا يقول","ne diyor?":"عملاؤنا؟","Doğrulanmış müşteri":"عميل موثق",
    "MERAK ETTİKLERİN":"ما قد تتساءل عنه","Kısa cevaplar,":"إجابات قصيرة،","net bilgiler.":"ومعلومات واضحة.","Aklında başka bir soru mu var?":"هل لديك سؤال آخر؟","WhatsApp’tan sor":"اسأل عبر واتساب",
    "Depozito talep ediyor musunuz?":"هل تطلبون تأميناً؟","Yakıt politikanız nedir?":"ما هي سياسة الوقود؟","Aracı farklı bir noktada teslim edebilir miyim?":"هل يمكن إعادة السيارة في موقع آخر؟","Kiralamak için yaş sınırı nedir?":"ما هو الحد الأدنى للعمر؟",
    "YOLA ÇIKMAYA HAZIR MISIN?":"هل أنت مستعد للانطلاق؟","Bir sonraki rota":"رحلتك القادمة","buradan başlıyor.":"تبدأ من هنا.","WhatsApp’tan yaz":"راسلنا عبر واتساب",
    "BİZİ NEREDE BULURSUN?":"أين تجدنا؟","Şanlıurfa’nın":"نحن في قلب","merkezindeyiz.":"شانلي أورفا.","Yol tarifi al":"احصل على الاتجاهات","Bizi ara":"اتصل بنا",
    "Tüm hakları saklıdır.":"جميع الحقوق محفوظة."
  }
};

const testimonialTrack = document.querySelector(".testimonial-grid");
[...testimonialTrack.children].forEach(card => {
  const clone = card.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  testimonialTrack.appendChild(clone);
});
requestAnimationFrame(() => testimonialTrack.classList.add("is-looping"));

const translatableNodes = [];
const inlineTerms = {
  en: {"Benzin":"Petrol","Dizel":"Diesel","Otomatik":"Automatic","Manuel":"Manual","5 Kişi":"5 Seats","Geniş Bagaj":"Large Boot","Premium":"Premium","Lüks":"Luxury","Kirala":"Rent","Teklif iste":"Request quote"},
  ar: {"Benzin":"بنزين","Dizel":"ديزل","Otomatik":"أوتوماتيك","Manuel":"يدوي","5 Kişi":"5 ركاب","Geniş Bagaj":"صندوق واسع","Premium":"فاخرة","Lüks":"فاخرة","Kirala":"استأجر","Teklif iste":"اطلب عرضاً"}
};
const collectTextNodes = element => {
  element.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
      if (!node.parentElement.closest("[data-i18n]")) translatableNodes.push({node, original:node.nodeValue});
    } else if (node.nodeType === Node.ELEMENT_NODE && !["SCRIPT","STYLE"].includes(node.tagName)) {
      collectTextNodes(node);
    }
  });
};
collectTextNodes(document.body);

document.querySelector("#languageSelect").addEventListener("change", event => {
  const language = event.target.value;
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const value = translations[language][element.dataset.i18n];
    if (value) element.textContent = value;
  });
  translatableNodes.forEach(item => {
    const originalText = item.original.trim();
    let translated = language === "tr" ? originalText : pageCopy[language][originalText];
    if (language !== "tr" && !translated) {
      translated = originalText;
      Object.entries(inlineTerms[language]).forEach(([from,to]) => translated = translated.replaceAll(from,to));
    }
    item.node.nodeValue = item.original.replace(originalText, translated || originalText);
  });
  localStorage.setItem("steel-language", language);
});

const savedLanguage = localStorage.getItem("steel-language") || "tr";
document.querySelector("#languageSelect").value = savedLanguage;
document.querySelector("#languageSelect").dispatchEvent(new Event("change"));

document.querySelectorAll(".fleet-filters button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".fleet-filters .active").classList.remove("active");
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".car-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

document.querySelectorAll(".accordion details").forEach(item => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".accordion details").forEach(other => {
      if (other !== item) other.open = false;
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});

document.querySelectorAll(".benefits article, .car-card, .testimonial-grid article").forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(24px)";
  element.style.transition = "opacity .6s ease, transform .6s ease";
  observer.observe(element);
});

const revealStyle = document.createElement("style");
revealStyle.textContent = ".visible{opacity:1!important;transform:translateY(0)!important}";
document.head.appendChild(revealStyle);
document.querySelector("#year").textContent = new Date().getFullYear();
