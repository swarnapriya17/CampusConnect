import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiUploadSubmission } from '../services/api';
import {
  INITIAL_SUBJECTS,
  INITIAL_ATTENDANCE,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_REQUESTS,
  INITIAL_STUDENTS_ADMIN
} from '../utils/mockData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [students, setStudents] = useState(INITIAL_STUDENTS_ADMIN);

  // --- Assignment Submission Logic (API + Fallback State) ---
  const submitAssignment = async (assignmentId, fileData, studentUser) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    
    // Target assignment lookup
    const targetAssignment = assignments.find((a) => a.id === assignmentId);
    const isLate = targetAssignment ? new Date() > new Date(targetAssignment.dueDate) : false;
    const computedStatus = isLate ? 'Late' : 'Submitted';

    try {
      // Create FormData payload for REST API
      const formData = new FormData();
      formData.append('assignmentId', assignmentId);
      formData.append('studentId', studentUser?.id || 'STU-2026-042');
      formData.append('studentName', studentUser?.name || 'Alex Morgan');
      formData.append('department', studentUser?.department || 'Computer Science & Engineering');
      if (fileData.remarks) formData.append('remarks', fileData.remarks);
      if (fileData.file) formData.append('file', fileData.file);

      const res = await apiUploadSubmission(formData);

      if (res?.success && res?.data) {
        const subData = res.data;

        // Update local React state with server response
        setAssignments((prev) =>
          prev.map((asg) => {
            if (asg.id === assignmentId) {
              return {
                ...asg,
                status: subData.status || computedStatus,
                submissionDetails: {
                  submittedAt: subData.submittedDate || nowStr,
                  fileName: subData.fileName || fileData.name,
                  fileSize: subData.fileSize || `${(fileData.size / (1024 * 1024)).toFixed(2)} MB`,
                  fileUrl: subData.fileUrl || '#',
                  remarks: fileData.remarks || 'Submitted via Portal'
                }
              };
            }
            return asg;
          })
        );

        setSubmissions((prev) => {
          const existingIndex = prev.findIndex(
            (s) => s.assignmentId === assignmentId && s.studentId === (studentUser?.id || 'STU-2026-042')
          );
          const record = {
            id: subData.id || `subm-${Date.now()}`,
            assignmentId,
            assignmentTitle: subData.assignmentTitle || targetAssignment?.title || 'Coursework Task',
            studentId: studentUser?.id || 'STU-2026-042',
            studentName: studentUser?.name || 'Alex Morgan',
            department: studentUser?.department || 'Computer Science',
            submittedDate: subData.submittedDate || nowStr,
            fileName: subData.fileName || fileData.name,
            fileSize: subData.fileSize || `${(fileData.size / (1024 * 1024)).toFixed(2)} MB`,
            fileUrl: subData.fileUrl || '#',
            status: subData.status || computedStatus,
            grade: subData.grade || 'Pending',
            feedback: subData.feedback || ''
          };

          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = record;
            return updated;
          }
          return [record, ...prev];
        });

        return true;
      }
    } catch (err) {
      console.warn('⚠️ API Upload notice (falling back to client state update):', err.message);
    }

    // Client fallback update if API offline
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id === assignmentId) {
          return {
            ...asg,
            status: computedStatus,
            submissionDetails: {
              submittedAt: nowStr,
              fileName: fileData.name,
              fileSize: `${(fileData.size / (1024 * 1024)).toFixed(2)} MB`,
              fileUrl: '#',
              remarks: fileData.remarks || 'Submitted via CampusConnect Portal'
            }
          };
        }
        return asg;
      })
    );

    setSubmissions((prev) => {
      const existingIndex = prev.findIndex(
        (s) => s.assignmentId === assignmentId && s.studentId === (studentUser?.id || 'STU-2026-042')
      );
      const newSubRecord = {
        id: existingIndex >= 0 ? prev[existingIndex].id : `subm-${Date.now()}`,
        assignmentId,
        assignmentTitle: targetAssignment ? targetAssignment.title : 'Coursework Task',
        studentId: studentUser?.id || 'STU-2026-042',
        studentName: studentUser?.name || 'Alex Morgan',
        department: studentUser?.department || 'Computer Science',
        submittedDate: nowStr,
        fileName: fileData.name,
        fileSize: `${(fileData.size / (1024 * 1024)).toFixed(2)} MB`,
        fileUrl: '#',
        status: computedStatus,
        grade: 'Pending',
        feedback: ''
      };

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newSubRecord;
        return updated;
      }
      return [newSubRecord, ...prev];
    });

    return true;
  };

  // --- Assignment CRUD ---
  const addAssignment = (newAsg) => {
    const created = {
      ...newAsg,
      id: `asg-${Date.now()}`,
      status: 'Pending',
      resubmissionAllowed: true,
      allowedFileTypes: newAsg.allowedFileTypes || ['.pdf', '.zip', '.docx'],
      maxFileSizeMB: newAsg.maxFileSizeMB || 15
    };
    setAssignments((prev) => [created, ...prev]);
    return created;
  };

  const updateAssignment = (id, updatedFields) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a))
    );
  };

  const deleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  // --- Attendance Management ---
  const updateAttendanceRecords = (subjectId, dateStr, studentStatuses) => {
    setAttendance((prev) =>
      prev.map((att) => {
        if (att.subjectId === subjectId) {
          const isPresent = studentStatuses['STU-2026-042'] === 'Present';
          const newAttended = att.attendedClasses + (isPresent ? 1 : 0);
          const newTotal = att.totalClasses + 1;
          const newPct = parseFloat(((newAttended / newTotal) * 100).toFixed(1));
          let status = 'Good';
          if (newPct < 65) status = 'Low';
          else if (newPct < 75) status = 'Warning';

          return {
            ...att,
            attendedClasses: newAttended,
            totalClasses: newTotal,
            percentage: newPct,
            status
          };
        }
        return att;
      })
    );
  };

  // --- Announcements CRUD ---
  const addAnnouncement = (anc) => {
    const created = {
      ...anc,
      id: `anc-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements((prev) => [created, ...prev]);
  };

  const updateAnnouncement = (id, updated) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // --- Events CRUD ---
  const addEvent = (evt) => {
    const created = {
      ...evt,
      id: `evt-${Date.now()}`,
      rsvped: false,
      timeStatus: 'Upcoming'
    };
    setEvents((prev) => [created, ...prev]);
  };

  const updateEvent = (id, updated) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleEventRsvp = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, rsvped: !e.rsvped } : e))
    );
  };

  // --- Requests / Complaints CRUD ---
  const createRequest = (reqData) => {
    const created = {
      ...reqData,
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      response: 'Under review by administration.'
    };
    setRequests((prev) => [created, ...prev]);
    return created;
  };

  const updateRequestStatus = (id, newStatus, responseNote) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              response: responseNote || r.response
            }
          : r
      )
    );
  };

  // --- Student Management (Admin) ---
  const addStudent = (studentData) => {
    const created = {
      ...studentData,
      id: `STU-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Active',
      attendance: '100%',
      gpa: 'N/A'
    };
    setStudents((prev) => [created, ...prev]);
  };

  const updateStudent = (id, updated) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // --- Subject Management (Admin) ---
  const addSubject = (subData) => {
    const created = {
      ...subData,
      id: `sub-${Date.now()}`
    };
    setSubjects((prev) => [...prev, created]);
  };

  const updateSubject = (id, updated) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteSubject = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        subjects,
        attendance,
        assignments,
        submissions,
        announcements,
        events,
        requests,
        students,
        submitAssignment,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        updateAttendanceRecords,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleEventRsvp,
        createRequest,
        updateRequestStatus,
        addStudent,
        updateStudent,
        deleteStudent,
        addSubject,
        updateSubject,
        deleteSubject
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
