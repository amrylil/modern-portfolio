import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed Admin User
  const adminEmail = "admin@ulilamry.com";
  const hashedPassword = await bcrypt.hash("adminpassword123", 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Ulil Amry Al Qadri",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Seed Profile
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        name: "Ulil Amry Al Qadri",
        title: "Software Developer",
        greeting: "Hi, I'm Ulil Amry Al Qadri",
        avatarUrl: "/images/anuku2.png",
        bio: "Software Developer with strong expertise in backend development, primarily using Golang, Laravel, and JavaScript.",
        aboutMe:
          "I am a passionate Software Developer with strong expertise in backend development, primarily using Golang, Laravel, and JavaScript to build reliable and high-performance web applications. I have hands-on experience in designing and developing RESTful APIs, optimizing database performance, and integrating modern tools such as Express.js, React, Docker, and CI/CD pipelines to streamline development workflows. My interest in programming began with curiosity about how websites and systems work, which later grew into a deep commitment to mastering backend engineering and software architecture. Born on November 11, 2003, in North Kolaka, Southeast Sulawesi, I am currently pursuing a degree in Informatics Engineering at Universitas Dipa Makassar, where I continue to expand my technical knowledge and practical experience through academic projects and personal explorations. I strive to write clean, efficient, and maintainable code while constantly learning new technologies that enhance scalability and user experience. With a strong work ethic, attention to detail, and a passion for continuous growth, I aim to contribute meaningfully to teams and projects that create innovative and impactful digital solutions.",
        aboutMeMobile:
          "I am a passionate Software Developer with strong expertise in backend development, primarily using Golang, Laravel, and JavaScript to build reliable and high-performance web applications. I have hands-on experience in designing and developing RESTful APIs, optimizing database performance, and integrating modern tools such as Express.js, React, Docker, and CI/CD pipelines to streamline development workflows. My interest in programming began with curiosity about how websites and systems work, which later grew into a deep commitment to mastering backend engineering and software architecture. Born on November 11, 2003, in North Kolaka, Southeast Sulawesi, I am currently pursuing a degree in Informatics Engineering at Universitas Dipa Makassar, where I continue to expand my technical knowledge and practical experience.",
        email: "ulilamry432@gmail.com",
        phone: "+62 823 7839 8419",
        address:
          "Jl. Perintis Kemerdekaan 7, Tamalanrea Indah, Tamalanrea District, Makassar City, South Sulawesi, Indonesia",
        githubUsername: "amrylil",
        githubUrl: "https://github.com/amrylil",
        linkedinUrl:
          "https://www.linkedin.com/in/ulil-amry-al-qadri-363a841b3/",
      },
    });
    console.log("✅ Profile seeded");
  }

  // 3. Seed Skills
  const skillsData = [
    { title: "React", icon: "SiReact", href: "https://react.dev", category: "Frontend", order: 1 },
    { title: "Next.js", icon: "SiNextdotjs", href: "https://nextjs.org", category: "Fullstack", order: 2 },
    { title: "JavaScript", icon: "SiJavascript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", category: "Language", order: 3 },
    { title: "TypeScript", icon: "SiTypescript", href: "https://www.typescriptlang.org", category: "Language", order: 4 },
    { title: "Tailwind CSS", icon: "SiTailwindcss", href: "https://tailwindcss.com", category: "Frontend", order: 5 },
    { title: "Golang", icon: "SiGo", href: "https://go.dev", category: "Backend", order: 6 },
    { title: "Laravel", icon: "SiLaravel", href: "https://laravel.com", category: "Backend", order: 7 },
    { title: "PHP", icon: "SiPhp", href: "https://www.php.net", category: "Backend", order: 8 },
    { title: "Express.js", icon: "SiExpress", href: "https://expressjs.com", category: "Backend", order: 9 },
    { title: "NestJS", icon: "SiNestjs", href: "https://nestjs.com", category: "Backend", order: 10 },
    { title: "Docker", icon: "SiDocker", href: "https://www.docker.com", category: "DevOps", order: 11 },
  ];

  for (const s of skillsData) {
    const existing = await prisma.skill.findFirst({ where: { title: s.title } });
    if (!existing) {
      await prisma.skill.create({ data: s });
    }
  }
  console.log(`✅ ${skillsData.length} Skills seeded`);

  // 4. Seed Projects
  const projectsData = [
    {
      title: "Portal Digital Hero",
      slug: "portal-digital-hero",
      image: "/images/project/portalhero.png",
      link: null,
      preview: "https://portal.digitalhero.id",
      status: "Deployed",
      isPrivate: true,
      isFeatured: true,
      description:
        "Portal Digital Hero adalah platform terpusat untuk layanan kami, menyediakan akses mudah ke berbagai fitur dan informasi bagi pengguna.",
      tools: JSON.stringify(["React.js", "Tailwind CSS", "Bun", "Express.js", "PostgreSQL"]),
      order: 1,
    },
    {
      title: "Helpdesk LLDIKTI IX Demo",
      slug: "helpdesk-lldikti-ix-demo",
      image: "/images/project/helpdesk.png",
      link: null,
      preview: "https://helpdesk-demo.vercel.app",
      status: "On Development",
      isPrivate: true,
      isFeatured: true,
      description:
        "Sistem helpdesk untuk LLDIKTI IX yang bertujuan untuk mendemonstrasikan alur tiket dan manajemen dukungan pelanggan yang efisien.",
      tools: JSON.stringify(["React.js", "Tailwind CSS", "Golang", "Gin", "Microsoft SQL Server"]),
      order: 2,
    },
    {
      title: "Hero Hub - Digital Hero",
      slug: "hero-hub-digital-hero",
      image: "/images/project/learnhero.png",
      link: null,
      preview: "https://learn.digitalhero.id",
      status: "Contributor",
      isPrivate: true,
      isFeatured: true,
      description:
        "Platform Learning Management System (LMS) dari Digital Hero, di mana saya berkontribusi dalam pengembangan fitur-fitur utama.",
      tools: JSON.stringify(["React.js", "Tailwind CSS", "Bun", "Express.js", "PostgreSQL"]),
      order: 3,
    },
    {
      title: "Digital Hero App",
      slug: "digital-hero-app",
      image: "/images/project/fronthero.png",
      link: null,
      preview: "https://digitalhero.id",
      status: "Deployed",
      isPrivate: true,
      isFeatured: true,
      description:
        "Website utama Digital Hero yang menampilkan profil perusahaan, layanan, dan portofolio. Dibangun dengan fokus pada kecepatan dan SEO.",
      tools: JSON.stringify(["React.js", "TypeScript", "Tailwind CSS", "Bun", "Express.js", "PostgreSQL"]),
      order: 4,
    },
    {
      title: "Sruput",
      slug: "sruput",
      image: "/images/project/sruput.jpg",
      link: "https://github.com/amrylil/coffeshop",
      preview: "https://sruput.gleeze.com",
      status: "Deployed",
      isPrivate: false,
      isFeatured: true,
      description:
        "Aplikasi pemesanan kopi fiktif 'Sruput'. Pengguna dapat menelusuri menu, menambahkan ke troli, dan melakukan checkout.",
      tools: JSON.stringify(["Laravel", "Inertia.js", "Vue.js", "TypeScript", "PostgreSQL"]),
      order: 5,
    },
    {
      title: "Liltech - Portfolio Website",
      slug: "liltech-portfolio-website",
      image: "/images/project/liltech.png",
      link: "https://github.com/amrylil/modern-portfolio",
      preview: "https://liltech.me/",
      status: "Deployed",
      isPrivate: false,
      isFeatured: true,
      description:
        "Website portofolio pribadi saya sebelumnya, menampilkan proyek dan keahlian saya dengan desain yang modern dan responsif.",
      tools: JSON.stringify(["Next.js", "Framer Motion", "Tailwind CSS", "Vercel"]),
      order: 6,
    },
    {
      title: "Kerjamail Clone - Test Case",
      slug: "kerjamail-clone-test-case",
      image: "/images/project/kerjamail.png",
      link: "https://github.com/amrylil/dashboard_kerjamail",
      preview: "https://kerjamail.vercel.app/",
      status: "Deployed",
      isPrivate: false,
      isFeatured: true,
      description:
        "Sebuah test case di mana saya membuat klon UI dari dashboard Kerjamail. Fokus pada replikasi desain dan fungsionalitas frontend.",
      tools: JSON.stringify(["React.js", "TypeScript", "Tailwind CSS"]),
      order: 7,
    },
    {
      title: "Hotel App",
      slug: "hotel-app",
      image: "/images/project/hotel.png",
      link: "https://github.com/amrylil/reservasi_hotel",
      preview: null,
      status: "Deployed",
      isPrivate: false,
      isFeatured: true,
      description:
        "Aplikasi reservasi hotel sederhana. Ini adalah salah satu proyek awal saya untuk mempraktikkan CRUD dan manajemen state.",
      tools: JSON.stringify(["Laravel", "Tailwind CSS", "MySQL"]),
      order: 8,
    },
    {
      title: "Donor App",
      slug: "donor-app",
      image: "/images/project/donor.jpg",
      link: "https://github.com/amrylil/modern-portfolio",
      preview: null,
      status: "Deployed",
      isPrivate: false,
      isFeatured: true,
      description:
        "Aplikasi untuk memfasilitasi donor darah, menghubungkan pendonor dengan mereka yang membutuhkan.",
      tools: JSON.stringify(["Golang", "Gin", "Flutter"]),
      order: 9,
    },
  ];

  for (const p of projectsData) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✅ ${projectsData.length} Projects seeded`);

  // 5. Seed Timelines
  const timelinesData = [
    {
      title: "2024",
      role: "Backend Developer Intern",
      company: "LLDIKTI Wilayah IX",
      description:
        "As a Backend Developer Intern at LLDIKTI Wilayah IX through the MSIB Batch 7 program, I was responsible for developing and maintaining web applications. My primary tech stack included Golang (using the Gin framework) for building robust APIs, React for the frontend interface, and Microsoft SQL Server for database management.",
      images: JSON.stringify([
        "images/sisfoy.jpg",
        "images/project/helpdesk.png",
        "images/sertif.png",
        "images/sisfoy2.jpg",
      ]),
      order: 1,
    },
    {
      title: "Early 2025",
      role: "Cloud Computing Graduate",
      company: "AWS re/Start Program",
      description:
        "I successfully completed the AWS re/Start program, an intensive, full-time skills development program focused on cloud computing. Delivered by Future Academy, the curriculum provided hands-on experience with AWS services, Linux, Python, and database fundamentals, preparing me for a career in cloud infrastructure and development.",
      images: JSON.stringify([
        "images/awsmeet.png",
        "images/aws-sertif.jpeg",
        "images/arch.png",
        "images/awsmeet.png",
      ]),
      order: 2,
    },
    {
      title: "Mid 2025",
      role: "Lead Fullstack Developer Intern",
      company: "Digitalhero Indonesia (Remote)",
      description:
        "As a Lead Fullstack Developer Intern at Digitalhero Indonesia (Remote), I managed projects using a modern stack including TypeScript, Express.js, React, Bun, and PostgreSQL. A key responsibility was single-handedly handling the deployment of four separate applications, for which I successfully implemented automated CI/CD pipelines using Docker.",
      images: JSON.stringify([
        "images/digitalhero.jpg",
        "images/project/fronthero.png",
        "images/project/learnhero.png",
        "images/project/portalhero.png",
      ]),
      order: 3,
    },
  ];

  for (const t of timelinesData) {
    const existing = await prisma.timeline.findFirst({ where: { title: t.title } });
    if (!existing) {
      await prisma.timeline.create({ data: t });
    }
  }
  console.log(`✅ ${timelinesData.length} Timelines seeded`);

  // 6. Seed Services
  const servicesData = [
    {
      title: "Web Development",
      icon: "Globe",
      content: JSON.stringify([
        "Single Page Applications (SPAs)",
        "Landing pages and business websites",
        "Portfolio websites",
        "E-commerce solutions",
      ]),
      order: 1,
    },
    {
      title: "Mobile Development",
      icon: "Smartphone",
      content: JSON.stringify([
        "Cross-platform development (React Native)",
        "Native iOS & Android (learning)",
        "Mobile-first responsive design",
      ]),
      order: 2,
    },
    {
      title: "UI/UX Design & Prototyping",
      icon: "Paintbrush",
      content: JSON.stringify([
        "Wireframing and low-fidelity mockups",
        "High-fidelity interactive prototypes (Figma)",
        "User flow and journey mapping",
      ]),
      order: 3,
    },
    {
      title: "Backend & DevOps",
      icon: "Code",
      content: JSON.stringify([
        "RESTful API development (Golang, Express.js)",
        "Database management (PostgreSQL, SQL Server)",
        "CI/CD pipelines and Docker containerization",
      ]),
      order: 4,
    },
  ];

  for (const sv of servicesData) {
    const existing = await prisma.service.findFirst({ where: { title: sv.title } });
    if (!existing) {
      await prisma.service.create({ data: sv });
    }
  }
  console.log(`✅ ${servicesData.length} Services seeded`);

  // 7. Seed Testimonials
  const testimonialsData = [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Gabriel Riswanda",
      title: "Client — Sruput Application",
      rating: 5,
      order: 1,
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "Harry Habil",
      title: "Master — Help Everything",
      rating: 5,
      order: 2,
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Artia Jofi",
      title: "Client — Skincare App",
      rating: 5,
      order: 3,
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Zea Van Boukering",
      title: "Owner — Mintol App",
      rating: 5,
      order: 4,
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Ismail Al Buraika",
      title: "Client — Cloth E-Commerce",
      rating: 5,
      order: 5,
    },
  ];

  for (const t of testimonialsData) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`✅ ${testimonialsData.length} Testimonials seeded`);

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
