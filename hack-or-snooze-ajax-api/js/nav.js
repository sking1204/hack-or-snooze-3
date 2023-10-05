/* SB code given in source file*/
"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $storiesContainer.hide();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/* NEW CODE BELOW */

/** Show story submit form on click on "submit" */

function navSubmitSelect(evt) {
  console.debug("navSubmitSelect", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitStoryForm.show();
}

$navSubmitShowStoryForm.on("click", navSubmitSelect);


/** Show story submit form on click on "submit" */

function navMyStoriesSelect(evt) {
  console.debug("navMyStoriesSelect", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $myStories.show();
}


$navShowMyStories.on("click", navMyStoriesSelect);



/** Show favorite stories when 'favorites' is clicked */

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoritesListOnPage();
}

$navShowFavorites.on("click", navFavoritesClick);

function navUserProfile(evt){
  hidePageComponents();
  populateUserForm();
  $storiesContainer.hide();

  // $userProfile.show();
  $profileForm.show();

}

$navUserProfile.on("click", navUserProfile);

function populateUserForm() {
  $("#profile-name").val(currentUser.name);
  $("#profile-username").val(currentUser.username);
  $("#profile-created-date").val(currentUser.createdAt.slice(0, 10))


}






