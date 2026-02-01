// Add subtle interactive effects

document.addEventListener('DOMContentLoaded', function() {
    // Theme management
    const themeToggle = document.getElementById('themeToggle');
    const themeName = document.getElementById('themeName');
    const body = document.body;
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('cv-theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeName.textContent = 'light';
    } else {
        body.classList.remove('light-mode');
        themeName.textContent = 'dark';
    }
    
    // Toggle theme function
    function toggleTheme() {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeName.textContent = isLight ? 'light' : 'dark';
        localStorage.setItem('cv-theme', isLight ? 'light' : 'dark');
    }
    
    // Click to toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Keyboard shortcut: 't' key to toggle theme (Emacs-style)
    let ctrlXPressed = false;
    document.addEventListener('keydown', function(e) {
        // Only trigger if not typing in an input field
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            // Handle C-x C-t sequence (Emacs-style)
            if (e.ctrlKey && (e.key === 'x' || e.key === 'X')) {
                ctrlXPressed = true;
                setTimeout(() => { ctrlXPressed = false; }, 1000); // Reset after 1 second
                return;
            }
            
            if (ctrlXPressed && e.ctrlKey && (e.key === 't' || e.key === 'T')) {
                toggleTheme();
                ctrlXPressed = false;
                e.preventDefault();
                return;
            }
            
            // Simple 't' key toggle (when not in a modifier combo)
            if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
                toggleTheme();
                e.preventDefault();
            }
        }
    });
    
    // Add typing effect to the prompt line (optional enhancement)
    const promptLine = document.querySelector('.prompt-line');
    if (promptLine) {
        // Subtle fade-in animation
        promptLine.style.opacity = '0';
        promptLine.style.transition = 'opacity 0.5s ease-in';
        setTimeout(() => {
            promptLine.style.opacity = '1';
        }, 100);
    }

    // Add hover effects to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = 'var(--fg-accent-2)';
            this.style.transition = 'border-left-color 0.3s ease';
        });
        item.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = 'var(--border-color)';
        });
    });

    // Smooth scroll for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

