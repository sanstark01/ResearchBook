document.addEventListener('DOMContentLoaded', () => {
  // --- Global UI Elements ---
  const loadingSpinner = document.getElementById('loadingSpinner');
  const messageModal = document.getElementById('messageModal');
  const messageModalTitle = document.getElementById('messageModalTitle');
  const messageModalText = document.getElementById('messageModalText');
  const messageModalClose = document.getElementById('messageModalClose');
  const messageModalOK = document.getElementById('messageModalOK');
  const aiSuggestionModal = document.getElementById('aiSuggestionModal'); // Get AI Suggestion Modal
  const aiModalClose = document.getElementById('aiModalClose'); // Get AI Suggestion Modal close button
  const aiSuggestOK = document.getElementById('aiSuggestOK'); // Get AI Suggestion Modal OK button

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

  /**
   * Displays the AI Suggestion modal.
   */
  function showAiSuggestionModal() { // New function to show AI modal
    aiSuggestionModal.style.display = 'flex';
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

    // Close AI suggestion modal if open and click outside
    if (aiSuggestionModal && event.target === aiSuggestionModal) {
      aiSuggestionModal.style.display = 'none';
    }
  });

  // --- Theme Switching Logic ---
  const themePaletteBtn = document.getElementById('themePaletteBtn');
  const themeOptions = document.getElementById('themeOptions');
  const themePaletteDropdown = document.querySelector('.theme-palette-dropdown'); // Parent dropdown element

  // Toggle theme palette dropdown
  if (themePaletteBtn) {
    themePaletteBtn.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent click from bubbling to window and closing immediately
      themePaletteDropdown.classList.toggle('active');
    });
  }

  // Apply selected theme
  if (themeOptions) {
    themeOptions.querySelectorAll('.theme-option').forEach(option => {
      option.addEventListener('click', () => {
        const selectedTheme = option.dataset.theme;
        document.body.className = selectedTheme; // Set entire class
        localStorage.setItem('selectedTheme', selectedTheme);
        themePaletteDropdown.classList.remove('active'); // Close dropdown after selection
      });
    });
  }

  // Load saved theme on page load
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    document.body.className = savedTheme;
  } else {
    // Default to light-theme if no theme is saved
    document.body.className = 'elegant-ui light-theme';
  }

  // Example for simple light/dark toggle (if separate from palette)
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.className;
      if (currentTheme.includes('light-theme')) {
        document.body.className = 'elegant-ui dark-theme';
        localStorage.setItem('selectedTheme', 'elegant-ui dark-theme');
        themeToggle.querySelector('i').className = 'fas fa-moon'; // Change to moon icon
      } else {
        document.body.className = 'elegant-ui light-theme';
        localStorage.setItem('selectedTheme', 'elegant-ui light-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun'; // Change to sun icon
      }
    });
    // Set initial icon based on loaded theme
    if (document.body.className.includes('dark-theme')) {
      themeToggle.querySelector('i').className = 'fas fa-moon';
    } else {
      themeToggle.querySelector('i').className = 'fas fa-sun';
    }
  }


  // --- Off-screen Menu Logic ---
  const gemMenuToggle = document.getElementById('gemMenuToggle');
  const offScreenMenu = document.getElementById('offScreenMenu');
  const offScreenCloseBtn = document.getElementById('offScreenCloseBtn');
  const mainContent = document.querySelector('.main-content'); // Assuming you want to dim this

  if (gemMenuToggle) {
    gemMenuToggle.addEventListener('click', () => {
      offScreenMenu.classList.add('active');
      gemMenuToggle.classList.add('active'); // Add active class to gem icon
      mainContent.classList.add('dimmed'); // Add dimmed class to main content
    });
  }

  if (offScreenCloseBtn) {
    offScreenCloseBtn.addEventListener('click', () => {
      offScreenMenu.classList.remove('active');
      gemMenuToggle.classList.remove('active'); // Remove active class from gem icon
      mainContent.classList.remove('dimmed'); // Remove dimmed class
    });
  }

  // Close menu on navigation click (if data-section is present)
  offScreenMenu.querySelectorAll('a[data-section]').forEach(link => {
    link.addEventListener('click', () => {
      offScreenMenu.classList.remove('active');
      gemMenuToggle.classList.remove('active');
      mainContent.classList.remove('dimmed');
    });
  });

  // --- Section Navigation Logic (for main content sections) ---
  const navLinks = document.querySelectorAll('.navbar a[data-section], .bottom-nav a[data-section], .off-screen-menu a[data-section], .cta-btn[data-action="explore"], .tile[data-action="explore"], .tile[data-action="ai-assistant"], .tile[data-action="collaborate"]');
  const sections = document.querySelectorAll('main section');

  function showSection(sectionId) {
    sections.forEach(section => {
      if (section.id === sectionId) {
        section.classList.add('active-section');
      } else {
        section.classList.remove('active-section');
      }
    });

    // Update active class for bottom navigation
    document.querySelectorAll('.bottom-nav a').forEach(link => {
      if (link.dataset.section === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      let sectionId = link.dataset.section;
      if (link.dataset.action === 'explore') {
        sectionId = 'explore';
      } else if (link.dataset.action === 'ai-assistant') {
        sectionId = 'ai-assistant';
      } else if (link.dataset.action === 'collaborate') {
        sectionId = 'collaborate';
      }

      if (sectionId) {
        showSection(sectionId);
      } else if (link.href && link.href.includes('.html')) {
        // If it's a direct link to another HTML page, let default behavior happen
        window.location.href = link.href;
      }
    });
  });

  // Initialize: Show home section on load
  showSection('home');

  // --- Mock Data and Dynamic Loading (if needed, simplified) ---
  // Currently, content is static. This would be where AJAX/Fetch calls go.

  // --- AI Assistant Mock Functionality ---
  const aiProcessBtn = document.getElementById('aiProcessBtn');
  const aiInputText = document.getElementById('aiInputText');
  const aiOutputText = document.getElementById('aiOutputText');
  const aiAssistantBtn = document.getElementById('aiAssistantBtn'); // Get the new Lottie AI Assistant button


  if (aiProcessBtn) {
    aiProcessBtn.addEventListener('click', () => {
      const query = aiInputText.value.trim();
      if (query === '') {
        showMessageModal("AI Assistant", "Please enter some text or a query for the AI to process.");
        return;
      }

      aiOutputText.innerText = 'Thinking...';
      loadingSpinner.style.display = 'block'; // Show loading spinner

      setTimeout(() => {
        loadingSpinner.style.display = 'none'; // Hide loading spinner
        aiOutputText.innerText = \"🔮 AI Suggestion: Based on your input, you might explore 'AI in sustainable agriculture' or 'Neuroscience of virtual reality'.\";
      }, 1500); // Simulate AI thinking time
    });
  }

  // Open AI modal when AI Assistant Lottie button is clicked
  if (aiAssistantBtn) {
    aiAssistantBtn.addEventListener('click', showAiSuggestionModal);
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

  // Handle direct navigation to upload.html from navbar or bottom nav
  const uploadNavBtn = document.getElementById('uploadNavBtn');
  if (uploadNavBtn) {
    uploadNavBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior
      window.location.href = 'upload.html';
    });
  }

  // Handle logout button clicks
  const logoutBtn = document.getElementById('logoutBtn');
  const settingsLogoutBtn = document.getElementById('settingsLogoutBtn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      showMessageModal("Logout", "You have been successfully logged out.");
      // In a real app, you'd clear session/local storage, redirect to login page
    });
  }

  if (settingsLogoutBtn) {
    settingsLogoutBtn.addEventListener('click', () => {
      showMessageModal("Logout", "You have been successfully logged out.");
      // In a real app, you'd clear session/local storage, redirect to login page
    });
  }
});
