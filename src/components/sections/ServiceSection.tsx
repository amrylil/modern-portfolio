"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Globe, Smartphone, Paintbrush, ChevronDown, Code } from "lucide-react";
import LetterGlitch from "../ui/letter-glitch";
interface ServiceItem {
  title: string;
  icon: React.ReactNode;
  content: string[];
}

interface ServiceAccordionItemProps {
  item: ServiceItem;
  isOpen: boolean;
  onToggle: () => void;
}

const serviceData: ServiceItem[] = [
  {
    title: "Web Development",
    icon: <Globe className="h-6 w-6 text-purple-400" />,
    content: [
      "Single Page Applications (SPAs)",
      "Landing pages and business websites",
      "Portfolio websites",
      "E-commerce solutions",
    ],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="h-6 w-6 text-purple-400" />,
    content: [
      "Cross-platform development (React Native)",
      "Native iOS & Android (learning)",
      "Mobile-first responsive design",
    ],
  },
  {
    title: "UI/UX Design & Prototyping",
    icon: <Paintbrush className="h-6 w-6 text-purple-400" />,
    content: [
      "Wireframing and low-fidelity mockups",
      "High-fidelity interactive prototypes (Figma)",
      "User flow and journey mapping",
    ],
  },
  {
    title: "Backend & DevOps",
    icon: <Code className="h-6 w-6 text-purple-400" />,
    content: [
      "RESTful API development (Golang, Express.js)",
      "Database management (PostgreSQL, SQL Server)",
      "CI/CD pipelines and Docker containerization",
    ],
  },
];

// --- Komponen Varian untuk Animasi ---

// Varian untuk section container (stagger)
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Varian untuk item di dalam section
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Varian untuk konten accordion
const accordionContentVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    marginTop: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  open: {
    height: "auto",
    opacity: 1,
    marginTop: "1.5rem", // mt-6
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// --- Komponen Accordion Item ---
const ServiceAccordionItem: React.FC<ServiceAccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <motion.div
      className="border border-neutral-800 rounded-lg flex flex-col mt-2   p-5 "
      variants={itemVariants}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left rounded"
      >
        <div className="flex items-center gap-4">
          {item.icon}
          <span className="text-lg font-medium text-neutral-100">
            {item.title}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-neutral-400" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={accordionContentVariants}
            className="overflow-hidden"
          >
            <ul className="list-disc list-inside space-y-2 pb-6 pl-2 text-neutral-400">
              {item.content.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Komponen Blok Kode Dekoratif ---
const DecorativeCodeBlock: React.FC = () => {
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    // Fungsi untuk menghasilkan string karakter acak
    const generateCode = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?";
      let result = "";
      for (let i = 0; i < 2000; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        if (i % 80 === 0 && i > 0) result += "\n"; // Tambah baris baru
      }
      setCode(result);
    };
    generateCode();
  }, []);

  return (
    <motion.div
      className="relative hidden h-full min-h-[450px] rounded-lg bg-neutral-900 p-6 font-mono md:block"
      variants={itemVariants}
    >
      <pre
        className="text-xs leading-relaxed text-purple-400 opacity-20"
        aria-hidden="true"
      >
        {code}
      </pre>
      {/* Efek fade di bawah */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      {/* Efek fade di atas */}
      <div className="absolute top-0 left-0 h-16 w-full bg-gradient-to-b from-black via-black/80 to-transparent"></div>
    </motion.div>
  );
};

// --- Komponen Section Utama ---
export default function ServiceSection(): React.ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(); // Item pertama terbuka

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      id="services"
      className="w-full  py-20 text-neutral-200"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <motion.div variants={itemVariants}>
          <h2 className="md:text-7xl text-4xl tracking-tighter mb-10">
            What I do?
          </h2>
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="md:text-xl text-base text-neutral-400 mb-10 max-w-3xl"
        >
          I specialize in building high-performance web applications, designing
          RESTful APIs, and creating seamless user experiences using modern
          technologies like Typescript, Golang, and Laravel.
        </motion.p>

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          <motion.div
            className="rounded-lg   -translate-y-2"
            variants={itemVariants}
          >
            {serviceData.map((item, index) => (
              <ServiceAccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </motion.div>

          <div className="flex justify-center md:w-full md:h-[292px] size-[290px">
            <LetterGlitch
              glitchColors={["#5e4491", "#A476FF", "#241a38"]}
              glitchSpeed={33}
              centerVignette={false}
              outerVignette={true}
              smooth={true}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
