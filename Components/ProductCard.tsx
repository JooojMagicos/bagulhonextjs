"use client";

import { Product } from "@/models/interfaces";

interface ProductCardProps {
  product: Product;
  addToCart?: (p: Product) => void;
  removeFromCart?: (id: number) => void;
  inCart?: boolean; // indica se o card está sendo mostrado dentro do carrinho
}

export default function ProductCard({
  product,
  addToCart,
  removeFromCart,
  inCart = false,
}: ProductCardProps) {
  const price = Number(product.price) || 0;
  const IMAGE_BASE_URL = "https://deisishop.pythonanywhere.com";
  const imageUrl = `${IMAGE_BASE_URL}${product.image}`;

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

      <img
        src={imageUrl}
        alt={product.title}
        className="w-full h-48 object-cover mb-4 rounded"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/images/default.png";
        }}
      />

      <p className="text-lg font-bold mb-2">R$ {price.toFixed(2)}</p>

      <p className="text-sm text-gray-500 mb-4">
        Categoria: {product.category}
      </p>

      {/* BOTÃO DINÂMICO */}
      {inCart ? (
        <button
          onClick={() => removeFromCart?.(product.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full"
        >
          Remover
        </button>
      ) : (
        <button
          onClick={() => addToCart?.(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
        >
          Comprar
        </button>
      )}

      {!inCart && (
        <a
          href={`/produtos/${product.id}`}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition block text-center mt-2"
        >
          Ver Detalhes
        </a>
      )}
    </div>
  );
}
