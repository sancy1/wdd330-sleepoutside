import { getLocalStorage } from "../js/utils.mjs";

      const orders = getLocalStorage("so-orders") || [];
      const latestOrder = orders[orders.length - 1];

      if (latestOrder) {
        const orderDetails = document.getElementById("orderDetails");
        orderDetails.innerHTML = `
          <h3>Order Details</h3>
          <p><strong>Order Date:</strong> ${new Date(latestOrder.orderDate).toLocaleString()}</p>
          <p><strong>Name:</strong> ${latestOrder.fname} ${latestOrder.lname}</p>
          <p><strong>Address:</strong> ${latestOrder.street}, ${latestOrder.city}, ${latestOrder.state} ${latestOrder.zip}</p>
          <h4>Items Ordered:</h4>
          <ul>
            ${latestOrder.items.map((item) => `
              <li>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</li>
            `).join("")}
          </ul>
          <p><strong>Subtotal:</strong> $${latestOrder.orderTotal}</p>
          <p><strong>Tax:</strong> $${latestOrder.tax}</p>
          <p><strong>Shipping:</strong> $${latestOrder.shipping}</p>
          <p><strong>Total:</strong> $${latestOrder.orderTotal}</p>
        `;
      } else {
        document.getElementById("orderDetails").innerHTML = `<p>No order details found.</p>`;
      }