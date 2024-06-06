document.addEventListener('DOMContentLoaded', () => {
    const productInfoModal = document.getElementById('productInfoModal');
    const productInfoCloseButton = productInfoModal.querySelector('.close');
    const productInfoTitle = document.getElementById('productInfoTitle');
    const productInfoImage = document.getElementById('productInfoImage');
    const productInfoDescription = document.getElementById('productInfoDescription');
    const productInfoPrice = document.getElementById('productInfoPrice'); // New line for price
    const addToCartFromModalButton = document.getElementById('addToCartFromModal');
    let currentProductData = {};

    productInfoCloseButton.addEventListener('click', () => {
        productInfoModal.style.display = 'none';
    });

    document.querySelectorAll('.product-info-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const productItem = event.target.closest('.product-item');
            const title = productItem.dataset.title;
            const image = productItem.dataset.image;
            const features = JSON.parse(productItem.dataset.features);
            const price = productItem.querySelector('.add-to-cart').dataset.price;

            currentProductData = { title, image, price };

            productInfoTitle.textContent = title;
            productInfoImage.src = image;
            productInfoDescription.innerHTML = features.map(feature => `<p>${feature}</p>`).join('');
            productInfoPrice.textContent = ` ${price} ₸`; // New line for displaying price

            productInfoModal.style.display = 'block';
        });
    });

    addToCartFromModalButton.addEventListener('click', () => {
        addToCart(currentProductData.price, currentProductData.title, currentProductData.image);
        productInfoModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === productInfoModal) {
            productInfoModal.style.display = 'none';
        }
    });

    function addToCart(price, title, image) {
        const event = new CustomEvent('add-to-cart', {
            detail: { price, title, image }
        });
        document.dispatchEvent(event);
    }
});