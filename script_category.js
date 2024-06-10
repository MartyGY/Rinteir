document.addEventListener("DOMContentLoaded", function() {
    const dropdownButton = document.getElementById("categoryDropdownButton");
    const dropdownContent = document.getElementById("categoryDropdownContent");
    const productItems = document.querySelectorAll(".product-item");

    // Show/hide dropdown content
    dropdownButton.addEventListener("click", function() {
        dropdownContent.classList.toggle("show");
    });

    // Filter products by category
    dropdownContent.querySelectorAll("a").forEach(function(categoryLink) {
        categoryLink.addEventListener("click", function(event) {
            event.preventDefault();
            const selectedCategory = categoryLink.getAttribute("data-category");

            // Hide all products initially
            productItems.forEach(function(item) {
                item.style.display = "none";
            });

            // Show products that match the selected category
            productItems.forEach(function(item) {
                if (item.getAttribute("data-category") === selectedCategory) {
                    item.style.display = "block";
                }
            });

            // Update dropdown button text
            dropdownButton.textContent = selectedCategory;
            dropdownContent.classList.remove("show");
        });
    });

    // Close dropdown if clicked outside
    window.addEventListener("click", function(event) {
        if (!event.target.matches('.category-dropdown-button')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });

    // Handle "Все категории" click
    const allCategoriesLink = document.querySelector('.category-dropdown-content a[data-category="Все категории"]');
    allCategoriesLink.addEventListener('click', function(event) {
        event.preventDefault();
        // Reset the displayed products to show all
        productItems.forEach(function(item) {
            item.style.display = "block";
        });
        // Update dropdown button text to "Выбрать категорию"
        dropdownButton.textContent = "Выбрать категорию";
        dropdownContent.classList.remove("show");
    });
});
