---
title: Physics and Instrumentation
author: J. Austin Straley, DO
date: 2026-09-08
categories:
  - Cardiology
  - Nuclear Cardiology
---

Nuclear imaging detects photons emitted from an administered radiopharmaceutical. Image quality depends on radioactive decay, photon interactions, detector performance, collimation, count statistics, and reconstruction.

## Radioactive Decay

\[
A = A_0e^{-\lambda t}
\]

\[
\lambda = \frac{0.693}{T_{1/2}}
\]

After each physical half-life, activity decreases by 50%.

- **Physical half-life:** radionuclide decay
- **Biologic half-life:** elimination from the body
- **Effective half-life:** combined physical and biologic clearance

\[
\frac{1}{T_e} =
\frac{1}{T_p} +
\frac{1}{T_b}
\]

## Photon Interactions

### Photoelectric Absorption

The photon is completely absorbed. This contributes useful detected events but also patient dose.

### Compton Scatter

The photon changes direction and loses energy. Scatter reduces contrast and may be detected in the wrong location.

Energy windows help reject scattered photons.

### Attenuation

Photon intensity decreases as photons pass through tissue:

\[
I = I_0e^{-\mu x}
\]

Breast tissue, diaphragm, obesity, and arms may produce apparent perfusion defects. CT or radionuclide transmission imaging can correct for attenuation.

## Gamma Camera

A conventional Anger camera contains:

1. Collimator
2. Scintillation crystal
3. Photomultiplier tubes
4. Positioning and energy circuits
5. Computer and reconstruction software

The sodium iodide crystal converts gamma photons into light. Photomultiplier tubes convert the light into electrical signals and estimate the location and energy of each event.

## Collimators

Collimators accept photons traveling in selected directions.

| Collimator | Typical use |
|---|---|
| Low-energy high-resolution | Tc-99m cardiac imaging |
| Low-energy general-purpose | Higher sensitivity with less resolution |
| Medium-energy | Higher-energy radionuclides |
| Parallel-hole | Routine planar and SPECT imaging |

Higher resolution generally requires lower sensitivity. The collimator must match the photon energy of the radionuclide.

## SPECT

SPECT cameras rotate around the patient and acquire multiple projections. Reconstruction creates short-axis, vertical long-axis, and horizontal long-axis images.

Modern systems may use:

- Dual detector cameras
- Solid-state cadmium-zinc-telluride detectors
- Iterative reconstruction
- Resolution recovery
- CT attenuation correction

CZT systems provide greater sensitivity and may permit shorter acquisition times or lower administered activity.

## PET

PET radionuclides emit positrons. A positron interacts with an electron, producing two 511-keV photons traveling approximately 180° apart.

Coincidence detection localizes the event without a physical collimator.

Advantages include:

- Higher sensitivity and resolution
- Routine attenuation correction
- Short acquisition time
- Quantitative myocardial blood flow
- Improved detection of multivessel disease

### PET Corrections

Quantitative PET requires correction for:

- Attenuation
- Scatter
- Random coincidences
- Dead time
- Radioactive decay
- Patient motion

Misregistration between PET and CT can create false perfusion defects.

## Image Reconstruction

### Filtered Back Projection

Fast but more sensitive to noise and streak artifact.

### Iterative Reconstruction

Methods such as OSEM repeatedly compare estimated and measured data.

Advantages include:

- Improved noise control
- Incorporation of attenuation and resolution correction
- Better performance with lower-count studies

Excessive smoothing may conceal small defects; insufficient smoothing increases noise.

## Count Statistics

Radioactive counts follow Poisson statistics:

\[
\text{Noise} \propto \sqrt{N}
\]

\[
\text{Signal-to-noise ratio} \propto \sqrt{N}
\]

Obtaining four times as many counts approximately doubles the signal-to-noise ratio.

Low counts may result from insufficient activity, obesity, short acquisition, infiltrated injection, or detector malfunction.

## Quality Control

Routine quality control includes:

- Energy peaking
- Detector uniformity
- Center-of-rotation testing
- Spatial resolution
- Sensitivity
- SPECT reconstruction checks
- PET normalization and calibration
- PET/CT or SPECT/CT alignment
- Rb-82 generator breakthrough testing when applicable

Quality-control failure should be corrected before clinical imaging continues.

## Key Points

- Scatter and attenuation reduce image contrast.
- Collimation trades sensitivity for spatial resolution.
- PET uses coincidence detection rather than physical collimation.
- More counts improve signal-to-noise by the square-root relationship.
- Attenuation-correction misregistration may create new artifacts.
- Review quality-control results before attributing an abnormality to the patient.

## References

1. [SPECT Instrumentation and Quality Assurance — ASNC][1]
2. [ASNC Nuclear Cardiology Imaging Guidelines][2]
3. [Cardiac SPECT/CT and PET/CT Guideline — SNMMI/ASNC/SCCT][3]

[1]: https://www.asnc.org/wp-content/uploads/2024/05/PPSPECT081511.pdf
[2]: https://www.asnc.org/resource/asnc-imaging-guidelines-for-nuclear-cardiology-procedures/
[3]: https://www.asnc.org/resource/snmmi-asnc-scct-guideline-for-cardiac-spect-ct-and-pet-ct-1-0/