document.addEventListener('DOMContentLoaded', () => {
    loadItems();

    const addItemForm = document.getElementById('addItemForm');
    if (addItemForm) {
        addItemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('itemName').value;
            const quantity = document.getElementById('itemQuantity').value;
            const price = document.getElementById('itemPrice').value;

            fetch('php/add_item.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `name=${encodeURIComponent(name)}&quantity=${encodeURIComponent(quantity)}&price=${encodeURIComponent(price)}`
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                alert(data);
                loadItems();
                addItemForm.reset();
            })
            .catch(error => {
                console.error('Error adding item:', error);
                alert('Failed to add item. Please check the console for details.');
            });
        });
    } else {
        console.error('Form not found!');
    }
});

function loadItems() {
    fetch('php/get_items.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById('inventoryTable');
            if (tableBody) {
                tableBody.innerHTML = '';
                data.forEach(item => {
                    // Format harga ke Rupiah tanpa desimal
                    const formattedPrice = Number(item.price).toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    });

                    const row = `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${formattedPrice}</td>
                            <td>${item.created_at}</td>
                            <td><button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button></td>
                        </tr>`;
                    tableBody.innerHTML += row;
                });
            } else {
                console.error('Table body not found!');
            }
        })
        .catch(error => {
            console.error('Error loading items:', error);
            alert('Failed to load items. Please check the console for details.');
        });
}

function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        fetch('php/delete_item.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${itemId}`
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            alert(data);
            loadItems();
        })
        .catch(error => {
            console.error('Error deleting item:', error);
            alert('Failed to delete item. Please check the console for details.');
        });
    }
}