class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #050505;
                    color: #9ca3af;
                    padding: 4rem 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                
                .footer-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 3rem;
                    margin-bottom: 3rem;
                }
                
                .footer-logo {
                    font-size: 1.5rem;
                    font-weight: 800;
                    background: linear-gradient(to right, #00f0ff, #bd00ff);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    margin-bottom: 1rem;
                    display: inline-block;
                }
                
                .footer-description {
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                }
                
                .social-link {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .social-link:hover {
                    background-color: rgba(0, 240, 255, 0.1);
                    border-color: #00f0ff;
                    color: #00f0ff;
                }
                
                .footer-heading {
                    color: white;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }
                
                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .footer-link {
                    color: #9ca3af;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .footer-link:hover {
                    color: #00f0ff;
                }
                
                .footer-bottom {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 1rem;
                }
                
                .copyright {
                    font-size: 0.875rem;
                }
                
                @media (min-width: 768px) {
                    .footer-bottom {
                        flex-direction: row;
                        justify-content: space-between;
                    }
                }
            </style>
            
            <div class="footer-container">
                <div class="footer-grid">

                    <div>
                        <h3 class="footer-heading">Services</h3>
                        <div class="footer-links">
                            <span href="#" class="footer-link">Website Design</span>
                            <span href="#" class="footer-link">Brand Identity</span>
                            <span href="#" class="footer-link">Digital Marketing</span>
                            <span href="#" class="footer-link">Content Creation</span>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="footer-heading">Company</h3>
                        <div class="footer-links">
                            <a href="index.html#about" class="footer-link">About Us</a>
                            <a href="portfolio.html" class="footer-link">Designs</a>
                            <a href="websites.html" class="footer-link">Websites</a>
                            <a href="index.html#services" class="footer-link">Services</a>
                            <a href="index.html#contact" class="footer-link">Contact</a>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="footer-heading">Contact</h3>
                        <div class="footer-links">
                            <a href="tel:+918369013101" class="footer-link">+91 83690 13101</a>
                    
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="copyright">
                        &copy; ${new Date().getFullYear()} KRTX Agency. All rights reserved.
                    </div>
                    <div class="footer-links" style="flex-direction: row; gap: 1.5rem;">
                        <a href="#" class="footer-link">Privacy Policy</a>
                        <a href="#" class="footer-link">Terms of Service</a>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize feather icons
        if (window.feather) {
            window.feather.replace();
        }
    }
}

customElements.define('custom-footer', CustomFooter);