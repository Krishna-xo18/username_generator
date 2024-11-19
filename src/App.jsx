import React from "react";
import UserProfileForm from "./components/UserProfileForm";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Social Media Username Generator</h1>
      <UserProfileForm />
    </div>
  );
};

export default App;
