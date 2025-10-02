import React, { useState, useRef, useEffect, useContext } from "react";
import { Send, X, MessageCircle, ChefHat } from "lucide-react";
import { StoreContext } from "../context/StoreContext";
import "./Chatbot.css";

const Chatbot = () => {
  const { cartItems, addToCart } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // New state variables for the conversational flow
  const [chatState, setChatState] = useState("idle");
  const [foodPreferences, setFoodPreferences] = useState({});
  // New state to remember the last mentioned food item
  const [lastFoundItem, setLastFoundItem] = useState(null);

  const menuItems = [
    { name: "Chicken Biryani", id: "chicken-biryani" },
    { name: "Paneer Tikka", id: "paneer-tikka" },
    { name: "Chicken Mughlai", id: "chicken-mughlai" },
    { name: "Veg Noodles", id: "veg-noodles" },
    { name: "Kimchi Fried Rice", id: "kimchi-fried-rice" },
    { name: "Chicken Roll", id: "chicken-roll" },
    { name: "Pizza", id: "pizza" },
  ];

  const recipes = {
    "Chicken Biryani": `🍲 Here's a simple way to make **Chicken Biryani**:
1️⃣ Marinate chicken with yogurt, ginger-garlic paste, and spices.  
2️⃣ Fry onions till golden brown.  
3️⃣ Cook the chicken until tender.  
4️⃣ Parboil rice, then layer it with chicken and fried onions.  
5️⃣ Steam on low heat (dum) for 20 minutes.  
✨ Garnish with coriander & serve hot!`,

    "Paneer Tikka": `🧀 Recipe for **Paneer Tikka**:  
1️⃣ Cut paneer into cubes.  
2️⃣ Marinate with yogurt, spices, and lemon juice (30 mins).  
3️⃣ Skewer and grill/bake until golden with charred edges.  
4️⃣ Serve with mint chutney.`,

    "Chicken Mughlai": `🍛 Recipe for **Chicken Mughlai**:  
1️⃣ Marinate chicken with yogurt & spices.  
2️⃣ Fry onions, garlic & ginger in ghee.  
3️⃣ Add chicken and cook until soft.  
4️⃣ Add cream & garnish with coriander for richness.`,

    "Veg Noodles": `🥢 Recipe for **Veg Noodles**:  
1️⃣ Boil noodles & drain.  
2️⃣ Stir fry chopped veggies with garlic & soy sauce.  
3️⃣ Toss noodles with veggies & serve hot.`,

    "Kimchi Fried Rice": `🥘 Recipe for **Kimchi Fried Rice**:  
1️⃣ Stir fry kimchi & veggies in sesame oil.  
2️⃣ Add rice & soy sauce, mix well.  
3️⃣ Top with a fried egg for extra flavor.`,

    "Chicken Roll": `🌯 Recipe for **Chicken Roll**:  
1️⃣ Cook chicken with spices.  
2️⃣ Wrap it inside a paratha with onions & chutney.  
3️⃣ Roll tight & enjoy!`,

    Pizza: `🍕 Recipe for **Pizza**:  
1️⃣ Prepare pizza base.  
2️⃣ Spread tomato sauce, cheese & toppings.  
3️⃣ Bake at 200°C for 15-20 mins till golden.`,
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([
        {
          type: "bot",
          content:
            "👋 Hi! I'm your Foodie AI Assistant. How can I help you today?",
        },
      ]);
    }
  };

  const handleSendMessage = async () => {
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setInputValue("");
    setIsLoading(true);
    const lowerMsg = userMessage.toLowerCase();

    let botReply = null;

    // A single, prioritized if/else if chain to handle all logic

    // 1. New Conversational Flow Logic (Highest Priority)
    if (chatState === "idle" && lowerMsg.includes("help me prepare food")) {
      botReply =
        "What type of food do you want to prepare? (breakfast/lunch/snacks/dinner)";
      setChatState("asking_meal_type");
    } else if (chatState === "asking_meal_type") {
      setFoodPreferences((prev) => ({ ...prev, mealType: lowerMsg }));
      botReply = "What kind of food? (veg, non-veg, tofu, gluten free)";
      setChatState("asking_food_type");
    } else if (chatState === "asking_food_type") {
      setFoodPreferences((prev) => ({ ...prev, foodType: lowerMsg }));
      botReply = "What taste do you prefer? (spicy/tangy/sour)";
      setChatState("asking_taste");
    } else if (chatState === "asking_taste") {
      setFoodPreferences((prev) => ({ ...prev, taste: lowerMsg }));
      const prompt = `Give me 5 practical tips and tricks for preparing a ${foodPreferences.taste} ${foodPreferences.foodType} meal for ${foodPreferences.mealType}.`;

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );

        const data = await response.json();
        if (
          data.candidates &&
          data.candidates[0].content &&
          data.candidates[0].content.parts[0]
        ) {
          botReply = data.candidates[0].content.parts[0].text;
        } else {
          botReply = "⚠️ Sorry, the AI couldn't generate tips for that.";
        }
      } catch (err) {
        console.error(err);
        botReply = "⚠️ Sorry, the AI is not responding right now.";
      }
      setChatState("idle"); // Reset the state
      setFoodPreferences({}); // Clear preferences
    }
    // 2. Multi-turn Logic based on last found item
    else if (lastFoundItem) {
      if (lowerMsg.includes("order") || lowerMsg.includes("add to cart")) {
        addToCart(lastFoundItem.id);
        botReply = `✅ Got it! I've added **${lastFoundItem.name}** to your cart.`;
      } else if (
        lowerMsg.includes("see the reciepe") ||
        lowerMsg.includes("recipe") ||
        lowerMsg.includes("how to make")
      ) {
        botReply =
          recipes[lastFoundItem.name] ||
          "🤔 Hmm, I don’t have that recipe yet. Try another dish!";
      } else {
        botReply =
          "I'm not sure what you mean. Would you like to order it or see the recipe?";
      }
      setLastFoundItem(null); // Clear context
    }
    // 3. Existing Rule-Based Logic (Second Priority)
    else {
      const foundItem = menuItems.find((item) =>
        lowerMsg.includes(item.name.toLowerCase())
      );
      if (foundItem) {
        if (lowerMsg.includes("order") || lowerMsg.includes("add to cart")) {
          addToCart(foundItem.id);
          botReply = `✅ Got it! I've added **${foundItem.name}** to your cart.`;
        } else if (
          lowerMsg.includes("recipe") ||
          lowerMsg.includes("how to make")
        ) {
          botReply =
            recipes[foundItem.name] ||
            "🤔 Hmm, I don’t have that recipe yet. Try another dish!";
        } else if (
          lowerMsg.includes("find") ||
          lowerMsg.includes("look for") ||
          lowerMsg.includes("do you have") ||
          lowerMsg.includes("prepare")
        ) {
          botReply = `Yes, we have **${foundItem.name}** on our menu! What would you like to do? Order it or see the recipe?`;
          setLastFoundItem(foundItem);
        } else {
          botReply =
            "What would you like to do with that item? Order it or see the recipe?";
          setLastFoundItem(foundItem);
        }
      }
      // 4. General greetings/thanks
      else if (lowerMsg.includes("thank you") || lowerMsg.includes("thanks")) {
        botReply = "You're welcome! 😊 Always happy to help.";
      } else if (lowerMsg.includes("hi") || lowerMsg.includes("hello")) {
        botReply = "Hello 👋! What would you like today?";
      }
    }

    // 5. AI API Fallback (Lowest Priority)
    if (!botReply) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: userMessage,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        if (
          data.candidates &&
          data.candidates[0].content &&
          data.candidates[0].content.parts &&
          data.candidates[0].content.parts[0]
        ) {
          botReply = data.candidates[0].content.parts[0].text;
        } else {
          botReply = "⚠️ Sorry, the AI is not responding right now.";
        }
      } catch (err) {
        console.error(err);
        botReply = "⚠️ Sorry, the AI is not responding right now.";
      }
    }

    setMessages((prev) => [...prev, { type: "bot", content: botReply }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <>
      <div className="chatbot-tooltip-wrapper">
        <button
          className="chatbot-toggle"
          onClick={toggleChat}
          title="Chat with us"
          aria-label="Chat with us"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className={`chatbot-container ${
            Object.values(cartItems).reduce((sum, item) => sum + item, 0) > 0
              ? "with-cart"
              : ""
          }`}
        >
          <div className="chatbot-header">
            <div className="chatbot-title">
              <ChefHat size={20} />
              <span>Foodie AI Assistant</span>
            </div>
            <button className="chatbot-close" onClick={toggleChat}>
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-content">
                  {msg.content.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && <p className="bot-loading">Typing...</p>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for a recipe, order food, or just say hi..."
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
