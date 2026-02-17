import { useState, useMemo } from 'react';
import { BaseCrudService } from '@/integrations';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion } from 'framer-motion';
import { Search, Plus, Trash2 } from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';

interface Recipe {
  _id: string;
  title?: string;
  country?: string;
  ingredients?: string;
  instructions?: string;
  prepTime?: number;
  imageURL?: string;
  createdAt?: Date | string;
}

export default function DrinksPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [formData, setFormData] = useState({
    title: '',
    country: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    imageURL: '',
  });

  // Load recipes on mount
  const loadRecipes = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<Recipe>('drinksrecipes', [], { limit: 100 });
    setRecipes(result.items || []);
    setIsLoading(false);
  };

  // Initial load
  if (isLoading && recipes.length === 0) {
    loadRecipes();
  }

  // Filter and sort recipes
  const filteredRecipes = useMemo(() => {
    let filtered = recipes.filter(recipe => {
      const matchesSearch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === 'all' || recipe.country === selectedCountry;
      return matchesSearch && matchesCountry;
    });

    filtered.sort((a, b) => {
      const titleA = a.title?.toLowerCase() || '';
      const titleB = b.title?.toLowerCase() || '';
      return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });

    return filtered;
  }, [recipes, searchTerm, selectedCountry, sortOrder]);

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.country) return;

    const newRecipe = {
      _id: crypto.randomUUID(),
      title: formData.title,
      country: formData.country,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      prepTime: formData.prepTime ? parseInt(formData.prepTime) : 0,
      imageURL: formData.imageURL || 'https://static.wixstatic.com/media/37b007_7ca10646ea0848278cfe0c21055a684f~mv2.png?originWidth=1152&originHeight=960',
      createdAt: new Date(),
    };

    await BaseCrudService.create('drinksrecipes', newRecipe);
    setRecipes([...recipes, newRecipe]);
    setFormData({ title: '', country: '', ingredients: '', instructions: '', prepTime: '', imageURL: '' });
    setIsFormOpen(false);
  };

  const handleDeleteRecipe = async (id: string) => {
    await BaseCrudService.delete('drinksrecipes', id);
    setRecipes(recipes.filter(r => r._id !== id));
  };

  const getCountryFlag = (country: string) => {
    const countryObj = COUNTRIES.find(c => c.name === country);
    return countryObj?.flag || '🌍';
  };

  const getIngredientPreview = (ingredients: string) => {
    const lines = ingredients.split('\n').slice(0, 2);
    return lines.join(', ').substring(0, 60) + (ingredients.split('\n').length > 2 ? '...' : '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-heading font-bold text-blue-900">🥤 Drinks Recipes</h1>
              <p className="text-blue-700 mt-1">Your collection of drink recipes</p>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-blue-900 font-semibold rounded-full px-6 py-3 flex items-center gap-2 w-fit"
            >
              <Plus size={20} />
              Add Recipe
            </Button>
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-blue-600" size={20} />
              <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-blue-200 rounded-full"
              />
            </div>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full sm:w-48 bg-white border-blue-200 rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {COUNTRIES.map(country => (
                  <SelectItem key={country.name} value={country.name}>
                    {country.flag} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={(val) => setSortOrder(val as 'asc' | 'desc')}>
              <SelectTrigger className="w-full sm:w-40 bg-white border-blue-200 rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">A–Z</SelectItem>
                <SelectItem value="desc">Z–A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-blue-700 text-lg">No recipes found. Add your first drink recipe!</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                  <Image
                    src={recipe.imageURL || 'https://static.wixstatic.com/media/37b007_fc92ca2db39844038dab70b7c8b8bd7e~mv2.png?originWidth=384&originHeight=192'}
                    alt={recipe.title || 'Recipe'}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-heading font-bold text-blue-900 flex-1">{recipe.title}</h3>
                    <button
                      onClick={() => handleDeleteRecipe(recipe._id)}
                      className="text-red-400 hover:text-red-600 transition-colors ml-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{getCountryFlag(recipe.country || '')}</span>
                    <span className="text-sm text-blue-700">{recipe.country}</span>
                  </div>

                  {recipe.prepTime && (
                    <p className="text-sm text-blue-600 mb-3">⏱️ {recipe.prepTime} mins</p>
                  )}

                  <p className="text-sm text-blue-700 mb-4 line-clamp-2">
                    {getIngredientPreview(recipe.ingredients || '')}
                  </p>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-blue-900 font-semibold rounded-full"
                  >
                    View Full Recipe
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Add Recipe Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl bg-white rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading font-bold text-blue-900">Add New Drink Recipe</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddRecipe} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Recipe Title *</label>
              <Input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Mojito"
                className="rounded-xl border-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Country of Origin *</label>
              <Select value={formData.country} onValueChange={(val) => setFormData({ ...formData, country: val })}>
                <SelectTrigger className="rounded-xl border-blue-200">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(country => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Ingredients</label>
              <Textarea
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                placeholder="List ingredients (one per line)"
                rows={4}
                className="rounded-xl border-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Instructions</label>
              <Textarea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Step-by-step instructions"
                rows={4}
                className="rounded-xl border-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Preparation Time (minutes)</label>
              <Input
                type="number"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                placeholder="5"
                className="rounded-xl border-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Image URL</label>
              <Input
                value={formData.imageURL}
                onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
                placeholder="https://..."
                className="rounded-xl border-blue-200"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-full font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-blue-900 rounded-full font-semibold"
              >
                Save Recipe
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
