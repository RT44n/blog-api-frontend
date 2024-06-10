export const WritePost = () => {
  const user = localStorage.getItem("user");
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">Draft as {user}</p>
        <button className="bg-lime-800 text-white font-bold py-2 px-4 rounded-full">
          Publish
        </button>
      </div>
      <form>
        <div className="mb-4">
          <input
            className="w-full text-4xl leading-10 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            name="title"
            id="title"
            placeholder="Title"
            type="text"
          />
        </div>
        <div>
          <textarea
            className="w-full min-h-[600px] text-xl py-2 px-3 rounded h-40 focus:ring-2 focus:ring-gray-500 "
            name="text"
            id="text"
            placeholder="Tell your story..."
          />
        </div>
      </form>
    </div>
  );
};
