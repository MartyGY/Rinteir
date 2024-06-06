document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".hero-slide");
    let currentSlide = 0;
    const intervalTime = 5000; // 5 seconds

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, intervalTime);

    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotalContainer = document.getElementById("cartTotal");
    const cartButton = document.getElementById("cartButton");
    const cartModal = document.getElementById("cartModal");
    const closeCartButton = document.querySelector(".close");
    const continueShoppingButton = document.getElementById("continueShoppingButton");
    const checkoutButton = document.getElementById("checkoutButton");
    const clearCartButton = document.getElementById("clearCartButton");
    let cartItems = [];

    // Initial display for cart
    updateCartDisplay();

    // Event listener for add to cart buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const price = parseFloat(this.getAttribute("data-price"));
            const title = this.getAttribute("data-title");
            const image = this.getAttribute("data-image");

            addToCart(price, title, image);
        });
    });

    function addToCart(price, title, image) {
        const existingProduct = cartItems.find(item => item.title === title);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartItems.push({ price, title, image, quantity: 1 });
        }

        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = "<p>Пусто</p>";
            cartTotalContainer.innerHTML = `<h3>Общая сумма: ${total} ₸</h3>`;
        } else {
            cartItems.forEach(item => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>${item.price} ₸</p>
                        <div class="quantity-controls">
                            <button class="quantity-minus" data-title="${item.title}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-plus" data-title="${item.title}">+</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
                total += item.price * item.quantity;
            });

            cartTotalContainer.innerHTML = `<h3>Общая сумма: ${total} ₸</h3>`;
        }

        // Add event listeners for quantity buttons
        document.querySelectorAll(".quantity-minus").forEach(button => {
            button.addEventListener("click", function() {
                const title = this.getAttribute("data-title");
                changeQuantity(title, -1);
            });
        });

        document.querySelectorAll(".quantity-plus").forEach(button => {
            button.addEventListener("click", function() {
                const title = this.getAttribute("data-title");
                changeQuantity(title, 1);
            });
        });
    }

    function changeQuantity(title, amount) {
        const product = cartItems.find(item => item.title === title);
        if (product) {
            product.quantity += amount;
            if (product.quantity <= 0) {
                cartItems = cartItems.filter(item => item.title !== title);
            }
            updateCartDisplay();
        }
    }

    // Modal (cart) logic
    cartButton.addEventListener("click", function() {
        cartModal.style.display = "block";
    });

    closeCartButton.addEventListener("click", function() {
        cartModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    // Checkout logic
    checkoutButton.addEventListener("click", function() {
        alert("Оформление заказа...");
    });

    // Clear cart logic
    clearCartButton.addEventListener("click", function() {
        cartItems = [];
        updateCartDisplay();
    });

    // Continue shopping logic
    continueShoppingButton.addEventListener("click", function() {
        cartModal.style.display = "none";
    });
});