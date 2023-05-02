import React, { useState, useEffect } from "react";
import "./Quote.css";
import { BsTwitter } from "react-icons/bs";

async function getRandomQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    return [data.content, data.author];
  } catch (error) {
    return ["You have an internet problem", "Our Servers"];
  }
}

const Quote = () => {
  const [quote, setQuote] = useState(["You have an internet problem", "Our Servers"]);

  useEffect(() => {
    async function fetchQuote() {
      const data = await getRandomQuote();
      setQuote(data);
    }
    fetchQuote();

    async function handleNewQuote() {
        const quoteTextElement = document.getElementById("text");
        quoteTextElement.classList.add("fade-out");
        setTimeout(async () => {
          const data = await getRandomQuote();
          setQuote(data);
          quoteTextElement.classList.remove("fade-out");
        }, 500);
      }
      

    document.getElementById("new-quote").addEventListener("click", handleNewQuote);
    return () => {
      document.getElementById("new-quote").removeEventListener("click", handleNewQuote);
    };
  }, []);

  return (
    <div className="quoteContainer">
      <div className="quote" id="quote-box">
        <div className="quoteText" id="text">
          <h1>&ldquo; {quote[0]} &rdquo;</h1>
        </div>
        <div className="quoteAuthor" id="author">
          <h2>- {quote[1]}</h2>
        </div>
        <button className="quoteNew" id="new-quote">
          New Quote
        </button>
        <a href={'https://twitter.com/intent/tweet?text='+'" '+encodeURIComponent(quote[0])+' " - '+encodeURIComponent(quote[1])} target="_blank" className="quoteTweet" id="tweet-quote">
          <BsTwitter className="quoteLogo" />
          <h2>Tweet This</h2>
        </a>
      </div>
    </div>
  );
};

export default Quote;
