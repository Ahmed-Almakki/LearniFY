function loadHeader() {
    const isLoggedIn = localStorage.getItem('token') !== null;
    const headerHTML = `
        <header>
            <nav>
                <ul>
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="${isLoggedIn ? 'dashboard.html' : 'login.html'}">Account</a></li>
                </ul>
            </nav>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

loadHeader();
