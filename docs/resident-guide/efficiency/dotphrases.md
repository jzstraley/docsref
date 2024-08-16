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

![Shortcut 1.1](/docs/assets/images/internguidepages/1.2/1.2.2-picture1.png)

## Diabetes

### .diabetesplan_inpatient

``` markdown
- Home regimen: [insert medications, insulin #U & frequency].
- A1c: 
- [Well controlled currently.]
- Holding home meds.
- Currently NPO.
- Plan: [Will start SSI, Moderate Correction factor.]
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

## Heart Failure

### .aechf

``` markdown
- History of [HFrEF] w/LVEF [ ] on TTE: [ ].
- Home Regimen: [Current medical therapy].
- Evidence of acute exacerbation with [ ]
- [No obvious inciting incident, mild trop leak with AKI that improved with diuresis suggestive of cardiorenal process].
- No adherence issues suspected, consider gut wall edema with poor absorption to be reason for readmission.
- Admit to medicine service to intermediate care given risk of decompensation in the setting of known heart failure.
- Obtain new TTE to r/o new structural cause.
- [Holding GDMT].
- Lasix 40mg IV qAM, prn qPM depending on UOP. Goal UOP >300cc out @ 2h.
- Monitor I/Os, Obtain daily standing weights.
- Restrict fluid intake to <2L daily.
- Repeat BMP and Mg in the morning.
- CHF powerplan in, will need close f/u with CHF clinic once outpatient.
```

### .heartfailure

``` markdown
- NYHA Class [ ] ACC/AHA Stage [ ] [HFrEF] w/LVEF [ ] on TTE: [ ].
- Current Regimen: [Current medical therapy].
- [Continue current regimen].
```

## AKI

### .aki

``` markdown
- [Non-Oliguric] Stage [ ] AKI w/o underlying CKD with baseline creatinine of [ ].
- [Likely 2/2 ATN]
- [Creatinine improved today to]
- [Plan to monitor I/Os. Will repeat labs in the morning for change.]
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

## CAD

### .cad

``` markdown
- Primary Cardiologist: [ ].
- History of CAD as seen on [CT/Cath], [without] previous intervention, currently [asymptomatic.]
- Last imaging/testing: [ ].
- EKG: [No current evidence of ischemia.]
- Currently on: [All should be on statin, RR of death decreased by 24%, stroke by 31%, need for CABG/Angioplasty by 27%; ASA for secondary prevention, increased risk of thromboembolic events if stopped, 70% within 7-10 days]
- Discussed risk factor modification as tolerable (HTN, HLD, Smoking, Diabetes).
```

## Clinic

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
- 1) You were admitted to the hospital for: Heart Attack/Stent Placement.
- 2) What was done during your admission:
- 3) What you need to do:
      - Please follow up with your PCP within 1 week of discharge.
      - Please follow-up with specialists as listed above.
      - Take your aspirin and antiplatelet (Plavix, Brilinta, Effient) every day, without missing any doses.
      - Return to the Emergency Room if you experience:
                - New or worsening chest pain
                - Shortness of breath, increased leg swelling
                - Dizziness, seizures, or loss of consciousness
- 4) Why it is important:
      - Taking your Antiplatelet and Aspirin keep your stent open.
      - If you have any trouble getting your medicine, please call cardiology office.
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
CV: Normal rate, regular rhythm, without murmurs on auscultation
GI: Soft, non-tender, non-distended, without obvious masses, w/o rigidity or guarding
MSK: Extremities non-tender to palpation, without LE edema bilaterally
Skin: Skin is warm, dry, and pale
Heme/Lymph/Imm: Without obvious bleeding, without significant bruising
Psychiatric: Cooperative, appropriate mood and affect, normal judgement
Neurologic: Awake and oriented X4
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
- Suspected to be [Orthostatic] syncope due to [Prodrome], [Clean] EKG, [w/] RF present.
- Low suspicion for PE (if able, PERC rule[ ])
- Orthostatic Vital Signs: [ ]
- CTH: [ ]
- Admit to Telemetry to monitor for arrhythmia.
- Continue conservative measures.
```

## Under Construction

1. .jsappointment
2. .jsclinic_header
3. .jscodenote
4. .jscodestatus
5. .jsconsult_orders
6. .jscontrolrx_hpi
7. .jscontrolrx_plan
8. .jsdeathpronouncement
9. .jsdiabetes_insulintitration
10. .jsdiabeteslabs
11. .jsdischarge_dates
12. .jsdischargeQIPS
13. .jsimaging_radiology_report
14. .jsmedicareAWV
15. .jspcp
16. .jsphonemsg
17. .jsprevent_female
18. .jsprevent_male
19. .jsproblembased
20. .jsssi
21. .jstcm
22. .jstelevisitaudio
23. .jstelevisitvideo
24. .jstransfusions
25. .jsventsettingsonly
