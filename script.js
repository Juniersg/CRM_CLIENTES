const users = {
  "Prueba": "1234",
  "Admin": "1234"
};

let editingClient = null;  // Variable global para saber si estamos editando un cliente

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (users[username] && users[username] === password) {
      document.getElementById("login-container").classList.add("hidden");
      document.getElementById("crm-container").classList.remove("hidden");
      document.getElementById("user-display").innerText = username;
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

// Función para agregar o actualizar cliente
function addClient() {
    const name = document.getElementById("client-name").value;
    const email = document.getElementById("client-email").value;
    const phone = document.getElementById("client-phone").value;

    // Validación del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("El correo electrónico no es válido.");
        return;
    }

    // Validación del teléfono
    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
        alert("El teléfono debe tener el formato 809-XXX-XXXX.");
        return;
    }

    const clientList = document.getElementById("client-list");

    if (editingClient) {
        // Actualizar cliente existente
        editingClient.children[0].innerText = name;
        editingClient.children[1].innerText = email;
        editingClient.children[2].innerText = phone;

        editingClient = null;
    } else {
        // Agregar nuevo cliente
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${phone}</td>
                            <td>
                                <button onclick="editClient(this)">Editar</button>
                                <button onclick="deleteClient(this)">Eliminar</button>
                            </td>`;
        clientList.appendChild(newRow);
    }

    // Limpiar los campos
    document.getElementById("client-name").value = "";
    document.getElementById("client-email").value = "";
    document.getElementById("client-phone").value = "";
}

// Función para editar cliente
function editClient(button) {
    const row = button.closest("tr");
    const name = row.children[0].innerText;
    const email = row.children[1].innerText;
    const phone = row.children[2].innerText;

    // Rellenar los campos de entrada con la información del cliente
    document.getElementById("client-name").value = name;
    document.getElementById("client-email").value = email;
    document.getElementById("client-phone").value = phone;

    // Marcar que estamos editando un cliente
    editingClient = row;
}

// Función para eliminar cliente
function deleteClient(button) {
    const row = button.closest("tr");
    row.remove();
}

// Función para exportar a Excel
function exportToExcel() {
    const table = document.querySelector("table");
    const wb = XLSX.utils.table_to_book(table, { sheet: "Clientes" });
    XLSX.writeFile(wb, "clientes.xlsx");
}
