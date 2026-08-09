import React, { useState, useEffect } from 'react';
import {
  GitMerge,
  ShieldCheck,
  CheckCircle2,
  CheckSquare,
  AlertTriangle,
  Plus,
  ArrowRight,
  DollarSign,
  User,
  Clock,
  Check,
  X,
  Sparkles,
  Kanban,
  Table as TableIcon,
  Shield
} from 'lucide-react';
import { fetchApprovals, approveRequest } from '../api/approvals';
import { fetchTasks, createTask } from '../api/tasks';

export default function WorkflowsView({ documents, onSelectDocument, onNavigateTab }) {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState('routing'); // 'routing' | 'approvals' | 'tasks' | 'recommendations'
  const [taskViewMode, setTaskViewMode] = useState('kanban');

  // Approvals State
  const [clearedPayment, setClearedPayment] = useState(false);
  const [approvalsList, setApprovalsList] = useState([]);

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 'TSK-101', title: 'Bay-3 Friction Pad Replacement (Rake #07)', dept: 'Operations & Maintenance', assignee: 'S. Nair', status: 'In Progress', priority: 'High', due: '08-Aug-2026' },
    { id: 'TSK-102', title: 'BHEL Substation Invoice Final Clearance', dept: 'Finance & Procurement', assignee: 'K. Menon', status: 'To Do', priority: 'High', due: '09-Aug-2026' },
    { id: 'TSK-103', title: 'Periyar Bridge Speed Limit ATC Enforcement Verification', dept: 'Safety & Security', assignee: 'V. Pillai', status: 'Completed', priority: 'Urgent', due: '07-Aug-2026' }
  ]);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // AI Workflow Recommendations State
  const [recommendations, setRecommendations] = useState([
    {
      id: 'REC-901',
      docId: 'KMRL-ENG-2026-8812',
      docTitle: 'Muttom Depot Rolling Stock Brake Inspection & Wheel Lathe Audit',
      suggestedAction: 'Schedule Rake #07 Bay-3 Friction Pad Overhaul',
      recommendedDepartment: 'Operations & Maintenance',
      priority: 'HIGH',
      status: 'PENDING_HUMAN_REVIEW',
      reason: 'Friction brake pad remaining thickness (3.2mm) below safety threshold (6.0mm).'
    },
    {
      id: 'REC-902',
      docId: 'KMRL-FIN-2026-3042',
      docTitle: 'Invoice #BHEL/KMRL/2026/094 — 33kV Traction Substation Transformers',
      suggestedAction: 'Release ₹16.43 Cr Payment to BHEL SBI Account',
      recommendedDepartment: 'Finance & Procurement',
      priority: 'HIGH',
      status: 'PENDING_HUMAN_REVIEW',
      reason: '3-Way PO Match (PO-7721 vs Invoice #094 vs GRN-4412) verified with 0.0% discrepancy.'
    },
    {
      id: 'REC-903',
      docId: 'KMRL-SAF-2026-019',
      docTitle: 'Monsoon Safety Operations & Emergency Speed Limit Circular',
      suggestedAction: 'Push 50 km/h Automatic Train Control (ATC) Speed Override',
      recommendedDepartment: 'Safety & Security',
      priority: 'URGENT',
      status: 'APPROVED',
      reason: 'Enforces 50km/h maximum speed during rainfall exceeding 35mm/hr on Periyar Bridge.'
    }
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const liveAppr = await fetchApprovals();
        if (liveAppr && Array.isArray(liveAppr) && liveAppr.length > 0) {
          setApprovalsList(liveAppr);
        }
        const liveTsk = await fetchTasks();
        if (liveTsk && Array.isArray(liveTsk) && liveTsk.length > 0) {
          setTasks(liveTsk.map(t => ({
            id: `TSK-${t.id}`,
            title: t.title,
            dept: t.department_name || 'Operations & Maintenance',
            assignee: t.assignee_name || 'S. Nair',
            status: t.status === 'TODO' ? 'To Do' : t.status === 'IN_PROGRESS' ? 'In Progress' : 'Completed',
            priority: t.priority || 'High',
            due: t.due_date ? new Date(t.due_date).toLocaleDateString() : '08-Aug-2026'
          })));
        }
      } catch (err) {
        console.warn("Workflows live fetch fallback:", err);
      }
    }
    loadData();
  }, []);

  const handleReleasePayment = async () => {
    setClearedPayment(true);
    try {
      const bhelAppr = approvalsList.find(a => a.document_id === 'KMRL-FIN-2026-3042');
      if (bhelAppr) {
        await approveRequest(bhelAppr.id, 'Disbursement of ₹16.43 Cr cleared by Executive Director.');
      }
    } catch (err) {
      console.warn('Backend approval update fallback:', err);
    }
  };

  const handleApproveRec = (recId) => {
    setRecommendations(prev => prev.map(r => {
      if (r.id === recId) {
        // Automatically create task from approved recommendation
        const newTask = {
          id: `TSK-${tasks.length + 105}`,
          title: r.suggestedAction,
          dept: r.recommendedDepartment,
          assignee: 'Department Officer',
          status: 'In Progress',
          priority: r.priority === 'HIGH' ? 'High' : 'Urgent',
          due: 'Today'
        };
        setTasks(tList => [newTask, ...tList]);
        return { ...r, status: 'APPROVED' };
      }
      return r;
    }));
  };

  const handleRejectRec = (recId) => {
    setRecommendations(prev => prev.map(r => r.id === recId ? { ...r, status: 'REJECTED' } : r));
  };

  const handleCreateTaskSubmit = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      await createTask({ title: newTaskTitle, priority: 'High', status: 'TODO' });
    } catch (err) {
      console.warn("Task creation fallback:", err);
    }

    const newTaskObj = {
      id: `TSK-${tasks.length + 104}`,
      title: newTaskTitle,
      dept: 'Operations & Maintenance',
      assignee: 'S. Nair',
      status: 'To Do',
      priority: 'High',
      due: 'Just Now'
    };
    setTasks([newTaskObj, ...tasks]);
    setNewTaskTitle('');
    setIsCreatingTask(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Workspace Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50" />
            <span className="gradient-text-cyan">Unified Workflows & Action Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Automated Department Routing • 3-Way Match Approvals • Task Management & Action Execution</p>
        </div>

        {/* Human-in-the-loop Guard Badge */}
        <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 shadow-md">
          <Shield className="w-3.5 h-3.5 text-purple-400" />
          Human Review Enforced
        </span>
      </div>

      {/* WORKFLOW STATUS PIPELINE BAR */}
      <div className="metro-card p-4 space-y-2 relative overflow-hidden bg-slate-950/60">
        <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
          MetroFlow Action Lifecycle
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold pt-1">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> AI Recommendation
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Human Review
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            <CheckSquare className="w-3.5 h-3.5 text-cyan-400" /> Approved / Rejected
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300">
            <GitMerge className="w-3.5 h-3.5 text-blue-400" /> Task Created & Assigned
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Completed
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveWorkflowTab('routing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeWorkflowTab === 'routing'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          Automatic Department Routing
        </button>
        <button
          onClick={() => setActiveWorkflowTab('approvals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeWorkflowTab === 'approvals'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          Approval Workflows & 3-Way PO Match
        </button>
        <button
          onClick={() => setActiveWorkflowTab('tasks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeWorkflowTab === 'tasks'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          Task Management ({tasks.length})
        </button>
        <button
          onClick={() => setActiveWorkflowTab('recommendations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeWorkflowTab === 'recommendations'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
          }`}
        >
          AI Recommendations ({recommendations.filter(r => r.status === 'PENDING_HUMAN_REVIEW').length} Pending)
        </button>
      </div>

      {/* SUB-VIEW 1: AUTOMATIC DEPARTMENT ROUTING */}
      {activeWorkflowTab === 'routing' && (
        <div className="space-y-6">
          <div className="metro-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                <GitMerge className="w-4 h-4 text-cyan-400" />
                Live Intelligent Document Routing Engine
              </h3>
              <span className="text-xs font-mono text-emerald-400">100% Deterministic AI Rules</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map(doc => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-cyan-500/40 transition-all space-y-3"
                >
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="font-bold text-cyan-300">{doc.id}</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                      {doc.confidence}% Confidence
                    </span>
                  </div>

                  <div className="font-bold text-xs text-slate-100 line-clamp-1">{doc.title}</div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                    <div className="text-slate-400">Routed Target Department:</div>
                    <div className="font-bold text-slate-100 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      {doc.department}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400">Status: {doc.status}</span>
                    <button
                      onClick={() => {
                        onSelectDocument(doc);
                        onNavigateTab('viewer');
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: APPROVAL WORKFLOWS & 3-WAY MATCH */}
      {activeWorkflowTab === 'approvals' && (
        <div className="space-y-6">
          <div className="metro-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                BHEL Southern Region 3-Way Invoice Reconciliation Table
              </h3>
              <span className="text-xs font-mono text-slate-400">PO Ref: PO-KMRL-2025-7721</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono metro-table">
                <thead>
                  <tr>
                    <th>Line Item Description</th>
                    <th>PO Billed Rate</th>
                    <th>Invoice Billed Rate</th>
                    <th>GRN Warehouse Ref</th>
                    <th>Discrepancy</th>
                    <th className="text-right">Human Approval Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold text-slate-100 font-sans">
                      33kV Dry-Type Traction Transformer (Cast Resin) - Qty 2 Nos
                    </td>
                    <td className="text-slate-300">₹6,50,00,000 / ea</td>
                    <td className="text-slate-300">₹6,50,00,000 / ea</td>
                    <td className="text-cyan-400 font-bold">GRN-4412 (Aluva)</td>
                    <td>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
                        0.0% Match
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={handleReleasePayment}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          clearedPayment
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-md'
                            : 'glow-btn-cyan shadow-lg'
                        }`}
                      >
                        {clearedPayment ? '✓ Payment Released' : 'Release ₹16.43 Cr Payment'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: TASK MANAGEMENT */}
      {activeWorkflowTab === 'tasks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setTaskViewMode('kanban')}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  taskViewMode === 'kanban' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-slate-400'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" /> Kanban Board
              </button>
              <button
                onClick={() => setTaskViewMode('table')}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  taskViewMode === 'table' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-slate-400'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" /> Table View
              </button>
            </div>

            <button
              onClick={() => setIsCreatingTask(!isCreatingTask)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glow-btn-cyan text-xs font-bold shadow-lg"
            >
              <Plus className="w-3.5 h-3.5" /> New Task
            </button>
          </div>

          {isCreatingTask && (
            <form onSubmit={handleCreateTaskSubmit} className="p-4 bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-xl space-y-3">
              <div className="text-xs font-bold text-slate-100">Create New Operational Task</div>
              <input
                type="text"
                placeholder="Enter Task Title (e.g., Kalamassery Station Transformer Audit)"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 text-slate-100 rounded-xl focus:outline-none focus:border-cyan-500/50"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsCreatingTask(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-1.5 text-xs glow-btn-cyan font-bold rounded-xl shadow-md">Save Task</button>
              </div>
            </form>
          )}

          {taskViewMode === 'kanban' ? (
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
                        <div className="text-[10px] text-slate-400">{t.dept}</div>
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
      )}

      {/* SUB-VIEW 4: AI WORKFLOW RECOMMENDATIONS & HUMAN REVIEW */}
      {activeWorkflowTab === 'recommendations' && (
        <div className="space-y-6">
          <div className="metro-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                AI Generated Workflow Recommendations
              </h3>
              <span className="text-xs font-mono bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30 font-bold">
                Human Confirmation Required
              </span>
            </div>

            <div className="space-y-3">
              {recommendations.map(rec => (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-cyan-400 font-bold">{rec.id} • {rec.docId}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      rec.priority === 'URGENT' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {rec.priority} PRIORITY
                    </span>
                  </div>

                  <div className="font-bold text-sm text-slate-100">{rec.suggestedAction}</div>
                  <div className="text-slate-400 text-[11px]">{rec.reason}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Target Dept: {rec.recommendedDepartment}</div>

                  {rec.status === 'APPROVED' ? (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Recommendation Approved & Executed into Active Task
                    </div>
                  ) : rec.status === 'REJECTED' ? (
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-center">
                      Recommendation Rejected by Operator
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => handleRejectRec(rec.id)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                      <button
                        onClick={() => handleApproveRec(rec.id)}
                        className="px-5 py-2 rounded-xl glow-btn-cyan text-xs font-bold shadow-lg flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve & Create Task
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
