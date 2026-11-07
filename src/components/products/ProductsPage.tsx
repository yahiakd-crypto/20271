import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  Trash2,
  TrendingUp,
  Tag,
  DollarSign,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AppSidebar } from '../navigation/AppSidebar';
import {
  DetailedProduct,
  loadProductsFromStorage,
  saveProductsToStorage,
  downloadProductAsJson,
  ATTACHED_UMBRELLA_PRODUCT
} from '../../utils/productStore';
import { ProductPreviewModal } from './ProductPreviewModal';
import { ProductImportModal } from './ProductImportModal';

interface ProductsPageProps {
  onNavigate: (view: string, subItem?: string) => void;
  onOpenSearchModal?: () => void;
  onAddToBoard?: (product: DetailedProduct) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onNavigate,
  onOpenSearchModal,
  onAddToBoard
}) => {
  const [products, setProducts] = useState<DetailedProduct[]>(() => loadProductsFromStorage());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Researching' | 'Active' | 'Testing'>('All');

  // Modals
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedProductForPreview, setSelectedProductForPreview] = useState<DetailedProduct | null>(null);

  // Sync products
  const handleProductAdded = (newProduct: DetailedProduct) => {
    setProducts(loadProductsFromStorage());
    setSelectedProductForPreview(newProduct);
  };

  const handleDeleteProduct = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this product?')) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveProductsToStorage(updated);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalProducts = products.length;
  const researchingCount = products.filter((p) => p.status === 'Researching').length;
  const activeCount = products.filter((p) => p.status === 'Active').length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0e0e11] text-neutral-200">
      {/* 1. AppSidebar Version Noir */}
      <AppSidebar
        activeView="products"
        onNavigate={onNavigate}
        onOpenNewModal={() => setIsImportModalOpen(true)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#141417] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">Products Intelligence</h1>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[11px] font-mono font-bold border border-blue-500/20">
                  {totalProducts} Items
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Manage Algerian COD product dossiers, unit economics, and AI analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await fetch('/assets/aistudio/all_products_master_2026-10-17_2f10e9b8.json');
                  if (res.ok) {
                    const text = await res.text();
                    const { parseProductJsonInput } = await import('../../utils/productStore');
                    const parsed = parseProductJsonInput(text);
                    if (parsed.success && parsed.products.length > 0) {
                      const existing = loadProductsFromStorage();
                      const existingIds = new Set(existing.map((p) => p.id));
                      const toAdd = parsed.products.filter((p) => !existingIds.has(p.id));
                      const updated = [...parsed.products, ...existing.filter((p) => !new Set(parsed.products.map(x => x.id)).has(p.id))];
                      saveProductsToStorage(updated);
                      setProducts(updated);
                      if (toAdd.length > 0) {
                        alert(`Successfully imported all ${parsed.products.length} products from Master Collection!`);
                      }
                    }
                  }
                } catch (err) {
                  console.error('Error loading master collection:', err);
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-300 hover:text-white text-xs font-bold transition-all border border-blue-500/30 flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Import all 10 researched products from Master JSON"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Import Master (10 Products)</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('board')}
              className="px-3.5 py-2 rounded-xl bg-[#1f1f24] hover:bg-[#282830] text-neutral-300 hover:text-white text-xs font-bold transition-all border border-white/10 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180 text-neutral-400" />
              <span>Back to Board</span>
            </button>

            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Product</span>
            </button>
          </div>
        </header>

        {/* Filters and Stats Strip */}
        <div className="p-6 border-b border-white/5 bg-[#121215] flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product name, category, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs font-semibold">
            {[
              { id: 'All', label: `All (${totalProducts})` },
              { id: 'Researching', label: `Researching (${researchingCount})` },
              { id: 'Active', label: `Active (${activeCount})` },
              { id: 'Testing', label: `Testing` }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-[#1a1a1f] text-neutral-400 hover:text-white hover:bg-[#24242b] border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-neutral-600" />
              <h3 className="text-sm font-bold text-neutral-300">No products found</h3>
              <p className="text-xs text-neutral-500 max-w-sm">
                Add your product via JSON file, manual form, or pasted JSON code.
              </p>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(true)}
                className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
              >
                + Add Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProductForPreview(prod)}
                  className="bg-[#161619] border border-white/5 hover:border-blue-500/30 rounded-2xl p-4 flex flex-col justify-between transition-all group cursor-pointer hover:shadow-xl relative overflow-hidden"
                >
                  <div>
                    {/* Top image & status */}
                    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#1c1c22] border border-white/5 mb-3.5">
                      <img
                        src={prod.mainImage}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=500&h=500&fit=crop';
                        }}
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono shadow-md ${
                            prod.status === 'Active'
                              ? 'bg-blue-600 text-white'
                              : 'bg-amber-500 text-black'
                          }`}
                        >
                          {prod.status}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] text-white font-mono font-bold">
                          🇩🇿 DZ COD
                        </span>
                      </div>

                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-mono font-bold text-blue-400">
                          Score {prod.opportunity?.overallScore ?? 52}/100
                        </span>
                      </div>
                    </div>

                    {/* Category & Title */}
                    <span className="text-[10px] font-mono text-neutral-400 block truncate uppercase tracking-wider mb-1">
                      {prod.category || 'General E-commerce'}
                    </span>

                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {prod.name}
                    </h3>

                    {/* Financials Strip */}
                    <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-[#1c1c21] border border-white/5 text-center">
                      <div>
                        <span className="text-[9px] text-neutral-400 block font-mono">SELLING</span>
                        <span className="text-xs font-bold text-blue-400 font-mono">
                          {(prod.financials?.sellingPrice ?? 1400).toLocaleString()} DZD
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-400 block font-mono">COST</span>
                        <span className="text-xs font-bold text-neutral-300 font-mono">
                          {(prod.financials?.costPrice ?? 760).toLocaleString()} DZD
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-400 block font-mono">ROI</span>
                        <span
                          className={`text-xs font-bold font-mono ${
                            (prod.financials?.roi ?? 0) >= 0 ? 'text-blue-400' : 'text-rose-400'
                          }`}
                        >
                          {(prod.financials?.roi ?? 0) > 0 ? `+${prod.financials.roi}%` : `${prod.financials?.roi ?? 0}%`}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                      {prod.intelligence?.evidenceNotes || prod.aiAnalysis?.marketingAngle || prod.source || 'Product research dossier'}
                    </p>
                  </div>

                  {/* Actions Bottom Bar */}
                  <div className="pt-3.5 mt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProductForPreview(prod);
                      }}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-[#232328] hover:bg-white hover:text-black text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-neutral-200"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToBoard) {
                          onAddToBoard(prod);
                        } else {
                          onNavigate('board');
                        }
                      }}
                      className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      title="Add to Board"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>To Board</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadProductAsJson(prod);
                      }}
                      className="p-1.5 rounded-xl bg-[#232328] hover:bg-[#2e2e36] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      title="Download JSON"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    {prod.id !== ATTACHED_UMBRELLA_PRODUCT.id && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteProduct(prod.id, e)}
                        className="p-1.5 rounded-xl bg-[#232328] hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ProductPreviewModal
        product={selectedProductForPreview}
        isOpen={Boolean(selectedProductForPreview)}
        onClose={() => setSelectedProductForPreview(null)}
        onAddToBoard={(p) => {
          if (onAddToBoard) {
            onAddToBoard(p);
          } else {
            onNavigate('board');
          }
        }}
      />

      <ProductImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onProductAdded={handleProductAdded}
        onNavigate={onNavigate}
        onAddToBoard={(p) => {
          setIsImportModalOpen(false);
          if (onAddToBoard) {
            onAddToBoard(p);
          } else {
            onNavigate('board');
          }
        }}
      />
    </div>
  );
};
