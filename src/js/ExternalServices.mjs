

const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.text().then(text => {
      console.error("Server response text:", text); // Log the server response
      throw new Error(`Bad Response: ${text}`);
    });
  }
}

export default class ExternalServices {
  async checkout(order) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    };

    console.log("Sending order to server:", order);

    const response = await fetch(`${baseURL}checkout`, options);
    return convertToJson(response);
  }
}