document.addEventListener('DOMContentLoaded', () => {
  // --- Global UI Elements ---
  const loadingSpinner = document.getElementById('loadingSpinner');
  const messageModal = document.getElementById('messageModal');
  const messageModalTitle = document.getElementById('messageModalTitle');
  const messageModalText = document.getElementById('messageModalText');
  const messageModalClose = document.getElementById('messageModalClose');
  const messageModalOK = document.getElementById('messageModalOK');
  const aiSuggestionModal = document.getElementById('aiSuggestionModal'); // AI Modal
  const aiModalClose = document.getElementById('aiModalClose');
  const aiSuggestOK = document.getElementById('aiSuggestOK');
  const aiAssistantBtn = document.getElementById('aiAssistantBtn'); // The new Lottie AI button


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

    // Close AI suggestion modal if clicked outside
    if (event.target === aiSuggestionModal) {
        aiSuggestionModal.style.display = 'none';
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
    flower.addEventListener('animationend', () => {
      flower.remove();
    });
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
    // Remove all theme classes first
    document.body.classList.remove('light-theme', 'dark-theme', 'chat-movie-theme', 'event-theme', 'onam-theme');
    // Add the selected theme class
    document.body.classList.add(themeName);

    // Manage Onam flower effect based on theme
    if (themeName === 'onam-theme') {
      startOnamFlowerShower();
    } else {
      stopOnamFlowerShower();
    }
  }

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    selectTheme(savedTheme);
  } else {
    // Default theme if no saved theme
    selectTheme('light-theme');
  }

  // Event listener for theme palette button to toggle dropdown
  if (themePaletteBtn) {
    themePaletteBtn.addEventListener('click', (event) => {
      themePaletteDropdown.classList.toggle('active');
      event.stopPropagation(); // Prevent click from bubbling to window and closing dropdown immediately
    });
  }

  // Event listeners for theme options
  themeLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const themeName = event.target.dataset.theme;
      selectTheme(themeName);
      localStorage.setItem('selectedTheme', themeName); // Save selected theme
      themePaletteDropdown.classList.remove('active'); // Close dropdown after selection
    });
  });


  // --- Navigation and Section Switching Logic ---
  const navLinks = document.querySelectorAll('.nav-menu a, .off-screen-menu a');
  const sections = document.querySelectorAll('.section-content');

  function showSection(id) {
    sections.forEach(section => {
      section.classList.remove('active');
    });
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.classList.add('active');
      // Scroll to the section if it's not the hero (as hero is usually top of page)
      if (id !== 'home') {
          targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Initial display: show the home section
  showSection('home');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      // Check if the link is for "Upload new paper / thesis" which has a direct href
      if (link.dataset.action === 'upload-main' || link.dataset.action === 'upload-main-nav') {
        // Let the default link behavior handle navigation to upload.html
        return;
      }

      event.preventDefault();
      const sectionId = event.target.dataset.section;
      const action = event.target.dataset.action;

      if (sectionId) {
        showSection(sectionId);
      } else if (action) {
        // Handle specific actions that don't just show a section
        handleAction(action);
      }

      // Close off-screen menu after clicking a link
      const offScreenMenu = document.getElementById('offScreenMenu');
      const gemMenuToggle = document.getElementById('gemMenuToggle');
      if (offScreenMenu && offScreenMenu.classList.contains('active')) {
        offScreenMenu.classList.remove('active');
        gemMenuToggle.classList.remove('active');
      }
    });
  });

  // Toggle off-screen menu with gem icon
  const gemMenuToggle = document.getElementById('gemMenuToggle');
  if (gemMenuToggle) {
    gemMenuToggle.addEventListener('click', () => {
      const offScreenMenu = document.getElementById('offScreenMenu');
      if (offScreenMenu) {
        offScreenMenu.classList.toggle('active');
        gemMenuToggle.classList.toggle('active'); // Add/remove active class for icon animation
      }
    });
  }

  // Toggle profile dropdown
  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  if (profileBtn) {
    profileBtn.addEventListener('click', (event) => {
      profileDropdown.classList.toggle('active');
      event.stopPropagation(); // Prevent click from bubbling to window and closing dropdown immediately
    });
  }

  // --- Handle Specific Actions ---
  function handleAction(action) {
    switch (action) {
      case 'get-started':
        showMessageModal("Welcome!", "Let's get your research journey started!");
        break;
      case 'explore-papers':
        showSection('explore');
        break;
      case 'mission-statement':
        showMessageModal("Our Mission", "To connect researchers globally and accelerate discovery through collaboration and intelligent tools.");
        break;
      case 'ai-improvement-suggestions-demo':
      case 'ai-related-demo':
      case 'ai-summaries-demo':
        aiSuggestionModal.style.display = 'flex';
        break;
      case 'ai-autotagging':
        showMessageModal("AI Auto-tagging", "AI will auto-generate keywords for your paper. Feature coming soon!");
        break;
      case 'ai-collaboration-matching-demo':
        showMessageModal("Collaboration Matchmaking", "Our AI finds ideal research partners based on your interests. Feature coming soon!");
        break;
      case 'join-projects':
        showMessageModal("Join Projects", "Browse open research projects and join a team. Feature coming soon!");
        break;
      case 'mentorship-board':
        showMessageModal("Mentorship Board", "Connect with experienced mentors in your field. Feature coming soon!");
        break;
      case 'institutional-collaboration':
        showMessageModal("Institutional Collaboration", "Facilitate large-scale projects between institutions. Feature coming soon!");
        break;
      case 'view-all-universities':
      case 'search-institutions':
      case 'explore-verified-entities':
        showMessageModal("Institutions & Clubs", "Directory and exploration features coming soon!");
        break;
      case 'account-security-settings':
        showMessageModal("Security Settings", "Manage your account security. Feature coming soon!");
        break;
      case 'phd-helpdesk':
        showMessageModal("PhD Helpdesk", "Support and resources for PhD students. Feature coming soon!");
        break;
      case 'report-misuse':
        showMessageModal("Report Misuse", "Report plagiarism or inappropriate content. Feature coming soon!");
        break;
      case 'decentralized-storage':
        showMessageModal("Encrypted Vault", "Secure, private storage for your sensitive research. Feature coming soon!");
        break;
      case 'engagement-analytics':
      case 'impact-analytics':
        showMessageModal("Analytics", "Detailed insights into your research impact. Feature coming soon!");
        break;
      case 'save-draft':
        showMessageModal("Save Draft", "Save your paper as a draft for later editing. Feature coming soon!");
        break;
      case 'manage-notifications':
        showMessageModal("Notification Preferences", "Customize your notification settings. Feature coming soon!");
        break;
      case 'offScreenLogoutLink': // Case for logout from off-screen menu
      case 'profileLogoutBtn': // Case for logout from profile dropdown
      case 'settingsLogoutBtn': // Case for logout from settings section
        showMessageModal("Logout", "You have been logged out.", () => {
          // Perform actual logout (e.g., clear session, redirect)
          // window.location.href = 'login.html'; // Example redirect
        });
        break;
      case 'open-theme-settings':
        themePaletteDropdown.classList.add('active'); // Directly open the theme palette
        break;
      case 'change-language':
        showMessageModal("Language Selector", "Switch between English, Hindi, Tamil, and more. Feature coming soon!");
        break;
      case 'hackathons':
      case 'call-for-papers':
      case 'kdisc-iedc-contests':
      case 'add-to-google-calendar':
        showMessageModal("Events & Competitions", "Stay updated on academic events. Feature coming soon!");
        break;
      case 'view-earned-certificates':
      case 'view-badges':
      case 'download-qr':
        showMessageModal("Certificates & Badges", "Track your achievements and verified status. Feature coming soon!");
        break;
      case 'citation-converter-tool':
      case 'research-template-guides':
      case 'ipr-patent-help':
      case 'help-center':
        showMessageModal("Resources & Tools", "Access useful tools and guides. Feature coming soon!");
        break;
      case 'edit-profile':
        showMessageModal("Edit Profile", "Functionality to edit your profile details coming soon!");
        break;
      case 'view-my-uploads':
        showMessageModal("Your Uploads", "Listing of your uploaded papers. Feature coming soon!");
        break;
      case 'view-analytics':
        showMessageModal("Analytics", "Detailed analytics of your papers. Feature coming soon!");
        break;
      case 'view-notifications':
        showMessageModal("Notifications", "Your recent notifications. Feature coming soon!");
        break;
      case 'view-paper':
        showMessageModal("View Paper", "Opening selected research paper. Feature coming soon!");
        break;
    }
  }

  // --- AI Suggestion Modal Logic (Existing, but adding Lottie button interaction) ---
  if (aiAssistantBtn) {
    aiAssistantBtn.addEventListener('click', () => {
      aiSuggestionModal.style.display = 'flex';
      // Simulate AI thinking time if needed, for demonstration
      document.getElementById("aiSuggestionText").innerText = "Thinking...";
      setTimeout(() => {
        document.getElementById("aiSuggestionText").innerText = "🔮 AI Suggestion: Try connecting your work with sustainable tech or health applications!";
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


  // --- Howler.js Sound Integration ---
  // Create sounds
  const clickSound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-arcade-retro-changing-tab-206.wav']
  });

  const aiSound = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.wav']
  });

  // Attach sounds to elements
  const themeToggle = document.getElementById("themePaletteBtn"); // Assuming this is your theme toggle
  const uploadBtn = document.getElementById("uploadPaperBtn"); // Your main upload button on upload.html

  if (themeToggle) {
    themeToggle.addEventListener("click", () => clickSound.play());
  }

  if (aiAssistantBtn) { // This is already handled above to open the modal, adding sound here
    aiAssistantBtn.addEventListener("click", () => aiSound.play());
  }

  if (uploadBtn) {
    uploadBtn.addEventListener("click", () => clickSound.play());
  }

  // --- Upload Form Specifics (from upload.html's script block) ---
  const uploadForm = document.getElementById('uploadForm');
  const uploadSteps = document.querySelectorAll('.upload-step');
  const uploadSectionContents = document.querySelectorAll('.upload-section-content');
  const fileUploadInput = document.getElementById('fileUpload');
  const dragDropArea = document.getElementById('dragDropArea');
  const fileUploadList = document.getElementById('fileUploadList');
  const authorsInput = document.getElementById('authors');
  const authorsList = document.getElementById('authorsList');
  const keywordsInput = document.getElementById('keywords');
  const keywordsList = document.getElementById('keywordsList');

  let currentStep = 1;

  function showUploadStep(step) {
    uploadSteps.forEach((s, index) => {
      s.classList.toggle('active', index + 1 === step);
    });
    uploadSectionContents.forEach((content, index) => {
      content.classList.toggle('active', index + 1 === step);
    });
    currentStep = step;
  }

  // Initial display of the first step
  showUploadStep(currentStep);

  // Navigation buttons for upload form
  document.querySelectorAll('[data-next-step]').forEach(button => {
    button.addEventListener('click', () => {
      const nextStep = parseInt(button.dataset.nextStep);
      showUploadStep(nextStep);
    });
  });

  document.querySelectorAll('[data-prev-step]').forEach(button => {
    button.addEventListener('click', () => {
      const prevStep = parseInt(button.dataset.prevStep);
      showUploadStep(prevStep);
    });
  });

  // Step click navigation for upload form
  uploadSteps.forEach(stepElement => {
    stepElement.addEventListener('click', (event) => {
      const step = parseInt(event.target.dataset.step);
      showUploadStep(step);
    });
  });

  // Drag and drop functionality for file upload
  if (dragDropArea) {
    dragDropArea.addEventListener('click', () => {
      fileUploadInput.click();
    });

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
      const files = e.dataTransfer.files;
      handleFiles(files);
    });

    fileUploadInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });
  }


  function handleFiles(files) {
    fileUploadList.innerHTML = ''; // Clear previous files
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');
        fileItem.innerHTML = `
          <span><i class="fas fa-file-pdf"></i> ${file.name}</span>
          <button type="button" class="remove-file"><i class="fas fa-times"></i></button>
        `;
        fileUploadList.appendChild(fileItem);

        fileItem.querySelector('.remove-file').addEventListener('click', () => {
          fileItem.remove();
          fileUploadInput.value = ''; // Clear the input so same file can be re-selected
        });
      } else {
        showMessageModal("Invalid File Type", "Please upload a PDF file.");
        fileUploadInput.value = ''; // Clear the input
      }
    }
  }

  // Add authors as tags
  if (authorsInput) {
    authorsInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const authorName = authorsInput.value.trim().replace(/,$/, ''); // Remove trailing comma
        if (authorName) {
          addTag(authorName, authorsList, 'author-tag');
          authorsInput.value = '';
        }
      }
    });
  }

  // Add keywords as tags
  if (keywordsInput) {
    keywordsInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const keyword = keywordsInput.value.trim().replace(/,$/, ''); // Remove trailing comma
        if (keyword) {
          addTag(keyword, keywordsList, 'keyword-tag');
          keywordsInput.value = '';
        }
      }
    });
  }

  function addTag(text, container, className) {
    const tag = document.createElement('span');
    tag.classList.add(className);
    tag.innerHTML = `${text} <button type="button" class="remove-tag">&times;</button>`;
    container.appendChild(tag);
    tag.querySelector('.remove-tag').addEventListener('click', () => {
      tag.remove();
    });
  }

  // Handle upload form submission
  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation for demonstration
      const paperTitle = document.getElementById('paperTitle').value.trim();
      const abstract = document.getElementById('abstract').value.trim();
      const file = document.getElementById('fileUpload').files[0];

      if (!paperTitle || !abstract) {
        showMessageModal("Validation Error", "Please fill in the paper title and abstract.");
        return;
      }
      if (!file) {
        showMessageModal("Validation Error", "Please upload your research paper (PDF).");
        return;
      }

      const uploadProgressBarContainer = document.getElementById('uploadProgressBarContainer');
      const uploadProgressBar = document.getElementById('uploadProgressBar');
      const uploadProgressText = document.getElementById('uploadProgressText');
      const uploadSuccessMessage = document.getElementById('uploadSuccessMessage');

      // Hide form, show progress bar
      uploadForm.style.display = 'none';
      uploadProgressBarContainer.style.display = 'block';
      uploadProgressText.style.display = 'block';
      loadingSpinner.style.display = 'block'; // Show general loading spinner

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          uploadProgressBar.style.width = `${progress}%`;
          uploadProgressBar.innerText = `${progress}%`;
          uploadProgressText.innerText = `${progress}% Complete`;
        } else {
          clearInterval(interval);
          loadingSpinner.style.display = 'none'; // Hide general loading spinner
          uploadProgressBarContainer.style.display = 'none';
          uploadProgressText.style.display = 'none';
          uploadSuccessMessage.style.display = 'block';
          showMessageModal("Success!", "Your research paper has been successfully uploaded to ResearchBook!");
        }
      }, 200); // Simulate upload progress
    });
  }
});
