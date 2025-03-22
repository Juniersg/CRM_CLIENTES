const users = {
    "Junier Soto": "1234",
    "Admin": "1234"
};

let editingClient = null; 
let selectedClientIndex = null;  

let clients = [
    { name: "Juan Pérez", email: "juan.perez@gmail.com", phone: "809-123-4567" },
    { name: "María García", email: "maria.garcia@gmail.com", phone: "809-234-5678" },
    { name: "Carlos Martínez", email: "carlos.martinez@gmail.com", phone: "809-345-6789" },
    { name: "Ana López", email: "ana.lopez@gmail.com", phone: "809-456-7890" },
    { name: "Pedro Rodríguez", email: "pedro.rodriguez@gmail.com", phone: "809-567-8901" }
];

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (users[username] && users[username] === password) {
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("crm-container").classList.remove("hidden");
        document.getElementById("user-display").innerText = username;
        loadClients();
    } else {
        errorMessage.innerText = "Usuario o contraseña incorrectos";
        errorMessage.style.color = "red";
    }
}

function logout() {
    document.getElementById("crm-container").classList.add("hidden");
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("error-message").innerText = "";
}

function addClient() {
    const name = document.getElementById("client-name").value;
    const email = document.getElementById("client-email").value;
    const phone = document.getElementById("client-phone").value;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("El correo electrónico no es válido.");
        return;
    }

    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
        alert("El teléfono debe tener el formato 809-XXX-XXXX.");
        return;
    }

    const client = { name, email, phone };

    if (editingClient !== null) {
        clients[editingClient] = client;
        editingClient = null;
    } else {
        clients.push(client);
    }

    clearForm();
    loadClients();
}

function loadClients() {
    const clientList = document.getElementById("client-list");
    clientList.innerHTML = "";

    clients.forEach((client, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${client.name}</td><td>${client.email}</td><td>${client.phone}</td>`;
        newRow.addEventListener("click", () => selectClient(index));
        clientList.appendChild(newRow);
    });

    clearSelection();
}

function selectClient(index) {
    selectedClientIndex = index;
    const client = clients[index];

    document.getElementById("client-name").value = client.name;
    document.getElementById("client-email").value = client.email;
    document.getElementById("client-phone").value = client.phone;
}

function exportToExcel() {
    const table = document.querySelector("table");
    const wb = XLSX.utils.table_to_book(table, { sheet: "Clientes" });
    XLSX.writeFile(wb, "clientes.xlsx");
}

function clearForm() {
    document.getElementById("client-name").value = "";
    document.getElementById("client-email").value = "";
    document.getElementById("client-phone").value = "";
}

function clearSelection() {
    selectedClientIndex = null;
}
