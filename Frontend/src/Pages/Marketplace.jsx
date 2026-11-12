
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/product";
const categories = ["All", "Handmade", "Beauty", "Home Decor"];

const emptyProduct = {
  name: "",
  category: "Handmade",
  price: "",
  seller: "",
  description: "",
  emoji: "🛍️",
};

export default function Marketplace() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newProduct, setNewProduct] = useState(emptyProduct);

  // Load products from MongoDB through the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load products");
        }

        setProducts(data);
      } catch (error) {
        console.error("Fetch products error:", error);
        setMessage(
          "Products load nahi ho paaye. Please check whether the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const searchText = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.seller.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  // Save product in MongoDB
  const handleAddProduct = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Failed to add product"
        );
      }

      // Add the product returned by the backend
      setProducts((previousProducts) => [
        data.product,
        ...previousProducts,
      ]);

      setNewProduct({ ...emptyProduct });
      setShowForm(false);
      setMessage("Your product has been added successfully!");
    } catch (error) {
      console.error("Add product error:", error);
      setMessage(error.message || "Product add nahi ho paaya.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] text-[#44382f]">
      <nav className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-[#eadfd0] bg-[#fffaf3]/95 px-5 py-4 backdrop-blur md:px-10">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-[#57745b]"
        >
          Smart Sakhi
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-full px-4 py-2 text-sm font-medium hover:bg-[#edf1e8]"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/courses")}
            className="rounded-full px-4 py-2 text-sm font-medium hover:bg-[#edf1e8]"
          >
            Courses
          </button>

          <button
            onClick={() => navigate("/marketplace")}
            className="rounded-full bg-[#57745b] px-4 py-2 text-sm font-semibold text-white"
          >
            Marketplace
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-10 md:px-10">
        <section className="rounded-3xl bg-[#e9eee2] px-6 py-10 md:px-12 md:py-14">
          <p className="mb-3 font-semibold uppercase tracking-[0.2em] text-[#57745b]">
            Learn • Create • Earn
          </p>

          <h1 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
            Your creativity deserves a marketplace.
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#675d52]">
            Discover handmade products created by women entrepreneurs and
            showcase your own creations to the world.
          </p>

          <button
            onClick={() => {
              setShowForm(true);
              setMessage("");
            }}
            className="mt-7 rounded-full bg-[#57745b] px-6 py-3 font-semibold text-white transition hover:bg-[#405b45]"
          >
            + Add Your Product
          </button>
        </section>

        {message && (
          <div className="mt-6 rounded-xl border border-[#cbdcc5] bg-[#edf5e9] p-4 text-[#405b45]">
            {message}
          </div>
        )}

        {showForm && (
          <section className="mt-8 rounded-3xl border border-[#eadfd0] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Add a New Product</h2>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-full px-3 py-2 text-xl hover:bg-gray-100"
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleAddProduct}
              className="grid gap-5 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Product Name
                </label>
                <input
                  required
                  maxLength={80}
                  value={newProduct.name}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      name: event.target.value,
                    })
                  }
                  placeholder="e.g. Handmade Candle"
                  className="w-full rounded-xl border border-[#e3d8c9] px-4 py-3 outline-none focus:border-[#57745b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Seller Name
                </label>
                <input
                  required
                  maxLength={60}
                  value={newProduct.seller}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      seller: event.target.value,
                    })
                  }
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#e3d8c9] px-4 py-3 outline-none focus:border-[#57745b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category
                </label>
                <select
                  value={newProduct.category}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      category: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#e3d8c9] bg-white px-4 py-3 outline-none focus:border-[#57745b]"
                >
                  <option value="Handmade">Handmade</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Home Decor">Home Decor</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Price (₹)
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  max="1000000"
                  step="1"
                  value={newProduct.price}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      price: event.target.value,
                    })
                  }
                  placeholder="Enter price"
                  className="w-full rounded-xl border border-[#e3d8c9] px-4 py-3 outline-none focus:border-[#57745b]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Product Description
                </label>
                <textarea
                  required
                  maxLength={300}
                  rows={3}
                  value={newProduct.description}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      description: event.target.value,
                    })
                  }
                  placeholder="Describe your product..."
                  className="w-full rounded-xl border border-[#e3d8c9] px-4 py-3 outline-none focus:border-[#57745b]"
                />
              </div>

              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#57745b] px-6 py-3 font-semibold text-white hover:bg-[#405b45] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Add Product"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-full border border-[#d8cdbf] px-6 py-3 font-semibold hover:bg-[#fffaf3]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="mt-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-semibold text-[#789071]">
                WOMEN-LED BUSINESSES
              </p>
              <h2 className="mt-2 text-3xl font-bold">Explore Products</h2>
              <p className="mt-2 text-[#75695d]">
                Find something special, made with care.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products or sellers..."
              className="w-full rounded-full border border-[#e3d8c9] bg-white px-5 py-3 outline-none focus:border-[#57745b] md:max-w-sm"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-[#57745b] text-white"
                    : "border border-[#e3d8c9] bg-white hover:bg-[#edf1e8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="mt-10 rounded-2xl border border-[#eadfd0] bg-white p-10 text-center">
              Loading products...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-[#d8cdbf] p-10 text-center">
              <p className="text-4xl">🔎</p>
              <h3 className="mt-3 text-xl font-bold">No products found</h3>
              <p className="mt-2 text-[#75695d]">
                Try another search term or category.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <article
                  key={product._id}
                  className="overflow-hidden rounded-3xl border border-[#eadfd0] bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-44 items-center justify-center bg-[#f1eee4] text-7xl">
                    {product.emoji || "🛍️"}
                  </div>

                  <div className="p-6">
                    <span className="rounded-full bg-[#edf1e8] px-3 py-1 text-xs font-semibold text-[#57745b]">
                      {product.category}
                    </span>

                    <h3 className="mt-4 text-xl font-bold">
                      {product.name}
                    </h3>

                    <p className="mt-2 min-h-12 text-sm leading-6 text-[#75695d]">
                      {product.description}
                    </p>

                    <p className="mt-4 text-sm text-[#75695d]">
                      Seller:{" "}
                      <span className="font-semibold">{product.seller}</span>
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#eee5da] pt-4">
                      <span className="text-2xl font-bold text-[#57745b]">
                        ₹{product.price}
                      </span>

                      <button
                        onClick={() =>
                          window.alert(
                            `You selected "${product.name}". Online ordering will be added in a future step.`
                          )
                        }
                        className="rounded-full bg-[#57745b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#405b45]"
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12 rounded-3xl bg-[#f5e7d7] p-8 text-center md:p-10">
          <h2 className="text-2xl font-bold">Have a skill to share?</h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-[#675d52]">
            Turn your creativity into an opportunity. Add your product and
            introduce your work to the Smart Sakhi community.
          </p>
          <button
            onClick={() => {
              setShowForm(true);
              setMessage("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-5 rounded-full bg-[#57745b] px-6 py-3 font-semibold text-white hover:bg-[#405b45]"
          >
            Start Selling
          </button>
        </section>
      </main>

      <footer className="mt-12 border-t border-[#eadfd0] px-5 py-6 text-center text-sm text-[#75695d]">
        © {new Date().getFullYear()} Smart Sakhi. Empowering women through
        learning and entrepreneurship.
      </footer>
    </div>
  );
}
