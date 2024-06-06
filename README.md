# SVG-Path-Generator-React-Native
### My project for Backdrop Build v4

## Back story
A few weeks ago I was playing around with my logo for my [portfolio site](https://www.njtd.xyz) and wanted to change it from png format to SVG. After trying an online converter and soon learning that although SVG's are by nature scalable, if you render a picture within one i.e. a png file, then they don't scale all too well. Next I tried to convert the image into an SVG path, but every converter I tried changed the image too much and couldn't quite give me what I wanted. 

I then had a look at the [MDN documentation for SVG's](https://developer.mozilla.org/en-US/docs/Web/SVG) to learn about the different commands available to a path element, before heading over to [W3Schools](https://www.w3schools.com/graphics/svg_path.asp) try my hand at coding some paths. Whilst I gained an understanding quite quickly, and have managed to produce a 'nearly there' version of my logo, I really wished there was a better tool out there for editing/creating SVG path's.

### SVG logo attempt
![The logo I created](https://github.com/NathanJohnNJ/SVG-Path-Generator-React-Native/blob/main/assets/logo.svg?raw=true)

### Backdrop Build v4
After trying a few of the more popular offerings for SVG editors, I felt that none of them were giving me the flexibility I wanted, at least not without having to pay for additional services. Then I heard about [Backdrop Build](https://backdropbuild.com) and was invited to join the latest build which was only a couple of weeks away. The build ran for 4 weeks, which have absolutely flown by, and that brings us to today, where I have a very 'early-stage' MVP ready to launch and to share with the world.

### To do/completed list
Since I only had 4 weeks to get this up and running, and since I, true to form, changed my mind a million times, and tried a few different approaches. I've included my planning files in this repository, as well as a checklist of what still needs doing, and what I'm hoping to implement in the future as additional goals once the app has full functionality. I'm going to include the 'To do' list here for ease of access and will update it as I continue to work on developing my SVG Path Generator.

## To Do
  - Finish functionality of edit modal
  - Add Z command
  - Add output options
  - Add functionality to change command component
  - Add functionality to delete command (path section)
  - Add limits so that path cannot go outside grid, and make the default points more user friendly when at certain positions on the grid. (i.e. when on the right hand side, have the path start on the right and come to the left)
  - Add S and T commands - Unless these are following a C or Q command they don't render properly so only display them as a follow on command?
  - Add A command
  - Add opening animation made with svg
  - Add links to help pages > make a component that takes an argument of type, can be placed on the main page for general docs and then each commands page to link to their respective sections in the docs.
## Done:
  - ~~Create individual panels for components~~
  - ~~Create tables to display the points information~~
  - ~~Create a grid with draggable points that will update the path and the commands whilst being dragged~~
  - ~~Modify the offsets needed for draggables~~
  - ~~Add Q command~~
  - ~~Add C command~~
  - ~~Add L, V, H commands~~
  - ~~Add configurable styles for:~~
    - ~~path {colour, width, opacity, highlight colour}~~
    - ~~fill {colour, opacity}~~
    - ~~control and end points for tables and gridWithDrag~~
  - ~~Add hover effects for control points and path~~
  - ~~Finish alligning C, Q, L commands to all worth responsively with gridWithDrag and Tables~~
  - ~~Added default options for Q command~~
  - ~~Command underneath path to show both relative and absolute~~
  - ~~Add branding and link to njtd.xyz~~
  - ~~Record video introducing and demonstrating the app~~
  - ~~Tried to add help link to side panel initially but the link isn't going to the right place - more research needed.~~
  - ~~Align command and preset modal styles to new design on C component~~
  - ~~Different default options for each command~~

[![buymeacoffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/nathanjohnnj)