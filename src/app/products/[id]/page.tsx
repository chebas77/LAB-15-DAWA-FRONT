import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product, ApiResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data: ApiResponse<Product> = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver a productos
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {product.categoria && (
                <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full mb-4">
                  {product.categoria}
                </span>
              )}
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {product.nombre}
              </h1>
            </div>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-baseline gap-2 bg-gray-50 rounded-xl px-6 py-4 border border-gray-200">
              <span className="text-5xl font-bold text-gray-900">${product.precio}</span>
            </div>
          </div>

          {product.descripcion && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Descripción del Producto
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.descripcion}
              </p>
            </div>
          )}

          <div className="pt-8 border-t-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">ID:</span> {product.id}
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Ver más productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
