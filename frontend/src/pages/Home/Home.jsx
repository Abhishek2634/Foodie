:root {
  --navbar-bg: #ffffff;
  --bg-color: #ffffff;
  --text-color: #2d3748;
  --accent-color: #ff6347;
  --accent-hover: #e55339;
  --border-color: #e2e8f0;
  --hover-bg: #f7fafc;
  --active-bg: #fed7d7;
  --theme-toggle-bg: #f7fafc;
}

[data-theme="dark"] {
  --navbar-bg: #11151d;
  --bg-color: #1a202c;
  --text-color: #e2e8f0;
  --accent-color: #ff6347;
  --accent-hover: #e55339;
  --border-color: #2d3748;
  --hover-bg: #2d3748;
  --active-bg: #744210;
  --theme-toggle-bg: #2d3748;
}

body {
  width: 100%;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  padding-top: 65px;
  padding-bottom: 0;
}

.navbar {
  width: 100%;
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: var(--navbar-bg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  padding: 0.6rem 1.2rem;

}

.navbar-logo {
  width: 8%;
  max-width: 70px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: transform 0.14s cubic-bezier(0.4,0.1,0.6,0.9);
}
.navbar-logo img{
  width: 50px;
  height: 50px;
}
.navbar-logo img:hover{
  transform: scale(1.03); 
}

.app-icon {
  height: 50px;
  width: 50px;
  border-radius: 10px;
}


.navbar-menu,
.navbar-menu-desktop {
  width: 65%;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex: 1;
  padding-right: 2rem;
}
.navbar-menu::-webkit-scrollbar {
  display: none;
  padding-right: 2rem;
  justify-content: center;
  gap: 1.5rem;
  flex: 1;
  /* gap: 0.75rem;
  margin: 0 24px; */

}
.navbar-menu-mobile {
  display: none;
}

.navbar-right {

  width: 27%;
  max-width: 250px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
  flex-shrink: 0;
  margin-left: 12px;

  
}

/* ACTION BUTTONS */
.theme-toggle {
  background: var(--theme-toggle-bg);
  border: none;
  color: var(--text-color);
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  flex-shrink: 0;
  flex-grow: 0;

}
.theme-toggle:hover { background: var(--accent-color); color: #fff; transform: rotate(180deg); }

.signin-button {
  background: var(--accent-color);
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  display: flex; align-items: center; gap: 6px;
  font-size: 14px; font-weight: 500;
  transition: all 0.3s;
  white-space: nowrap;
  flex-shrink: 0;
}
.signin-button:hover {
  background: var(--accent-hover);
  box-shadow: 0 4px 12px rgba(255,99,71,0.2);
  transform: translateY(-1px);
}

.navbar-cart {
  position: relative;
  flex-shrink: 0;
}

/* Add to Navbar.css */
.cart-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #fc4b32;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(252, 75, 50, 0.2);
}


@keyframes pulse {
  0% {transform: scale(1);}
  50% {transform: scale(1.25);}
  100% {transform: scale(1);}
}

.icon-button {
  background: transparent;
  border: none;
  color: var(--text-color);
  padding: 10px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}
.icon-button:hover { background: var(--hover-bg); color: var(--accent-color); }

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-color);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: fit-content;
  overflow: visible;
}
.nav-item:hover {
  background: var(--hover-bg);
  color: var(--accent-color);
}
.nav-item.active {
  color: var(--accent-color);
  background: var(--active-bg);
}
.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px; height: 2px;
  background: var(--accent-color);
  border-radius: 1px;
}

/* DESKTOP / TABLET RESPONSIVE ADJUSTMENTS */

@media screen and (min-width: 1200px) {
  .navbar{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .navbar-logo img{
    width: 60px;
    height: 60px;
  }
  .navbar-logo{
    width: 80px;
  }
  .navbar-menu.navbar-menu-desktop{
    width: 1000px;
    max-width: 1000px;
    gap: 10px;
    padding-left: 40px;
    padding-right: 40px;
  }
  .app-icon {
    height: 60px;
    width: 60px;
    border-radius: 8px;
  }
  .nav-item {
    gap: 6px;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 14px;
  }
  .navbar-right{
    width: 280px;
    max-width: 280px;
    padding-right: 0.5rem;
    gap: 12px;
    justify-content: flex-end;
  }
  .signin-button {
    padding: 8px 16px;
    font-size: 14px;
  }
} 

@media screen and (min-width: 1100px) {
  .navbar{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .navbar-logo img{
    width: 60px;
    height: 60px;
  }
  .navbar-logo{
    width: 80px;
  }
  .navbar-menu.navbar-menu-desktop{
    width: 800px;
    max-width: 800px;
    padding-left: 20px;
    padding-right: 20px;
    gap: 8px;
  }
  .app-icon {
    height: 60px;
    width: 60px;
    border-radius: 8px;
  }
  .nav-item {
    gap: 5px;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 13px;
  }

  .navbar-right{
    width: 240px;
    max-width: 240px;
    padding-right: 0.5rem;
    gap: 10px;
    justify-content: flex-end;
  }

  .theme-toggle {

    padding: 8px;
    width: 36px;
    
    height: 36px;

  }
  .navbar-cart {
    width: auto;
    height: auto;
  }
  .signin-button {
    padding: 6px 12px;
    border-radius: 8px;
    gap: 4px;
    font-size: 13px; 
    font-weight: 500;
  }
} 

@media screen and (min-width:751px) and (max-width:1100px) {
  .navbar-logo img{
    width: 45px;
    height: 45px;
  }
  .navbar-logo{
    width: 70px;
    left: 0;
    margin-left: 0;
  }
  .navbar-menu.navbar-menu-desktop{
    width: 550px;
    max-width: 550px;
    display: flex;
    padding-left: 8px;
    padding-right: 8px;
    gap: 5px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 5px 8px;
    border-radius: 8px;
    font-size: 11px;
  }

  .app-icon {
    height: 25px;
    width: 25px;
    border-radius: 6px;
  }
  .navbar-right{
    width: 200px;
    max-width: 200px;
    margin-left: 8px;
    padding-right: 8px;
    gap: 6px;
    justify-content: flex-end;
  }

  .theme-toggle {
    padding: 4px;
    width: 26px; height: 26px;
  }
  .navbar-cart {
    width: auto;
    height: auto;
  }
  .signin-button {
    background: var(--accent-color);
    color: #fff;
    border: none;
    padding: 4px 6px;
    border-radius: 8px;
    gap: 3px;
    font-size: 10px; 
    font-weight: 500;
    white-space: nowrap;
  }
}

@media (max-width: 750px) {
  /* Hide inline menu, show mobile bottom nav */
  .navbar-menu, .navbar-menu-desktop {
    display: none !important;
  }

  body {
    width: 100%;
    /* padding-top: 44px; padding-bottom: 64px;  */
  }
  .navbar {
    width: 100dvw;
    display: flex;
    justify-content: space-between;
    padding-inline: 1rem;
  }
  .app-icon { height: 32px; width: 32px; }
  /* .navbar-logo { margin-right: 0; } */

  .navbar-right{
    width: auto;
    min-width: 140px;
    gap: 8px;
    justify-content: flex-end;
  }
  .theme-toggle, .icon-button { 
    width: 32px; 
    height: 32px; 
    padding: 6px;
  }
  .signin-button { 
    font-size: 11px; 
    padding: 6px 8px;
    white-space: nowrap;
  }

  .navbar-menu-mobile {
    display: flex !important;
    position: fixed;
    left: 0; right: 0; bottom: 0;
    z-index: 1101;
    background: var(--navbar-bg);
    border-top: 1px solid var(--border-color);
    box-shadow: 0 -2px 18px 0 rgba(0,0,0,0.04);
    margin: 0;
    padding: 0;
    gap: 0.25rem;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    min-width: 0;
    max-width: 100vw;
    overflow-x: auto;
    height: 56px;
  }
  .navbar-menu-mobile .nav-item {
    flex-direction: column;
    gap: 2px;
    padding: 2px 2px;
    font-size: 11px;
    min-width: 44px;
    max-width: 64px;
    width: 100%;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    word-break: break-word;
    background: none;
    font-weight: 500;
    transition: all 0.3s;
  }
  .navbar-menu-mobile .nav-item svg {
    width: 20px; height: 20px;
    margin-bottom: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .navbar-menu-mobile .nav-item span {
    font-size: 10px;
    font-weight: 500;
    text-align: center;
    display: block;
    white-space: normal;
    line-height: 1.1;
    word-break: break-word;
  }
  .navbar-menu-mobile .nav-item.active {
    color: var(--accent-color);
    background: none;
    transform: translateY(-2px);
  }
  .navbar-menu-mobile .nav-item.active::after, 
  .navbar-menu-mobile .nav-item:hover::after {
    display: none;
  }
  .navbar-menu-mobile .nav-item:hover {
    background: none;
    color: var(--accent-color);
    transform: translateY(-2px);
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  background-color: #333;
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.logout-button {
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
}
/* Wishlist icon container */
.navbar-wishlist {
  position: relative;
  margin-right: 12px;
}

/* Wishlist icon button */
.navbar-wishlist .icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--card-bg, #fff);
  color: var(--text-color, #333);
  transition: background 0.3s ease;
}

.navbar-wishlist .icon-button:hover {
  background: var(--hover-bg, #f3f3f3);
}

/* Wishlist badge (same style as cart badge) */
.wishlist-badge {
  position: absolute;
  top: -6px;
  right: -6px; /* initial position */
  background-color: #ff4d6d;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 50%;
  padding: 2px 6px;
  min-width: 18px;
  text-align: center;
  transition: transform 0.2s ease;
}

/* Shift 2px right on hover of wishlist icon */
.navbar-right .nav-item:hover .wishlist-badge,
.navbar-menu-desktop .nav-item:hover .wishlist-badge {
  transform: translateX(2px);
}
