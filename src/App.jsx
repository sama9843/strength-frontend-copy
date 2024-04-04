import Form from './component/Form';
import './App.css';

function App() {
  return (
    <main className="flex justify-center gap-4 flex-col min-h-screen">
      <h1 className="text-3xl text-center font-bold">Form</h1>
      <div className="mx-auto">
        <Form />
      </div>
    </main>
  );
}

export default App;
