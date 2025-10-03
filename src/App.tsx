import { useState } from "react";
import { motion } from "framer-motion";
import {
  TbMoodHappyFilled,
  TbMoodEmptyFilled,
  TbMoodConfuzedFilled,
} from "react-icons/tb";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<"positif" | "negatif" | "netral" | null>(
    null
  );
  const [lastResult, setLastResult] = useState<
    "positif" | "negatif" | "netral" | null
  >(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      const newResult = data.sentiment;

      setResult(newResult);
      setLastResult(newResult);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Last Result for color theme
  const theme = lastResult || "positif";

  const getUIColors = () => {
    if (theme === "positif") {
      return {
        text: "text-green-600",
        buttonBg: "bg-green-600 hover:bg-green-700",
        border: "border-green-300 focus:ring-green-500",
        icon: "text-green-600",
        gradient: "from-green-200 via-white to-green-200",
      };
    }
    if (theme === "netral") {
      return {
        text: "text-yellow-600",
        buttonBg: "bg-yellow-500 hover:bg-yellow-600",
        border: "border-yellow-300 focus:ring-yellow-500",
        icon: "text-yellow-500",
        gradient: "from-yellow-200 via-white to-yellow-200",
      };
    }
    if (theme === "negatif") {
      return {
        text: "text-red-600",
        buttonBg: "bg-red-600 hover:bg-red-700",
        border: "border-red-300 focus:ring-red-500",
        icon: "text-red-600",
        gradient: "from-red-200 via-white to-red-200",
      };
    }
    return {
      text: "text-green-600",
      buttonBg: "bg-green-600 hover:bg-green-700",
      border: "border-green-300 focus:ring-green-500",
      icon: "text-green-600",
      gradient: "from-green-100 via-white to-green-100",
    };
  };

  const colors = getUIColors();

  return (
    <div className={`min-h-screen px-4 bg-gradient-to-r ${colors.gradient}`}>
      <div className="space-y-8 mx-auto py-16 max-w-4xl text-center animate-fade-in">
        {/* Icon Row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`flex justify-center gap-6 mb-2 text-4xl ${colors.icon}`}
        >
          <TbMoodHappyFilled />
          <TbMoodEmptyFilled />
          <TbMoodConfuzedFilled />
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="font-bold text-gray-900 text-3xl md:text-5xl lg:text-6xl leading-tight">
            Analisis Semua
            <span className={`${colors.text}`}> Teks Sentimen </span>
            Secara Instan
          </h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl md:text-2xl leading-relaxed">
            Tempelkan teks sentimen apapun dan dapatkan analisis cepat
            menggunakan AI.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto w-full max-w-2xl"
        >
          <textarea
            className={`p-4 border-2 rounded-2xl focus:outline-none focus:ring-2 w-full text-gray-700 ${colors.border}`}
            rows={5}
            placeholder="Tulis teks di sini..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={analyzeSentiment}
            disabled={loading}
            className={`${colors.buttonBg} disabled:opacity-50 mt-4 px-6 py-3 rounded-xl w-full font-medium text-white transition cursor-pointer`}
          >
            {loading ? "Menganalisis..." : "Analisis"}
          </button>
        </motion.div>

        {/* Analysis Result */}
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mt-6 w-full max-w-2xl text-center"
          >
            {result === "positif" && (
              <h2 className="font-bold text-green-600 text-2xl">
                Sentimen Positif
              </h2>
            )}
            {result === "netral" && (
              <h2 className="font-bold text-yellow-600 text-2xl">
                Sentimen Netral
              </h2>
            )}
            {result === "negatif" && (
              <h2 className="font-bold text-red-600 text-2xl">
                Sentimen Negatif
              </h2>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
