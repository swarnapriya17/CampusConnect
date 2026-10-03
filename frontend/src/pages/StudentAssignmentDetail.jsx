import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { FileCheck2, Clock, Calendar, ArrowLeft, CheckCircle2, FileText, AlertCircle, Info } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import FileUpload from '../components/FileUpload';

export function StudentAssignmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { assignments, submitAssignment } = useData();
  const { addToast } = useToast();

  const assignment = assignments.find((a) => a.id === id) || assignments[0];

  const handleAssignmentUpload = async (uploadPayload) => {
    try {
      const success = await submitAssignment(assignment.id, uploadPayload, user);
      if (success) {
        addToast(`Assignment '${uploadPayload.name}' submitted successfully!`, 'success');
      } else {
        addToast('Failed to process assignment upload.', 'error');
      }
    } catch (err) {
      addToast(`Upload notice: ${err.message}`, 'error');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/student/assignments')}>
          Back to Assignments List
        </Button>
      </div>

      <PageHeader
        title={assignment.title}
        subtitle={`${assignment.subjectCode} — ${assignment.subjectName} | Instructor: ${assignment.faculty}`}
        breadcrumb={false}
        actions={
          <Badge
            variant={
              assignment.status === 'Submitted'
                ? 'success'
                : assignment.status === 'Overdue'
                ? 'danger'
                : 'warning'
            }
            size="md"
          >
            Status: {assignment.status}
          </Badge>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        {/* Left Column: Assignment Details & Instructions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Card title="Assignment Description">
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-700)', lineHeight: 'var(--line-height-relaxed)', margin: 0 }}>
              {assignment.description}
            </p>
          </Card>

          <Card title="Instructions & Submission Guidelines">
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-800)', whiteSpace: 'pre-line', lineHeight: 'var(--line-height-relaxed)' }}>
              {assignment.instructions}
            </div>

            <div style={{ marginTop: 'var(--space-6)', backgroundColor: 'var(--color-slate-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
              <h4 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-slate-500)', margin: '0 0 var(--space-2) 0' }}>
                Assignment Constraints
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-slate-600)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>&bull; <strong>Assigned Date:</strong> {assignment.assignedDate}</li>
                <li>&bull; <strong>Due Date:</strong> {assignment.dueDate}</li>
                <li>&bull; <strong>Maximum Marks:</strong> {assignment.maxMarks} Points</li>
                <li>&bull; <strong>Allowed Formats:</strong> {assignment.allowedFileTypes?.join(', ')}</li>
                <li>&bull; <strong>Max File Size:</strong> {assignment.maxFileSizeMB} MB</li>
                <li>&bull; <strong>Resubmission Policy:</strong> {assignment.resubmissionAllowed ? 'Allowed before due date' : 'Locked after initial submission'}</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Right Column: File Upload Submission Interface */}
        <div>
          <Card title="Assignment Submission Portal" subtitle="Upload your solution file for grading">
            <FileUpload
              onUploadSubmit={handleAssignmentUpload}
              allowedTypes={assignment.allowedFileTypes || ['.pdf', '.zip', '.docx']}
              maxSizeMB={assignment.maxFileSizeMB || 15}
              existingSubmission={assignment.submissionDetails || null}
              isResubmissionAllowed={assignment.resubmissionAllowed}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StudentAssignmentDetail;
