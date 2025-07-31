import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle, Filter } from 'lucide-react';
import { EventHistory } from '../../types';

interface EventHistoryLogProps {
  selectedZone: string | null;
}

export const EventHistoryLog: React.FC<EventHistoryLogProps> = ({ selectedZone }) => {
  const [events, setEvents] = useState<EventHistory[]>([]);
  const [filter, setFilter] = useState<'all' | 'resolved' | 'unresolved'>('all');

  useEffect(() => {
    import('../../data/event_history_log.json').then(data => {
      setEvents(data.default);
    });
  }, []);

  const filteredEvents = events.filter(event => {
    const zoneMatch = !selectedZone || event.Zone === selectedZone;
    const statusMatch = filter === 'all' || 
      (filter === 'resolved' && event.Resolved) ||
      (filter === 'unresolved' && !event.Resolved);
    return zoneMatch && statusMatch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Event History</h2>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Events</option>
            <option value="resolved">Resolved</option>
            <option value="unresolved">Unresolved</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden h-full">
        <div className="overflow-y-auto h-full pr-2">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Zone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Event</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Severity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-900">
                        {new Date(event.Timestamp).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">{event.Zone}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{event.Event}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(event.Severity)}`}>
                      {event.Severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {event.Resolved ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-700">Resolved</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-700">Unresolved</span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No events found for the selected criteria
        </div>
      )}
    </div>
  );
};