import { useState } from "react";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Dialer } from "./pages/Dialer";
import { Contacts } from "./pages/Contacts";
import { ActiveCall } from "./pages/ActiveCall";

type View = 'dashboard' | 'dialer' | 'contacts' | 'active-call';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeContact, setActiveContact] = useState<string | undefined>(undefined);

  const startCall = (name: string) => {
    setActiveContact(name);
    setCurrentView('active-call');
  };

  return (
    <>
      {currentView === 'dashboard' && (
        <Dashboard
          onDialpadClick={() => setCurrentView('dialer')}
          onContactsClick={() => setCurrentView('contacts')}
        />
      )}
      {currentView === 'dialer' && (
        <Dialer
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'contacts' && (
        <Contacts
          onNavigate={(view) => setCurrentView(view)}
          onCallStart={startCall}
        />
      )}
      {currentView === 'active-call' && (
        <ActiveCall
          contactName={activeContact}
          onEndCall={() => setCurrentView('contacts')}
        />
      )}
    </>
  );
}

export default App;
