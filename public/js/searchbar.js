document.addEventListener("DOMContentLoaded", () => {
    initSearchBar();
    getPossibleUrlParameter();
});

function initSearchBar() {
    document.getElementById("js-searchbar").addEventListener("input", function () {
        let searchTerm = this.value.toLowerCase().replace(/\s+/g, " ");
        let cards = document.querySelectorAll('[id^="js-pokemon-card-"]');
        let regions = document.querySelectorAll('[id^="js-region-"]');

        // Track visible Pokémon IDs and regions
        let visiblePokemonIds = new Set();
        let regionVisibilityMap = new Map(); // Map to track visible Pokémon in each region

        // Initialize region visibility map
        regions.forEach(region => regionVisibilityMap.set(region.id, false));

        // First pass: check matches and populate `visiblePokemonIds`
        cards.forEach(function (card) {
            let pokeId = (card.getAttribute("data-pokemonid") || "").toLowerCase();
            let pokeEnName = (card.getAttribute("data-enname") || "").toLowerCase().replace(/\s+/g, " ");
            let pokeDeName = (card.getAttribute("data-dename") || "").toLowerCase().replace(/\s+/g, " ");
            let counter = card.id.split("-").pop();
            let row = document.getElementById("js-pokemon-row-" + counter);

            let matchesSearch =
                pokeId.includes(searchTerm) ||
                pokeDeName.includes(searchTerm) ||
                pokeEnName.includes(searchTerm);

            if (matchesSearch) {
                visiblePokemonIds.add(pokeId); // Add matching Pokémon ID to the visible set
                let regionId = card.closest('[id^="js-region-"]').id;
                regionVisibilityMap.set(regionId, true); // Mark region as having visible Pokémon
            }

            row.classList.toggle("hide-searchbar", !matchesSearch);
        });

        // Second pass: check relations and ensure visibility for related Pokémon
        cards.forEach(function (card) {
            let relatedIdsString = card.getAttribute("data-relations") || "";
            let relatedIds = relatedIdsString.split(",").map(id => id.trim()); // Split and trim related IDs
            let counter = card.id.split("-").pop();
            let row = document.getElementById("js-pokemon-row-" + counter);

            // If any related Pokémon is visible, ensure this one is also visible
            let hasVisibleRelation = relatedIds.some(id => visiblePokemonIds.has(id));

            if (hasVisibleRelation) {
                row.classList.remove("hide-searchbar");
                visiblePokemonIds.add(card.getAttribute("data-pokemonid")); // Add this Pokémon to the visible set

                let regionId = card.closest('[id^="js-region-"]').id;
                regionVisibilityMap.set(regionId, true); // Mark region as having visible Pokémon
            }
        });

        // Update region visibility
        regions.forEach(function (region) {
            let regionId = region.id;
            let isVisible = regionVisibilityMap.get(regionId);
            region.classList.toggle("hide-searchbar", !isVisible);
        });

        // Update category visibility within regions
        regions.forEach(function (region) {
            let regionName = region.id.includes("-") ? region.id.split("-").pop() : region.id;
            let regionCategories = document.querySelectorAll('[id^="js-category-' + regionName + '-"]');
            let regionRowCategories = document.querySelectorAll('[id^="js-category-row-' + regionName + '-"]');

            regionCategories.forEach(function (category, index) {
                let rows = regionRowCategories[index].querySelectorAll(`[id^="js-pokemon-row-"]`);

                const allRowsHidden = Array.from(rows).every((row) =>
                    row.classList.contains("hide-searchbar")
                );

                category.classList.toggle("hide-searchbar", allRowsHidden);
            });
        });

        // Show or hide the "not found" text
        let allRegionsHidden = Array.from(regions).every((region) =>
            region.classList.contains("hide-searchbar")
        );

        const notFoundText = document.getElementById("js-not-found");
        notFoundText.classList.toggle("hide-searchbar", !allRegionsHidden);
    });
}

function getPossibleUrlParameter() {
    const url = new URL(window.location.href);
    const query = decodeURIComponent(url.search.substring(1));
    let searchbar = document.getElementById("js-searchbar");
    searchbar.value = query;
    
    searchbar.dispatchEvent(new Event('input', { bubbles: true }));
}
