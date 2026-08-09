export const GRAPH_NODES = [
  // Stations & Infrastructure
  { id: "node-muttom", label: "Muttom Depot & Maintenance Yard", type: "station", category: "Infrastructure", x: 180, y: 140, details: "Central Maintenance Yard & OCC, Choornikkara" },
  { id: "node-aluva", label: "Aluva Terminal Station", type: "station", category: "Infrastructure", x: 120, y: 260, details: "Northern Terminal Station (Intermodal hub)" },
  { id: "node-edapally", label: "Edapally Station", type: "station", category: "Infrastructure", x: 320, y: 280, details: "Lulu Mall Junction & Water Sensor Node" },
  { id: "node-palarivattom", label: "Palarivattom Station & P-248", type: "station", category: "Infrastructure", x: 480, y: 220, details: "Pillar P-248 Catenary Junction" },
  { id: "node-maharajas", label: "Maharajas College Station", type: "station", category: "Infrastructure", x: 620, y: 310, details: "Kochi City Center Transit Junction" },
  { id: "node-petta", label: "Petta Terminal Station", type: "station", category: "Infrastructure", x: 780, y: 270, details: "Southern Rail Extension Hub" },

  // Assets & Trains
  { id: "node-rake07", label: "Rake #07 (Trainset KM-07)", type: "asset", category: "Rolling Stock", x: 260, y: 120, details: "3-Car Alstom Metropolis Rake (Brake pad maintenance pending)" },
  { id: "node-rake12", label: "Rake #12 (Trainset KM-12)", type: "asset", category: "Rolling Stock", x: 520, y: 130, details: "Alstom Metropolis Rake (Pantograph arcing incident)" },
  { id: "node-trans-33kv", label: "33kV Traction Transformer", type: "asset", category: "Power & OHE", x: 220, y: 380, details: "Substation Cast Resin Dry Transformer (BHEL PO-7721)" },

  // Vendors & External Entities
  { id: "node-alstom", label: "Alstom Transport India Ltd", type: "vendor", category: "OEM Contractor", x: 380, y: 60, details: "Rolling Stock & ATC Signaling Supplier" },
  { id: "node-bhel", label: "Bharat Heavy Electricals (BHEL)", type: "vendor", category: "OEM Contractor", x: 100, y: 440, details: "Traction Substation Power Systems Contractor" },

  // Documents & Regulations
  { id: "node-doc-8812", label: "Doc KMRL-ENG-8812 (Brake Audit)", type: "document", category: "Engineering Audit", x: 360, y: 160, details: "Muttom Depot Ultrasonic Brake Inspection Report" },
  { id: "node-doc-3042", label: "Invoice BHEL/KMRL/094", type: "document", category: "Invoice", x: 320, y: 450, details: "₹16.43 Cr Invoice for 33kV Transformers" },
  { id: "node-doc-saf19", label: "Safety Circular 19/2026", type: "document", category: "Safety Advisory", x: 600, y: 420, details: "Monsoon Speed Restrictions (Max 50 km/h)" },
  { id: "node-doc-wa771", label: "WhatsApp Dispatch #771", type: "document", category: "Field Scan", x: 640, y: 180, details: "Catenary Arcing photo report at Pillar P-248" }
];

export const GRAPH_EDGES = [
  { source: "node-muttom", target: "node-rake07", label: "Housing & Servicing" },
  { source: "node-alstom", target: "node-rake07", label: "OEM Manufacturer" },
  { source: "node-rake07", target: "node-doc-8812", label: "Subject of Audit" },
  { source: "node-muttom", target: "node-doc-8812", label: "Origin Location" },

  { source: "node-bhel", target: "node-trans-33kv", label: "Supplied & Installed" },
  { source: "node-bhel", target: "node-doc-3042", label: "Invoiced By" },
  { source: "node-trans-33kv", target: "node-doc-3042", label: "Billed Line Items" },
  { source: "node-aluva", target: "node-trans-33kv", label: "Substation Location" },

  { source: "node-edapally", target: "node-doc-saf19", label: "Monsoon Sensor Station" },
  { source: "node-maharajas", target: "node-doc-saf19", label: "Speed Enforcement Zone" },

  { source: "node-palarivattom", target: "node-doc-wa771", label: "Pillar P-248 Site" },
  { source: "node-rake12", target: "node-doc-wa771", label: "Involved Rake" },
  { source: "node-palarivattom", target: "node-rake12", label: "Location at Incident" }
];

export const SAMPLE_AI_QUERIES = [
  {
    query: "What maintenance actions are required for Muttom Depot trainsets?",
    queryMl: "മുട്ടം ഡിപ്പോയിലെ ട്രെയിനുകൾക്കായി ശുപാർശ ചെയ്ത അറ്റകുറ്റപ്പണികൾ ഏതെല്ലാം?",
    answer: "Based on Document **KMRL-ENG-2026-8812**, Rake #07 requires immediate front bogie friction pad replacement (3.2mm remaining vs 6.0mm threshold). Work Order #WO-8812 has been auto-generated for Bay-3 on 08-Aug-2026 at 01:00 AM.",
    citations: ["KMRL-ENG-2026-8812", "Muttom Maintenance Duty Roster"]
  },
  {
    query: "Has BHEL's 33kV transformer invoice been verified against purchase orders?",
    queryMl: "BHEL ട്രാക്ഷൻ ട്രാൻസ്‌ഫോർമർ ഇൻവോയ്സ് വാങ്ങൽ ഓർഡറുമായി ഒത്തുനോക്കിയോ?",
    answer: "Yes. Invoice **BHEL/KMRL/2026/094** for ₹16.43 Cr has been matched with **PO-KMRL-2025-7721** and GRN-4412 at Aluva Traction Substation with 99.1% automated match confidence and zero line-item discrepancies.",
    citations: ["BHEL/KMRL/2026/094", "PO-KMRL-2025-7721", "GRN-4412"]
  },
  {
    query: "What is the speed limit protocol during heavy rainfall in Kochi?",
    queryMl: "ശക്തമായ മഴയുള്ളപ്പോൾ കൊച്ചി മെട്രോയുടെ വേഗത പരിധി എത്രയാണ്?",
    answer: "Per **Safety Circular No. 19/2026** (English & Malayalam), train speeds must be restricted to a maximum of 50 km/h when rain intensity exceeds 35 mm/hr. Water sensors at Edapally and Maharajas are continuously monitored.",
    citations: ["KMRL-SAF-2026-019"]
  }
];
