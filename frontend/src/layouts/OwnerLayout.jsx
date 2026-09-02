import Navbar from "../components/Navbar";

function OwnerLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <main className="p-8">
        {children}
      </main>

    </div>
  );
}

export default OwnerLayout;