document.getElementById('invitation-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');

    try {
        const response = await fetch('/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email })
        });
        if (!response.ok) {
            throw new Error('Failed to add invitation');
        }
        const data = await response.json();
        console.log(data.message);
        document.getElementById('button-map').style.visibility = 'visible';
        renderInvitations();
    } catch (error) {
        console.error(error.message);
    }
});

async function renderInvitations() {
    try {
        const response = await fetch('/invitations');
        if (!response.ok) {
            throw new Error('Failed to fetch invitations');
        }
        const invitations = await response.json();
        //const users = await response.json();
        const invitationList = document.getElementById('invitation-list');
        //const usersList = document.getElementById('userList');
        invitationList.innerHTML = '';
        //let lastActive = new Date();
        //usersList.innerHTML = '';
        invitations.forEach(invitation => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${invitation.username}</span> - ${invitation.email}`;
            invitationList.appendChild(listItem);
        });
        /*users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${user.username}</span> - ${lastActive}`;
            usersList.appendChild(listItem);
        });*/
    } catch (error) {
        console.error(error.message);
    }
}

renderInvitations();
