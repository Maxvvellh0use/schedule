# schedule 

### Determining user needs

#### Comparing two types of schedule: [current schedule](https://docs.google.com/spreadsheets/d/1oM2O8DtjC0HodB3j7hcIResaWBw8P18tXkOl1ymelvE/) and [schdeule in rs app](https://github.com/rolling-scopes/rsschool-app)

| Schedule type           | Advantages                                              | Disadvantages  |
| ----------------        | -----------------------------------------------         | -----------    |
| RS App schedule         | <ul><li>all information is consolidated in one place</li><li>balanced appearance</li><li>integration to App</li><li>type of task is easyly determined</li></ul>                                                                | <ul><li>Incomplete schedule</li><li>No weeks separating</li><li>no explicit highlighting of the important</li></ul>                                                                              |
| Google docs schedule    |  <ul><li>convenient to edit</li><li>much more information</li><li>division by weeks</li><li>division by course</li></ul>                                                                                                                    | <ul><li>frighteningly cumbersome content</li></ul>|

#### Concept of perfect schedule according to survey (marked implemented ideas): 

- [ ] the student can mark the importance of the schedule items for himself / herself
- [ ] the student can mark the completed and unfulfilled items of the schedule
- [ ] the student can evaluate the assignment right on the schedule page according to the criteria of its usefulness, comprehensibility, quality of presentation of the material
- [ ] part of the schedule that is already in the past is automatically hidden, only the present and future are displayed
- [x] you can specify various additional materials to the topic (many. 10-20 points)
- [x] the task page is not a separate page on the Internet, but a part of the schedule that opens and hides on click
- [x] For long-term events possibility to see the duration (how many days there are before the deadline) - as a separate field or some kind of beautiful link with the deadline event.
- [ ] For graded assignments, points and coefficients for the assignment are displayed, for completed and verified assignments - how many points could be received and how many were received by the student who views the schedule
- [ ] Display only the current schedule for the week when the student marked its completion, show the next part of the schedule
- [ ] Students on the schedule page can vote for the events they find most useful. Each event displays its rating
for assessed tasks, you need to display the number of points for the task in order to understand what you lose if it is not completed
- [ ] It should be nice and cool. The timetable is the face of the course. Just let it be a table with cells at school, and on the frontend course and the schedule should be high-tech. Each task can be done as a level in the game. Completed the task - passed the level. A course project as the final boss
Each new set contains part of the tasks from the previous schedule. It should be possible to copy the schedule of one set, add it to another set, and make changes. If for each new set you need to create a new schedule from scratch, no one will use this application

#### Our ideas of improvements in addition: 

- [ ] RS APP schdule should be divided by weeks
- [x] Ability to switch to dark theme 
- [x] Internationalization 
- [x] Highlighting of today events
- [ ] Email notification of coming test or deadline
- [x] Resizable columns in schedule table


#### Team 16: 
1. Maxim Pavlov [Maxvvellh0use](http://webdesign.ru.net)
2. Iuliia Plekhanova [jules0802](http://webdesign.ru.net)
3. Eduard Brukish [EduardBrukish](http://webdesign.ru.net)
4. Yulia Kotlyarova [Yulia-Kotlyarova](http://webdesign.ru.net)


#### Application layout in Figma
[Layout](https://www.figma.com/file/LdKribLkITHxoR1iMYIEan/Schedule?node-id=0%3A1)

***

## Documentation


#### Global state

You can use the global state. The global state contains the following structure:
```html
Global State = {
  allEventsData: {
   	_id: number,
    name: string,
    type: string,
    optional: {
       		date: string,
       		description: string,
       		organizer: string,
       		place: string,
       		materials: string,
       		deadline: string,
       		details: string,
       		duration: string,
       		result: string,
       		notate: string,
       		feedback: boolean
    	},
    course: string,
  },
    app: {
        loading: boolean,
        errorText: string,
        mode: string,
        accessability: boolean,
        language: string
    }
    tableColorStyle: {[key: string]: object},
}
```
In this case:
**allEventsData** - contains detailed information about events in the learning process.
**app.**loading - determines the state of the loader.
**app.**errorText - contains a text message in case of unsuccessful loading of data from the server.
**app.**mode - determines the display of the application depending on the user's role (allowed state: “student”, “mentor”).
**app.**accessability - determines the state of the application for the visually impaired.
**app.**language - determines the language of the application (allowed state: “eng”, “ru”).
**tableColorStyle** - contains information about the applied color settings of the schedule table rows. Also, these settings are stored in localStorage. Event types are used as keys. This element has the structure:

```html
{Event: {color: …., backgroundcolor:.....},
	...
},
```

  example:
```html
{‘Deadline’: {color: ‘red’, backgroundcolor: ‘green’},
	...
},
```


#### Working with the backend

To store data, we use a server developed by us with the address https://immense-atoll-77622.herokuapp.com. The server was implemented with node.js using Express and Mongoose for database management. The database was created using
MongoDB. This server accepts requests using the methods: GET, POST, PUT, DELETE.  These methods are used for  getting all existing events, adding new ones, updating existing ones and deleting them respectively. 

To work with the backend, you need to use redux action `getEventsData()`. This action sends a request to the server and puts the response with data as an interface: **allEventsData**.

The received data is stored in the global state.

It should also be noted that action `getEventsData()` contains three additional actions that are responsible for displaying and hiding the download loader and displaying data download errors (actions list: `showLoader()`, `hideLoader()`, `showError()`).


#### Application structure

When implementing application components, we used TypeScript. To describe the incoming data to the components, the interfaces are described in the file types.ts, which is in the root of the folder components.

Application components are handled in pluggable components. And the general structure of the component looks like this:

components/
--exampleComponent/
----helpers/
----exampleComponent.scss
----exampleComponent.tsx
----consts.js

Folder helpers/ contains files with helper functions. 

If another component is nested inside the component, then the structure and concept are preserved.

When writing the components of our application, we used ready-made library components  Ant Design of React.


#### Using Redux

To create and use the global state in the application, we used Redux.

To add data to the global state add your reducer or use the existing one at the folder redux/reducers (for example you can add it to the appReducer). If you create a new reducer add it to the file redux/rootReducer.ts. To update the global state, implement your action for the reduсer in the file redux/action.ts. 


#### Working with application components

Below will be described all the components of the application, as well as the data included in the components:

* CalendarView: from the global state is used allEventsData, the component is responsible for displaying data in the form of a calendar.
* ListView: from the global state is used allEventsData, the component is responsible for displaying data in the form of a list.
* MainPageHeader: from the global state is used app.accessability, app.language. The component is responsible for displaying the page header, contains switches for accessibility of the application for the visually impaired and the language. Also contains a link to go to the user's account.
* MainPageLayout: from the global state is used app.accessability, app.language, the component is responsible for displaying main page layout. 
* MainTab:  from the global state is used allEventsData,  app.accessability, app.language the component is responsible for displaying table, calendar and event list.
* ResizebleTitle: the component is responsible for displaying the sidebar of the table with variable columns.
* SideBar: from the global state is used allEventsData, the component  is responsible for displaying Left panel with small calendar and announce of today events.
* TableView: from the global state is used app.mode, app.language, app.errorText, app.loading, allEventsData, tableColorStyle the component is responsible for displaying data in the form of a calendar. The table is sorted by dates. Passed events hide. Table also has implemented features: resizable columns, ability of hiding rows and columns, filters, today events highlighting, etc.  Each event has its own link to event description. 
* TaskCreator/	
    * AddressContainer: the component is responsible for displaying the map block and input addresses or coordinates. Selecting coordinates on the map automatically puts them in the input.  
    * BottomContainer: the component is responsible for displaying block under the map. Includes additional fields, describing event.
    * LeftPanel: the component is responsible for displaying the block of the left panel. It contains required fields for event creating.
    * MapComponent: the component is responsible for displaying the map. Map is powered by Mapbox API.
    * TaskCreatorLayout: takes all of the above components and is responsible for displaying them on the page for creating a new task
* TaskDescription: the component is responsible for displaying the selected task. 
* TaskPage: from the global state is used app.mode, app.language, app.errorText, app.loading, allEventsData the component is responsible for the ability to delete an event and leave a feedback. If the description of the event contains a link to a markdown document, the page displays its content. Otherwise, a small table with event fields (Task Description component). 
* TopPanel: from the global state is used app.mode, app.language, app.accessability, allEventsData  the component is responsible for displaying table header and contains a switch for the "student-mentor" mod, a link for downloading the schedule in available formats, "Create event button" in mentor's mode.
* UserColorSettings: from the global state is used app.language the component is responsible for rendering the modal window of the table color settings