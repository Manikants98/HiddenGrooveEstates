import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/data/auth.json?_t=${Date.now()}`, {
        cache: "no-store",
      });
      const authData = await response.json();

      if (email === authData.email && password === authData.password) {
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/admin");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Failed to verify credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(to right, #141C2C, #1E473C)" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl"
        style={{
          background: "linear-gradient(to right, #1B2638, #161F32)",
          border: "1px solid #4A5565",
        }}
      >
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            Admin Login
          </h1>
          <p className="text-gray-400 text-sm">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className="p-3 rounded-md text-sm text-white"
              style={{ backgroundColor: "#EC6F70" }}
            >
              {error}
            </div>
          )}

          <div>
            <label className="block text-white mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:border-[#4A5565] text-sm"
              style={{
                backgroundColor: "#1E2939",
                border: "1px solid #4A5565",
                height: "45px",
              }}
              placeholder="admin@mkx.com"
            />
          </div>

          <div>
            <label className="block text-white mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:border-[#4A5565] text-sm"
              style={{
                backgroundColor: "#1E2939",
                border: "1px solid #4A5565",
                height: "45px",
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-sm uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: loading
                ? "linear-gradient(to right, #4A5565, #4A5565)"
                : "linear-gradient(to right, #D3AE3A, #C79A58)",
              color: "#fff",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #C79A58, #D3AE3A)";
                e.currentTarget.style.boxShadow =
                  "0px 5px 15px 2px rgba(155, 121, 11, 0.52)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #D3AE3A, #C79A58)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
