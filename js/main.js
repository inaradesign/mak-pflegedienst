// ============================================
// MAK Pflegedienst GmbH - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // ============================================
  // Header Scroll Effect
  // ============================================
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // ============================================
  // Active Navigation Link
  // ============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId !== '#' && targetId !== '') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ============================================
  // Scroll Animations
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe cards and sections
  const animatedElements = document.querySelectorAll('.card, .section > .container > *');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
  
  // ============================================
  // Form Validation (Contact Form)
  // ============================================
  const contactForm = document.querySelector('#contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const name = document.querySelector('#name');
      const email = document.querySelector('#email');
      const phone = document.querySelector('#phone');
      const message = document.querySelector('#message');
      
      let isValid = true;
      
      // Reset previous error states
      [name, email, phone, message].forEach(field => {
        if (field) {
          field.style.borderColor = '';
        }
      });
      
      // Validate name
      if (name && name.value.trim() === '') {
        name.style.borderColor = '#DD2E39';
        isValid = false;
      }
      
      // Validate email
      if (email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '' || !emailPattern.test(email.value)) {
          email.style.borderColor = '#DD2E39';
          isValid = false;
        }
      }
      
      // Validate message
      if (message && message.value.trim() === '') {
        message.style.borderColor = '#DD2E39';
        isValid = false;
      }
      
      if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
          background-color: #5BC8C8;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          margin-top: 1rem;
          text-align: center;
          font-weight: 500;
        `;
        successMessage.textContent = 'Vielen Dank für Ihre Nachricht! Wir melden uns zeitnah bei Ihnen.';
        
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      } else {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
          background-color: #DD2E39;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          margin-top: 1rem;
          text-align: center;
          font-weight: 500;
        `;
        errorMessage.textContent = 'Bitte füllen Sie alle Pflichtfelder korrekt aus.';
        
        // Remove existing error message if any
        const existingError = contactForm.querySelector('.error-message');
        if (existingError) {
          existingError.remove();
        }
        
        errorMessage.classList.add('error-message');
        contactForm.appendChild(errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
          errorMessage.remove();
        }, 5000);
      }
    });
  }
  
  // ============================================
  // Back to Top Button (Optional Enhancement)
  // ============================================
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
});
