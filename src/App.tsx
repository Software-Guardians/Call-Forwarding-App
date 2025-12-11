
import { useState, useEffect } from "react";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Dialer } from "./pages/Dialer";
import { Contacts } from "./pages/Contacts";
import { ActiveCall } from "./pages/ActiveCall";
import { IncomingCallOverlay } from "./components/overlay/IncomingCallOverlay";
import { Settings } from "./pages/Settings";
import { Layout } from "./layouts/Layout";

import { invoke } from "@tauri-apps/api/core";

type View = 'dashboard' | 'dialer' | 'contacts' | 'active-call' | 'settings';

import { BluetoothProvider, useBluetooth } from "./context/BluetoothContext";

// Inner App Content (Can use Context)
function AppContent() {
  const {
    callState,
    callInfo,
    answerCall,
    rejectCall,
    endCall,
    startCall
  } = useBluetooth();

  const [currentView, setCurrentView] = useState<View>('dashboard');

  // React to Call State Changes
  useEffect(() => {
    if (callState === 'ACTIVE' || callState === 'DIALING') {
      setCurrentView('active-call');
    }
    // Optionally disconnect -> go back to dashboard/contacts?
    // We can handle this in onEndCall too or listen to IDLE.
    if (callState === 'IDLE' && currentView === 'active-call') {
      // Ideally go back to where we were, or dashboard.
      setCurrentView('dashboard');
    }
  }, [callState]);

  const handleStartCall = (numberOrName: string) => {
    // For now assume number, or look it up.
    // If it's a name from contacts, we need the number.
    // Assuming 'numberOrName' is what we dial for now.
    startCall(numberOrName);
  };

  return (
    <>
      <Layout currentView={currentView} onNavigate={(view) => setCurrentView(view)}>
        {currentView === 'dashboard' && (
          <>
            <Dashboard
              onDialpadClick={() => setCurrentView('dialer')}
              onContactsClick={() => setCurrentView('contacts')}
              onSimulateIncomingCall={() => { }} // Disabled simulation
            />
            {/* Debug Buttons */}
            <div className="fixed bottom-4 right-4 flex gap-2">
              <button
                onClick={() => invoke('greet', { name: 'User' }).then(console.log)}
                className="px-3 py-1 bg-slate-700 text-white rounded text-xs"
              >
                Test Greet
              </button>
            </div>
          </>
        )}
        {currentView === 'dialer' && (
          <Dialer />
        )}
        {currentView === 'contacts' && (
          <Contacts
            onCallStart={handleStartCall}
          />
        )}
        {currentView === 'active-call' && (
          <ActiveCall
            contactName={callInfo?.name || callInfo?.number || "Unknown"}
            onEndCall={endCall}
          />
        )}
        {currentView === 'settings' && (
          <Settings />
        )}
      </Layout>

      {/* Overlay independent of view */}
      {callState === 'RINGING' && (
        <IncomingCallOverlay
          callerName={callInfo?.name || "Unknown Caller"}
          callerNumber={callInfo?.number || "Unknown Number"}
          onAccept={answerCall}
          onDecline={rejectCall}
        />
      )}
    </>
  );
}

function App() {
  return (
    <BluetoothProvider>
      <AppContent />
    </BluetoothProvider>
  );
}

export default App;
