const currentPage = window.location.pathname.split('/').pop();
  const isAddToCartPage = currentPage === 'addToCart.html';

  const urlParams = new URLSearchParams(window.location.search);
  const itemName = isAddToCartPage ? urlParams.get('name') : null;
  const itemPrice = isAddToCartPage ? urlParams.get('price') : null;

  if (isAddToCartPage && itemName && itemPrice)
    {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems.push({ name: itemName, price: itemPrice });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

  const cartTable = document.getElementById('cartTable');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  for (let i = 0; i < cartItems.length; i++) 
  {
    const item = cartItems[i];
    const newRow = cartTable.insertRow();

    const nameCell = newRow.insertCell(0);
    const priceCell = newRow.insertCell(1);
    const actionCell = newRow.insertCell(2);

    nameCell.textContent = item.name;
    priceCell.textContent = item.price;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function () {
      cartTable.deleteRow(newRow.rowIndex);
      cartItems.splice(i, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      calculateTotalPrice();
    });

    actionCell.appendChild(removeButton);
  }
  calculateTotalPrice();

  function calculateTotalPrice()
  {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += parseFloat(cartItems[i].price);
    }

    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = 'Total Price: RM ' + total.toFixed(2);
  }
  
const purchaseButton = document.getElementById('purchaseButton');
  purchaseButton.addEventListener('click', function() {
    // Display pop-up message
    alert('Thanks for your purchase.');
  });
