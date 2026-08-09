import datetime
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
import app.models as models
from app.core.security import hash_password

def seed_database():
    try:
        Base.metadata.drop_all(bind=engine)
    except Exception as err:
        print("[INIT] Note on drop_all:", err)
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        print("[INIT] Starting KMRL MetroFlow Database Seeding...")

        # 1. Roles
        roles_data = [
            ("ADMIN", "System Administrator with full enterprise access"),
            ("EXECUTIVE", "Executive leadership & strategic reporting"),
            ("ENGINEERING", "Engineering, rolling stock & signaling teams"),
            ("OPERATIONS", "Train operations & station management"),
            ("FINANCE", "Financial auditing, PO matching & invoices"),
            ("SAFETY", "Safety compliance, hazard reporting & audits"),
            ("MAINTENANCE", "Depot maintenance & overhaul crews"),
            ("EMPLOYEE", "General KMRL staff member")
        ]
        
        role_map = {}
        for r_name, r_desc in roles_data:
            role = db.query(models.Role).filter(models.Role.name == r_name).first()
            if not role:
                role = models.Role(name=r_name, description=r_desc, permissions={"all": True} if r_name == "ADMIN" else {"read": True})
                db.add(role)
                db.commit()
                db.refresh(role)
            role_map[r_name] = role

        # 2. Departments
        depts_data = [
            ("Operations & Maintenance", "O&M", "Rolling stock, depot workshops & daily train schedules"),
            ("Engineering & Infrastructure", "ENG", "Track maintenance, catenary wire & civil structures"),
            ("Safety & Quality Assurance", "SAF", "System safety circulars, fire hazard & passenger safety audits"),
            ("Finance & Procurement", "FIN", "Vendor billing, BHEL contracts & station revenue accounting"),
            ("Executive Directorate", "EXEC", "Board decisions, government policy & KMRL expansion projects")
        ]

        dept_map = {}
        for d_name, d_code, d_desc in depts_data:
            dept = db.query(models.Department).filter(models.Department.name == d_name).first()
            if not dept:
                dept = models.Department(name=d_name, code=d_code, description=d_desc)
                db.add(dept)
                db.commit()
                db.refresh(dept)
            dept_map[d_name] = dept

        # 3. Users
        users_data = [
            ("KMRL-1001", "Loknath Behera", "admin@metromind.ai", "ADMIN", "Executive Directorate"),
            ("KMRL-1042", "K. V. N. Kurup", "kurup.engineering@metromind.ai", "ENGINEERING", "Engineering & Infrastructure"),
            ("KMRL-2089", "Anitha Ramesh", "anitha.safety@metromind.ai", "SAFETY", "Safety & Quality Assurance"),
            ("KMRL-3104", "Siddharth Menon", "siddharth.finance@metromind.ai", "FINANCE", "Finance & Procurement"),
            ("KMRL-4011", "Rajesh Nair", "rajesh.om@metromind.ai", "OPERATIONS", "Operations & Maintenance")
        ]

        user_map = {}
        for emp_id, name, email, r_name, d_name in users_data:
            usr = db.query(models.User).filter(models.User.email == email).first()
            if not usr:
                usr = models.User(
                    employee_id=emp_id,
                    full_name=name,
                    email=email,
                    password_hash=hash_password("admin123"),
                    role_id=role_map[r_name].id,
                    department_id=dept_map[d_name].id,
                    is_active=True
                )
                db.add(usr)
                db.commit()
                db.refresh(usr)
            user_map[email] = usr

        # 4. Multi-Format Demo Documents
        docs_data = [
            {
                "id": "KMRL-ENG-2026-8812",
                "title": "KMRL Rolling Stock Maintenance Circular - Muttom Depot",
                "category": "MAINTENANCE",
                "department": "Operations & Maintenance",
                "source": "Muttom Depot Workshop",
                "language": "English",
                "confidence": 99.4,
                "status": "COMPLETED",
                "urgency": "High",
                "file_size": "4.2 MB",
                "ocr_text": "KOCHI METRO RAIL LIMITED - Muttom Depot Audit Rake #07 bogie brake pad wear (3.2mm). Friction pad replacement mandatory prior to peak hours schedule."
            },
            {
                "id": "KMRL-SAF-2026-019",
                "title": "Safety Inspection Report — Aluva Station Platform Interlock",
                "category": "SAFETY",
                "department": "Safety & Quality Assurance",
                "source": "Aluva Control Center",
                "language": "Malayalam",
                "confidence": 98.9,
                "status": "COMPLETED",
                "urgency": "Medium",
                "file_size": "1.8 MB",
                "ocr_text": "കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് - ആലുവ സ്റ്റേഷൻ സുരക്ഷാ പരിശോധന പൂർത്തിയായി. പ്ലാറ്റ്ഫോം ഡോർ ഇന്റർലോക്ക് 100% പ്രവർത്തനക്ഷമമാണ്."
            },
            {
                "id": "KMRL-FIN-2026-3042",
                "title": "Vendor Purchase Order — Electrical Components (BHEL Invoice)",
                "category": "PROCUREMENT",
                "department": "Finance & Procurement",
                "source": "Kalamassery Station",
                "language": "English",
                "confidence": 99.1,
                "status": "COMPLETED",
                "urgency": "High",
                "file_size": "6.7 MB",
                "ocr_text": "Invoice BHEL/KMRL/2026/094 for 16.43 Cr matches PO-KMRL-2025-7721 at Kalamassery Traction Substation. Quantity and quality checks verified."
            },
            {
                "id": "KMRL-GOV-2026-004",
                "title": "Government Safety Directive — Viaduct Monsoon Speed Restrictions",
                "category": "COMPLIANCE",
                "department": "Safety & Quality Assurance",
                "source": "CMRS Regulatory Authority",
                "language": "English & Malayalam",
                "confidence": 99.5,
                "status": "COMPLETED",
                "urgency": "CRITICAL",
                "file_size": "2.1 MB",
                "ocr_text": "CMRS MANDATORY DIRECTIVE #2026-04: Enforce 50 km/h speed restriction on elevated viaduct during heavy rain. Compliance mandatory."
            }
        ]

        for d in docs_data:
            doc = db.query(models.Document).filter(models.Document.id == d["id"]).first()
            if not doc:
                dept_obj = dept_map[d["department"]]
                is_public = d.get("is_public", True)
                doc = models.Document(
                    id=d["id"],
                    title=d["title"],
                    description=d["ocr_text"],
                    file_name=f"{d['id']}.pdf",
                    file_type="PDF",
                    file_size=d["file_size"],
                    department_id=dept_obj.id,
                    status=d["status"],
                    priority=d["urgency"],
                    language=d["language"],
                    document_category=d["category"],
                    confidence=d["confidence"],
                    source="KMRL Official Portal (kochimetro.org)" if is_public else d["source"],
                    source_type="PUBLIC_KMRL_SOURCE" if is_public else "USER_UPLOADED",
                    source_url=f"https://kochimetro.org/public/{d['id'].lower()}.pdf" if is_public else None,
                    source_title=d["title"]
                )
                db.add(doc)
                db.commit()

                # Document Provenance
                prov = models.DocumentProvenance(
                    document_id=d["id"],
                    source_type="PUBLIC_KMRL_SOURCE" if is_public else "USER_UPLOADED",
                    source_url=f"https://kochimetro.org/public/{d['id'].lower()}.pdf",
                    source_domain="kochimetro.org",
                    source_title=d["title"],
                    publisher="Kochi Metro Rail Limited (KMRL)",
                    retrieved_at=datetime.datetime.utcnow(),
                    content_hash=f"hash-{d['id']}",
                    original_file_name=f"{d['id']}.pdf",
                    original_download_url=f"https://kochimetro.org/public/{d['id'].lower()}.pdf",
                    collection_method="KMRL_PUBLIC_INGESTION"
                )
                db.add(prov)

                # Document Metadata
                meta = models.DocumentMetadata(
                    document_id=d["id"],
                    reference_number=d["id"],
                    document_date=datetime.datetime.utcnow() - datetime.timedelta(days=5),
                    department=d["department"],
                    station="Aluva Station" if "Aluva" in d["title"] else ("Kalamassery" if "BHEL" in d["title"] else "Muttom Depot"),
                    depot="Muttom Depot" if "Muttom" in d["title"] else None,
                    location="Aluva Station Platform" if "Aluva" in d["title"] else ("Muttom Bay 3" if "Muttom" in d["title"] else "Kalamassery Substation"),
                    vendor="BHEL" if "BHEL" in d["title"] else "Not available",
                    contract_number="PO-KMRL-2025-7721" if "BHEL" in d["title"] else "KMRL-SFT-CTRL-991",
                    amount="16.43 Cr" if "BHEL" in d["title"] else "Not available",
                    deadline="18 AUG 2026" if "Safety" in d["title"] or "Aluva" in d["title"] else "25 AUG 2026",
                    author="KMRL Operational Authority",
                    subject=d["title"]
                )
                db.add(meta)

                # Add summary
                summary = models.DocumentSummary(
                    document_id=d["id"],
                    summary=f"Automated AI summary for {d['title']}. Compliance verified.",
                    key_points=["Verified against KMRL RDSO technical guidelines", "High precision multi-language OCR extraction"],
                    action_items=[{"description": f"Route to {d['department']} for immediate review.", "owner": "Operations Lead", "deadline": "18 AUG 2026", "priority": d["urgency"]}],
                    risk_level="HIGH" if d["urgency"] in ["CRITICAL", "High"] else "Medium"
                )
                db.add(summary)

                # AI Analysis
                analysis = models.AIAnalysis(
                    document_id=d["id"],
                    summary=f"AI Summary for {d['title']}: {d['ocr_text'][:150]}...",
                    key_findings=["Verified against KMRL RDSO technical guidelines", "High precision OCR extraction"],
                    important_dates=["18 AUG 2026"],
                    risks=[{"risk_level": d["urgency"], "reason": "Analyzed from document content."}],
                    risk_level=d["urgency"],
                    risk_reason=f"Identified priority as {d['urgency']} from document content.",
                    priority=d["urgency"],
                    priority_reason=f"High operational priority detected for {d['department']}.",
                    recommended_department=d["department"],
                    recommended_action=f"Route to {d['department']} for immediate review.",
                    deadline_date=datetime.datetime.utcnow() + datetime.timedelta(days=9)
                )
                db.add(analysis)

                # Workflow Recommendation
                rec = models.WorkflowRecommendation(
                    document_id=d["id"],
                    suggested_action=f"Route to {d['department']} for immediate review.",
                    reason=f"Safety and operational requirements identified in {d['title']}.",
                    recommended_department=d["department"],
                    recommended_owner=f"{d['department']} Lead",
                    deadline="18 AUG 2026",
                    priority=d["urgency"],
                    status="PENDING"
                )
                db.add(rec)

                # Document Pages (1 to 14)
                page_texts = [
                    f"KOCHI METRO RAIL LIMITED (KMRL)\nDOCUMENT CONTROL COVER PAGE — PAGE 01 OF 14\nTitle: {d['title']}\nReference Number: {d['id']}\nDepartment: {d['department']}\nClassification: KMRL Operational Directive\nSummary: Executive Overview & Table of Contents for inspection and compliance audit.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 02 OF 14\nSECTION 1.0: GENERAL WORKSHOP & MAINTENANCE RULES\nMuttom Depot Facility Standards.\nDaily inspection mandates apply for all rakes prior to revenue deployment. Safety protocols enforced under KMRL Directive #88.",
                    f"SUBJECT: Muttom Depot Rolling Stock Brake Inspection & Wheel Lathe Audit\nKOCHI METRO RAIL LIMITED (KMRL)\nDEPARTMENT OF ROLLING STOCK & MAINTENANCE\nMuttom Depot, Choornikkara, Aluva, Kerala\nPAGE 03 OF 14\nINSPECTION REPORT: Rake #07 bogie brake pad wear measured at 3.2mm. Immediate friction pad replacement mandatory prior to peak hours schedule.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 04 OF 14\nSECTION 2.2: TRACTION MOTOR & BEARING LUBRICATION\nBogie 1 & 2 Thermal Sensor Readings: 42°C (Normal Range).\nLubrication topped up with Shell Gadus S3 grease. Vibration frequencies within 0.4 mm/s RMS limits.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 05 OF 14\nSECTION 3.1: PANTOGRAPH CARBON STRIP AUDIT\nPantograph Rake #07 carbon wear limit: 14.5mm remaining (Minimum threshold 6.0mm).\nHigh voltage 25kV catenary contact force verified at 70 N ± 5 N.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 06 OF 14\nSECTION 4.0: DOOR CONTROL UNIT (DCU) DIAGNOSTICS\nObstacle detection sensor test passed on all 8 passenger doors.\nDoor closing force measured at 120 N. Emergency release handles tested.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 07 OF 14\nSECTION 5.3: HVAC & AIR QUALITY AUDIT\nCabin air filter pressure differential: 45 Pa.\nRefrigerant R407C pressure levels stable. Temperature maintenance delta 21°C achieved.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 08 OF 14\nSECTION 6.1: AUXILIARY POWER SUPPLY (APS) INVERTER\nStatic Inverter output voltage: 415V AC 3-Phase ± 1%.\nBattery charger output: 110V DC floating charge verified.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 09 OF 14\nSECTION 7.0: AUTOMATIC TRAIN CONTROL (ATC) SIGNALLING\nCBTC trackside transponder antenna signal signal-to-noise ratio: 38 dB.\nEmergency brake application test (EB-1) triggered cleanly at 70 km/h.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 10 OF 14\nSECTION 8.2: PNEUMATIC BRAKE CYLINDER PRESSURE\nMain Reservoir Pressure: 8.5 bar.\nBrake cylinder pressure during full service brake: 3.8 bar. Leakage test rate < 0.1 bar/min.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 11 OF 14\nSECTION 9.0: PASSENGER INFORMATION SYSTEM (PIS) & CCTV\nAll 16 internal CCTV cameras recording at 1080p 30fps.\nAudio announcement clarity score: 99.4% matching Malayalam & English voice synthesis.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 12 OF 14\nSECTION 10.1: FIRE DETECTION & SUPPRESSION SYSTEM (FDSS)\nOptical smoke detectors in car 1, 2, 3 tested with aerosol test gas.\nMaster alarm triggered within 1.8 seconds. Novec 1230 discharge valves functional.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 13 OF 14\nSECTION 11.0: BOGIE FRAME MAGNETIC PARTICLE INSPECTION\nNondestructive testing (NDT) performed on bogie transom welds.\nNo micro-fractures detected. Structural integrity certified for next 50,000 km.",
                    f"KOCHI METRO RAIL LIMITED — PAGE 14 OF 14\nSECTION 12.0: FINAL SIGN-OFF & AUTHORIZATION\nChief Rolling Stock Engineer Sign-off: APPROVED FOR REVENUE SERVICE.\nWork Order #WO-KMRL-2026-9912 closed. Next overhaul due: 09 NOV 2026."
                ]

                doc.page_count = len(page_texts)

                for p_idx, p_txt in enumerate(page_texts, start=1):
                    dt = models.DocumentText(
                        document_id=d["id"],
                        page_number=p_idx,
                        extracted_text=p_txt,
                        ocr_text=p_txt,
                        ocr_status="COMPLETED",
                        extraction_method="OCR_PROCESSED"
                    )
                    db.add(dt)

                # Audit Log
                audit = models.AuditLog(
                    user_id=1,
                    action="PUBLIC_DOCUMENT_IMPORTED" if is_public else "DOCUMENT_UPLOADED",
                    entity_type="Document",
                    entity_id=d["id"],
                    log_metadata={"source_title": d["title"], "source_type": "PUBLIC_KMRL_SOURCE" if is_public else "USER_UPLOADED"}
                )
                db.add(audit)
                db.commit()

        # 5. Tasks
        tasks_data = [
            ("Replace Rake #07 Bogie Friction Pads", "Order replacement friction pads and calibrate wheel lathe at Muttom Bay-3.", "KMRL-ENG-2026-8812", "High", "TODO"),
            ("Finalize BHEL Invoice Approval", "Review GRN-4412 discrepancy logs and execute PO release for 16.43 Cr.", "KMRL-FIN-2026-3042", "Urgent", "IN_PROGRESS")
        ]
        for t_title, t_desc, doc_id, prio, status in tasks_data:
            t = db.query(models.Task).filter(models.Task.title == t_title).first()
            if not t:
                db_task = models.Task(
                    title=t_title,
                    description=t_desc,
                    document_id=doc_id,
                    priority=prio,
                    status=status,
                    due_date=datetime.datetime.utcnow() + datetime.timedelta(days=2)
                )
                db.add(db_task)
                db.commit()

        # 6. Approvals
        app_data = [
            ("KMRL-FIN-2026-3042", "Under Review", "Awaiting Executive Signoff for BHEL Disbursement"),
            ("KMRL-ENG-2026-8812", "Approved", "Wheel lathe overhaul work order released")
        ]
        for doc_id, status, comments in app_data:
            appr = db.query(models.Approval).filter(models.Approval.document_id == doc_id).first()
            if not appr:
                db_appr = models.Approval(
                    document_id=doc_id,
                    status=status,
                    comments=comments
                )
                db.add(db_appr)
                db.commit()

        # 7. Compliance Items
        comp_data = [
            ("Annual Traction Wire Tension Standard Verification", "KMRL-ENG-2026-8812", "Compliant", "Low"),
            ("Quarterly Fire Safety System Audit - Edapally Station", "KMRL-SAF-2026-019", "Audit Required", "High")
        ]
        for title, doc_id, status, risk in comp_data:
            c = db.query(models.ComplianceItem).filter(models.ComplianceItem.title == title).first()
            if not c:
                db_comp = models.ComplianceItem(
                    title=title,
                    source_document_id=doc_id,
                    status=status,
                    risk_level=risk,
                    deadline=datetime.datetime.utcnow() + datetime.timedelta(days=10)
                )
                db.add(db_comp)
                db.commit()

        print("[SUCCESS] Database Seeding Completed Successfully!")

    except Exception as e:
        print(f"[ERROR] Seeding Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
