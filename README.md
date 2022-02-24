# Anytown Buy Nothing

## Overview
The Buy Nothing movement has formed in recent years to encourage people to share with others in their community. This has three key benefits:
    1) Preventing things from going into landfills.
    2) Enabling people to acquire things that that want/need for free.
    3) Building a deeper sense of community.

Buy Nothing groups are hyper-local geographically and are generally managed as a group on Facebook. Individuals post items that they are giving away. Individuals can express their interest in an item by posting a comment or sending a direct message to the owner. Owners are encouraged to choose a recipient at random, rather than on a first-come first-served basis because the latter rewards people who are able to spend more time on Facebook than other. 

Facebook has many limitations that this app is designed to overcome:
    1) Allowing users to browse listings by category.
    2) Requiring a 24-hour waiting period to select a a recipient of items.
    3) Easy conducting of random lotteries to select winners.
    4) Easy viewing of items that the user has listed or entered a lottery for.

## Technologies
The system uses React with a json server as well as React-Bootstrap for the navigation menu.

## File Structure
app.js - The main screen. It contains all of the fetch requests and update functions as well as all of the route paths 
db.json - Contains the data for the system.
The system screens are separated into directories based on their functions:
    1) find_things - contains files related to searching for items. 
    2) list_things - contains files related to listing items and viewing one's listings.
    3) items - contains files related to the display of items. When displaying lists of items and individual item screens (whether for finding or listing items), those files are contained here.
    4) my_info - contains the user's profile screen as well a screen for sending and receiving messages.
context - this is where the data about the logged in user lives.
    

## Usage
This is a demo system. There is no login/logout screen. An individual user's info from the db.json file can be copied and pasted to the context page to set him/her as the logged in user.

To find items, a user has two options:
    1. Browse listings by category - if there is a particular type of item they are looking for.
    2. Browse listings by date - to look at the most recent listings if they don't have any particular interest.
If a user is interested in an item, s/he can enter the lottery for the item. Sometimes a lottery winner is selected but does not end up claiming the item. Therefore, if the lottery has already been conducted, the user can enter a waiting list for the item. Once an item has been claimed, the seller should set the listing as "inactive." In addition to entering the lottery, the user can send a direct message tot he seller with any questions that s/he may have.

To list items, a user enters a name, category, description, and the URL of a photo of the item. Once an item as been listed for 24 hours, a button appears that allows the user to select a recipient at random. Once a recipient is selected, the user is prompted to send a message to that individual with instructions for how to pick up the item. That message goes into the recipients message screen.

In the "My Info" section, each user has a profile screen as well as a "My messages" screen. Messages are listed in chronological order (with the most recent first). Scrolling over a message reveals a textbox in which a user can write a response.