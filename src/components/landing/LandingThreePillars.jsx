import React from 'react';
import { motion } from 'framer-motion';
import { FileText, GitMerge, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export default function LandingThreePillars({ onLaunchWorkspace }) {
  const PILLARS = [
    {
      id: "01",
      title: "DOCUMENT INTELLIGENCE",
      subtitle: "Understand every document.",
      description: "Upload once. MetroFlow instantly processes OCR, detects Malayalam/English script, extracts spatial entities, generates concise summaries, and flags urgent risks.",
      icon: FileText,
      color: "text-cyan-400",
      border: "hover:border-cyan-500/50",
      bg: "bg-cyan-500/10",
      tab: "documents"
    },
    {
      id: "02",
      title: "OPERATIONAL INTELLIGENCE",
      subtitle: "Turn information into action.",
      description: "Automatically routes extracted insights to responsible departments, clears 3-Way PO financial approvals, creates tasks, and tracks statutory due dates with human review gates.",
      icon: GitMerge,
      color: "text-purple-400",
      border: "hover:border-purple-500/50",
      bg: "bg-purple-500/10",
      tab: "workflows"
    },
    {
      id: "03",
      title: "ORGANIZATIONAL INTELLIGENCE",
      subtitle: "Preserve and connect what KMRL knows.",
      description: "Connects today's documents with KMRL's institutional memory. Explores visual Neo4j graph relationships across stations, incidents, departments, and historical precedents.",
      icon: BookOpen,
      color: "text-amber-400",
      border: "hover:border-amber-500/50",
      bg: "bg-amber-500/10",
      tab: "knowledge"
    }
  ];

  return (
    <section id="pillars" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono font-bold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>THE THREE CORE WORKSPACES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            ONE PLATFORM. <span className="gradient-text-purple">THREE CORE PILLARS.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Instead of 22 isolated features, MetroFlow unifies your entire KMRL workflow into three connected intelligence pillars.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  if (onLaunchWorkspace) onLaunchWorkspace(pillar.tab);
                }}
                className={`glass-panel-dark p-8 rounded-3xl border border-slate-800/90 ${pillar.border} transition-all space-y-6 shadow-2xl relative overflow-hidden group cursor-pointer flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${pillar.bg} border border-white/10 flex items-center justify-center ${pillar.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono font-extrabold text-base text-slate-500">{pillar.id}</span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xl text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-semibold text-cyan-400 mt-1 font-mono">{pillar.subtitle}</div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span>Enter {pillar.title}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
