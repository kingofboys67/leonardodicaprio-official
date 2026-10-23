import React from 'react';
import { Users } from 'lucide-react';
import { TOP_COLLABORATORS } from '../../data/content';

interface CastSpotlightProps {
  onSelectCollaborator: (collaboratorName: string) => void;
}

export const CastSpotlight: React.FC<CastSpotlightProps> = ({ onSelectCollaborator }) => {
  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Auteur Directors & <span className="text-orange-500">Co-Stars</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Collaborating with cinema’s greatest visionaries to shape modern filmmaking
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {TOP_COLLABORATORS.map((collab) => (
          <div
            key={collab.id}
            onClick={() => onSelectCollaborator(collab.name)}
            className="group p-4 rounded-2xl bg-[#111625] border border-slate-800 hover:border-orange-500/60 transition-all duration-300 text-center cursor-pointer shadow-lg hover:-translate-y-1"
          >
            <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-slate-800 group-hover:ring-orange-500 transition-all">
              <img
                src={collab.avatar}
                alt={collab.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors truncate">
              {collab.name}
            </h4>
            <div className="text-[11px] font-mono text-orange-400 font-medium mb-1">
              {collab.role}
            </div>
            <div className="text-[10px] text-slate-500 line-clamp-1">
              {collab.notable}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
