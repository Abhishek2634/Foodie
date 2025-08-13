import  { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import { toast } from 'react-hot-toast';
import { Share2, Copy, Check, QrCode, Lock, Unlock } from 'lucide-react';
import QRCode from '../../components/QRCode/QRCode';
import "./wishlist.css";

const Wishlist = () => {
  const { food_list } = useContext(StoreContext);
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    // Get user data
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // Get privacy setting
    const privacySetting = localStorage.getItem(`wishlist_privacy_${storedUser?.email || 'anonymous'}`);
    setIsPublic(privacySetting === 'public');

    const updateWishlist = () => {
      const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
      const filtered = food_list.filter(food => wishlistIds.includes(food._id));
      setWishlistedItems(filtered);
    };
    updateWishlist(); // Load initially

    // Listen for custom wishlist update event
    window.addEventListener("wishlistUpdated", updateWishlist);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlist);
    };
  }, [food_list]);

  const generateShareLink = () => {
    if (!user) {
      // For demo purposes, use a default user
      const demoUser = { name: 'Demo User', email: 'demo@example.com' };
      setUser(demoUser);
    }

    const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlistIds.length === 0) {
      toast.error('Your wishlist is empty!');
      return;
    }

    // Create a unique user ID for sharing (using user's email or name)
    const userId = user.email || user.name || 'user';
    const shareId = btoa(userId).replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);

    // Store the shared wishlist data
    const sharedWishlistData = {
      wishlistIds,
      userName: user.name || 'Anonymous',
      createdAt: new Date().getTime(),
      viewCount: 0
    };

    localStorage.setItem(`shared_wishlist_${shareId}`, JSON.stringify(sharedWishlistData));

    // Generate the share URL
    const shareUrl = `${window.location.origin}/wishlist/${shareId}`;
    return shareUrl;
  };

  const handleShareWishlist = async () => {
    const url = generateShareLink();
    if (!url) return;

    setShareUrl(url);

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Wishlist link copied to clipboard!');
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      toast.success('Wishlist link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShowQRCode = () => {
    const url = generateShareLink();
    if (!url) return;
    
    setShareUrl(url);
    setShowQRCode(true);
  };

  const handlePrivacyToggle = () => {
    if (!user) {
      // For demo purposes, use a default user
      const demoUser = { name: 'Demo User', email: 'demo@example.com' };
      setUser(demoUser);
    }

    const newPrivacy = !isPublic;
    setIsPublic(newPrivacy);
    
    const privacyKey = `wishlist_privacy_${user.email || 'anonymous'}`;
    localStorage.setItem(privacyKey, newPrivacy ? 'public' : 'private');
    
    toast.success(`Wishlist is now ${newPrivacy ? 'public' : 'private'}`);
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h2>💖 Your Wishlist</h2>
        {/* Debug info */}
        <div style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>
          Debug: User signed in: {user ? 'Yes' : 'No'} | Items in wishlist: {wishlistedItems.length}
        </div>
        {wishlistedItems.length > 0 && (
          <div className="wishlist-controls">
            <div className="share-buttons">
              <button 
                className="share-wishlist-btn"
                onClick={handleShareWishlist}
                disabled={copied}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={16} />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
              <button 
                className="qr-code-btn"
                onClick={handleShowQRCode}
              >
                <QrCode size={16} />
                <span>QR Code</span>
              </button>
            </div>
            <button 
              className={`privacy-toggle-btn ${isPublic ? 'public' : 'private'}`}
              onClick={handlePrivacyToggle}
              title={`Make wishlist ${isPublic ? 'private' : 'public'}`}
            >
              {isPublic ? (
                <>
                  <Unlock size={16} />
                  <span>Public</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Private</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
      {wishlistedItems.length === 0 ? (
        <p>No items wishlisted yet!</p>
      ) : (
        <div className="food-display-list">
          {wishlistedItems.map(item => (
            <FoodItem
  key={item._id}
  id={item._id}   // Pass id explicitly
  name={item.name}
  description={item.description}
  price={item.price}
  image={item.image}
/>

          ))}
        </div>
      )}
      
      {showQRCode && (
        <QRCode 
          url={shareUrl} 
          onClose={() => setShowQRCode(false)} 
        />
      )}
    </div>
  );
};

export default Wishlist;
