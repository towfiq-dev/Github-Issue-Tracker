let allIssuesList = [];

//Sign In Function
function handleLogin() {

    const typedUser = document.getElementById('username').value;
    const typedPass = document.getElementById('password').value;

    if (typedUser === 'admin' && typedPass === 'admin123') {
        const loginDiv = document.getElementById('login-section');
        const mainDiv = document.getElementById('main-section');
        alert('Successfully Sign in Github Issues Tracker')
        loginDiv.classList.add('hidden');
        mainDiv.classList.remove('hidden');

        fetchAllIssuesFromServer();
    } else {
        alert("Incorrect username or password.");
    }
}

//Fetching data from the server (Fetch API)
async function fetchAllIssuesFromServer() {
    toggleSpinner(true);

    const apiUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

    try {
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        allIssuesList = responseData.data;
        displayIssuesToUI(allIssuesList);
        updateActiveButton('all');

    } catch (error) {
        console.error("There was a problem loading data:", error);
    } finally {
        toggleSpinner(false);
    }
}

//Creating cards and displaying them in the UI (DOM Manipulation)
function displayIssuesToUI(issuesArray) {
    const container = document.getElementById('issue-container');
    
    container.innerHTML = "";

    issuesArray.forEach(function(singleIssue) {
        
        let borderColorClass = "";
        const statusText = singleIssue.status.toLowerCase();
        
        if (statusText === 'open') {
            borderColorClass = "border-t-green-500";
        } else {
            borderColorClass = "border-t-purple-500";
        }

        const issueCard = document.createElement('div');
        
        issueCard.className = `card bg-white shadow-md hover:shadow-2xl transition-all border-t-4 ${borderColorClass} cursor-pointer p-5 h-full`;

        const cardContent = `
            <div onclick="showIssueDetails('${singleIssue.id}')">
                <div class="text-right mb-4">
                <p class="text-[13px] font-semibold text-gray-600">${singleIssue.priority}</p>
                </div>
                <h2 class="text-md font-bold text-blue-700 leading-tight mb-2 truncate">${singleIssue.title}</h2>
                <p class="text-xs text-gray-500 line-clamp-2 mb-4 h-8">${singleIssue.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-2 py-1 bg-gray-100 text-[10px] rounded text-gray-600 font-medium">${singleIssue.status}</span>
                    <span class="px-2 py-1 bg-yellow-50 text-[10px] rounded text-yellow-700 font-medium">${singleIssue.lavels}</span>
                    <span class="px-2 py-1 bg-yellow-50 text-[10px] rounded text-yellow-700 font-medium">${singleIssue.lavels}</span>
                </div>

                <div class="mt-4 pt-3 border-t flex justify-between items-center text-[10px] text-gray-400">
                    <div>
                        <p class="font-semibold text-gray-600">#${singleIssue.id} by ${singleIssue.author}</p>
                        <p>${new Date(singleIssue.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div class="text-right">
                        <p>Updated ${new Date(singleIssue.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        `;

        issueCard.innerHTML = cardContent;
        
        container.appendChild(issueCard);
    });

    
    document.getElementById('issue-count-text').innerText = `Total ${issuesArray.length} Issues Found`;
}

//Filtering (All, Open, Closed)
function filterIssues(statusType) {

    updateActiveButton(statusType);

    if (statusType === 'all') {
        displayIssuesToUI(allIssuesList);

    } else {
        const filteredData = allIssuesList.filter(function(item) {
            const currentStatus = item.status.toLowerCase();
            return currentStatus === statusType;
        });

        displayIssuesToUI(filteredData);
    }
}

//Search functionality (Search)
async function handleSearch() {
    const searchText = document.getElementById('search-input').value;
    
    if (searchText === "") {
        displayIssuesToUI(allIssuesList);
        return;
    }

    toggleSpinner(true);
    
    try {
        const searchUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
        const res = await fetch(searchUrl);
        const searchData = await res.json();
        
        displayIssuesToUI(searchData.data);
    } catch (e) {
        console.log("Search error.");
    } finally {
        toggleSpinner(false);
    }
}