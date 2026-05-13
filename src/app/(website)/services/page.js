export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Service One</h2>
          <p className="mt-2 text-gray-600">Detailed description of service one.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Service Two</h2>
          <p className="mt-2 text-gray-600">Detailed description of service two.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Service Three</h2>
          <p className="mt-2 text-gray-600">Detailed description of service three.</p>
        </div>
      </div>
    </div>
  );
}
