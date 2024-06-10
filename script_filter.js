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
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
});

document.getElementById('resetFilters').addEventListener('click', function() {
    // Reset the price range
    const priceInput = document.getElementById('price');
    priceInput.value = 0;
    document.getElementById('priceValue').innerText = priceInput.value;

    // Reset the color radio buttons
    const colorRadios = document.getElementsByName('color');
    colorRadios.forEach(radio => radio.checked = false);

    // Reset the RGB checkboxes
    const rgbCheckboxes = document.getElementsByName('rgb');
    rgbCheckboxes.forEach(checkbox => checkbox.checked = false);
});
