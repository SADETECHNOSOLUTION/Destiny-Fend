import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Checkbox from "../components/checkbox";
import { logout } from "../slices/authslice";
import axios from "axios";

const Menu = () => {
  const [user, setUser] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch dark mode preference from localStorage on initial render
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  // Save dark mode preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  // Fetch accounts/profiles on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/v1/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAccounts(response.data.identities || [response.data]);
      } catch (error) {
        console.error("Failed to fetch user accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const openTalent = ()=>{
    navigate('/talent')
  }

  const handleSwitchIdentity = async (targetIdentityId, identityType) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/switch-identity', {
        targetIdentityId,
        identityType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to switch identity:", error);
    }
  };

  const menu = [
    { id: 1, title: "Edit Profile", icon: <Icon className="w-6 h-7" icon="material-symbols:person-edit-outline" />, path: "/editprofile" },
    { id: 2, title: "Settings", icon: <Icon className="w-6 h-7" icon="carbon:settings" />, path: "/settings" },
    { id: 3, title: "Privacy & data", icon: <Icon className="w-6 h-7" icon="carbon:security" />, path: "/Privacydata" },
    { id: 4, title: "Security", icon: <Icon className="w-6 h-7" icon="material-symbols:lock-outline" />, path: "/security" },
  ];

  const terms = [
    { id: 1, title: "Help", icon: <Icon className="w-6 h-7" icon="material-symbols:help-outline" />, path: "/help" },
    { id: 2, title: "About", icon: <Icon className="w-6 h-7" icon="ph:address-book" />, path: "/about" },
    { id: 3, title: "Invite Friends", icon: <Icon className="w-6 h-7" icon="ph:share-fat" />, path: "/invite" },
  ];

  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (userId) {
      fetchUserName();
    }
  }, [userId]);

  const dashboard = ()=>{
    navigate('/talent/dashboard')
  }

  return (
    <div className={`max-w-[30rem] w-full flex h-screen flex-col gap-2 ${isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      
      {/* Top Profile / Workspace Switcher Card */}
      <div className={`flex flex-col ${isDarkMode ? "bg-slate-950 text-white" : "bg-gradient-to-tr from-span-start to-span-end text-slate-900"} border px-6 py-5 rounded-2xl shadow-xl gap-3`}>
        
        <NavLink to={`/user/${userId}`} className="block">
          <div className="flex relative justify-between items-center p-3 bg-white hover:bg-slate-800 rounded-xl gap-4 transition border border-slate-700/50">
            <div className="flex items-center gap-3 min-w-0">
              <img 
                src='dp.jpg' 
                alt="Profile" 
                className="cursor-pointer rounded-full h-11 w-11 bg-slate-700 object-cover ring-2 ring-emerald-500/40" 
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text- truncate">{user?.name || "Sreeman V K"}</p>
                <p className="text-xs text- -400">Personal Account</p>
              </div>
            </div>
            <Icon icon="mdi:check-circle" className="w-6 h-6 text-emerald-500 shrink-0" />
          </div>
        </NavLink>

        {/* Linked Organizations / Identities List */}
        <div className="space-y-0 rounded-xl bg-slate-900/40 max-h-48 flex flex-col overflow-y-auto">


          {loading ? (
            <p className="text-xs text-slate-400 text-center py-2">Loading profiles...</p>
          ) : accounts.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-2 italic bg-slate-900/40 rounded-xl">No linked organizations found.</p>
          ) : (
            accounts.map((acc, index) => (
              <div 
                key={acc.partnerId || index}
                onClick={dashboard}
                className="flex items-center justify-between p-3 hover:bg-slate-800 rounded-xl cursor-pointer transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-lg font-bold flex items-center justify-center bg-cta text-white shrink-0 shadow">
                    {acc.displayName?.charAt(0) || 'O'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{acc.displayName || acc.name}</p>
                    <p className="text-[11px] text-slate-300 capitalize">{acc.partnerType?.toLowerCase() || 'Organization'}</p>
                  </div>
                </div>

<div className="w-5 h-5 rounded-full border border-gray-300 border-2 "></div>
                </div>
            ))
          )}
                <button onClick={openTalent} className="w-full py-3 px-3 rounded-xl bg-slate-800/40 border-slate-700 hover:border-indigo-500/50 text-xs font-medium text-white hover:text-indigo-400 transition-colors flex items-center justify-center gap-2">
          <span>+ Add another organization</span>
        </button>
        </div>

  
      </div>

      {/* Navigation Links */}
      <div className="space-y-1">
        {menu.map((setting) => (
          <Link key={setting.id} to={setting.path} className="block">
            <div className="flex items-center px-4 py-3 gap-4 font-semibold hover:bg-slate-800/50 rounded-xl transition">
              {setting.icon} 
              <span className="text-sm">{setting.title}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center px-4 py-3 justify-between font-semibold rounded-xl bg-slate-900/30 border border-slate-800/40">
        <div className="flex items-center gap-4">
          <Icon icon="material-symbols-light:dark-mode" className="w-7 h-7" />
          <span className="text-sm">Dark Mode</span>
        </div>
        <Checkbox isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>

      {/* Terms / Support Links */}
      <div className="space-y-1">
        {terms.map((setting) => (
          <Link key={setting.id} to={setting.path || "#"} className="block">
            <div className="flex items-center px-4 py-3 gap-4 font-semibold hover:bg-slate-800/50 rounded-xl transition">
              {setting.icon} 
              <span className="text-sm">{setting.title}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div 
        onClick={handleLogout}
        className="cursor-pointer flex items-center px-4 py-3 gap-4 font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition mt-auto"
      >
        <Icon className="w-6 h-7" icon="fe:logout" />
        <span className="text-sm">Logout</span>
      </div>

    </div>
  );
};

export default Menu;