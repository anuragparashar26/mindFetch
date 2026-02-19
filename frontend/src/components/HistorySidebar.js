import React from "react";

function HistorySidebar({ sessions, currentSessionId, onNewChat, onSelectSession, onDeleteSession, onClose, isMobile }) {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateString;
    }
  };

  return (
    <aside className="chat-sidebar">
      <div className="sidebar-new-chat">
        <button className="new-chat-btn" onClick={onNewChat}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New Chat
        </button>
      </div>

      <div className="sidebar-history-label">
        History ({sessions.length})
      </div>

      <nav className="sidebar-sessions">
        {sessions.length === 0 ? (
          <div className="sidebar-empty">No chats yet</div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className={`sidebar-session-item ${currentSessionId === session.id ? "active" : ""}`}
            >
              <button
                className="session-select-btn"
                onClick={() => onSelectSession(session.id)}
                title={session.title}
              >
                <span className="session-title">{session.title}</span>
                <span className="session-date">{formatDate(session.createdAt)}</span>
              </button>
              <button
                className="session-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                aria-label="Delete chat"
                title="Delete chat"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))
        )}
      </nav>
    </aside>
  );
}

export default HistorySidebar;
