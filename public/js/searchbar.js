document.addEventListener("DOMContentLoaded", () => {
    initSearchBar();
});
function initSearchBar() {
    document.getElementById("js-searchbar").addEventListener("input", function () {
        let searchTerm = this.value.toLowerCase().replace(/\s+/g, " ");
        let cards = document.querySelectorAll('[id^="js-pokemon-card-"]');
        let regions = document.querySelectorAll('[id^="js-region-"]');

        cards.forEach(function (card) {
            let pokeId = (
                card.getAttribute("data-pokemonid") || ""
            ).toLowerCase();
            let pokeEnName = (card.getAttribute("data-enname") || "").toLowerCase().replace(/\s+/g, " ");
            let pokeDeName = (card.getAttribute("data-dename") || "").toLowerCase().replace(/\s+/g, " ");
            let counter = card.id.split("-").pop();

            let row = document.getElementById("js-pokemon-row-" + counter);
            let matchesSearch =
                pokeId.includes(searchTerm) ||
                pokeDeName.includes(searchTerm) ||
                pokeEnName.includes(searchTerm);

            // Toggle the 'hide-searchbar' class based on search match
            row.classList.toggle("hide-searchbar", !matchesSearch);
        });

        regions.forEach(function (region) {
            let regionName;
            if (region.id.includes('-')) {
                regionName = region.id.split('-').pop();
            } else {
                regionName = region.id;  // Fallback if there's no hyphen
            }

            let regionCategories = document.querySelectorAll('[id^="js-category-' + regionName + '-"]');
            let regionRowCategories = document.querySelectorAll('[id^="js-category-row-' + regionName + '-"]');

            let allCategoriesHidden = true;
            

            regionCategories.forEach(function (category,  index) {
                let categoryName;
                if (category.id.includes('-')) {
                    categoryName = category.id.split('-').pop();
                } else {
                    categoryName = category.id;  // Fallback if there's no hyphen
                }

                let rows = regionRowCategories[index].querySelectorAll(`[id^="js-pokemon-row-"]`);
                
                // Check if all rows in the category are hidden
                const allRowsHidden = Array.from(rows).every((row) =>
                    row.classList.contains("hide-searchbar")
                );

                // Toggle category visibility based on rows' visibility
                category.classList.toggle(
                    "hide-searchbar",
                    allRowsHidden
                );
                // If any category is visible, the region should not be hidden
                if (!allRowsHidden) {
                    allCategoriesHidden = false;
                }
            });

            // Toggle region visibility based on categories' visibility
            region.classList.toggle("hide-searchbar", allCategoriesHidden);

        });

        let allRegionsHidden = Array.from(regions).every((region) =>
            region.classList.contains("hide-searchbar")
        );

        const notFoundText = document.getElementById('js-not-found')
        notFoundText.classList.toggle("hide-searchbar", !allRegionsHidden);
    });
}


