// Function to load and display the menu data
async function loadMenuData() {
    const response = await fetch('menu.json');
    const data = await response.json();
    
    loadSection('sandwiches', data.sandwiches);
    loadSection('hot-drinks', data["hot-drinks"]);
    loadSection('tea', data.tea);
    loadSection('cold-drinks', data["cold-drinks"]);
    loadSection('breakfast', data.breakfast);

    loadAllSection(data);

    // Display notification when the menu is fully loaded
    showNotification('به کافه آقای خرچنگ خوش اومدید!');
}

// Function to load a specific section
function loadSection(section, items) {
    const sectionList = document.getElementById(`${section}-list`);
    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('menu-item');
        li.innerHTML = `<span>${item.name}</span><span>${item.price} تومان</span>`;
        sectionList.appendChild(li);
    });
}

// Function to load all sections in the "all" section
function loadAllSection(data) {
    const allSection = document.getElementById('all');

    Object.keys(data).forEach(section => {
        const sectionTitle = document.createElement('h3');
        sectionTitle.classList.add('text-xl', 'font-bold', 'mt-6', 'text-red-500');
        sectionTitle.textContent = getSectionTitle(section);

        allSection.appendChild(sectionTitle);

        const ul = document.createElement('ul');
        ul.classList.add('space-y-2');

        data[section].forEach(item => {
            const li = document.createElement('li');
            li.classList.add('menu-item');
            li.innerHTML = `<span>${item.name}</span><span>${item.price} تومان</span>`;
            ul.appendChild(li);
        });

        allSection.appendChild(ul);
    });
}

// Helper function to get the Farsi title for sections
function getSectionTitle(section) {
    switch (section) {
        case 'sandwiches': return 'ساندویچ‌ها';
        case 'hot-drinks': return 'نوشیدنی‌های گرم';
        case 'tea': return 'چای و دمنوش';
        case 'cold-drinks': return 'بار سرد';
        case 'breakfast': return 'منوی صبحانه';
        default: return 'سایر';
    }
}

// Search functionality
document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const items = document.querySelectorAll('.menu-item');
    
    if (query.length > 0) {
        // Collapse the section buttons and show the filter button
        collapseButtons();
    } else {
        // Expand the section buttons back when search is cleared
        expandButtons();
    }

    items.forEach(item => {
        const itemName = item.children[0].textContent.toLowerCase();
        if (itemName.includes(query)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});

// Collapse section buttons into a single "Filter" button
function collapseButtons() {
    const sectionButtons = document.getElementById('section-buttons');
    const filterButton = document.getElementById('filter-button');
    
    sectionButtons.classList.add('hidden');
    filterButton.classList.remove('hidden');
}

// Expand the section buttons back when the filter button is clicked
document.getElementById('filter-button').addEventListener('click', function() {
    expandButtons();
});

function expandButtons() {
    const sectionButtons = document.getElementById('section-buttons');
    const filterButton = document.getElementById('filter-button');

    sectionButtons.classList.remove('hidden');
    filterButton.classList.add('hidden');
}

// Function to show specific section and hide others
function showSection(section) {
    const sections = ['all', 'sandwiches', 'hot-drinks', 'tea', 'cold-drinks', 'breakfast'];
    sections.forEach(s => {
        document.getElementById(s).classList.add('hidden');
    });
    document.getElementById(section).classList.remove('hidden');
}

// Function to display notifications
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadMenuData);
