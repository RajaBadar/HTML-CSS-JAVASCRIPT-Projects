//get dom elements
const newsFeedContainer  = document.getElementById('news-feed-container');
const loader = document.getElementById('loader');
const filter = document.getElementById('filter');

//global variables for api
let limit = 5;
let page = 1;
//function to fetch post from api
async function fetchPosts() {
    //fetch posts ffrom the jsonholder api
    const res = await fetch (`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
};

//function to render post in dom 
async function renderPosts(){
    //fetch post data
    const posts = await fetchPosts();
    
    //iterate over each posts
    posts.forEach(post => {
        //create a div element for the post
        const postDiv = document.createElement('div');
        //add class for styling
        postDiv.classList.add('post');
        //add post content
        postDiv.innerHTML = `
            <div class="post-id">${post.id}</div>
            <div class="post-content">    
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-body">${post.body}</p>
            </div>
        `;
        //add in the dom as the newsfeedcontainer
        newsFeedContainer.appendChild(postDiv);

    });
};

//function to show loader
function loading(){
    //add the show class to the loader element
    loader.classList.add('show');
    //increment page global variable by 1
     page++;
    //render the next set of post
    renderPosts();
    loader.classList.remove('show');
    
};

//function to filter posts in the news feed
function filterPosts(e){
    //save the filter string as uppercase value
    const filterStr= e.target.value.toUpperCase();
    //get the all posts displayed on the page
    const posts = document.querySelectorAll('.post');
    //iterate over all the post and get title and body
    posts.forEach(post => {
        //get the tilte for post
        const title = post.querySelector('.post-title').innerText.toUpperCase();
         //get the body for post
        const body = post.querySelector('.post-body').innerText.toUpperCase();
      if(title.indexOf(filterStr) > -1 || body.indexOf(filterStr) > -1 ){
          //if yes display that post
          post.style.display = 'flex';
          
      }else{
              //if no hide the post
            post.style.display = 'none';
      }
    });

}

//event listeners
//1.listen for scroll event
window.addEventListener('scroll',()=>{
    //destructure from dom to get scroll and height value 
    const {scrollTop, scrollHeight , clientHeight} =document.documentElement;
    //check to see user has scrolled to bottom of page
    if (scrollTop + clientHeight >= scrollHeight ){
        //if user has scrolled to the bottom show the loader
        loading();
    }
    
});

//2.listen for input event in the filter input filed
filter.addEventListener('input',filterPosts)


renderPosts();