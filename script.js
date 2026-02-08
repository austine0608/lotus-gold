document.addEventListener('DOMContentLoaded', function() {
    const ctaBtn = document.getElementById('ctaBtn');

    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            alert('Thanks for your interest! This is where the sign-up form would open.');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    const adminLogin = {
        username: 'admin',
        password: 'password',
        isAuthenticated: false
    };

    const loginForm = document.getElementById('loginForm');
    const loginOverlay = document.getElementById('loginOverlay');
    const adminContent = document.getElementById('adminContent');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginError = document.getElementById('loginError');

    if (loginForm) {
        const savedAuth = sessionStorage.getItem('adminAuth');
        if (savedAuth === 'true') {
            adminLogin.isAuthenticated = true;
            showAdminDashboard();
        }

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === adminLogin.username && password === adminLogin.password) {
                adminLogin.isAuthenticated = true;
                sessionStorage.setItem('adminAuth', 'true');
                showAdminDashboard();
            } else {
                loginError.textContent = 'Invalid username or password';
                document.getElementById('password').value = '';
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            adminLogin.isAuthenticated = false;
            sessionStorage.removeItem('adminAuth');
            loginOverlay.style.display = 'flex';
            adminContent.style.display = 'none';
            loginForm.reset();
            loginError.textContent = '';
        });
    }

    function showAdminDashboard() {
        loginOverlay.style.display = 'none';
        adminContent.style.display = 'flex';
        document.getElementById('adminUsername').textContent = adminLogin.username;
        animateStatCounters();
    }

    const adminNavLinks = document.querySelectorAll('.admin-nav-link');
    const adminSections = document.querySelectorAll('.admin-section');

    adminNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            adminNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            adminSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    function animateStatCounters() {
        const statCounts = document.querySelectorAll('#overview .stat-count');
        statCounts.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 1500;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }

    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            alert('Settings saved successfully!');
        });
    }

    const defaultContent = {
        'logo-text': 'Brand',
        'hero-title': 'Welcome to Our Site',
        'hero-subtitle': 'Build amazing things with our product',
        'features-title': 'Features',
        'feature1-title': 'Fast',
        'feature1-text': 'Lightning fast performance',
        'feature2-title': 'Secure',
        'feature2-text': 'Built with security in mind',
        'feature3-title': 'Responsive',
        'feature3-text': 'Works on all devices',
        'footer-text': '© 2026 Brand. All rights reserved.',
        'about-page-title': 'About Us',
        'about-page-subtitle': 'Learn more about our story and mission',
        'about-story-title': 'Our Story',
        'about-story-text1': 'We started with a simple idea: to make web development accessible to everyone. Since then, we\'ve grown into a team of passionate developers and designers dedicated to creating amazing digital experiences.',
        'about-story-text2': 'Our mission is to build products that help businesses succeed online. We believe in clean code, intuitive design, and user-focused development.',
        'stat1-value': '500+',
        'stat2-value': '100+',
        'stat3-value': '5+',
        'team-title': 'Our Team',
        'team1-name': 'John Doe',
        'team1-role': 'Founder & CEO',
        'team2-name': 'Jane Smith',
        'team2-role': 'Lead Designer',
        'team3-name': 'Mike Johnson',
        'team3-role': 'Lead Developer',
        'contact-page-title': 'Contact Us',
        'contact-page-subtitle': 'We\'d love to hear from you',
        'contact-section-title': 'Get In Touch',
        'contact-email': 'hello@brand.com',
        'contact-phone': '+1 (555) 123-4567',
        'contact-address': '123 Main Street\nNew York, NY 10001'
    };

    function loadContent() {
        const saved = JSON.parse(localStorage.getItem('siteContent') || '{}');
        document.querySelectorAll('[data-editable]').forEach(el => {
            const key = el.getAttribute('data-editable');
            if (saved[key]) {
                el.textContent = saved[key];
            }
        });
    }

    function saveEditorContent(page) {
        const inputs = document.querySelectorAll(`#panel-${page} [data-target]`);
        const saved = JSON.parse(localStorage.getItem('siteContent') || '{}');

        inputs.forEach(input => {
            const key = input.getAttribute('data-target');
            saved[key] = input.value;
        });

        localStorage.setItem('siteContent', JSON.stringify(saved));

        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = `${page.charAt(0).toUpperCase() + page.slice(1)} page content saved successfully!`;
        document.querySelector(`#panel-${page}`).insertBefore(successMsg, document.querySelector(`#panel-${page}`).querySelector('h3').nextSibling);
        setTimeout(() => successMsg.remove(), 3000);

        loadContent();
    }

    function loadEditorFields() {
        const saved = JSON.parse(localStorage.getItem('siteContent') || '{}');
        document.querySelectorAll('[data-target]').forEach(input => {
            const key = input.getAttribute('data-target');
            const defaultVal = defaultContent[key] || '';
            input.value = saved[key] || defaultVal;
        });
    }

    function resetToDefaults() {
        if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
            localStorage.removeItem('siteContent');
            loadEditorFields();
            loadContent();
            alert('Content has been reset to defaults.');
        }
    }

    function previewChanges() {
        const inputs = document.querySelectorAll('#editor [data-target]');
        const saved = JSON.parse(localStorage.getItem('siteContent') || '{}');

        inputs.forEach(input => {
            const key = input.getAttribute('data-target');
            saved[key] = input.value;
        });

        localStorage.setItem('siteContent', JSON.stringify(saved));
        loadContent();

        const tabs = document.querySelectorAll('.editor-tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector('[data-page="index"]').classList.add('active');

        const panels = document.querySelectorAll('.editor-panel');
        panels.forEach(panel => panel.classList.remove('active'));
        document.querySelector('#panel-index').classList.add('active');

        alert('Preview updated! Open the site pages in new tabs to see changes.');
    }

    const editorTabs = document.querySelectorAll('.editor-tab');
    const editorPanels = document.querySelectorAll('.editor-panel');

    editorTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const page = this.getAttribute('data-page');

            editorTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            editorPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `panel-${page}`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    const saveIndexBtn = document.getElementById('save-index');
    const saveAboutBtn = document.getElementById('save-about');
    const saveContactBtn = document.getElementById('save-contact');
    const previewBtn = document.getElementById('preview-changes');
    const resetBtn = document.getElementById('reset-defaults');

    if (saveIndexBtn) saveIndexBtn.addEventListener('click', () => saveEditorContent('index'));
    if (saveAboutBtn) saveAboutBtn.addEventListener('click', () => saveEditorContent('about'));
    if (saveContactBtn) saveContactBtn.addEventListener('click', () => saveEditorContent('contact'));
    if (previewBtn) previewBtn.addEventListener('click', previewChanges);
    if (resetBtn) resetBtn.addEventListener('click', resetToDefaults);

    loadEditorFields();
    loadContent();

    const animateElements = document.querySelectorAll('.animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    const buttons = document.querySelectorAll('.cta-button, .submit-btn, .action-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
});
