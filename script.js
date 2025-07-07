document.addEventListener('DOMContentLoaded', () => {
  // --- Global UI Elements ---
  const loadingSpinner = document.getElementById('loadingSpinner');
  const messageModal = document.getElementById('messageModal');
  const messageModalTitle = document.getElementById('messageModalTitle');
  const messageModalText = document.getElementById('messageModalText');
  const messageModalClose = document.getElementById('messageModalClose');
  const messageModalOK = document.getElementById('messageModalOK');
  const flowerContainer = document.getElementById('flowerContainer'); // For Onam falling flowers
  const themeEffectContainer = document.getElementById('themeEffectContainer'); // New container for general theme effects

  // --- Utility Functions ---
  /**
   * Displays a custom message modal instead of alert().
   * @param {string} title - The title of the message.
   * @param {string} message - The message content.
   */
  function showMessageModal(title, message) {
    messageModalTitle.innerText = title;
    messageModalText.innerText = message;
    messageModal.style.display = 'flex'; // Use flex to center
  }

  // Close message modal event listeners
  if (messageModalClose) {
    messageModalClose.onclick = () => {
      messageModal.style.display = 'none';
    };
  }
  if (messageModalOK) {
    messageModalOK.onclick = () => {
      messageModal.style.display = 'none';
    };
  }
  // This listener closes the modal and dropdowns if user clicks outside of them
  window.addEventListener('click', (event) => {
    if (event.target === messageModal) {
      messageModal.style.display = 'none';
    }

    // Close theme palette dropdown if open and click outside
    const themePaletteDropdown = document.querySelector('.theme-palette-dropdown');
    const themePaletteBtn = document.getElementById('themePaletteBtn');
    // Ensure both dropdown and button exist and the click is outside the dropdown and its toggle button
    if (themePaletteDropdown && themePaletteBtn && themePaletteDropdown.classList.contains('active') && !themePaletteDropdown.contains(event.target) && !themePaletteBtn.contains(event.target)) {
        themePaletteDropdown.classList.remove('active');
    }

    // Close profile dropdown if open and click outside
    const profileDropdown = document.getElementById('profileDropdown');
    const profileBtn = document.getElementById('profileBtn');
    if (profileDropdown && profileBtn && profileDropdown.classList.contains('active') && !profileDropdown.contains(event.target) && !profileBtn.contains(event.target)) {
      profileDropdown.classList.remove('active');
    }

    // Close off-screen menu if open and click outside of it or its toggle button
    const offScreenMenu = document.getElementById('offScreenMenu');
    const gemMenuToggle = document.getElementById('gemMenuToggle');
    if (offScreenMenu && gemMenuToggle && offScreenMenu.classList.contains('active') && !offScreenMenu.contains(event.target) && !gemMenuToggle.contains(event.target)) {
        offScreenMenu.classList.remove('active');
        gemMenuToggle.classList.remove('active'); // Remove active class from gem icon too
    }
  });


  // --- Theme Switching Logic ---
  const themePaletteBtn = document.getElementById('themePaletteBtn');
  const themeOptions = document.getElementById('themeOptions');
  const themePaletteDropdown = document.querySelector('.theme-palette-dropdown'); // Parent dropdown element
  const themeLinks = document.querySelectorAll('.theme-options a');

  let flowerInterval; // For Onam theme
  let peacockFeatherInterval; // For Vishu theme
  let easterEffectInterval; // For Easter theme
  let strangerThingsInterval; // For Stranger Things theme
  let gameOfThronesInterval; // For Game of Thrones theme

  // --- Theme Effect Functions ---

  // Onam Flowers
  function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    const flowerEmojis = ['🌺', '🌸', '💮', '🏵️', '🪻', '🌼', '🌻', '🪷', '🌹'];
    flower.innerText = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDuration = (Math.random() * 3 + 4) + 's';
    flower.style.animationDelay = (Math.random() * 0.5) + 's';
    flower.style.fontSize = (Math.random() * 1.5 + 1) + 'em';
    flower.style.setProperty('--flower-x-offset', (Math.random() - 0.5) * 50 + 'vw');
    flowerContainer.appendChild(flower);
    flower.addEventListener('animationend', () => { flower.remove(); });
  }

  function startOnamFlowerShower() {
    stopAllThemeEffects();
    if (flowerContainer) {
      flowerInterval = setInterval(createFlower, 300);
    }
  }

  // Vishu Peacock Feathers & Krishna (Krishna is mostly CSS background, feathers are JS)
  function createPeacockFeather() {
    const feather = document.createElement('div');
    feather.classList.add('peacock-feather');
    feather.innerText = '🪶'; // Feather emoji
    feather.style.left = Math.random() * 100 + 'vw';
    feather.style.animationDuration = (Math.random() * 5 + 7) + 's'; // Slower float
    feather.style.animationDelay = (Math.random() * 2) + 's';
    feather.style.fontSize = (Math.random() * 1 + 1.5) + 'em';
    feather.style.setProperty('--start-x', (Math.random() - 0.5) * 20 + 'vw');
    feather.style.setProperty('--end-x', (Math.random() - 0.5) * 20 + 'vw');
    themeEffectContainer.appendChild(feather);
    feather.addEventListener('animationend', () => { feather.remove(); });
  }

  function startVishuEffects() {
    stopAllThemeEffects();
    if (themeEffectContainer) {
      peacockFeatherInterval = setInterval(createPeacockFeather, 500); // More frequent feathers
    }
  }

  // Easter Rabbits & Eggs
  function createEasterElement() {
    const element = document.createElement('div');
    element.classList.add('easter-element');
    const easterEmojis = ['🐰', '🥚'];
    element.innerText = easterEmojis[Math.floor(Math.random() * easterEmojis.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDuration = (Math.random() * 4 + 6) + 's';
    element.style.animationDelay = (Math.random() * 1) + 's';
    element.style.fontSize = (Math.random() * 1.2 + 1) + 'em';
    element.style.setProperty('--start-x', (Math.random() - 0.5) * 30 + 'vw'); // Add horizontal drift
    element.style.setProperty('--end-x', (Math.random() - 0.5) * 30 + 'vw'); // Add horizontal drift
    themeEffectContainer.appendChild(element);
    element.addEventListener('animationend', () => { element.remove(); });
  }

  function startEasterEffects() {
    stopAllThemeEffects();
    if (themeEffectContainer) {
      easterEffectInterval = setInterval(createEasterElement, 400);
    }
  }

  // Game of Thrones Swords
  function createSwordElement() {
    const sword = document.createElement('div');
    sword.classList.add('got-sword');
    sword.innerHTML = '<i class="fas fa-sword"></i>'; // Font Awesome sword icon
    sword.style.left = Math.random() * 100 + 'vw';
    sword.style.animationDuration = (Math.random() * 2 + 3) + 's';
    sword.style.animationDelay = (Math.random() * 0.5) + 's';
    sword.style.fontSize = (Math.random() * 1.5 + 1.5) + 'em';
    sword.style.setProperty('--start-x', (Math.random() - 0.5) * 20 + 'vw');
    sword.style.setProperty('--end-x', (Math.random() - 0.5) * 20 + 'vw');
    themeEffectContainer.appendChild(sword);
    sword.addEventListener('animationend', () => { sword.remove(); });
  }

  function startGameOfThronesEffects() {
    stopAllThemeEffects();
    if (themeEffectContainer) {
      gameOfThronesInterval = setInterval(createSwordElement, 300);
    }
  }

  // Stranger Things Demogorgons
  function createDemogorgonElement() {
    const demogorgon = document.createElement('div');
    demogorgon.classList.add('stranger-things-demogorgon');
    demogorgon.innerText = '👾'; // Alien monster emoji for Demogorgon
    demogorgon.style.left = Math.random() * 100 + 'vw';
    demogorgon.style.animationDuration = (Math.random() * 3 + 5) + 's';
    demogorgon.style.animationDelay = (Math.random() * 1) + 's';
    demogorgon.style.fontSize = (Math.random() * 1.5 + 2) + 'em';
    demogorgon.style.setProperty('--start-x', (Math.random() - 0.5) * 40 + 'vw'); // More horizontal drift for creepier effect
    demogorgon.style.setProperty('--end-x', (Math.random() - 0.5) * 40 + 'vw');
    themeEffectContainer.appendChild(demogorgon);
    demogorgon.addEventListener('animationend', () => { demogorgon.remove(); });
  }

  function startStrangerThingsEffects() {
    stopAllThemeEffects();
    if (themeEffectContainer) {
      strangerThingsInterval = setInterval(createDemogorgonElement, 600);
    }
  }


  function stopAllThemeEffects() {
    if (flowerInterval) {
      clearInterval(flowerInterval);
      flowerInterval = null;
    }
    if (peacockFeatherInterval) {
      clearInterval(peacockFeatherInterval);
      peacockFeatherInterval = null;
    }
    if (easterEffectInterval) {
      clearInterval(easterEffectInterval);
      easterEffectInterval = null;
    }
    if (strangerThingsInterval) {
      clearInterval(strangerThingsInterval);
      strangerThingsInterval = null;
    }
    if (gameOfThronesInterval) {
      clearInterval(gameOfThronesInterval);
      gameOfThronesInterval = null;
    }

    // Clear any existing elements from effect containers
    if (flowerContainer) {
      while (flowerContainer.firstChild) {
        flowerContainer.removeChild(flowerContainer.firstChild);
      }
    }
    if (themeEffectContainer) {
      while (themeEffectContainer.firstChild) {
        themeEffectContainer.removeChild(themeEffectContainer.firstChild);
      }
    }
  }

  // Function to apply a specific theme
  function selectTheme(themeName) {
    // Remove all existing theme classes
    document.body.classList.remove('light-theme', 'dark-theme', 'chat-movie-theme', 'event-theme', 'onam-theme', 'vishu-theme', 'ramadan-theme', 'easter-theme', 'stranger-things-theme', 'game-of-thrones-theme');
    // Add the new theme class
    document.body.classList.add(themeName + '-theme');
    // Store the selected theme in local storage
    localStorage.setItem('theme', themeName);

    // Handle theme-specific effects
    stopAllThemeEffects(); // Stop all previous effects
    if (themeName === 'onam') {
      startOnamFlowerShower();
    } else if (themeName === 'vishu') {
      startVishuEffects();
    } else if (themeName === 'easter') {
      startEasterEffects();
    } else if (themeName === 'stranger-things') {
      startStrangerThingsEffects();
    } else if (themeName === 'game-of-thrones') {
      startGameOfThronesEffects();
    }
    // Ramadan theme effects are purely CSS
  }

  // Toggle theme palette dropdown
  if (themePaletteBtn && themeOptions && themePaletteDropdown) {
    themePaletteBtn.addEventListener('click', (e) => {
      console.log("Theme palette button clicked!"); // Debugging log
      e.stopPropagation(); // Prevent document click from closing immediately
      themePaletteDropdown.classList.toggle('active');
    });

    // Add event listeners for each theme option
    themeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop propagation to prevent immediate closing by document click
        const themeName = e.target.getAttribute('data-theme');
        selectTheme(themeName);
        themePaletteDropdown.classList.remove('active'); // Close dropdown after selection
      });
    });
  }

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    selectTheme(savedTheme); // Use the function to apply saved theme
  } else {
    document.body.classList.add('light-theme'); // Default if no preference saved
  }


  // --- Off-screen Menu Logic (Adapted from ham-menu) ---
  const gemMenuToggle = document.getElementById('gemMenuToggle'); // This is your hamMenu now
  const offScreenMenu = document.getElementById('offScreenMenu');

  if (gemMenuToggle && offScreenMenu) {
    gemMenuToggle.addEventListener('click', (e) => {
      console.log("Gem menu toggle button clicked!"); // Debugging log
      e.stopPropagation(); // Prevent document click from closing immediately
      gemMenuToggle.classList.toggle('active');
      offScreenMenu.classList.toggle('active');
    });
  }


  // --- Navigation and Section Switching (for both main nav and off-screen menu) ---
  // Select all links that should trigger section changes, including those in the off-screen menu
  const allNavLinks = document.querySelectorAll('.navbar a[data-section], .bottom-nav a[data-section], #offScreenMenu a[data-section]');
  const contentSections = document.querySelectorAll('.content-section');

  function showSection(targetSectionId) {
    // Hide all sections
    contentSections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });

    // Show the target section
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.style.display = 'block'; // Or 'flex', 'grid' depending on its default layout
    }
  }

  // Handle clicks on data-section links (main nav & off-screen menu)
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSectionId = link.getAttribute('data-section');
      showSection(targetSectionId);

      // Close off-screen menu if clicked from inside
      if (offScreenMenu && offScreenMenu.classList.contains('active')) {
        offScreenMenu.classList.remove('active');
        if (gemMenuToggle) gemMenuToggle.classList.remove('active');
      }
    });
  });

  // Handle clicks on data-action links (off-screen menu for mock features)
  document.querySelectorAll('#offScreenMenu a[data-action], .navbar a[data-action], .bottom-nav a[data-action]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const action = link.getAttribute('data-action');
      let title = "Feature Coming Soon!";
      let message = "This feature is currently under development. Stay tuned for updates!";

      // Special handling for the main 'Upload Research Paper' link
      if (action === 'upload-main' || action === 'upload-main-nav') {
        window.location.href = 'upload.html'; // Redirect to upload.html
        return; // Exit function as we are navigating away
      }

      switch (action) {
        case 'mission-statement':
            title = "Our Mission";
            message = "ResearchBook's mission is to accelerate global research by providing a secure, collaborative, and AI-powered platform for academics to publish, discover, and track their impact.";
            break;
        case 'upload-visibility':
          title = "Set Privacy Options";
          message = "Control who can view your research: Public, Institution Only, or Private. Granular permissions coming soon!";
          break;
        case 'blockchain-seal':
          title = "Blockchain Timestamp & License";
          message = "Your research will be securely timestamped on the blockchain for tamper-proof proof of ownership. You can also select from various Creative Commons licenses.";
          break;
        case 'ai-enhancement-tools-upload':
            title = "AI Enhancement Tools for Upload";
            message = "Utilize AI to improve your abstract, suggest keywords, generate summaries, and check for plagiarism before publishing.";
            break;
        case 'ai-improvement-suggestions-demo':
            title = "AI-Generated Research Improvement Suggestions";
            message = "AI analyzes your paper for better structuring (abstract, methodology, conclusion), improving clarity (detecting weak arguments, suggesting better phrasing), suggesting missing references, and checking ethical research standards (detecting biased data, research loopholes).";
            break;
        case 'ai-related-demo':
            title = "AI: Suggest Related Research";
            message = "Our AI will analyze your paper's content and suggest highly relevant research papers and citations from our database to enrich your work.";
            break;
        case 'ai-summaries-demo':
            title = "AI: Summarize Paper";
            message = "Get a concise 1-minute summary of any research paper, including key findings and graphical abstracts (AI generates simple visual diagrams of complex research) for quick understanding.";
            break;
        case 'ai-autotagging':
            title = "AI: Generate Title / Keywords";
            message = "Our AI can automatically suggest relevant tags/keywords for your paper and help generate a concise and impactful title or abstract based on your content, saving you time during upload.";
            break;
        case 'ai-collaboration-matching-demo':
            title = "AI-Driven Research Collaboration Matching";
            message = "Our AI analyzes your interests, skills, and expertise to recommend the perfect collaborators for your projects, fostering interdisciplinary research (e.g., AI + Healthcare = Smart Medical Solutions). Filters based on expertise, citations, and previous work to find high-quality research partners.";
            break;
        case 'mentorship-board':
            title = "Mentorship Board";
            message = "Connect with experienced researchers and mentors in your field, or offer your guidance to aspiring academics.";
            break;
        case 'institutional-collaboration':
            title = "Institutional Collaboration";
            message = "Facilitate partnerships between institutions for joint research projects, resource sharing, and academic exchange programs.";
            break;
        case 'view-all-universities':
            title = "Directory of All Indian Institutions";
            message = "A comprehensive directory of all public and private universities in India will be available, allowing you to browse, filter, and connect with institutions.";
            break;
        case 'search-institutions':
            title = "Search Institutions";
            message = "Search for institutions by name, state, or specialization to find relevant academic communities.";
            break;
        case 'explore-verified-entities':
            title = "View Departments / Clubs";
            message = "Discover official, verified academic clubs, departments, and innovation centers. User institution email verification and admin dashboards ensure credibility.";
            break;
        case 'account-security-settings':
            title = "Safety Settings & Account Security";
            message = "Manage your password, email, two-factor authentication, and other security preferences to keep your account safe.";
            break;
        case 'phd-helpdesk':
            title = "PhD Harassment Helpdesk";
            message = "A confidential portal to report harassment or misuse within the academic community. We prioritize your well-being with encrypted evidence storage and direct access to legal support.";
            break;
        case 'report-misuse':
            title = "Report Abuse / Plagiarized Work";
            message = "If you encounter any inappropriate content or behavior, or suspect plagiarism, please report it immediately. Our AI-powered tools also assist in detection.";
            break;
        case 'decentralized-storage':
            title = "Encrypted Vault (Private Storage)";
            message = "Your private research and sensitive data are stored in a decentralized, end-to-end encrypted vault, ensuring maximum confidentiality and control.";
            break;
        case 'engagement-analytics':
            title = "Engagement Analytics";
            message = "Understand how users interact with your content, including likes, comments, and shares over time, providing deeper insights into your paper's reach.";
            break;
        case 'impact-analytics':
            title = "Impact Analytics: Citations & Shares";
            message = "Detailed analytics on your paper's citations across various databases and its sharing trends on social media and academic networks.";
            break;
        case 'save-draft':
            title = "Save Draft / Edit Paper";
            message = "Save your ongoing work as a draft, or easily edit previously uploaded papers. Version control and collaboration tools are integrated.";
            break;
        case 'open-theme-settings': // This will effectively reopen the theme dropdown
        case 'open-theme-settings-sidebar':
            // Simulate click on the theme palette button to open its dropdown
            if (themePaletteBtn) {
                themePaletteBtn.click();
            }
            // Close off-screen menu if it's open
            if (offScreenMenu && offScreenMenu.classList.contains('active')) {
              offScreenMenu.classList.remove('active');
              if (gemMenuToggle) gemMenuToggle.classList.remove('active');
            }
            return; // Exit function as we opened another UI element
        case 'change-language':
            title = "Language Selector";
            message = "Choose your preferred language for the ResearchBook interface. Options include English, Hindi, Tamil, and more to come!";
            break;
        case 'hackathons':
            title = "Hackathons";
            message = "Discover and register for upcoming research hackathons, where you can collaborate and innovate on pressing academic challenges.";
            break;
        case 'call-for-papers':
            title = "Paper Calls";
            message = "Browse the latest calls for papers from leading journals, conferences, and special issues in various fields.";
            break;
        case 'kdisc-iedc-contests':
            title = "KDISC / IEDC Contests";
            message = "Participate in innovation contests and entrepreneurial challenges organized by KDISC (Kerala Development and Innovation Strategic Council) and IEDC (Innovation and Entrepreneurship Development Centre).";
            break;
        case 'add-to-google-calendar':
            title = "Add to Google Calendar";
            message = "Easily add important event deadlines, webinar dates, and competition schedules directly to your Google Calendar.";
            break;
        case 'view-earned-certificates':
        case 'view-earned-certificates-demo':
            title = "View Earned Certificates";
            message = "Access and download all your digital certificates earned from courses, workshops, and verified achievements within the academic community.";
            break;
        case 'view-badges':
        case 'view-badges-demo':
            title = "Badge Status";
            message = "Track your progress and view your earned badges, such as 'Verified Researcher', 'Top Author', 'Peer Reviewer', and 'Active Collaborator', recognizing your contributions.";
            break;
        case 'download-qr':
        case 'download-qr-demo':
            title = "QR Code Download for Sharing";
            message = "Generate and download a unique QR code linked to your verified profile or specific research papers, making it easy to share your work offline.";
            break;
        case 'research-template-guides':
            title = "Research Template Guides (PDF)";
            message = "Access a library of downloadable PDF templates and guides for structuring research papers, theses, presentations, and grant proposals.";
            break;
        case 'ipr-patent-help':
            title = "IPR & Patent Help Links";
            message = "Find resources and links to intellectual property rights (IPR) and patent filing information, helping you protect your innovations.";
            break;
        case 'help-center':
            title = "Help Center";
            message = "Visit our comprehensive Help Center for FAQs, tutorials, troubleshooting guides, and contact information for support.";
            break;
        case 'manage-notifications':
            title = "Notification Preferences";
            message = "Customize your notification settings to control what alerts you receive, including email updates, in-app notifications, and digest summaries.";
            break;
        case 'offScreenLogoutLink': // This specific action is handled below but included here for completeness
        case 'logoutLink':
        case 'settingsLogoutBtn':
            // Handled by specific logout logic below
            return;
      }

      showMessageModal(title, message);
      // Close off-screen menu if clicked from inside
      if (offScreenMenu && offScreenMenu.classList.contains('active')) { // Ensure sidebar exists
        offScreenMenu.classList.remove('active');
        if (gemMenuToggle) gemMenuToggle.classList.remove('active');
      }
    });
  });


  // Initially show the home section
  const homeSection = document.getElementById('home');
  if (homeSection) {
    homeSection.classList.add('active');
    homeSection.style.display = 'block';
  }


  // --- Profile Dropdown ---
  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');

  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      console.log("Profile button clicked!"); // Debugging log
      e.stopPropagation(); // Prevent document click from closing immediately
      profileDropdown.classList.toggle('active'); // Toggle 'active' class
    });
  }

  // Mock Logout Links (both in top nav and off-screen menu)
  const logoutLink = document.getElementById('logoutLink');
  const offScreenLogoutLink = document.getElementById('offScreenLogoutLink'); // New logout button in off-screen menu
  const settingsLogoutBtn = document.getElementById('settingsLogoutBtn'); // New logout button in settings section

  function handleLogout(e) {
    e.preventDefault();
    showMessageModal("Logged Out", "You have been successfully logged out.");
    if (profileDropdown) {
      profileDropdown.classList.remove('active');
    }
    if (offScreenMenu) {
      offScreenMenu.classList.remove('active'); // Hide off-screen menu
      if (gemMenuToggle) gemMenuToggle.classList.remove('active');
    }
    // In a real app, clear session/token here and redirect to login page
  }

  if (logoutLink) logoutLink.addEventListener('click', handleLogout);
  if (offScreenLogoutLink) offScreenLogoutLink.addEventListener('click', handleLogout);
  if (settingsLogoutBtn) settingsLogoutBtn.addEventListener('click', handleLogout);


  // --- Carousel / Slider Functionality ---
  function setupCarousel(carouselId, leftArrowId, rightArrowId) {
    const carousel = document.getElementById(carouselId);
    const leftArrow = document.getElementById(leftArrowId);
    const rightArrow = document.getElementById(rightArrowId);

    if (carousel && leftArrow && rightArrow) {
      const scrollAmount = 300; // Pixels to scroll

      leftArrow.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      rightArrow.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      // Optional: Hide/show arrows based on scroll position (more advanced)
      carousel.addEventListener('scroll', () => {
        // Implement logic to hide arrows if at start/end
      });
    }
  }

  setupCarousel('trendingPapersCarousel', 'trending-left', 'trending-right');
  setupCarousel('topAuthorsCarousel', 'authors-left', 'authors-right');


  // --- Search Filter ---
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      // Filter visible cards in relevant sections (e.g., Explore, Home's paper cards)
      // For now, let's assume it primarily filters the "Explore" section's paper cards
      document.querySelectorAll('.explore-card').forEach(card => {
        const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
        const author = card.querySelector('p')?.innerText.toLowerCase() || '';
        const abstract = card.querySelector('.paper-abstract')?.innerText.toLowerCase() || ''; // Use specific class for abstract for accuracy
        const institution = card.querySelector('.institution-badge')?.innerText.toLowerCase() || '';


        if (title.includes(query) || author.includes(query) || abstract.includes(query) || institution.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }


  // --- Like / Bookmark / Share (Mock Functionality) ---
  document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', () => {
      const icon = button.querySelector('i');
      const countSpan = button.querySelector('.like-count');
      let currentCount = parseInt(countSpan.innerText.replace('K', '00')) || 0; // Basic parsing for 'K'

      if (icon.classList.contains('liked')) {
        icon.classList.remove('liked');
        icon.classList.remove('fas');
        icon.classList.add('far'); // Change to regular heart (outline)
        currentCount = Math.max(0, currentCount - 1);
      } else {
        icon.classList.add('liked');
        icon.classList.remove('far');
        icon.classList.add('fas'); // Change to solid heart
        currentCount += 1;
      }
      countSpan.innerText = currentCount >= 1000 ? (currentCount / 1000).toFixed(1) + 'K' : currentCount;
      // In a real app, send data to backend
      showMessageModal("Action", "Paper Liked/Unliked!");
    });
  });

  document.querySelectorAll('.bookmark-btn').forEach(button => {
    button.addEventListener('click', () => {
      const icon = button.querySelector('i');
      if (icon.classList.contains('fa-solid')) { // Check for solid bookmark
        icon.classList.remove('fa-solid', 'fa-bookmark');
        icon.classList.add('far', 'fa-bookmark'); // Change to outline bookmark
        showMessageModal("Action", "Bookmark Removed!");
      } else {
        icon.classList.remove('far', 'fa-bookmark');
        icon.classList.add('fa-solid', 'fa-bookmark'); // Change to solid bookmark
        showMessageModal("Action", "Paper Bookmarked!");
      }
      // In a real app, send data to backend
    });
  });


  document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', () => {
      const paperTitleElement = button.closest('.paper-card').querySelector('h3');
      const paperTitle = paperTitleElement ? paperTitleElement.innerText : "Research Paper";
      // Use document.execCommand('copy') for clipboard in sandbox environments where navigator.clipboard might be restricted
      const dummyUrl = "https://researchbook.com/paper/" + encodeURIComponent(paperTitle.replace(/\s/g, '-').toLowerCase());
      const tempInput = document.createElement('textarea');
      tempInput.value = dummyUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showMessageModal("Share", `Link to "${paperTitle}" copied to clipboard!`);
    });
  });


  // --- Category Tabs (Explore Section) ---
  const categoryTabs = document.querySelectorAll('.tab-btn');
  const exploreCards = document.querySelectorAll('.explore-card');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove 'active' from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));
      // Add 'active' to clicked tab
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      exploreCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // --- AI Suggest Button (Sticky Assistant and Modal) ---
  const stickyAssistant = document.getElementById('stickyAssistant');
  const aiSuggestionModal = document.getElementById('aiSuggestionModal');
  const aiModalClose = document.getElementById('aiModalClose');
  const aiSuggestOK = document.getElementById('aiSuggestOK');
  const aiSuggestionText = document.getElementById('aiSuggestionText');

  if (stickyAssistant) {
    stickyAssistant.addEventListener('click', () => {
      aiSuggestionText.innerText = "AI is thinking of a suggestion...";
      aiSuggestionModal.style.display = 'flex'; // Use flex to center
      loadingSpinner.style.display = 'block'; // Show spinner

      setTimeout(() => {
        loadingSpinner.style.display = 'none'; // Hide spinner
        aiSuggestionText.innerText = "🔮 AI Suggestion: Consider exploring interdisciplinary research topics like 'AI in sustainable agriculture' or 'Neuroscience of virtual reality'.";
      }, 1500); // Simulate AI thinking time
    });
  }

  if (aiModalClose) {
    aiModalClose.onclick = () => {
      aiSuggestionModal.style.display = 'none';
    };
  }
  if (aiSuggestOK) {
    aiSuggestOK.onclick = () => {
      aiSuggestionModal.style.display = 'none';
    };
  }


  // --- Profile Page Mock Actions ---
  document.querySelectorAll('.view-profile-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Simulate navigating to a profile page (for now, just show the profile section)
      showSection('profile');
      showMessageModal("Profile View", "Viewing author's profile.");
    });
  });

  document.querySelectorAll('.accept-btn').forEach(button => {
    button.addEventListener('click', () => {
      showMessageModal("Collaboration Request", "Collaboration request accepted!");
      button.closest('.request-item').remove(); // Remove item after action
    });
  });

  document.querySelectorAll('.reject-btn').forEach(button => {
    button.addEventListener('click', () => {
      showMessageModal("Collaboration Request", "Collaboration request rejected.");
      button.closest('.request-item').remove(); // Remove item after action
    });
  });

  document.querySelectorAll('.edit-profile-btn').forEach(button => {
    button.addEventListener('click', () => {
      showMessageModal("Profile Edit", "Edit profile functionality coming soon!");
    });
  });


  // --- Upload Page Specific Logic (upload.html) ---
  const uploadForm = document.getElementById('uploadForm');
  const uploadSteps = document.querySelectorAll('.upload-step');
  const uploadSections = document.querySelectorAll('.upload-section-content');
  const prevStepBtn = document.getElementById('prevStepBtn');
  const nextStepBtn = document.getElementById('nextStepBtn');
  const finalSubmitBtn = document.getElementById('finalSubmitBtn');
  const uploadProgressBar = document.getElementById('uploadProgressBar');
  const uploadProgressText = document.getElementById('uploadProgressText');
  const uploadSuccessMessage = document.getElementById('uploadSuccessMessage');

  let currentStep = 0; // 0-indexed

  // Elements for Step 1: Basic Info
  const paperTitleInput = document.getElementById('paperTitle');
  const authorInput = document.getElementById('authorInput');
  const addAuthorBtn = document.getElementById('addAuthorBtn');
  const authorsList = document.getElementById('authorsList');
  const institutionInput = document.getElementById('institution');
  const abstractInput = document.getElementById('abstract');
  const keywordInput = document.getElementById('keywordInput');
  const addKeywordBtn = document.getElementById('addKeywordBtn');
  const keywordsList = document.getElementById('keywordsList');

  // Elements for Step 2: Files
  const dragDropArea = document.getElementById('dragDropArea');
  const fileUploadInput = document.getElementById('fileUpload');
  const fileList = document.getElementById('fileList');
  let uploadedFiles = [];

  // Elements for Step 4: Collaboration
  const collaboratorEmailInput = document.getElementById('collaboratorEmail');
  const addCollaboratorBtn = document.getElementById('addCollaboratorBtn');
  const collaboratorList = document.getElementById('collaboratorList');
  let collaborators = [];

  // Elements for Step 6: Review & Submit
  const reviewTitle = document.getElementById('reviewTitle');
  const reviewAuthors = document.getElementById('reviewAuthors');
  const reviewInstitution = document.getElementById('reviewInstitution');
  const reviewAbstract = document.getElementById('reviewAbstract');
  const reviewKeywords = document.getElementById('reviewKeywords');
  const reviewFiles = document.getElementById('reviewFiles');
  const reviewCollaborators = document.getElementById('reviewCollaborators');
  const reviewVisibility = document.getElementById('reviewVisibility');
  const reviewLicense = document.getElementById('reviewLicense');


  /**
   * Updates the UI to show the current step.
   */
  function updateStepUI() {
    // Update step indicators
    uploadSteps.forEach((step, index) => {
      if (index === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Show/hide sections
    uploadSections.forEach((section, index) => {
      if (index === currentStep) {
        section.classList.add('active');
        section.style.display = 'block';
      } else {
        section.classList.remove('active');
        section.style.display = 'none';
      }
    });

    // Update navigation buttons visibility
    prevStepBtn.style.display = currentStep === 0 ? 'none' : 'inline-flex';
    nextStepBtn.style.display = currentStep === uploadSections.length - 1 ? 'none' : 'inline-flex';
    finalSubmitBtn.style.display = currentStep === uploadSections.length - 1 ? 'inline-flex' : 'none';

    // If on the review step, populate review data
    if (currentStep === uploadSections.length - 1) {
      populateReviewData();
    }
  }

  /**
   * Validates the current step's form fields.
   * @returns {boolean} True if the current step is valid, false otherwise.
   */
  function validateCurrentStep() {
    const currentSection = uploadSections[currentStep];
    const inputs = currentSection.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    // Check required fields
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'red';
        isValid = false;
      } else {
        input.style.borderColor = ''; // Reset
      }
    });

    // Specific validation for Step 1: Authors and Keywords
    if (currentStep === 0) {
      if (authorsList.children.length === 0) {
        showMessageModal("Validation Error", "Please add at least one author.");
        isValid = false;
      }
      if (keywordsList.children.length === 0) {
        showMessageModal("Validation Error", "Please add at least one keyword.");
        isValid = false;
      }
    }

    // Specific validation for Step 2: Files
    if (currentStep === 1) {
      if (uploadedFiles.length === 0) {
        showMessageModal("Validation Error", "Please upload at least one file.");
        isValid = false;
      }
    }

    if (!isValid) {
      showMessageModal("Validation Error", "Please fill in all required fields and ensure all necessary items are added before proceeding.");
    }
    return isValid;
  }

  /**
   * Populates the review section with data from previous steps.
   */
  function populateReviewData() {
    reviewTitle.innerText = paperTitleInput.value || 'N/A';
    reviewAuthors.innerText = Array.from(authorsList.children).map(li => li.innerText.replace(' ✖', '')).join(', ') || 'N/A';
    reviewInstitution.innerText = institutionInput.value || 'N/A';
    reviewAbstract.innerText = abstractInput.value || 'N/A';
    reviewKeywords.innerText = Array.from(keywordsList.children).map(li => li.innerText.replace(' ✖', '')).join(', ') || 'N/A';
    reviewFiles.innerText = uploadedFiles.map(file => file.name).join(', ') || 'No files uploaded';
    reviewCollaborators.innerText = collaborators.length > 0 ? collaborators.join(', ') : 'None';
    reviewVisibility.innerText = document.querySelector('input[name="visibility"]:checked')?.value || 'N/A';
    reviewLicense.innerText = document.querySelector('input[name="license"]:checked')?.value || 'N/A';
  }

  // --- Event Listeners for Upload Form ---
  if (uploadForm) {
    // Initial UI update
    updateStepUI();

    // Step Navigation
    nextStepBtn.addEventListener('click', () => {
      if (validateCurrentStep()) {
        currentStep++;
        updateStepUI();
      }
    });

    prevStepBtn.addEventListener('click', () => {
      currentStep--;
      updateStepUI();
    });

    // Step indicators click
    uploadSteps.forEach((step, index) => {
      step.addEventListener('click', () => {
        // Allow jumping to previous steps, but not forward unless validated
        if (index <= currentStep || validateCurrentStep()) {
          currentStep = index;
          updateStepUI();
        }
      });
    });

    // Step 1: Authors and Keywords
    if (addAuthorBtn) {
      addAuthorBtn.addEventListener('click', () => {
        const authorName = authorInput.value.trim();
        if (authorName) {
          const authorTag = document.createElement('span');
          authorTag.classList.add('author-tag');
          authorTag.innerHTML = `${authorName} <button type="button" class="remove-tag">✖</button>`;
          authorsList.appendChild(authorTag);
          authorInput.value = '';
          authorTag.querySelector('.remove-tag').addEventListener('click', () => {
            authorTag.remove();
          });
        } else {
          showMessageModal("Input Error", "Please enter an author name.");
        }
      });
    }

    if (addKeywordBtn) {
      addKeywordBtn.addEventListener('click', () => {
        const keywordText = keywordInput.value.trim();
        if (keywordText) {
          const keywordTag = document.createElement('span');
          keywordTag.classList.add('keyword-tag');
          keywordTag.innerHTML = `${keywordText} <button type="button" class="remove-tag">✖</button>`;
          keywordsList.appendChild(keywordTag);
          keywordInput.value = '';
          keywordTag.querySelector('.remove-tag').addEventListener('click', () => {
            keywordTag.remove();
          });
        } else {
          showMessageModal("Input Error", "Please enter a keyword.");
        }
      });
    }

    // Step 2: File Upload (Drag & Drop)
    if (dragDropArea && fileUploadInput && fileList) {
      dragDropArea.addEventListener('click', () => fileUploadInput.click());

      dragDropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragDropArea.classList.add('hover');
      });

      dragDropArea.addEventListener('dragleave', () => {
        dragDropArea.classList.remove('hover');
      });

      dragDropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dragDropArea.classList.remove('hover');
        handleFiles(e.dataTransfer.files);
      });

      fileUploadInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
      });

      function handleFiles(files) {
        for (const file of files) {
          if (file.size > 50 * 1024 * 1024) { // 50 MB limit
            showMessageModal("File Too Large", `${file.name} is too large. Max size is 50MB.`);
            continue;
          }
          if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/x-tex'].includes(file.type)) {
            showMessageModal("Invalid File Type", `${file.name} is not a supported file type. Please upload PDF, DOC, DOCX, or TEX.`);
            continue;
          }

          uploadedFiles.push(file);
          const fileItem = document.createElement('div');
          fileItem.classList.add('file-item');
          fileItem.innerHTML = `
            <span><i class="fas fa-file"></i> ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            <button type="button" class="remove-file">✖</button>
          `;
          fileList.appendChild(fileItem);

          fileItem.querySelector('.remove-file').addEventListener('click', () => {
            uploadedFiles = uploadedFiles.filter(f => f.name !== file.name);
            fileItem.remove();
          });
        }
      }
    }

    // Step 3: AI Tools (Mock functionality)
    document.querySelectorAll('.ai-tool-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const aiAction = e.target.getAttribute('data-ai-action');
        let aiMessage = "AI processing complete!";
        loadingSpinner.style.display = 'block';

        setTimeout(() => {
          loadingSpinner.style.display = 'none';
          switch (aiAction) {
            case 'improve-abstract':
              aiMessage = "Abstract improved for clarity and conciseness. Check the abstract field!";
              break;
            case 'suggest-citations':
              aiMessage = "AI suggests 5 new relevant citations. Check the suggestions panel!";
              break;
            case 'auto-keywords':
              aiMessage = "Keywords automatically generated and added to your list!";
              break;
            case 'plagiarism-check':
              aiMessage = "Plagiarism check complete: 98% original content found!";
              break;
          }
          showMessageModal("AI Tool Result", aiMessage);
        }, 2000); // Simulate AI processing time
      });
    });

    // Step 4: Collaboration
    if (addCollaboratorBtn) {
      addCollaboratorBtn.addEventListener('click', () => {
        const email = collaboratorEmailInput.value.trim();
        if (email && !collaborators.includes(email)) {
          collaborators.push(email);
          const collabItem = document.createElement('div');
          collabItem.classList.add('collaborator-item');
          collabItem.innerHTML = `
            <span><i class="fas fa-user"></i> ${email}</span>
            <button type="button" class="remove-collab-btn">✖</button>
          `;
          collaboratorList.appendChild(collabItem);
          collaboratorEmailInput.value = '';
          collabItem.querySelector('.remove-collab-btn').addEventListener('click', () => {
            collaborators = collaborators.filter(e => e !== email);
            collabItem.remove();
          });
        } else if (collaborators.includes(email)) {
          showMessageModal("Input Error", "Collaborator already added.");
        } else {
          showMessageModal("Input Error", "Please enter a valid email address.");
        }
      });
    }

    // Step 5: Blockchain Seal (Mock)
    document.querySelectorAll('.blockchain-btn').forEach(button => {
      button.addEventListener('click', () => {
        loadingSpinner.style.display = 'block';
        setTimeout(() => {
          loadingSpinner.style.display = 'none';
          showMessageModal("Blockchain Seal", "Your paper has been mock-timestamped on the blockchain!");
        }, 1500);
      });
    });


    // Final Submission
    if (finalSubmitBtn) {
      uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
          // Simulate upload progress
          let progress = 0;
          uploadProgressBar.style.width = '0%';
          uploadProgressBar.innerText = '0%';
          uploadProgressText.innerText = 'Uploading...';
          loadingSpinner.style.display = 'block';
          finalSubmitBtn.disabled = true; // Disable button during upload

          const uploadInterval = setInterval(() => {
            progress += 10;
            if (progress <= 100) {
              uploadProgressBar.style.width = `${progress}%`;
              uploadProgressBar.innerText = `${progress}%`;
              uploadProgressText.innerText = `Uploading... ${progress}%`;
            } else {
              clearInterval(uploadInterval);
              loadingSpinner.style.display = 'none';
              uploadProgressText.innerText = 'Upload Complete!';
              uploadSuccessMessage.style.display = 'block';
              finalSubmitBtn.style.display = 'none'; // Hide submit button
              prevStepBtn.style.display = 'none'; // Hide nav buttons
              nextStepBtn.style.display = 'none';
              showMessageModal("Success", "Your paper has been successfully published!");
            }
          }, 200); // Simulate 2 seconds upload
        }
      });
    }
  }
});
