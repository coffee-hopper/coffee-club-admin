import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AdminPanel() {
  return (
    <div className="border-4 border-pink-400 flex w-[100%] bg-gray-100">
      <Sidebar />

      <div className="flex flex-col">
        <Header />
        
        <main className="border-2 border-pink-300 text-pink-500 p-6">body</main>
      </div>
    </div>
  );
}
