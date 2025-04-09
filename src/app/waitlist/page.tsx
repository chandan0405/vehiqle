"use client";
import React, { useState } from "react";

function MainComponent() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      setSubmitted(true);
      setEmail("");
      setName("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  const faqs = [
    {
      question: "What is Vehiql?",
      answer:
        "Vehiql is a revolutionary car marketplace platform that connects buyers and sellers, making car transactions simpler and more transparent.",
    },
    {
      question: "When will Vehiql launch?",
      answer:
        "We're currently in development and will launch soon. Join our waitlist to be the first to know!",
    },
    {
      question: "How does the waitlist work?",
      answer:
        "Join our waitlist by providing your name and email. You'll receive early access and exclusive updates about our launch.",
    },
    {
      question: "Is it free to join the waitlist?",
      answer:
        "Yes, joining the waitlist is completely free and comes with no obligations.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        marginTop: "5rem"
      }}
    >

      {/* Hero Section */}
      <div
        style={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6rem 2rem 2rem",
          background: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "1.5rem",
              lineHeight: "1.2",
            }}
          >
            The Future of Car Marketplace Is Here
          </h1>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              marginBottom: "2rem",
              opacity: "0.9",
            }}
          >
            Experience a revolutionary way to buy and sell cars. No hassles, no
            hidden fees, just pure transparency.
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              backgroundColor: "white",
              color: "#007bff",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            Join Waitlist
          </button>
        </div>
      </div>

      {/* Waitlist Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "1rem",
              maxWidth: "500px",
              width: "90%",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowForm(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#155724",
                  padding: "1rem",
                }}
              >
                <h3 style={{ marginBottom: "1rem" }}>Thank you for joining!</h3>
                <p>We <span>&rsquo;</span> ll keep you updated on our progress.</p>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    marginBottom: "1.5rem",
                    textAlign: "center",
                    color: "#333",
                  }}
                >
                  Join Our Waitlist
                </h2>
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    style={{
                      padding: "0.8rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #ddd",
                      fontSize: "1rem",
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    required
                    style={{
                      padding: "0.8rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #ddd",
                      fontSize: "1rem",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "0.8rem",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    Join Waitlist
                  </button>
                </form>
              </>
            )}
            {error && (
              <div
                style={{
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div
        style={{
          padding: "4rem 2rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            color: "#333",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  color: "#333",
                  marginBottom: "0.5rem",
                }}
              >
                {faq.question}
              </h3>
              <p
                style={{
                  color: "#666",
                  lineHeight: "1.5",
                }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;