import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Person } from '../data/categories';

interface CallOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    calledOutPersonId: string;
    shift: string;
    notes: string;
    category: string;
    reason: string;
  }) => void;
  categories: Record<string, Person[]>;
  categoryTitles: Record<string, string>;
}

export function CallOutModal({ isOpen, onClose, onSave, categories, categoryTitles }: CallOutModalProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [shift, setShift] = useState('');
  const [notes, setNotes] = useState('');
  const [reason, setReason] = useState('');

  const reasons = [
    'Sick Leave',
    'Family Emergency',
    'Personal Emergency',
    'Medical Appointment',
    'Transportation Issues',
    'Weather Related',
    'Other'
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      calledOutPersonId: selectedPerson,
      shift,
      notes,
      category: selectedCategory,
      reason
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Record Called Out Shift</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              {Object.entries(categoryTitles).map(([key, title]) => (
                <option key={key} value={key}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Staff Member
            </label>
            <select
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
              required
              disabled={!selectedCategory}
            >
              <option value="">Select Staff Member</option>
              {selectedCategory &&
                categories[selectedCategory].map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.firstName} {person.lastName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Call Out
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
              required
            >
              <option value="">Select Reason</option>
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shift Details
            </label>
            <input
              type="text"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              placeholder="e.g., Morning Shift 8AM-4PM"
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes"
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}