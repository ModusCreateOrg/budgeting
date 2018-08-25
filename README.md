
To start testing run: 
npm install
npm start
npm test 

##Positive **Test:**

**Test:** Budgeting app could be opened

   **Steps:** 
   
	a.	open your app link and check results

  **Expected behavior:** Budgeting app opened and contains two tabs ‘Budget’ and ‘Reports’.
	Budget tab displayed by default 

**Test:** You able to add new record to app

   **Steps:** 
   
	a.	open your app link and check results
	b.	Select category 
	c.	Add description
	d.	Add value
	e.	Press ADD button

  **Expected behavior:** record should be added. Category, description and value should be same as you set.
	Working Balance should be updated and properly calculated 

**Test:** You able to add new record to app with empty description

   **Steps:** 
   
	a.	open your app link and check results
	b.	Select category 
	c.	Skip description filed
	d.	Add value
	e.	Press ADD button

  **Expected behavior:** record should be added. Category and value should be same as you set.
	Description should be empty 
	Working Balance should be updated and properly calculated 

**Test:** All Categories, except income, should subtract value from your balance  

   **Steps:** 
   
	a.	open your app link and check results
	b.	add each category with same value

  **Expected behavior:** all categories subtract value from balance, only income add value, check that total balance calculated properly 

**Test:** Report ‘Inflow vs Outflow’ contains total of inflow vs outflow and agenda for outflow sub categories 
   
   **Steps:** 
   
	a.	open your app link and check results
	b.	Click on ‘Reports’ tab

  **Expected behavior:** ‘Inflow vs Outflow’ report shown by default. Inflow column contains correct total inflow balance, outflow contains all categories which added to your current budget and correct total balance. Agenda contains only outflow, grouped categories and correct total balance for each category

**Test:** Report ‘Spending by Category’ contains all categories chart with agenda for each category 
   
   **Steps:** 
   
	a.	open your app link and check results
	b.	Click on ‘Reports’ tab
	c.	Click on ‘Spending by Category’ tab

  **Expected behavior:** ‘Spending by Category’ report shown. Chart contains all categories added to you budget. Agenda contains grouped categories and correct total balance for each category

**Test:** All possible reports categories are groped and contain proper total value  
   
   **Steps:** 
   
	a.	open your app link and check results
	b.	add each category with some value
	c.	Click on ‘Reports’ tab
	d.	Check chart results
	e.	Click on ‘Spending by Category’ tab
	f.	Check chart results

  **Expected behavior:** Both charts contain each category(grouped. you have added to budget and each category total balance is properly calculated

##Negative tests: 

**Test:** Description should have char limit to be well displayed  
   
   **Steps:** 
   
	a.	open your app link and check results
	b.	Select category 
	c.	Add description with 300 char’s length 
	d.	Add value
	e.	Press ADD button

  **Expected behavior:** You should see all chars you have added without cut or error message about too long description added and no record created (in case with error.

**Test:** ‘Description’ should accept any values and escape any HTML related tags or special chars   
   
   **Steps:** 
   
	a.	open your app link and check results
	b.	Select category 
	c.	Add description various combination of tags and scripts like 
	<script>...NEVER PUT UNTRUSTED DATA HERE...</script>
	Full list here…
	d.	Add value
	e.	Press ADD button

  **Expected behavior:** You should see all chars you have added all tags should be added as text witch each char you have used, noting should be missed in you record description, no math operation like 1+1 should be performed within description filed

**Test:** ‘Value’ filed should accept only digits and decimal separator like ‘.’ or ‘,’ depend on your regional settings   
   
   **Steps:** 
   
	a.	open your app link and check results
	b.	Select category 
	c.	Add value try to use any non-digit chars or any special chars including ‘+,-’
	d.	Press ADD button

  **Expected behavior:** You should not be able to add any non-digits chars. ‘ADD’ button should be disabled, no record added by pressing ‘Enter’ on keyboard

**Test:** ‘Value’ could not be empty   
   
   **Steps:** 
   
	a.	open your app link and check results
	b.	Select category 
	c.	Add description
	d.	Skip value filed
	e.	Press ADD button

  **Expected behavior:** You should not be able to add record, ‘ADD’ button should be disabled
