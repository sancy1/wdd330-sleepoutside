// src/js/Alert.js
export default class Alert {
    constructor() {
      this.alerts = [];
    }
  
    async loadAlerts() {
      try {
        const response = await fetch("/public/json/alerts.json");
        if (!response.ok) {
          throw new Error("Failed to load alerts");
        }
        this.alerts = await response.json();
        this.renderAlerts();
      } catch (error) {
        console.error("Error loading alerts:", error);
      }
    }
  
    renderAlerts() {
      if (this.alerts.length === 0) return;
  
      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");
  
      this.alerts.forEach((alert) => {
        const alertParagraph = document.createElement("p");
        alertParagraph.textContent = alert.message;
        alertParagraph.style.backgroundColor = alert.background;
        alertParagraph.style.color = alert.color;
  
        // Add a close button
        const closeButton = document.createElement("span");
        closeButton.textContent = "×";
        closeButton.classList.add("close-button");
        closeButton.addEventListener("click", () => {
          alertParagraph.remove(); // Remove the alert when the close button is clicked
        });
  
        alertParagraph.appendChild(closeButton);
        alertSection.appendChild(alertParagraph);
  
        // Auto-dismiss the alert after 5 seconds (optional)
        if (alert.autoDismiss) {
          setTimeout(() => {
            alertParagraph.remove();
          }, 5000); // 5000 milliseconds = 5 seconds
        }
      });
  
      const mainElement = document.querySelector("main");
      if (mainElement) {
        mainElement.prepend(alertSection);
      }
    }
  }