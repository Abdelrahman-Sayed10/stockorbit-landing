import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ModuleItem {
  name: string;
  description: string;
  highlight: string;
}

interface Metric {
  label: string;
  value: string;
  note: string;
}

interface Screenshot {
  src: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  productName = 'StockOrbit';
  
  // ---------- Language state ----------
  currentLang: 'en' | 'ar' = 'en';
  isMobile = false;

  // ---------- Translations dictionary ----------
  translations = {
    en: {
      heroChip: 'Smart Inventory Platform',
      heroTitle: 'StockOrbit for real-world stock control.',
      subtitle: 'Smart, modern multi-warehouse inventory & stock management for real-world companies.',
      heroCta: 'Request demo',
      seeProductTour: 'See product tour',
      metricImplementation: 'Implementation time',
      metricAccuracy: 'Stock accuracy',
      metricAdoption: 'User adoption',
      metricValue1: '2–4 weeks',
      metricValue2: '95%+',
      metricValue3: '3× faster',
      metricNote1: 'From first login to go-live',
      metricNote2: 'With proper data discipline',
      metricNote3: 'Compared to Excel workflows',
      whyTitle: 'Why StockOrbit?',
      whySubtitle: 'StockOrbit replaces Excel, WhatsApp, and manual stock handling with a unified, fast, real-time inventory system built for real operations.',
      whyRealTime: 'Real-time accuracy',
      whyRealTimeDesc: 'Live stock levels across all warehouses.',
      whyTracking: 'Full tracking',
      whyTrackingDesc: 'Every movement linked to projects and warehouses.',
      whyZeroMissing: 'Zero missing materials',
      whyZeroMissingDesc: 'Requests and issues are structured, not lost in chats.',
      whyLoved: 'Loved by end users',
      whyLovedDesc: 'Clean UI that teams actually enjoy using.',
      whyFast: 'Fast rollout',
      whyFastDesc: 'Go live in days, not months.',
      whyCost: 'Clear cost visibility',
      whyCostDesc: 'Know item value instantly with accurate FIFO & average costing.',
      capabilitiesTitle: 'Capabilities',
      capabilitiesSubtitle: 'What StockOrbit gives you immediately:',
      capabilitiesDesc: 'StockOrbit becomes your single source of truth for inventory, movements, and stock value.',
      whoUsesTitle: 'Who Uses StockOrbit',
      whoUsesSubtitle: 'Built for real-world companies:',
      modulesTitle: 'Core Modules',
      modulesSubtitle: 'The essential building blocks that replace manual stock handling with structured workflows.',
      dashboardsTitle: 'Dashboards',
      dashboardsSubtitle: 'Live insights for managers to make fast, correct decisions.',
      reportsTitle: 'Reports',
      reportsSubtitle: 'Ready-to-export reports your auditors will love.',
      advancedTitle: 'Advanced Features',
      advancedSubtitle: 'Control, automation, and visibility across your entire stock operation.',
      aiTitle: 'AI Copilot — powered by ChatGPT',
      aiSubtitle: 'Your team\'s personal assistant for stock operations.',
      aiWhatCanDo: 'What the Copilot can do',
      comparisonTitle: 'Why StockOrbit Wins',
      comparisonSubtitle: 'From scattered tools and manual work to one focused platform.',
      supportTitle: 'Support & Continuous Updates',
      supportSubtitle: 'We stay with you after go-live — not just during the project.',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'The questions most companies ask before they switch from Excel and manual stock handling.',
      contactTitle: 'Book a quick demo',
      contactSubtitle: 'Send a short message and we\'ll come back with a demo slot and a tailored walkthrough based on your industry.',
      contactName: 'Name',
      contactCompany: 'Company',
      contactEmail: 'Work email',
      contactPhone: 'Phone / WhatsApp',
      contactMessage: 'What are you struggling with today?',
      contactPlaceholder: 'Example: we have 3 warehouses and Excel is out of control...',
      contactSubmit: 'Send message',
      contactNote: 'Later you can replace this with your own API or .NET backend. For now, Formspree (or a similar service) will email submissions directly to you.',
      navFeatures: 'Features',
      navModules: 'Modules',
      navTour: 'Product tour',
      navFAQ: 'FAQ',
      navRequestDemo: 'Request demo',
      navInventoryStock: 'Inventory & Stock',
    },
    ar: {
      heroChip: 'منصة المخزون الذكية',
      heroTitle: 'ستوك أوربت للتحكم الفعلي في المخزون.',
      subtitle: 'نظام إدارة مخزون ومستودعات متعدد حديث وذكي للشركات الحقيقية.',
      heroCta: 'طلب عرض توضيحي',
      seeProductTour: 'شاهد جولة المنتج',
      metricImplementation: 'وقت التنفيذ',
      metricAccuracy: 'دقة المخزون',
      metricAdoption: 'اعتماد المستخدمين',
      metricValue1: 'أسبوع 4–2',
      metricValue2: '%95+',
      metricValue3: 'أسرع ×3',
      metricNote1: 'من أول تسجيل دخول إلى التشغيل',
      metricNote2: 'مع الانضباط الصحيح للبيانات',
      metricNote3: 'مقارنة بأساليب العمل في Excel',
      whyTitle: 'لماذا ستوك أوربت؟',
      whySubtitle: 'ستوك أوربت يحل محل Excel و WhatsApp والتعامل اليدوي مع المخزون بنظام مخزون موحد وسريع وفوري مبني للعمليات الحقيقية.',
      whyRealTime: 'دقة فورية',
      whyRealTimeDesc: 'مستويات المخزون المباشرة عبر جميع المستودعات.',
      whyTracking: 'تتبع كامل',
      whyTrackingDesc: 'كل حركة مرتبطة بالمشاريع والمستودعات.',
      whyZeroMissing: 'صفر مواد مفقودة',
      whyZeroMissingDesc: 'الطلبات والإصدارات منظمة، وليست ضائعة في المحادثات.',
      whyLoved: 'محبوب من المستخدمين',
      whyLovedDesc: 'واجهة مستخدم نظيفة يستمتع الفرق باستخدامها فعلياً.',
      whyFast: 'نشر سريع',
      whyFastDesc: 'التشغيل في أيام، وليس أشهر.',
      whyCost: 'وضوح التكلفة',
      whyCostDesc: 'اعرف قيمة العنصر فوراً مع حساب تكلفة دقيق بـ FIFO والمتوسط.',
      capabilitiesTitle: 'القدرات',
      capabilitiesSubtitle: 'ما يمنحك إياه ستوك أوربت فوراً:',
      capabilitiesDesc: 'ستوك أوربت يصبح مصدر الحقيقة الوحيد للمخزون والحركات وقيمة المخزون.',
      whoUsesTitle: 'من يستخدم ستوك أوربت',
      whoUsesSubtitle: 'مبني للشركات الحقيقية:',
      modulesTitle: 'الوحدات الأساسية',
      modulesSubtitle: 'اللبنات الأساسية التي تحل محل التعامل اليدوي مع المخزون بأساليب عمل منظمة.',
      dashboardsTitle: 'لوحات المعلومات',
      dashboardsSubtitle: 'رؤى مباشرة للمديرين لاتخاذ قرارات سريعة وصحيحة.',
      reportsTitle: 'التقارير',
      reportsSubtitle: 'تقارير جاهزة للتصدير سيحبها مدققوك.',
      advancedTitle: 'الميزات المتقدمة',
      advancedSubtitle: 'التحكم والأتمتة والرؤية عبر عمليات المخزون بالكامل.',
      aiTitle: 'مساعد ذكي — مدعوم بـ ChatGPT',
      aiSubtitle: 'المساعد الشخصي لفريقك لعمليات المخزون.',
      aiWhatCanDo: 'ما يمكن للمساعد القيام به',
      comparisonTitle: 'لماذا يفوز ستوك أوربت',
      comparisonSubtitle: 'من الأدوات المتناثرة والعمل اليدوي إلى منصة واحدة مركزة.',
      supportTitle: 'الدعم والتحديثات المستمرة',
      supportSubtitle: 'نبقى معك بعد التشغيل — وليس فقط أثناء المشروع.',
      faqTitle: 'الأسئلة الشائعة',
      faqSubtitle: 'الأسئلة التي تطرحها معظم الشركات قبل التحول من Excel والتعامل اليدوي مع المخزون.',
      contactTitle: 'احجز عرض توضيحي سريع',
      contactSubtitle: 'أرسل رسالة قصيرة وسنعود إليك بموعد عرض توضيحي وجولة مخصصة بناءً على صناعتك.',
      contactName: 'الاسم',
      contactCompany: 'الشركة',
      contactEmail: 'البريد الإلكتروني للعمل',
      contactPhone: 'الهاتف / WhatsApp',
      contactMessage: 'ما الذي تواجهه اليوم؟',
      contactPlaceholder: 'مثال: لدينا 3 مستودعات و Excel خارج السيطرة...',
      contactSubmit: 'إرسال الرسالة',
      contactNote: 'يمكنك لاحقاً استبدال هذا بـ API الخاص بك أو خادم .NET. في الوقت الحالي، Formspree (أو خدمة مشابهة) سيرسل التقديمات مباشرة إلى بريدك الإلكتروني.',
      navFeatures: 'الميزات',
      navModules: 'الوحدات',
      navTour: 'جولة المنتج',
      navFAQ: 'الأسئلة الشائعة',
      navRequestDemo: 'طلب عرض توضيحي',
      navInventoryStock: 'المخزون والمستودعات',
    },
  } as const;

  get t() {
    return this.translations[this.currentLang];
  }

  // ---------- Features, modules, metrics, FAQs (will be computed from translations) ----------
  get metrics(): Metric[] {
    return [
      { label: this.t.metricImplementation, value: this.t.metricValue1, note: this.t.metricNote1 },
      { label: this.t.metricAccuracy, value: this.t.metricValue2, note: this.t.metricNote2 },
      { label: this.t.metricAdoption, value: this.t.metricValue3, note: this.t.metricNote3 },
    ];
  }

  get features(): Feature[] {
    return [
    {
      icon: '📦',
        title: this.currentLang === 'en' ? 'Real-time stock visibility' : 'رؤية المخزون الفورية',
        description: this.currentLang === 'en' 
          ? 'Track balances by warehouse, project and location with a clean item ledger.'
          : 'تتبع الأرصدة حسب المستودع والمشروع والموقع مع دفتر عناصر نظيف.',
    },
    {
      icon: '🏗️',
        title: this.currentLang === 'en' ? 'Multi-warehouse & projects' : 'مستودعات ومشاريع متعددة',
        description: this.currentLang === 'en'
          ? 'Main, site & project warehouses with controlled transfers and movements.'
          : 'مستودعات رئيسية وموقعية ومشاريع مع تحويلات وحركات محكمة.',
    },
    {
      icon: '📄',
        title: this.currentLang === 'en' ? 'Digital requests & issue vouchers' : 'طلبات وإيصالات إصدار رقمية',
        description: this.currentLang === 'en'
          ? 'Engineers request, storekeepers issue, managers approve – everything traceable.'
          : 'المهندسون يطلبون، المخزنيون يصدرون، المديرون يوافقون — كل شيء قابل للتتبع.',
    },
    {
      icon: '📊',
        title: this.currentLang === 'en' ? 'Costing & analytics' : 'التكلفة والتحليلات',
        description: this.currentLang === 'en'
          ? 'Weighted-average costing with dashboards for consumption & project usage.'
          : 'حساب تكلفة متوسط مرجح مع لوحات معلومات للاستهلاك واستخدام المشروع.',
    },
    {
      icon: '🛡️',
        title: this.currentLang === 'en' ? 'Roles & permissions' : 'الأدوار والصلاحيات',
        description: this.currentLang === 'en'
          ? 'Granular control per module, action and warehouse for each role.'
          : 'تحكم دقيق لكل وحدة وإجراء ومستودع لكل دور.',
    },
    {
      icon: '🌍',
        title: this.currentLang === 'en' ? 'Arabic + English UI' : 'واجهة عربية وإنجليزية',
        description: this.currentLang === 'en'
          ? 'Modern responsive UI with full RTL support for Arabic users.'
          : 'واجهة مستخدم حديثة متجاوبة مع دعم كامل للـ RTL للمستخدمين العرب.',
      },
    ];
  }

  get modules(): ModuleItem[] {
    return [
      {
        name: this.currentLang === 'en' ? 'Inventory catalog' : 'كتالوج المخزون',
        description: this.currentLang === 'en'
          ? 'Centralized catalog for all materials with clear names, units, and categories.'
          : 'كتالوج مركزي لجميع المواد بأسماء ووحدات وفئات واضحة.',
        highlight: this.currentLang === 'en' 
          ? 'No more duplicated items or messy naming.'
          : 'لا مزيد من العناصر المكررة أو التسمية الفوضوية.',
      },
      {
        name: this.currentLang === 'en' ? 'Warehouses & locations' : 'المستودعات والمواقع',
        description: this.currentLang === 'en'
          ? 'Main, central and site warehouses with location-based tracking.'
          : 'مستودعات رئيسية ومركزية وموقعية مع تتبع قائم على الموقع.',
        highlight: this.currentLang === 'en'
          ? 'You always know where materials physically exist.'
          : 'تعرف دائماً أين توجد المواد فعلياً.',
      },
      {
        name: this.currentLang === 'en' ? 'Issue Requests' : 'طلبات الإصدار',
        description: this.currentLang === 'en'
          ? 'Engineers and site teams raise clear, trackable material requests instead of messages.'
          : 'المهندسون وفرق الموقع يرفعون طلبات مواد واضحة وقابلة للتتبع بدلاً من الرسائل.',
        highlight: this.currentLang === 'en'
          ? 'Zero arguments – everything is documented.'
          : 'صفر خلافات — كل شيء موثق.',
      },
      {
        name: this.currentLang === 'en' ? 'Issue Vouchers' : 'إيصالات الإصدار',
        description: this.currentLang === 'en'
          ? 'Storekeepers issue approved quantities with full audit trail and project references.'
          : 'المخزنيون يصدرون الكميات المعتمدة مع سجل تدقيق كامل ومراجع المشروع.',
        highlight: this.currentLang === 'en'
          ? 'Zero arguments – everything is documented.'
          : 'صفر خلافات — كل شيء موثق.',
      },
      {
        name: this.currentLang === 'en' ? 'All Dashboards (Overview)' : 'جميع لوحات المعلومات (نظرة عامة)',
        description: this.currentLang === 'en'
          ? 'One place to access every operational and management dashboard in the system.'
          : 'مكان واحد للوصول إلى كل لوحة معلومات تشغيلية وإدارية في النظام.',
        highlight: this.currentLang === 'en'
          ? 'From "I think" to "I know" in a single screen.'
          : 'من "أعتقد" إلى "أعرف" في شاشة واحدة.',
      },
    ];
  }

  get faqs(): FAQ[] {
    return [
      {
        question: this.currentLang === 'en' 
          ? 'Does it support multiple warehouses?'
          : 'هل يدعم مستودعات متعددة؟',
        answer: this.currentLang === 'en'
          ? 'Yes. You can define multiple main, site, and project warehouses with full control and reporting.'
          : 'نعم. يمكنك تعريف مستودعات رئيسية وموقعية ومشاريع متعددة مع تحكم وتقارير كاملة.',
      },
      {
        question: this.currentLang === 'en' 
          ? 'Do you support approvals?'
          : 'هل تدعم الموافقات؟',
        answer: this.currentLang === 'en'
          ? 'Yes. StockOrbit includes configurable multi-level approvals for requests, issue vouchers, and other workflows.'
          : 'نعم. يتضمن ستوك أوربت موافقات متعددة المستويات قابلة للتكوين للطلبات وإيصالات الإصدار وأساليب العمل الأخرى.',
      },
      {
        question: this.currentLang === 'en' 
          ? 'Do you support mobile?'
          : 'هل تدعم الهاتف المحمول؟',
        answer: this.currentLang === 'en'
          ? 'The web app is fully responsive and works on laptops and tablets, with support for mobile-friendly approvals and views.'
          : 'التطبيق الويب متجاوب بالكامل ويعمل على أجهزة الكمبيوتر المحمولة والأجهزة اللوحية، مع دعم للموافقات والعروض الصديقة للهاتف المحمول.',
      },
      {
        question: this.currentLang === 'en' 
          ? 'Is AI really included?'
          : 'هل الذكاء الاصطناعي متضمن فعلاً؟',
        answer: this.currentLang === 'en'
          ? 'Yes. The AI Copilot is built-in, powered by ChatGPT, and helps users understand data, generate insights, and perform actions.'
          : 'نعم. المساعد الذكي مدمج، مدعوم بـ ChatGPT، ويساعد المستخدمين على فهم البيانات وتوليد الرؤى وتنفيذ الإجراءات.',
      },
      {
        question: this.currentLang === 'en' 
          ? 'Do you support Arabic?'
          : 'هل تدعم العربية؟',
        answer: this.currentLang === 'en'
          ? 'Yes, full English + Arabic from login to reports.'
          : 'نعم، إنجليزية وعربية كاملة من تسجيل الدخول إلى التقارير.',
      },
      {
        question: this.currentLang === 'en' 
          ? 'How fast can we go live?'
          : 'ما مدى سرعة التشغيل؟',
        answer: this.currentLang === 'en'
          ? 'In days, not months — depending on how fast we receive your data and configuration decisions.'
          : 'في أيام، وليس أشهر — اعتماداً على سرعة استلام بياناتك وقرارات التكوين.',
      },
    ];
  }

  currentYear = new Date().getFullYear();

  // ---------- Lightbox state ----------
  isLightboxOpen = false;
  lightboxImageSrc: string | null = null;

  // ---------- Mobile menu state ----------
  isMobileMenuOpen = false;

  // ---------- Language methods ----------
  setLanguage(lang: 'en' | 'ar'): void {
    this.currentLang = lang;
    localStorage.setItem('so-landing-lang', lang);
    
    if (lang === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    }
  }

  getScreenshot(path: string): string {
    // `path` is relative like 'core/inventory-items.png'
    if (this.currentLang === 'ar') {
      const parts = path.split('/');
      parts[0] = parts[0] + '-ar'; // core -> core-ar, dashboards -> dashboards-ar, etc.
      return '/screenshots/' + parts.join('/');
    }
    return '/screenshots/' + path;
  }

  checkMobile(): void {
    this.isMobile = window.innerWidth <= 720;
  }

  async initLanguage(): Promise<void> {
    // 1. Check localStorage first
    const savedLang = localStorage.getItem('so-landing-lang') as 'en' | 'ar' | null;
    if (savedLang === 'en' || savedLang === 'ar') {
      this.setLanguage(savedLang);
      return;
    }

    // 2. Try IP-based detection
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        const countryCode = data.country_code;
        
        // Arabic countries list
        const arabicCountries = ['SA', 'EG', 'AE', 'QA', 'BH', 'KW', 'OM', 'JO', 'LB', 'DZ', 'MA', 'TN', 'IQ', 'LY', 'YE', 'SD', 'SY', 'PS', 'SO'];
        
        if (countryCode && arabicCountries.includes(countryCode)) {
          this.setLanguage('ar');
          return;
        }
      }
    } catch (error) {
      // IP detection failed, fall through to browser language
      console.log('IP geolocation failed, falling back to browser language');
    }

    // 3. Fallback to browser language
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    const isArabic = browserLang.startsWith('ar');
    this.setLanguage(isArabic ? 'ar' : 'en');
  }

  ngOnInit(): void {
    // Safety: make sure body scroll isn't locked when component mounts
    document.body.classList.remove('no-scroll');
    
    // Check mobile on init
    this.checkMobile();
    
    // Initialize language with IP detection
    this.initLanguage();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkMobile();
  }

  ngOnDestroy(): void {
    // Safety: unlock scroll when component is destroyed
    document.body.classList.remove('no-scroll');
  }

  // Open the lightbox with given image src (path relative to screenshots folder)
  openLightbox(path: string): void {
    this.lightboxImageSrc = this.getScreenshot(path);
    this.isLightboxOpen = true;
    document.body.classList.add('no-scroll');
  }

  // Close from close button / backdrop / ESC
  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.lightboxImageSrc = null;
    document.body.classList.remove('no-scroll');
  }

  // Clicking on the dimmed backdrop closes the overlay
  onLightboxBackdropClick(event: MouseEvent): void {
    // Only close if clicking directly on the overlay, not on the content
    if (event.target === event.currentTarget) {
      this.closeLightbox();
    }
  }

  // Close with ESC key
  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isLightboxOpen) {
      this.closeLightbox();
    } else if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  // ---------- Mobile menu methods ----------
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.classList.remove('no-scroll');
  }

  onMobileNavLinkClick(): void {
    // Close mobile menu when a nav link is clicked
    this.closeMobileMenu();
  }

  // Close mobile menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMobileMenuOpen) {
      return;
    }

    const target = event.target as HTMLElement;
    const navbar = target.closest('.navbar');
    
    if (!navbar) {
      this.closeMobileMenu();
    }
  }
}
