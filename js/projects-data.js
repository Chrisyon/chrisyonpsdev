/* ==========================================================================
   PORTFOLIO DATA & DUAL-LANGUAGE DICTIONARY (ID & EN)
   ========================================================================== */

const portfolioData = {
  // Dual-language dictionary
  translations: {
    id: {
      navHome: "Beranda",
      navAbout: "Tentang",
      navSkills: "Keahlian",
      navProjects: "Proyek",
      navExperience: "Pengalaman",
      navContact: "Kontak",
      statusAvailable: "Tersedia untuk Project & Hire",
      heroGreeting: "Halo, Saya",
      heroRolePrefix: "Spesialisasi ",
      heroBio: "Full-Stack, Android & IoT Engineer berpengalaman dalam membangun aplikasi Android berbasis Kotlin, solusi IoT dengan Python & MicroPython, serta sistem Backend & Web yang handal.",
      btnViewProjects: "Lihat Proyek",
      btnContactMe: "Hubungi Saya",
      badgeExp: "Pengalaman",
      badgeSatisfaction: "Kepuasan Klien",
      badgeYears: "2+ Tahun",
      sectionAboutTag: "TENTANG SAYA",
      aboutTitle: "Mengubah Ide Kompleks Menjadi Solusi Digital Berkelas",
      aboutDesc: "Saya adalah seorang Software Engineer (Android, Full-Stack & IoT) yang berpengalaman dalam pembuatan aplikasi Android (Kotlin), sistem IoT (Python & MicroPython), arsitektur Backend, dan Web modern.",
      statProjects: "Proyek Selesai",
      statClients: "Klien Puas",
      statCommit: "Kode Bersih & Scalable",
      sectionSkillsTag: "STACK TEKNOLOGI",
      skillsTitle: "Keahlian & Toolkit Berkelas",
      skillsSubtitle: "Kombinasi teknologi modern yang saya kuasai untuk menghadirkan aplikasi Android (Kotlin), sistem Backend, dan Web berkualitas tinggi.",
      filterAll: "Semua",
      filterMobile: "Android & Mobile",
      filterFrontend: "Web Frontend",
      filterBackend: "Backend & Database",
      filterIoT: "IoT & Hardware",
      filterDevops: "DevOps & Tools",
      sectionProjectsTag: "PORTFOLIO SHOWCASE",
      projectsTitle: "Proyek Pilihan Terpopuler",
      projectsSubtitle: "Jelajahi hasil karya aplikasi web & sistem yang telah saya kembangkan.",
      filterCategoryWeb: "Web App",
      filterCategoryMobile: "Mobile App",
      filterCategoryAI: "AI & SaaS",
      btnLiveDemo: "Live Demo",
      btnSourceCode: "Source Code",
      btnDetail: "Rincian Proyek",
      sectionExperienceTag: "PERJALANAN KARIR",
      expTitle: "Pengalaman & Edukasi",
      expSubtitle: "Jejak karir profesional dan kontribusi dalam pengembangan teknologi.",
      sectionTestimonialsTag: "TESTIMONI KLIEN",
      testiTitle: "Apa Kata Klien & Mitra",
      sectionContactTag: "MARI BEKERJASAMA",
      contactTitle: "Punya Ide Proyek Hebat?",
      contactSubtitle: "Saya siap membantu mewujudkan proyek impian Anda. Hubungi saya melalui email atau WhatsApp di bawah ini.",
      infoEmail: "Email Saya",
      infoPhone: "WhatsApp / Telp",
      infoLocation: "Lokasi",
      copiedToast: "Teks berhasil disalin ke clipboard!",
      footerCopy: "Hak Cipta © 2026 Chrisyon Putra Sitania (cps). Built with passion & elegance.",
    },
    en: {
      navHome: "Home",
      navAbout: "About",
      navSkills: "Skills",
      navProjects: "Projects",
      navExperience: "Experience",
      navContact: "Contact",
      statusAvailable: "Available for Projects & Hire",
      heroGreeting: "Hello, I'm",
      heroRolePrefix: "Specializing in ",
      heroBio: "Full-Stack, Android & IoT Software Engineer skilled in crafting Kotlin-based Android apps, IoT systems with Python & MicroPython, and scalable Backend & Web solutions.",
      btnViewProjects: "View Projects",
      btnContactMe: "Contact Me",
      badgeExp: "Experience",
      badgeSatisfaction: "Client Satisfaction",
      badgeYears: "2+ Years",
      sectionAboutTag: "ABOUT ME",
      aboutTitle: "Turning Complex Ideas into Premium Digital Solutions",
      aboutDesc: "I am a Software Engineer (Android, Full-Stack & IoT) skilled in building Android apps (Kotlin), IoT automation (Python & MicroPython), robust Backend systems, and modern Web applications.",
      statProjects: "Completed Projects",
      statClients: "Happy Clients",
      statCommit: "Clean & Scalable Code",
      sectionSkillsTag: "TECH STACK",
      skillsTitle: "Skills & Modern Toolkit",
      skillsSubtitle: "A curated stack of modern technologies I use to craft Android apps (Kotlin), Backend systems, and Web applications.",
      filterAll: "All",
      filterMobile: "Android & Mobile",
      filterFrontend: "Web Frontend",
      filterBackend: "Backend & Database",
      filterIoT: "IoT & Hardware",
      filterDevops: "DevOps & Tools",
      sectionProjectsTag: "PORTFOLIO SHOWCASE",
      projectsTitle: "Featured Showcase Projects",
      projectsSubtitle: "Explore selected web applications and digital products I have built.",
      filterCategoryWeb: "Web App",
      filterCategoryMobile: "Mobile App",
      filterCategoryAI: "AI & SaaS",
      btnLiveDemo: "Live Demo",
      btnSourceCode: "Source Code",
      btnDetail: "Project Details",
      sectionExperienceTag: "CAREER JOURNEY",
      expTitle: "Experience & Education",
      expSubtitle: "Chronological summary of my professional journey and tech impact.",
      sectionContactTag: "GET IN TOUCH",
      contactTitle: "Have a Great Project Idea?",
      contactSubtitle: "I am ready to help turn your vision into reality. Reach out via email or WhatsApp below.",
      infoEmail: "My Email",
      infoPhone: "WhatsApp / Phone",
      infoLocation: "Location",
      copiedToast: "Copied to clipboard successfully!",
      footerCopy: "Copyright © 2026 Chrisyon Putra Sitania (cps). Built with passion & elegance.",
    }
  },

  // Typing Roles
  typingRoles: [
    "Android Engineer (Kotlin)",
    "IoT Systems Specialist",
    "Python & Backend Developer",
    "Full-Stack Web Engineer"
  ],

  // Skills List (Clean Monogram Badges)
  skills: [
    { name: "Java 17 & Spring Boot 3", level: 93, category: "backend", icon: "JV" },
    { name: "React 18 & TypeScript", level: 90, category: "frontend", icon: "TS" },
    { name: "MySQL 8.0 & Flyway Migration", level: 88, category: "backend", icon: "SQL" },
    { name: "Android Development (Kotlin)", level: 95, category: "mobile", icon: "KT" },
    { name: "Jetpack Compose & Android SDK", level: 92, category: "mobile", icon: "AD" },
    { name: "Python & MicroPython (IoT)", level: 92, category: "iot", icon: "PY" },
    { name: "IoT & Embedded Systems (ESP32/RPI)", level: 90, category: "iot", icon: "IOT" },
    { name: "Spring Security & JWT Auth", level: 90, category: "backend", icon: "SEC" },
    { name: "Node.js & Express.js Backend", level: 88, category: "backend", icon: "JS" },
    { name: "PHP / Laravel Framework", level: 85, category: "backend", icon: "PHP" },
    { name: "REST APIs & Microservices", level: 90, category: "backend", icon: "API" },
    { name: "PostgreSQL & MongoDB", level: 85, category: "backend", icon: "DB" },
    { name: "Firebase & Azure Custom Vision", level: 88, category: "backend", icon: "AI" },
    { name: "Docker & Docker Compose", level: 86, category: "devops", icon: "DOC" },
    { name: "Git, GitHub & CI/CD", level: 92, category: "devops", icon: "GIT" }
  ],

  // Projects List
  projects: [
    {
      id: "proj-stockflow",
      title: "StockFlow — Inventory & Sales Management System",
      category: "web",
      logoBadgeText: "STOCKFLOW",
      logoSubtext: "POS & INVENTORY",
      logoIcon: "SF",
      logoGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(56, 189, 248, 0.15) 100%)",
      accentColor: "#10b981",
      githubUrl: "https://github.com/Chrisyon/stockflow",
      tags: ["Java 17", "Spring Boot 3", "React 18", "TypeScript", "MySQL 8.0", "Docker", "Flyway", "JWT"],
      desc: {
        id: "Aplikasi Kasir (POS) & Manajemen Inventori toko berbasis Web modern untuk UMKM / Retail. Berbasis arsitektur backend industri Java Spring Boot 3 + Spring Security JWT + MySQL Pessimistic Locking + Flyway DB, dan frontend React 18 + TypeScript + Tailwind CSS. Fitur unggulan: Zero-Trust Pricing, Concurrency Safety (FOR UPDATE), Atomic Checkout Transactions, Laporan Profit Eksekutif, Ekspor CSV & Cetak Struk.",
        en: "Modern Web-based Inventory & Point of Sale (POS) Management System for Retail/MSMEs. Built with enterprise-grade Java Spring Boot 3 + Spring Security JWT + MySQL Pessimistic Locking + Flyway DB backend, and React 18 + TypeScript + Tailwind CSS frontend. Features Zero-Trust Pricing, Concurrency Safety, Atomic Checkout Transactions, Executive Profit Analytics, CSV Export & Receipt Printing."
      },
      details: {
        architecture: "Java 17 (Spring Boot 3.2), Spring Security JWT, MySQL 8.0 (Pessimistic Locking 'FOR UPDATE'), Flyway Migration, React 18 + TypeScript + Tailwind CSS, Docker Compose, JUnit 5 + Mockito",
        features: {
          id: [
            "Authentication & Role Guard: Spring Security JWT Stateless dengan enkripsi BCrypt & role dinamis (ADMIN, CASHIER, OWNER). Quick Demo Role Switcher pada UI.",
            "POS & Cashier Engine: Zero-Trust Pricing backend, Concurrency Safety dengan Pessimistic Write Locking (FOR UPDATE) mencegah stok negatif, Atomic Transaction (@Transactional), & Cetak Struk Penjualan physical preview.",
            "Product & Category Management: Pengelolaan SKU unik, kalkulasi otomatis Gross Margin Profit, notifikasi stok menipis, & barcode scanner ready.",
            "Inventory Movement & Audit Trail: Catat restock dari distributor, adjustment opname gudang / barang rusak, & jejak audit lengkap (IN, OUT, ADJUSTMENT, SALE).",
            "Executive Analytics & Sales Reports: Dashboard omset & gross profit, visual bar chart tren penjualan, Top 5 produk terlaris, & Ekspor laporan spreadsheet CSV.",
            "Containerized & Tested: Standar industri siap deploy dengan Docker Compose & 100% pass automated test suite (JUnit 5 + Mockito)."
          ],
          en: [
            "Authentication & Role Guard: Spring Security JWT Stateless with BCrypt encryption & dynamic roles (ADMIN, CASHIER, OWNER). Quick Demo Role Switcher on UI.",
            "POS & Cashier Engine: Zero-Trust Pricing backend calculation, Concurrency Safety using Pessimistic Write Locking (FOR UPDATE) preventing negative stock, Atomic Transaction (@Transactional), and Printable physical receipt preview.",
            "Product & Category Management: Unique SKU tracking, automatic gross margin calculations, low-stock alerts, & barcode scanner compatibility.",
            "Inventory Movement & Audit Trail: Supplier restock tracking, manual stock adjustments, and full audit logs (IN, OUT, ADJUSTMENT, SALE).",
            "Executive Analytics & Sales Reports: Revenue & profit metric cards, sales trend charts, Top 5 products, and CSV report exports.",
            "Containerized & Tested: Production-ready setup with Docker Compose and automated JUnit 5 + Mockito test suite."
          ]
        },
        credentials: [
          { role: "ADMIN", user: "admin", pass: "password123", access: "Penuh (Master Data, Restock, Users, Audit Logs)" },
          { role: "CASHIER", user: "kasir1", pass: "password123", access: "Operasional Kasir (POS Checkout, Katalog Produk, Cetak Struk)" },
          { role: "OWNER", user: "owner", pass: "password123", access: "Eksekutif (Dashboard Analytics, Profit Margin, Laporan CSV)" }
        ]
      }
    },
    {
      id: "proj-sfa",
      title: "SFA - Sales Force Automation",
      category: "mobile",
      logoBadgeText: "SFA",
      logoSubtext: "SALES FORCE",
      logoIcon: "SFA",
      logoGradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)",
      accentColor: "#38bdf8",
      githubUrl: "https://github.com/Chrisyon",
      tags: ["Kotlin", "Android Native", "Java", "Eclipse", "REST API"],
      desc: {
        id: "Aplikasi Sales Force Automation (SFA) untuk efisiensi manajemen penjualan, pelacakan pesanan, dan distribusi produk. Dikembangkan dengan antarmuka Android Native (Kotlin) dan sistem Backend enterprise berbasis Java (Eclipse).",
        en: "Sales Force Automation (SFA) enterprise application for sales management, order tracking, and product distribution. Built with native Kotlin Android frontend and Java (Eclipse) backend."
      }
    },
    {
      id: "proj-smartbelt",
      title: "SmartBelt - Wearable Accident Detection",
      category: "mobile",
      logoBadgeText: "SMART-BELT",
      logoSubtext: "IOT WEARABLE",
      logoIcon: "SB",
      logoGradient: "linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)",
      accentColor: "#f43f5e",
      githubUrl: "https://github.com/Chrisyon",
      tags: ["Kotlin", "Android SDK", "IoT Sensors", "GPS Emergency", "Wearable"],
      desc: {
        id: "Perangkat wearable pintar & aplikasi Android berbasis Kotlin yang dirancang untuk mendeteksi kecelakaan secara otomatis menggunakan sensor terintegrasi, memicu peringatan darurat GPS, dan memantau kondisi pengguna secara real-time.",
        en: "Smart wearable device & Kotlin Android app designed to detect accidents automatically using integrated sensors, trigger emergency GPS alerts, and monitor user conditions in real time."
      }
    },
    {
      id: "proj-extracker",
      title: "ExTracker - Expense & Budget Manager",
      category: "mobile",
      logoBadgeText: "ExTracker",
      logoSubtext: "FINANCE APP",
      logoIcon: "EX",
      logoGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)",
      accentColor: "#10b981",
      githubUrl: "https://github.com/Chrisyon",
      tags: ["Kotlin", "Android SDK", "Clean Architecture", "Room DB", "MPAndroidChart"],
      desc: {
        id: "Aplikasi Android native pengelola keuangan & pencatat pengeluaran pribadi (ExTracker) berbasis Kotlin dengan Clean Architecture, grafik analitik pengeluaran bulanan interaktif, serta penyimpanan lokal yang aman.",
        en: "Native Kotlin Android expense tracking application featuring Clean Architecture, interactive spending analytics charts, and secure offline Room database persistence."
      }
    },
    {
      id: "proj-fruit-quality",
      title: "Apple & Banana Quality Predictors",
      category: "ai",
      logoBadgeText: "FRUIT AI",
      logoSubtext: "QUALITY PREDICTOR",
      logoIcon: "AI",
      logoGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)",
      accentColor: "#f59e0b",
      githubUrl: "https://github.com/Chrisyon",
      tags: ["Raspberry Pi", "MicroPython / Python", "Laravel", "Azure Custom Vision", "Machine Learning"],
      desc: {
        id: "Sistem klasifikasi & pemantauan kualitas buah (Apel & Pisang) berbasis IoT dan Cloud Machine Learning. Memanfaatkan Raspberry Pi, Laravel, serta Azure Custom Vision untuk kontrol kualitas produk otomatis via image recognition.",
        en: "IoT-based fruit quality classification system using Raspberry Pi, Laravel, Azure Custom Vision, and cloud machine learning for automated quality control via image recognition."
      }
    }
  ],

  // Timeline Experience, Education & Certifications
  timeline: [
    {
      id: "timeline-internship",
      period: "1 Sep 2025 - 28 Feb 2026",
      role: "IT Staff Intern (Magang IT 6 Bulan)",
      company: "Duo Dinamika Consultant",
      badge: "Magang Certificate",
      certImage: "assets/certificates/internship.jpeg",
      certTitle: "Sertifikat Magang Duo Dinamika Consultant",
      desc: {
        id: "Mengelola infrastruktur IT perusahaan, pemeliharaan sistem lunak & jaringan komputer, perancangan aplikasi pendukung operasional, serta memberikan dukungan teknis IT Staff selama 6 bulan magang.",
        en: "Managed corporate IT infrastructure, software system & computer network maintenance, built operational support applications, and provided full IT technical support during 6 months internship."
      }
    },
    {
      id: "timeline-google-cybersecurity",
      period: "25 Juni 2026",
      role: "Google Cybersecurity Professional Certificate",
      company: "Google (via Coursera)",
      badge: "Google Certified",
      certImage: "assets/certificates/Coursera UV9YGX04Q2GF_page-0001.jpg",
      certTitle: "Google Cybersecurity Professional Certificate",
      desc: {
        id: "Sertifikasi Profesional resmi dari Google mencakup 8 bidang spesialisasi: Keamanan Jaringan, Identifikasi Ancaman & Kerentanan, Alat Linux & SQL, Deteksi SIEM & IDS, Automasi Tugas Cybersecurity dengan Python, dan Manajemen Risiko Keamanan.",
        en: "Official Google Professional Certificate covering 8 courses: Network Security, Asset & Threat Management, Linux & SQL Tools, SIEM & IDS Detection, Python Automation, and Security Risk Management."
      }
    },
    {
      id: "timeline-mtcna",
      period: "7 Juli 2025",
      role: "MikroTik Certified Network Associate (MTCNA)",
      company: "MikroTik SIA",
      badge: "MikroTik Cert",
      certImage: "assets/certificates/computer network certification_Chrisyon_page-0001.jpg",
      certTitle: "MikroTik Certified Network Associate (MTCNA)",
      desc: {
        id: "Sertifikasi keahlian arsitektur jaringan komputer, konfigurasi RouterOS, routing protocol, firewall, dan keamanan sistem jaringan komputer.",
        en: "Certification in computer network architecture, RouterOS configuration, routing protocols, firewalls, and network system security."
      }
    },
    {
      id: "timeline-pcap-python",
      period: "29 April 2024",
      role: "PCAP – Programming Essentials in Python",
      company: "Cisco Networking Academy & Python Institute",
      badge: "Cisco & Python Cert",
      certImage: "assets/certificates/Partner-_PCAP_-_Programming_Essentials_in_Python_certificate_s160422121-student-ubaya-ac-id_2480c695-b4c2-4806-8afa-97e11c8b62aa_page-0001.jpg",
      certTitle: "Cisco PCAP Programming Essentials in Python Certificate",
      desc: {
        id: "Sertifikasi kompetensi resmi pemrograman Python dari Cisco Networking Academy & Python Institute mencakup struktur data, algoritma, pemrograman berorientasi objek (OOP), dan modul sistem.",
        en: "Official Python programming competency certification from Cisco Networking Academy & Python Institute covering data structures, algorithms, object-oriented programming (OOP), and system modules."
      }
    }
  ]
};
