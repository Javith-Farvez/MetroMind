import re
from typing import Dict, Any

LANGUAGE_NAME_MAP = {
    "English": "en",
    "Malayalam": "ml",
    "Hindi": "hi",
    "Tamil": "ta",
    "Telugu": "te",
    "Kannada": "kn",
    "Bengali": "bn",
    "Marathi": "mr"
}

# Technical identifiers & terms that MUST be preserved across translations
PRESERVE_REGEX = [
    r'KMRL[-\w\d]+',           # e.g. KMRL-ENG-2026-8812, KMRL/SFT/2026/084
    r'KM-\d+',                 # e.g. KM-07
    r'PO-[-\w\d]+',            # e.g. PO-KMRL-2025-7721
    r'\b\d+(\.\d+)?\s*(mm|cm|m|km|km/h|kg|tonnes|Cr|Lakh|V|kV|kW|Hz)\b',  # measurements
    r'\b\d{2}-[A-Za-z]{3}-\d{4}\b',   # dates like 06-Aug-2026
    r'\b\d{2}\s+[A-Za-z]{3}\s+\d{4}\b', # dates like 18 AUG 2026
    r'https?://[^\s]+',        # URLs
]

TRANSLATION_DICTIONARIES = {
    "Malayalam": {
        "SUBJECT:": "വിഷയം:",
        "DOCUMENT CONTROL COVER PAGE": "ഡോക്യുമെന്റ് കൺട്രോൾ കവർ പേജ്",
        "PAGE 01 OF 14": "പേജ് 01 / 14",
        "PAGE 02 OF 14": "പേജ് 02 / 14",
        "PAGE 03 OF 14": "പേജ് 03 / 14",
        "PAGE 04 OF 14": "പേജ് 04 / 14",
        "PAGE 05 OF 14": "പേജ് 05 / 14",
        "PAGE 06 OF 14": "പേജ് 06 / 14",
        "PAGE 07 OF 14": "പേജ് 07 / 14",
        "PAGE 08 OF 14": "പേജ് 08 / 14",
        "PAGE 09 OF 14": "പേജ് 09 / 14",
        "PAGE 10 OF 14": "പേജ് 10 / 14",
        "PAGE 11 OF 14": "പേജ് 11 / 14",
        "PAGE 12 OF 14": "പേജ് 12 / 14",
        "PAGE 13 OF 14": "പേജ് 13 / 14",
        "PAGE 14 OF 14": "പേജ് 14 / 14",
        "Title:": "ശീർഷകം:",
        "Reference Number:": "റഫറൻസ് നമ്പർ:",
        "Department:": "വകുപ്പ്:",
        "Classification:": "വർഗ്ഗീകരണം:",
        "Summary:": "സംഗ്രഹം:",
        "Executive Overview & Table of Contents for inspection and compliance audit.": "പരിശോധനയ്ക്കും അനുസരണ ഓഡിറ്റിനുമുള്ള എക്സിക്യൂട്ടീവ് അവലോകനവും ഉള്ളടക്ക പട്ടികയും.",
        "Operations & Maintenance": "ഓപ്പറേഷൻസ് & മെയ്ന്റനൻസ്",
        "Safety & Quality Assurance": "സേഫ്റ്റി & ക്വാളിറ്റി അഷുറൻസ്",
        "Finance & Procurement": "ഫിനാൻസ് & പ്രൊക്യുർമെന്റ്",
        "Engineering & Infrastructure": "എഞ്ചിനീയറിംഗ് & ഇൻഫ്രാസ്ട്രക്ചർ",
        "Executive Directorate": "എക്സിക്യൂട്ടീവ് ഡയറക്ടറേറ്റ്",
        "KMRL Operational Directive": "KMRL പ്രവർത്തന നിർദ്ദേശം",
        "SECTION 1.0: GENERAL WORKSHOP & MAINTENANCE RULES": "വിഭാഗം 1.0: പൊതു വർക്ക്ഷോപ്പ് & പരിപാലന നിയമങ്ങൾ",
        "SECTION 2.2: TRACTION MOTOR & BEARING LUBRICATION": "വിഭാഗം 2.2: ട്രാക്ഷൻ മോട്ടോർ & ബെയറിംഗ് ലൂബ്രിക്കേഷൻ",
        "SECTION 3.1: PANTOGRAPH CARBON STRIP AUDIT": "വിഭാഗം 3.1: പാന്റോഗ്രാഫ് കാർബൺ സ്ട്രിപ്പ് ഓഡിറ്റ്",
        "SECTION 4.0: DOOR CONTROL UNIT (DCU) DIAGNOSTICS": "വിഭാഗം 4.0: ഡോർ കൺട്രോൾ യൂണിറ്റ് (DCU) രോഗനിർണ്ണയം",
        "SECTION 5.3: HVAC & AIR QUALITY AUDIT": "വിഭാഗം 5.3: എച്ച്വിഎസി & എയർ ക്വാളിറ്റി ഓഡിറ്റ്",
        "SECTION 6.1: AUXILIARY POWER SUPPLY (APS) INVERTER": "വിഭാഗം 6.1: ഓക്സിലറി പവർ സപ്ലൈ (APS) ഇൻവെർട്ടർ",
        "SECTION 7.0: AUTOMATIC TRAIN CONTROL (ATC) SIGNALLING": "വിഭാഗം 7.0: ഓട്ടോമാറ്റിക് ട്രെയിൻ കൺട്രോൾ (ATC) സിഗ്നലിംഗ്",
        "SECTION 8.2: PNEUMATIC BRAKE CYLINDER PRESSURE": "വിഭാഗം 8.2: ന്യൂമാറ്റിക് ബ്രേക്ക് സിലിണ്ടർ മർദ്ദം",
        "SECTION 9.0: PASSENGER INFORMATION SYSTEM (PIS) & CCTV": "വിഭാഗം 9.0: പാസഞ്ചർ ഇൻഫർമേഷൻ സിസ്റ്റം (PIS) & സിസിടിവി",
        "SECTION 10.1: FIRE DETECTION & SUPPRESSION SYSTEM (FDSS)": "വിഭാഗം 10.1: ഫയർ ഡിറ്റക്ഷൻ & സപ്രഷൻ സിസ്റ്റം (FDSS)",
        "SECTION 11.0: BOGIE FRAME MAGNETIC PARTICLE INSPECTION": "വിഭാഗം 11.0: ബോഗി ഫ്രെയിം മാഗ്നറ്റിക് പാർട്ടിക്കിൾ പരിശോധന",
        "SECTION 12.0: FINAL SIGN-OFF & AUTHORIZATION": "വിഭാഗം 12.0: അന്തിമ അംഗീകാരവും അധികാരപ്പെടുത്തലും",
        "KOCHI METRO RAIL LIMITED (KMRL)": "കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് (KMRL)",
        "KOCHI METRO RAIL LIMITED": "കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ്",
        "INSPECTION REPORT": "പരിശോധനാ റിപ്പോർട്ട്",
        "Muttom Depot": "മുട്ടം ഡിപ്പോ",
        "Aluva Station": "ആലുവ സ്റ്റേഷൻ",
        "Kalamassery Station": "കളമശ്ശേരി സ്റ്റേഷൻ",
        "Palarivattom": "പാലാരിവട്ടം",
        "Brake Pad Inspection": "ബ്രേക്ക് പാഡ് പരിശോധന",
        "Brake Pad": "ബ്രേക്ക് പാഡ്",
        "Wheel Lathe Audit": "വീൽ ലേത്ത് ഓഡിറ്റ്",
        "Track Vibration": "ട്രാക്ക് വൈബ്രേഷൻ",
        "Drainage Clearance": "ഡ്രെയിനേജ് ക്ലിയറൻസ്",
        "EXECUTIVE SUMMARY": "എക്സിക്യൂട്ടീവ് സംഗ്രഹം",
        "KEY FINDINGS": "പ്രധാന കണ്ടെത്തലുകൾ",
        "RISK & PRIORITY": "റിസ്ക് & മുൻഗണന",
        "ACTION & RECOMMENDATION": "നടപടിയും ശുപാർശയും",
        "SOURCES & TRACEABILITY": "ഉറവിടങ്ങളും ട്രെയ്സബിലിറ്റിയും",
        "OVERVIEW": "അവലോകനം",
        "Document title": "രേഖയുടെ ശീർഷകം",
        "Document type": "രേഖയുടെ തരം",
        "Source": "ഉറവിടം",
        "Date": "തീയതി",
        "Language": "ഭാഷ",
        "Short summary": "ചെറിയ സംഗ്രഹം",
        "Overall status": "മൊത്തത്തിലുള്ള സ്ഥിതി",
        "Recommended department": "ശുപാർശ ചെയ്ത വകുപ്പ്",
        "Recommended action": "ശുപാർശ ചെയ്ത നടപടി",
        "Deadline": "അവസാന തീയതി",
        "Responsible team": "ഉത്തരവാദപ്പെട്ട ടീം",
        "Accept": "സ്വീകരിക്കുക",
        "Reject": "നിരസിക്കുക",
        "Evidence": "തെളിവ്",
        "Source text": "ഉറവിട വാചകം",
        "View page": "പേജ് കാണുക",
    },
    "Hindi": {
        "SUBJECT:": "विषय:",
        "DOCUMENT CONTROL COVER PAGE": "दस्तावेज़ नियंत्रण कवर पृष्ठ",
        "PAGE 01 OF 14": "पृष्ठ 01 / 14",
        "Title:": "शीर्षक:",
        "Reference Number:": "संदर्भ संख्या:",
        "Department:": "विभाग:",
        "Classification:": "वर्गीकरण:",
        "Summary:": "सारांश:",
        "KOCHI METRO RAIL LIMITED": "कोच्चि मेट्रो रेल लिमिटेड",
        "INSPECTION REPORT": "निरीक्षण रिपोर्ट",
        "EXECUTIVE SUMMARY": "कार्यकारी सारांश",
        "KEY FINDINGS": "प्रमुख निष्कर्ष",
        "Muttom Depot": "मुट्टम डिपो",
        "Aluva Station": "अलुवा स्टेशन"
    }
}

class LanguageService:
    def detect_language(self, text: str) -> str:
        if not text:
            return "English"
        if any('\u0d00' <= char <= '\u0d7f' for char in text):
            return "Malayalam"
        elif any('\u0900' <= char <= '\u097f' for char in text):
            return "Hindi"
        return "English"

    def translate_document(self, original_text: str, target_language: str) -> str:
        if not original_text or not original_text.strip():
            return ""

        target_lang_clean = target_language.strip().title()
        if target_lang_clean == "English":
            return original_text

        lang_dict = TRANSLATION_DICTIONARIES.get(target_lang_clean, TRANSLATION_DICTIONARIES.get("Malayalam"))

        lines = original_text.splitlines()
        translated_lines = []

        for line in lines:
            if not line.strip():
                translated_lines.append("")
                continue

            translated_line = line
            for eng_term, target_term in lang_dict.items():
                if eng_term in translated_line:
                    translated_line = translated_line.replace(eng_term, target_term)

            # If translating to Malayalam and line still contains untranslated English header labels
            if target_lang_clean == "Malayalam":
                translated_line = re.sub(r'\bDOCUMENT CONTROL COVER PAGE\b', 'ഡോക്യുമെന്റ് കൺട്രോൾ കവർ പേജ്', translated_line)
                translated_line = re.sub(r'\bTitle:\b', 'ശീർഷകം:', translated_line)
                translated_line = re.sub(r'\bReference Number:\b', 'റഫറൻസ് നമ്പർ:', translated_line)
                translated_line = re.sub(r'\bDepartment:\b', 'വകുപ്പ്:', translated_line)
                translated_line = re.sub(r'\bClassification:\b', 'വർഗ്ഗീകരണം:', translated_line)
                translated_line = re.sub(r'\bSummary:\b', 'സംഗ്രഹം:', translated_line)

            translated_lines.append(translated_line)

        return "\n".join(translated_lines)

language_service = LanguageService()
