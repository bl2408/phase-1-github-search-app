const endpoints ={
    users: term => `https://api.github.com/search/users?q=${term}`,
};

const ulUsers = document.querySelector("#user-list");
const ulRepos = document.querySelector("#repos-list");

const form = document.querySelector("#github-form").addEventListener("submit", e=>{
    e.preventDefault();
    if(!search.value){ return;}

    const initObj ={
        method:"GET",
        header: {
            Accept: "application/vnd.github.v3+json",
            "Content-type": "application/json",
        }
    }
    //fetch users
    fetch(endpoints.users(search.value), initObj)
    .then(res=>res.json())
    .then(data=>{
        ulUsers.innerHTML = "";
        data.items.forEach(item => {
            ulUsers.innerHTML += userCard(item);
        });
    });

    //repo btn event
    document.body.addEventListener("click", e=>{
        if(e.target.tagName === "BUTTON" && e.target.classList.contains("button-repo")){
            const repoUrl = e.target.dataset.repoUrl;

            fetch(repoUrl)
            .then(res=>res.json())
            .then(data=>{
                ulRepos.innerHTML = "";
                data.forEach(item=>{
                    ulRepos.innerHTML += repoCard(item);
                });
                ulRepos.scrollIntoView({behavior:"smooth"});
            });
        }
    });
});

function repoCard({html_url, name, description}){
    return `
        <li class="card-repo">
            <a href="${html_url}" target="_blank">
                <div><h2>${name}</h2></div>
                <div>${(description?? "No description")}</div>
            </a>
        </li>
    `;
}


function userCard({avatar_url, login, html_url, repos_url}){
    return `
    <li class = "card-user">
            <div>
                <img src="${avatar_url}" alt="profile image of ${login}" />
            </div>
            <div>
                <h2><a href="${html_url}" target ="_blank" >${login}</a></h2>
                <p><button class="button-repo" data-repo-url="${repos_url}">Repos</button></p>
            </div>
        </li>
    `;
}