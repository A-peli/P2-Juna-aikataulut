// Annetaan elementtien latautua ja vasta sitten haetaan DOM-elementit ja ajetaan loput koodista (nuolifunktiolla)
document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("category");
    const fetchDataButton = document.getElementById("fetchData");
    const productList = document.getElementById("productList");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");


    /* HAKUTOIMINNOT DROPDOWN KATEGORIA & CUSTOM STRING HAKU */
    // klikatessa haetaan valittu kategoria
    fetchDataButton.addEventListener("click", () => {
      const category = categorySelect.value;
      fetchProductsByCategory(category);
    });
  
    //klikatessa haetaan käyttäjän syötteellä
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
          fetchProductsBySearch(searchTerm);
        }
      });


    /* TUOTTEIDEN HAKEMINEN VALITULLA HAKUTAVALLA  */
    // Haetaan API:lta valitun kategorian tuotteet
    function fetchProductsByCategory(category) {
      const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
  
      fetch(url)
        .then(response => response.json())
        .then(products => displayProducts(products))
/*         .catch(error => console.error("Failed to fetch data", error)); */
    }
    //Haetaan API:lta valitut tuotteet (hakusanan mukaan)
    function fetchProductsBySearch(searchTerm) {
        const url = `https://fakestoreapi.com/products`;
  
        fetch(url)
          .then(response => response.json())
          .then(products => {
            // Suodatetaan tuotteet hakusanan perusteella
            const filteredProducts = products.filter(product =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            displayProducts(filteredProducts);
          })
 /*          .catch(error => console.error("Failed to fetch data", error)); */
      }

    // Näytetään tuotteet productList-elementissä
    function displayProducts(products) {
      // Tyhjennetään aiempi sisältö
      productList.innerHTML = "";
  
      // Käydään läpi tuotteet ja luodaan HTML-elementit tuotteille yksitellen
      products.forEach((product) => {
        const productEl = document.createElement("div");
        productEl.className = "product";
        productEl.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p><strong>Price:</strong> $${product.price}</p>
        `;
  
        // Lisätään tuotteet productList-elementtiin
        productList.appendChild(productEl);
      });
    }
  });