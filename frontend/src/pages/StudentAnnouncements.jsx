import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Megaphone, Calendar, Tag, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import SearchBar from '../components/SearchBar';
import { FilterControls } from '../components/ProgressBar';

export function StudentAnnouncements() {
  const { announcements } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Academic', 'Examination', 'General', 'Placement', 'Event', 'Important'];

  const filteredAnnouncements = announcements.filter((anc) => {
    const matchesSearch =
      anc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anc.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = categoryFilter === 'All' || anc.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div>
      <PageHeader
        title="College Announcements"
        subtitle="Official circulars, exam notices, placement drives, and academic bulletins."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search announcement notices..." />
            <FilterControls
              options={categories}
              activeFilter={categoryFilter}
              onSelectFilter={setCategoryFilter}
              label="Category"
            />
          </div>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filteredAnnouncements.map((anc) => (
          <Card key={anc.id} hover>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="badge badge-primary">{anc.category}</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-400)' }}>
                  &bull; Posted on {anc.date}
                </span>
              </div>
              <Badge variant={anc.priority === 'High' ? 'danger' : anc.priority === 'Medium' ? 'warning' : 'neutral'}>
                {anc.priority} Priority
              </Badge>
            </div>

            <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-primary-950)', margin: '0 0 var(--space-2) 0', fontWeight: 'var(--font-weight-bold)' }}>
              {anc.title}
            </h3>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-700)', margin: '0 0 var(--space-4) 0', lineHeight: 'var(--line-height-relaxed)' }}>
              {anc.description}
            </p>

            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-2)' }}>
              Issued by: <strong>{anc.author}</strong>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StudentAnnouncements;
