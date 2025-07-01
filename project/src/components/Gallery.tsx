import React, { useState } from 'react';
import { Plus, Heart, Star, Calendar, Smile, Camera, Play, Trash2, LogOut } from 'lucide-react';
import { useMemories } from '../hooks/useMemories';
import { useAuth } from '../hooks/useAuth';
import AddMemoryModal from './AddMemoryModal';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const { memories, loading, deleteMemory } = useMemories();
  const { signOut } = useAuth();

  const categories = [
    { id: 'all', name: 'All Memories', icon: Heart },
    { id: 'cutest-smiles', name: 'Her Cutest Smiles', icon: Smile },
    { id: 'silliest-moments', name: 'Our Silliest Moments', icon: Star },
    { id: 'romantic', name: 'Romantic Moments', icon: Heart },
    { id: 'adventures', name: 'Our Adventures', icon: Calendar }
  ];

  const filteredMemories = selectedCategory === 'all' 
    ? memories 
    : memories.filter(memory => memory.category === selectedCategory);

  const handleDeleteMemory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this precious memory?')) {
      await deleteMemory(id);
    }
  };

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await signOut();
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Camera className="w-12 h-12 text-pink-500 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading your beautiful memories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Our Beautiful Memories
            </h1>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every photo tells our story, every moment is a treasure we've created together
          </p>
        </div>

        {/* Add Memory Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Plus className="w-6 h-6" />
            <span>Add Your Memories Love</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-pink-100 border border-pink-200'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Memory Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMemories.map(memory => (
            <div
              key={memory.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={memory.url}
                  alt={memory.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {memory.type === 'video' ? (
                    <div className="bg-black/50 p-2 rounded-full">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="bg-black/50 p-2 rounded-full">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="absolute top-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleDeleteMemory(memory.id)}
                    className="bg-red-500/80 hover:bg-red-600 p-2 rounded-full text-white transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{memory.title}</h3>
                  <span className="text-sm text-gray-500">{memory.date}</span>
                </div>
                
                <p className="text-pink-600 font-medium mb-3 italic">"{memory.caption}"</p>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {memory.story}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-block bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full font-medium">
                    {categories.find(cat => cat.id === memory.category)?.name}
                  </span>
                  <Heart className="w-5 h-5 text-pink-400 hover:text-pink-600 cursor-pointer transition-colors duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMemories.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No memories in this category yet.</p>
            <p className="text-gray-400 mt-2">Start adding your beautiful moments together!</p>
          </div>
        )}

        {/* Add Memory Modal */}
        <AddMemoryModal 
          isOpen={showAddModal} 
          onClose={() => setShowAddModal(false)} 
        />
      </div>
    </div>
  );
};

export default Gallery;