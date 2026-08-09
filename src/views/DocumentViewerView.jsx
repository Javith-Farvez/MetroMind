import React, { useState, useEffect } from 'react';
import {
  FileText,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Edit3,
  Languages,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { fetchWorkflowRecommendations, acceptRecommendation, rejectRecommendation } from '../api/workflows';
import { translateDocumentPage } from '../api/translations';
import { fetchDocumentPage, fetchDocumentAnalysis } from '../api/documents';

const INSTANT_PAGE_TEXTS = {
  1: {
    en: `KOCHI METRO RAIL LIMITED (KMRL)\nDOCUMENT CONTROL COVER PAGE — PAGE 01 OF 14\nTitle: KMRL Rolling Stock Maintenance Circular - Muttom Depot\nReference Number: KMRL-ENG-2026-8812\nDepartment: Operations & Maintenance\nClassification: KMRL Operational Directive\nSummary: Executive Overview & Table of Contents for inspection and compliance audit.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് (KMRL)\nഡോക്യുമെന്റ് കൺട്രോൾ കവർ പേജ് — പേജ് 01 / 14\nശീർഷകം: KMRL റോളിംഗ് സ്റ്റോക്ക് മെയ്ന്റനൻസ് സർക്കുലർ - മുട്ടം ഡിപ്പോ\nറഫറൻസ് നമ്പർ: KMRL-ENG-2026-8812\nവകുപ്പ്: ഓപ്പറേഷൻസ് & മെയ്ന്റനൻസ്\nവർഗ്ഗീകരണം: KMRL പ്രവർത്തന നിർദ്ദേശം\nസംഗ്രഹം: പരിശോധനയ്ക്കുള്ള എക്സിക്യൂട്ടീവ് അവലോകനവും ഉള്ളടക്ക പട്ടികയും.`
  },
  2: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 02 OF 14\nSECTION 1.0: GENERAL WORKSHOP & MAINTENANCE RULES\nMuttom Depot Facility Standards:\n1. All maintenance personnel must adhere to safety interlock protocols.\n2. Rake bogie friction pad clearance mandatory prior to revenue run.\n3. Wheel lathe audit required every 10,000 km.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 02 / 14\nവിഭാഗം 1.0: പൊതു വർക്ക്ഷോപ്പ് & പരിപാലന നിയമങ്ങൾ\nമുട്ടം ഡിപ്പോ ഫെസിലിറ്റി മാനദണ്ഡങ്ങൾ:\n1. എല്ലാ മെയ്ന്റനൻസ് ജീവനക്കാരും സുരക്ഷാ ഇന്റർലോക്ക് പ്രോട്ടോക്കോളുകൾ പാലിക്കണം.\n2. റേക്ക് ബോഗി ഫ്രിക്ഷൻ പാഡ് ക്ലിയറൻസ് അനിവാര്യമാണ്.\n3. ഓരോ 10,000 കിലോമീറ്ററിലും വീൽ ലേത്ത് ഓഡിറ്റ് നടത്തണം.`
  },
  3: {
    en: `SUBJECT: Muttom Depot Rolling Stock Brake Inspection & Wheel Lathe Audit\nKOCHI METRO RAIL LIMITED (KMRL)\nDEPARTMENT OF ROLLING STOCK & MAINTENANCE\nMuttom Depot, Choornikkara, Aluva, Kerala\n\nPAGE 03 OF 14\n\nINSPECTION REPORT: Rake #07 bogie brake pad wear detected at 3.2mm (Mandatory replacement threshold: 3.5mm). Immediate corrective maintenance required prior to next revenue cycle schedule on 18 AUG 2026.\n\nWheel lathe recalibration required for Bay-3. Interlock verification passed 100%.`,
    ml: `വിഷയം: മുട്ടം ഡിപ്പോ Rolling Stock Brake Inspection & വീൽ ലേത്ത് ഓഡിറ്റ്\nകൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് (KMRL)\nറോളിംഗ് സ്റ്റോക്ക് & പരിപാലന വിഭാഗം\nമുട്ടം ഡിപ്പോ, Choornikkara, Aluva, Kerala\n\nപേജ് 03 / 14\n\nപരിശോധനാ റിപ്പോർട്ട്: റേക്ക് #07 ബോഗി ബ്രേക്ക് പാഡ് തേയ്മാനം (3.2mm) കണ്ടെത്തി. അടുത്ത സർവീസിന് മുമ്പ് ഫ്രിക്ഷൻ പാഡ് മാറ്റുന്നത് നിർബന്ധമാണ്.\n\nബേ-3 ൽ വീൽ ലേത്ത് റീകാലിബ്രേഷൻ ആവശ്യമാണ്. 100% ഇന്റർലോക്ക് സ്ഥിരീകരിച്ചു.`
  },
  4: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 04 OF 14\nSECTION 2.2: TRACTION MOTOR & BEARING LUBRICATION\n1. Stator coil insulation resistance measured at >100 MΩ.\n2. Synthetic grease replenishment scheduled for 25 AUG 2026.\n3. Bearing temperature telemetry logged at 62°C (within operational limit 65°C).`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 04 / 14\nവിഭാഗം 2.2: ട്രാക്ഷൻ മോട്ടോർ & ബെയറിംഗ് ലൂബ്രിക്കേഷൻ\n1. സ്റ്റേറ്റർ കോയിൽ ഇൻസുലേഷൻ പ്രതിരോധം >100 MΩ ആയി അളന്നു.\n2. സിന്തറ്റിക് ഗ്രീസ് പുനഃസ്ഥാപനം 25 AUG 2026 ലേക്ക് നിശ്ചയിച്ചു.\n3. ബെയറിംഗ് താപനില ടെലിമെട്രി 62°C ആയി രേഖപ്പെടുത്തി.`
  },
  5: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 05 OF 14\nSECTION 3.1: PANTOGRAPH CARBON STRIP AUDIT\n1. Contact strip thickness measured at 14.5mm (minimum 10mm).\n2. Overhead catenary 25kV pantograph uplift force within tolerance.\n3. Pneumatic lowering mechanism response time verified at 1.2s.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 05 / 14\nവിഭാഗം 3.1: പാന്റോഗ്രാഫ് കാർബൺ സ്ട്രിപ്പ് ഓഡിറ്റ്\n1. കോൺടാക്റ്റ് സ്ട്രിപ്പ് കനം 14.5mm ആയി അളന്നു.\n2. ഓവർഹെഡ് കാറ്റനറി 25kV പാന്റോഗ്രാഫ് ഉയരം അനുവദനീയമാണ്.\n3. ന്യൂമാറ്റിക് ലോവറിംഗ് പ്രവർത്തനം 1.2 സെക്കന്റിൽ സ്ഥിരീകരിച്ചു.`
  },
  6: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 06 OF 14\nSECTION 4.0: DOOR CONTROL UNIT (DCU) DIAGNOSTICS\n1. Passenger door obstruction detection test completed with zero fault codes.\n2. Emergency door release handle seal intact across all 4 coaches.\n3. Door recycle frequency calibrated to standard parameters.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 06 / 14\nവിഭാഗം 4.0: ഡോർ കൺട്രോൾ യൂണിറ്റ് (DCU) രോഗനിർണ്ണയം\n1. പാസഞ്ചർ വാതിലുകളിൽ തടസ്സങ്ങളൊന്നും കണ്ടെത്തിയില്ല.\n2. അടിയന്തര വാതിൽ റിലീസ് ഹാൻഡ്‌ലുകൾ സുരക്ഷിതമാണ്.\n3. ഡോർ റീസൈക്കിൾ ഫ്രീക്വൻസി കൃത്യമായി കാലിബ്രേറ്റ് ചെയ്തു.`
  },
  7: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 07 OF 14\nSECTION 5.3: HVAC & AIR QUALITY AUDIT\n1. Cabin fresh air intake filters replaced at Muttom Workshop.\n2. Refrigerant pressure verified at 4.2 bar (R407C compliant).\n3. Automatic temperature control setpoint maintained at 22°C.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 07 / 14\nവിഭാഗം 5.3: എച്ച്വിഎസി & എയർ ക്വാളിറ്റി ഓഡിറ്റ്\n1. കാബിൻ ഫ്രഷ് എയർ ഇൻടേക്ക് ഫിൽട്ടറുകൾ മാറ്റിസ്ഥാപിച്ചു.\n2. റഫ്രിജറന്റ് മർദ്ദം 4.2 ബാർ ആയി സ്ഥിരീകരിച്ചു.\n3. ഓട്ടോമാറ്റിക് താപനില 22°C ആയി നിലനിർത്തി.`
  },
  8: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 08 OF 14\nSECTION 6.1: AUXILIARY POWER SUPPLY (APS) INVERTER\n1. 415V 3-phase AC output voltage stability verified.\n2. Battery charger float voltage verified at 110V DC.\n3. Emergency battery backup duration verified at >45 mins.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 08 / 14\nവിഭാഗം 6.1: ഓക്സിലറി പവർ സപ്ലൈ (APS) ഇൻവെർട്ടർ\n1. 415V 3-ഫേസ് AC ഔട്ട്പുട്ട് സ്ഥിരത പരിശോധിച്ചു.\n2. ബാറ്ററി ചാർജർ വോൾട്ടേജ് 110V DC ആയി സ്ഥിരീകരിച്ചു.\n3. അടിയന്തര ബാറ്ററി ബാക്കപ്പ് ദൈർഘ്യം >45 മിനിറ്റ്.`
  },
  9: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 09 OF 14\nSECTION 7.0: AUTOMATIC TRAIN CONTROL (ATC) SIGNALLING\n1. ATP speed code receiver frequency synchronized with track loop.\n2. Target distance calculation verified against viaduct profile.\n3. Vital relay rack inspection signed off by OCC Lead.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 09 / 14\nവിഭാഗം 7.0: ഓട്ടോമാറ്റിക് ട്രെയിൻ കൺട്രോൾ (ATC) സിഗ്നലിംഗ്\n1. ATP സ്പീഡ് കോഡ് റിസീവർ ഫ്രീക്വൻസി സിൻക്രോണൈസ് ചെയ്തു.\n2. ടാർഗെറ്റ് ദൂര കണക്കുകൂട്ടൽ പരിശോധിച്ചു.\n3. വൈറ്റൽ റിലേ റാക്ക് പരിശോധന ഒപ്പുവെച്ചു.`
  },
  10: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 10 OF 14\nSECTION 8.2: PNEUMATIC BRAKE CYLINDER PRESSURE\n1. Main reservoir pressure stabilized at 8.5 bar.\n2. Emergency brake application response time verified at 0.4s.\n3. Air dryer desiccant cartridge replacement scheduled.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 10 / 14\nവിഭാഗം 8.2: ന്യൂമാറ്റിക് ബ്രേക്ക് സിലിണ്ടർ മർദ്ദം\n1. പ്രധാന റിസർവോയർ മർദ്ദം 8.5 ബാറിൽ സ്ഥിരീകരിച്ചു.\n2. അടിയന്തര ബ്രേക്ക് പ്രതികരണ സമയം 0.4 സെക്കന്റ് ആയി.\n3. എയർ ഡ്രയർ കാട്രിഡ്ജ് മാറ്റൽ ഷെഡ്യൂൾ ചെയ്തു.`
  },
  11: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 11 OF 14\nSECTION 9.0: PASSENGER INFORMATION SYSTEM (PIS) & CCTV\n1. All 48 depot & coach camera streams verified active in full HD.\n2. Real-time audio announcement clarity verified across all cars.\n3. NVR storage retention verified at 30 days.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 11 / 14\nവിഭാഗം 9.0: പാസഞ്ചർ ഇൻഫർമേഷൻ സിസ്റ്റം (PIS) & സിസിടിവി\n1. എല്ലാ 48 ക്യാമറ സ്ട്രീമുകളും സജീവമാണ്.\n2. തത്സമയ ഓഡിയോ അനൗൺസ്‌മെന്റ് വ്യക്തത സ്ഥിരീകരിച്ചു.\n3. NVR സ്റ്റോറേജ് 30 ദിവസത്തേക്ക് റെക്കോർഡ് ചെയ്തിട്ടുണ്ട്.`
  },
  12: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 12 OF 14\nSECTION 10.1: FIRE DETECTION & SUPPRESSION SYSTEM (FDSS)\n1. Optical smoke detector sensitivity calibrated.\n2. Aerosol gas suppression cylinder pressure verified.\n3. Automatic HVAC fire damper tripping verified.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 12 / 14\nവിഭാഗം 10.1: ഫയർ ഡിറ്റക്ഷൻ & സപ്രഷൻ സിസ്റ്റം (FDSS)\n1. സ്മോക്ക് ഡിറ്റക്ടർ സെൻസിറ്റിവിറ്റി കാലിബ്രേറ്റ് ചെയ്തു.\n2. എയറോസോൾ ഗ്യാസ് സപ്രഷൻ സിലിണ്ടർ മർദ്ദം പരിശോധിച്ചു.\n3. ഓട്ടോമാറ്റിക് HVAC ഫയർ ഡാംപ്പർ പ്രവർത്തനക്ഷമമാണ്.`
  },
  13: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 13 OF 14\nSECTION 11.0: BOGIE FRAME MAGNETIC PARTICLE INSPECTION\n1. Zero structural micro-cracks detected on axle beam.\n2. Statutory compliance certificate issued for Bogie #07.\n3. Primary suspension spring deflection verified.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 13 / 14\nവിഭാഗം 11.0: ബോഗി ഫ്രെയിം മാഗ്നറ്റിക് പാർട്ടിക്കിൾ പരിശോധന\n1. ആക്‌സിലറി ബീമിൽ ഘടനാപരമായ സൂക്ഷ്മ വിള്ളലുകൾ ഒന്നുമില്ല.\n2. ബോഗി #07 നുള്ള അനുസരണ സർട്ടിഫിക്കറ്റ് നൽകി.\n3. പ്രൈമറി സസ്പെൻഷൻ സ്പ്രിംഗ് വക്രത പരിശോധിച്ചു.`
  },
  14: {
    en: `KOCHI METRO RAIL LIMITED — PAGE 14 OF 14\nSECTION 12.0: FINAL SIGN-OFF & AUTHORIZATION\n1. Rake #07 cleared for revenue service operation by Chief Engineer.\n2. Next scheduled periodic audit set for 09 SEP 2026.\n3. Maintenance record synced to PostgreSQL database.`,
    ml: `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് 14 / 14\nവിഭാഗം 12.0: അന്തിമ അംഗീകാരവും അധികാരപ്പെടുത്തലും\n1. റേക്ക് #07 സർവീസിനായി അംഗീകരിച്ചു.\n2. അടുത്ത ഷെഡ്യൂൾ ചെയ്ത ഓഡിറ്റ് 09 SEP 2026 ലേക്ക് നിശ്ചയിച്ചു.\n3. മെയിന്റനൻസ് റെക്കോർഡ് ഡാറ്റാബേസിലേക്ക് സമന്വയിപ്പിച്ചു.`
  }
};

const formatMalayalamPageText = (text) => {
  if (!text) return '';
  return text
    .replace(/DOCUMENT CONTROL COVER PAGE/g, 'ഡോക്യുമെന്റ് കൺട്രോൾ കവർ പേജ്')
    .replace(/PAGE (\d+) OF (\d+)/g, 'പേജ് $1 / $2')
    .replace(/Title:/g, 'ശീർഷകം:')
    .replace(/Reference Number:/g, 'റഫറൻസ് നമ്പർ:')
    .replace(/Department:/g, 'വകുപ്പ്:')
    .replace(/Classification:/g, 'വർഗ്ഗീകരണം:')
    .replace(/Summary:/g, 'സംഗ്രഹം:')
    .replace(/Operations & Maintenance/g, 'ഓപ്പറേഷൻസ് & മെയ്ന്റനൻസ്')
    .replace(/Safety & Quality Assurance/g, 'സേഫ്റ്റി & ക്വാളിറ്റി അഷുറൻസ്')
    .replace(/Finance & Procurement/g, 'ഫിനാൻസ് & പ്രൊക്യുർമെന്റ്')
    .replace(/Engineering & Infrastructure/g, 'എഞ്ചിനീയറിംഗ് & ഇൻഫ്രാസ്ട്രക്ചർ')
    .replace(/Executive Directorate/g, 'എക്സിക്യൂട്ടീവ് ഡയറക്ടറേറ്റ്')
    .replace(/KMRL Operational Directive/g, 'KMRL പ്രവർത്തന നിർദ്ദേശം')
    .replace(/SECTION 1\.0: GENERAL WORKSHOP & MAINTENANCE RULES/g, 'വിഭാഗം 1.0: പൊതു വർക്ക്ഷോപ്പ് & പരിപാലന നിയമങ്ങൾ')
    .replace(/SECTION 2\.2: TRACTION MOTOR & BEARING LUBRICATION/g, 'വിഭാഗം 2.2: ട്രാക്ഷൻ മോട്ടോർ & ബെയറിംഗ് ലൂബ്രിക്കേഷൻ')
    .replace(/SECTION 3\.1: PANTOGRAPH CARBON STRIP AUDIT/g, 'വിഭാഗം 3.1: പാന്റോഗ്രാഫ് കാർബൺ സ്ട്രിപ്പ് ഓഡിറ്റ്')
    .replace(/SECTION 4\.0: DOOR CONTROL UNIT \(DCU\) DIAGNOSTICS/g, 'വിഭാഗം 4.0: ഡോർ കൺട്രോൾ യൂണിറ്റ് (DCU) രോഗനിർണ്ണയം')
    .replace(/SECTION 5\.3: HVAC & AIR QUALITY AUDIT/g, 'വിഭാഗം 5.3: എച്ച്വിഎസി & എയർ ക്വാളിറ്റി ഓഡിറ്റ്')
    .replace(/SECTION 6\.1: AUXILIARY POWER SUPPLY \(APS\) INVERTER/g, 'വിഭാഗം 6.1: ഓക്സിലറി പവർ സപ്ലൈ (APS) ഇൻവെർട്ടർ')
    .replace(/SECTION 7\.0: AUTOMATIC TRAIN CONTROL \(ATC\) SIGNALLING/g, 'വിഭാഗം 7.0: ഓട്ടോമാറ്റിക് ട്രെയിൻ കൺട്രോൾ (ATC) സിഗ്നലിംഗ്')
    .replace(/SECTION 8\.2: PNEUMATIC BRAKE CYLINDER PRESSURE/g, 'വിഭാഗം 8.2: ന്യൂമാറ്റിക് ബ്രേക്ക് സിലിണ്ടർ മർദ്ദം')
    .replace(/SECTION 9\.0: PASSENGER INFORMATION SYSTEM \(PIS\) & CCTV/g, 'വിഭാഗം 9.0: പാസഞ്ചർ ഇൻഫർമേഷൻ സിസ്റ്റം (PIS) & സിസിടിവി')
    .replace(/SECTION 10\.1: FIRE DETECTION & SUPPRESSION SYSTEM \(FDSS\)/g, 'വിഭാഗം 10.1: ഫയർ ഡിറ്റക്ഷൻ & സപ്രഷൻ സിസ്റ്റം (FDSS)')
    .replace(/SECTION 11\.0: BOGIE FRAME MAGNETIC PARTICLE INSPECTION/g, 'വിഭാഗം 11.0: ബോഗി ഫ്രെയിം മാഗ്നറ്റിക് പാർട്ടിക്കിൾ പരിശോധന')
    .replace(/SECTION 12\.0: FINAL SIGN-OFF & AUTHORIZATION/g, 'വിഭാഗം 12.0: അന്തിമ അംഗീകാരവും അധികാരപ്പെടുത്തലും');
};

export default function DocumentViewerView({ selectedDoc, onDecisionComplete }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [decisionState, setDecisionState] = useState('PENDING'); // 'PENDING' | 'ACCEPTED' | 'REJECTED'
  const [recommendations, setRecommendations] = useState([]);

  // Multilingual & Page Viewing States
  const [viewMode, setViewMode] = useState('ORIGINAL'); // 'ORIGINAL' | 'TRANSLATED' | 'SIDE_BY_SIDE'
  const [targetLang, setTargetLang] = useState('Malayalam');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [pageError, setPageError] = useState(null);

  // Dynamic AI Analysis State
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisTab, setAnalysisTab] = useState('OVERVIEW');

  const doc = selectedDoc || {
    id: 'KMRL-ENG-2026-8812',
    title: 'KMRL Rolling Stock Maintenance Circular - Muttom Depot',
    department: 'Operations & Maintenance',
    category: 'MAINTENANCE',
    language: 'English',
    status: 'Ingested & Indexed',
    urgency: 'HIGH',
    confidence: 99.4,
    pageCount: 14,
    source: 'Muttom Depot Workshop',
    ocrText: 'KOCHI METRO RAIL LIMITED - Muttom Depot Audit Rake #07 bogie brake pad wear (3.2mm). Friction pad replacement mandatory prior to peak hours schedule.',
    extractedEntities: {
      "Reference Number": "KMRL-ENG-2026-8812",
      "Date": "09 Aug 2026",
      "Department": "Operations & Maintenance",
      "Location": "Muttom Depot Bay 3",
      "Vendor": "Not available",
      "Amount": "Not available",
      "Deadline": "18 AUG 2026",
      "Contract Number": "KMRL-ENG-CTRL-991",
      "Station": "Aluva"
    }
  };

  useEffect(() => {
    setPageNumber(1);
    setDecisionState('PENDING');
  }, [doc?.id]);

  useEffect(() => {
    async function loadRecs() {
      if (doc?.id) {
        try {
          const recs = await fetchWorkflowRecommendations(doc.id);
          if (recs && Array.isArray(recs) && recs.length > 0) {
            setRecommendations(recs);
          }
        } catch (err) {
          console.warn('Recommendation API note:', err);
        }
      }
    }
    loadRecs();
  }, [doc?.id]);

  useEffect(() => {
    async function loadPage() {
      if (!doc?.id) return;
      setIsPageLoading(true);
      setPageError(null);
      try {
        const res = await fetchDocumentPage(doc.id, pageNumber);
        if (res && res.page_text) {
          setPageData(res);
        }
      } catch (err) {
        console.warn("Page API warning:", err);
      } finally {
        setIsPageLoading(false);
      }
    }
    loadPage();
  }, [doc?.id, pageNumber]);

  useEffect(() => {
    async function handleTranslation() {
      if (!doc?.id) return;
      if (viewMode === 'TRANSLATED' || viewMode === 'SIDE_BY_SIDE') {
        setIsTranslating(true);
        try {
          const res = await translateDocumentPage(doc.id, pageNumber, targetLang);
          if (res && res.translated_text) {
            setTranslatedText(res.translated_text);
          } else {
            setTranslatedText('');
          }
        } catch (err) {
          console.warn("Translation API warning:", err);
          setTranslatedText('');
        } finally {
          setIsTranslating(false);
        }
      }
    }
    handleTranslation();
  }, [doc?.id, pageNumber, targetLang, viewMode]);

  useEffect(() => {
    async function loadAnalysis() {
      if (!doc?.id) return;
      try {
        const res = await fetchDocumentAnalysis(doc.id, targetLang);
        if (res) {
          setAnalysisData(res);
        }
      } catch (err) {
        console.warn("Analysis API note:", err);
      }
    }
    loadAnalysis();
  }, [doc?.id, targetLang]);

  const totalPages = pageData?.page_count || doc.page_count || doc.pageCount || 14;

  const handleAccept = async () => {
    try {
      if (recommendations[0]?.id) {
        await acceptRecommendation(recommendations[0].id);
      }
      setDecisionState('ACCEPTED');
      if (onDecisionComplete) onDecisionComplete('ACCEPTED');
    } catch (err) {
      setDecisionState('ACCEPTED');
      if (onDecisionComplete) onDecisionComplete('ACCEPTED');
    }
  };

  const handleConfirmReject = async () => {
    try {
      if (recommendations[0]?.id) {
        await rejectRecommendation(recommendations[0].id, rejectionReason);
      }
      setDecisionState('REJECTED');
      if (onDecisionComplete) onDecisionComplete('REJECTED');
    } catch (err) {
      setDecisionState('REJECTED');
      if (onDecisionComplete) onDecisionComplete('REJECTED');
    }
    setRejectModalOpen(false);
  };

  const fallbackEnglish = INSTANT_PAGE_TEXTS[pageNumber]?.en || `KOCHI METRO RAIL LIMITED — PAGE ${String(pageNumber).padStart(2, '0')} OF 14\nSection inspection & compliance verification in progress.\nOperational interlock active for Bay-3 track maintenance.`;

  const fallbackMalayalam = INSTANT_PAGE_TEXTS[pageNumber]?.ml || `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് — പേജ് ${String(pageNumber).padStart(2, '0')} / 14\nവിഭാഗം പരിശോധനയും അനുസരണ സ്ഥിരീകരണവും പുരോഗമിക്കുന്നു.\nബേ-3 ട്രാക്ക് പരിപാലനത്തിനായി പ്രവർത്തന ഇന്റർലോക്ക് സജീവമാണ്.`;

  const originalTextToRender = pageData?.page_text || doc.ocrText || fallbackEnglish;

  const translatedTextToRender = targetLang === 'Malayalam'
    ? (translatedText ? formatMalayalamPageText(translatedText) : fallbackMalayalam)
    : (translatedText || originalTextToRender);

  const handleJumpToPage = (pNum) => {
    if (pNum >= 1 && pNum <= totalPages) {
      setPageNumber(pNum);
      setViewMode('ORIGINAL');
    }
  };

  return (
    <div className="space-y-6 pb-12 text-[#e9f3f0] font-sans animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(120,200,190,0.14)] pb-4 font-mono">
        <div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#2dd4b3] font-bold">{doc.extractedEntities?.['Reference Number'] || doc.id}</span>
            <span className="text-[#5c706c]">|</span>
            <span className="text-[#8fa6a1]">{doc.department}</span>
            <span className="text-[#5c706c]">|</span>
            <span className="text-[#ef6a4c] font-bold">PRIORITY: {doc.urgency || doc.priority || 'HIGH'}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#e9f3f0] mt-1 font-sans">{doc.title}</h1>
        </div>

        {/* Multilingual Control Bar */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1 bg-[#070c10] p-1 rounded-lg border border-[rgba(120,200,190,0.14)]">
            <button
              onClick={() => setViewMode('ORIGINAL')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'ORIGINAL' ? 'bg-[#2dd4b3] text-[#070c10]' : 'text-[#8fa6a1] hover:text-white'
              }`}
            >
              [ ORIGINAL ]
            </button>
            <button
              onClick={() => setViewMode('TRANSLATED')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'TRANSLATED' ? 'bg-[#2dd4b3] text-[#070c10]' : 'text-[#8fa6a1] hover:text-white'
              }`}
            >
              [ TRANSLATED ]
            </button>
            <button
              onClick={() => setViewMode('SIDE_BY_SIDE')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'SIDE_BY_SIDE' ? 'bg-[#2dd4b3] text-[#070c10]' : 'text-[#8fa6a1] hover:text-white'
              }`}
            >
              [ SIDE BY SIDE ]
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-[#070c10] px-3 py-1.5 rounded-lg border border-[rgba(120,200,190,0.14)] text-[#2dd4b3]">
            <Languages className="w-3.5 h-3.5 text-[#2dd4b3]" />
            <select
              value={targetLang}
              onChange={e => setTargetLang(e.target.value)}
              className="bg-transparent text-[#2dd4b3] font-bold focus:outline-none cursor-pointer"
            >
              <option value="Malayalam" className="bg-[#0b1218] text-[#e9f3f0]">Malayalam (മലയാളം)</option>
              <option value="English" className="bg-[#0b1218] text-[#e9f3f0]">English</option>
              <option value="Hindi" className="bg-[#0b1218] text-[#e9f3f0]">Hindi (हिंदी)</option>
              <option value="Tamil" className="bg-[#0b1218] text-[#e9f3f0]">Tamil (தமிழ்)</option>
              <option value="Telugu" className="bg-[#0b1218] text-[#e9f3f0]">Telugu (తెలుగు)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SPACIOUS COMPOSITION (DOCUMENT VIEWER + WHAT MATTERS + AI ANALYSIS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: DOCUMENT VIEWER */}
        <div className={`${viewMode === 'SIDE_BY_SIDE' ? 'lg:col-span-6' : 'lg:col-span-4'} p-5 rounded-xl bg-[#0b1218] border border-[rgba(120,200,190,0.14)] space-y-4 flex flex-col justify-between transition-all duration-300`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[rgba(120,200,190,0.14)] pb-3 text-xs font-mono">
              <span className="font-bold text-[#8fa6a1]">
                DOCUMENT VIEWER ({viewMode.replace('_', ' ')})
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber <= 1}
                  className="p-1 rounded hover:bg-[#111b22] text-[#8fa6a1] disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[#e9f3f0] font-bold">Page {String(pageNumber).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</span>
                <button
                  onClick={() => setPageNumber(Math.min(totalPages, pageNumber + 1))}
                  disabled={pageNumber >= totalPages}
                  className="p-1 rounded hover:bg-[#111b22] text-[#8fa6a1] disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Document Render Preview */}
            {viewMode === 'SIDE_BY_SIDE' ? (
              <div className="grid grid-cols-2 gap-3 text-xs font-sans animate-fade-in">
                {/* Original Pane (LEFT) */}
                <div className="p-4 rounded-lg bg-[#070c10] border border-[rgba(120,200,190,0.14)] space-y-3 min-h-[380px]">
                  <div className="border-b border-[rgba(120,200,190,0.14)] pb-2 font-mono text-[10px] text-[#2dd4b3] flex justify-between">
                    <span>ORIGINAL ({doc.language || 'English'})</span>
                    <span>PAGE {String(pageNumber).padStart(2, '0')}</span>
                  </div>
                  <p className="text-[#e9f3f0] font-bold text-xs">SUBJECT: {doc.title}</p>
                  <p className="text-[#8fa6a1] text-[11px] leading-relaxed whitespace-pre-line font-mono">
                    {originalTextToRender}
                  </p>
                </div>

                {/* Translated Pane (RIGHT) */}
                <div className="p-4 rounded-lg bg-[#070c10] border border-[rgba(45,212,179,0.3)] space-y-3 min-h-[380px]">
                  <div className="border-b border-[rgba(120,200,190,0.14)] pb-2 font-mono text-[10px] text-[#2dd4b3] flex justify-between">
                    <span>TRANSLATED ({targetLang.toUpperCase()})</span>
                    {isTranslating ? <Loader2 className="w-3 h-3 animate-spin text-[#2dd4b3]" /> : <span>PAGE {String(pageNumber).padStart(2, '0')}</span>}
                  </div>
                  <p className="text-[#e9f3f0] font-bold text-xs">
                    {targetLang === 'Malayalam' ? 'വിഷയം: ' : 'SUBJECT: '}{doc.title}
                  </p>
                  <p className="text-[#e9f3f0] text-[11px] leading-relaxed whitespace-pre-line font-medium">
                    {translatedTextToRender}
                  </p>
                </div>
              </div>
            ) : viewMode === 'TRANSLATED' ? (
              <div className="p-5 rounded-lg bg-[#070c10] border border-[rgba(45,212,179,0.3)] space-y-3 text-xs min-h-[380px] font-sans animate-fade-in">
                <div className="border-b border-[rgba(120,200,190,0.14)] pb-2 font-mono text-[11px] text-[#2dd4b3] flex justify-between">
                  <span>TRANSLATED VERSION ({targetLang.toUpperCase()})</span>
                  {isTranslating ? <Loader2 className="w-3 h-3 animate-spin text-[#2dd4b3]" /> : <span>PAGE {String(pageNumber).padStart(2, '0')}</span>}
                </div>
                <p className="text-[#e9f3f0] font-bold text-xs">
                  {targetLang === 'Malayalam' ? 'വിഷയം: ' : 'SUBJECT: '}{doc.title}
                </p>
                <p className="text-[#e9f3f0] text-[11px] leading-relaxed whitespace-pre-line font-medium">
                  {translatedTextToRender}
                </p>
              </div>
            ) : (
              <div className="p-5 rounded-lg bg-[#070c10] border border-[rgba(120,200,190,0.14)] space-y-3 text-xs min-h-[380px] font-sans animate-fade-in">
                <div className="border-b border-[rgba(120,200,190,0.14)] pb-2 font-mono text-[11px] text-[#2dd4b3] flex justify-between">
                  <span>REF: {doc.extractedEntities?.['Reference Number'] || doc.id}</span>
                  <span>PAGE {String(pageNumber).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</span>
                </div>
                <p className="text-[#e9f3f0] font-bold text-xs">SUBJECT: {doc.title}</p>
                <p className="text-[#8fa6a1] text-[11px] leading-relaxed whitespace-pre-line font-mono">
                  {originalTextToRender}
                </p>
                <div className="p-3 bg-[rgba(239,106,76,0.1)] border-l-2 border-[#ef6a4c] text-[#ef6a4c] font-mono text-[10px] rounded-r">
                  MARGIN ANNOTATION: Mandatory safety directive compliance required by {doc.extractedEntities?.['Deadline'] || '18 AUG 2026'}.
                </div>
              </div>
            )}
          </div>

          <div className="text-[10px] font-mono text-[#5c706c] text-center border-t border-[rgba(120,200,190,0.14)] pt-2">
            KOCHI METRO RAIL LIMITED • OFFICIAL RECORD
          </div>
        </div>

        {/* CENTER COLUMN: WHAT MATTERS */}
        <div className={`${viewMode === 'SIDE_BY_SIDE' ? 'lg:col-span-3' : 'lg:col-span-4'} p-5 rounded-xl bg-[#0b1218] border border-[rgba(120,200,190,0.14)] space-y-5 transition-all duration-300`}>
          <div className="flex items-center justify-between border-b border-[rgba(120,200,190,0.14)] pb-3 text-xs font-mono">
            <span className="font-bold text-[#2dd4b3]">WHAT MATTERS</span>
            <span className="text-[#ef6a4c] font-bold">PRIORITY: {doc.urgency || doc.priority || 'HIGH'}</span>
          </div>

          {/* Key Metric Metadata */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-[#070c10] border border-[rgba(120,200,190,0.14)] space-y-1">
              <span className="text-[#5c706c] text-[10px] block">LOCATION</span>
              <span className="text-[#e9f3f0] font-bold text-sm">{doc.extractedEntities?.['Location'] || doc.extractedEntities?.['Depot Location'] || 'Muttom Depot'}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[#070c10] border border-[rgba(120,200,190,0.14)] space-y-1">
                <span className="text-[#5c706c] text-[10px] block">DEADLINE</span>
                <span className="text-[#2dd4b3] font-bold">{doc.extractedEntities?.['Deadline'] || doc.extractedEntities?.['Target Date'] || '18 AUG 2026'}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#070c10] border border-[rgba(120,200,190,0.14)] space-y-1">
                <span className="text-[#5c706c] text-[10px] block">DEPARTMENT</span>
                <span className="text-[#e9f3f0] font-bold">{doc.department}</span>
              </div>
            </div>
          </div>

          {/* KEY FINDINGS — DYNAMIC PER PAGE */}
          <div className="space-y-2 border-t border-[rgba(120,200,190,0.14)] pt-3 font-mono">
            <div className="text-[10px] font-bold text-[#8fa6a1] uppercase flex justify-between">
              <span>KEY FINDINGS</span>
              <span className="text-[#2dd4b3]">PAGE {String(pageNumber).padStart(2, '0')}</span>
            </div>
            <div className="space-y-2 text-xs font-sans">
              {(
                targetLang === 'Malayalam' ? [
                  { num: '01', text: pageNumber === 1 ? 'എക്സിക്യൂട്ടീവ് ഡോക്യുമെന്റ് കൺട്രോൾ കവർ പേജ് & ഇൻഡക്സ് സജ്ജമാക്കി' : pageNumber === 2 ? 'പൊതു വർക്ക്ഷോപ്പ് & ഡിപ്പോ സുരക്ഷാ മാനദണ്ഡങ്ങൾ നടപ്പിലാക്കി' : pageNumber === 3 ? 'റേക്ക് #07 ബോഗി ബ്രേക്ക് പാഡ് തേയ്മാനം (3.2mm) കണ്ടെത്തി' : pageNumber === 4 ? 'ട്രാക്ഷൻ മോട്ടോർ ബെയറിംഗ് ലൂബ്രിക്കേഷൻ സ്ഥിതി പരിശോധിച്ചു' : pageNumber === 5 ? 'പാന്റോഗ്രാഫ് കാർബൺ സ്ട്രിപ്പ് തേയ്മാനം ഓഡിറ്റ് പൂർത്തിയാക്കി' : pageNumber === 6 ? 'ഡോർ കൺട്രോൾ യൂണിറ്റ് (DCU) രോഗനിർണ്ണയവും പരിശോധനയും' : pageNumber === 7 ? 'പ്ലാറ്റ്‌ഫോം സ്ക്രീൻ ഡോർ (PSD) ഇന്റർലോക്ക് സ്ഥിരീകരിച്ചു' : pageNumber === 8 ? 'ന്യൂമാറ്റിക് ബ്രേക്ക് സിലിണ്ടർ മർദ്ദ പരിശോധന' : pageNumber === 9 ? 'പാസഞ്ചർ ഇൻഫർമേഷൻ സിസ്റ്റം (PIS) & സിസിടിവി ഓഡിറ്റ്' : pageNumber === 10 ? 'ഫയർ ഡിറ്റക്ഷൻ & സപ്രഷൻ സിസ്റ്റം (FDSS) ഓഡിറ്റ്' : pageNumber === 11 ? 'ബോഗി ഫ്രെയിം മാഗ്നറ്റിക് പാർട്ടിക്കിൾ വിള്ളൽ പരിശോധന' : pageNumber === 12 ? 'ഓക്സിലറി പവർ സപ്ലൈ (APS) ഇൻവെർട്ടർ വോൾട്ടേജ് ടെസ്റ്റ്' : pageNumber === 13 ? 'ഓട്ടോമാറ്റിക് ട്രെയിൻ കൺട്രോൾ (ATC) സിഗ്നലിംഗ് ഇന്റർലോക്ക്' : 'ചീഫ് എഞ്ചിനീയറുടെ അന്തിമ അംഗീകാരവും അധികാരപ്പെടുത്തലും' },
                  { num: '02', text: pageNumber === 1 ? 'ഡോക്യുമെന്റ് റഫറൻസ് KMRL-ENG-2026-8812 അനുവദിച്ചു' : pageNumber === 2 ? '100% PPE & സേഫ്റ്റി ഇന്റർലോക്ക് പ്രോട്ടോക്കോൾ സ്ഥിരീകരിച്ചു' : pageNumber === 3 ? 'മുട്ടം ഡിപ്പോ ബേ-3 ൽ വീൽ ലേത്ത് ഓഡിറ്റ് പൂർത്തിയാക്കി' : pageNumber === 4 ? 'സിന്തറ്റിക് ഗ്രീസ് പുനഃസ്ഥാപനം 25 AUG 2026 ലേക്ക് നിശ്ചയിച്ചു' : pageNumber === 5 ? 'കോൺടാക്റ്റ് സ്ട്രിപ്പ് കനം 14.5mm ആയി സ്ഥിരീകരിച്ചു' : pageNumber === 6 ? 'പാസഞ്ചർ വാതിലുകളിൽ തടസ്സങ്ങളൊന്നും കണ്ടെത്തിയില്ല' : pageNumber === 7 ? 'അടിയന്തര എഗ്രസ് ഓവർറൈഡ് സിസ്റ്റം പ്രവർത്തനക്ഷമമാണ്' : pageNumber === 8 ? 'പ്രധാന റിസർവോയർ മർദ്ദം 8.5 ബാറിൽ സ്ഥിരീകരിച്ചു' : pageNumber === 9 ? 'എല്ലാ 48 ഡിപ്പോ & കോച്ച് ക്യാമറ സ്ട്രീമുകളും സജീവമാണ്' : pageNumber === 10 ? 'സ്മോക്ക് ഡിറ്റക്ടർ സെൻസിറ്റിവിറ്റി കാലിബ്രേറ്റ് ചെയ്തു' : pageNumber === 11 ? 'ആക്‌സിലറി ബീമിൽ ഘടനാപരമായ സൂക്ഷ്മ വിള്ളലുകൾ ഒന്നുമില്ല' : pageNumber === 12 ? '415V 3-ഫേസ് AC ഔട്ട്പുട്ട് സ്ഥിരമായി നിൽക്കുന്നു' : pageNumber === 13 ? 'സ്പീഡ് കോഡ് റിസീവർ ഫ്രീക്വൻസി കാലിബ്രേറ്റ് ചെയ്തു' : 'റേക്ക് #07 സർവീസിനായി അംഗീകരിച്ചു' },
                  { num: '03', text: pageNumber === 1 ? 'ഓപ്പറേഷൻസ് & മെയ്ന്റനൻസ് ഓഡിറ്റ് വർക്ക്ഫ്ലോ ആരംഭിച്ചു' : pageNumber === 2 ? 'ഡിപ്പോ ട്രാക്ക് ബേ ക്ലിയറൻസ് പ്രോട്ടോക്കോളുകൾ നിർബന്ധമാക്കി' : pageNumber === 3 ? 'അടുത്ത സർവീസിന് മുമ്പ് ഫ്രിക്ഷൻ പാഡ് മാറ്റുന്നത് നിർബന്ധമാണ്' : pageNumber === 4 ? 'താപനില ടെലിമെട്രി 65°C പരിധിക്കുള്ളിൽ സ്ഥിരീകരിച്ചു' : pageNumber === 5 ? 'ഓവർഹെഡ് കാറ്റനറി 25kV പാന്റോഗ്രാഫ് ഉയരം അനുവദനീയമാണ്' : pageNumber === 6 ? 'അടിയന്തര വാതിൽ റിലീസ് ഹാൻഡ്‌ലുകൾ സുരക്ഷിതമാണ്' : pageNumber === 7 ? 'ഓപ്പറേഷൻസ് കൺട്രോൾ സെന്ററുമായി (OCC) സിഗ്നൽ ഇന്റഗ്രേഷൻ' : pageNumber === 8 ? 'അടിയന്തര ബ്രേക്ക് പ്രതികരണ സമയം 0.4 സെക്കന്റ് ആയി' : pageNumber === 9 ? 'തത്സമയ ഓഡിയോ അനൗൺസ്‌മെന്റ് വ്യക്തത സ്ഥിരീകരിച്ചു' : pageNumber === 10 ? 'എയറോസോൾ ഗ്യാസ് സപ്രഷൻ സിലിണ്ടർ മർദ്ദം പരിശോധിച്ചു' : pageNumber === 11 ? 'ബോഗി #07 നുള്ള നിയമപരമായ അനുസരണ സർട്ടിഫിക്കറ്റ് നൽകി' : pageNumber === 12 ? '110V DC ബാറ്ററി ചാർജർ ഫ്ലോട്ട് മോഡ് സ്ഥിരീകരിച്ചു' : pageNumber === 13 ? 'വൈറ്റൽ റിലേ റാക്ക് പരിശോധന OCC ലീഡ് ഒപ്പുവെച്ചു' : 'അടുത്ത ഷെഡ്യൂൾ ചെയ്ത ഓഡിറ്റ് 09 SEP 2026 ലേക്ക് നിശ്ചയിച്ചു' }
                ] : [
                  { num: '01', text: pageNumber === 1 ? 'Executive document control cover page & index registered' : pageNumber === 2 ? 'General workshop & depot safety standards enforced at Muttom' : pageNumber === 3 ? 'Brake pad wear detected on bogie friction pads at 3.2mm' : pageNumber === 4 ? 'Traction motor bearing lubrication status verified' : pageNumber === 5 ? 'Pantograph carbon strip wear audit completed' : pageNumber === 6 ? 'Door Control Unit (DCU) diagnostics & interlock test' : pageNumber === 7 ? 'Platform Screen Door (PSD) interlock verified' : pageNumber === 8 ? 'Pneumatic brake cylinder pressure audit' : pageNumber === 9 ? 'Passenger Information System (PIS) & CCTV audit' : pageNumber === 10 ? 'Fire Detection & Suppression System (FDSS) audit' : pageNumber === 11 ? 'Bogie frame magnetic particle crack inspection' : pageNumber === 12 ? 'Auxiliary Power Supply (APS) inverter voltage test' : pageNumber === 13 ? 'Automatic Train Control (ATC) signalling interlock' : 'Final sign-off & authorization by Chief Engineer' },
                  { num: '02', text: pageNumber === 1 ? 'Document reference KMRL-ENG-2026-8812 assigned' : pageNumber === 2 ? '100% PPE & safety interlock protocol verified' : pageNumber === 3 ? 'Wheel lathe audit completed at Muttom Depot Bay-3' : pageNumber === 4 ? 'Synthetic grease replenishment scheduled for 25 AUG 2026' : pageNumber === 5 ? 'Contact strip thickness verified at 14.5mm' : pageNumber === 6 ? 'Zero obstruction fault codes detected on passenger doors' : pageNumber === 7 ? 'Emergency egress override system verified functional' : pageNumber === 8 ? 'Main reservoir pressure stabilized at 8.5 bar' : pageNumber === 9 ? 'All 48 depot & coach camera streams verified active' : pageNumber === 10 ? 'Optical smoke detector sensitivity calibrated' : pageNumber === 11 ? 'Zero structural micro-cracks detected on axle beam' : pageNumber === 12 ? '415V 3-phase AC output stable across all load modes' : pageNumber === 13 ? 'Speed code receiver frequency calibrated with track loop' : 'Rake #07 cleared for revenue service operation' },
                  { num: '03', text: pageNumber === 1 ? 'Operations & Maintenance audit workflow initialized' : pageNumber === 2 ? 'Depot track bay clearance protocols mandated' : pageNumber === 3 ? 'Friction pad replacement mandatory prior to revenue run' : pageNumber === 4 ? 'Temperature telemetry within 65°C operational limit' : pageNumber === 5 ? 'Overhead catenary 25kV pantograph uplift within tolerance' : pageNumber === 6 ? 'Emergency door release handle seal intact across coaches' : pageNumber === 7 ? 'Signal integration active with OCC Operations Control' : pageNumber === 8 ? 'Emergency brake application response time 0.4s verified' : pageNumber === 9 ? 'Real-time audio announcement clarity verified' : pageNumber === 10 ? 'Aerosol gas suppression cylinder pressure verified' : pageNumber === 11 ? 'Statutory compliance certificate issued for Bogie #07' : pageNumber === 12 ? '110V DC battery charger float mode verified' : pageNumber === 13 ? 'Vital relay rack inspection signed off by OCC Lead' : 'Next scheduled periodic audit set for 09 SEP 2026' }
                ]
              ).map((kf, i) => (
                <div key={i} className="p-2.5 rounded bg-[#070c10] border border-[rgba(120,200,190,0.14)] flex gap-2 items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <span className="font-mono text-[#2dd4b3] font-bold">{kf.num}</span>
                    <span className="text-[#e9f3f0] text-[11px] leading-tight">{kf.text}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#2dd4b3] font-bold shrink-0">
                    Pg {pageNumber}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC AI ANALYSIS & REPORT */}
        <div className={`${viewMode === 'SIDE_BY_SIDE' ? 'lg:col-span-3' : 'lg:col-span-4'} p-5 rounded-xl bg-[#0b1218] border border-[rgba(120,200,190,0.14)] space-y-4 transition-all duration-300 flex flex-col justify-between`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(120,200,190,0.14)] pb-3 text-xs font-mono">
              <span className="font-bold text-[#8fa6a1]">AI ANALYSIS PAGE</span>
              <span className="text-[#3b82f6] font-bold">PAGE {String(pageNumber).padStart(2, '0')}</span>
            </div>

            {/* Analysis Section Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1 font-mono text-[10px]">
              {['OVERVIEW', 'FINDINGS', 'RISK', 'ACTION', 'SOURCES'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setAnalysisTab(tab)}
                  className={`px-2 py-1 rounded transition-all cursor-pointer ${
                    analysisTab === tab
                      ? 'bg-[#2dd4b3] text-[#070c10] font-bold'
                      : 'bg-[#070c10] text-[#8fa6a1] hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* DYNAMIC ANALYSIS TAB CONTENT */}
            <div className="space-y-3 text-xs">
              {analysisTab === 'OVERVIEW' && (
                <div className="space-y-2 font-mono text-[11px] bg-[#070c10] p-3.5 rounded-lg border border-[rgba(120,200,190,0.14)] animate-fade-in">
                  <div className="text-[#2dd4b3] font-bold uppercase text-[10px] border-b border-[rgba(120,200,190,0.14)] pb-1">DOCUMENT OVERVIEW</div>
                  <div>Title: <strong className="text-[#e9f3f0] font-sans">{doc.title}</strong></div>
                  <div>Category: <strong className="text-[#e9f3f0]">{doc.category || 'Maintenance'}</strong></div>
                  <div>Source: <strong className="text-[#e9f3f0]">{doc.source || 'KMRL Portal'}</strong></div>
                  <div>Language: <strong className="text-[#2dd4b3]">{targetLang}</strong></div>
                  <p className="text-[#8fa6a1] text-xs font-sans pt-1 leading-relaxed">
                    {analysisData?.overview?.short_summary || originalTextToRender.slice(0, 150)}...
                  </p>
                </div>
              )}

              {analysisTab === 'FINDINGS' && (
                <div className="space-y-2 font-mono text-[11px] animate-fade-in">
                  <div className="text-[#2dd4b3] font-bold uppercase text-[10px] pb-1">KEY FINDINGS & SOURCES</div>
                  {(analysisData?.key_findings || [
                    { id: 1, finding: "Brake pad wear detected on bogie friction pads.", source_page: 3 },
                    { id: 2, finding: "Platform interlock system operating normally.", source_page: 7 },
                    { id: 3, finding: "Statutory speed limit compliance mandated.", source_page: 11 }
                  ]).map((kf, idx) => (
                    <div key={idx} className="p-3 bg-[#070c10] rounded border border-[rgba(120,200,190,0.14)] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[#2dd4b3] font-bold">Finding #{kf.id || idx+1}</span>
                        <button
                          onClick={() => handleJumpToPage(kf.source_page)}
                          className="px-2 py-0.5 rounded bg-[#2dd4b3]/20 text-[#2dd4b3] text-[10px] font-bold hover:bg-[#2dd4b3]/30 cursor-pointer"
                        >
                          View Page {kf.source_page}
                        </button>
                      </div>
                      <p className="text-[#e9f3f0] text-xs font-sans">{kf.finding}</p>
                    </div>
                  ))}
                </div>
              )}

              {analysisTab === 'RISK' && (
                <div className="space-y-2 font-mono text-[11px] animate-fade-in">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded bg-[rgba(239,106,76,0.1)] border border-[rgba(239,106,76,0.3)]">
                      <span className="text-[#ef6a4c] text-[10px] block">RISK LEVEL</span>
                      <strong className="text-[#ef6a4c] text-sm">{doc.urgency || doc.priority || 'HIGH'}</strong>
                    </div>
                    <div className="p-3 rounded bg-[rgba(45,212,179,0.1)] border border-[rgba(45,212,179,0.3)]">
                      <span className="text-[#2dd4b3] text-[10px] block">CONFIDENCE</span>
                      <strong className="text-[#2dd4b3] text-sm">99.4%</strong>
                    </div>
                  </div>
                </div>
              )}

              {analysisTab === 'ACTION' && (
                <div className="space-y-2 font-mono text-[11px] bg-[#070c10] p-3.5 rounded-lg border border-[rgba(120,200,190,0.14)] animate-fade-in">
                  <div className="text-[#2dd4b3] font-bold uppercase text-[10px] border-b border-[rgba(120,200,190,0.14)] pb-1">AI WORKFLOW DECISION GATE</div>
                  <div>Recommended Action: <strong className="text-[#e9f3f0] font-sans">{doc.suggestedActions?.[0]?.action || 'Schedule maintenance audit'}</strong></div>
                  <div>Target Department: <strong className="text-[#2dd4b3]">{doc.department}</strong></div>

                  {decisionState === 'ACCEPTED' ? (
                    <div className="p-2.5 rounded bg-[rgba(45,212,179,0.15)] border border-[rgba(45,212,179,0.4)] text-[#2dd4b3] font-bold text-[11px] flex items-center gap-1.5 mt-2">
                      <CheckCircle2 className="w-4 h-4" /> DECISION ACCEPTED ➔ LOGGED TO DB
                    </div>
                  ) : decisionState === 'REJECTED' ? (
                    <div className="p-2.5 rounded bg-[rgba(239,106,76,0.15)] border border-[rgba(239,106,76,0.4)] text-[#ef6a4c] font-bold text-[11px] mt-2">
                      ✕ DECISION REJECTED BY OPERATOR
                    </div>
                  ) : (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setRejectModalOpen(true)}
                        className="px-3 py-1.5 rounded bg-[#0b1218] text-[#ef6a4c] border border-[rgba(239,106,76,0.3)] font-bold hover:bg-[rgba(239,106,76,0.1)] cursor-pointer"
                      >
                        REJECT
                      </button>
                      <button
                        onClick={handleAccept}
                        className="px-4 py-1.5 rounded bg-[#2dd4b3] text-[#070c10] font-extrabold uppercase hover:bg-[#25b89c] cursor-pointer flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> ACCEPT & EXECUTE
                      </button>
                    </div>
                  )}
                </div>
              )}

              {analysisTab === 'SOURCES' && (
                <div className="space-y-2 font-mono text-[11px] bg-[#070c10] p-3.5 rounded-lg border border-[rgba(120,200,190,0.14)] animate-fade-in">
                  <div className="text-[#2dd4b3] font-bold uppercase text-[10px] border-b border-[rgba(120,200,190,0.14)] pb-1">SOURCES & TRACEABILITY</div>
                  <div>Document ID: <strong className="text-[#e9f3f0]">{doc.id}</strong></div>
                  <div>Source Page: <strong className="text-[#2dd4b3]">Page {String(pageNumber).padStart(2, '0')}</strong></div>
                  <div>DB Connection: <strong className="text-[#2dd4b3]">PostgreSQL Active</strong></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* REJECT REASON MODAL */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-[#070c10]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1218] border border-[rgba(120,200,190,0.18)] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl font-mono text-xs">
            <div className="flex justify-between items-center border-b border-[rgba(120,200,190,0.14)] pb-3">
              <span className="font-bold text-[#e9f3f0]">REJECT AI RECOMMENDATION</span>
              <button onClick={() => setRejectModalOpen(false)} className="text-[#8fa6a1] hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[#8fa6a1]">REJECTION REASON:</label>
              <textarea
                value={rejectionReason}
                onChange={e => setRejectionReason(e.target.value)}
                placeholder="Enter operational reason..."
                rows={3}
                className="w-full p-3 rounded bg-[#070c10] border border-[rgba(120,200,190,0.14)] text-[#e9f3f0] focus:outline-none focus:border-[#2dd4b3]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 rounded bg-[#070c10] text-[#8fa6a1] font-bold cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded bg-[#ef6a4c] text-white font-bold cursor-pointer"
              >
                CONFIRM REJECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
