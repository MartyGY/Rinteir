document.getElementById('applyFilters').addEventListener('click', function() {
    let selectedPrice = parseInt(document.getElementById('price').value);
    let selectedColor = document.querySelector('input[name="color"]:checked')?.value;
    let selectedRGB = Array.from(document.querySelectorAll('input[name="rgb"]:checked')).map(checkbox => checkbox.value);

    let products = document.querySelectorAll('.product-item');
    products.forEach(product => {
        let productPrice = parseInt(product.getAttribute('data-price'));
        let productColor = product.getAttribute('data-color');
        let productRGB = product.getAttribute('data-rgb');

        let matchesPrice = selectedPrice ? productPrice <= selectedPrice : true;
        let matchesColor = selectedColor ? productColor === selectedColor : true;
        let matchesRGB = selectedRGB.length > 0 ? selectedRGB.includes(productRGB) : true;

        if (matchesPrice && matchesColor && matchesRGB) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});