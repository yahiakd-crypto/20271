import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Plus,
  X,
  Copy,
  Pencil,
  Trash2,
  Workflow,
  Sparkles,
  Layers,
  ChevronDown,
  Check,
  Save,
  LogOut,
  ArrowLeft,
} from 'lucide-react';
import { BoardProject } from '../../types/board';

interface BoardTabBarProps {
  projects: BoardProject[];
  openProjectIds: string[];
  activeProjectId: string;
  onSelectProject: (projectId: string) => void;
  onCloseTab: (projectId: string) => void;
  onReturnToHub: () => void;
  onOpenNewProjectModal: () => void;
  onDuplicateProject: (projectId: string) => void;
  onRenameProject: (projectId: string, newName: string) => void;
  onDeleteProject: (projectId: string) => void;
  onSaveProject: () => void;
  onCreateNewBlankBoard?: () => void;
  onClearBoard?: () => void;
  saveStatus?: 'saved' | 'saving';
}

export const BoardTabBar: React.FC<BoardTabBarProps> = ({
  projects,
  openProjectIds,
  activeProjectId,
  onSelectProject,
  onCloseTab,
  onReturnToHub,
  onOpenNewProjectModal,
  onDuplicateProject,
  onRenameProject,
  onDeleteProject,
  onSaveProject,
  onCreateNewBlankBoard,
  onClearBoard,
  saveStatus = 'saved',
}) => {
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [contextMenu, setContextMenu] = useState<{
    projectId: string;
    x: number;
    y: number;
  } | null>(null);

  // Close context menu on outside click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const openProjects = projects.filter((p) => openProjectIds.includes(p.id));
  const activeProject = projects.find((p) => p.id === activeProjectId);

  const handleStartRename = (project: BoardProject, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingProjectId(project.id);
    setEditName(project.name);
    setContextMenu(null);
  };

  const handleFinishRename = (projectId: string) => {
    if (editName.trim()) {
      onRenameProject(projectId, editName.trim());
    }
    setEditingProjectId(null);
  };

  const handleContextMenu = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      projectId,
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="h-10 bg-[#121214] border-b border-white/10 flex items-center justify-between px-3 z-20 select-none text-xs text-neutral-300">
      {/* Left: Hub Navigation & Tab Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 flex-1">
        {/* Projects Hub Button */}
        <button
          onClick={onReturnToHub}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1f1f23] border border-white/10 hover:border-blue-500 text-neutral-200 hover:text-blue-400 font-semibold shadow-xs transition-all shrink-0 cursor-pointer group"
          title="Return to Board Projects Hub (view all project cards)"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-400 group-hover:-translate-x-0.5 transition-transform" />
          <FolderKanban className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-bold text-[11px]">All Projects</span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-950/70 border border-blue-800/50 text-blue-300 font-mono">
            {projects.length}
          </span>
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1 shrink-0" />

        {/* Project Tabs Strip */}
        <div className="flex items-center gap-1">
          {openProjects.map((project) => {
            const isActive = project.id === activeProjectId;
            const isEditing = editingProjectId === project.id;
            const nodeCount = project.nodes?.length || 0;

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                onContextMenu={(e) => handleContextMenu(e, project.id)}
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer shrink-0 max-w-[220px] ${
                  isActive
                    ? 'bg-[#242429] border-blue-500/50 text-white shadow-xs font-semibold'
                    : 'bg-[#1a1a1e] hover:bg-[#222228] border-white/5 text-neutral-400 hover:text-white'
                }`}
                title={`Project: ${project.name} (${nodeCount} nodes)\nRight-click for options`}
              >
                <Workflow className={`w-3 h-3 shrink-0 ${isActive ? 'text-blue-400' : 'text-neutral-500'}`} />

                {isEditing ? (
                  <input
                    type="text"
                    value={editName}
                    autoFocus
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={() => handleFinishRename(project.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleFinishRename(project.id);
                      if (e.key === 'Escape') setEditingProjectId(null);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-28 px-1 py-0.5 text-xs bg-white border border-emerald-500 rounded outline-none text-slate-900 font-sans"
                  />
                ) : (
                  <span
                    onDoubleClick={(e) => handleStartRename(project, e)}
                    className="truncate max-w-[130px] text-[11px]"
                  >
                    {project.name}
                  </span>
                )}

                {/* Node Count Badge */}
                <span
                  className={`text-[9.5px] px-1 rounded-full font-mono font-bold shrink-0 ${
                    isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-300/60 text-slate-600'
                  }`}
                >
                  {nodeCount}
                </span>

                {/* Always-Available Close Tab Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(project.id);
                  }}
                  className="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                  title="Close project (return to hub if last)"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* "+ New Board" Button (Creates clean 0-node canvas) */}
        <button
          onClick={() => {
            if (onCreateNewBlankBoard) onCreateNewBlankBoard();
            else onOpenNewProjectModal();
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1f1f23] hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 font-semibold text-[11px] transition-colors shrink-0 shadow-xs cursor-pointer ml-1"
          title="Create Clean New Board (0 cards, completely fresh canvas)"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>New Board</span>
        </button>
      </div>

      {/* Right Side: Clear, Save, Rename, Duplicate, Close Project Controls */}
      <div className="flex items-center gap-2 pl-3 shrink-0">
        {onClearBoard && (
          <button
            onClick={() => {
              if (window.confirm('Wipe current canvas? This will remove all cards and connections on this board.')) {
                onClearBoard();
              }
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1f1f23] hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 border border-white/5 font-semibold text-[10.5px] transition-colors cursor-pointer"
            title="Clear all cards on current board"
          >
            <Trash2 className="w-3 h-3 text-neutral-500 hover:text-rose-400" />
            <span className="hidden sm:inline">Clear Canvas</span>
          </button>
        )}

        {activeProject && (
          <>
            <span className="text-[10px] text-neutral-500 font-mono hidden lg:inline">
              {activeProject.nodes?.length || 0} skills • {activeProject.edges?.length || 0} links
            </span>

            {/* Explicit Save Button */}
            <button
              onClick={onSaveProject}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shadow-xs transition-all cursor-pointer"
              title="Save project changes to browser storage"
            >
              <Save className="w-3 h-3" />
              <span>{saveStatus === 'saved' ? 'Saved' : 'Saving...'}</span>
            </button>

            {/* Rename active */}
            <button
              onClick={() => handleStartRename(activeProject)}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              title="Rename Current Board Project"
            >
              <Pencil className="w-3 h-3" />
            </button>

            {/* Duplicate active */}
            <button
              onClick={() => onDuplicateProject(activeProject.id)}
              className="p-1 rounded-lg text-neutral-400 hover:text-blue-400 hover:bg-white/10 transition-all cursor-pointer"
              title="Duplicate Current Board Project"
            >
              <Copy className="w-3 h-3" />
            </button>

            {/* Delete active button */}
            <button
              onClick={() => onDeleteProject(activeProject.id)}
              className="p-1 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-950/40 transition-all cursor-pointer"
              title="Delete Current Board Project"
            >
              <Trash2 className="w-3 h-3" />
            </button>

            {/* Close Project & Return to Hub */}
            <button
              onClick={onReturnToHub}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1f1f23] border border-white/10 hover:bg-[#282830] text-neutral-300 hover:text-white font-medium text-[11px] transition-colors cursor-pointer"
              title="Close this canvas and return to all board projects"
            >
              <LogOut className="w-3 h-3 text-neutral-400" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </>
        )}
      </div>

      {/* Context Menu for Tab Right-Click */}
      {contextMenu && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="fixed bg-[#1c1c20] rounded-xl shadow-2xl border border-white/15 py-1.5 z-50 text-xs w-44 font-sans animate-in fade-in text-neutral-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              const target = projects.find((p) => p.id === contextMenu.projectId);
              if (target) handleStartRename(target);
            }}
            className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-neutral-200 hover:bg-white/10 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-neutral-400" />
            <span>Rename Project</span>
          </button>
          <button
            onClick={() => {
              onDuplicateProject(contextMenu.projectId);
              setContextMenu(null);
            }}
            className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-neutral-200 hover:bg-white/10 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-neutral-400" />
            <span>Duplicate Project</span>
          </button>
          <button
            onClick={() => {
              onDeleteProject(contextMenu.projectId);
              setContextMenu(null);
            }}
            className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Delete Project</span>
          </button>
        </div>
      )}
    </div>
  );
};
