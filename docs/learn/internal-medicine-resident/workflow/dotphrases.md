---
title: Dotphrases
author: J. Austin Straley, DO
date: 2024-05-13
---

- Dotphrases are autotext commands you can use to quickly insert text or data.
- Data can be imported from the chart in the form of "Tokens" or "Smart Templates"
  - I will denote these with { } in this guide. Typing the text between these will not work. You must select the appropriate token
- If used correctly, they can literally save your life (and maybe your patient's)
  - In the menu bar, find the "Auto Text Copy Utility"
  - Search "Straley, James" on the left hand side
  - Copy the following dotphrases but rename them with your own initials
    - Ex. For Dr. Ball, he could name them any one of the following ways:
      - .abappointment
      - /docsabappointment

![Shortcut 1.1](/assets/images/internguidepages/1.2/1.2.2-picture1.png)

## Afib

### .afib

``` markdown
- [New-Onset][Chronic] atrial fibrillation, suspected to be paroxysmal.
- CHA2DS2-VASc: [(CHF/LVEF<=40, HTN, Age, DM, Stroke/TIA/VTE, Vascular Disease, Female)]
- [Rate][Rhythm] controlled on [Metoprolol][Amiodarone] at home with goal HR <110.
- Anticoagulated with [Eliquis][Heparin Drip], continue.
- Recommend potassium of >4.0 and magnesium of >2.0.
- Continue rate control and home AC.
- Monitor on telemetry for now.
```

- Optional

``` markdown
- Paroxysmal: Start and stop within 7 days of onset, ≥2 episodes
- Early Persistent: ≥2 episodes, each lasts >7 days, <3 months
- Long-standing Persistent: Continuous >3 months
- Permanent: Agreed decision to abandon rhythm control 

- Will need PFTs yearly, TSH/LFTs q3-6 months with PCP upon discharge.
- LFT's/TSH for AAD management Q6 months.
- Advised on annual CXRs/Dilated Eye Exams.
- Recommend baseline and routine PFTs for symptoms or reduced DLCO.
- Advised on limited sun exposure and liberal use of sunscreen while on Amiodarone.
- RTC in 6 months. 

[(Eliquis LD (2/3): Age >=80, <=60kg, Creatinine >/1.5), (Xarelto: CrCl <15 or Dialysis)]
- Recommend 30 day monitor (MCT Mobile Cardiac Telemetry) at discharge.
​​​​​​​- Recommend potassium of >4.0 and magnesium of >2.0.
- Discontinue telemetry if no events over the next 24 hours.
```

## AKI

### .aki

``` markdown
- [Non-Oliguric] Stage [_] AKI w/o underlying CKD with baseline creatinine of [_].
- [Likely 2/2 ATN]
- [Creatinine improved today to]
- [Plan to monitor I/Os. Will repeat labs in the morning for change.]
- Consider nephrology consultation given plan for contrast administration and risk of worsening AKI.

- [Non-oliguric / Oliguric] Stage [_] AKI without known underlying CKD, baseline creatinine [_].
- Suspect etiology [likely 2/2 contrast exposure / ATN from hemodynamic insult / prerenal from diuresis].
- Creatinine today [_], trending [down/up] from [_].
- Will continue to monitor renal labs and strict I/Os.
- [Hold ACEi/ARB/ARNI, MRA, SGLT2i] pending renal recovery.
- Minimize further nephrotoxic exposures.
- If contrast is required for LHC/CTA, will optimize pre- and post-hydration strategy.
[- Recommend nephrology consultation given increased risk of worsening AKI.]
```

### .aki2ckd

``` markdown
- [Non-Oliguric] Stage [ ] AKI on CKD Stage [III] with baseline creatinine of [ ].
- [Pt follows w/ ]
- [Plan for ]
```

### .ckd

``` markdown
- [Non-Oliguric] CKD Stage [ ] with baseline creatinine of [ ].
- Additional co-morbidities: [T2DM/HTN]
- Pt follows w/ [ ].
- Plan to monitor electrolytes closely, renal diet, avoid volume overload.
- Will get Urine Microalbumin/Cr Ratio, Urine Protein/Cr Ratio, Vitamin D, Iron w/Ferritin, PTH, and Phosphorous next visit.
```

## Anemia

### .anemia

``` markdown
- [Acute/Chronic] [Normocytic/Macrocytic/Microcytic] Anemia w/baseline hemoglobin of [ ].
- No overt signs of bleeding on exam.
- Will workup with LDH, RC, Peripheral Smear.
```

## Arrest

### .arrest

``` markdown
- Initial rhythm [VF][pulseless VT][PEA][asystole][bradycardia].
- Likely 2/2 [(cardiac, traumatic, drug overdose, drowning, electrocution, asphyxial)].
- Continue to assess for possible reversible causes (H's & T's).
- EKG [without evidence of ischemia][concerning for ischemia]; [low][moderate][high] suspicion for cardiac etiology.
- TTE ordered for structural and functional assessment.
- Troponin elevation favored to reflect myocardial injury, continue ICU monitoring (telemetry, invasive support as indicated).
- Will consider ischemic evaluation once stabilized.
[- No plan for ischemic evaluation at this time. Can consider risk stratification once stable on the floor.]
```

## CAD

### .cad

``` markdown
- History of CAD as seen on [CT/Cath], [without] previous intervention, currently [asymptomatic.]
- EKG without ischemic changes.
- Recommend LDL-c <70, ideally <55. Currently[ not at][ not at ideal][ at] goal.
- Continue[ atorvastatin][ rosuvastatin][ 40mg][ 80mg] daily.
- Emphasize aggressive risk factor management (HTN, HLD, Smoking, Diabetes).
```

## Clinic

### .clinic_header_specialty

``` markdown
DOS: [ Current Date ]
PCP: [ Primary Care Physician ]
Referring: [ Primary Care Physician ]
Reason for Referral: [Chest Pain]
Primary Cardiologist: Establishing Care w/Dr. _.
```

### .clinic_plan_f/u

``` markdown
Follow-up Appointment in: [3 months for ][ ]
Interval Items: [Outpatient Ultrasound]
Next visit: [CBC/CMP]

*********** End of Note ***********

- First Last Name, MD/DO, IM PGY - 1/2/3 -

**** Attending addenda to follow ****
```

## COPD

### .copd_outpatient

``` markdown
- COPD not on home oxygen, follows w/Dr. [ ] outpatient.
- Continues to smoke 15 cigarettes/day.
- On Symbicort, Spiriva.
- LDCT will be ordered for January, previously [normal].
- [No] interest in smoking cessation at this time.
- Continue home inhalers.
```

## Diabetes

### .diabetesplan_inpatient

``` markdown
- Home regimen: [insert medications, insulin #U & frequency].
- A1c: [ ]
- [Well controlled currently.]
- Holding home meds.
- Currently NPO.
- Plan: [Start SSI, Moderate Correction factor.]
```

### .diabetesplan_outpatient

``` markdown
- With complications: [Microalbuminuria, CKD, ulcers, retinopathy, recurrent infections]
- Current regimen: [insert medications, insulin #U & frequency]
- Most recent A1c: [value & date, controlled/uncontrolled]
- Last ophthalmology/retinal exam: [date]
- Last foot exam/podiatrist appt: [date]
- Currently well controlled on current regimen.
- Plan: [Continue current regimen]
```

## Discharge Instructions

### .dischargeinstructions_hf

``` markdown
- 1) You were admitted to the hospital for: Exacerbation of Heart Failure
- 2) What was done during your admission:
- 3) What you need to do:
      - Please follow up with your PCP within 1 week of discharge.
      - Please follow-up with specialists as listed above.
      - Please take your medications as instructed above.
      - Return to the Emergency Room if you experience:
                - New or worsening chest pain
                - Shortness of breath, increased leg swelling
                - Dizziness, seizures, or loss of consciousness
- 4) Why it is important:
      - [ ]
- 5) Additional Instructions
      - Low salt, low cholesterol/fat diet, and restrict fluid intake as directed by your doctor.
      - Gradually increase your activity, as tolerable; schedule rest breaks as needed.
      - Weigh yourself daily on same scale in the morning; bring your weight record to your follow-up appointment.
      - If you gain 2 or more pounds in one day or 5 or more pounds in one week, return to the hospital.
```

### .dischargeinstructions_stent

``` markdown
- 1) You were admitted to the hospital for: Chest Pain.
- 2) What was done during your admission: Left heart Catheterization and Coronary Artery Stent Placement.
- 3) What you need to do:
      - Please follow up with your PCP within 1 week of discharge.
      - Please follow up with the Acute MI clinic in 1-2 weeks.
      - Please follow up with Dr. [_] in 12 weeks (Cardiology).
      - Please follow up with the CHF clinic as directed.
      - Take your Aspirin 81mg and [Brilinta] every day, without missing any doses.
      - Return to the Emergency Room if you experience:
                - New or worsening chest pain
                - Shortness of breath, increased leg swelling
                - Dizziness, seizures, or loss of consciousness
- 4) Why it is important:
      - Taking your Aspirin 81mg and [Brilinta] keep your stent open.
      - If you have any trouble getting your medicine, please call the cardiology office.
- 5) Additional Instructions
      - No lifting over 10lbs x 10 days. No driving x 3 days. 
      - No tubs baths, swimming pools, or hot tubs x 7 days. OK to shower. 
      - If you notice any bleeding from the cath site, hold pressure above the site and call 911.
      - Gradually increase your activity, as tolerable; schedule rest breaks as needed.
      - Weigh yourself daily on same scale in the morning; bring your weight record to your follow-up appointment.
      - If you gain 2 or more pounds in one day or 5 or more pounds in one week, return to the hospital. 
```

## ED

### .edchestpain

``` markdown
Acute coronary syndrome: No symptoms suggestive of acute coronary syndrome such as radiation of pain, associated diaphoresis, nausea, vomiting, or shortness of breath. Pulmonary embolism: No recent immobilization or surgery, no leg pain/swelling, no history of venous thromboembolic disease, pain is non-pleuritic and not associated with hemoptysis. Aortic dissection: No sudden onset of severe pain, no history of connective tissue disorder, no pulse deficits or blood pressure differentials. Pneumothorax: No sudden onset of dyspnea, no history of trauma, no decreased breath sounds on examination. Esophageal rupture: No history of severe vomiting, no subcutaneous emphysema on examination. Cardiac tamponade: No hypotension, no jugular venous distension, no muffled heart sounds.
```

### .edlegswelling

``` markdown
Key diagnoses considered for leg swelling include deep vein thrombosis (DVT), cellulitis, congestive heart failure (CHF), and lymphedema. DVT is less likely given the absence of recent immobilization or surgery, no history of venous thromboembolic disease, and no associated pain or tenderness. Cellulitis is less likely given the absence of skin warmth, erythema, or tenderness. CHF is less likely given the absence of associated symptoms such as dyspnea, orthopnea, or paroxysmal nocturnal dyspnea. Lymphedema is less likely given the absence of chronicity, non-pitting nature of the swelling, and absence of associated skin changes.
```

### .edsob

``` markdown
Considered life-threatening diagnoses for shortness of breath: Acute coronary syndrome - no chest pain, no radiation, no associated symptoms suggestive of ACS. Pulmonary embolism - no recent immobilization or surgery, no leg pain/swelling, no history of venous thromboembolic disease, no hemoptysis. Pneumothorax - no sudden onset, no pleuritic chest pain, no history of trauma. Acute heart failure - no orthopnea, no paroxysmal nocturnal dyspnea, no leg swelling. Acute severe asthma/COPD exacerbation - no wheezing, no history of obstructive lung disease. Tension pneumothorax - no trauma, no severe or worsening dyspnea, no tracheal deviation. Anaphylaxis - no rash, no facial swelling, no recent exposure to allergens.
```

## GERD

### .gerd_plan

``` markdown
- No alarm features present.
- Will evaluate for H Pylori with stool antigen test (must be off PPI prior to testing) given that dyspepsia is predominant symptom.
- Intermittent symptoms: Antacids or H2 blocker
- If persistent symptoms despite lifestyle modifications, will trial PPI.
- Daily symptoms: Omeprazole, Esomeprazole, Pantoprazole 8 week trial, taken 30-60 minutes before meal (dosing: omeprazole 10mg once daily, can increase to 20mg daily in 4-8 weeks; pantoprazole 20mg once daily, can increase to 40mg daily in 4-8 weeks. Advise lowest effective dose)
- Advised lifestyle modifications including avoidance of smoking, drinking, specific triggering foods, weight loss, avoiding NSAIDS, and avoiding lying down for 2-3 hours after eating.
```

## Heart Failure

### .aechf_inpatient

``` markdown
- Acute Exacerbation of [HFrEF][HFpEF][HFmrEF]  w/previous LVEF [_] on TTE [_].
- New LVEF [_] on TTE [_] with evidence of decompensation on presentation.

- Monitor I/Os, UOP, daily weights, fluid restriction <2L daily.
- CHF powerplan in, will need close f/u with CHF clinic once outpatient.
```

- Optional

``` markdown
- HFrEF, HFmrEF, HFimpEF, HFpEF
- Euvolemic on exam today, clinically improving.
- Volume overloaded on exam today evidenced by [_].
- Optimizing volume status while titrating GDMT as BP allows.
- Holding GDMT due to [_].

- Check iron panel for iron deficiency.
- Iron deficient based on labs, starting Venofer 300mg IV daily for 3 days.
- Continue [Losartan 25mg daily], Metoprolol [tartrate 50mg BID], [Spironolactone 25mg daily], [Jardiance 10mg daily].
- No obvious inciting incident, will need ischemic w/u prior to discharge.
- [Optimizing volume status while titrating GDMT as BP allows].
- Ischemic w/u pending resolution of AECHF. Recommend prior to discharge.
- Needs to be switched to Metoprolol Succinate prior to discharge.
- No adherence issues suspected, consider gut wall edema with poor absorption to be reason for readmission.
- Will avoid heavy diuresis given known aortic valve repair and moderate to severe mitral regurgitation.
- Continue Lasix 40mg IV BID; target UOP >300cc within 2h of each dose.
- Titrate dose to meet goal and transition to oral meds once euvolemic.
- Recommend adding SGLT-2 if no contraindication prior to discharge​​​​​​​.
- CHF powerplan pending floor downgrade, will need close f/u with CHF clinic once outpatient. 
```

### .heartfailure_stable

``` markdown
- NYHA Class [II-III] ACC/AHA Stage [C] [HFrEF][HFmrEF][HFpEF] w/LVEF [_] on TTE [_].
- Euvolemic on exam, no evidence of acute exacerbation.
- Continue current regimen.
- CHF powerplan in, will need close f/u with CHF clinic once outpatient.
```

- Optional

``` markdown
- Euvolemic on exam, acute exacerbation resolved.
- Check iron panel for iron deficiency.
- Iron deficient based on labs, starting Venofer 300mg IV daily for 3 days.
- Holding GDMT due to [_].
- Currently on [Losartan 25mg daily], Metoprolol [tartrate 50mg BID], [Spironolactone 25mg daily], [Jardiance 10mg daily].
- CHF powerplan pending floor downgrade, will need close f/u with CHF clinic once outpatient.  
- Needs to be switched to Metoprolol Succinate prior to discharge.
- No adherence issues suspected, consider gut wall edema with poor absorption to be reason for readmission.
- Will avoid heavy diuresis given known aortic valve repair and moderate to severe mitral regurgitation.
- Continue Lasix 40mg IV BID; target UOP >300cc within 2h of each dose.
- Titrate dose to meet goal and transition to oral meds once euvolemic.
- Recommend adding SGLT-2 if no contraindication prior to discharge​​​​​​​.
- CHF powerplan pending floor downgrade, will need close f/u with CHF clinic once outpatient.
```

## Hypertension

### .htn_outpatient

``` markdown
- Patient [has] BP cuff at home, checks BP [daily].
- Compliant with current regimen of: [Amlodipine 10mg daily.]
- Goal BP < [120/80, 130/80, 140/90], currently [uncontrolled/controlled].
- Plan: [ ]
- Pt educated on lowering salt intake, weight loss, and increasing exercise.
```

## INR Clinic

### .inr_plan

``` markdown
- Indication: [Mechanical Aortic Valve].
- Goal INR: [2.5-3.5].
- INR & Source (venipuncture): [ ].
- Daily dose: [4mg and 6mg on alternating days].
- Total weekly dose: [35mg average per week].
- Next INR: [1 week].
- Plan: [Will decrease to MF 6mg, remaining days 4mg for a total of 32mg weekly. Pt provided extensive education on compliance with INRs w/Jodie prior to appointment today].
```

## Physical Exam

### .pe_quick

``` markdown
Constitutional: Alert, no acute distress, appears stated age
Eye: Normal conjunctiva, without scleral icterus
HENT: Atraumatic, hearing grossly intact, without nasal discharge, moist oral mucosa, grossly average neck circumference
Resp: Clear to auscultation bilaterally, non-labored respiration on room air, without rales/rhonchi, without wheezing
CV: Normal rate, regular rhythm, without murmur on auscultation
GI: Soft, non-tender, non-distended, without obvious masses
MSK: Extremities non-tender to palpation, without LE edema bilaterally
Skin: Skin is warm, dry, and pale
Heme/Lymph/Imm: Without obvious bleeding, without significant bruising
Psychiatric: Cooperative, appropriate mood and affect
Neurologic: Awake, moving all 4 extremities, oriented X4
```

## Pulmonary Hypertension

``` markdown
- TTE (_) w/RVSP _ mmHg, mild systolic RV dysfunction and moderate TR.
- High probability given RVSP >50 mmHg, likely severe given RVSP >60 mmHg.
- Given co-morbidities and age, pt is a poor candidate for further evaluation with RHC.
- In the absence of invasive confirmation, goal is optimization of volume status with diuretics.
- Continue to treat underlying CHF, supplemental O2 as needed.
```

## Obesity

### .obesity_outpatient

``` markdown
- Body Mass Index Measured: [ ] kg/m2.
- Class [III] Obesity w/BMI of [ ].
- Counseled patient on increasing exercise to at least 150 minutes weekly, improving diet with increased vegetables/fruits, and decreasing total calorie by 500-750 kcal/day.
- Pt not currently interested GLP-1s for weight loss, will re-address next visit.
- Would like to be referred to bariatric center for her weight.
- Previously trialed Ozempic but feels she did not lose any weight, made her feel unwell.
- Referral sent.
```

## ROS

### .ros_quick

``` markdown
Constitutional: Denies fever, chills, fatigue
HEENT: Denies trauma, headache, dizziness
Resp: Denies shortness of breath, cough, sputum production, wheezing, labored breathing, dyspnea on exertion, orthopnea
CV: Denies chest pain, palpitations, peripheral edema, syncope
GI: Denies nausea, vomiting, abdominal pain, diarrhea, constipation
GU: Denies dysuria, discharge, change in frequency
Endo: Denies polydipsia, polyuria
MSK: Denies back pain, neck pain, joint pain, muscle pain
Integumentary: Denies dryness, itching, rash
Neuro: Denies numbness, tingling, weakness, LOC
Heme: Denies history of excessive bleeding, bruising
Psych: Denies anxiety, problems sleeping
```

## Syncope

### .syncope

``` markdown
- Syncope, likely [vasovagal][orthostatic][cardiogenic][other] etiology. 
- Orthostatic vitals: Supine [_], Sitting [_], Standing [_]; [positive/negative]. 
- EKG: [normal][abnormal; see details]. 
- CT Head: [_] (if obtained).
- Monitor on telemetry. 
- Low suspicion for PE, seizure, stroke, or structural neurologic event at this time.  
- Continue conservative measures with oral hydration, compression stockings, fall precautions. 
```

- Optional

``` markdown
- Presentation consistent with reflex syncope given prodrome and normal EKG
- Episode consistent with orthostatic syncope related to volume depletion and medication effect
- Findings concerning for cardiogenic syncope given exertional onset and abnormal EKG
- Neurologic and metabolic mimics such as seizure, TIA, and hypoglycemia considered less likely
- Repeat orthostatic vitals obtained to confirm diagnosis
- TTE ordered to evaluate for structural heart disease
- Ambulatory rhythm monitoring (Holter, Zio, or MCOT) arranged for recurrent or unexplained episodes
- CCTA or MPI pursued to evaluate for ischemia when indicated
- Recommend conservative management with oral hydration, compression stockings, fall precautions
- Hydration and salt repletion encouraged to reduce recurrence
- Medication regimen reviewed for orthostasis; discontinue doxazosin and switch lisinopril to losartan
- Spironolactone initiated for blood pressure control with lower risk of orthostasis
- Fall precautions reinforced during hospitalization
- Return precautions provided for chest pain, palpitations, or neurologic symptoms
- Driving restrictions reviewed given diagnosis of syncope
- Given prodrome, normal EKG, and orthostatic findings, low risk for MACE
- Given abnormal EKG and exertional presentation, higher risk for MACE
- Will have patient f/u in Cardiology clinic in [4-6] weeks to reassess
- F/u with primary cardiologist in outpatient setting in [4-6] weeks
- Electrophysiology referral placed for suspected arrhythmic etiology.
- POCUS performed to assess IVC, ventricular function, and pericardial effusion.
- Labs reviewed for contributors including CBC, BMP, glucose, and troponin; abnormalities addressed.
- Education provided on hydration strategies, trigger avoidance, and counterpressure maneuvers.
- Antihypertensive regimen simplified to minimize orthostasis risk.
```

## Under Construction

1. .appointment
2. .clinic_header
3. .codenote
4. .codestatus
5. .consult_orders
6. .controlrx_hpi
7. .controlrx_plan
8. .deathpronouncement
9. .diabetes_insulintitration
10. .diabeteslabs
11. .discharge_dates
12. .dischargeQIPS
13. .imaging_radiology_report
14. .medicareAWV
15. .pcp
16. .phonemsg
17. .prevent_female
18. .prevent_male
19. .problembased
20. .ssi
21. .tcm
22. .televisitaudio
23. .televisitvideo
24. .transfusions
25. .ventsettingsonly
