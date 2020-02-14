"use strict";

function userInput() {
  let wordInput = $("#js-github-user").val();
  return wordInput;
}

function getRepos() {
  fetch("https://api.github.com/users/" + userInput() + "/repos")
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("I cannot find that GitHub UserName."));
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  let responseHtml = "";
  responseJson.forEach(userRepo => {
    responseHtml += `
    <h3 class="user-handle">${userRepo.name}</h3>
    
     <div class="col-md-3">
     <a href=" ${userRepo.html_url}">Repo</a>
     </div>`;
  });
  $("#display-repos").html(responseHtml);
  $("#results").removeClass("hidden");
}

function watchForm() {
    $("#js-form").submit(event => {
      event.preventDefault();
      getRepos(userInput);
    });
  }

$(watchForm());

// 1. User must be able to search for a Github user handle
// 2. The search must trigger a call to github's api
// 3. The repos of that handle must display on the page:
//       - Include: Repo name and link to rep
// 4. User must be able to make multiple searches and see
//      only the results for the current search.