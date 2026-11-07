import React, { useState } from 'react';
import {
  Home,
  FolderKanban,
  Layers,
  LayoutGrid,
  Search,
  Video,
  BarChart2,
  Package,
  Zap,
  FileText,
  Settings,
  ChevronDown,
  ChevronsUpDown,
  TrendingUp,
  Play,
  Link,
  Target,
  PieChart,
  Globe,
  DollarSign,
  Workflow,
  PanelLeft,
  Plug,
  ShoppingBag,
  Code,
  Image as ImageIcon,
  Sparkles,
  Smartphone,
} from 'lucide-react';

export interface AppSidebarProps {
  activeView: string;
  activeSubItem?: string;
  onNavigate: (view: string, subItem?: string) => void;
  onOpenNewModal?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeView,
  activeSubItem,
  onNavigate,
  onOpenNewModal,
}) => {
  // Expansion state for accordion submenus
  const [isAdsExpanded, setIsAdsExpanded] = useState(true);
  const [isAnalyticsExpanded, setIsAnalyticsExpanded] = useState(true);

  // Dynamic promo card content based on current view
  const getPromoContent = () => {
    if (activeView === 'ads-library') {
      return {
        icon: <TrendingUp className="w-4 h-4 text-blue-400" />,
        title: 'Track Competitors Like a Pro',
        description: 'Save ads, pages and monitor new launches automatically with Finalytic OS.',
        buttonLabel: '+ Save New Ad / Page',
        action: () => onNavigate('ads-library', 'save'),
      };
    }
    if (activeView === 'analytics') {
      return {
        icon: <TrendingUp className="w-4 h-4 text-blue-400" />,
        title: 'Turn Data into Profits',
        description: 'Discover insights, track trends, and optimize your e-commerce business faster.',
        buttonLabel: '+ Create Report',
        action: () => onNavigate('reports', 'new'),
      };
    }
    return {
      icon: <TrendingUp className="w-4 h-4 text-blue-400" />,
      title: 'Grow Your E-commerce',
      description: 'Discover products, analyze competitors, create campaigns, track orders and maximize profit.',
      buttonLabel: '+ Start New Project',
      action: () => (onOpenNewModal ? onOpenNewModal() : onNavigate('projects')),
    };
  };

  const promo = getPromoContent();

  return (
    <aside className="w-64 my-3 ml-3 h-[calc(100%-1.5rem)] rounded-3xl bg-[#161618] border border-white/10 shadow-2xl flex flex-col justify-between shrink-0 select-none z-20 overflow-hidden text-neutral-300">
      {/* Top Branding & Main Navigation */}
      <div className="flex flex-col overflow-y-auto scrollbar-none">
        {/* Brand Header matching image_aea12bb5.png */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="p-3.5 flex items-center justify-between border-b border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* White square icon box */}
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-sm shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 13 9-8 9 8" />
                <path d="m8 12 4-3.5 4 3.5" />
                <path d="M12 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor" />
              </svg>
            </div>

            {/* Team / Finalytic Title */}
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 font-medium block leading-none mb-1">
                Team
              </span>
              <span className="text-sm font-bold text-white tracking-tight block leading-tight truncate">
                Finalytic
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-1 text-neutral-400">
            <button
              type="button"
              className="p-1 rounded-md hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Switch Workspace"
            >
              <ChevronsUpDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 rounded-md hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Toggle Sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-2 space-y-0.5">
          {/* 1. Dashboard */}
          <button
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'dashboard'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className={`w-4 h-4 ${activeView === 'dashboard' ? 'text-white' : 'text-neutral-400'}`} />
            <span>Dashboard</span>
          </button>

          {/* 2. Board / Workflow (Matching image_aea12bb5.png "Workflow") */}
          <button
            onClick={() => onNavigate('board')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'board'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Workflow className={`w-4 h-4 ${activeView === 'board' ? 'text-white' : 'text-neutral-400'}`} />
            <span>Workflow & Board</span>
          </button>

          {/* 3. Projects */}
          <button
            onClick={() => onNavigate('projects')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'projects'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FolderKanban className={`w-4 h-4 ${activeView === 'projects' ? 'text-white' : 'text-neutral-400'}`} />
            <span>Projects</span>
          </button>

          {/* 4. Templates */}
          <button
            onClick={() => onNavigate('templates')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'templates'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className={`w-4 h-4 ${activeView === 'templates' ? 'text-white' : 'text-neutral-400'}`} />
            <span>Templates</span>
          </button>

          {/* 5. Canvas */}
          <button
            onClick={() => onNavigate('canvas')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'canvas'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutGrid className={`w-4 h-4 ${activeView === 'canvas' ? 'text-white' : 'text-neutral-400'}`} />
            <span>Canvas</span>
          </button>

          {/* 6. Product Research */}
          <button
            onClick={() => onNavigate('research')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'research'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Search className={`w-4 h-4 ${activeView === 'research' ? 'text-white' : 'text-neutral-400'}`} />
            <span>Product Research</span>
          </button>

          {/* 7. Products Intelligence (Title "Products" requested) */}
          <button
            onClick={() => onNavigate('products')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'products'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className={`w-4 h-4 ${activeView === 'products' ? 'text-blue-400' : 'text-neutral-400'}`} />
              <span>Products</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-md bg-blue-600/20 text-blue-300 font-mono text-[9.5px] font-bold border border-blue-500/30">
              DZ COD
            </span>
          </button>

          {/* Apps Section Header */}
          <div className="pt-2 pb-1 px-3 flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
              Creative Apps
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-white/10 text-neutral-300">
              4 APPS
            </span>
          </div>

          {/* AI Landing Page Generator (New Skill) */}
          <button
            onClick={() => onNavigate('landing-page')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'landing-page' || ((activeSubItem === 'landing-page' || activeSubItem === 'lanidng-page') && activeView === 'board')
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-blue-500/40'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className={`w-4 h-4 ${activeView === 'landing-page' || ((activeSubItem === 'landing-page' || activeSubItem === 'lanidng-page') && activeView === 'board') ? 'text-blue-400' : 'text-neutral-400'}`} />
              <span className="truncate">Landing Page</span>
            </div>
            <span className="px-1.5 py-0.2 rounded-md bg-blue-600/30 text-blue-300 font-mono text-[9px] font-bold border border-blue-500/30">
              AI LP
            </span>
          </button>

          {/* 8. Regroupe Product App */}
          <button
            onClick={() => onNavigate('board', 'regrouper')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeSubItem === 'regrouper' && activeView === 'board'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-violet-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Workflow className={`w-4 h-4 ${activeSubItem === 'regrouper' && activeView === 'board' ? 'text-violet-400' : 'text-neutral-400'}`} />
              <span>Regroupe Product</span>
            </div>
            <span className="px-1.5 py-0.2 rounded-md bg-violet-600/30 text-violet-300 font-mono text-[9px] font-bold border border-violet-500/30">
              ORG
            </span>
          </button>

          {/* 9. Text to Code Landing Page (Image 1) */}
          <button
            onClick={() => onNavigate('board', 'text-to-code-lp')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeSubItem === 'text-to-code-lp' && activeView === 'board'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-rose-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Code className={`w-4 h-4 ${activeSubItem === 'text-to-code-lp' && activeView === 'board' ? 'text-rose-400' : 'text-neutral-400'}`} />
              <span className="truncate">Text to Code LP</span>
            </div>
            <span className="px-1.5 py-0.2 rounded-md bg-rose-600/30 text-rose-300 font-mono text-[9px] font-bold border border-rose-500/30">
              IMG 1
            </span>
          </button>

          {/* 10. Text to Image Landing Page (Image 2) */}
          <button
            onClick={() => onNavigate('board', 'text-to-image-lp')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeSubItem === 'text-to-image-lp' && activeView === 'board'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-purple-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <ImageIcon className={`w-4 h-4 ${activeSubItem === 'text-to-image-lp' && activeView === 'board' ? 'text-purple-400' : 'text-neutral-400'}`} />
              <span className="truncate">Text to Image LP</span>
            </div>
            <span className="px-1.5 py-0.2 rounded-md bg-purple-600/30 text-purple-300 font-mono text-[9px] font-bold border border-purple-500/30">
              IMG 2
            </span>
          </button>

          {/* 11. CRO Landing Page Builder (Mobile) */}
          <button
            onClick={() => onNavigate('board', 'cro-mobile-lp')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              (activeSubItem === 'cro-mobile-lp' || activeSubItem === 'cro_mobile_landing_page') && activeView === 'board'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-blue-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Smartphone className={`w-4 h-4 ${(activeSubItem === 'cro-mobile-lp' || activeSubItem === 'cro_mobile_landing_page') && activeView === 'board' ? 'text-blue-400' : 'text-neutral-400'}`} />
              <span className="truncate">CRO Mobile LP</span>
            </div>
            <span className="px-1.5 py-0.2 rounded-md bg-blue-600/30 text-blue-300 font-mono text-[9px] font-bold border border-blue-400/30">
              CRO DZ
            </span>
          </button>

          {/* Divider */}
          <div className="border-t border-white/5 my-1.5 mx-2" />

          {/* 7. Ads Library (Expandable with Tree Branching) */}
          <div className="space-y-0.5">
            <button
              onClick={() => {
                onNavigate('ads-library', 'videos');
                setIsAdsExpanded(!isAdsExpanded);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeView === 'ads-library'
                  ? 'bg-[#242429] text-white font-semibold border border-white/5'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Video className={`w-4 h-4 ${activeView === 'ads-library' ? 'text-white' : 'text-neutral-400'}`} />
                <span>Ads Library</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                  isAdsExpanded ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>

            {isAdsExpanded && (
              <div className="ml-5 pl-3 border-l border-neutral-700/60 space-y-1 py-1">
                <button
                  onClick={() => onNavigate('ads-library', 'videos')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'ads-library' && (!activeSubItem || activeSubItem === 'videos')
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Play className="w-3 h-3 text-neutral-400" />
                  <span>Ads / Videos</span>
                </button>

                <button
                  onClick={() => onNavigate('ads-library', 'pages')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'ads-library' && activeSubItem === 'pages'
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Link className="w-3 h-3 text-neutral-400" />
                  <span>Saved Pages</span>
                </button>

                <button
                  onClick={() => onNavigate('ads-library', 'competitor')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'ads-library' && activeSubItem === 'competitor'
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Target className="w-3 h-3 text-neutral-400" />
                  <span>Competitor Ads</span>
                </button>
              </div>
            )}
          </div>

          {/* 8. Analytics (Expandable with Tree Branching like image_aea12bb5.png Payments view) */}
          <div className="space-y-0.5">
            <button
              onClick={() => {
                onNavigate('analytics', 'overview');
                setIsAnalyticsExpanded(!isAnalyticsExpanded);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeView === 'analytics'
                  ? 'bg-[#242429] text-white font-semibold border border-white/5'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart2 className={`w-4 h-4 ${activeView === 'analytics' ? 'text-white' : 'text-neutral-400'}`} />
                <span>Analytics</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                  isAnalyticsExpanded ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>

            {isAnalyticsExpanded && (
              <div className="ml-5 pl-3 border-l border-neutral-700/60 space-y-1 py-1">
                <button
                  onClick={() => onNavigate('analytics', 'overview')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'analytics' && (!activeSubItem || activeSubItem === 'overview')
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <PieChart className="w-3 h-3 text-neutral-400" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => onNavigate('analytics', 'traffic')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'analytics' && activeSubItem === 'traffic'
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Globe className="w-3 h-3 text-neutral-400" />
                  <span>Traffic</span>
                </button>

                <button
                  onClick={() => onNavigate('analytics', 'conversions')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'analytics' && activeSubItem === 'conversions'
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Target className="w-3 h-3 text-neutral-400" />
                  <span>Conversions</span>
                </button>

                <button
                  onClick={() => onNavigate('analytics', 'roas')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'analytics' && activeSubItem === 'roas'
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <DollarSign className="w-3 h-3 text-neutral-400" />
                  <span>Profit & ROAS</span>
                </button>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 my-1.5 mx-2" />

          {/* 9. Orders & COD */}
          <button
            onClick={() => onNavigate('orders-cod')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'orders-cod'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className={`w-4 h-4 ${activeView === 'orders-cod' ? 'text-white' : 'text-neutral-400'}`} />
            <span>Orders & COD</span>
          </button>

          {/* 10. Connections & Automation (With Orange "2" Badge matching image_aea12bb5.png!) */}
          <button
            onClick={() => onNavigate('automation')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'automation'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Plug className={`w-4 h-4 ${activeView === 'automation' ? 'text-white' : 'text-neutral-400'}`} />
              <span>Connections</span>
            </div>
            {/* Orange Badge matching image_aea12bb5.png */}
            <span className="px-1.5 py-0.5 rounded-md bg-[#ff5a1f] text-white font-bold text-[10px] leading-none shadow-xs">
              2
            </span>
          </button>

          {/* 11. Reports / Statements */}
          <button
            onClick={() => onNavigate('reports')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'reports'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeView === 'reports' ? 'text-white' : 'text-neutral-400'}`} />
            <span>Statements & Reports</span>
          </button>

          {/* 12. Settings */}
          <button
            onClick={() => onNavigate('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeView === 'settings'
                ? 'bg-[#242429] text-white font-semibold shadow-xs border border-white/5'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className={`w-4 h-4 ${activeView === 'settings' ? 'text-white' : 'text-neutral-400'}`} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Bottom Promo Card matching the sleek dark theme */}
      <div className="p-3">
        <div className="p-3.5 rounded-2xl bg-[#1c1c20] text-white shadow-xl relative overflow-hidden border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center mb-2.5">
            {promo.icon}
          </div>
          <h3 className="text-xs font-bold leading-tight mb-1 text-white">
            {promo.title}
          </h3>
          <p className="text-[10px] text-neutral-400 leading-relaxed mb-3">
            {promo.description}
          </p>
          <button
            onClick={promo.action}
            className="w-full py-2 rounded-xl bg-[#27272e] hover:bg-white hover:text-black active:scale-98 text-white text-xs font-bold transition-all shadow-sm border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{promo.buttonLabel}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
