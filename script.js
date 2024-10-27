// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category");
  const fetchDataButton = document.getElementById("fetchData");
  const productList = document.getElementById("productList");

  // Event listener for the fetch button
  fetchDataButton.addEventListener("click", () => {
    const category = categorySelect.value;
    fetchProducts(category);
  });

  // Fetch products from the API based on the selected category
  function fetchProducts(category) {
    const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;

    // Create a new XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    // Process the response when it comes back
    xhr.onload = function () {
      if (xhr.status === 200) {
        const products = JSON.parse(xhr.responseText);
        displayProducts(products);
      } else {
        console.error("Failed to fetch data");
      }
    };

    // Send the request
    xhr.send();
  }

  // Display the products in the productList element
  function displayProducts(products) {
    // Clear any previous content
    productList.innerHTML = "";

    // Iterate over the products and create HTML elements for each
    products.forEach((product) => {
      const productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
      `;

      // Append each product to the product list
      productList.appendChild(productEl);
    });
  }
});