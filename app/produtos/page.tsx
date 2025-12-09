"use client";

import { useState } from "react";
import useSWR from "swr";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/models/interfaces";
import { Button } from "@heroui/react";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) throw new Error("Erro ao carregar produtos");

  return res.json();
};

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>(
    "https://deisishop.pythonanywhere.com/products/",
    fetcher
  );

  // -----------------------------
  // 🛒 CARRINHO LOCAL
  // -----------------------------
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  if (isLoading) return <div className="p-6 text-center">Carregando...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Erro ao carregar produtos.</div>;

  return (
    <div className="p-6">
      {/* TITULO */}
      <h1 className="text-3xl font-bold text-center mb-8">DEISI Shop – Produtos</h1>

      {/* CARRINHO */}
      <div className="flex justify-center mb-6 gap-4">
        <Button color="primary" variant="shadow">
          Produtos Disponíveis
        </Button>

        <Button color="secondary" variant="bordered">
          🛒 Carrinho ({cart.length})
        </Button>
      </div>

      {/* LISTA DE PRODUTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((p) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
