import React, { useState, useEffect } from "react";
import { auth, provider, db } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { ref, push, onValue } from "firebase/database";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const chatRef = ref(db, "messages");
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const chatArray = data ? Object.values(data) : [];
      setMessages(chatArray);
    });
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const chatRef = ref(db, "messages");
    push(chatRef, {
      text: newMessage,
      name: user.displayName,
      uid: user.uid,
      createdAt: Date.now()
    });
    setNewMessage("");
  };

  return (
    <div className="App">
      <header>
        <h1>💬 Chat App</h1>
        {user ? (
          <button onClick={() => signOut(auth)}>Logout</button>
        ) : (
          <button onClick={() => signInWithPopup(auth, provider)}>Login with Google</button>
        )}
      </header>

      {user && (
        <div className="chat-box">
          <div className="messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.uid === user.uid ? "my-msg" : "other-msg"}
              >
                <strong>{msg.name}</strong>: {msg.text}
              </div>
            ))}
          </div>

          <div className="input-box">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <> <footer className="footer">
            <p>
                © {new Date().getFullYear()} Chat App.Made by sunilnayak.
            </p>
        </footer></>
    </div>
  );
}

export default App;
