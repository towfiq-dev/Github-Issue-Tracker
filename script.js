//Sign In Function
function handleLogin() {

    const typedUser = document.getElementById('username').value;
    const typedPass = document.getElementById('password').value;

    if (typedUser === 'admin' && typedPass === 'admin123') {
        const loginDiv = document.getElementById('login-section');
        const mainDiv = document.getElementById('main-section');
        
        loginDiv.classList.add('hidden');
        mainDiv.classList.remove('hidden');

        fetchAllIssuesFromServer();
    } else {
        alert("Incorrect username or password.");
    }
}