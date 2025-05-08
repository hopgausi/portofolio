// Function to load projects from JSON file
async function loadProjects(limit = null, featuredOnly = false) {
    try {
        // Fix the path to be relative instead of absolute
        const response = await fetch('./data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let projects = data.projects;

        // Filter for featured projects if requested
        if (featuredOnly) {
            projects = projects.filter(project => project.featured);
        }

        // Limit the number of projects if specified
        if (limit && !isNaN(limit)) {
            projects = projects.slice(0, limit);
        }

        return projects;
    } catch (error) {
        console.error('Error loading projects:', error);
        // Show the error in the console for debugging
        console.error('Fetch error details:', error.message);
        return [];
    }
}

// Function to render projects in the home page
async function renderHomeProjects() {
    console.log('Rendering home projects...');
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) {
        console.error('Projects container not found on home page');
        return;
    }

    // Load the first 3 projects
    const projects = await loadProjects(3, true);
    console.log('Loaded projects for home page:', projects);

    // Clear the container
    projectsContainer.innerHTML = '';

    if (projects.length === 0) {
        projectsContainer.innerHTML = '<div class="error-message">No projects found. Please check the JSON file.</div>';
        return;
    }

    // Render each project
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });

    // Add "View More" button
    const viewMoreContainer = document.createElement('div');
    viewMoreContainer.className = 'view-more-container';

    const viewMoreBtn = document.createElement('a');
    viewMoreBtn.href = 'projects.html';
    viewMoreBtn.className = 'btn view-more-btn';
    viewMoreBtn.innerHTML = 'View More Projects <i class="fas fa-arrow-right"></i>';

    viewMoreContainer.appendChild(viewMoreBtn);

    const projectsSection = document.querySelector('.projects .container');
    if (projectsSection) {
        projectsSection.appendChild(viewMoreContainer);
    } else {
        console.error('Projects section container not found');
    }
}

// Function to render all projects in the projects page
async function renderAllProjects() {
    console.log('Rendering all projects...');
    const projectsContainer = document.querySelector('.projects-list');
    if (!projectsContainer) {
        console.error('Projects list container not found on projects page');
        return;
    }

    // Load all projects
    const projects = await loadProjects();
    console.log('Loaded all projects:', projects);

    // Clear the container
    projectsContainer.innerHTML = '';

    if (projects.length === 0) {
        projectsContainer.innerHTML = '<div class="error-message">No projects found. Please check the JSON file.</div>';
        return;
    }

    // Render each project
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

// Function to render a single project detail
async function renderProjectDetail() {
    const projectDetailContainer = document.querySelector('.project-detail');
    if (!projectDetailContainer) return;

    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        window.location.href = 'projects.html';
        return;
    }

    // Load all projects and find the one with matching ID
    const projects = await loadProjects();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        projectDetailContainer.innerHTML = '<div class="error-message">Project not found</div>';
        return;
    }

    // Render project details
    projectDetailContainer.innerHTML = `
        <div class="project-header">
            <h1>${project.title}</h1>
            <div class="project-tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link-btn" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>` : ''}
                ${project.demoType === 'ui' ?
                    `<a href="${project.demoUrl}" class="project-link-btn" target="_blank"><i class="fas fa-desktop"></i> View Live Demo</a>` :
                    `<a href="${project.demoUrl}" class="project-link-btn" target="_blank"><i class="fas fa-book"></i> API Documentation</a>`
                }
            </div>
        </div>

        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>

        <div class="project-content">
            <div class="project-description">
                <h2>Project Overview</h2>
                <p>${project.fullDescription}</p>
            </div>

            <div class="project-features">
                <h2>Key Features</h2>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="project-tech-stack">
                <h2>Technology Stack</h2>
                <div class="tech-categories">
                    ${Object.entries(project.techStack).map(([category, techs]) => `
                        <div class="tech-category">
                            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                            <ul>
                                ${techs.map(tech => `<li>${tech}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="project-challenges">
                <h2>Challenges & Solutions</h2>
                <p>${project.challenges}</p>
            </div>

            <div class="project-outcome">
                <h2>Outcome</h2>
                <p>${project.outcome}</p>
            </div>

            ${project.blogPost ? `
            <div class="project-blog">
                <h2>Related Blog Post</h2>
                <div class="blog-post-card">
                    <h3>${project.blogPost.title}</h3>
                    <a href="${project.blogPost.url}" class="blog-post-link" target="_blank">
                        Read the article <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
            ` : ''}
        </div>
    `;
}

// Helper function to create a project card
function createProjectCard(project) {
    console.log('Creating project card for:', project.title);

    const card = document.createElement('div');
    card.className = 'project-card';

    // Add visible class immediately to ensure it's visible
    setTimeout(() => {
        card.classList.add('visible');
    }, 100);

    card.innerHTML = `
        <div class="project-img">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-tech">${project.technologies.join(' / ')}</div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.shortDescription}</p>
            <a href="project-detail.html?id=${project.id}" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
        </div>
    `;

    // Add inline styles to ensure visibility for debugging
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';

    return card;
}

// Initialize projects based on the current page
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on
    if (document.querySelector('.projects-grid')) {
        renderHomeProjects();
    } else if (document.querySelector('.projects-list')) {
        renderAllProjects();
    } else if (document.querySelector('.project-detail')) {
        renderProjectDetail();
    }
});
