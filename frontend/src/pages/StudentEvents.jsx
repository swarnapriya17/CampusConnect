import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Calendar, MapPin, Clock, Users, CheckCircle2, Tag } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { FilterControls } from '../components/ProgressBar';

export function StudentEvents() {
  const { events, toggleEventRsvp } = useData();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('Upcoming');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Academic', 'Cultural', 'Technical', 'Sports'];

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.organizer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTime = timeFilter === 'All' || evt.timeStatus === timeFilter;
    const matchesCategory = categoryFilter === 'All' || evt.category === categoryFilter;

    return matchesSearch && matchesTime && matchesCategory;
  });

  const handleRsvp = (evt) => {
    toggleEventRsvp(evt.id);
    if (!evt.rsvped) {
      addToast(`RSVP Confirmed for '${evt.name}'!`, 'success');
    } else {
      addToast(`Cancelled RSVP for '${evt.name}'.`, 'info');
    }
  };

  return (
    <div>
      <PageHeader
        title="Campus Events & Activities"
        subtitle="Technical hackathons, cultural festivals, sports meets, and academic seminars."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search event name..." />
            <FilterControls
              options={['Upcoming', 'Past', 'All']}
              activeFilter={timeFilter}
              onSelectFilter={setTimeFilter}
              label="Schedule"
            />
            <FilterControls
              options={categories}
              activeFilter={categoryFilter}
              onSelectFilter={setCategoryFilter}
              label="Type"
            />
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)' }}>
        {filteredEvents.map((evt) => (
          <Card key={evt.id} hover style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                <span className="badge badge-primary">{evt.category}</span>
                <Badge variant={evt.timeStatus === 'Upcoming' ? 'success' : 'neutral'}>
                  {evt.timeStatus}
                </Badge>
              </div>

              <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-primary-950)', margin: '0 0 var(--space-2) 0', fontWeight: 'var(--font-weight-bold)' }}>
                {evt.name}
              </h3>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-600)', marginBottom: 'var(--space-4)', lineHeight: 'var(--line-height-relaxed)' }}>
                {evt.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--text-xs)', color: 'var(--color-slate-600)', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Calendar size={14} style={{ color: 'var(--color-primary-600)' }} />
                  <span><strong>Date:</strong> {evt.date} ({evt.time})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <MapPin size={14} style={{ color: 'var(--color-primary-600)' }} />
                  <span><strong>Venue:</strong> {evt.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Users size={14} style={{ color: 'var(--color-primary-600)' }} />
                  <span><strong>Organizer:</strong> {evt.organizer}</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-400)' }}>
                Capacity: {evt.capacity} seats
              </span>

              {evt.timeStatus === 'Upcoming' && (
                <Button
                  variant={evt.rsvped ? 'outline' : 'primary'}
                  size="sm"
                  icon={evt.rsvped ? CheckCircle2 : Calendar}
                  onClick={() => handleRsvp(evt)}
                >
                  {evt.rsvped ? 'Attending (RSVP\'d)' : 'Register / RSVP'}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StudentEvents;
