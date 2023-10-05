/* List of Story instances: used by UI to show story lists in DOM. */

class StoryList {
 constructor(stories) {
   this.stories = stories;
 }
}

/* The constructor is a method that gets called when a new object is created from the StoryList class.
In this example, the constructor takes a parameter called "stories".
So when we make a new instance (object) of the StoryList class (for example, myStoryList), the stories parameter
is passed to the constructor. We then assign an instance variable "this.stories" and assign it to the value of
"stories". 

An example of create a new instance of StoryList:

let myStoryList = new StoryList(['Story1'])

Calling myStoryList in the console results in:

StoryList {stories: Array(1)}
stories: ['Story 1']
[[Prototype]]: Object

Executing myStoryList.stories in the console: 

myStoryList.stories

Results in:

['Story 1'] 


*/

"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/* So we start of with a variable "storyList" 
Next we have an async function where we create a new instance of Story List and set 
the instance variable to 'storyList' .
We then await the promise from our axios request in the getStories() method on the StoryList class.

Once the promise is fufilled, we remove the "Loading..." message via JavaScript.

In main.js we have this selected:  
<div id="stories-loading-msg">Loading&hellip;</div>

Main.js:
*/
const $storiesLoadingMsg = $("#stories-loading-msg");

/* We select the div and then use .remove to remove the content.
Element.remove() method removes elements from the DOM

We then call the putStoriesOnPage() function from stories.js  

*/

function putStoriesOnPage() {
    console.debug("putStoriesOnPage");
  
    $allStoriesList.empty();
  
    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
    }
  
    $allStoriesList.show();
  }


/*
We then use JQuery in order to use the .empty method which
removes everything from the selected element ('$allStoriesList')

'allStoriesList' is selected in main.js:
const $allStoriesList = $("#all-stories-list");

It refers to this html in the index.html:
<ol id="all-stories-list" class="stories-list"></ol>

Next we access the stories in storyList (storyList.stories)
and loop over each story

Next we call the generateStoryMarkup function on the story 
which generates the markup for each story in storyList.stories array

Then we append the results to this html:

  <ol id="all-stories-list" class="stories-list"></ol>

Which is being selected in main.js:

const $allStoriesList = $("#all-stories-list");

We then use jquery to use the.show method on "allStoriesList", to display the element 


*/
/** Gets list of stories from server, generates their HTML, and puts on page. */
function generateStoryMarkup(story) {
    // console.debug("generateStoryMarkup", story);
  
    const hostName = story.getHostName();
    return $(`
        <li id="${story.storyId}">
          <a href="${story.url}" target="a_blank" class="story-link">
            ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
        </li>
      `);
  }











