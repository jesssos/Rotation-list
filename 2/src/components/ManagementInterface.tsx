import React, { useState } from 'react';
import { Edit2, Save, Plus, Trash2, Users } from 'lucide-react';
import type { Person } from '../data/categories';

interface ManagementInterfaceProps {
  categories: Record<string, Person[]>;
  categoryTitles: Record<string, string>;
  onUpdatePerson: (categoryKey: string, personId: string, updatedPerson: Partial<Person>) => void;
  onAddPerson: (categoryKey: string, person: Person) => void;
  onRemovePerson: (categoryKey: string, personId: string) => void;
  onUpdateCategoryTitle: (categoryKey: string, newTitle: string) => void;
}

export function ManagementInterface({
  categories,
  categoryTitles,
  onUpdatePerson,
  onAddPerson,
  onRemovePerson,
  onUpdateCategoryTitle
}: ManagementInterfaceProps) {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingPerson, setEditingPerson] = useState<string | null>(null);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [showAddPerson, setShowAddPerson] = useState<string | null>(null);
  const [newPerson, setNewPerson] = useState<Partial<Person>>({
    firstName: '',
    lastName: '',
    phone: '',
    notes: '',
    shiftCount: 0,
    shiftStatus: null,
    movedOn: ''
  });

  const handleSaveCategory = (categoryKey: string) => {
    onUpdateCategoryTitle(categoryKey, newCategoryTitle);
    setEditingCategory(null);
    setNewCategoryTitle('');
  };

  const handleAddPerson = (categoryKey: string) => {
    const id = `${Date.now()}`; // Generate a unique ID
    onAddPerson(categoryKey, {
      ...newPerson as Person,
      id
    });
    setShowAddPerson(null);
    setNewPerson({
      firstName: '',
      lastName: '',
      phone: '',
      notes: '',
      shiftCount: 0,
      shiftStatus: null,
      movedOn: ''
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Users className="w-6 h-6" />
        Staff Management
      </h2>

      {Object.entries(categories).map(([categoryKey, people]) => (
        <div key={categoryKey} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            {editingCategory === categoryKey ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCategoryTitle}
                  onChange={(e) => setNewCategoryTitle(e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="Category name"
                />
                <button
                  onClick={() => handleSaveCategory(categoryKey)}
                  className="text-green-600 hover:text-green-700"
                >
                  <Save className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {categoryTitles[categoryKey]}
                </h3>
                <button
                  onClick={() => {
                    setEditingCategory(categoryKey);
                    setNewCategoryTitle(categoryTitles[categoryKey]);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
            <button
              onClick={() => setShowAddPerson(categoryKey)}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Staff
            </button>
          </div>

          {showAddPerson === categoryKey && (
            <div className="mb-4 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-3">Add New Staff Member</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newPerson.firstName}
                  onChange={(e) => setNewPerson({ ...newPerson, firstName: e.target.value })}
                  className="border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newPerson.lastName}
                  onChange={(e) => setNewPerson({ ...newPerson, lastName: e.target.value })}
                  className="border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={newPerson.phone}
                  onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value })}
                  className="border rounded px-3 py-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddPerson(categoryKey)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddPerson(null)}
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="divide-y">
            {people.map((person) => (
              <div key={person.id} className="py-3">
                {editingPerson === person.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={person.firstName}
                      onChange={(e) =>
                        onUpdatePerson(categoryKey, person.id, { firstName: e.target.value })
                      }
                      className="border rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      value={person.lastName}
                      onChange={(e) =>
                        onUpdatePerson(categoryKey, person.id, { lastName: e.target.value })
                      }
                      className="border rounded px-3 py-2"
                    />
                    <input
                      type="text"
                      value={person.phone}
                      onChange={(e) =>
                        onUpdatePerson(categoryKey, person.id, { phone: e.target.value })
                      }
                      className="border rounded px-3 py-2"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingPerson(null)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">
                        {person.firstName} {person.lastName}
                      </span>
                      <span className="text-gray-500 ml-2">{person.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingPerson(person.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemovePerson(categoryKey, person.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}