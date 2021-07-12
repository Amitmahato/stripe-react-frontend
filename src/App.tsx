import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout, { Token } from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState<{
    name: string;
    price: number;
    provider: string;
  }>({
    name: "Complete Course On React",
    price: 200,
    provider: "facebook",
  });

  const makePayment = (token: Token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(process.env.REACT_APP_SERVER_HOST + "/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log("Response : ", res);
        const { status } = res;
        console.log("Status : ", status);
      })
      .catch((err) => console.log("Error : ", err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="http://localhost:3000#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY || ""}
          token={makePayment}
          name={`Buy ${product.name}`}
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className="btn-large">
            Buy {product.name} at just {product.price}$
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
