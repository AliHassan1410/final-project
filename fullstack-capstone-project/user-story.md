# User Story Template

## Gift Shop — Product Listing

**Title:** Browse available gifts

**As a** shopper
**I want to** view a list of all gifts available in the shop
**So that** I can decide what to buy

### Acceptance Criteria

1. Given I am on the homepage, when the page loads, then I see a list of gift items with their name, category, and price.
2. Given I select a category filter, when the filter is applied, then only gifts in that category are shown.
3. Given I click on a gift, when the detail page loads, then I see the gift's full description, condition, and price.

### Priority
High

### Story Points
3

---

## Gift Shop — Account Registration

**Title:** Create a new account

**As a** new visitor
**I want to** register for an account with my email and password
**So that** I can save my details and log in later

### Acceptance Criteria

1. Given I am on the registration page, when I submit a unique email and a password, then my account is created and I receive an authentication token.
2. Given I try to register with an email that already exists, when I submit the form, then I see an error message and no duplicate account is created.

### Priority
High

### Story Points
2

---

## Gift Shop — Account Login

**Title:** Log in to an existing account

**As a** registered user
**I want to** log in with my email and password
**So that** I can access my account and make purchases

### Acceptance Criteria

1. Given I am a registered user, when I submit the correct email and password, then I receive an authentication token and am logged in.
2. Given I submit an incorrect password, when I try to log in, then I see an error message and am not logged in.

### Priority
High

### Story Points
2

---

## Gift Shop — Search

**Title:** Search for a gift by name or category

**As a** shopper
**I want to** search for gifts by keyword or category
**So that** I can quickly find something specific

### Acceptance Criteria

1. Given I enter a search term, when I submit the search, then I see only gifts whose name matches the term.
2. Given I select a category, when I search, then results are filtered to that category.

### Priority
Medium

### Story Points
2
