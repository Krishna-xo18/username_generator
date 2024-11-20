import React, { useState } from "react";
import styles from "./UserProfileForm.module.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const UserProfileForm = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyA6Y31gvB_0wi8AWWw-FWXHlKA57h6mqOk"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    region: "",
    interests: "",
    hobbies: "",
    occupation: "",
    favoriteThings: "",
  });

  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateUsernames = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const prompt = `Generate 5 unique and creative social media usernames based on the following information:
      Name: ${formData.name}
      Age: ${formData.age}
      Region: ${formData.region}
      Occupation: ${formData.occupation}
      Interests: ${formData.interests}
      Hobbies: ${formData.hobbies}
      Favorite Things: ${formData.favoriteThings}

      Generate 5 usernames with descriptionsdont use * `;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      setGeneratedText(response);
    } catch (err) {
      console.error("Generation error:", err);
      setError(`Failed to generate suggestions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={generateUsernames} className={styles.form}>
        <h2 className={styles.formTitle}>Create Your Profile</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="age" className={styles.label}>
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter your age"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="region" className={styles.label}>
            Region
          </label>
          <input
            id="region"
            name="region"
            type="text"
            value={formData.region}
            onChange={handleInputChange}
            placeholder="Where do you live?"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="occupation" className={styles.label}>
            Occupation
          </label>
          <input
            id="occupation"
            name="occupation"
            type="text"
            value={formData.occupation}
            onChange={handleInputChange}
            placeholder="What do you do?"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="interests" className={styles.label}>
            Interests
          </label>
          <textarea
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleInputChange}
            placeholder="What are your interests? (separated by commas)"
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="hobbies" className={styles.label}>
            Hobbies
          </label>
          <textarea
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleInputChange}
            placeholder="What are your hobbies? (separated by commas)"
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="favoriteThings" className={styles.label}>
            Favorite Things
          </label>
          <textarea
            id="favoriteThings"
            name="favoriteThings"
            value={formData.favoriteThings}
            onChange={handleInputChange}
            placeholder="List your favorite things (movies, books, food, etc.)"
            className={styles.textarea}
            required
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Generating..." : "Generate Username Suggestions"}
        </button>

        {error && <div className={styles.error}>{error}</div>}

        {generatedText && (
          <div className={styles.suggestionsContainer}>
            <h3 className={styles.suggestionsTitle}>Generated Suggestions:</h3>
            <div className={styles.suggestionsList}>
              <p style={{ whiteSpace: "pre-line", color: "white" }}>
                {generatedText}
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfileForm;
