export const INITIAL_DOCUMENTS = [
  {
    id: "KMRL-ENG-2026-8812",
    title: "Muttom Depot Rolling Stock Brake Inspection & Wheel Lathe Audit",
    category: "Maintenance & Engineering",
    department: "Operations & Maintenance",
    type: "PDF / Technical Report",
    source: "Muttom Depot Workshop",
    language: "English",
    confidence: 99.4,
    status: "Routed & Recommending Action",
    urgency: "High",
    timestamp: "2026-08-07 09:14 AM",
    fileSize: "4.2 MB",
    pageCount: 14,
    ocrText: `KOCHI METRO RAIL LIMITED (KMRL)
DEPARTMENT OF ROLLING STOCK & MAINTENANCE
Muttom Depot, Choornikkara, Aluva, Kerala - 683106

INSPECTION REPORT: TRAINSET #07 (METRO RAKE KM-07)
Date of Audit: 06-Aug-2026
Inspecting Authority: Chief Mechanical Engineer (Rolling Stock)

1. EXECUTIVE SUMMARY:
Routine quarterly ultrasonic axle testing (UAT) and disc brake thickness measurement completed for Rake #07. Front bogie friction pads show accelerated wear (3.2mm remaining vs 6.0mm safety threshold).

2. KEY FINDINGS & ANOMALIES:
- Axle #2 (Driving Motor Car A): Minor vibration harmonics detected at 75 km/h simulated test bench.
- Friction Brake Pads: Pad replacement mandatory prior to next 500-km revenue operational cycle.
- Secondary Air Suspension Pressure: 4.8 bar (Normal range: 4.5 - 5.0 bar).

3. ACTION REQUIRED:
- Issue Purchase Requisition for 16 Units Heavy Duty Friction Pads (OEM: Alstom Transport).
- Schedule Rake #07 for Bay-3 maintenance window on 08-Aug-2026, 01:00 hrs.`,
    boundingBoxes: [
      { id: "b1", text: "KOCHI METRO RAIL LIMITED", box: [5, 10, 90, 8], label: "HEADER" },
      { id: "b2", text: "Muttom Depot, Choornikkara", box: [5, 20, 80, 6], label: "LOCATION" },
      { id: "b3", text: "METRO RAKE KM-07", box: [15, 30, 45, 6], label: "ASSET_ID" },
      { id: "b4", text: "Pad replacement mandatory", box: [10, 65, 80, 8], label: "CRITICAL_ACTION" },
      { id: "b5", text: "OEM: Alstom Transport", box: [10, 82, 60, 6], label: "VENDOR" }
    ],
    extractedEntities: {
      "Asset ID": "Rake KM-07 (Trainset #07)",
      "Depot Location": "Muttom Depot, Bay-3",
      "Vendor / OEM": "Alstom Transport India",
      "Critical Defect": "Friction Pad Wear (3.2mm)",
      "Recommended Action": "Schedule Bay-3 Pad Replacement & Order OEM Kit",
      "Target Date": "08-Aug-2026 01:00 AM",
      "Sensitivity Level": "Operational Internal"
    },
    suggestedActions: [
      { id: "a1", action: "Create Work Order #WO-8812 in Muttom Maintenance Portal", targetDept: "Maintenance", autoExecute: true },
      { id: "a2", action: "Dispatch PO Requisition to Alstom Procurement Stream", targetDept: "Procurement & Finance", autoExecute: false },
      { id: "a3", action: "Flag Trainset KM-07 as Restricted in Operational Duty Roster", targetDept: "Operations", autoExecute: true }
    ]
  },
  {
    id: "KMRL-FIN-2026-3042",
    title: "Invoice #BHEL/KMRL/2026/094 — 33kV Traction Substation Transformers",
    category: "Financial Invoices",
    department: "Finance & Procurement",
    type: "Scanned PDF / Financial",
    source: "BHEL Power Sector Southern Region",
    language: "English",
    confidence: 98.7,
    status: "Auto-Matched (99.1%)",
    urgency: "Medium",
    timestamp: "2026-08-07 10:45 AM",
    fileSize: "1.8 MB",
    pageCount: 3,
    ocrText: `BHARAT HEAVY ELECTRICALS LIMITED (BHEL)
TAX INVOICE / BILL OF SUPPLY
Invoice No: BHEL/KMRL/2026/094
Date: 04-August-2026

Billed To: Kochi Metro Rail Limited, JLN Stadium Station Complex, Kochi
Purchase Order Ref: PO-KMRL-2025-7721 dated 15-Nov-2025

DESCRIPTION OF GOODS:
1. 33kV Dry-Type Traction Transformer (Cast Resin) - Qty 2 Nos - Rate: ₹65,000,000/ea
2. SCADA Telemetry Interface Units (IEC 61850) - Qty 4 Nos - Rate: ₹4,625,000/ea

Subtotal: ₹139,250,000
CGST (9%): ₹12,532,500
SGST (9%): ₹12,532,500
TOTAL INVOICE AMOUNT: ₹164,315,000

Bank Details: State Bank of India, Commercial Branch, CAG ID: SBI0049921
Match Status against PO-7721: Goods Received Note (GRN-4412) Verified at Aluva Traction Substation.`,
    boundingBoxes: [
      { id: "b1", text: "BHARAT HEAVY ELECTRICALS LIMITED", box: [5, 8, 90, 8], label: "VENDOR" },
      { id: "b2", text: "Invoice No: BHEL/KMRL/2026/094", box: [5, 18, 55, 6], label: "INVOICE_NO" },
      { id: "b3", text: "PO-KMRL-2025-7721", box: [5, 26, 50, 6], label: "PO_REFERENCE" },
      { id: "b4", text: "TOTAL INVOICE AMOUNT: ₹164,315,000", box: [10, 75, 80, 8], label: "TOTAL_AMOUNT" },
      { id: "b5", text: "GRN-4412 Verified", box: [10, 88, 70, 6], label: "MATCH_VERIFICATION" }
    ],
    extractedEntities: {
      "Vendor Name": "Bharat Heavy Electricals Ltd (BHEL)",
      "GSTIN": "32AAACB0000A1Z5",
      "Invoice Amount": "₹16,43,15,000",
      "Matched PO": "PO-KMRL-2025-7721",
      "Verification GRN": "GRN-4412 (Aluva Substation)",
      "Discrepancy Status": "Zero Discrepancy (100% Match)",
      "Payment Term": "Net 30 Days (Due 03-Sep-2026)"
    },
    suggestedActions: [
      { id: "a1", action: "Approve Payment Release for ₹16.43 Cr to BHEL SBI Account", targetDept: "Finance", autoExecute: false },
      { id: "a2", action: "Update Asset Ledger with 2x 33kV Transformers", targetDept: "Asset Management", autoExecute: true }
    ]
  },
  {
    id: "KMRL-SAF-2026-019",
    title: "Monsoon Safety Operations & Emergency Speed Limit Circular",
    category: "Safety & Security",
    department: "Safety & Operations",
    type: "Multilingual Circular",
    source: "KMRL Safety Directorate",
    language: "Multilingual (English & Malayalam)",
    confidence: 99.8,
    status: "Broadcasted & Compliant",
    urgency: "Urgent",
    timestamp: "2026-08-07 07:30 AM",
    fileSize: "2.1 MB",
    pageCount: 2,
    ocrText: `KOCHI METRO RAIL LIMITED
SAFETY CIRCULAR NO: 19/2026
Subject: Severe Rainfall Speed Protocol for Viaduct Section (Aluva to Petta)

മഴക്കാല സുരക്ഷാ നിർദ്ദേശങ്ങൾ:
1. കനത്ത മഴയുള്ളപ്പോൾ വയഡക്റ്റിലൂടെയുള്ള ട്രെയിൻ വേഗത 50 km/h ആയി പരിമിതപ്പെടുത്തണം.
2. എടപ്പള്ളി, മഹാരാജാസ് സ്റ്റേഷനുകളിൽ വാട്ടർ സെൻസറുകൾ തുടർച്ചയായി നിരീക്ഷിക്കുക.

ENGLISH DIRECTIVE:
1. Speed restrictions: Maximum 50 km/h during rain intensity exceeding 35 mm/hr.
2. Station Controllers must verify Track Drainage Clearance every 2 hours.
3. Wind velocity sensors active on Periyar Bridge section. If speed exceeds 65 km/h, hold trains at Kalamassery.`,
    boundingBoxes: [
      { id: "b1", text: "SAFETY CIRCULAR NO: 19/2026", box: [5, 10, 85, 8], label: "CIRCULAR_ID" },
      { id: "b2", text: "ട്രെയിൻ വേഗത 50 km/h ആയി പരിമിതപ്പെടുത്തണം", box: [5, 30, 90, 10], label: "MALAYALAM_RULE" },
      { id: "b3", text: "Maximum 50 km/h during rain intensity", box: [5, 55, 85, 8], label: "SPEED_LIMIT" },
      { id: "b4", text: "Periyar Bridge section hold trains at Kalamassery", box: [5, 78, 88, 8], label: "EMERGENCY_TRIGGER" }
    ],
    extractedEntities: {
      "Directive Type": "Monsoon Safety Restriction",
      "Speed Threshold": "50 km/h (Rain > 35mm/hr)",
      "Wind Threshold": "Hold at Kalamassery if > 65 km/h",
      "Critical Stations": "Edapally, Maharajas, Kalamassery, Periyar Bridge",
      "Multilingual OCR": "Verified (100% Malayalam Accuracy)",
      "Target Operational Roles": "Station Controllers, Loco Pilots, OCC Officers"
    },
    suggestedActions: [
      { id: "a1", action: "Push Speed Limit Override (50km/h) to Automatic Train Control (ATC)", targetDept: "Operations", autoExecute: true },
      { id: "a2", action: "Broadcast Push Notification to all On-Duty Loco Pilots via KMRL Staff App", targetDept: "Safety", autoExecute: true }
    ]
  },
  {
    id: "KMRL-HR-2026-512",
    title: "KMRL Staff Welfare & Night Duty Allowance Revision Policy",
    category: "HR Policies",
    department: "Human Resources",
    type: "Policy Document",
    source: "Human Resources Directorate",
    language: "Malayalam & English",
    confidence: 97.9,
    status: "Indexed in HR Copilot",
    urgency: "Low",
    timestamp: "2026-08-06 04:15 PM",
    fileSize: "3.5 MB",
    pageCount: 8,
    ocrText: `KOCHI METRO RAIL LIMITED - HR POLICY 2026
കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് - നൈറ്റ് ഡ്യൂട്ടി അലവൻസ് പുതുക്കിയ മാർഗ്ഗനിർദ്ദേശങ്ങൾ

1. Night Shift Allowance revised to ₹450 per shift for shifts ending after 01:00 AM (applicable to Muttom Workshop & OCC engineers).
2. Medical Reimbursement limit extended up to ₹3,00,000 per family per annum.
3. ജീവനക്കാരുടെ കുടുംബാരോഗ്യ ഇൻഷുറൻസ് പദ്ധതിയിൽ അപ്പീൽ നൽകാനുള്ള കാലാവധി 30 ദിവസമായി നിജപ്പെടുത്തി.`,
    boundingBoxes: [
      { id: "b1", text: "HR POLICY 2026", box: [5, 8, 80, 8], label: "POLICY_HEAD" },
      { id: "b2", text: "Night Shift Allowance revised to ₹450", box: [5, 25, 85, 8], label: "ALLOWANCE_AMOUNT" },
      { id: "b3", text: "ജീവനക്കാരുടെ കുടുംബാരോഗ്യ ഇൻഷുറൻസ്", box: [5, 60, 90, 10], label: "MALAYALAM_CLAUSE" }
    ],
    extractedEntities: {
      "Policy Subject": "Night Duty Allowance & Family Insurance",
      "Allowance Rate": "₹450 / Shift (Post 01:00 AM)",
      "Medical Limit": "₹3,00,000 / Family / Year",
      "Claim Window": "30 Days from hospitalization",
      "Applicable Personnel": "Muttom Workshop, Station Controllers, OCC Technicians"
    },
    suggestedActions: [
      { id: "a1", action: "Update Automated Payroll Calculation Engine with ₹450 Night Rate", targetDept: "Finance & HR", autoExecute: true }
    ]
  },
  {
    id: "KMRL-WA-2026-771",
    title: "WhatsApp Field Dispatch: Overhead Equipment (OHE) Pantograph Sparking",
    category: "Field Incidents",
    department: "Electrical Engineering",
    type: "WhatsApp Scan / Field Photo",
    source: "WhatsApp Field Maintenance Group",
    language: "English & Malayalam Notes",
    confidence: 94.2,
    status: "Auto-Digitized & Escalated",
    urgency: "Urgent",
    timestamp: "2026-08-07 11:20 AM",
    fileSize: "920 KB",
    pageCount: 1,
    ocrText: `[WHATSAPP PHOTO DISPATCH - 07/08/2026 11:18 AM]
Sender: Technican S. Nair (Muttom Line 2)
Image Content: OHE Insulator Catenary Wire at Pillar #P-248 near Palarivattom Station.
Handwritten Note: Arcing observed during 11:10 AM passage of Rake #12. Carbon deposit visible on bracket insulator.
മരം കമ്പിയിൽ തട്ടിയതായി സംശയം (Tree branch clearance issue near P-248).`,
    boundingBoxes: [
      { id: "b1", text: "Pillar #P-248 near Palarivattom Station", box: [10, 20, 80, 10], label: "LOCATION_PILLAR" },
      { id: "b2", text: "Arcing observed during passage of Rake #12", box: [10, 45, 80, 10], label: "INCIDENT_TYPE" },
      { id: "b3", text: "മരം കമ്പിയിൽ തട്ടിയതായി സംശയം", box: [10, 70, 80, 10], label: "MALAYALAM_CAUSE" }
    ],
    extractedEntities: {
      "Incident Type": "OHE Arcing & Catenary Contact Sparking",
      "Location": "Pillar P-248 (Palarivattom Viaduct)",
      "Asset Involved": "Palarivattom Catenary Insulator & Rake #12",
      "Suspected Root Cause": "Encroaching tree branch at P-248",
      "Source Channel": "WhatsApp Field Dispatch Group"
    },
    suggestedActions: [
      { id: "a1", action: "Dispatch Rapid OHE Maintenance Van to Pillar P-248", targetDept: "Electrical Engineering", autoExecute: false },
      { id: "a2", action: "Notify Horticutural Clearing Team for Emergency Trimming", targetDept: "Civic Maintenance", autoExecute: true }
    ]
  }
];

export const DEPARTMENT_STATS = [
  { name: "Operations & Maintenance", count: 482, urgent: 3, accuracy: 99.4, color: "#06b6d4" },
  { name: "Finance & Procurement", count: 839, urgent: 1, accuracy: 99.8, color: "#10b981" },
  { name: "Safety & Security", count: 124, urgent: 5, accuracy: 99.9, color: "#ef4444" },
  { name: "Human Resources", count: 310, urgent: 0, accuracy: 98.1, color: "#8b5cf6" },
  { name: "Legal & Land Acquisition", count: 96, urgent: 2, accuracy: 98.9, color: "#f59e0b" },
  { name: "Executive Directorate", count: 64, urgent: 0, accuracy: 100.0, color: "#ec4899" }
];
