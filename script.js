document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside or clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = 'var(--shadow-lg)';
            navbar.style.backgroundColor = 'var(--bg-color)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'var(--shadow-md)';
        }
    });

    // Theme Toggle (Light/Dark Mode)
    const themeBtn = document.getElementById('themeToggle');
    const footerThemeBtn = document.getElementById('footerThemeToggle');
    const htmlEl = document.documentElement;
    let isDarkMode = localStorage.getItem('theme') === 'dark';

    const applyTheme = (dark) => {
        if (dark) {
            htmlEl.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            htmlEl.setAttribute('data-theme', 'light');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    };

    // Initialize Theme
    applyTheme(isDarkMode);

    const toggleTheme = () => {
        isDarkMode = !isDarkMode;
        applyTheme(isDarkMode);
    };

    themeBtn.addEventListener('click', toggleTheme);
    if(footerThemeBtn) {
        footerThemeBtn.addEventListener('click', toggleTheme);
    }

    // AI Chatbot Logic
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatbotMessages = document.getElementById('chatbotMessages');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if(chatbotWindow.classList.contains('active')) {
            chatbotWindow.style.display = 'flex';
        } else {
            // Wait for fade out
            setTimeout(() => {
                chatbotWindow.style.display = 'none';
            }, 300);
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
        setTimeout(() => {
            chatbotWindow.style.display = 'none';
        }, 300);
    });

    const addMessage = (text, isUser = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${isUser ? 'user-msg' : 'bot-msg'}`;
        msgDiv.textContent = text;
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    const handleChat = () => {
        const val = chatInput.value.trim();
        if(!val) return;
        
        // Add User Message
        addMessage(val, true);
        chatInput.value = '';

        // Bot Response simulation
        setTimeout(() => {
            const lowerVal = val.toLowerCase();
            let botReply = '';

            if (lowerVal.includes('quote') || lowerVal.includes('estimate') || lowerVal.includes('price')) {
                botReply = "I can help with that! You can get a free estimate by filling out the form on our website or calling us directly at (978) 427-1906. What type of project are you planning?";
            } else if (lowerVal.includes('service') || lowerVal.includes('what do you do')) {
                botReply = "We specialize in both commercial and residential construction. Our core services include addition, remodeling, concrete, foundation, siding, and new construction. How can we assist you today?";
            } else if (lowerVal.includes('contact') || lowerVal.includes('phone') || lowerVal.includes('call')) {
                botReply = "You can reach us directly at (978) 427-1906 or via email at epsconstruction10@gmail.com. Would you like me to note down your contact details for someone to reach out?";
            } else if (lowerVal.includes('book') || lowerVal.includes('consultation')) {
                botReply = "Great! Please provide your phone number and email, and one of our project managers will contact you to schedule a consultation.";
            } else {
                botReply = "Thank you for reaching out to EPS Construction! A representative will connect with you shortly. If urgent, please call (978) 427-1906.";
            }
            
            addMessage(botReply, false);
        }, 800);
    };

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChat();
        }
    });

    // Form submission handling
    const estimateForm = document.getElementById('estimateForm');
    estimateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = estimateForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending Request...';
        btn.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            alert('Thank you! Your estimate request has been sent successfully. We will get back to you soon.');
            estimateForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
});
