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
                    <span class="px-2 py-1 bg-gray-100 text-[10px] rounded text-gray-600 font-medium">${singleIssue.lavels}</span>
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

//Showing details via modal
async function showIssueDetails(issueId) {
    const detailUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`;
    
    const response = await fetch(detailUrl);
    const result = await response.json();
    const info = result.data;

    const modalBox = document.getElementById('modal-body');

    //Dynamically placing content inside a modal
    modalBox.innerHTML = `
        <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-black text-gray-800">${info.title}</h2>
            <button onclick="details_modal.close()" class="btn btn-sm btn-circle btn-ghost">✕</button>
        </div>
        
        <div class="flex gap-1">
        <p>${info.status}</p>
        <p>* Opened by ${info.author}</p>
        <p>* ${new Date(info.createdAt).toLocaleString()}</p>
        </div>
        <div class="flex gap-4">
        <p>${info.lavels}</p>
        <p>${info.lavels}</p>
        </div>
        <div class="space-y-4">
            <p class="text-[#64748B] leading-relaxed bg-gray-50 p-4 rounded-xl italic">"${info.description}"</p>

            <div class="bg-[#F8FAFC] grid grid-cols-1 md:grid-cols-2 gap-4 text-[16px] font-bold mt-6 p-3 border rounded-lg justify-between">
                <div><span class="font-bold text-primary">Assignee:</span></br> ${info.author}</div>

                <div><span class="font-bold text-primary">Priority:</span></br> ${info.priority}</div>

            </div>
        </div>

        <div class="modal-action">
            <button class="btn btn-primary text-white px-10" onclick="details_modal.close()">Close</button>
        </div>
    `;

    details_modal.showModal();
}

//Toggle loading spinner
function toggleSpinner(show) {
    const spinner = document.getElementById('loading-spinner');
    if (show === true) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

//Changing the active button style
function updateActiveButton(activeId) {

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('btn-primary', 'text-white');
    });

    const targetBtn = document.getElementById(`btn-${activeId}`);
    targetBtn.classList.add('btn-primary', 'text-white');
}