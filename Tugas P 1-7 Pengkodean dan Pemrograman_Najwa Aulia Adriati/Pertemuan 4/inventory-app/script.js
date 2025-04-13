function fetchItems() {
  fetch('php/get_items.php')
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#inventoryTable tbody");
      tbody.innerHTML = "";
      data.forEach(item => {
        tbody.innerHTML += `
          <tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
            <td><button onclick="deleteItem(${item.id})">Hapus</button></td>
          </tr>
        `;
      });
    });
}

function addItem() {
  const name = document.getElementById('itemName').value;
  const qty = document.getElementById('itemQty').value;
  const price = document.getElementById('itemPrice').value;

  fetch('php/add_item.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `name=${name}&qty=${qty}&price=${price}`
  }).then(() => {
    fetchItems();
  });
}

function deleteItem(id) {
  fetch(`php/delete_item.php?id=${id}`)
    .then(() => fetchItems());
}

window.onload = fetchItems;
