import React, { useState, useEffect } from 'react';
import { CheckCircle2, Plus, Calendar, User, Clock, AlertCircle } from 'lucide-react';
import { fetchTasks, createTask } from '../api/tasks';

export default function TasksView() {
  const [viewMode, setViewMode] = useState('kanban');
  const [tasks, setTasks] = useState([
    { id: 'TSK-101', title: 'Bay-3 Friction Pad Replacement (Rake #07)', dept: 'Muttom Maintenance', assignee: 'S. Nair', status: 'In Progress', priority: 'High', due: '08-Aug-2026' },
    { id: 'TSK-102', title: 'BHEL Substation Invoice Final Clearance', dept: 'Finance', assignee: 'K. Menon', status: 'To Do', priority: 'High', due: '09-Aug-2026' },
    { id: 'TSK-103', title: 'Periyar Bridge Monsoon Speed Limit Override Verification', dept: 'Safety & OCC', assignee: 'V. Pillai', status: 'Completed', priority: 'Urgent', due: '07-Aug-2026' }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    async function loadLiveTasks() {
      try {
        const live = await fetchTasks();
        if (live && Array.isArray(live) && live.length > 0) {
          const formatted = live.map(t => ({
            id: `TSK-${t.id}`,
            title: t.title,
            dept: t.department_name || 'Operations & Maintenance',
            assignee: t.assignee_name || 'S. Nair',
            status: t.status === 'TODO' ? 'To Do' : t.status === 'IN_PROGRESS' ? 'In Progress' : 'Completed',
            priority: t.priority || 'High',
            due: t.due_date ? new Date(t.due_date).toLocaleDateString() : '08-Aug-2026'
          }));
          setTasks(formatted);
        }
      } catch (err) {
        console.warn('Live tasks fallback to initial state:', err);
      }
    }
    loadLiveTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const created = await createTask({ title: newTitle, priority: 'High', status: 'TODO' });
      const newTaskObj = {
        id: `TSK-${created.id || tasks.length + 104}`,
        title: newTitle,
        dept: 'Operations & Maintenance',
        assignee: 'S. Nair',
        status: 'To Do',
        priority: 'High',
        due: 'Just Now'
      };
      setTasks([newTaskObj, ...tasks]);
      setNewTitle('');
      setIsCreating(false);
    } catch (err) {
      const newTaskObj = {
        id: `TSK-${tasks.length + 104}`,
        title: newTitle,
        dept: 'Operations & Maintenance',
        assignee: 'S. Nair',
        status: 'To Do',
        priority: 'High',
        due: 'Just Now'
      };
      setTasks([newTaskObj, ...tasks]);
      setNewTitle('');
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50" />
            <span className="gradient-text-cyan">Task Management Workspace</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Operational tasks, maintenance assignments, and departmental due dates</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-slate-400'}`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-slate-400'}`}
            >
              Table View
            </button>
          </div>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glow-btn-cyan text-xs font-bold shadow-lg"
          >
            <Plus className="w-3.5 h-3.5" /> New Task
          </button>
        </div>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateTask} className="p-4 bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-xl space-y-3">
          <div className="text-xs font-bold text-slate-100">Create New Operational Task</div>
          <input
            type="text"
            placeholder="Enter Task Title (e.g., Kalamassery Station Transformer Audit)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 text-slate-100 rounded-xl focus:outline-none focus:border-cyan-500/50"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsCreating(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200">Cancel</button>
            <button type="submit" className="px-4 py-1.5 text-xs glow-btn-cyan font-bold rounded-xl shadow-md">Save Task</button>
          </div>
        </form>
      )}

      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['To Do', 'In Progress', 'Completed'].map(colStatus => (
            <div key={colStatus} className="metro-card p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-100 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {colStatus}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[10px]">
                  {tasks.filter(t => t.status === colStatus).length}
                </span>
              </div>

              <div className="space-y-2">
                {tasks.filter(t => t.status === colStatus).map(t => (
                  <div key={t.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span className="text-cyan-400 font-bold">{t.id}</span>
                      <span className="font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">{t.priority}</span>
                    </div>
                    <div className="font-bold text-slate-100">{t.title}</div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                      <span>👤 {t.assignee}</span>
                      <span>📅 {t.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="metro-card p-5">
          <table className="w-full text-left text-xs metro-table font-mono">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Department</th>
                <th>Assignee</th>
                <th>Due Date</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id}>
                  <td className="font-bold text-cyan-400">{t.id}</td>
                  <td className="font-sans font-bold text-slate-100">{t.title}</td>
                  <td className="font-sans text-slate-300">{t.dept}</td>
                  <td className="font-sans text-slate-300">{t.assignee}</td>
                  <td className="text-slate-400">{t.due}</td>
                  <td className="text-right font-bold text-cyan-400">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
