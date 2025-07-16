import { useEffect, useState } from "react";
import {
  getAllLoyaltyEntries,
  addLoyaltyEntry,
  getUserStars,
} from "@/api/loyalty";

export default function LoyaltyTest() {
  const [entries, setEntries] = useState([]);
  const [userIdForStars, setUserIdForStars] = useState("");
  const [starSummary, setStarSummary] = useState(null);
  const [form, setForm] = useState({
    userId: 1,
    productId: 1,
    points: 1,
    note: "",
  });

  const fetchLoyaltyEntries = async () => {
    try {
      const data = await getAllLoyaltyEntries();
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch loyalty entries", err);
    }
  };

  useEffect(() => {
    fetchLoyaltyEntries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["points", "userId", "productId"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleAddEntry = async () => {
    try {
      await addLoyaltyEntry({
        user: { id: form.userId },
        product: { id: form.productId },
        points: form.points,
        note: form.note,
      });
      fetchLoyaltyEntries();
    } catch (err) {
      alert("Failed to add loyalty entry");
    }
  };

  const handleGetStars = async () => {
    try {
      const data = await getUserStars(Number(userIdForStars));
      setStarSummary(data);
    } catch (err) {
      alert("Failed to fetch user stars");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">🌟 Loyalty Test</h2>

      <div className="space-y-2">
        <input
          name="userId"
          type="number"
          placeholder="User ID"
          value={form.userId}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="productId"
          type="number"
          placeholder="Product ID"
          value={form.productId}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="points"
          type="number"
          placeholder="Points"
          value={form.points}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          onClick={handleAddEntry}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Loyalty Entry
        </button>
      </div>

      <div className="space-y-2">
        <input
          type="number"
          placeholder="User ID to check stars"
          value={userIdForStars}
          onChange={(e) => setUserIdForStars(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          onClick={handleGetStars}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Get User Stars
        </button>
        {starSummary && (
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(starSummary, null, 2)}
          </pre>
        )}
      </div>

      <section>
        <h3 className="font-semibold">🌟 All Loyalty Entries</h3>
        <pre className="bg-gray-100 p-4 text-sm rounded max-h-80 overflow-auto">
          {JSON.stringify(entries, null, 2)}
        </pre>
      </section>
    </div>
  );
}
