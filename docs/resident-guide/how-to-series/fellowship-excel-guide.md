---
title: Fellowship Excel Guide
author: J. Austin Straley, DO
date: 2024-04-29
---

*Appreciate Mike Thomas for his set up with distance. [Link to site][1]*

## Start

* Find your participating specialty list on the [AAMC ERAS Directory][2]
  * For this example, I will be using Cardiology
* Copy the list using <kbd><kbd>ctrl</kbd>+<kbd>c</kbd></kbd> and paste this into Excel using <kbd><kbd>ctrl</kbd>+<kbd>v</kbd></kbd>
* Delete Column C and E
* Change Column A and B width to 20
  * Screen Shot 2024-04-29 at 8.59.57 PM
* Center align everything
* Insert 2 rows above column 1
  * Screen Shot 2024-04-29 at 9.02.53 PM
    * One will become our headings, one will become our reference (destination)
* Label the headings in row 2
  * Label E2 as "Latitude"
  * Label F2 as "Longitude"
  * Label G2 as "Population"
  * Label H2 as "Distance"
  * Label I2 as "Apply?"
* Enter your preferred destination in row B1
  * Screen Shot 2024-04-29 at 9.08.56 PM
* Select your column of cities and navigate to "Data" where you will need to select "Geography"
* Copy the code below and paste in <class="--md-code-hl-number-color">H3<>

```text
=INT(ACOS(COS(RADIANS(90-$E$1)) * COS(RADIANS(90-E3)) + SIN(RADIANS(90-$E$1)) * SIN(RADIANS(90-E3)) * COS(RADIANS($F$1-F3))) * 3959)
```

## Finding Fellowship Programs

:   !!! note
    
    Make sure to preserve links

## Excel Basic Manipulation

## Utilizing Excel Geography Mapping

## Calculating Distance

## Color Formatting (Optional)

[1]: https://theexceltrainer.co.uk/calculate-distance-and-plot-on-a-map/
[2]: https://systems.aamc.org/eras/erasstats/par/index.cfm
