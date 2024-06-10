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
});