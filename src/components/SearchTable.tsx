import { useState } from "react";


interface SearchTableProps {
  articles: Article[];
  addToCart: (id: number) => void;
}

 interface Article {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function SearchTable({ articles, addToCart }: SearchTableProps) {
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-table">
      <input
        className="search-input"
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">Stock</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((article) => (
            <tr key={article.id}>
              <td>{article.name}</td>
              <td className="text-right">${article.price.toFixed(2)}</td>
              <td className="text-right">{article.stock}</td>
              <td className="text-center">
                <button
                  className="button-add"
                  disabled={article.stock === 0}
                  onClick={() => addToCart(article.id)}
                  style={{
                    cursor: article.stock === 0 ? "not-allowed" : "pointer",
                    opacity: article.stock === 0 ? 0.5 : 1,
                  }}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">
                No articles found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
