# Roadmap

This document describes the work required to bring the React rewrite of Gordon 360 to feature parity with the current EmberJS version of Gordon 360.

Each top-level item in the list may have:

- a checkbox that should be checked off when the item is complete (required)
- a short description of the item (required)
- a link to an existing page that the item refers to
- components that the item can be broken down into
- improvements over the existing implementation that can be made when building the item
- unknowns that must be addressed before starting work on the item

To check off items on the list, open `ROADMAP.md` in your editor and place an `x` in between the brackets like `[x]`.

## Application

- [x] toolbar
  - name of application, global menu, and people search
- [x] navigation
  - links to different views, user name and profile photo
- [x] login
  - login with username and password before accessing the application
  - auth service can take a username and password and use it to save a token
  - error handling for bad username and password combinations will need to be added to the auth service
- [x] user profile preview in navigation drawer
  - show user profile photo, name, and email address
  - name and email address can be decoded from the authentication token (JWT)

## Home

- [x] CL&W credits
  - number of CL&W credits, total number of CL&W credits needed, and graph showing progress
  - components
    - `StatClwCredits`
  - unknowns
    - what is the best charting library to use with React?
- [x] days left in semester
  - number of days left in semester and graph showing progress
  - components
    - `StatDaysLeftInSemester`
  - unknowns
    - what is the best charting library to use with React?
- [ ] carousel (in progress @ajabbot)
  - rotating images, text, and calls to action
  - intended for use as advertising space in the future
  - components
    - `BannerCarousel`
- ~~tabs~~
  - informational tabs explaining the purpose of Gordon 360
  - improvements
    - are these tabs necessary on the home page of the application?
      - it seems like they belong on the "about" page
      - solution for now is to remove them entirely

## Involvements

- [x] all activities
  - [existing page](https://360.gordon.edu/#/all-activities)
  - a grid of all activities
  - components
    - `Activities`
    - `ActivityCard`: photo and name of an activity, click to view the activity profile
  - improvements
    - preserve original image ratios instead of stretching or squishing to conform to a square container
- [ ] activity profile (in progress @RFStauffer)
  - [existing page](https://360.gordon.edu/#/specific-activity/201709/AJMISS)
  - information about a specific activity
  - buttons to subscribe to or join activity
  - allow editing the different parts of the profile inline instead of having a separate edit page
  - components
    - `ActivityProfile`
    - `UploadImage`
- ~~edit activity~~ (merged with activity profile)
  - edit activity details (if the current user is a leader of the activity)
  - components
    - `ActivityEdit`
    - `UploadImage`
- [ ] join activity
  - [existing page](https://360.gordon.edu/#/add-membership/201709/AJG)
  - components
    - `ActivityJoin`
  - improvements
    - implement as a modal over the activity profile instead of as a separate page
- [ ] ~~my involvements~~ my activities
  - [existing page](https://360.gordon.edu/#/my-involvements)
  - list of activities the current user is involved in
  - an accordion list for each session that expands to show activities for that session
  - clicking an activity in the list brings the user to that activity's profile
  - from "experience transcript" page:
    - show user's role in each activity
    - show how many semesters user was involved in activity
    - show "download transcript" button
  - components
    - `UserActivities`
  - improvements
    - rename to "my activities"
    - combine with "experience transcript" page
  - unknowns
    - what libary to use for PDF download/printing
- ~~experience transcript~~ (merged with "my activities")
  - [existing page](https://360.gordon.edu/#/transcript)
  - button to download PDF of activities the current user has been involved in
  - table showing involvements and how long they lasted
  - improvements
    - merge with the "my involvements"/"my activities" page
      - it displays almost the same information but in a slightly different format
      - the "download transcript" button would make sense on the "my involvements" page

## Events

- [ ] events (in progress @mFelgate)
  - [existing page](https://360.gordon.edu/#/all-events)
  - list of all future Gordon events
  - filter by event type
  - option to include past events
  - option to show CL&W credit events only
  - search events
  - clicking on an event shows event details in a popup window
  - components
    - `Events`
    - `EventsList`: list of events, includes filters
    - `EventItem`: a single item in `EventsList`
    - `EventDetails`: popup window from clicking on an `EventItem`
- ~~CL&W credit events~~ (merged with "events")
  - [existing page](https://360.gordon.edu/#/chapel-credits)
  - list of all future events offering CL&W credit
  - chapel credit progress for current user
  - option to show only attended events
  - search events
  - clicking on an event shows event details in a popup window
  - improvements
    - merge with "events" page
      - the "events" page does all the same things as this page except for displaying CL&W credits (which are displayed on the home page) and showing events the user has attended

## People

- [x] people search
  - search for anyone in the Gordon database by name
  - components
    - `PeopleSearch`
- [ ] user profile
  - [existing page](https://360.gordon.edu/#/profile/henry.hao)
  - information about a specific user
  - change cell phone number visibility
  - change profile picture visibility
  - edit social media links
  - edit visibility of activities
  - update profile picture
  - view membership requests and their statuses
  - components
    - `UserProfile`
    - `UserSummary`
      - display photo, name, title, and social media links
      - on current user's profile, allow editing social media links and updating profile picture
      - should be an unstyled component that can be used on profile pages and in search results (big or small)
    - `UserProfileHeader`: styled version of `UserSummary` that takes up top part of user profile page
    - `UploadImage`
    - `UserMembershipRequests`: display activity membership requests and their statuses
    - `UserActivities`: display activities and allow user to toggle their visibility
- [ ] upload image
  - select, crop, and upload an image to a URL
  - should be a modal
  - components
    - `UploadImage`
  - improvements
    - use a file selection library that allows drag and drop and can do custom validation
      - solution: use Dropzone.js
  - unknowns
    - what is the best library for cropping an image before uploading?

## Static Pages

- [x] about
  - [existing page](https://360.gordon.edu/#/about)
  - static page
  - components
    - `About`
- [x] help
  - [existing page](https://360.gordon.edu/#/help)
  - static page
  - components
    - `Help`
