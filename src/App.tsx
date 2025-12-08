import { useState } from "react";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Dialer } from "./pages/Dialer";

type View = 'dashboard' | 'dialer';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  return (
    <>
      {currentView === 'dashboard' && (
        <Dashboard
          onDialpadClick={() => setCurrentView('dialer')}
        />
      )}
      {currentView === 'dialer' && (
        <Dialer
          onBack={() => setCurrentView('dashboard')}
        />
      )}
    </>
  );
}

export default App;
