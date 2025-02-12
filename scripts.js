// 1. Login functionality
const users = [
    { username: "admin", password: "admin123" },
    { username: "user1", password: "password1" }
];

// Login function
function login(event) {
    event.preventDefault(); // Prevent form submission

    const usernameInput = document.querySelector("input[name='username']").value;
    const passwordInput = document.querySelector("input[name='password']").value;

    // Check if user exists in the hardcoded users array
    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

    if (user) {
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

// Add event listener for login form submission
document.querySelector("form").addEventListener("submit", login);

// Function to display medicines
function displayMedicines() {
    const medicineList = document.getElementById("medicine-list");
    medicineList.innerHTML = ""; // Clear previous contents

    medicines.forEach(medicine => {
        const medicineCard = document.createElement("div");
        medicineCard.className = "medicine-card";
        medicineCard.innerHTML = `
            <h3>${medicine.name}</h3>
            <p>Expiry Date: ${medicine.expiryDate}</p>
            <button onclick="addToCart('${medicine.name}', ${medicine.quantity})">Add to Cart</button>
        `;
        medicineList.appendChild(medicineCard);
    });
}

// Function to add medicines to cart
function addToCart(medicineName, availableQuantity) {
    const quantity = prompt(`Enter quantity of ${medicineName} to add to cart (Available: ${availableQuantity}):`);
    const qtyNumber = parseInt(quantity);

    if (qtyNumber > 0 && qtyNumber <= availableQuantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the medicine is already in the cart
        const existingItem = cart.find(item => item.name === medicineName);

        if (existingItem) {
            // Update the quantity if already in cart
            existingItem.quantity += qtyNumber;
        } else {
            // Add new item to cart
            cart.push({ name: medicineName, quantity: qtyNumber });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${qtyNumber} of ${medicineName} added to cart!`);
    } else {
        alert("Invalid quantity entered.");
    }
}

// Function to handle checkout and redirect to cart page
function checkout() {
    window.location.href = 'cart.html';
}

// Function to filter and display medicines based on search
function searchMedicines() {
    const searchValue = document.getElementById("search-bar").value.toLowerCase();
    const filteredMedicines = medicines.filter(medicine => medicine.name.toLowerCase().includes(searchValue));
    const medicineList = document.getElementById("medicine-list");
    medicineList.innerHTML = ""; // Clear previous contents

    filteredMedicines.forEach(medicine => {
        const medicineCard = document.createElement("div");
        medicineCard.className = "medicine-card";
        medicineCard.innerHTML = `
            <h3>${medicine.name}</h3>
            <p>Expiry Date: ${medicine.expiryDate}</p>
            <button onclick="addToCart('${medicine.name}', ${medicine.quantity})">Add to Cart</button>
        `;
        medicineList.appendChild(medicineCard);
    });
}

// Call displayMedicines to show initial medicines
displayMedicines();
