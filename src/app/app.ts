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
  subtitle =
    'Smart, modern multi-warehouse inventory & stock management for real-world companies.';

  metrics: Metric[] = [
    { label: 'Implementation time', value: '2–4 weeks', note: 'From first login to go-live' },
    { label: 'Stock accuracy', value: '95%+', note: 'With proper data discipline' },
    { label: 'User adoption', value: '3× faster', note: 'Compared to Excel workflows' },
  ];

  features: Feature[] = [
    {
      icon: '📦',
      title: 'Real-time stock visibility',
      description: 'Track balances by warehouse, project and location with a clean item ledger.',
    },
    {
      icon: '🏗️',
      title: 'Multi-warehouse & projects',
      description: 'Main, site & project warehouses with controlled transfers and movements.',
    },
    {
      icon: '📄',
      title: 'Digital requests & issue vouchers',
      description: 'Engineers request, storekeepers issue, managers approve – everything traceable.',
    },
    {
      icon: '📊',
      title: 'Costing & analytics',
      description: 'Weighted-average costing with dashboards for consumption & project usage.',
    },
    {
      icon: '🛡️',
      title: 'Roles & permissions',
      description: 'Granular control per module, action and warehouse for each role.',
    },
    {
      icon: '🌍',
      title: 'Arabic + English UI',
      description: 'Modern responsive UI with full RTL support for Arabic users.',
    },
  ];

  modules: ModuleItem[] = [
    {
      name: 'Inventory catalog',
      description:
        'Centralized item master with units, categories, min/max levels and preferred suppliers.',
      highlight: 'No more duplicated items or messy naming.',
    },
    {
      name: 'Warehouses & locations',
      description: 'Main, central and site warehouses with location-based tracking.',
      highlight: 'You always know where materials physically exist.',
    },
    {
      name: 'Requests & issue vouchers',
      description:
        'Engineers raise requests, storekeepers issue material, approvals are logged with audit trail.',
      highlight: 'Zero arguments – everything is documented.',
    },
    {
      name: 'Dashboards & reports',
      description:
        'Stock value, project consumption, slow-moving items and more, in one place.',
      highlight: 'From “I think” to “I know” in a single screen.',
    },
  ];

  screenshots: Screenshot[] = [
    {
      src: 'assets/screenshots/dashboard.png',
      title: 'Inventory overview dashboard',
      description: 'See stock value, top items and warehouse health in one view.',
    },
    {
      src: 'assets/screenshots/item-ledger.png',
      title: 'Item ledger',
      description: 'Full movement history for each item across warehouses and projects.',
    },
    {
      src: 'assets/screenshots/issue-request.png',
      title: 'Issue request workflow',
      description: 'Engineers request material, storekeepers issue, managers approve.',
    },
  ];

  currentScreenshotIndex = 0;

  get currentScreenshot(): Screenshot {
    return this.screenshots[this.currentScreenshotIndex];
  }

  nextScreenshot(): void {
    this.currentScreenshotIndex =
      (this.currentScreenshotIndex + 1) % this.screenshots.length;
  }

  prevScreenshot(): void {
    this.currentScreenshotIndex =
      (this.currentScreenshotIndex - 1 + this.screenshots.length) %
      this.screenshots.length;
  }

  goToScreenshot(index: number): void {
    this.currentScreenshotIndex = index;
  }

  faqs: FAQ[] = [
    {
      question: 'Is StockOrbit suitable for small & mid-size companies?',
      answer:
        'Yes. The whole design targets SMEs that need strong stock control without a huge ERP project.',
    },
    {
      question: 'Can my storekeepers use it on-site?',
      answer:
        'Yes. The UI is responsive and works on laptops and tablets. You can later add handheld devices as well.',
    },
    {
      question: 'Do you support Arabic?',
      answer: '100%. Full RTL and bilingual labels are supported.',
    },
  ];

  currentYear = new Date().getFullYear();

  // ---------- Lightbox state ----------
  isLightboxOpen = false;
  lightboxImageSrc: string | null = null;

  // ---------- Mobile menu state ----------
  isMobileMenuOpen = false;

  ngOnInit(): void {
    // Safety: make sure body scroll isn't locked when component mounts
    document.body.classList.remove('no-scroll');
  }

  ngOnDestroy(): void {
    // Safety: unlock scroll when component is destroyed
    document.body.classList.remove('no-scroll');
  }

  // Open the lightbox with given image src
  openLightbox(src: string): void {
    this.lightboxImageSrc = src;
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
