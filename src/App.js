import './App.css';

import { useUsersID } from './hooks/useID';

function App() {
  const { isFetching, fetchedData, fetchError } = useUsersID();

  console.log(isFetching);
  console.log(fetchedData);
  console.log(fetchError);

  return (
    <div>
      <p>Ok</p>
    </div>
  );
}

export default App;
