// Default configuration
const defaultConfig = {
  hero_headline: 'Next-Generation Software & Digital Solutions',
  hero_description: 'Transform your ideas into reality with cutting-edge web development, AI/ML solutions, and stunning digital designs. We deliver excellence at competitive prices.',
  about_title: 'Building Digital Excellence',
  contact_phone: '+91 85259 22839',
  contact_email: 'drunex2026@gmail.com',
  background_color: '#0a0a0b',
  surface_color: '#141418',
  text_color: '#ffffff',
  accent_color: '#39ff14',
  secondary_accent: '#1a1a2e'
};

// Initialize Element SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => {
      // Update hero section
      const heroHeadline = document.getElementById('hero-headline');
      if (heroHeadline) {
        const text = config.hero_headline || defaultConfig.hero_headline;
        heroHeadline.innerHTML = text.replace('Software & Digital', '<span class="gradient-text glow-green">Software & Digital</span>');
      }
      
      const heroDescription = document.getElementById('hero-description');
      if (heroDescription) {
        heroDescription.textContent = config.hero_description || defaultConfig.hero_description;
      }
      
      // Update about section
      const aboutTitle = document.getElementById('about-title');
      if (aboutTitle) {
        const text = config.about_title || defaultConfig.about_title;
        aboutTitle.innerHTML = text.replace('Digital Excellence', '<span class="gradient-text">Digital Excellence</span>');
      }
      
      // Update contact info
      const contactPhone = document.getElementById('contact-phone');
      if (contactPhone) {
        contactPhone.textContent = config.contact_phone || defaultConfig.contact_phone;
      }
      
      const contactEmail = document.getElementById('contact-email');
      if (contactEmail) {
        contactEmail.textContent = config.contact_email || defaultConfig.contact_email;
      }
      
      // Update colors
      document.body.style.background = config.background_color || defaultConfig.background_color;
    },
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (value) => {
            config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          }
        },
        {
          get: () => config.surface_color || defaultConfig.surface_color,
          set: (value) => {
            config.surface_color = value;
            window.elementSdk.setConfig({ surface_color: value });
          }
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (value) => {
            config.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
          }
        },
        {
          get: () => config.accent_color || defaultConfig.accent_color,
          set: (value) => {
            config.accent_color = value;
            window.elementSdk.setConfig({ accent_color: value });
          }
        }
      ],
      borderables: [],
      fontEditable: undefined,
      fontSizeable: undefined
    }),
    mapToEditPanelValues: (config) => new Map([
      ['hero_headline', config.hero_headline || defaultConfig.hero_headline],
      ['hero_description', config.hero_description || defaultConfig.hero_description],
      ['about_title', config.about_title || defaultConfig.about_title],
      ['contact_phone', config.contact_phone || defaultConfig.contact_phone],
      ['contact_email', config.contact_email || defaultConfig.contact_email]
    ])
  });
}

// Mobile Menu Functions
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.add('hidden');
}

// Modal Functions
function openModal(projectType) {
  const modal = document.getElementById('modal');
  const projectTypeInput = document.getElementById('projectType');
  
  modal.classList.remove('hidden');
  projectTypeInput.value = projectType;
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.getElementById('project-form').reset();
}

// Form Submission
function submitForm(event) {
  event.preventDefault();
  
  const fullName = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const projectType = document.getElementById('projectType').value;
  const description = document.getElementById('description').value.trim();
  
  // Validation
  if (!fullName || !phone || !email || !description) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', 'error');
    return;
  }
  
  // Create WhatsApp message without asterisks
const message = `New Project Inquiry:

Name: ${fullName}
Phone: ${phone}
Email: ${email}
Project Type: ${projectType}
Description: ${description}`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/918525922839?text=${encodedMessage}`;
  
  // Open WhatsApp
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  
  // Show success toast and close modal
  showToast('Opening WhatsApp...', 'success');
  closeModal();
}

// Toast Notification
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  
  const bgColor = type === 'success' ? 'rgba(57, 255, 20, 0.9)' : 
                  type === 'error' ? 'rgba(255, 95, 86, 0.9)' : 
                  'rgba(255, 189, 46, 0.9)';
  const textColor = type === 'success' ? '#000' : '#fff';
  
  toast.className = 'toast px-6 py-3 rounded-xl font-medium shadow-lg';
  toast.style.cssText = `background: ${bgColor}; color: ${textColor};`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service cards and feature cards
document.querySelectorAll('.service-card, .feature-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(card);
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeMobileMenu();
  }
});

// Prevent modal scroll from affecting body
document.addEventListener('touchmove', function(e) {
  if (document.body.classList.contains('modal-open')) {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent && modalContent.contains(e.target)) {
      e.stopPropagation();
    }
  }
}, { passive: false });

// Update the openModal function in script.js
function openModal(serviceType = 'General Inquiry') {
    const modal = document.getElementById('modal');
    const projectTypeField = document.getElementById('projectType');
    
    // Set the selected service type
    if (serviceType && projectTypeField) {
        projectTypeField.value = serviceType;
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Update the submitForm function to get value from select
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const fullName = form.fullName.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const projectType = form.projectType.value;
    const description = form.description.value.trim();
    
    if (!fullName || !phone || !email || !projectType || !description) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
// Create WhatsApp message
const message = `*New Project Inquiry*\n\n` +
               `*Name:* ${fullName}\n` +
               `*Phone:* ${phone}\n` +
               `*Email:* ${email}\n` +
               `*Project Type:* ${projectType}\n` +
               `*Description:* ${description}`;

    
    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/918525922839?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Show success message
    showToast('Opening WhatsApp...', 'success');
    
    // Close modal after delay
    setTimeout(() => {
        closeModal();
        form.reset();
    }, 1500);
}

// Function to reset form when modal closes
function closeModal() {
    const modal = document.getElementById('modal');
    const form = document.getElementById('project-form');
    
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    // Reset form
    if (form) {
        form.reset();
    }
}

