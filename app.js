// Fetch and display all users
async function fetchUsers() {
    try {
        console.log('Fetching users...');
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        console.log('Users fetched:', users);

        const tableBody = document.querySelector('#usersTable tbody');
        tableBody.innerHTML = ''; // Clear the table

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.address.city}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Fetch and display user by ID
async function fetchUserById() {
    const userId = document.querySelector('#userIdInput').value;
    if (!userId) {
        alert('Por favor, ingresa un ID de usuario.');
        return;
    }

    try {
        console.log('Fetching user by ID:', userId);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error('Usuario no encontrado');
        }
        const user = await response.json();
        console.log('User fetched:', user);
        document.querySelector('#userDetails').innerHTML = `
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Teléfono:</strong> ${user.phone}</p>
        `;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        document.querySelector('#userDetails').innerHTML = `<p>${error.message}</p>`;
    }
}

// Fetch and display users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);

// Attach fetchUserById to the button click
document.querySelector('button').addEventListener('click', fetchUserById);
