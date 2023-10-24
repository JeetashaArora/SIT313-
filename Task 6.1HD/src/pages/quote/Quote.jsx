import "./Quote.css";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

/**
 * Quote Component
 *
 * This component displays a random quote and provides a button to share it on Twitter.
 */
function Quote() {
    const [quote, setQuote] = useState({
        text: "",
        author: "Johann Wolfgang von Goethe",
    });

    useEffect(() => {
        /**
      * Load a random quote from an external API and update the state.
      */
        async function loadQuotes() {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();
            setQuote(data[Math.floor(Math.random() * data.length)]);
        }
        /* eslint-disable no-undef */
        loadQuotes();
    }, []);
    /**
     * Open a Twitter window to share the current quote.
     */
    const twitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author.split(',')[0]}`)
    }
    //returning the template
    return (
        <div className="container">
            <div className="bg">
                <br></br>
                <br></br>
                <div className="main">
                    <div className="line">
                        {quote.text}
                    </div>
                    <div className="footer">
                        {/* Add any footer content if needed */}
                    </div>
                    <div className="bottom">
                        <div className="author">
                            - {quote.author.split(',')[0]}
                        </div>
                        <div className="icons">

                            <FontAwesomeIcon
                                className="twitter_icon"
                                size="xl"
                                icon={faTwitter}
                                color="white"
                                onClick={() => {
                                    twitter()
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Quote;
