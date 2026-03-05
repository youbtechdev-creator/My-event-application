
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** MY NEW APP
- **Date:** 2026-03-05
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Admin login with valid credentials redirects to Admin Dashboard
- **Test Code:** [TC001_Admin_login_with_valid_credentials_redirects_to_Admin_Dashboard.py](./TC001_Admin_login_with_valid_credentials_redirects_to_Admin_Dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/13f045b0-7d06-4598-a65b-583e4d93bce0
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Admin login fails with incorrect email and incorrect password
- **Test Code:** [TC002_Admin_login_fails_with_incorrect_email_and_incorrect_password.py](./TC002_Admin_login_fails_with_incorrect_email_and_incorrect_password.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/617ef147-69f4-4726-a3ae-02aaee204cec
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Admin login fails with correct email and incorrect password
- **Test Code:** [TC003_Admin_login_fails_with_correct_email_and_incorrect_password.py](./TC003_Admin_login_fails_with_correct_email_and_incorrect_password.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/21179a11-5263-4478-bfa2-5c585e6ed52b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Home page shows a list of event cards with key summary fields
- **Test Code:** [TC008_Home_page_shows_a_list_of_event_cards_with_key_summary_fields.py](./TC008_Home_page_shows_a_list_of_event_cards_with_key_summary_fields.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/232b733b-36f0-4102-808c-4ae196561369
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Open event details from the first event card
- **Test Code:** [TC009_Open_event_details_from_the_first_event_card.py](./TC009_Open_event_details_from_the_first_event_card.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/72e5ec07-7fb7-4332-8efb-dfb0299bc1f3
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Home page handles empty events state gracefully
- **Test Code:** [TC012_Home_page_handles_empty_events_state_gracefully.py](./TC012_Home_page_handles_empty_events_state_gracefully.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Empty-state message not found on page: event cards are displayed instead of an empty list.
- 'No events' text not found on the page.
- 'available' text (as part of an empty-state message) not found on the page.
- Page contains multiple event-card elements (e.g., event-card-1 is present), so a zero-events state could not be reached to validate the empty-state behavior.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/984eebb1-4b65-407f-9bf4-f6d89304b003
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 View event details content on Event Details page
- **Test Code:** [TC014_View_event_details_content_on_Event_Details_page.py](./TC014_View_event_details_content_on_Event_Details_page.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Event list page is blank and contains 0 interactive elements, preventing interaction with the UI.
- Click attempts to open the first event failed (clicks on 'View & Join' buttons at indexes 148 and 781 were not interactable or stale).
- Event Details page could not be reached, so core event information ('Location', 'Registered') could not be verified.
- Join form fields ('Full Name', 'Email Address') could not be located or verified because the page did not render.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/60e6e0e4-55db-4fe1-a5c8-aaf5b6f3227c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Join event successfully with valid Full Name and Email Address
- **Test Code:** [TC015_Join_event_successfully_with_valid_Full_Name_and_Email_Address.py](./TC015_Join_event_successfully_with_valid_Full_Name_and_Email_Address.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/72967f1a-9329-45b9-a3ab-78f0932fbb2a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Email validation error when Email Address is left empty
- **Test Code:** [TC016_Email_validation_error_when_Email_Address_is_left_empty.py](./TC016_Email_validation_error_when_Email_Address_is_left_empty.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/c5b143da-232c-48c2-9e84-c08929d88f59
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017 Email validation error when Email Address format is invalid
- **Test Code:** [TC017_Email_validation_error_when_Email_Address_format_is_invalid.py](./TC017_Email_validation_error_when_Email_Address_format_is_invalid.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/d317126e-1188-4e82-9a87-c08c02175702
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC021 Admin can access dashboard and see key UI sections
- **Test Code:** [TC021_Admin_can_access_dashboard_and_see_key_UI_sections.py](./TC021_Admin_can_access_dashboard_and_see_key_UI_sections.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Login page did not render: the page displays only a loading spinner and no login form elements.
- Username/email input not found on /admin/login.
- Password input not found on /admin/login.
- Login button not found on /admin/login.
- Dashboard cannot be reached because the authentication form is missing.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/edb6445e-1974-49a6-b433-94cf48050ee0
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC023 Navigate from Dashboard to Add Event using sidebar link
- **Test Code:** [TC023_Navigate_from_Dashboard_to_Add_Event_using_sidebar_link.py](./TC023_Navigate_from_Dashboard_to_Add_Event_using_sidebar_link.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/20a5f679-23d0-40eb-b972-ac67de460c39
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC024 Navigate from Dashboard to Manage Events using sidebar link
- **Test Code:** [TC024_Navigate_from_Dashboard_to_Manage_Events_using_sidebar_link.py](./TC024_Navigate_from_Dashboard_to_Manage_Events_using_sidebar_link.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Admin login did not redirect to /admin/dashboard after credentials were submitted.
- Login became non-interactable or the app entered an inconsistent state during attempts (page briefly showed 0 interactive elements and the second submit failed).
- Manage Events navigation could not be verified because the dashboard page was never reached.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/cf667d5a-f4cd-45f8-894e-0de5f28d284b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC025 Navigate from Dashboard to Participants using sidebar link
- **Test Code:** [TC025_Navigate_from_Dashboard_to_Participants_using_sidebar_link.py](./TC025_Navigate_from_Dashboard_to_Participants_using_sidebar_link.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/c433409d-322b-45b0-b757-3a69ffac9cdd
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC026 Logout from dashboard returns to admin login
- **Test Code:** [TC026_Logout_from_dashboard_returns_to_admin_login.py](./TC026_Logout_from_dashboard_returns_to_admin_login.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/bbea8694-c986-4263-884e-07872c55a8a2
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC028 Create and publish a new event successfully and verify it appears in Manage Events
- **Test Code:** [TC028_Create_and_publish_a_new_event_successfully_and_verify_it_appears_in_Manage_Events.py](./TC028_Create_and_publish_a_new_event_successfully_and_verify_it_appears_in_Manage_Events.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/6fb0ad9b-49f1-4f26-93d6-b73754c8de1a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC030 Submit with all required fields empty and verify inline validation errors
- **Test Code:** [TC030_Submit_with_all_required_fields_empty_and_verify_inline_validation_errors.py](./TC030_Submit_with_all_required_fields_empty_and_verify_inline_validation_errors.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/d9afd4d1-0b0a-48db-91d3-82cfd1212466
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC031 Validation: Minimum Users greater than Maximum Users blocks submission
- **Test Code:** [TC031_Validation_Minimum_Users_greater_than_Maximum_Users_blocks_submission.py](./TC031_Validation_Minimum_Users_greater_than_Maximum_Users_blocks_submission.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/3c8666b7-2457-4f33-8124-9b8516ab5dd7
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC034 Edit an existing event and verify the updated values appear in the events list
- **Test Code:** [TC034_Edit_an_existing_event_and_verify_the_updated_values_appear_in_the_events_list.py](./TC034_Edit_an_existing_event_and_verify_the_updated_values_appear_in_the_events_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/5bc79414-9209-468d-ac7a-eb09ddd34551
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC036 Delete an event successfully and verify it is removed from the list
- **Test Code:** [TC036_Delete_an_event_successfully_and_verify_it_is_removed_from_the_list.py](./TC036_Delete_an_event_successfully_and_verify_it_is_removed_from_the_list.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Create Event submission failed: a red 'Missing fields' notification 'Please fill in all required fields' is displayed after clicking Create Event.
- Although Event Title, Date, and Time were filled ('Set Piece Review', '2026-03-14', '10:00'), the form rejected the submission indicating other required fields are missing.
- The application did not navigate away from /schedule/new or show a success confirmation after submission, so the event was not created.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/d0d97dc7-7452-48ef-a7fa-a2bff2668c7b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC040 View participants table for an event with registrations
- **Test Code:** [TC040_View_participants_table_for_an_event_with_registrations.py](./TC040_View_participants_table_for_an_event_with_registrations.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Login did not redirect to /admin after submitting credentials; page remained on /admin/login.
- Second attempt to click the Login button failed: element not interactable.
- Participants view could not be reached because the admin dashboard never loaded after login.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/7ba6912c-7401-49e3-a850-e892aa9a8fc4
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC042 Open participant details by clicking a participant row
- **Test Code:** [TC042_Open_participant_details_by_clicking_a_participant_row.py](./TC042_Open_participant_details_by_clicking_a_participant_row.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Select Event dropdown does not contain expected option "YOU B TECH (2 participants)" so participants cannot be loaded.
- Participants list did not appear after login and clicking Participants because no event could be selected.
- First participant row not found or clickable because participants were not loaded.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/06110ede-b19f-4bea-88e9-76e2aa8a0b36
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC044 Empty state shown for event with no registrations
- **Test Code:** [TC044_Empty_state_shown_for_event_with_no_registrations.py](./TC044_Empty_state_shown_for_event_with_no_registrations.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Events failed to load: 'Failed to load events' error messages are displayed and no event options are present in the dropdown.
- Event selector contains only the default option '-- Choose an event --' and no selectable events, preventing selection of an event with 0 participants.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/3139a985-1fdf-4860-8112-003a5a9cb368
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC046 Error handling when participants fail to load
- **Test Code:** [TC046_Error_handling_when_participants_fail_to_load.py](./TC046_Error_handling_when_participants_fail_to_load.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Error notification not found on the participants page after attempting to load participants.
- Participants area shows the placeholder text 'Select an Event' instead of an error message indicating a loading failure.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/5547f692-ee96-42d4-9e15-9879d8c8ac63
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Inline validation when email is empty and password is provided
- **Test Code:** [TC004_Inline_validation_when_email_is_empty_and_password_is_provided.py](./TC004_Inline_validation_when_email_is_empty_and_password_is_provided.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Login page at /admin/login did not render: no input fields, buttons, or other interactive elements visible.
- Cannot test 'submit without email' because the password input and Login button are not present on the page.
- Page shows 0 interactive elements indicating the SPA failed to load or rendered blank content.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/d48d1b73-b820-4dd1-bfa0-81f51c499211
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Inline validation when password is empty and email is provided
- **Test Code:** [TC005_Inline_validation_when_password_is_empty_and_email_is_provided.py](./TC005_Inline_validation_when_password_is_empty_and_email_is_provided.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/2a763f83-5449-4f55-a2b2-f13596ec2e5e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Inline validation when both email and password are empty
- **Test Code:** [TC006_Inline_validation_when_both_email_and_password_are_empty.py](./TC006_Inline_validation_when_both_email_and_password_are_empty.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/b94b5285-b8f9-44f3-97ed-41deb03d8020
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Event cards show short description preview text
- **Test Code:** [TC010_Event_cards_show_short_description_preview_text.py](./TC010_Event_cards_show_short_description_preview_text.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/2ccd7916-34c5-4b62-b733-a59ad1629a24
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Event details page content differs from the card preview (full details present)
- **Test Code:** [TC011_Event_details_page_content_differs_from_the_card_preview_full_details_present.py](./TC011_Event_details_page_content_differs_from_the_card_preview_full_details_present.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/ab704dc1-55a3-45d5-be19-1d3ff888656f
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018 Join form requires Full Name before submission (client-side validation)
- **Test Code:** [TC018_Join_form_requires_Full_Name_before_submission_client_side_validation.py](./TC018_Join_form_requires_Full_Name_before_submission_client_side_validation.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7947689d-e3d2-4d16-92f5-f35c7f056748/e8343ffa-42b6-42da-9caa-de9abf95c1b6
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **63.33** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---