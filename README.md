## starting the proejct ##
in the base repository of the project, open terminal and type command for these cases : 

# to start the project
npm start

# in case of missing module error
use these shell commmands depending on what module is missing:
npm install react-scripts 
npm install react 
npm install react-beautiful-dnd 
npm install easybase-react

# in case of "Attempting to bind to HOST environment variable : xxx " error
unset HOST

## features of the project ##

# Database : easy-base react
when a task is 'focused out', it saves data in easy-base database automatically
link to db : https://app.easybase.io/#/tables
* login required

# Drag and Drop : react-beautiful-dnd
- in the to-do list, tasks can be drag and dropped 'within' to-do list
- when the cursor changes to grab, it means it can be dragged
- to help find draggable point, black dot was added to each list 
