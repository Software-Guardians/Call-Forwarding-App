import { useState } from "react";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Dialer } from "./pages/Dialer";
import { Contacts } from "./pages/Contacts";

type View = 'dashboard' | 'dialer' | 'contacts';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

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
        />
      )}
    </>
  );
}

export default App;
