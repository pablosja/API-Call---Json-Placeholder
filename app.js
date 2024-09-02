async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

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

async function fetchUserById() {
    const userId = document.querySelector('#userIdInput').value;
    if (!userId) {
        alert('Por favor, ingresa un ID de usuario.');
        return;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error('Usuario no encontrado');
        }
        const user = await response.json();
        document.querySelector('#userDetails').innerHTML = `
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Teléfono:</strong> ${user.phone}</p>
        `;
    } catch (error) {
        document.querySelector('#userDetails').innerHTML = `<p>${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', fetchUsers);

document.querySelector('button').addEventListener('click', fetchUserById);
