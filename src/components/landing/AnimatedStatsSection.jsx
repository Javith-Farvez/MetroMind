import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, Zap, Award } from 'lucide-react';

const STATS = [
  {
    icon: FileText,
    label: 'Documents Digitized',
    value: '5,000+',
    subtitle: 'Malayalam & English scans indexed',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-500/30',
    ringColor: '#06b6d4',
    progress: 95
  },
  {
    icon: Cpu,
    label: 'Multilingual Accuracy',
    value: '99.4%',
    subtitle: 'Zero discrepancy OCR parsing',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-500/30',
    ringColor: '#10b981',
    progress: 99.4
  },
  {
    icon: Zap,
    label: 'Department SLA Reduction',
    value: '85%',
    subtitle: 'From days to sub-minute routing',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-500/30',
    ringColor: '#8b5cf6',
    progress: 85
  },
  {
    icon: Award,
    label: 'Ingestion Latency',
    value: '<0.4s',
    subtitle: 'Real-time AI pipeline response',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-500/30',
    ringColor: '#f59e0b',
    progress: 98
  }
];

export default function AnimatedStatsSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            const circumference = 2 * Math.PI * 28;
            const strokeDashoffset = circumference - (stat.progress / 100) * circumference;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                data-cursor="Metrics"
                className={`glass-panel-dark p-6 rounded-3xl border ${stat.borderColor} relative overflow-hidden group transition-all duration-300 shadow-xl`}
              >
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all" />

                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 group-hover:border-cyan-500/50 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>

                  {/* Circular SVG Ring */}
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke={stat.ringColor}
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.15 + 0.3 }}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-slate-300">
                      {stat.progress}%
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className={`text-4xl font-extrabold font-mono tracking-tight bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-100">{stat.label}</div>
                  <div className="text-xs text-slate-400 font-normal leading-relaxed">{stat.subtitle}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
