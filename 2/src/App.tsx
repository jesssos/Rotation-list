import React, { useState } from 'react';
import { categories as initialCategories } from './data/categories';
import { CategoryList } from './components/CategoryList';
import { BiweeklyHistory } from './components/BiweeklyHistory';
import { CallOutModal } from './components/CallOutModal';
import { ManagementInterface } from './components/ManagementInterface';
import type { Person, BiweeklyRecord, ShiftLog, CalledOutShift } from './data/categories';
import { History, UserMinus, Settings } from 'lucide-react';

type Categories = Record<keyof typeof initialCategories, Person[]>;

const categoryTitles = {
  fullTimeStaff: "Full Time Staff",
  partTimeStaff: "Part Time Staff",
  category1: "Part Time RS",
  category2: "Overnight Staff from Home",
  category3: "Other Unionized Staff",
  category4: "Casual Staff",
  category5: "RS with Approved Overtime",
  category6: "Other Unionized Staff with Approved Overtime"
} as const;

function App() {
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'management'>('current');
  const [categories, setCategories] = useState<Categories>(() => 
    Object.entries(initialCategories).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: [...value]
    }), {} as Categories)
  );
  const [categoryTitleState, setCategoryTitleState] = useState(categoryTitles);
  const [biweeklyHistory, setBiweeklyHistory] = useState<BiweeklyRecord[]>([]);
  const [isCallOutModalOpen, setIsCallOutModalOpen] = useState(false);
  const [calledOutShifts, setCalledOutShifts] = useState<CalledOutShift[]>([]);

  const moveToBottom = (categoryKey: keyof Categories, index: number, status: 'picked_up' | 'called') => {
    setCategories(prev => {
      const newCategories = { ...prev };
      const category = [...prev[categoryKey]];
      const [movedPerson] = category.splice(index, 1);
      
      category.push({
        ...movedPerson,
        movedOn: new Date().toLocaleString(),
        shiftCount: movedPerson.shiftCount + 1,
        shiftStatus: status
      });
      
      newCategories[categoryKey] = category;
      return newCategories;
    });
  };

  const updateNotes = (categoryKey: keyof Categories, personIndex: number, notes: string) => {
    setCategories(prev => {
      const newCategories = { ...prev };
      const category = [...prev[categoryKey]];
      category[personIndex] = {
        ...category[personIndex],
        notes
      };
      newCategories[categoryKey] = category;
      return newCategories;
    });
  };

  const handleCallOutSave = (data: {
    calledOutPersonId: string;
    shift: string;
    notes: string;
    category: string;
    reason: string;
  }) => {
    const newCallOut: CalledOutShift = {
      date: new Date().toLocaleString(),
      calledOutPersonId: data.calledOutPersonId,
      coveredByPersonId: null,
      category: data.category,
      shift: data.shift,
      notes: data.notes,
      reason: data.reason
    };
    setCalledOutShifts(prev => [...prev, newCallOut]);
  };

  const assignShiftCoverage = (callOutIndex: number, coveredByPersonId: string) => {
    setCalledOutShifts(prev => {
      const newShifts = [...prev];
      newShifts[callOutIndex] = {
        ...newShifts[callOutIndex],
        coveredByPersonId
      };
      return newShifts;
    });
  };

  const saveCurrentPeriod = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 14);

    const pickedUpShifts: ShiftLog[] = [];
    const calledShifts: ShiftLog[] = [];

    Object.entries(categories).forEach(([categoryKey, people]) => {
      people.forEach(person => {
        if (person.shiftStatus === 'picked_up') {
          pickedUpShifts.push({
            date: person.movedOn,
            personId: person.id,
            category: categoryKey
          });
        } else if (person.shiftStatus === 'called') {
          calledShifts.push({
            date: person.movedOn,
            personId: person.id,
            category: categoryKey
          });
        }
      });
    });

    setBiweeklyHistory(prev => [{
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      categories: JSON.parse(JSON.stringify(categories)),
      pickedUpShifts,
      calledShifts,
      calledOutShifts: [...calledOutShifts]
    }, ...prev]);

    setCategories(prev => {
      const newCategories = { ...prev };
      Object.keys(newCategories).forEach(categoryKey => {
        newCategories[categoryKey as keyof Categories] = newCategories[categoryKey as keyof Categories].map(person => ({
          ...person,
          shiftStatus: null,
          movedOn: "",
          shiftCount: 0
        }));
      });
      return newCategories;
    });
    setCalledOutShifts([]);
  };

  const handleUpdatePerson = (categoryKey: string, personId: string, updatedFields: Partial<Person>) => {
    setCategories(prev => {
      const newCategories = { ...prev };
      const category = [...prev[categoryKey as keyof Categories]];
      const personIndex = category.findIndex(p => p.id === personId);
      if (personIndex !== -1) {
        category[personIndex] = {
          ...category[personIndex],
          ...updatedFields
        };
      }
      newCategories[categoryKey as keyof Categories] = category;
      return newCategories;
    });
  };

  const handleAddPerson = (categoryKey: string, person: Person) => {
    setCategories(prev => {
      const newCategories = { ...prev };
      newCategories[categoryKey as keyof Categories] = [...prev[categoryKey as keyof Categories], person];
      return newCategories;
    });
  };

  const handleRemovePerson = (categoryKey: string, personId: string) => {
    setCategories(prev => {
      const newCategories = { ...prev };
      newCategories[categoryKey as keyof Categories] = prev[categoryKey as keyof Categories].filter(
        p => p.id !== personId
      );
      return newCategories;
    });
  };

  const handleUpdateCategoryTitle = (categoryKey: string, newTitle: string) => {
    setCategoryTitleState(prev => ({
      ...prev,
      [categoryKey]: newTitle
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Staff Rotation Management
        </h1>

        <div className="bg-white rounded-lg shadow-md mb-6">
          <nav className="flex border-b">
            <button
              onClick={() => setActiveTab('current')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'current'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Current Period
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'history'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <History className="w-5 h-5" />
                Bi-weekly History
              </div>
            </button>
            <button
              onClick={() => setActiveTab('management')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'management'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Settings className="w-5 h-5" />
                Management
              </div>
            </button>
          </nav>
        </div>
        
        {activeTab === 'current' ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <button
                onClick={() => setIsCallOutModalOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <UserMinus className="w-5 h-5" />
                Record Call Out
              </button>
              <button
                onClick={saveCurrentPeriod}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Current Period
              </button>
            </div>

            {calledOutShifts.length > 0 && (
              <div className="mb-6 bg-red-50 rounded-lg p-4">
                <h3 className="text-red-800 font-medium mb-3 flex items-center gap-2">
                  <UserMinus className="w-5 h-5" />
                  Current Called Out Shifts
                </h3>
                <ul className="space-y-2">
                  {calledOutShifts.map((callOut, index) => {
                    const person = Object.values(categories)
                      .flat()
                      .find(p => p.id === callOut.calledOutPersonId);
                    const coveredBy = callOut.coveredByPersonId
                      ? Object.values(categories)
                          .flat()
                          .find(p => p.id === callOut.coveredByPersonId)
                      : null;
                    return person ? (
                      <li key={index} className="text-sm text-red-900 bg-white p-3 rounded-md shadow-sm">
                        <div className="font-medium">{person.firstName} {person.lastName}</div>
                        <div className="text-red-700">{callOut.shift}</div>
                        <div className="text-red-600 text-xs">{callOut.date}</div>
                        <div className="text-red-800 text-sm mt-1">
                          Reason: {callOut.reason}
                        </div>
                        {coveredBy ? (
                          <div className="text-green-700 text-xs mt-1">
                            Covered by: {coveredBy.firstName} {coveredBy.lastName}
                          </div>
                        ) : (
                          <div className="mt-2">
                            <select
                              className="w-full text-sm rounded-md border-gray-300 shadow-sm"
                              onChange={(e) => assignShiftCoverage(index, e.target.value)}
                              value=""
                            >
                              <option value="">Assign coverage...</option>
                              {Object.entries(categories).map(([categoryKey, people]) => (
                                <optgroup key={categoryKey} label={categoryTitleState[categoryKey as keyof typeof categoryTitleState]}>
                                  {people.map(p => (
                                    <option key={p.id} value={p.id}>
                                      {p.firstName} {p.lastName}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                          </div>
                        )}
                        {callOut.notes && (
                          <div className="text-red-700 mt-1 text-xs italic">
                            Note: {callOut.notes}
                          </div>
                        )}
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}

            <div className="space-y-6">
              {(Object.keys(categories) as Array<keyof Categories>).map((categoryKey) => (
                <CategoryList
                  key={categoryKey}
                  title={categoryTitleState[categoryKey]}
                  people={categories[categoryKey]}
                  onPersonMove={(index, status) => moveToBottom(categoryKey, index, status)}
                  onUpdateNotes={(index, notes) => updateNotes(categoryKey, index, notes)}
                />
              ))}
            </div>
          </>
        ) : activeTab === 'history' ? (
          <BiweeklyHistory
            records={biweeklyHistory}
            categoryTitles={categoryTitleState}
          />
        ) : (
          <ManagementInterface
            categories={categories}
            categoryTitles={categoryTitleState}
            onUpdatePerson={handleUpdatePerson}
            onAddPerson={handleAddPerson}
            onRemovePerson={handleRemovePerson}
            onUpdateCategoryTitle={handleUpdateCategoryTitle}
          />
        )}
      </div>

      <CallOutModal
        isOpen={isCallOutModalOpen}
        onClose={() => setIsCallOutModalOpen(false)}
        onSave={handleCallOutSave}
        categories={categories}
        categoryTitles={categoryTitleState}
      />
    </div>
  );
}

export default App;