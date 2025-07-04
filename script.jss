document.addEventListener('DOMContentLoaded', () => {
  // --- Global UI Elements ---
  const loadingSpinner = document.getElementById('loadingSpinner');
  const messageModal = document.getElementById('messageModal');
  const messageModalTitle = document.getElementById('messageModalTitle');
  const messageModalText = document.getElementById('messageModalText');
  const messageModalClose = document.getElementById('messageModalClose');
  const messageModalOK = document.getElementById('messageModalOK');

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
  const flowerContainer = document.getElementById('flowerContainer'); // For Onam effect

  let flowerInterval; // Declare flowerInterval here so it's accessible

  function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    const flowerEmojis = ['🌸', '🌼', '🌺', '🌻', '🏵️', '🌷', '🌹'];
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
    stopOnamFlowerShower(); // Clear any existing interval first
    if (flowerContainer) {
      flowerInterval = setInterval(createFlower, 300);
    }
  }

  function stopOnamFlowerShower() {
    if (flowerInterval) {
      clearInterval(flowerInterval);
      flowerInterval = null;
    }
    if (flowerContainer) {
      while (flowerContainer.firstChild) {
        flowerContainer.removeChild(flowerContainer.firstChild);
      }
    }
  }

  // Function to apply a specific theme
  function selectTheme(themeName) {
    // Remove all existing theme classes
    document.body.classList.remove('light-theme', 'dark-theme', 'chat-movie-theme', 'event-theme', 'onam-theme');
    // Add the new theme class
    document.body.classList.add(themeName + '-theme');
    // Store the selected theme in local storage
    localStorage.setItem('theme', themeName);

    // Handle Onam flower animation
    if (themeName === 'onam') {
      startOnamFlowerShower();
    } else {
      stopOnamFlowerShower();
    }
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

});
