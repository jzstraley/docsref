---
title: Fellowship Excel Guide
author: J. Austin Straley, DO
date: 2024-04-29
---

*Appreciate Mike Thomas for his set up with distance. [Link to site][1]*

## Setup in Excel

* Find your participating specialty list on the [AAMC ERAS Directory][2]
  * For this example, I will be using Cardiology

![AAMC Website - Cardiology](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/aamc_website.png)

* Copy the list using <kbd><kbd>ctrl</kbd>+<kbd>c</kbd></kbd>

![AAMC Website - Copy](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/aamc_website_copy.png)

* Paste this into Excel using <kbd><kbd>ctrl</kbd>+<kbd>v</kbd></kbd>

![Excel Paste](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/excel_paste.png)

## Formatting

* Delete Column C and E
* Change Column A and B width to 20
* Center align everything

## Creating Headings and a Reference

* Insert 2 rows above column 1
  * One will become our headings, one will become our reference (destination)
![Insert Rows Above](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/insert_rows_above.png)

## Adding a Reference City

* Label the headings in **row 2**
  * Label E2 as "Latitude"
  * Label F2 as "Longitude"
  * Label G2 as "Population"
  * Label H2 as "Distance"
  * Label I2 as "Apply?"
* Enter your preferred destination in cell B1

![Adding Reference location](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/add_reference.png)

## Using Bing's Geography plugin

* Select your column of cities (without the Reference or headings we created above) in column 2 and navigate to "Data" where you will need to select "Geography" as seen below

![Data Tab](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/select_geography.png)

* Notice the maps beside each location
![Geography/Maps](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/maps.png)

## Adding Latitude, Longitude and Population

* Right-click on one of your cities in column 2 and select "latitude"
  * This will populate the E2 cell with a data value automatically

![Lat/Long/Pop](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/lat_long.png)

* Repeat this step for "longitude" and "population" for your cities as well as your Reference city and you should have something like below

![Example](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/lat_long.png)

## Calculating Distance

* In cell H3, copy and paste the code below and press <kbd>enter</kbd>

```text
=INT(ACOS(COS(RADIANS(90-$E$1)) * COS(RADIANS(90-E3)) + SIN(RADIANS(90-$E$1)) * SIN(RADIANS(90-E3)) * COS(RADIANS($F$1-F3))) * 3959)
```

* Select cells E3 through H3 and drag these cells down

## Filtering Fellowship Programs

* To sort your programs, select all of the Headings and select "Filter"
  * This allows you to filter by distance (See [Problem Solving (Errors)][#problem-solving-errors] below if you get #FIELD! type errors)

![Filtering](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/sorting.png)

## Excel Basic Manipulation

* Center align everything to make it pretty and color all of the text to be whatever you wish
  * I chose light blue for links and black for the rest of the cells

![Example 2](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/example_2.png)

## Conditional Formatting (Optional)

* To make this spreadsheet pretty, I'll show you how to add conditional formatting. We will be making 3 rules to make our choices for application *Pop*
* Our 1st rule will be making all "Apply?" column cells turn green if we enter <p style="color:green">"Yes"</p>

1. Find "Conditional Formatting" on the "Home" panel and select "New Rule"

![Conditional Formatting](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/new_rule.png)

2. Next, select your entire range of data including the cities as well as your "Apply?" column
   * Under our rule, choose rule type "Formula" and enter the equation
   * "=$I3="Yes"
   * Format this to be green fill with either green or black text
   * Save and apply this rule

!["Yes" Formatting](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/formatting.png)

3. Next, we'll be doing the same thing for <p style="background-color:yellow">"Maybe"</p> and <p style="color:red">"No"</p> but with the appropriate colors as below

![Colorful Example](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/colors.png)

* Now, whenever you fill the "Apply?" column, the entire row should change colors!
  * The "Apply?" field is also sortable by color, seen below, making this very useful when deciding where you want to apply

![Colorful Example](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/colors.png)

## Problem Solving (Errors)

* Occasionally you will get **#FIELD!** errors as seen below

![#FIELD! Error](/assets/images/resident-guide/how-to-series/fellowship-excel-guide/errors.png)

* These occur because Bing doesn't have a reference to pull from causing an error when pulling the data automatically
  * To resolve these, google the "latitude", "longitude", or "population" that is missing from the referenced location and paste it into the appropriate cell

## Example Excel File

* [Excel: Cards-Fellowship Example](https://www.dropbox.com/scl/fi/6ct8vbm5p4uc2k6e47xig/Cards-Excel-Fellowship.xlsx?rlkey=sgufbm68y13vc4li47w4rke8g&st=tzqwutvx&dl=0){:target="_blank"}
* <a href="https://github.com/jzstraley/docsref/blob/4c0b0f40a4d2651807e4699987db23c08a675196/docs/assets/images/resident-guide/how-to-series/fellowship-excel-guide/Cards-Excel-Fellowship.xlsx" download="Fellowship-Excel-Example">Download Location</a>

[1]: https://theexceltrainer.co.uk/calculate-distance-and-plot-on-a-map/
[2]: https://systems.aamc.org/eras/erasstats/par/index.cfm
