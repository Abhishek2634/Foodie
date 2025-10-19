import React, { useEffect, useContext } from "react";
import AOS from "aos";
import "./AboutUs.css";
import { ThemeContext } from "../context/ThemeContext";

const AboutUs = () => {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const categories = [
        { name: "Vegetarian", icon: "🥗" },
        { name: "Non-Veg", icon: "🍖" },
        { name: "Italian", icon: "🍝" },
        { name: "Chinese", icon: "🥟" },
        { name: "Desserts", icon: "🍰" },
        { name: "Main Course", icon: "🍽️" },
    ];
    
    const howItWorks = [
        { icon: "fas fa-mobile-alt", title: "Browse", description: "Explore our diverse menu." },
        { icon: "fas fa-cart-plus", title: "Order", description: "Add favorites to your cart." },
        { icon: "fas fa-credit-card", title: "Pay", description: "Securely pay through multiple options." },
        { icon: "fas fa-shipping-fast", title: "Enjoy", description: "Get it delivered fresh and fast." },
    ];

    return (
        <div className={`about-us-page ${theme}`}>
            {/* Hero Section */}
            <header className="about-hero">
                <div className="hero-content" data-aos="fade-up">
                    <h1 className="main-slogan">
                        Good Food, <span className="highlight">Good Mood.</span>
                    </h1>
                    <p className="subtitle">
                        The best meals from the finest chefs, delivered directly to you.
                    </p>
                </div>
            </header>

            {/* Main Content Body */}
            <main className="main-content-wrapper">
                {/* About Section */}
                <section className="about-section" data-aos="fade-up">
                    <div className="image-column">
                        <img src="/images/about-chef.jpg" alt="Chef preparing food" />
                    </div>
                    <div className="text-column">
                        <h2 className="section-title">Our Passion for Perfection</h2>
                        <p>
                            At Foodies, we believe food is an experience. We combine authentic recipes, the freshest ingredients, and a passion for cooking to create unforgettable meals. Our mission is to deliver not just food, but happiness.
                        </p>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="categories-section" data-aos="fade-up">
                    <h2 className="section-title">Endless Flavors to Explore</h2>
                    <div className="categories-grid">
                        {categories.map((cat) => (
                            <div key={cat.name} className="category-card">
                                <span className="category-icon">{cat.icon}</span>
                                <span className="category-name">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="how-it-works-section" data-aos="fade-up">
                    <h2 className="section-title">Simple Steps to Deliciousness</h2>
                    <div className="steps-container">
                        {howItWorks.map((step, index) => (
                           <React.Fragment key={step.title}>
                                <div className="step-card">
                                    <div className="step-icon"><i className={step.icon}></i></div>
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-description">{step.description}</p>
                                </div>
                                {index < howItWorks.length - 1 && <div className="step-arrow"><i className="fas fa-arrow-right"></i></div>}
                           </React.Fragment>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;