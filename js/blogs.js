// Function to load blogs from JSON file
async function loadBlogs(limit = null, featuredOnly = false) {
    try {
        console.log('Loading blogs from JSON...');
        const response = await fetch('./data/blogs.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        let blogs = data.blogs;
        
        // Filter for featured blogs if requested
        if (featuredOnly) {
            blogs = blogs.filter(blog => blog.featured);
        }
        
        // Sort blogs by date (newest first)
        blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Limit the number of blogs if specified
        if (limit && !isNaN(limit)) {
            blogs = blogs.slice(0, limit);
        }
        
        console.log(`Loaded ${blogs.length} blogs`);
        return blogs;
    } catch (error) {
        console.error('Error loading blogs:', error);
        return [];
    }
}

// Function to render blogs in the home page
async function renderHomeBlogs() {
    console.log('Rendering home blogs...');
    const blogsContainer = document.querySelector('.blogs-grid');
    if (!blogsContainer) {
        console.error('Blogs container not found on home page');
        return;
    }
    
    // Load the first 3 featured blogs
    const blogs = await loadBlogs(3, true);
    
    // Clear the container
    blogsContainer.innerHTML = '';
    
    if (blogs.length === 0) {
        blogsContainer.innerHTML = '<div class="error-message">No blog posts found. Please check the JSON file.</div>';
        return;
    }
    
    // Render each blog
    blogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        blogsContainer.appendChild(blogCard);
    });
}

// Function to render all blogs in the blogs page
async function renderAllBlogs() {
    console.log('Rendering all blogs...');
    const blogsContainer = document.querySelector('.blogs-list');
    if (!blogsContainer) {
        console.error('Blogs list container not found on blogs page');
        return;
    }
    
    // Load all blogs
    const blogs = await loadBlogs();
    
    // Clear the container
    blogsContainer.innerHTML = '';
    
    if (blogs.length === 0) {
        blogsContainer.innerHTML = '<div class="error-message">No blog posts found. Please check the JSON file.</div>';
        return;
    }
    
    // Render each blog
    blogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        blogsContainer.appendChild(blogCard);
    });
}

// Function to render a single blog detail
async function renderBlogDetail() {
    console.log('Rendering blog detail...');
    const blogDetailContainer = document.querySelector('.blog-detail');
    if (!blogDetailContainer) {
        console.error('Blog detail container not found');
        return;
    }
    
    // Get blog ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    
    if (!blogId) {
        window.location.href = 'blogs.html';
        return;
    }
    
    // Load all blogs and find the one with matching ID
    const blogs = await loadBlogs();
    const blog = blogs.find(b => b.id === blogId);
    
    if (!blog) {
        blogDetailContainer.innerHTML = '<div class="error-message">Blog post not found</div>';
        return;
    }
    
    // Format the date
    const formattedDate = formatDate(blog.date);
    
    // Render blog details
    blogDetailContainer.innerHTML = `
        <div class="blog-header">
            <h1>${blog.title}</h1>
            <div class="blog-meta">
                <span class="blog-date">${formattedDate}</span>
                <span class="blog-platform">${blog.platform}</span>
                <span class="blog-read-time">${blog.readTime}</span>
            </div>
            <div class="blog-tags">
                ${blog.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
        </div>
        
        <div class="blog-image">
            <img src="${blog.image}" alt="${blog.title}">
        </div>
        
        <div class="blog-content">
            <p>${blog.content}</p>
            <div class="blog-cta">
                <a href="${blog.url}" class="btn" target="_blank">
                    Read Full Article on ${blog.platform} <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;
}

// Helper function to create a blog card
function createBlogCard(blog) {
    console.log('Creating blog card for:', blog.title);
    
    // Format the date
    const formattedDate = formatDate(blog.date);
    
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    card.innerHTML = `
        <div class="blog-img">
            <img src="${blog.image}" alt="${blog.title}">
            <div class="blog-platform">${blog.platform}</div>
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <span class="blog-date">${formattedDate}</span>
                <span class="blog-read-time">${blog.readTime}</span>
            </div>
            <h3>${blog.title}</h3>
            <p>${blog.summary}</p>
            <a href="${blog.url}" class="blog-link" target="_blank">Read on ${blog.platform} <i class="fas fa-external-link-alt"></i></a>
        </div>
    `;
    
    return card;
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize blogs based on the current page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing blogs...');
    
    // Check which page we're on
    if (document.querySelector('.blogs-grid')) {
        renderHomeBlogs();
    } else if (document.querySelector('.blogs-list')) {
        renderAllBlogs();
    } else if (document.querySelector('.blog-detail')) {
        renderBlogDetail();
    }
});
