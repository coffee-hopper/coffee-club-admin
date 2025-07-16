import { useState } from "react";
import { getUserByEmail } from "@/api/user";

export default function UserTest() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const data = await getUserByEmail(email);
      setUser(data);
      setError("");
    } catch (err) {
      setError("User not found or API failed.");
      console.log(err);
      setUser(null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">🔍 Test User Fetch</h2>
      <input
        className="border px-2 py-1 rounded"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded"
        onClick={handleFetch}
      >
        Fetch User
      </button>

      {user && (
        <pre className="bg-gray-100 p-4 rounded text-sm">
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
