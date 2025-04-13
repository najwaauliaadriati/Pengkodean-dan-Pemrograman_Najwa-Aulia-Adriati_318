// Data dummy untuk persediaan barang
let inventory = [
    { id: 1, name: "Barang A", quantity: 10 },
    { id: 2, name: "Barang B", quantity: 5 },
];

// Fungsi untuk menampilkan daftar barang
function renderInventory() {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = ""; // Bersihkan daftar sebelumnya

    inventory.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.textContent = `${item.name} - Stok: ${item.quantity}`;
        inventoryList.appendChild(itemDiv);
    });
}

// Fungsi untuk menambah barang baru
document.getElementById("add-item-btn").addEventListener("click", () => {
    const itemName = prompt("Masukkan nama barang:");
    const itemQuantity = parseInt(prompt("Masukkan jumlah stok:"));

    if (itemName && !isNaN(itemQuantity)) {
        const newItem = {
            id: inventory.length + 1,
            name: itemName,
            quantity: itemQuantity,
        };
        inventory.push(newItem);
        renderInventory();
    } else {
        alert("Input tidak valid!");
    }
});

// Inisialisasi tampilan awal
renderInventory();