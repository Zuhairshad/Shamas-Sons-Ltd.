'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const sortOptions = [
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'title-asc', label: 'A-Z' },
  { value: 'title-desc', label: 'Z-A' },
]

const categoryOptions = [
  { value: null, label: 'All Products' },
  { value: 'liquid', label: 'Liquids' },
  { value: 'wipe', label: 'Wadding & Wipes' },
  { value: 'multipack', label: 'Multipacks' },
  { value: 'polish', label: 'Gel & Polish' },
]

interface ProductFiltersProps {
  currentSort?: string
  currentType?: string
}

export function ProductFilters({ currentSort, currentType }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    const queryString = params.toString()
    router.push(`/products${queryString ? `?${queryString}` : ''}`)
  }

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || 'Best Selling'

  const hasActiveFilters = Boolean(currentType || (currentSort && currentSort !== 'best-selling'))

  const clearAllFilters = () => {
    router.push('/products')
  }

  return (
    <div className="mb-8 space-y-4 pb-4 border-b border-border">
      {/* Category Pills & Sorting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <div className="flex items-center gap-1.5 text-muted-foreground mr-1 text-xs uppercase tracking-wider font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Category:</span>
          </div>
          {categoryOptions.map((cat) => {
            const isSelected = (!currentType && cat.value === null) || currentType === cat.value
            return (
              <button
                key={cat.label}
                onClick={() => updateFilters('type', cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary/60 text-foreground hover:bg-secondary hover:text-primary border border-border/40'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Sort & Reset Actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground gap-1 h-9 px-3"
            >
              <X className="w-3.5 h-3.5" /> Reset
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 h-9 text-xs font-semibold uppercase tracking-wider">
                Sort: {currentSortLabel}
                <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card border border-border">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => updateFilters('sort', option.value === 'best-selling' ? null : option.value)}
                  className={`cursor-pointer text-xs font-medium uppercase tracking-wider ${
                    (currentSort === option.value || (!currentSort && option.value === 'best-selling'))
                      ? 'bg-primary/10 text-primary font-bold'
                      : ''
                  }`}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

