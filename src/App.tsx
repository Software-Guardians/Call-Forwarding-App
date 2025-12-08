import { useState } from "react";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Dialer } from "./pages/Dialer";
import { Contacts } from "./pages/Contacts";
import { ActiveCall } from "./pages/ActiveCall";
import { IncomingCallOverlay } from "./components/overlay/IncomingCallOverlay";
import { Settings } from "./pages/Settings";
import { Layout } from "./layouts/Layout";

type View = 'dashboard' | 'dialer' | 'contacts' | 'active-call' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeContact, setActiveContact] = useState<string | undefined>(undefined);
  const [incomingCall, setIncomingCall] = useState<{ name: string, number: string } | null>(null);

  const startCall = (name: string) => {
    setActiveContact(name);
    setCurrentView('active-call');
  };

  const simulateIncomingCall = () => {
    setIncomingCall({
      name: "Unknown Caller",
      number: "+1 (555) 999-0000"
    });
  };

  const handleAcceptCall = () => {
    if (incomingCall) {
      setActiveContact(incomingCall.name);
      setCurrentView('active-call');
      setIncomingCall(null);
    }
  };

  const handleDeclineCall = () => {
    setIncomingCall(null);
  };

  return (
    <>
      <Layout currentView={currentView} onNavigate={(view) => setCurrentView(view)}>
        {currentView === 'dashboard' && (
          <Dashboard
            onDialpadClick={() => setCurrentView('dialer')}
            onContactsClick={() => setCurrentView('contacts')}
            onSimulateIncomingCall={simulateIncomingCall}
          />
        )}
        {currentView === 'dialer' && (
          <Dialer />
        )}
        {currentView === 'contacts' && (
          <Contacts
            onCallStart={startCall}
          />
        )}
        {currentView === 'active-call' && (
          <ActiveCall
            contactName={activeContact}
            onEndCall={() => setCurrentView('contacts')}
          />
        )}
        {currentView === 'settings' && (
          <Settings />
        )}
      </Layout>

      {incomingCall && (
        <IncomingCallOverlay
          callerName={incomingCall.name}
          callerNumber={incomingCall.number}
          onAccept={handleAcceptCall}
          onDecline={handleDeclineCall}
        />
      )}
    </>
  );
}

export default App;
