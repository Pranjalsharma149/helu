"use client";

import { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard, UserPlus, ClipboardList, BarChart3, LogOut,
  Search, Download, Phone, MapPin, Users as UsersIcon,
  Plus, Trash2, ChevronRight, Loader2
} from "lucide-react";

const TREATMENTS = [
  "LASIK Eye Surgery", "Cataract Surgery", "Piles (Proctology)", "Urology",
  "Vascular", "Orthopedics", "Gastroenterology", "Internal Medicine",
];

const SOURCES = ["popup-form", "whatsapp", "phone-call", "referral", "walk-in", "manual-entry"];

const STAGES = ["New", "Contacted", "Consultation Booked", "Surgery Scheduled", "Completed"];
const ALL_STATUSES = [...STAGES, "Lost"];

const STATUS_COLOR: Record<string, string> = {
  "New": "#8A9B9A",
  "Contacted": "#3B7EC4",
  "Consultation Booked": "#C97A3D",
  "Surgery Scheduled": "#1F5C57",
  "Completed": "#3F8F5C",
  "Lost": "#B4483F",
};

async function api(path: string, options?: RequestInit) {
  const res = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export default function HealviaLMS() {
  const [booting, setBooting] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [view, setView] = useState("dashboard");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const loadUsers = async () => {
    try { setUsers(await api("/api/users")); } catch (e) { console.error(e); }
  };
  const loadLeads = async () => {
    try { setLeads(await api("/api/leads")); } catch (e) { console.error(e); }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([loadUsers(), loadLeads()]);
      setBooting(false);
    })();
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const user = await api("/api/login", { method: "POST", body: JSON.stringify(loginForm) });
      setCurrentUser(user);
      setView("dashboard");
    } catch (err: any) {
      setLoginError("Username ya password galat hai.");
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setLoginForm({ username: "", password: "" });
  };

  const visibleLeads = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === "admin") return leads;
    return leads.filter((l) => l.assignedTo === currentUser.username);
  }, [leads, currentUser]);

  if (booting) {
    return (
      <Shell>
        <div className="flex items-center justify-center h-full" style={{ color: "#5B6E6C" }}>
          <Loader2 className="animate-spin mr-2" size={20} /> Loading...
        </div>
      </Shell>
    );
  }

  if (!currentUser) {
    return (
      <Shell>
        <LoginScreen form={loginForm} setForm={setLoginForm} onSubmit={handleLogin} error={loginError} loading={loggingIn} />
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex h-full w-full">
        <Sidebar view={view} setView={setView} currentUser={currentUser} onLogout={logout} />
        <div className="flex-1 min-w-0 overflow-y-auto">
          <TopBar currentUser={currentUser} view={view} />
          <div className="p-6">
            {view === "dashboard" && (
              <Dashboard leads={visibleLeads} currentUser={currentUser} setView={setView} />
            )}
            {view === "add" && (
              <AddLead
                users={users}
                currentUser={currentUser}
                onAdd={async (lead: any) => {
                  try {
                    const created = await api("/api/leads", { method: "POST", body: JSON.stringify(lead) });
                    setLeads([created, ...leads]);
                    showToast("Lead add ho gaya.");
                    setView("leads");
                  } catch (e) {
                    showToast("Lead add nahi ho paya.");
                  }
                }}
              />
            )}
            {view === "leads" && (
              <LeadsTable
                leads={visibleLeads}
                users={users}
                currentUser={currentUser}
                onUpdate={async (id: string, updates: any) => {
                  setLeads(leads.map((l) => (l.id === id ? { ...l, ...updates } : l)));
                  try {
                    await api(`/api/leads/${id}`, { method: "PATCH", body: JSON.stringify(updates) });
                  } catch (e) {
                    showToast("Update save nahi hua.");
                  }
                }}
                onDelete={async (id: string) => {
                  try {
                    await api(`/api/leads/${id}`, { method: "DELETE" });
                    setLeads(leads.filter((l) => l.id !== id));
                    showToast("Lead delete ho gaya.");
                  } catch (e) {
                    showToast("Delete nahi ho paya.");
                  }
                }}
              />
            )}
            {view === "reports" && (
              <Reports leads={visibleLeads} users={users} currentUser={currentUser} />
            )}
            {view === "users" && currentUser.role === "admin" && (
              <UsersPage
                users={users}
                onAdd={async (u: any) => {
                  try {
                    await api("/api/users", { method: "POST", body: JSON.stringify(u) });
                    await loadUsers();
                    showToast("User add ho gaya.");
                  } catch (e: any) {
                    showToast(e.message === "Username already exists" ? "Ye username pehle se hai." : "User add nahi ho paya.");
                  }
                }}
                onDelete={async (username: string) => {
                  if (username === "admin") { showToast("Admin ko delete nahi kar sakte."); return; }
                  try {
                    await api(`/api/users/${username}`, { method: "DELETE" });
                    await loadUsers();
                    showToast("User hata diya.");
                  } catch (e) {
                    showToast("Delete nahi ho paya.");
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-5 right-5 px-4 py-3 rounded-lg text-sm shadow-lg" style={{ background: "#142B2A", color: "#F5F7F6" }}>
          {toast}
        </div>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: any }) {
  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", background: "#F5F7F6", color: "#142B2A", minHeight: "600px", height: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .lms-display { font-family: 'Fraunces', serif; }
        .lms-mono { font-family: 'IBM Plex Mono', monospace; }
        input, select, textarea, button { font-family: inherit; }
        input:focus, select:focus, textarea:focus, button:focus-visible {
          outline: 2px solid #1F5C57; outline-offset: 1px;
        }
        ::placeholder { color: #9AACAA; }
      `}</style>
      {children}
    </div>
  );
}

function LoginScreen({ form, setForm, onSubmit, error, loading }: any) {
  return (
    <div className="flex items-center justify-center min-h-[600px] p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg mb-4" style={{ background: "#1F5C57" }}>
            <span className="lms-display" style={{ color: "#F5F7F6", fontSize: 20, fontWeight: 600 }}>H</span>
          </div>
          <h1 className="lms-display" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.01em" }}>HealviaCare</h1>
          <p style={{ color: "#5B6E6C", fontSize: 13.5, marginTop: 4 }}>Lead Management &mdash; sign in to continue</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-3" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6", borderRadius: 14, padding: 24 }}>
          <div>
            <label style={{ fontSize: 12.5, color: "#5B6E6C", fontWeight: 500 }}>Username</label>
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-md text-sm" style={{ border: "1px solid #D4DEDC" }} placeholder="admin" autoFocus />
          </div>
          <div>
            <label style={{ fontSize: 12.5, color: "#5B6E6C", fontWeight: 500 }}>Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-md text-sm" style={{ border: "1px solid #D4DEDC" }} placeholder="••••••••" />
          </div>
          {error && <p style={{ color: "#B4483F", fontSize: 12.5 }}>{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-2.5 rounded-md text-sm font-medium mt-2" style={{ background: "#1F5C57", color: "#F5F7F6", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p style={{ fontSize: 11.5, color: "#9AACAA", textAlign: "center", paddingTop: 4 }}>First time? Default admin login: admin / admin123</p>
        </form>
      </div>
    </div>
  );
}

function Sidebar({ view, setView, currentUser, onLogout }: any) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "add", label: "Add Lead", icon: UserPlus },
    { key: "leads", label: "All Leads", icon: ClipboardList },
    { key: "reports", label: "Reports", icon: BarChart3 },
  ];
  if (currentUser.role === "admin") items.push({ key: "users", label: "Users", icon: UsersIcon });

  return (
    <div className="flex flex-col shrink-0" style={{ width: 208, background: "#142B2A", color: "#D9E4E2" }}>
      <div className="px-5 py-5" style={{ borderBottom: "1px solid #24413F" }}>
        <span className="lms-display" style={{ fontSize: 18, fontWeight: 600, color: "#F5F7F6" }}>HealviaCare</span>
        <div style={{ fontSize: 11, color: "#7FA39E", marginTop: 2 }}>Lead Management</div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((it) => {
          const Icon = it.icon;
          const active = view === it.key;
          return (
            <button key={it.key} onClick={() => setView(it.key)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-left" style={{ background: active ? "#1F5C57" : "transparent", color: active ? "#F5F7F6" : "#B9CBC8", fontWeight: active ? 500 : 400 }}>
              <Icon size={16} />
              {it.label}
            </button>
          );
        })}
      </nav>
      <div className="px-3 py-4" style={{ borderTop: "1px solid #24413F" }}>
        <button onClick={onLogout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm" style={{ color: "#B9CBC8" }}>
          <LogOut size={16} /> Log out
        </button>
      </div>
    </div>
  );
}

function TopBar({ currentUser, view }: any) {
  const titles: Record<string, string> = { dashboard: "Dashboard", add: "Add Lead", leads: "All Leads", reports: "Reports", users: "Users" };
  return (
    <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #E1E8E6", background: "#FFFFFF" }}>
      <h2 className="lms-display" style={{ fontSize: 20, fontWeight: 600 }}>{titles[view]}</h2>
      <div className="flex items-center gap-2" style={{ fontSize: 13 }}>
        <span style={{ color: "#5B6E6C" }}>{currentUser.name}</span>
        <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: "#E9F2F0", color: "#1F5C57" }}>
          {currentUser.role === "admin" ? "Admin" : "Agent"}
        </span>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: any) {
  return (
    <div className="rounded-xl p-4" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
      <div style={{ fontSize: 12, color: "#5B6E6C" }}>{label}</div>
      <div className="lms-display" style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 11.5, color: "#8A9B9A", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Dashboard({ leads, currentUser, setView }: any) {
  const total = leads.length;
  const completed = leads.filter((l: any) => l.status === "Completed").length;
  const lost = leads.filter((l: any) => l.status === "Lost").length;
  const active = total - completed - lost;
  const conversion = total ? Math.round((completed / total) * 100) : 0;

  const stageCounts = STAGES.map((s) => leads.filter((l: any) => l.status === s).length);
  const maxCount = Math.max(1, ...stageCounts);

  const recent = [...leads].sort((a: any, b: any) => b.createdAt - a.createdAt).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total leads" value={total} sub={currentUser.role === "admin" ? "All agents" : "Assigned to you"} />
        <StatCard label="In progress" value={active} />
        <StatCard label="Completed" value={completed} sub={`${conversion}% conversion`} />
        <StatCard label="Lost" value={lost} />
      </div>

      <div className="rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
        <h3 className="lms-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Patient journey funnel</h3>
        <div className="space-y-2.5">
          {STAGES.map((stage, i) => {
            const count = stageCounts[i];
            const widthPct = Math.max(6, (count / maxCount) * 100);
            return (
              <div key={stage} className="flex items-center gap-3">
                <div style={{ width: 150, fontSize: 12.5, color: "#5B6E6C", flexShrink: 0 }}>{stage}</div>
                <div className="flex-1" style={{ background: "#F0F4F3", borderRadius: 6, height: 26 }}>
                  <div className="flex items-center justify-end pr-2 h-full" style={{ width: `${widthPct}%`, background: STATUS_COLOR[stage], borderRadius: 6, minWidth: 28, transition: "width 0.4s ease" }}>
                    <span className="lms-mono" style={{ color: "#fff", fontSize: 11.5 }}>{count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="lms-display" style={{ fontSize: 15, fontWeight: 600 }}>Recent leads</h3>
          <button onClick={() => setView("leads")} className="flex items-center gap-1 text-xs" style={{ color: "#1F5C57" }}>
            View all <ChevronRight size={13} />
          </button>
        </div>
        {recent.length === 0 ? (
          <EmptyState text="No leads yet. Add your first lead to see it here." />
        ) : (
          <div className="space-y-1">
            {recent.map((l: any) => (
              <div key={l.id} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #F0F4F3" }}>
                <div>
                  <span style={{ fontSize: 13.5, fontWeight: 500 }}>{l.name}</span>
                  <span className="lms-mono" style={{ fontSize: 12, color: "#8A9B9A", marginLeft: 8 }}>{l.phone}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: `${STATUS_COLOR[l.status]}1A`, color: STATUS_COLOR[l.status] }}>
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div style={{ fontSize: 13, color: "#8A9B9A", padding: "20px 0", textAlign: "center" }}>{text}</div>;
}

function Field({ label, children }: any) {
  return (
    <div>
      <label style={{ fontSize: 12.5, color: "#5B6E6C", fontWeight: 500 }}>{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

const inputStyle: any = { border: "1px solid #D4DEDC", borderRadius: 8, padding: "8px 10px", fontSize: 13.5, width: "100%" };

function AddLead({ users, currentUser, onAdd }: any) {
  const [form, setForm] = useState({
    name: "", phone: "", city: "", treatment: TREATMENTS[0], disease: "", insurance: "", source: SOURCES[0],
    status: "New", assignedTo: currentUser.username, notes: "",
  });
  const [err, setErr] = useState("");

  const submit = (e: any) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setErr("Naam aur phone number dono zaroori hai.");
      return;
    }
    setErr("");
    onAdd(form);
    setForm({ name: "", phone: "", city: "", treatment: TREATMENTS[0], disease: "", insurance: "", source: SOURCES[0], status: "New", assignedTo: currentUser.username, notes: "" });
  };

  return (
    <form onSubmit={submit} className="max-w-xl rounded-xl p-6 space-y-4" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Patient name">
          <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
        </Field>
        <Field label="Phone number">
          <input style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit number" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="City">
          <input style={inputStyle} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. Gurugram" />
        </Field>
        <Field label="Treatment">
          <select style={inputStyle} value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })}>
            {TREATMENTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Disease (optional)">
          <input style={inputStyle} value={form.disease} onChange={(e) => setForm({ ...form, disease: e.target.value })} placeholder="e.g. Kidney Stone" />
        </Field>
        <Field label="Insurance (optional)">
          <input style={inputStyle} value={form.insurance} onChange={(e) => setForm({ ...form, insurance: e.target.value })} placeholder="e.g. Star Health" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Source">
          <select style={inputStyle} value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
            {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Assign to">
          <select style={inputStyle} value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} disabled={currentUser.role !== "admin"}>
            {users.map((u: any) => <option key={u.username} value={u.username}>{u.name}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Notes (optional)">
        <textarea style={{ ...inputStyle, minHeight: 70 }} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any relevant detail..." />
      </Field>
      {err && <p style={{ color: "#B4483F", fontSize: 12.5 }}>{err}</p>}
      <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium" style={{ background: "#1F5C57", color: "#F5F7F6" }}>
        Save lead
      </button>
    </form>
  );
}

function LeadsTable({ leads, users, currentUser, onUpdate, onDelete }: any) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = leads.filter((l: any) => {
    const matchesSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search);
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a: any, b: any) => b.createdAt - a.createdAt);

  const userName = (username: string) => users.find((u: any) => u.username === username)?.name || username || "Unassigned";

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} style={{ position: "absolute", left: 10, top: 10, color: "#8A9B9A" }} />
          <input style={{ ...inputStyle, paddingLeft: 32 }} placeholder="Search name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select style={{ ...inputStyle, width: 180 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          {ALL_STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl p-8" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
          <EmptyState text="No leads match here. Try a different filter or add a new lead." />
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
          <table className="w-full" style={{ fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#F5F7F6", color: "#5B6E6C", fontSize: 11.5 }}>
                <th className="text-left px-4 py-2.5 font-medium">Patient</th>
                <th className="text-left px-4 py-2.5 font-medium">Treatment</th>
                <th className="text-left px-4 py-2.5 font-medium">Assigned</th>
                <th className="text-left px-4 py-2.5 font-medium">Status</th>
                <th className="text-left px-4 py-2.5 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l: any) => (
                <tr key={l.id} style={{ borderTop: "1px solid #F0F4F3" }}>
                  <td className="px-4 py-2.5">
                    <div style={{ fontWeight: 500 }}>{l.name}</div>
                    <div className="flex items-center gap-2" style={{ fontSize: 11.5, color: "#8A9B9A" }}>
                      <Phone size={11} /> <span className="lms-mono">{l.phone}</span>
                      {l.city && <><MapPin size={11} className="ml-1" /> {l.city}</>}
                    </div>
                  </td>
                  <td className="px-4 py-2.5">{l.treatment}</td>
                  <td className="px-4 py-2.5">{userName(l.assignedTo)}</td>
                  <td className="px-4 py-2.5">
                    <select value={l.status} onChange={(e) => onUpdate(l.id, { status: e.target.value })} className="px-2 py-1 rounded text-xs font-medium" style={{ background: `${STATUS_COLOR[l.status]}1A`, color: STATUS_COLOR[l.status], border: "none" }}>
                      {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button onClick={() => onDelete(l.id)} style={{ color: "#B4483F" }} title="Delete lead">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Reports({ leads, users, currentUser }: any) {
  const byStatus = ALL_STATUSES.map((s) => ({ status: s, count: leads.filter((l: any) => l.status === s).length }));
  const byTreatment = TREATMENTS.map((t) => ({ treatment: t, count: leads.filter((l: any) => l.treatment === t).length }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count);
  const maxTreatment = Math.max(1, ...byTreatment.map((t) => t.count));

  const byAgent = currentUser.role === "admin"
    ? users.map((u: any) => ({
        name: u.name,
        total: leads.filter((l: any) => l.assignedTo === u.username).length,
        completed: leads.filter((l: any) => l.assignedTo === u.username && l.status === "Completed").length,
      })).filter((a: any) => a.total > 0)
    : [];

  const exportCsv = () => {
    const rows = [
      ["Name", "Phone", "City", "Treatment", "Source", "Status", "Assigned To", "Notes", "Created"],
      ...leads.map((l: any) => [
        l.name, l.phone, l.city, l.treatment, l.source, l.status,
        users.find((u: any) => u.username === l.assignedTo)?.name || l.assignedTo || "",
        (l.notes || "").replace(/\n/g, " "),
        new Date(l.createdAt).toLocaleDateString(),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "healvia_leads_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={exportCsv} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium" style={{ background: "#1F5C57", color: "#F5F7F6" }}>
          <Download size={15} /> Export CSV
        </button>
      </div>

      <div className="rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
        <h3 className="lms-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Leads by status</h3>
        <div className="grid grid-cols-3 gap-3">
          {byStatus.map((s) => (
            <div key={s.status} className="rounded-lg p-3" style={{ background: "#F5F7F6" }}>
              <div style={{ fontSize: 11.5, color: "#5B6E6C" }}>{s.status}</div>
              <div className="lms-display" style={{ fontSize: 22, fontWeight: 600, color: STATUS_COLOR[s.status] }}>{s.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
        <h3 className="lms-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Leads by treatment</h3>
        {byTreatment.length === 0 ? <EmptyState text="No data yet." /> : (
          <div className="space-y-2">
            {byTreatment.map((t) => (
              <div key={t.treatment} className="flex items-center gap-3">
                <div style={{ width: 170, fontSize: 12.5, color: "#5B6E6C", flexShrink: 0 }}>{t.treatment}</div>
                <div className="flex-1" style={{ background: "#F0F4F3", borderRadius: 6, height: 20 }}>
                  <div style={{ width: `${(t.count / maxTreatment) * 100}%`, background: "#C97A3D", borderRadius: 6, height: "100%", minWidth: 4 }} />
                </div>
                <div className="lms-mono" style={{ width: 20, fontSize: 12 }}>{t.count}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {currentUser.role === "admin" && (
        <div className="rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
          <h3 className="lms-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Agent performance</h3>
          {byAgent.length === 0 ? <EmptyState text="No leads assigned yet." /> : (
            <table className="w-full" style={{ fontSize: 13 }}>
              <thead>
                <tr style={{ color: "#5B6E6C", fontSize: 11.5 }}>
                  <th className="text-left py-1.5 font-medium">Agent</th>
                  <th className="text-left py-1.5 font-medium">Total leads</th>
                  <th className="text-left py-1.5 font-medium">Completed</th>
                  <th className="text-left py-1.5 font-medium">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {byAgent.map((a: any) => (
                  <tr key={a.name} style={{ borderTop: "1px solid #F0F4F3" }}>
                    <td className="py-2">{a.name}</td>
                    <td className="py-2">{a.total}</td>
                    <td className="py-2">{a.completed}</td>
                    <td className="py-2">{a.total ? Math.round((a.completed / a.total) * 100) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

function UsersPage({ users, onAdd, onDelete }: any) {
  const [form, setForm] = useState({ username: "", password: "", name: "", role: "agent" });
  const [err, setErr] = useState("");

  const submit = (e: any) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim() || !form.name.trim()) {
      setErr("Sabhi fields bharna zaroori hai.");
      return;
    }
    setErr("");
    onAdd(form);
    setForm({ username: "", password: "", name: "", role: "agent" });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="rounded-xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
        <h3 className="lms-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Team members</h3>
        <div className="space-y-1">
          {users.map((u: any) => (
            <div key={u.username} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #F0F4F3" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{u.name}</div>
                <div className="lms-mono" style={{ fontSize: 11.5, color: "#8A9B9A" }}>@{u.username} &middot; {u.role}</div>
              </div>
              {u.username !== "admin" && (
                <button onClick={() => onDelete(u.username)} style={{ color: "#B4483F" }}>
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={submit} className="rounded-xl p-5 space-y-3" style={{ background: "#FFFFFF", border: "1px solid #E1E8E6" }}>
        <h3 className="lms-display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Add team member</h3>
        <Field label="Full name">
          <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Field>
        <Field label="Username">
          <input style={inputStyle} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </Field>
        <Field label="Password">
          <input style={inputStyle} type="text" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </Field>
        <Field label="Role">
          <select style={inputStyle} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        </Field>
        {err && <p style={{ color: "#B4483F", fontSize: 12.5 }}>{err}</p>}
        <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium" style={{ background: "#1F5C57", color: "#F5F7F6" }}>
          <Plus size={15} /> Add member
        </button>
      </form>
    </div>
  );
}
