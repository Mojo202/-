import React from 'react';
import type { GroundingSource } from '../types';
import { Link, MapPin } from 'lucide-react';

interface GroundingSourcesProps {
  sources: GroundingSource[];
}

const GroundingSources: React.FC<GroundingSourcesProps> = ({ sources }) => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-100 flex items-center gap-2">
        <Link className="text-teal-400" />
        السياق والمصادر
      </h3>
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 text-sm text-gray-300 hover:text-teal-400 transition-colors"
            >
              <div>
                {source.type === 'web' ? 
                  <Link size={16} className="mt-1 text-gray-500 group-hover:text-teal-400" /> :
                  <MapPin size={16} className="mt-1 text-gray-500 group-hover:text-teal-400" />
                }
              </div>
              <span className="flex-1 underline decoration-gray-600 group-hover:decoration-teal-500 underline-offset-2">
                {source.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroundingSources;