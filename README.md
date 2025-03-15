### Project requirements

- Filter duplicated movies from the response
- Sort movies by imdb rating
- Render all filtered & sorted movies in grid view
- Each rendered movie item should display title, poster, release date and inFavorites status
- Enable keyboard navigation
- Highlight selected item
- On Enter key add item to favorites / or remove when it is already in favorites

### Developmnet plan

- [x] Configure test environment
- [x] Add skeleton structure
- [x] Add basic grid layout
- [x] Map and display grid items from dataset
- [x] Add github workflow for CI/CD on merge
- [x] Build item card
- [x] Update grid layout
- [x] Filter duplicated movies from response
- [x] Sort movies by imdb rating
- [x] Add favourite component
- [x] Add handler to pop selected item
- [x] Add handlers for keyboard navigation
- [x] Add view port tracking with keyboard navigation
- [x] Add show more functionality
- [x] Add localStorage to persist selected item
- [x] Add e2e test and update unit tests

### How to run the project

Clone it from github and do `yarn install` and run the project with `yarn dev`

To run checkDuplicates.js navigate to mocks folder:

`cd src/mocks`

and run

`node checkDuplicates.js`

E2E tests are running on deployment so there is no need to start project locally:

To open cypress use `yarn cy:open-e2e` select prefered browser and clik on baseFlow test to start it in Cypress client.

To run e2e detached use `yarn cy:run-e2e`.

### Documentation

- As this is shallow and interactive application there is no use for RSC
- ~~Will try to keep up with unit test coverage and implement simple e2e if there is time~~
- Could consider rollup and JS packaging at least to enable workspace
- Could use some opensource API instead of JSON dataset
- Could implement storybook as distributed UI
- I added responsive transition to show 2 columns when width is less then 768px
