import React from 'react';
import { Users, Phone, StickyNote, History, PhoneCall, CheckCircle2 } from 'lucide-react';
import type { Person } from '../data/categories';

interface CategoryListProps {
  title: string;
  people: Person[];
  onPersonMove: (index: number, status: 'picked_up' | 'called') => void;
  onUpdateNotes: (index: number, notes: string) => void;
}

export function CategoryList({ title, people, onPersonMove, onUpdateNotes }: CategoryListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Users className="w-5 h-5" />
        {title}
      </h2>
      <ul className="space-y-3">
        {people.map((person, index) => (
          <li
            key={`${person.firstName}-${person.lastName}-${index}`}
            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex gap-2">
              <button
                onClick={() => onPersonMove(index, 'picked_up')}
                className={`p-2 rounded-lg transition-colors ${
                  person.shiftStatus === 'picked_up'
                    ? 'bg-green-100 text-green-600'
                    : 'hover:bg-green-50 text-gray-400'
                }`}
                title="Picked up shift"
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onPersonMove(index, 'called')}
                className={`p-2 rounded-lg transition-colors ${
                  person.shiftStatus === 'called'
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-blue-50 text-gray-400'
                }`}
                title="Called for shift"
              >
                <PhoneCall className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 flex items-center gap-2">
                {person.firstName} {person.lastName}
                <span className="text-sm text-blue-600 flex items-center gap-1">
                  <History className="w-4 h-4" />
                  {person.shiftCount} shifts
                </span>
                {person.shiftStatus && (
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    person.shiftStatus === 'picked_up'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {person.shiftStatus === 'picked_up' ? 'Picked Up' : 'Called'}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {person.phone}
              </div>
              <div className="mt-2 flex items-start gap-2">
                <StickyNote className="w-4 h-4 text-gray-400 mt-1" />
                <div className="flex-1">
                  <textarea
                    value={person.notes}
                    onChange={(e) => onUpdateNotes(index, e.target.value)}
                    placeholder="Add notes (vacation, sick leave, etc.)"
                    className="w-full text-sm p-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    rows={person.notes ? 2 : 1}
                  />
                </div>
              </div>
            </div>
            {person.movedOn && (
              <span className="text-sm text-gray-500 italic whitespace-nowrap">
                Moved: {person.movedOn}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}