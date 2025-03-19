import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import Editor from "react-simple-code-editor";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function CodeReviewApp() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [review]);

  const handleReview = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ai/get-review",
        { code },
        { headers: { "Content-Type": "application/json" } }
      );
      setReview(response.data.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700 p-4 w-full">
      <div className="w-full min-h-screen bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4">
        {/* Code Input Section */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Write Your Code</h2>
          <div className="w-full h-60 border border-gray-600 rounded-lg overflow-auto bg-gray-900">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              className="w-full h-full font-mono bg-gray-900 text-white focus:outline-none"
            />
          </div>
          <button
            className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            onClick={handleReview}
            disabled={loading}
          >
            {loading ? "Reviewing..." : "Review Code"}
          </button>
        </div>

        {/* Review Section */}
        <div className="flex-1 border-l border-gray-600 pl-4">
          <h2 className="text-lg font-semibold mb-2">Code Review</h2>
          <div className="w-full min-h-screen p-3 bg-gray-900 border border-gray-600 rounded-lg overflow-auto">
            {loading ? (
              <p>Loading review...</p>
            ) : (
                <div className="prose prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {review || "Your reviewed code will appear here..."}
                </ReactMarkdown>
              </div>
              
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
