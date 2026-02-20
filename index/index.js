// Portfolio data structure
const portfolioData = {
    title: "Gülsen Namıduru",
    projects: [
        {
            id: 5,
            title: "05 - Sylwester Stalker",
            year: "2024",
            category: "video",
            medium: "video",
            // ========== PROJECT DESCRIPTION START ==========
            shortDescription: "Content coming soon...",
            fullDescription: "Content coming soon...",
            // ========== PROJECT DESCRIPTION END ==========
            images: [],
            videos: [
                // Add your video file path here, e.g.:
                // "videos/sylwester_stalker.mp4"
            ]
        },
        {
            id: 3,
            title: "03 - hieroglyphs",
            year: "2022",
            category: "drawing",
            medium: "drawing",
            // ========== PROJECT DESCRIPTION START ==========
            shortDescription: "an attempt to reclaim geometry and it's language, to create an affective symbolism out of them",
            fullDescription: "an attempt to reclaim geometry and it's language, to create an affective symbolism out of them",
            // ========== PROJECT DESCRIPTION END ==========
            images: [
                "img/hiyeroglifler/daire çalışma.jpg",
                "img/hiyeroglifler/üçgen çalışması.jpg"
            ]
        },
        {
            id: 2,
            title: "02 - Abandoned Battle Ground",
            year: "2023",
            category: "photography",
            medium: "photography",
            // ========== PROJECT DESCRIPTION START ==========
            shortDescription: "a photographical research on rubbish, and urban exclusion",
            fullDescription: "The foundation of my project lies in the photographs I capture during walks in gentrified areas or areas in the danger of being gentrified such as Wedding, Moabit, Pankow, Neukölln, and Kreuzberg.\n\nBerlin is renowned for its positive qualities as well as its reputation for being dirty. Rather than merely perceiving this as a failure of the city, the concept of \"rubbish\" and its correspondent in state agenda, waste management, emerges as a form of urban exclusion. To highlight this exclusion, I adopt an archaeological approach to rubbish within the urban periphery. I focus on groups of objects that are out-of-use, discarded, and abandoned in the city.",
            // ========== PROJECT DESCRIPTION END ==========
            images: [
                "img/abandoned_battleground/abandoned_battle_ground_1.jpg",
                "img/abandoned_battleground/abandoned_battle_ground_2.jpg",
                "img/abandoned_battleground/abandoned_battle_ground_3.jpg"
            ]
        },
        {
            id: 1,
            title: "01 - Architectures Of Sky",
            year: "2024",
            category: "photography",
            medium: "photography",
            // ========== PROJECT DESCRIPTION START ==========
            shortDescription: "a photography series aiming to create an index for objects furnishing sky",
            fullDescription: "A photography project focuses on the industrial elements, searching for micro fragments within their imposing presence, details that, when isolated, reveal an unexpected aesthetic resonance. In their intersections and overlaps, a visual language emerges, reminiscre formal compositions, the project attempts to undo the numb efficiency imposed on their aesthetics. In doing so, it reclaims a sense of affect and engagement within an industrial language built for optimization rather than expression.",
            // ========== PROJECT DESCRIPTION END ==========
            images: [
                "img/architecture_of_sky/architecture_of_sky.jpg",
                "img/architecture_of_sky/architectures_of_sky_2.jpg",
                "img/architecture_of_sky/architectures_of_sky_3.jpg",
                "img/architecture_of_sky/_DSC5409.jpg"
            ]
        }
    ]
};

// State management
let currentProject = null;
let currentSlideIndex = 0;
let slideshowTimer = null;

// DOM elements
const portfolioIndex = document.getElementById('portfolio-index');
const popupModal = document.getElementById('popup-modal');
const detailView = document.getElementById('detail-view');
const popupTitle = document.getElementById('popup-title');
const popupMedium = document.getElementById('popup-medium');
const popupShortDescription = document.getElementById('popup-short-description');
const slideshowContainer = document.getElementById('slideshow-container');
const slideCounter = document.getElementById('slide-counter');
const prevSlideBtn = document.getElementById('prev-slide');
const nextSlideBtn = document.getElementById('next-slide');
const moreLink = document.getElementById('more-link');
const closePopupBtn = document.getElementById('close-popup');
const detailTitle = document.getElementById('detail-title');
const detailImages = document.getElementById('detail-images');
const closeDetailBtn = document.getElementById('close-detail');
const cvLink = document.getElementById('cv-link');
const cvView = document.getElementById('cv-view');
const cvContent = document.getElementById('cv-content');
const closeCvBtn = document.getElementById('close-cv');
const contactLink = document.getElementById('contact-link');
const contactView = document.getElementById('contact-view');
const contactContent = document.getElementById('contact-content');
const closeContactBtn = document.getElementById('close-contact');
const cvPageLink = document.getElementById('cv-page-link');
const cvPageView = document.getElementById('cv-page-view');
const cvPageContent = document.getElementById('cv-page-content');
const closeCvPageBtn = document.getElementById('close-cv-page');
const photographyLink = document.getElementById('photography-link');
const photographyView = document.getElementById('photography-view');
const photographyContent = document.getElementById('photography-content');
const closePhotographyBtn = document.getElementById('close-photography');
const videoLink = document.getElementById('video-link');
const videoView = document.getElementById('video-view');
const videoContent = document.getElementById('video-content');
const closeVideoBtn = document.getElementById('close-video');
const sculptureLink = document.getElementById('sculpture-link');
const sculptureView = document.getElementById('sculpture-view');
const sculptureContent = document.getElementById('sculpture-content');
const closeSculptureBtn = document.getElementById('close-sculpture');

// Initialize portfolio index
function initializeIndex() {
    portfolioData.projects.forEach((project) => {
        const li = document.createElement('li');
        li.textContent = project.title;
        li.dataset.projectId = project.id;
        li.dataset.category = project.category.toLowerCase();
        li.dataset.medium = project.medium ? project.medium.toLowerCase() : '';
        li.addEventListener('click', () => openPopup(project));
        portfolioIndex.appendChild(li);
    });
}

// Open popup modal
function openPopup(project) {
    currentProject = project;
    currentSlideIndex = 0;

    // Set popup content
    popupTitle.textContent = `${project.title} (${project.year})`;
    if (project.medium) {
        popupMedium.textContent = project.medium;
        popupMedium.style.display = 'inline';
    } else {
        popupMedium.style.display = 'none';
    }
    popupShortDescription.textContent = project.shortDescription;

    // Combine images and videos into a media array
    const mediaItems = [];
    if (project.images && project.images.length > 0) {
        project.images.forEach(imgPath => {
            mediaItems.push({ type: 'image', src: imgPath });
        });
    }
    if (project.videos && project.videos.length > 0) {
        project.videos.forEach(videoPath => {
            mediaItems.push({ type: 'video', src: videoPath });
        });
    }

    // Handle media (images and videos)
    if (mediaItems.length > 0) {
        // Clear any existing timer
        if (slideshowTimer) {
            clearInterval(slideshowTimer);
            slideshowTimer = null;
        }
        
        slideshowContainer.innerHTML = '';
        mediaItems.forEach((mediaItem, index) => {
            let element;
            if (mediaItem.type === 'video') {
                element = document.createElement('video');
                element.src = mediaItem.src;
                element.controls = true;
                element.classList.add('slide-video');
            } else {
                element = document.createElement('img');
                element.src = mediaItem.src;
                element.alt = project.title;
                element.classList.add('slide-image');
            }
            
            element.classList.add('slide-media');
            if (index === 0) {
                // First media is visible and sets container height
                element.style.position = 'relative';
            } else {
                element.classList.add('hidden');
            }
            
            // Add click handler to change slide
            element.addEventListener('click', () => {
                if (index !== currentSlideIndex) {
                    showSlide(index);
                } else {
                    // If clicking current media, go to next
                    nextSlide();
                }
            });
            
            // Add right-click handler to advance to next slide (only for images)
            if (mediaItem.type === 'image') {
                element.addEventListener('contextmenu', (e) => {
                    e.preventDefault(); // Prevent default context menu
                    nextSlide();
                });
            }
            
            slideshowContainer.appendChild(element);
        });
        currentSlideIndex = 0;
        updateSlideCounter();
        updateSlideButtons();
        document.querySelector('.image-slideshow').style.display = 'block';
    } else {
        slideshowContainer.innerHTML = '<p style="font-size: 14px; color: #666;">No media available</p>';
        document.querySelector('.image-slideshow').style.display = 'none';
    }

    // Show/hide More link based on whether full description exists
    if (project.fullDescription && project.fullDescription !== "Content coming soon...") {
        moreLink.style.display = 'inline';
    } else {
        moreLink.style.display = 'none';
    }

    // Show popup
    popupModal.classList.add('active');
    // Add class for work items starting with "01-", "02-", "03-", or "04-" to use larger modal size
    if (project.title.startsWith('01') || project.title.startsWith('02') || 
        project.title.startsWith('03') || project.title.startsWith('04')) {
        popupModal.classList.add('large-modal');
    } else {
        popupModal.classList.remove('large-modal');
    }
    document.body.style.overflow = 'hidden';
}

// Close popup modal
function closePopup() {
    // Clear slideshow timer
    if (slideshowTimer) {
        clearInterval(slideshowTimer);
        slideshowTimer = null;
    }
    popupModal.classList.remove('active');
    // Also close detail view if it's open
    if (detailView.classList.contains('active')) {
        closeDetailView();
    }
    document.body.style.overflow = 'auto';
    currentProject = null;
    currentSlideIndex = 0;
}

// Open detail view as separate page
function openDetailView() {
    if (!currentProject) return;
    
    // Navigate to detail page with project ID
    window.location.href = `detail.html?id=${currentProject.id}`;
}

// Close detail view
function closeDetailView() {
    detailView.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Slideshow navigation
function updateSlideCounter() {
    if (!currentProject) {
        slideCounter.textContent = '';
        return;
    }
    
    // Count total media items (images + videos)
    const imageCount = currentProject.images ? currentProject.images.length : 0;
    const videoCount = currentProject.videos ? currentProject.videos.length : 0;
    const totalMedia = imageCount + videoCount;
    
    if (totalMedia === 0) {
        slideCounter.textContent = '';
        return;
    }
    slideCounter.textContent = `${currentSlideIndex + 1} / ${totalMedia}`;
}

function updateSlideButtons() {
    if (!currentProject) {
        prevSlideBtn.disabled = true;
        nextSlideBtn.disabled = true;
        return;
    }
    
    // Count total media items (images + videos)
    const imageCount = currentProject.images ? currentProject.images.length : 0;
    const videoCount = currentProject.videos ? currentProject.videos.length : 0;
    const totalMedia = imageCount + videoCount;
    
    if (totalMedia === 0) {
        prevSlideBtn.disabled = true;
        nextSlideBtn.disabled = true;
        return;
    }
    // Buttons are always enabled since slideshow loops
    prevSlideBtn.disabled = false;
    nextSlideBtn.disabled = false;
}

function showSlide(index) {
    if (!currentProject) return;
    
    // Count total media items
    const imageCount = currentProject.images ? currentProject.images.length : 0;
    const videoCount = currentProject.videos ? currentProject.videos.length : 0;
    const totalMedia = imageCount + videoCount;
    
    if (totalMedia === 0) return;
    
    const slides = slideshowContainer.querySelectorAll('.slide-media');
    if (index < 0 || index >= slides.length) return;
    
    // Pause any playing videos before switching
    slides.forEach((slide) => {
        if (slide.tagName === 'VIDEO') {
            slide.pause();
        }
    });
    
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('hidden');
            slide.style.position = 'relative';
            slide.style.zIndex = '2';
        } else {
            slide.classList.add('hidden');
            slide.style.position = 'absolute';
            slide.style.zIndex = '1';
        }
    });
    
    currentSlideIndex = index;
    updateSlideCounter();
    updateSlideButtons();
}

function nextSlide() {
    if (!currentProject) return;
    
    // Count total media items
    const imageCount = currentProject.images ? currentProject.images.length : 0;
    const videoCount = currentProject.videos ? currentProject.videos.length : 0;
    const totalMedia = imageCount + videoCount;
    
    if (totalMedia === 0) return;
    const nextIndex = (currentSlideIndex + 1) % totalMedia;
    showSlide(nextIndex);
}

function prevSlide() {
    if (!currentProject) return;
    
    // Count total media items
    const imageCount = currentProject.images ? currentProject.images.length : 0;
    const videoCount = currentProject.videos ? currentProject.videos.length : 0;
    const totalMedia = imageCount + videoCount;
    
    if (totalMedia === 0) return;
    const prevIndex = (currentSlideIndex - 1 + totalMedia) % totalMedia;
    showSlide(prevIndex);
}

// Event listeners
prevSlideBtn.addEventListener('click', prevSlide);
nextSlideBtn.addEventListener('click', nextSlide);
moreLink.addEventListener('click', (e) => {
    e.preventDefault();
    openDetailView();
});
closePopupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
});
closeDetailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeDetailView();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (popupModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closePopup();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    } else if (cvView.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeCvView();
        }
    } else if (contactView.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeContactView();
        }
    } else if (cvPageView.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeCvPageView();
        }
    } else if (photographyView.classList.contains('active')) {
        if (e.key === 'Escape') {
            closePhotographyView();
        }
    } else if (videoView.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeVideoView();
        }
    } else if (sculptureView.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeSculptureView();
        }
    }
});

// Close modals when clicking outside content (but not on the popup content itself)
popupModal.addEventListener('click', (e) => {
    // Only close if clicking on the modal background, not the content
    if (e.target === popupModal) {
        closePopup();
    }
});

// Detail view is now a separate page, so no click handler needed

// Open CV view
function openCvView() {
    cvContent.innerHTML = `
        <p>As an architect, I find my inspiration in urban life, mostly at tresholds where the tension between realities the objects impose accentuates. While forming a direct connection between our affective landscape and urban form, I belive what we see is a way to undersrand ourselves, and the society. My artistic practice thus transforms walking into an essential act of world-making.</p>
        
        <p>The photographic subjects I choose oscillate between hyper- and trans-local in their character. They are mostly bi-products of mass production, in constant circulation, migrating from one place to another, they are nearly context-less. To enhance this effect, I isolate the objects from their surroundings with a process of zooming and framing. Since scale is a relational property of an object, isolation helps me to manipulate the reality that object impose on the viewer. While opening a door to abstraction, it helps me to rewrite the narrative of these objects for a reserach on their affective qualities.</p>
    `;
    cvView.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close CV view
function closeCvView() {
    cvView.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for CV
cvLink.addEventListener('click', (e) => {
    e.preventDefault();
    openCvView();
});

closeCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeCvView();
});

// Close CV when clicking outside
cvView.addEventListener('click', (e) => {
    if (e.target === cvView) {
        closeCvView();
    }
});

// Open Contact view
function openContactView() {
    contactContent.innerHTML = `
        <p><strong>Instagram:</strong><br>
        <a href="https://www.instagram.com/gnamiduru/?hl=en" target="_blank" style="color: black; text-decoration: underline;">@gnamiduru</a></p>
        
        <p><strong>Email:</strong><br>
        <a href="mailto:namidurugg@gmail.com" style="color: black; text-decoration: underline;">namidurugg@gmail.com</a></p>
    `;
    contactView.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Contact view
function closeContactView() {
    contactView.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for Contact
contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    openContactView();
});

closeContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeContactView();
});

// Close Contact when clicking outside
contactView.addEventListener('click', (e) => {
    if (e.target === contactView) {
        closeContactView();
    }
});

// Open CV Page view
function openCvPageView() {
    cvPageContent.innerHTML = `
        <h3><strong>Education</strong></h3>
        <p><strong>BA, Architecture</strong><br>
        Middle East Technical University (ODTÜ), Ankara, TR</p>
        
        <p><strong>MA, Social Sciences</strong><br>
        Humboldt University, Berlin. DE</p>
        
        <h3><strong>Grants/Residencies</strong></h3>
        <p>AIR Leopoldplatz Artist Residency, Berlin</p>
        <p>DAAD Scholarship, Berlin</p>
        
        <h3><strong>Exhibition</strong></h3>
        <p>Urban Silence, at 48H Neukölln, Berlin</p>
        <p>Paper BAAM, at POP Kudamm, Berlin</p>
        <p>BAAM 6, Not A Gallery, Berlin</p>
        <p>We Must Pool Our Memos, at ORTSTERMIN Art Festival, Berlin</p>
        <p>Hieroglyphs, at Parus Art Space, Ankara</p>
        
        <h3><strong>Mentions</strong></h3>
        <p><a href="https://figuresphotography.com/stories/abandoned-battleground-abandoned-battleground-gulsen-namiduru/" target="_blank" style="color: black; text-decoration: underline;">Abandoned Battleground by Gülsen Namıduru</a>, at Figures Photography</p>
    `;
    cvPageView.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close CV Page view
function closeCvPageView() {
    cvPageView.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for CV Page
cvPageLink.addEventListener('click', (e) => {
    e.preventDefault();
    openCvPageView();
});

closeCvPageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeCvPageView();
});

// Close CV Page when clicking outside
cvPageView.addEventListener('click', (e) => {
    if (e.target === cvPageView) {
        closeCvPageView();
    }
});

// Open Photography view
function openPhotographyView() {
    const photographyProjects = portfolioData.projects.filter(p => 
        p.category.toLowerCase() === 'photography'
    );
    
    let content = '';
    if (photographyProjects.length === 0) {
        content = '<p>No photography projects available.</p>';
    } else {
        photographyProjects.forEach((project) => {
            content += `<div style="margin-bottom: 30px; cursor: pointer;" onclick="openPopupFromCategory(${project.id})">
                <h3 style="font-size: 24px; margin-bottom: 10px;">${project.title} (${project.year})</h3>
                <p style="font-size: 20px; margin-bottom: 10px;">${project.shortDescription}</p>
            </div>`;
        });
    }
    
    photographyContent.innerHTML = content;
    photographyView.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Photography view
function closePhotographyView() {
    photographyView.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Category highlight state
let photographyHighlighted = false;
let videoHighlighted = false;
let sculptureHighlighted = false;

// Event listeners for Photography
photographyLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Toggle highlight state
    photographyHighlighted = !photographyHighlighted;
    
    // Get all list items
    const listItems = portfolioIndex.querySelectorAll('li');
    
    listItems.forEach((li) => {
        const medium = li.dataset.medium;
        if (medium === 'photography') {
            if (photographyHighlighted) {
                li.style.color = 'red';
            } else {
                li.style.color = ''; // Reset to default
            }
        } else {
            // Reset other items to default
            li.style.color = '';
        }
    });
    
    // Reset other category highlights
    videoHighlighted = false;
    sculptureHighlighted = false;
});

closePhotographyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closePhotographyView();
});

// Close Photography when clicking outside
photographyView.addEventListener('click', (e) => {
    if (e.target === photographyView) {
        closePhotographyView();
    }
});

// Open Video view
function openVideoView() {
    const videoProjects = portfolioData.projects.filter(p => 
        p.category.toLowerCase() === 'video'
    );
    
    let content = '';
    if (videoProjects.length === 0) {
        content = '<p>No video projects available.</p>';
    } else {
        videoProjects.forEach((project) => {
            content += `<div style="margin-bottom: 30px; cursor: pointer;" onclick="openPopupFromCategory(${project.id})">
                <h3 style="font-size: 24px; margin-bottom: 10px;">${project.title} (${project.year})</h3>
                <p style="font-size: 20px; margin-bottom: 10px;">${project.shortDescription}</p>
            </div>`;
        });
    }
    
    videoContent.innerHTML = content;
    videoView.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Video view
function closeVideoView() {
    videoView.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for Video
videoLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Toggle highlight state
    videoHighlighted = !videoHighlighted;
    
    // Get all list items
    const listItems = portfolioIndex.querySelectorAll('li');
    
    listItems.forEach((li) => {
        const medium = li.dataset.medium;
        if (medium === 'video') {
            if (videoHighlighted) {
                li.style.color = 'red';
            } else {
                li.style.color = ''; // Reset to default
            }
        } else {
            // Reset other items to default
            li.style.color = '';
        }
    });
    
    // Reset other category highlights
    photographyHighlighted = false;
    sculptureHighlighted = false;
});

closeVideoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeVideoView();
});

// Close Video when clicking outside
videoView.addEventListener('click', (e) => {
    if (e.target === videoView) {
        closeVideoView();
    }
});

// Open Sculpture/Installation view
function openSculptureView() {
    const sculptureProjects = portfolioData.projects.filter(p => 
        p.category.toLowerCase() === 'installation' || 
        p.category.toLowerCase() === 'sculpture' ||
        p.category.toLowerCase() === 'sculpture/installation'
    );
    
    let content = '';
    if (sculptureProjects.length === 0) {
        content = '<p>No sculpture/installation projects available.</p>';
    } else {
        sculptureProjects.forEach((project) => {
            content += `<div style="margin-bottom: 30px; cursor: pointer;" onclick="openPopupFromCategory(${project.id})">
                <h3 style="font-size: 24px; margin-bottom: 10px;">${project.title} (${project.year})</h3>
                <p style="font-size: 20px; margin-bottom: 10px;">${project.shortDescription}</p>
            </div>`;
        });
    }
    
    sculptureContent.innerHTML = content;
    sculptureView.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Sculpture/Installation view
function closeSculptureView() {
    sculptureView.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for Sculpture/Installation
sculptureLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Toggle highlight state
    sculptureHighlighted = !sculptureHighlighted;
    
    // Get all list items
    const listItems = portfolioIndex.querySelectorAll('li');
    
    listItems.forEach((li) => {
        const medium = li.dataset.medium;
        if (medium === 'installation') {
            if (sculptureHighlighted) {
                li.style.color = 'red';
            } else {
                li.style.color = ''; // Reset to default
            }
        } else {
            // Reset other items to default
            li.style.color = '';
        }
    });
    
    // Reset other category highlights
    photographyHighlighted = false;
    videoHighlighted = false;
});

closeSculptureBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeSculptureView();
});

// Close Sculpture/Installation when clicking outside
sculptureView.addEventListener('click', (e) => {
    if (e.target === sculptureView) {
        closeSculptureView();
    }
});

// Helper function to open popup from category view
function openPopupFromCategory(projectId) {
    const project = portfolioData.projects.find(p => p.id === projectId);
    if (project) {
        // Close the category view first
        if (photographyView.classList.contains('active')) {
            closePhotographyView();
        } else if (videoView.classList.contains('active')) {
            closeVideoView();
        } else if (sculptureView.classList.contains('active')) {
            closeSculptureView();
        }
        // Open the popup
        openPopup(project);
    }
}

// Make openPopupFromCategory available globally
window.openPopupFromCategory = openPopupFromCategory;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeIndex();
});

