import React, { useState } from 'react';
import { Plus, MapPin, Home, Calendar, Heart, Star, Plane, Camera, Coffee, Trash2, LogOut } from 'lucide-react';
import { useDreams } from '../hooks/useDreams';
import { useAuth } from '../hooks/useAuth';
import AddDreamModal from './AddDreamModal';

const DreamBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const { dreams, loading, deleteDream } = useDreams();
  const { signOut } = useAuth();

  const categories = [
    { id: 'all', name: 'All Dreams', icon: Heart },
    { id: 'travel', name: 'Travel Adventures', icon: Plane },
    { id: 'home', name: 'Home Sweet Home', icon: Home },
    { id: 'dates', name: 'Date Night Ideas', icon: Calendar },
    { id: 'bucket-list', name: 'Bucket List', icon: Star }
  ];

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    idea: 'bg-gray-100 text-gray-800',
    planning: 'bg-blue-100 text-blue-800',
    booked: 'bg-purple-100 text-purple-800'
  };

  const filteredDreams = selectedCategory === 'all' 
    ? dreams 
    : dreams.filter(dream => dream.category === selectedCategory);

  const handleDeleteDream = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this dream?')) {
      await deleteDream(id);
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
          <Star className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading your beautiful dreams...</p>
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
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Our Dream Board
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
            Every dream we share brings us closer, every plan we make builds our future together
          </p>
        </div>

        {/* Add Dream Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Plus className="w-6 h-6" />
            <span>Add Your Dreams Love</span>
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
                    ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dreams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDreams.map(dream => (
            <div
              key={dream.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={dream.image || 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={dream.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[dream.priority]}`}>
                    {dream.priority} priority
                  </span>
                </div>
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleDeleteDream(dream.id)}
                    className="bg-red-500/80 hover:bg-red-600 p-2 rounded-full text-white transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{dream.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[dream.status]}`}>
                    {dream.status}
                  </span>
                </div>
                
                <p className="text-purple-600 font-medium mb-3">{dream.description}</p>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {dream.notes}
                </p>

                <div className="flex items-center justify-between">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
                    {categories.find(cat => cat.id === dream.category)?.name}
                  </span>
                  <Heart className="w-5 h-5 text-purple-400 hover:text-purple-600 cursor-pointer transition-colors duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDreams.length === 0 && (
          <div className="text-center py-16">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No dreams in this category yet.</p>
            <p className="text-gray-400 mt-2">Start planning your future together!</p>
          </div>
        )}

        {/* Add Dream Modal */}
        <AddDreamModal 
          isOpen={showAddModal} 
          onClose={() => setShowAddModal(false)} 
        />
      </div>
    </div>
  );
};

export default DreamBoard;