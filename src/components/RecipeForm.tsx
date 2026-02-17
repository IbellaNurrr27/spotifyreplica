import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COUNTRIES } from '@/lib/countries';
import { Image } from '@/components/ui/image';

interface RecipeFormProps {
  onClose: () => void;
  onSubmit: (recipe: {
    title: string;
    country: string;
    ingredients: string;
    instructions: string;
    prepTime: number;
    imageURL?: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export default function RecipeForm({ onClose, onSubmit, isLoading = false }: RecipeFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    country: '',
    ingredients: '',
    instructions: '',
    prepTime: 0,
    imageURL: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, imageURL: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.country || !formData.ingredients || !formData.instructions) {
      alert('Please fill in all required fields');
      return;
    }
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-foreground">Add New Recipe</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            disabled={isLoading}
          >
            <X size={24} className="text-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Recipe Title */}
          <div>
            <label className="block font-paragraph font-semibold text-foreground mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Chocolate Chip Cookies"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
              disabled={isLoading}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block font-paragraph font-semibold text-foreground mb-2">
              Country of Origin *
            </label>
            <select
              value={formData.country}
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
              disabled={isLoading}
            >
              <option value="">Select a country...</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block font-paragraph font-semibold text-foreground mb-2">
              Ingredients *
            </label>
            <textarea
              value={formData.ingredients}
              onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
              placeholder="List ingredients, one per line..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block font-paragraph font-semibold text-foreground mb-2">
              Instructions *
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="Step-by-step instructions..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Prep Time */}
          <div>
            <label className="block font-paragraph font-semibold text-foreground mb-2">
              Preparation Time (minutes)
            </label>
            <input
              type="number"
              value={formData.prepTime}
              onChange={(e) => setFormData(prev => ({ ...prev, prepTime: parseInt(e.target.value) || 0 }))}
              placeholder="30"
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph"
              disabled={isLoading}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-paragraph font-semibold text-foreground mb-2">
              Recipe Image
            </label>
            <div className="flex flex-col gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                disabled={isLoading}
              />
              {imagePreview && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph"
            >
              {isLoading ? 'Saving...' : 'Save Recipe'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-secondary font-paragraph"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
