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

- [ ] toolbar
  - name of application, global menu, and people search
- [ ] navigation
  - links to different views, user name and profile photo
- [ ] login
  - login with username and password before accessing the application
  - auth service can take a username and password and use it to save a token
  - error handling for bad username and password combinations will need to be added to the auth service

## Home

- [ ] CL&W credits
  - number of CL&W credits, total number of CL&W credits needed, and graph showing progress
- [ ] days left in semester
  - number of days left in semester and graph showing progress
- [ ] carousel
  - rotating images, text, and calls to action
  - intended for use as advertising space in the future
- [ ] tabs
  - informational tabs explaining the purpose of Gordon 360
  - improvements
    - are these tabs necessary on the home page of the application?
      - it seems like they belong on the "about" page

## Activities

- [ ] all activities
  - [existing page](https://360.gordon.edu/#/all-activities)
  - a grid of all activities
  - components
    - `ActivityCard`: photo and name of an activity, click to view the activity profile
  - improvements
    - preserve original image ratios instead of stretching or squishing to conform to a square container
- [ ] activity profile
  - [existing page](https://360.gordon.edu/#/specific-activity/201709/AJMISS)
  - information about a specific activity
  - buttons to subscribe to or join activity
- [ ] join activity
  - [existing page](https://360.gordon.edu/#/add-membership/201709/AJG)
  - improvements
    - implement as a modal over the activity profile instead of an entirely separate page
- [ ] my involvements
  - [existing page](https://360.gordon.edu/#/my-involvements)
  - list of activities the current user is involved in
  - an accordion list for each session that expands to show activities for that session
  - clicking an activity in the list brings the user to that activity's profile
  - improvements
    - rename to "my activities"
- [ ] experience transcript
  - [existing page](https://360.gordon.edu/#/transcript)
  - button to download PDF of activities the current user has been involved in
  - table showing involvements and how long they lasted
  - improvements
    - can this be merged with the "my involvements" page?
      - it displays almost the same information but in a slightly different format
      - the "download transcript" button would make sense on the "my involvements" page

## Events

- [ ] events
  - [existing page](https://360.gordon.edu/#/all-events)
  - list of all future Gordon events
  - filter by event type
  - option to include past events
  - option to show CL&W credit events only
  - search events
  - clicking on an event shows event details in a popup window
- [ ] CL&W credit events
  - [existing page](https://360.gordon.edu/#/chapel-credits)
  - list of all future events offering CL&W credit
  - chapel credit progress for current user
  - option to show only attended events
  - search events
  - clicking on an event shows event details in a popup window

## People

- [ ] people search
  - search for anyone in the Gordon database by name
- [ ] user profiles
  - [existing page](https://360.gordon.edu/#/profile/henry.hao)
  - information about a specific user
- [ ] current user profile
  - view and edit information about the current user
  - change cell phone number visibility
  - edit social media links
  - edit visibility of activities
  - update profile picture
  - view membership requests and their statuses

## Static Pages

- [ ] about
  - [existing page](https://360.gordon.edu/#/about)
  - static page
- [ ] help
  - [existing page](https://360.gordon.edu/#/help)
  - static page
