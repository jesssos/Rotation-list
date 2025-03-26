import React from 'react';
import { useAuth } from './AuthProvider';
import { House } from '../types';
import { Building2, Phone, MapPin } from 'lucide-react';

export function HouseList() {
  const { user } = useAuth();
  const [houses, setHouses] = React.useState<House[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchHouses() {
      try {
        let query = supabase.from('houses').select('*');
        
        // If user is not CIL or MANAGEMENT, filter houses based on assignments
        if (user?.role !== 'CIL' && user?.role !== 'MANAGEMENT') {
          query = query.in('id', user?.houses || []);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        setHouses(data || []);
      } catch (error) {
        console.error('Error fetching houses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHouses();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {houses.map((house) => (
        <div key={house.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">{house.name}</h2>
          </div>
          
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <p>{house.address}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <p>{house.phone}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Staff Members</h3>
            <div className="space-y-1">
              {house.staff.map((staffMember) => (
                <p key={staffMember.id} className="text-sm text-gray-600">
                  {staffMember.first_name} {staffMember.last_name}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}