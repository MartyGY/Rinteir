document.addEventListener("DOMContentLoaded", function() {
    const dropdownButton = document.getElementById("categoryDropdownButton");
    const dropdownContent = document.getElementById("categoryDropdownContent");
    const productItems = document.querySelectorAll(".product-item");
    const allCategoriesLink = document.querySelector('.category-dropdown-content a[data-category="Все категории"]');

    // Show/hide dropdown content on hover
    dropdownButton.addEventListener("mouseenter", function() {
        dropdownContent.classList.add("show-dropdown");
    });

    dropdownButton.addEventListener("mouseleave", function() {
        dropdownContent.classList.remove("show-dropdown");
    });

    allCategoriesLink.addEventListener("click", function(event) {
        event.preventDefault();
        dropdownContent.classList.add("show-dropdown");
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
                if (item.getAttribute("data-category") === selectedCategory || selectedCategory === "Все категории") {
                    item.style.display = "block";
                }
            });

            // Update dropdown button text
            dropdownButton.textContent = selectedCategory === "Все категории" ? "Выбрать категорию" : selectedCategory;
            dropdownContent.classList.remove("show-dropdown");
        });
    });

    // Close dropdown if clicked outside
    window.addEventListener("click", function(event) {
        if (!event.target.matches('.category-dropdown-button')) {
            if (dropdownContent.classList.contains('show-dropdown')) {
                dropdownContent.classList.remove('show-dropdown');
            }
        }
    });
});
