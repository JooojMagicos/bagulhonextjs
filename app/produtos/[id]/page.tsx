"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { Product } from "@/models/interfaces";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao carregar");
  return res.json();
};

export default function ProductPage() {
  const { id } = useParams();

  const { data, error, isLoading } = useSWR<Product[]>(
    "https://deisishop.pythonanywhere.com/products/",
    fetcher
  );

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar produto</p>;

  const product = data?.find((p) => p.id === Number(id));

  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{product.title}</h1>

      <img
        src={`https://deisishop.pythonanywhere.com/${product.image}`}
        alt={product.title}
        className="w-80 rounded my-6"
      />

      <p className="text-lg font-semibold">R$ {Number(product.price).toFixed(2)}</p>

      <p className="mt-4 text-gray-700">{product.description}</p>
    </div>
  );
}
