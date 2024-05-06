document.getElementById('invitation-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const code = formData.get('code');

    try {
        const response = await fetch('/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, code: code })
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
        const invitationList = document.getElementById('invitation-list');
        invitationList.innerHTML = '';
        invitations.forEach(invitation => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${invitation.username}</span> - ${invitation.code}`;
            invitationList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error.message);
    }
}

function getUsers() {

}

renderInvitations();
