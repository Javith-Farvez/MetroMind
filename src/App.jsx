import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import CommandPalette from './components/common/CommandPalette';

import LandingPageView from './views/LandingPageView';
import LoginPage from './views/LoginPage';
import DashboardView from './views/DashboardView';
import DocumentWorkspaceView from './views/DocumentWorkspaceView';
import DocumentViewerView from './views/DocumentViewerView';
import ApprovalsView from './views/ApprovalsView';
import DepartmentWorkspaceView from './views/DepartmentWorkspaceView';
import IntelligenceView from './views/IntelligenceView';
import WorkflowsView from './views/WorkflowsView';
import ComplianceView from './views/ComplianceView';
import KnowledgeBaseView from './views/KnowledgeBaseView';
import ReportsView from './views/ReportsView';
import AuditLogsView from './views/AuditLogsView';
import SettingsView from './views/SettingsView';

import { INITIAL_DOCUMENTS } from './data/mockDocuments';
import { UploadCloud, X, Loader2, RefreshCw } from 'lucide-react';
import { fetchLiveDocuments } from './services/api';
import { uploadDocument, fetchProcessingStatus } from './api/documents';
import { fetchDashboardSummary } from './api/analytics';

// React Error Boundary Class to prevent black screen crashes
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("MetroFlow Runtime Boundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-lg mx-auto my-12 rounded-2xl bg-slate-900 border border-purple-500/30 text-center space-y-4 shadow-2xl font-mono text-xs">
          <div className="text-pink-400 font-bold text-sm">⚠ MetroFlow View Render Note</div>
          <div className="text-slate-300 font-sans text-xs">
            {this.state.error?.message || "An unexpected view state occurred."}
          </div>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
            }}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold inline-flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> Reset View Workspace
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeRole, setActiveRole] = useState('gm');
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [selectedDoc, setSelectedDoc] = useState(INITIAL_DOCUMENTS[0]);
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  // Global Decision Counts for Real-Time Dashboard Updates
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  // Upload modal processing states
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('General');
  const [uploadDepartment, setUploadDepartment] = useState('Operations & Maintenance');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('Uploading');
  const [uploadError, setUploadError] = useState('');

  // Sync with FastAPI backend
  React.useEffect(() => {
    async function syncBackendData() {
      try {
        const [liveDocs, summary] = await Promise.allSettled([
          fetchLiveDocuments(),
          fetchDashboardSummary()
        ]);

        if (summary.status === 'fulfilled' && summary.value) {
          setDashboardSummary(summary.value);
        }

        if (liveDocs.status === 'fulfilled' && liveDocs.value && Array.isArray(liveDocs.value) && liveDocs.value.length > 0) {
          const formattedBackendDocs = liveDocs.value.map(d => ({
            ...d,
            fileSize: d.file_size || d.fileSize || '2.4 MB',
            pageCount: d.page_count || d.pageCount || 14,
            ocrText: d.ocr_text || d.ocrText || d.description || '',
            boundingBoxes: d.bounding_boxes || d.boundingBoxes || [],
            extractedEntities: d.extracted_entities || d.extractedEntities || {},
            suggestedActions: d.suggested_actions || d.suggestedActions || []
          }));

          const existingIds = new Set(formattedBackendDocs.map(d => d.id));
          const filteredInitial = INITIAL_DOCUMENTS.filter(d => !existingIds.has(d.id));
          const combined = [...formattedBackendDocs, ...filteredInitial];

          setDocuments(combined);
          setSelectedDoc(combined[0]);
          setIsLiveConnected(true);
        }
      } catch (err) {
        console.warn("Sync backend data note:", err);
      }
    }
    syncBackendData();
  }, []);

  const refetchDashboard = async () => {
    try {
      const [liveDocs, summary] = await Promise.allSettled([
        fetchLiveDocuments(),
        fetchDashboardSummary()
      ]);
      if (summary.status === 'fulfilled' && summary.value) setDashboardSummary(summary.value);
      if (liveDocs.status === 'fulfilled' && liveDocs.value && Array.isArray(liveDocs.value) && liveDocs.value.length > 0) {
        const formattedBackendDocs = liveDocs.value.map(d => ({
          ...d,
          fileSize: d.file_size || d.fileSize || '2.4 MB',
          pageCount: d.page_count || d.pageCount || 14,
          ocrText: d.ocr_text || d.ocrText || d.description || '',
          boundingBoxes: d.bounding_boxes || d.boundingBoxes || [],
          extractedEntities: d.extracted_entities || d.extractedEntities || {},
          suggestedActions: d.suggested_actions || d.suggestedActions || []
        }));

        const existingIds = new Set(formattedBackendDocs.map(d => d.id));
        const filteredInitial = INITIAL_DOCUMENTS.filter(d => !existingIds.has(d.id));
        const combined = [...formattedBackendDocs, ...filteredInitial];

        setDocuments(combined);
      }
    } catch (err) {
      console.warn('Refetch dashboard note:', err);
    }
  };

  const handleDecisionChangeGlobal = (action) => {
    if (action === 'ACCEPTED' || action === 'ACCEPT') {
      setAcceptedCount(prev => prev + 1);
    } else if (action === 'REJECTED' || action === 'REJECT') {
      setRejectedCount(prev => prev + 1);
    }
    refetchDashboard();
  };

  const handleRealUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const docTitle = uploadTitle.trim() || selectedFile.name.replace(/\.[^/.]+$/, "");
    setIsProcessing(true);
    setUploadError('');
    setProcessingStage("Uploading Document to Storage & PostgreSQL...");

    try {
      const apiResult = await uploadDocument(
        docTitle,
        uploadCategory,
        uploadDepartment,
        selectedFile
      );

      if (!apiResult || !apiResult.id) {
        throw new Error("Upload processing did not return a valid document record.");
      }

      const newDoc = {
        ...apiResult,
        fileSize: apiResult.file_size || '2.4 MB',
        pageCount: apiResult.page_count || 14,
        ocrText: apiResult.ocr_text || apiResult.description || '',
        boundingBoxes: apiResult.bounding_boxes || [],
        extractedEntities: apiResult.extracted_entities || {},
        suggestedActions: apiResult.suggested_actions || []
      };

      setDocuments([newDoc, ...documents]);
      setSelectedDoc(newDoc);
      setIsProcessing(false);
      setIsUploadModalOpen(false);
      setSelectedFile(null);
      setUploadTitle('');
      setActiveTab('viewer');
      refetchDashboard();
    } catch (err) {
      console.error("Upload error:", err);
      setIsProcessing(false);
      setUploadError(err.message || "Failed to process document. Please try again.");
    }
  };

  // SaaS Entry Flow: 1. Landing Page -> 2. Dedicated Full-screen Login Page -> 3. Main Command Portal
  if (activeTab === 'landing') {
    return (
      <LandingPageView
        onLaunchWorkspace={() => {
          if (isAuthenticated) {
            setActiveTab('dashboard');
          } else {
            setActiveTab('login');
          }
        }}
      />
    );
  }

  if (activeTab === 'login') {
    return (
      <LoginPage
        onLoginSuccess={(role) => {
          setActiveRole(role);
          setIsAuthenticated(true);
          setActiveTab('dashboard');
        }}
        onReturnLanding={() => setActiveTab('landing')}
      />
    );
  }

  // Combined Dashboard Summary with Global Decision Counters
  const mergedSummary = {
    ...(dashboardSummary || {}),
    accepted_recommendations: (dashboardSummary?.accepted_recommendations || 0) + acceptedCount,
    rejected_recommendations: (dashboardSummary?.rejected_recommendations || 0) + rejectedCount,
    pending_review: Math.max(0, (dashboardSummary?.pending_review || 5) - (acceptedCount + rejectedCount))
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 bg-grid-cyber relative overflow-hidden animate-fade-in">
      {/* Background Animated Color Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-purple-500/15 rounded-full blur-[150px] animate-float-orb" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/15 rounded-full blur-[170px] animate-float-orb" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[40%] right-[25%] w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[130px] animate-pulse" />
      </div>

      {/* Header Navbar */}
      <Header
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeTab={activeTab}
        onNavigateTab={setActiveTab}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onLogout={() => {
          setIsAuthenticated(false);
          setActiveTab('landing');
        }}
      />

      {/* Main Layout Split */}
      <div className="flex-1 flex overflow-hidden z-10">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Workspace wrapped in ErrorBoundary */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <ErrorBoundary onReset={() => setActiveTab('dashboard')}>
            {activeTab === 'dashboard' && (
              <DashboardView
                documents={documents}
                dashboardSummary={mergedSummary}
                onNavigateTab={setActiveTab}
                onSelectDocument={doc => {
                  setSelectedDoc(doc);
                  setActiveTab('viewer');
                }}
              />
            )}

            {(activeTab === 'document-workspace' || activeTab === 'documents') && (
              <DocumentWorkspaceView
                documents={documents}
                onSelectDocument={doc => {
                  setSelectedDoc(doc);
                  setActiveTab('viewer');
                }}
                onNavigateTab={setActiveTab}
                onOpenUploadModal={() => setIsUploadModalOpen(true)}
              />
            )}

            {(activeTab === 'ai-intelligence' || activeTab === 'rag' || activeTab === 'intelligence') && (
              <IntelligenceView
                documents={documents}
                onSelectDocument={doc => {
                  setSelectedDoc(doc);
                  setActiveTab('viewer');
                }}
                onNavigateTab={setActiveTab}
              />
            )}

            {(activeTab === 'actions-approvals' || activeTab === 'workflows') && (
              <ApprovalsView
                documents={documents}
                onSelectDocument={doc => {
                  setSelectedDoc(doc);
                  setActiveTab('viewer');
                }}
                onNavigateTab={setActiveTab}
                onDecisionChange={handleDecisionChangeGlobal}
              />
            )}

            {(activeTab === 'analysis' || activeTab === 'reports') && (
              <ReportsView documents={documents} dashboardSummary={mergedSummary} />
            )}

            {(activeTab === 'audit-logs' || activeTab === 'audit') && (
              <AuditLogsView />
            )}

            {activeTab === 'settings' && (
              <SettingsView />
            )}

            {activeTab === 'viewer' && (
              <DocumentViewerView
                selectedDoc={selectedDoc}
                onDecisionComplete={handleDecisionChangeGlobal}
              />
            )}
          </ErrorBoundary>
        </main>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={documents}
        onSelectDocument={doc => {
          setSelectedDoc(doc);
          setActiveTab('viewer');
        }}
      />

      {/* Real Ingest Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-mono">
          <div className="relative w-full max-w-lg rounded-2xl p-6 bg-slate-900 border border-purple-500/30 shadow-2xl shadow-purple-950/40 space-y-5">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-purple-400" />
                <span className="font-extrabold text-slate-100 text-sm uppercase">Ingest Document into PostgreSQL</span>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-950 border border-purple-500/30 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRealUpload} className="space-y-4 text-xs font-sans">
              {uploadError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px]">
                  ⚠ {uploadError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-purple-300 font-mono font-bold text-[11px]">DOCUMENT TITLE:</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                  placeholder="e.g. Muttom Depot Track Audit 2026"
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-purple-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-purple-300 font-mono font-bold text-[11px]">DEPARTMENT:</label>
                  <select
                    value={uploadDepartment}
                    onChange={e => setUploadDepartment(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-purple-500/30 text-purple-200 focus:outline-none font-mono"
                  >
                    <option value="Operations & Maintenance">Operations & Maintenance</option>
                    <option value="Safety & Quality Assurance">Safety & Quality Assurance</option>
                    <option value="Finance & Procurement">Finance & Procurement</option>
                    <option value="Engineering & Infrastructure">Engineering & Infrastructure</option>
                    <option value="Executive Directorate">Executive Directorate</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-purple-300 font-mono font-bold text-[11px]">CATEGORY:</label>
                  <select
                    value={uploadCategory}
                    onChange={e => setUploadCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-purple-500/30 text-purple-200 focus:outline-none font-mono"
                  >
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="SAFETY">Safety</option>
                    <option value="FINANCIAL">Financial</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="CIRCULAR">Circular</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-purple-300 font-mono font-bold text-[11px]">SELECT FILE (PDF / IMAGE / TEXT):</label>
                <input
                  type="file"
                  onChange={e => setSelectedFile(e.target.files[0])}
                  accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-purple-500/30 text-slate-300 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-purple-500/20 file:text-purple-300 cursor-pointer"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-purple-500/30 text-slate-400 font-bold hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isProcessing || !selectedFile}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{processingStage}</span>
                    </>
                  ) : (
                    <span>INGEST & EXTRACT OCR</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
