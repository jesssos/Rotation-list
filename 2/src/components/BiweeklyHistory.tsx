import React from 'react';
import { Calendar, Users, CheckCircle2, PhoneCall, UserMinus } from 'lucide-react';
import type { BiweeklyRecord } from '../data/categories';

interface BiweeklyHistoryProps {
  records: BiweeklyRecord[];
  categoryTitles: Record<string, string>;
}

export function BiweeklyHistory({ records, categoryTitles }: BiweeklyHistoryProps) {
  return (
    <div className="space-y-8">
      {records.map((record, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {record.startDate} - {record.endDate}
            </h3>
          </div>

          {/* Called Out Shifts */}
          {record.calledOutShifts && record.calledOutShifts.length > 0 && (
            <div className="mb-6">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="text-red-800 font-medium flex items-center gap-2 mb-3">
                  <UserMinus className="w-5 h-5" />
                  Called Out Shifts ({record.calledOutShifts.length})
                </h4>
                <ul className="space-y-2">
                  {record.calledOutShifts.map((callOut, idx) => {
                    const person = Object.values(record.categories)
                      .flat()
                      .find(p => p.id === callOut.calledOutPersonId);
                    const coveredBy = callOut.coveredByPersonId
                      ? Object.values(record.categories)
                          .flat()
                          .find(p => p.id === callOut.coveredByPersonId)
                      : null;
                    return person ? (
                      <li key={idx} className="text-sm text-red-900 bg-white p-3 rounded-md shadow-sm">
                        <div className="font-medium">{person.firstName} {person.lastName}</div>
                        <div className="text-red-700">{callOut.shift}</div>
                        <div className="text-red-600 text-xs">{callOut.date}</div>
                        <div className="text-red-800 text-sm mt-1">
                          Reason: {callOut.reason}
                        </div>
                        {coveredBy && (
                          <div className="text-green-700 text-xs mt-1">
                            Covered by: {coveredBy.firstName} {coveredBy.lastName}
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
            </div>
          )}

          {/* Shift Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-green-800 font-medium flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5" />
                Picked Up Shifts ({record.pickedUpShifts.length})
              </h4>
              <ul className="space-y-2">
                {record.pickedUpShifts.map((shift, idx) => {
                  const person = Object.values(record.categories)
                    .flat()
                    .find(p => p.id === shift.personId);
                  return person ? (
                    <li key={idx} className="text-sm text-green-900">
                      <span className="font-medium">{person.firstName} {person.lastName}</span>
                      <span className="text-green-700"> - {categoryTitles[shift.category]}</span>
                      <br />
                      <span className="text-green-600 text-xs">{shift.date}</span>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-blue-800 font-medium flex items-center gap-2 mb-3">
                <PhoneCall className="w-5 h-5" />
                Called Shifts ({record.calledShifts.length})
              </h4>
              <ul className="space-y-2">
                {record.calledShifts.map((shift, idx) => {
                  const person = Object.values(record.categories)
                    .flat()
                    .find(p => p.id === shift.personId);
                  return person ? (
                    <li key={idx} className="text-sm text-blue-900">
                      <span className="font-medium">{person.firstName} {person.lastName}</span>
                      <span className="text-blue-700"> - {categoryTitles[shift.category]}</span>
                      <br />
                      <span className="text-blue-600 text-xs">{shift.date}</span>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
          
          {/* Category Details */}
          <div className="border-t pt-4">
            <h4 className="text-md font-medium text-gray-700 mb-4">Category Details</h4>
            {Object.entries(record.categories).map(([category, people]) => (
              <div key={category} className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4" />
                  {categoryTitles[category]}
                </h5>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {people.map((person, personIndex) => (
                      <li key={personIndex} className="text-sm flex items-center gap-2">
                        {person.shiftStatus && (
                          <span className="text-gray-500">
                            {person.shiftStatus === 'picked_up' ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <PhoneCall className="w-4 h-4 text-blue-600" />
                            )}
                          </span>
                        )}
                        <span className="font-medium">{person.firstName} {person.lastName}</span>
                        <span className="text-gray-500">({person.shiftCount} shifts)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}