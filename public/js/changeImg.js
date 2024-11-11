function changeImg(url, id, badge, text) {
    const imgElement = document.getElementById(id);
    const badgeElement = document.getElementById(badge);

    imgElement.src = url;

    if (badgeElement) {
        // If the badge element is hidden (display: none)
        if (badgeElement.style.display === 'none' || getComputedStyle(badgeElement).display === 'none') {
            if (text === 'normal') {
                // If the text is 'normal', hide the badge
                badgeElement.style.display = 'none';
            } else {
                // Otherwise, show the badge and update its text
                badgeElement.style.display = 'block';  // Or 'inline' or any appropriate display value
                badgeElement.textContent = text;  // Set the badge content to the text passed
            }
        } else {
            // If the badge is already visible, update its content based on the text
            if (text === 'normal') {
                badgeElement.style.display = 'none';  // Hide the badge if the text is 'normal'
            } else {
                badgeElement.style.display = 'block';  // Show the badge for any other text
                badgeElement.textContent = text;  // Set the badge content to the text passed
            }
        }
    }
}