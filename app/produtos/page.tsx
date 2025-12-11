"use client";

import { useEffect, useMemo, useState } from "react";
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


  const [cart, setCart] = useState<Product[]>([]);


  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (e) {
      console.warn("Erro a carregar cart do localStorage:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Erro a gravar cart no localStorage:", e);
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };


  const total = useMemo(() => {
    if (!cart || cart.length === 0) return 0;

    return cart.reduce((acc, p) => {
      const priceNum = Number((p as any).price) || 0;
      return acc + priceNum;
    }, 0);
  }, [cart]);

  if (isLoading) return <div className="p-6 text-center">Carregando...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Erro ao carregar produtos.</div>;

  const productsToShow = data ?? [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">DEISI Shop – Produtos</h1>


      <div className="flex justify-center mb-6 gap-4">
        <Button color="primary" variant="shadow">Produtos Disponíveis</Button>
        <Button color="secondary" variant="bordered">🛒 Carrinho ({cart.length})</Button>
      </div>

      <h2 className="text-xl font-bold mb-3">Produtos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {productsToShow.map((p) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} inCart={false} />
        ))}
      </div>


      <h2 className="text-xl font-bold mb-3">Carrinho</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Nenhum produto no carrinho.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {cart.map((p, idx) => (
           
              <ProductCard
                key={`cart-${idx}-${p.id}`}
                product={p}
                removeFromCart={removeFromCart}
                inCart={true}
              />
            ))}
          </div>

          <div className="text-right mr-4 text-2xl font-bold">
            Total: {total.toFixed(2)} €
          </div>
        </>
      )}
    </div>
  );
}
