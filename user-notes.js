/* The constructor is a method that gets called when a new object is created from the User class.
In this example, the constructor takes a parameter called "stories".
So when we make a new instance (object) of the StoryList class (for example, myStoryList), the stories parameter
is passed to the constructor. We then assign an instance variable "this.stories" and assign it to the value of
"stories".

*/

// global to hold the User instance of the currently-logged-in user
let currentUser;

/*  */

class User {
    /** Make user instance from obj of user data and a token:
     *   - {username, name, createdAt, favorites[], ownStories[]}
     *   - token
     */
  
    constructor({
                  username,
                  name,
                  createdAt,
                  favorites = [],
                  myStories = []
                },
                token) {
      this.username = username;
      this.name = name;
      this.createdAt = createdAt;
  
      // instantiate Story instances for the user's favorites and ownStories
      this.favorites = favorites.map(s => new Story(s));
      this.myStories = myStories.map(s => new Story(s));
  
      // store the login token on the user so it's easy to find for API calls.
      this.loginToken = token;
    }
  
    /** Register new user in API, make User instance & return it.
     *
     * - username: a new username
     * - password: a new password
     * - name: the user's full name
     */
  
    static async signup(username, password, name) {
      const response = await axios({
        url: `${BASE_URL}/signup`,
        method: "POST",
        data: { user: { username, password, name } },
      });
  
/* Here we are using desctructuring assignment to extract the 'user' property from the response.data object  */
      let { user } = response.data 
      console.log(response)
      console.log(user)

//The result of console.log(user) looks like this:
/*  

{createdAt: '2023-10-03T20:26:08.315Z', favorites: Array(0), name: 'Test User 6', stories: Array(0), updatedAt: '2023-10-03T20:26:08.315Z', …}
createdAt : "2023-10-03T20:26:08.315Z"
favorites :  []
name :  "Test User 6"
stories :  []
updatedAt :  "2023-10-03T20:26:08.315Z"
username :  "TU6"
[[Prototype]] : Object

 */


// The result of console.log(respone) looks like this:
/* 
{data: {…}, status: 201, statusText: 'Created', headers: AxiosHeaders, config: {…}, …}
config :  {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
data :  {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…c2OH0.wIVmkCT0PxrS-WowYXyP6RG-ICQzODiO-R9iiYUc0OY', user: {…}}
headers :  AxiosHeaders {content-length: '293', content-type: 'application/json; charset=utf-8'}
request :  XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
status :  201
statusText :  "Created"
[[Prototype]] : Object

*/
  
      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          myStories: user.stories
        },
        response.data.token
      );
    }
}
