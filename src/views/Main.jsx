import Form from '../components/Form';

export default function Main({ blockingCallback, errorCallback }) {
  return (
    <main className="flex justify-center gap-4 flex-col min-h-screen">
      <h1 className="text-3xl text-center font-bold">Form</h1>
      <div className="mx-auto">
        <Form blockingCallback={blockingCallback} errorCallback={errorCallback} />
      </div>
    </main>
  );
}
