import axios from "axios";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

const hook = document.querySelector(".cards");

axios.get("https://api.github.com/users/samkester")
.then(result => hook.append(cardFor(result.data)));

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ["MartaKode", "jidelson", "isaac-gorman", "AustinKelsay", "zakmayfield"];
// since I have no followers, this list is padded out with people from my build week 1 team

console.log(followersArray);

Promise.allSettled(followersArray.map(item => axios.get(`https://api.github.com/users/${item}`))).then(results => {
  // .map creates an array of promises, one from the axios.get() result of each follower
  // Promise.allSettled waits until all of those promises resolve, then concatenates the results into an array
  // `results` is the array of results of each promise
  console.log(results);
  results.forEach(item => hook.append(cardFor(item.value.data)));
}).catch(error => console.log(error));

// n.b. - Promise.all works identically to .allSettled EXCEPT that if one of the promises fails, .all fails
//   entirely, whereas .allSettled will continue to return the results of the fulfilled promise(s). Therefore
//   .all is more suited to tasks where any part failing is critical, .allSettled to parallel tasks where parts
//   can succeed independently of one another.

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function cardFor(user){
  const cardBase = document.createElement("div");
  const cardImg = document.createElement("img");
  const cardInfo = document.createElement("div");
  const cardName = document.createElement("h3");
  const cardUsername = document.createElement("p");
  const cardLocation = document.createElement("p");
  const cardProfile = document.createElement("p");
  const cardProfileLink = document.createElement("a");
  const cardFollowers = document.createElement("p");
  const cardFollowing = document.createElement("p");
  const cardBio = document.createElement("p");

  cardBase.append(cardImg, cardInfo);
  cardInfo.append(cardName, cardUsername, cardLocation, cardProfile, cardFollowers, cardFollowing, cardBio);
  
  cardBase.classList.add("card");
  cardInfo.classList.add("card-info");
  cardName.classList.add("name");
  cardUsername.classList.add("username");

  cardImg.src = user.avatar_url;
  cardName.textContent = user.name ?? user.login; // github sets name=null when the display name is the same as the username
  cardUsername.textContent = user.login;
  cardLocation.textContent = `Location: ${user.location}`;
  cardProfile.textContent = "Profile: ";
  cardProfileLink.href = `https://github.com/${user.login}`;
  cardProfileLink.textContent = cardProfileLink.href;
  cardProfile.append(cardProfileLink);
  cardFollowers.textContent = `Followers: ${user.followers}`;
  cardFollowing.textContent = `Following: ${user.following}`;
  cardBio.textContent = `Bio: ${user.bio}`;

  return cardBase;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
