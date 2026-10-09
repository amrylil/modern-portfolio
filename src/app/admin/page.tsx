"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Lock,
  Mail,
  FolderGit2,
  Cpu,
  LogOut,
  CheckCircle2,
  Trash2,
  Eye,
  RefreshCw,
  ArrowLeft,
  Shield,
  Layers,
  Sparkles,
  Upload,
  Plus,
  Play,
  Image as ImageIcon,
  Video,
  X,
  Copy,
  Check,
  Film,
} from "lucide-react";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  images: string[];
  videoUrl: string | null;
  link: string | null;
  preview: string | null;
  status: string;
  isPrivate: boolean;
  isFeatured: boolean;
  tools: string[];
}

interface Skill {
  id: number;
  title: string;
  icon: string;
  href: string;
  category: string;
  order: number;
  isActive: boolean;
}

interface UploadedMedia {
  url: string;
  name: string;
  type: "image" | "video";
  size: number;
}

export default function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"messages" | "projects" | "uploads" | "skills" | "docs">("messages");

  // Auth Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Data State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedMedia[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Project Modal State (Add / Edit)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    images: [] as string[],
    videoUrl: "",
    link: "",
    preview: "",
    status: "Deployed",
    isPrivate: false,
    isFeatured: true,
    tools: "React, Next.js, MySQL",
  });
  const [isSavingProject, setIsSavingProject] = useState(false);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        loadDashboardData();
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      setUser(data.user);
      loadDashboardData();
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const loadDashboardData = async () => {
    setDataLoading(true);
    try {
      const [msgRes, projRes, skillRes] = await Promise.all([
        fetch("/api/contact"),
        fetch("/api/projects"),
        fetch("/api/skills?all=true"),
      ]);

      if (msgRes.ok) {
        const d = await msgRes.json();
        setMessages(d.data || []);
      }
      if (projRes.ok) {
        const d = await projRes.json();
        setProjects(d.data || []);
      }
      if (skillRes.ok) {
        const d = await skillRes.json();
        setSkills(d.data || []);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setDataLoading(false);
    }
  };

  // Upload handler for files
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetFolder = "projects") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("folder", targetFolder);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      const newUploaded: UploadedMedia[] = Array.isArray(data.files)
        ? data.files.map((f: { url: string; name: string; type: "image" | "video"; size: number }) => ({
            url: f.url,
            name: f.name,
            type: f.type,
            size: f.size,
          }))
        : [{ url: data.url, name: files[0].name, type: data.type, size: files[0].size }];

      setUploadedFiles((prev) => [...newUploaded, ...prev]);
      setActionMsg({ type: "success", text: `Uploaded ${newUploaded.length} file(s) successfully!` });

      return newUploaded;
    } catch (err: unknown) {
      setActionMsg({
        type: "error",
        text: err instanceof Error ? err.message : "Upload failed",
      });
      return null;
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Open modal to add or edit project
  const openProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        slug: proj.slug,
        description: proj.description,
        image: proj.image,
        images: proj.images || [proj.image],
        videoUrl: proj.videoUrl || "",
        link: proj.link || "",
        preview: proj.preview || "",
        status: proj.status || "Deployed",
        isPrivate: proj.isPrivate ?? false,
        isFeatured: proj.isFeatured ?? true,
        tools: Array.isArray(proj.tools) ? proj.tools.join(", ") : "",
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: "",
        slug: "",
        description: "",
        image: "",
        images: [],
        videoUrl: "",
        link: "",
        preview: "",
        status: "Deployed",
        isPrivate: false,
        isFeatured: true,
        tools: "React, Next.js, MySQL",
      });
    }
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProject(true);

    const toolsArray = projectForm.tools
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const slug = projectForm.slug.trim() ||
      projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const payload = {
      title: projectForm.title,
      slug,
      description: projectForm.description,
      image: projectForm.image || (projectForm.images[0] || "/images/project/portalhero.png"),
      images: projectForm.images,
      videoUrl: projectForm.videoUrl || null,
      link: projectForm.link || null,
      preview: projectForm.preview || null,
      status: projectForm.status,
      isPrivate: projectForm.isPrivate,
      isFeatured: projectForm.isFeatured,
      tools: toolsArray,
    };

    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save project");

      setActionMsg({
        type: "success",
        text: editingProject ? "Project updated successfully!" : "Project created successfully!",
      });

      setIsProjectModalOpen(false);
      loadDashboardData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error saving project");
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setActionMsg({ type: "success", text: "Project deleted successfully" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMessageRead = async (id: number, current: boolean) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !current }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isRead: !current } : m))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        setActionMsg({ type: "success", text: "Message deleted successfully" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-black text-neutral-900 dark:text-white flex items-center justify-center font-mono">
        <RefreshCw className="h-8 w-8 animate-spin text-neutral-500 dark:text-neutral-400" />
      </div>
    );
  }

  // Not Logged In: Show Login Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col justify-center items-center px-4 font-mono relative transition-colors duration-200">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/80 shadow-xl backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-4">
              <Shield className="h-8 w-8 text-neutral-800 dark:text-neutral-200" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Portfolio Admin</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Sign in to manage portfolio backend</p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-md bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-500/40 text-red-600 dark:text-red-400 text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 absolute left-3 top-3 text-neutral-400 dark:text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ulilamry.com"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 absolute left-3 top-3 text-neutral-400 dark:text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-semibold text-sm rounded-md transition disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {authLoading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-900 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300 transition flex items-center justify-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" /> Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged In: Show Admin Dashboard
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-100 font-mono transition-colors duration-200">
      {/* Top Navbar */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Portfolio
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold text-neutral-900 dark:text-white tracking-wide">PORTFOLIO BACKEND</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                MySQL 8.0 Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">{user.name}</p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "messages"
                ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white border border-neutral-900 dark:border-neutral-700 shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-200"
            }`}
          >
            <Mail className="h-4 w-4" />
            Messages
            {messages.filter((m) => !m.isRead).length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-emerald-500 text-black text-xs font-bold rounded-full">
                {messages.filter((m) => !m.isRead).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "projects"
                ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white border border-neutral-900 dark:border-neutral-700 shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-200"
            }`}
          >
            <FolderGit2 className="h-4 w-4" />
            Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab("uploads")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "uploads"
                ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white border border-neutral-900 dark:border-neutral-700 shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-200"
            }`}
          >
            <Upload className="h-4 w-4" />
            Media Upload (Gambar & Video)
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "skills"
                ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white border border-neutral-900 dark:border-neutral-700 shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-200"
            }`}
          >
            <Cpu className="h-4 w-4" />
            Skills ({skills.length})
          </button>

          <button
            onClick={() => setActiveTab("docs")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "docs"
                ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white border border-neutral-900 dark:border-neutral-700 shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-200"
            }`}
          >
            <Layers className="h-4 w-4" />
            API Docs
          </button>

          <button
            onClick={loadDashboardData}
            disabled={dataLoading}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${dataLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {actionMsg && (
          <div
            className={`mb-4 p-3 rounded-md text-xs flex justify-between items-center ${
              actionMsg.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300"
                : "bg-red-50 dark:bg-red-950/80 border border-red-300 dark:border-red-500/50 text-red-800 dark:text-red-300"
            }`}
          >
            <span>{actionMsg.text}</span>
            <button onClick={() => setActionMsg(null)} className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer">
              ✕
            </button>
          </div>
        )}

        {/* TAB 1: MESSAGES */}
        {activeTab === "messages" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Contact Inquiries</h2>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Total {messages.length} messages received
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="p-12 text-center border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-950/40">
                <Mail className="h-10 w-10 text-neutral-400 dark:text-neutral-600 mx-auto mb-3" />
                <p className="text-neutral-600 dark:text-neutral-400">No contact messages received yet.</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-1">
                  When visitors submit the form in Contact Section, they will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-xl border transition ${
                      msg.isRead
                        ? "border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/40 opacity-75"
                        : "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/60 shadow-xs dark:shadow-lg"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-neutral-900 dark:text-white text-base">
                            {msg.name}
                          </span>
                          {!msg.isRead && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                              NEW
                            </span>
                          )}
                        </div>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
                        >
                          {msg.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        <button
                          onClick={() => toggleMessageRead(msg.id, msg.isRead)}
                          className={`p-1.5 rounded-md border transition cursor-pointer ${
                            msg.isRead
                              ? "border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                              : "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900"
                          }`}
                          title={msg.isRead ? "Mark as unread" : "Mark as read"}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="p-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 hover:border-red-300 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line bg-neutral-100/70 dark:bg-black/40 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800/60">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Projects in Database</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Manage projects with multiple screenshots & video demo support
                </p>
              </div>
              <button
                onClick={() => openProjectModal()}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-semibold rounded-lg text-xs transition cursor-pointer shadow-xs"
              >
                <Plus className="h-4 w-4" /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 shadow-xs dark:shadow-none flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition"
                >
                  <div>
                    <div className="h-44 overflow-hidden rounded-lg mb-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative group">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      {/* Media indicators */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        {proj.images && proj.images.length > 1 && (
                          <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[10px] text-white flex items-center gap-1 border border-neutral-700">
                            <ImageIcon className="h-3 w-3" /> {proj.images.length}
                          </span>
                        )}
                        {proj.videoUrl && (
                          <span className="px-2 py-0.5 rounded bg-red-600/90 text-[10px] text-white flex items-center gap-1">
                            <Play className="h-3 w-3" /> Video
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-neutral-900 dark:text-white text-base truncate">{proj.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300">
                        {proj.status}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.tools?.slice(0, 4).map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
                        >
                          {tool}
                        </span>
                      ))}
                      {proj.tools?.length > 4 && (
                        <span className="text-[10px] px-1 text-neutral-500">
                          +{proj.tools.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-900 text-xs">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openProjectModal(proj)}
                          className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-transparent transition cursor-pointer text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="px-2 py-1 rounded border border-neutral-200 dark:border-neutral-800 hover:bg-red-50 dark:hover:bg-red-950/60 hover:border-red-300 dark:hover:border-red-800 text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {proj.preview && (
                          <a
                            href={proj.preview}
                            target="_blank"
                            rel="noreferrer"
                            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-1 text-xs"
                          >
                            Live <Eye className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MEDIA UPLOAD (GAMBAR & VIDEO) */}
        {activeTab === "uploads" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">Media Uploader</h2>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Upload screenshot gambar (JPG, PNG, WEBP) atau video demo aplikasi (MP4, WEBM).
                File tersimpan di folder <code className="text-emerald-600 dark:text-emerald-400 font-mono">/public/uploads/</code> dan bisa langsung digunakan di URL project.
              </p>
            </div>

            {/* Upload Dropzone */}
            <div className="p-8 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50/50 dark:bg-neutral-950/60 text-center mb-8 hover:border-neutral-400 dark:hover:border-neutral-500 transition">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => handleFileUpload(e, "projects")}
                className="hidden"
                id="media-file-input"
              />
              <label
                htmlFor="media-file-input"
                className="cursor-pointer flex flex-col items-center justify-center gap-3"
              >
                <div className="p-4 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 shadow-xs">
                  <Upload className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {uploading ? "Sedang Mengunggah File..." : "Klik untuk Pilih File Gambar atau Video Demo"}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Bisa memilih banyak gambar sekaligus. Gambar max 10MB, Video max 100MB.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-semibold text-xs rounded-md transition disabled:opacity-50 cursor-pointer"
                >
                  {uploading ? "Uploading..." : "Pilih File dari Komputer"}
                </button>
              </label>
            </div>

            {/* List of uploaded files in session */}
            <div>
              <h3 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Film className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> File Yang Baru Diupload
              </h3>

              {uploadedFiles.length === 0 ? (
                <p className="text-xs text-neutral-500 italic">
                  Belum ada file yang diupload di sesi ini. Unggah file di atas untuk mendapatkan link URL-nya.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uploadedFiles.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/80 shadow-xs dark:shadow-none flex flex-col gap-2"
                    >
                      <div className="h-32 rounded bg-neutral-100 dark:bg-neutral-900 overflow-hidden flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
                        {f.type === "video" ? (
                          <video
                            src={f.url}
                            controls
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <img
                            src={f.url}
                            alt={f.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="truncate max-w-[180px] font-mono text-neutral-700 dark:text-neutral-300">
                          {f.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 uppercase">
                          {f.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          readOnly
                          value={f.url}
                          className="flex-1 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded px-2 py-1 text-[11px] text-neutral-700 dark:text-neutral-300 font-mono"
                        />
                        <button
                          onClick={() => copyToClipboard(f.url)}
                          className="p-1.5 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-transparent transition cursor-pointer"
                          title="Copy URL"
                        >
                          {copiedUrl === f.url ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SKILLS */}
        {activeTab === "skills" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Skills & Technologies</h2>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">{skills.length} skills listed</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 shadow-xs dark:shadow-none flex flex-col items-center text-center hover:border-neutral-300 dark:hover:border-neutral-700 transition"
                >
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white mb-1">{skill.title}</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">
                    {skill.category}
                  </span>
                  <a
                    href={skill.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Documentation →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: API DOCS & ENDPOINTS */}
        {activeTab === "docs" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">RESTful API Endpoints</h2>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                All endpoints connected to MySQL database <code className="text-emerald-600 dark:text-emerald-400 font-mono">ulildb</code>.
              </p>
            </div>

            <div className="space-y-4">
              {/* Media Upload Endpoint */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 shadow-xs dark:shadow-none">
                <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Upload className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Media Upload Endpoints
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 w-16">POST</span>
                    <span className="text-neutral-800 dark:text-neutral-300 font-mono">/api/upload</span>
                    <span className="text-neutral-500 ml-auto">Upload gambar / video (multipart/form-data)</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
                    <span className="font-bold text-red-600 dark:text-red-400 w-16">DELETE</span>
                    <span className="text-neutral-800 dark:text-neutral-300 font-mono">/api/upload?url=...</span>
                    <span className="text-neutral-500 ml-auto">Delete uploaded file by URL</span>
                  </div>
                </div>
              </div>

              {/* Projects Endpoints */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/60 shadow-xs dark:shadow-none">
                <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FolderGit2 className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Project Endpoints (Multiple Images & Video Demo)
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
                    <span className="font-bold text-blue-600 dark:text-blue-400 w-16">GET</span>
                    <span className="text-neutral-800 dark:text-neutral-300 font-mono">/api/projects</span>
                    <span className="text-neutral-500 ml-auto">Returns projects with `images: []` and `videoUrl`</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 w-16">POST</span>
                    <span className="text-neutral-800 dark:text-neutral-300 font-mono">/api/projects</span>
                    <span className="text-neutral-500 ml-auto">Create project with multiple images & video demo</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
                    <span className="font-bold text-amber-600 dark:text-amber-400 w-16">PUT</span>
                    <span className="text-neutral-800 dark:text-neutral-300 font-mono">/api/projects/[id]</span>
                    <span className="text-neutral-500 ml-auto">Update project images & video demo</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
                    <span className="font-bold text-red-600 dark:text-red-400 w-16">DELETE</span>
                    <span className="text-neutral-800 dark:text-neutral-300 font-mono">/api/projects/[id]</span>
                    <span className="text-neutral-500 ml-auto">Delete project</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* PROJECT ADD / EDIT MODAL */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-6 md:p-8 text-neutral-900 dark:text-neutral-100 shadow-2xl">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. Sruput Mobile App"
                    required
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    placeholder="sruput-mobile-app (optional auto)"
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Detail penjelasan mengenai project..."
                  required
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>

              {/* Cover Image & Upload */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    Main Cover Image *
                  </label>
                  <label className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1">
                    <Upload className="h-3 w-3" /> Upload Cover
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const uploaded = await handleFileUpload(e, "projects");
                        if (uploaded && uploaded[0]) {
                          setProjectForm((prev) => ({
                            ...prev,
                            image: uploaded[0].url,
                            images: prev.images.includes(uploaded[0].url)
                              ? prev.images
                              : [uploaded[0].url, ...prev.images],
                          }));
                        }
                      }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  placeholder="/images/project/... atau https://..."
                  required
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 font-mono text-xs"
                />
              </div>

              {/* Multiple Screenshots Gallery */}
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      Multiple Screenshots ({projectForm.images.length})
                    </span>
                    <p className="text-[11px] text-neutral-500">
                      Bisa menambahkan banyak gambar untuk galeri di project modal
                    </p>
                  </div>
                  <label className="px-2.5 py-1 bg-white hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs text-neutral-900 dark:text-white rounded border border-neutral-300 dark:border-neutral-700 cursor-pointer flex items-center gap-1 transition">
                    <Plus className="h-3 w-3" /> Upload Gambar
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const uploaded = await handleFileUpload(e, "projects");
                        if (uploaded) {
                          const urls = uploaded.map((u) => u.url);
                          setProjectForm((prev) => ({
                            ...prev,
                            images: [...prev.images, ...urls],
                          }));
                        }
                      }}
                    />
                  </label>
                </div>

                {projectForm.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {projectForm.images.map((img, idx) => (
                      <div key={idx} className="relative group rounded border border-neutral-200 dark:border-neutral-800 overflow-hidden h-16 bg-neutral-100 dark:bg-neutral-950">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() =>
                            setProjectForm((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== idx),
                            }))
                          }
                          className="absolute top-1 right-1 p-0.5 rounded bg-red-600 text-white opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Demo */}
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Video className="h-3.5 w-3.5 text-red-500" />
                      Video Demo Aplikasi
                    </span>
                    <p className="text-[11px] text-neutral-500">
                      Bisa upload file MP4/WEBM langsung atau paste link YouTube
                    </p>
                  </div>
                  <label className="px-2.5 py-1 bg-white hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs text-neutral-900 dark:text-white rounded border border-neutral-300 dark:border-neutral-700 cursor-pointer flex items-center gap-1 transition">
                    <Upload className="h-3 w-3" /> Upload MP4
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={async (e) => {
                        const uploaded = await handleFileUpload(e, "videos");
                        if (uploaded && uploaded[0]) {
                          setProjectForm((prev) => ({
                            ...prev,
                            videoUrl: uploaded[0].url,
                          }));
                        }
                      }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={projectForm.videoUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... atau /uploads/videos/demo.mp4"
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 font-mono text-xs"
                />
              </div>

              {/* Tools & Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Tools & Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.tools}
                    onChange={(e) => setProjectForm({ ...projectForm, tools: e.target.value })}
                    placeholder="React.js, Tailwind CSS, Express.js"
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Status
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  >
                    <option value="Deployed">Deployed</option>
                    <option value="On Development">On Development</option>
                    <option value="Contributor">Contributor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    GitHub Repo Link
                  </label>
                  <input
                    type="url"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    value={projectForm.preview}
                    onChange={(e) => setProjectForm({ ...projectForm, preview: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700 dark:text-neutral-300">
                  <input
                    type="checkbox"
                    checked={projectForm.isPrivate}
                    onChange={(e) => setProjectForm({ ...projectForm, isPrivate: e.target.checked })}
                    className="rounded bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                  />
                  Private Repository
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700 dark:text-neutral-300">
                  <input
                    type="checkbox"
                    checked={projectForm.isFeatured}
                    onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                    className="rounded bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                  />
                  Featured in Homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="px-5 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-semibold text-xs transition disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {isSavingProject ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
