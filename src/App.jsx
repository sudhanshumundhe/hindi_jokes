import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import "./App.css";

const API_URL =
  "https://api.freeapi.app/api/v1/public/randomjokes";

// 🔥 Default fallback jokes (if API fails)
const fallbackJokes = [
  {
    "setup": "Teacher: तुम होमवर्क क्यों नहीं करते?",
    "punchline": "Student: सर, मेरा दिमाग अभी ‘under construction’ है 🚧😂"
  },
  {
    "setup": "Mom: फोन क्यों चलाते रहते हो?",
    "punchline": "Me: क्योंकि फोन ही मुझे समझता है 😭📱"
  },
  {
    "setup": "Boss: तुम late क्यों आए?",
    "punchline": "Employee: सर, सपने में भी overtime कर रहा था 😅"
  },
  {
    "setup": "Friend: भाई gym जा रहा है?",
    "punchline": "Me: हाँ, सोने के लिए… AC अच्छा होता है वहाँ 😴💪"
  },
  {
    "setup": "GF: मैं कैसी लग रही हूँ?",
    "punchline": "BF: जैसे phone की battery 100% हो 🔋😍"
  },
  {
    "setup": "Teacher: exam में cheating क्यों की?",
    "punchline": "Student: teamwork सिखाया था आपने 🤝😂"
  },
  {
    "setup": "Dad: पढ़ाई कर ली?",
    "punchline": "Me: हाँ, सपने में topper बन गया 😎"
  },
  {
    "setup": "Friend: तू इतना lazy क्यों है?",
    "punchline": "Me: energy saving mode में हूँ 🔋😴"
  },
  {
    "setup": "GF: मुझे ignore क्यों कर रहे हो?",
    "punchline": "BF: नहीं जानू, network issue है 📶😂"
  },
  {
    "setup": "Teacher: किताब क्यों नहीं लाई?",
    "punchline": "Student: सर, ज्ञान दिल में होना चाहिए 📚❤️"
  },
  {
    "setup": "Mom: उठ जा सुबह हो गई!",
    "punchline": "Me: मेरे सपनों में अभी night shift चल रही है 🌙😂"
  },
  {
    "setup": "Friend: पैसे कब लौटाएगा?",
    "punchline": "Me: जब ‘कल’ आएगा 😅"
  },
  {
    "setup": "Boss: काम कब पूरा होगा?",
    "punchline": "Employee: सर, काम और मैं… दोनों सोच रहे हैं 🤔"
  },
  {
    "setup": "Teacher: answer क्यों नहीं लिखा?",
    "punchline": "Student: सर, suspense बना रहा हूँ 😎"
  },
  {
    "setup": "GF: तुम मुझे समझते क्यों नहीं?",
    "punchline": "BF: manual नहीं मिला तुम्हारा 😭😂"
  },
  {
    "setup": "Mom: इतना खाता क्यों है?",
    "punchline": "Me: stress खा रहा हूँ 🍕😂"
  },
  {
    "setup": "Friend: पढ़ाई कैसी चल रही है?",
    "punchline": "Me: जैसे slow internet 🐢📶"
  },
  {
    "setup": "Teacher: तुम class में सो क्यों रहे हो?",
    "punchline": "Student: सपनों में revision कर रहा हूँ 😴"
  },
  {
    "setup": "GF: तुम मुझे miss करते हो?",
    "punchline": "BF: जैसे low battery charger को 🔌😂"
  },
  {
    "setup": "Dad: future का क्या plan है?",
    "punchline": "Me: buffering… ⏳😂"
  },
  {
    "setup": "Friend: भाई serious क्यों नहीं होता?",
    "punchline": "Me: free version हूँ 😎"
  },
  {
    "setup": "Teacher: इतनी हँसी क्यों आ रही है?",
    "punchline": "Student: life मजाक लग रही है 😂"
  },
  {
    "setup": "Mom: room साफ क्यों नहीं किया?",
    "punchline": "Me: memories disturb हो जाती 😭"
  },
  {
    "setup": "GF: तुम बदल गए हो!",
    "punchline": "BF: update आ गया हूँ 😎"
  },
  {
    "setup": "Friend: तुझे नींद क्यों आती रहती है?",
    "punchline": "Me: dreams unlimited plan है 😴"
  },
  {
    "setup": "Teacher: तुम fail क्यों हुए?",
    "punchline": "Student: experience ले रहा हूँ 😂"
  },
  {
    "setup": "Boss: काम में interest क्यों नहीं?",
    "punchline": "Employee: interest तो loan में होता है 💸😂"
  },
  {
    "setup": "Mom: इतना फोन क्यों?",
    "punchline": "Me: research कर रहा हूँ 😎"
  },
  {
    "setup": "GF: मुझे gift क्या दोगे?",
    "punchline": "BF: अपना दिल… EMI पर 😂❤️"
  },
  {
    "setup": "Friend: पढ़ाई क्यों नहीं करता?",
    "punchline": "Me: talent waste नहीं करना चाहता 😎"
  },
  {
    "setup": "Teacher: class में ध्यान कहाँ है?",
    "punchline": "Student: future planning में 😅"
  },
  {
    "setup": "Dad: इतना खर्च क्यों करता है?",
    "punchline": "Me: economy boost कर रहा हूँ 💸😂"
  },
  {
    "setup": "Friend: तेरी life कैसी चल रही है?",
    "punchline": "Me: airplane mode में 😴✈️"
  },
  {
    "setup": "GF: तुम मुझे भूल जाओगे?",
    "punchline": "BF: password नहीं हो तुम 😂"
  },
  {
    "setup": "Teacher: तुम class में late क्यों आते हो?",
    "punchline": "Student: suspense entry के लिए 😎"
  },
  {
    "setup": "Mom: इतना सोता क्यों है?",
    "punchline": "Me: energy recharge 😴🔋"
  },
  {
    "setup": "Friend: तू इतना funny क्यों है?",
    "punchline": "Me: pain hidden है 😂"
  },
  {
    "setup": "Boss: जल्दी काम करो!",
    "punchline": "Employee: speed internet पर depend है 😂"
  },
  {
    "setup": "GF: तुम serious कब बनोगे?",
    "punchline": "BF: next update में 😎"
  },
  {
    "setup": "Teacher: homework कहाँ है?",
    "punchline": "Student: imagination में 😭"
  },
  {
    "setup": "Mom: खाना क्यों नहीं खाया?",
    "punchline": "Me: diet चल रही है… tomorrow से 😂"
  },
  {
    "setup": "Friend: gym join किया?",
    "punchline": "Me: thinking stage में हूँ 🤔"
  },
  {
    "setup": "GF: तुम मुझे प्यार करते हो?",
    "punchline": "BF: जैसे phone charging को 🔌😂"
  },
  {
    "setup": "Teacher: answer गलत क्यों है?",
    "punchline": "Student: perspective अलग है 😎"
  },
  {
    "setup": "Dad: नौकरी कब करेगा?",
    "punchline": "Me: dreams में already CEO हूँ 😂"
  },
  {
    "setup": "Friend: तू इतना chill क्यों है?",
    "punchline": "Me: tension लेने का subscription नहीं है 😎"
  },
  {
    "setup": "GF: मैं मोटी लग रही हूँ?",
    "punchline": "BF: network issue… आवाज नहीं आ रही 😂"
  },
  {
    "setup": "Teacher: तुम पढ़ते कब हो?",
    "punchline": "Student: जब नींद नहीं आती 😴"
  },
  {
    "setup": "Mom: बाहर क्यों जा रहे हो?",
    "punchline": "Me: fresh air लेने… WiFi weak है 😂"
  }
];

const categories = ["Funny", "Student", "Life", "Daily Joke"];

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCat, setActiveCat] = useState("Funny");

  const fetchJoke = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_URL);
      const data = await res.json();

      if (data?.data?.setup) {
        setJoke(data.data);
      } else {
        setJoke(fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)]);
      }

    } catch (err) {
      setError("API failed → showing offline jokes 😎");
      setJoke(fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="app">

      {/* HERO */}
      <div className="hero">
        <div className="logo"> JokeHub </div>

        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={activeCat === cat ? "cat active" : "cat"}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CENTER AREA */}
      <div className="center">
        {loading && <Loader />}

        {error && <div className="error">{error}</div>}
 
        {!loading && joke && (
          <div className="jokeBox">
            <p className="setup">{joke?.setup}</p>
            <p className="punchline">{joke?.punchline}</p>
          </div>
        )}

        <button className="btn" onClick={fetchJoke}>
          Next Joke
        </button>

      </div>

    </div>
  );
}

export default App;