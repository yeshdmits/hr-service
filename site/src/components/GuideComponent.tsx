const GuideComponent = () => {
  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        How to Use the HR Tool
      </h2>
      <ol className="list-decimal list-inside space-y-6">
        <li>
          <strong>Upload CVs:</strong> Drag and drop CVs into the designated
          area or click the "Choose Files" button to upload. The CV will be
          added to the list below. The api will call the chatgpt bot.
        </li>
        <li>
          <strong>Add a Custom Job:</strong> Click the "Add a Custom Job" button
          to add job specifications manually. This will open a dialog where you
          can fill in the job title and description. Or you can
          select a job from the dropdown menu under "Available jobs".
        </li>
        <li>
          <strong>Select a Job:</strong> Choose a job description from the
          dropdown menu under "Available jobs". This will allow you to calculate
          matching CVs.
        </li>
        <li>
          <strong>Manage CVs:</strong> Use the checkboxes to select/deselect CVs
          and the buttons to view or remove them.
        </li>
        <li>
          <strong>Calculate Matching CVs:</strong> Click the "Calculate Matching
          CVs" button to see which CVs best match the selected job description.
          <strong>
            The button will appear after selecting a job description and one or
            more CVs.
          </strong>
        </li>
      </ol>
    </div>
  );
};

export default GuideComponent;
